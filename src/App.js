import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Container, Grid, Typography, TextField, Button, IconButton } from '@mui/material';
import {
  PlayCircleOutline as StartIcon,
  StopCircleOutlined as StopIcon,
  RefreshOutlined as RestartIcon
} from '@mui/icons-material'
import LogoFieldClickable from './components/LogoFieldClickable'
import GameAction from './components/GameAction'
import LogoField from './components/LogoField'
import Field from './components/Field'
import ChartsComp from './components/Charts'
import useStyles from './styles.js'
import SpringSVG from './assets/box-1.svg'
import SummerSVG from './assets/box-2.svg'
import AutumnSVG from './assets/box-3.svg'
import WinterSVG from './assets/box-4.svg'
import { getForBalance } from './utils';

const A_DAY = 30 * 1000 / 365

let prevRenderTime = Date.now()
const Charts = React.memo(ChartsComp, () => {
  const now = Date.now()
  if (now - prevRenderTime >= 500) {
    prevRenderTime = now
    return false
  } else {
    return true
  }
})

const ICON_SVG = [
  SpringSVG,
  SummerSVG,
  AutumnSVG,
  WinterSVG,
]
const INITIAL_DATE = Date.parse('2021-09-05')
const TOKEN = {
  SPRING: 0,
  SUMMER: 1,
  AUTUMN: 2,
  WINTER: 3
}
const TOKEN_ARRAY = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER']
const STATUS = {
  IDLE: 0,
  ONGOING: 1
}
let prevDate = INITIAL_DATE

