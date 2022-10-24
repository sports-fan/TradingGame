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

const ADAY = 30 * 1000 / 365

let prevRenderTime = Date.now()
const Charts = React.memo(ChartsComp, () => {
  const now = Date.now()
  if (now - prevRenderTime >= 500) {
    prevRenderTime = now
    console.log('hihhi')
    return false
  } else {
    return true
  }
})

const iconSVG = [
  SpringSVG,
  SummerSVG,
  AutumnSVG,
  WinterSVG,
]

const initDate = '2021-09-05'

function App() {
  const classes = useStyles()
  const [springPriceArr, setSpringPriceArr] = useState([5/((5+6+7+8)/4)])
  const [summerPriceArr, setSummerPriceArr] = useState([6/((5+6+7+8)/4)])
  const [autumnPriceArr, setAutumnPriceArr] = useState([7/((5+6+7+8)/4)])
  const [winterPriceArr, setWinterPriceArr] = useState([8/((5+6+7+8)/4)])
  const [selectedTradeId, setSelectedTradeId] = useState(null)
  const [selectedForId, setSelectedForId] = useState(null)
  const [balanceFor, setBalanceFor] = useState([0,0,0,0])
  const [balanceTrade, setBalanceTrade] = useState([0,0,0,0])
  const [currentDate, setCurrentDate] = useState(initDate)
  const [currentBalance, setCurrentBalance] = useState([100,100,100,100])
  const [absolutePrices, setAbsolutePrices] = useState([1, 1, 1, 1])

  const timer = useRef()
  const [productionRates, setProductionRates] = useState({
    spring: 168,
    summer: 140,
    autumn: 120,
    winter: 105
  })

  useEffect(() => {
    if (currentDate === '2022-06-05') {
      setProductionRates(prev => ({ ...prev, spring: prev.spring / 2 }))
    } else if (currentDate === '2025-06-05') {
      setProductionRates(prev => ({ ...prev, summer: prev.summer / 2 }))
    } else if (currentDate === '2028-06-05') {
      setProductionRates(prev => ({ ...prev, autumn: prev.autumn / 2 }))
    } if (currentDate === '2031-06-05') {
      setProductionRates(prev => ({ ...prev, winter: prev.winter / 2 }))
    }
  }, [currentDate])

  useEffect(() => {
    if (currentDate === initDate) {
      return
    }
    setAbsolutePrices(prev => {
      const ratesArr = Object.values(productionRates)
      return prev.map((prevPrice, idx) => 0.99 * prevPrice  + 0.01 * (1 / ratesArr[idx]))
    })
  }, [currentDate, productionRates])

  useEffect(() => {
    if (currentDate === initDate) {
      return
    }
    const totalPrices = absolutePrices.reduce((total, price) => total + price, 0)
    const updatedRelativePrices = absolutePrices.map((price) => {return price / totalPrices / 4})

    setSpringPriceArr(prev => prev.concat(updatedRelativePrices[0]))
    setSummerPriceArr(prev => prev.concat(updatedRelativePrices[1]))
    setAutumnPriceArr(prev => prev.concat(updatedRelativePrices[2]))
    setWinterPriceArr(prev => prev.concat(updatedRelativePrices[3]))
    setCurrentBalance(prev => ([
      prev[0] + productionRates.spring * 144,
      prev[1] + productionRates.summer * 144,
      prev[2] + productionRates.winter * 144,
      prev[3] + productionRates.autumn * 144
    ]))
  }, [currentDate, productionRates, absolutePrices])

  const relativePrices = useMemo(() => {
    const totalPrices = absolutePrices.reduce((total, price) => total + price, 0)
    return absolutePrices.map((price) => price / totalPrices / 4)
  }, [absolutePrices])

  const totalBalance = currentBalance.reduce((total, bal) => total + bal, 0)

  const handleTradeClick = useCallback(id => {
    switch(id) {
      case 0:
        setBalanceTrade([currentBalance[0], 0, 0, 0])
        break
      case 1:
        setBalanceTrade([0, currentBalance[1], 0, 0])
        break
      case 2:
        setBalanceTrade([0, 0, currentBalance[2], 0])
        break
      case 3:
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
      case 0:
        setBalanceFor([balanceB, 0, 0, 0])
        break
      case 1:
        setBalanceFor([0, balanceB, 0, 0])
        break
      case 2:
        setBalanceFor([0, 0, balanceB, 0])
        break
      case 3:
        setBalanceFor([0, 0, 0, balanceB])
        break
      default:
        break
    }
    setSelectedForId(id)
  }, [selectedTradeId, setSelectedForId, setBalanceFor, currentBalance, relativePrices])

  const handleStart = useCallback(() => {
    timer.current = setInterval(() => setCurrentDate(date => {
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      return nextDay.toISOString().slice(0, 10)
    }), ADAY)
  }, [])

  const handleRestart = useCallback(() => {
    setCurrentDate('2021-09-05')
    setCurrentBalance([100,100,100,100])
    setAbsolutePrices([1, 1, 1, 1])
    setBalanceFor([0,0,0,0])
    setBalanceTrade([0,0,0,0])
  }, [])

  const handleExecute = useCallback(() => {
    switch(selectedTradeId) {
      case 0:
        setCurrentBalance([currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[1], currentBalance[2], currentBalance[3]])
        break
      case 1:
        setCurrentBalance([currentBalance[0], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[2], currentBalance[3]])
        break
      case 2:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId], currentBalance[3]])
        break
      case 3:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[2], currentBalance[selectedTradeId] - balanceTrade[selectedTradeId]])
        break
      default:
        break
    }

    switch(selectedForId) {
      case 0:
        setCurrentBalance([currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[1], currentBalance[2], currentBalance[3]])
        break
      case 1:
        setCurrentBalance([currentBalance[0], currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[2], currentBalance[3]])
        break
      case 2:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[selectedForId] + balanceFor[selectedForId], currentBalance[3]])
        break
      case 3:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[2], currentBalance[selectedForId] + balanceFor[selectedForId]])
        break
      default:
        break
    }
  }, [currentBalance, balanceFor, balanceTrade, selectedForId, selectedTradeId])

  return (
    <Container className={classes.marginTop100}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Your tokens
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Relative prices
              </Typography>
            </Grid>
            {iconSVG.map((item, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={6}>
                  <LogoField
                    key={idx}
                    value={currentBalance[idx]}
                    img={item}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field key={idx} value={Math.round(relativePrices[idx] * 1000) / 1000}/>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.chart}>
            <Charts
              spring={springPriceArr}
              summer={summerPriceArr}
              autumn={autumnPriceArr}
              winter={winterPriceArr}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <div>
            <Typography variant="h6" gutterBottom>
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
              <IconButton color='inherit' onClick={() => timer.current && clearInterval(timer.current)}>
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
            {iconSVG.map((item, idx) => (
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
                Trade {balanceTrade[selectedTradeId] || 0} Spring tokens for {balanceFor[selectedForId] || 0} Autumn tokens
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