function App() {
  const classes = useStyles()
  const [status, setStatus] = useState(STATUS.IDLE)
  const [springPriceArr, setSpringPriceArr] = useState([5/((5+6+7+8)/4)])
  const [summerPriceArr, setSummerPriceArr] = useState([6/((5+6+7+8)/4)])
  const [autumnPriceArr, setAutumnPriceArr] = useState([7/((5+6+7+8)/4)])
  const [winterPriceArr, setWinterPriceArr] = useState([8/((5+6+7+8)/4)])
  const [selectedTradeId, setSelectedTradeId] = useState(null)
  const [selectedForId, setSelectedForId] = useState(null)
  const [balanceFor, setBalanceFor] = useState([0,0,0,0])
  const [balanceTrade, setBalanceTrade] = useState([0,0,0,0])
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE)
  const [currentBalance, setCurrentBalance] = useState([100,100,100,100])
  const [absolutePrices, setAbsolutePrices] = useState([2, 2.5, 3, 3.5])

  const timer = useRef()
  const [productionRates, setProductionRates] = useState({
    spring: 168,
    summer: 140,
    autumn: 120,
    winter: 105
  })

  useEffect(() => {
    if (currentDate === Date.parse('2022-06-05')) {
      setProductionRates(prev => ({ ...prev, spring: prev.spring / 2 }))
    } else if (currentDate === Date.parse('2025-06-05')) {
      setProductionRates(prev => ({ ...prev, summer: prev.summer / 2 }))
    } else if (currentDate === Date.parse('2028-06-05')) {
      setProductionRates(prev => ({ ...prev, autumn: prev.autumn / 2 }))
    } else if (currentDate === Date.parse('2031-06-05')) {
      setProductionRates(prev => ({ ...prev, winter: prev.winter / 2 }))
    } else if (currentDate === Date.parse('2031-09-05')) {
      clearInterval(timer.current)
    }
  }, [currentDate])

  useEffect(() => {
    if (currentDate === INITIAL_DATE) {
      return
    }
    setAbsolutePrices(prev => {
      const ratesArr = Object.values(productionRates)
      return prev.map((prevPrice, idx) => 0.99 * prevPrice  + 0.01 * (1 / ratesArr[idx]))
    })
  }, [currentDate, productionRates])

  useEffect(() => {
    if (currentDate === INITIAL_DATE) {
      return
    }
    const totalPrices = absolutePrices.reduce((total, price) => total + price, 0)
    const updatedRelativePrices = absolutePrices.map((price) => {return price / totalPrices * 4})
    const prevDateFullYear = new Date(prevDate).getFullYear()
    const currDateFullYear = new Date(currentDate).getFullYear()
    if (prevDateFullYear !== currDateFullYear) {
      prevDate = currentDate
      setSpringPriceArr(prev => prev.concat(updatedRelativePrices[0]))
      setSummerPriceArr(prev => prev.concat(updatedRelativePrices[1]))
      setAutumnPriceArr(prev => prev.concat(updatedRelativePrices[2]))
      setWinterPriceArr(prev => prev.concat(updatedRelativePrices[3]))
    }
    setCurrentBalance(prev => ([
      prev[0] + productionRates.spring * 144,
      prev[1] + productionRates.summer * 144,
      prev[2] + productionRates.winter * 144,
      prev[3] + productionRates.autumn * 144
    ]))
  }, [currentDate, productionRates, absolutePrices])

  const relativePrices = useMemo(() => {
    const totalPrices = absolutePrices.reduce((total, price) => total + price, 0)
    const result = absolutePrices.map((price) => price / totalPrices * 4)
    return result
  }, [absolutePrices])

  const totalBalance = currentBalance.reduce((total, bal) => total + bal, 0)

  const handleTradeClick = useCallback(id => {
    switch(id) {
      case TOKEN.SPRING:
        setBalanceTrade([currentBalance[0], 0, 0, 0])
        break
      case TOKEN.SUMMER:
        setBalanceTrade([0, currentBalance[1], 0, 0])
        break
      case TOKEN.AUTUMN:
        setBalanceTrade([0, 0, currentBalance[2], 0])
        break
      case TOKEN.WINTER:
        setBalanceTrade([0, 0, 0, currentBalance[3]])
        break
      default:
        break
    }
    setSelectedTradeId(id)
  }, [setSelectedTradeId, currentBalance])
  
  const handleForClick = useCallback(id => {
    const balanceA = currentBalance[selectedTradeId]
    const priceA = relativePrices[selectedTradeId]
    const priceB = relativePrices[id]
    const balanceB = getForBalance(balanceA, priceA, priceB)
    switch(id) {
      case TOKEN.SPRING:
        setBalanceFor([balanceB, 0, 0, 0])
        break
      case TOKEN.SUMMER:
        setBalanceFor([0, balanceB, 0, 0])
        break
      case TOKEN.AUTUMN:
        setBalanceFor([0, 0, balanceB, 0])
        break
      case TOKEN.WINTER:
        setBalanceFor([0, 0, 0, balanceB])
        break
      default:
        break
    }
    setSelectedForId(id)
  }, [selectedTradeId, currentBalance, relativePrices])

  const handleStart = useCallback(() => {
    setStatus(STATUS.ONGOING)
    timer.current = setInterval(() => setCurrentDate(date => date + 1000 * 3600 * 24), A_DAY)
  }, [])

  const handleRestart = useCallback(() => {
    timer.current && clearInterval(timer.current)
    setStatus(STATUS.IDLE)
    setCurrentDate(INITIAL_DATE)
    setCurrentBalance([100,100,100,100])
    setAbsolutePrices([2, 2.5, 3, 3.5])
    setBalanceFor([0,0,0,0])
    setBalanceTrade([0,0,0,0])
    setSelectedForId(null)
    setSelectedTradeId(null)
    setSpringPriceArr([])
    setSummerPriceArr([])
    setAutumnPriceArr([])
    setWinterPriceArr([])
  }, [])

  const handleExecute = useCallback(() => {
    if (status === STATUS.ONGOING) {
      switch(selectedTradeId) {
        case TOKEN.SPRING:
          setCurrentBalance([currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[1], currentBalance[2], currentBalance[3]])
          break
        case TOKEN.SUMMER:
          setCurrentBalance([currentBalance[0], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[2], currentBalance[3]])
          break
        case TOKEN.AUTUMN:
          setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[3]])
          break
        case TOKEN.WINTER:
          setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[2], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId]])
          break
        default:
          break
      }
  
      switch(selectedForId) {
        case TOKEN.SPRING:
          setCurrentBalance([currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[1], currentBalance[2], currentBalance[3]])
          break
        case TOKEN.SUMMER:
          setCurrentBalance([currentBalance[0], currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[2], currentBalance[3]])
          break
        case TOKEN.AUTUMN:
          setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[3]])
          break
        case TOKEN.WINTER:
          setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[2], currentBalance[selectedForId] + balanceFor[selectedForId]])
          break
        default:
          break
      }
      setSelectedForId(null)
      setSelectedTradeId(null)
    }
  }, [currentBalance, balanceFor, balanceTrade, selectedForId, selectedTradeId, status])

  return (
    <Container className={classes.marginTop100}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' alignItems="center">
        <Grid item xs={6}>
          <div>
            <Grid container justifyContent='center' alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" ml={10} gutterBottom>
                  Your tokens
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" ml={2} gutterBottom>
                  Relative prices
                </Typography>
              </Grid>
              {ICON_SVG.map((item, idx) => (
                <React.Fragment key={idx}>
                  <Grid item xs={6}>
                    <LogoField
                      key={idx}
                      value={currentBalance[idx]}
                      img={item}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field key={idx} value={relativePrices[idx]}/>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <Charts
              spring={springPriceArr}
              summer={summerPriceArr}
              autumn={autumnPriceArr}
              winter={winterPriceArr}
              currentYear={new Date(currentDate).getFullYear()}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' alignItems="center">
        <Grid item xs={3}>
          <div className={classes.marginLeft20}>
            <Typography variant="h6" ml={4} gutterBottom>
              Total Tokens
            </Typography>
            <Field value={totalBalance}/>
          </div>
          <div>
            <GameAction comment="Start trading">
              <IconButton color='inherit' onClick={handleStart}>
                <StartIcon fontSize='large'/>
              </IconButton>
            </GameAction>
            <GameAction comment="Pause trading">
              <IconButton color='inherit' onClick={() => {timer.current && clearInterval(timer.current); setStatus(STATUS.IDLE)}}>
                <StopIcon fontSize='large'/>
              </IconButton>
            </GameAction>
            <GameAction comment="Restart game">
              <IconButton color='inherit' onClick={handleRestart}>
                <RestartIcon fontSize='large'/>
              </IconButton>
            </GameAction>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Trade
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                For
              </Typography>
            </Grid>
            {ICON_SVG.map((item, idx) => (
              <React.Fragment key={idx}>{/* Trade */}
                <Grid item xs={6}>
                  <LogoFieldClickable
                    key={idx}
                    className={idx === selectedTradeId ? classes.img : null}
                    value={balanceTrade[idx]}
                    img={item}
                    onClick={() => handleTradeClick(idx)}
                  />
                </Grid>{/* For */}
                <Grid item xs={6}>
                  <LogoFieldClickable
                    key={idx}
                    className={idx === selectedForId ? classes.img : null}
                    value={balanceFor[idx]}
                    img={item}
                    onClick={() => handleForClick(idx)}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.display}>
            <Typography variant="h6" gutterBottom>
              Date
            </Typography>
            <div className={classes.marginLeft20}>
              <TextField
                disabled
                size='small'
                variant='outlined'
                value={new Date(currentDate).toISOString().slice(0, 10)}
              />
            </div>
          </div>
          <div className={classes.executeBox}>
            <div className={classes.padding15}>
              <Typography variant="p" gutterBottom>
                Trade {balanceTrade[selectedTradeId] || 0} {TOKEN_ARRAY[selectedTradeId]} tokens for {balanceFor[selectedForId] || 0} {TOKEN_ARRAY[selectedForId]} tokens
              </Typography>
            </div>
            <Button variant='contained' onClick={handleExecute}>Execute Trade</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
