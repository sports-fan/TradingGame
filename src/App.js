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
import TransitionModal from './components/Modal/Modal'
import useStyles from './styles.js'
import { getForBalance } from './utils';
import SeasonalLogo from './assets/Seasonal-Tokens-Logo.png'
import { ICON_SVG, INITIAL_DATE, TOKEN_ARRAY, STATUS, A_DAY } from './constants'

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

function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [springPriceArr, setSpringPriceArr] = useState([])
  const [summerPriceArr, setSummerPriceArr] = useState([])
  const [autumnPriceArr, setAutumnPriceArr] = useState([])
  const [winterPriceArr, setWinterPriceArr] = useState([])
  const [selectedTradeId, setSelectedTradeId] = useState(null)
  const [selectedForId, setSelectedForId] = useState(null)
  const [balanceFor, setBalanceFor] = useState([0,0,0,0])
  const [balanceTrade, setBalanceTrade] = useState([0,0,0,0])
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE)
  const [currentBalance, setCurrentBalance] = useState([100,100,100,100])
  const [absolutePrices, setAbsolutePrices] = useState([600/168, 600/140, 600/120, 600/105]) 

  const timer = useRef()
  const [productionRates, setProductionRates] = useState({
    spring: 168/600,
    summer: 140/600,
    autumn: 120/600,
    winter: 105/600
  })

  useEffect(() => {
    if (currentDate === Date.parse('2022-06-05') ||
        currentDate === Date.parse('2025-06-05') ||
        currentDate === Date.parse('2028-06-05')) {
      setProductionRates(prev => ({ ...prev, spring: prev.spring / 2 }))
    } else if (currentDate === Date.parse('2023-03-06') ||
               currentDate === Date.parse('2026-03-06') ||
               currentDate === Date.parse('2029-03-06') ) {
      setProductionRates(prev => ({ ...prev, summer: prev.summer / 2 }))
    } else if (currentDate === Date.parse('2023-12-05') ||
               currentDate === Date.parse('2026-12-05') ||
               currentDate === Date.parse('2029-12-05')) {
      setProductionRates(prev => ({ ...prev, autumn: prev.autumn / 2 }))
    } else if (currentDate === Date.parse('2024-09-04') ||
               currentDate === Date.parse('2027-09-04') ||
               currentDate === Date.parse('2030-09-04')) {
      setProductionRates(prev => ({ ...prev, winter: prev.winter / 2 }))
    } else if (currentDate === Date.parse('2031-09-15')) {
      clearInterval(timer.current)
      setStatus(STATUS.IDLE)
      setOpen(true)
    }
  }, [currentDate])

  useEffect(() => {
    if (currentDate === INITIAL_DATE) {
      return
    }
    setAbsolutePrices(prev => {
      const ratesArr = Object.values(productionRates)
      const result = prev.map((prevPrice, idx) => 0.99 * prevPrice  + 0.01 * (1 / ratesArr[idx]))
      return result
    })
  }, [currentDate, productionRates])

  const relativePrices = useMemo(() => {
    const totalPrices = absolutePrices.reduce((total, price) => total + price, 0)
    const result = absolutePrices.map((price) => price / totalPrices * 4)
    setSpringPriceArr(prev => {
      const arr = prev
      if (arr.length >= 365 * 3) {
        arr.shift()
        return arr.concat(result[0])
      } else 
        return arr.concat(result[0])
    })
    setSummerPriceArr(arr => {
      if (arr.length >= 365 * 3) {
        arr.shift()
        return arr.concat(result[1])
      } else 
        return arr.concat(result[1])
    })
    setAutumnPriceArr(arr => {
      if (arr.length >= 365 * 3) {
        arr.shift()
        return arr.concat(result[2])
      } else 
        return arr.concat(result[2])
    })
    setWinterPriceArr(arr => {
      if (arr.length >= 365 * 3) {
        arr.shift()
        return arr.concat(result[3])
      } else 
        return arr.concat(result[3])
    })
    return result
  }, [absolutePrices])

  useEffect(() => {
    if (selectedForId >= 0) {
      let balanceB
      if (selectedTradeId === selectedForId) {
        balanceB = currentBalance[selectedForId]
      } else {
        const balanceA = currentBalance[selectedTradeId]
        const priceA = relativePrices[selectedTradeId]
        const priceB = relativePrices[selectedForId]
        balanceB = +getForBalance(balanceA, priceA, priceB).toFixed(2)
      }
      setBalanceFor(() => {
        const balance = [0,0,0,0]
        balance[selectedForId] = balanceB
        return balance
      })
    }
  }, [selectedTradeId ,selectedForId, relativePrices, currentBalance])

  const totalBalance = currentBalance.reduce((total, bal) => total + bal, 0)

  const handleTradeClick = useCallback(id => {
    setSelectedTradeId(id)
    setBalanceTrade(() => {
      const balance = [0,0,0,0]
      balance[id] = +currentBalance[id].toFixed(2)
      return balance
    })
  }, [currentBalance])
  
  const handleForClick = useCallback(id => {
    if (selectedTradeId !== null) {
      setSelectedForId(id)
    }
  }, [selectedTradeId])

  const handleStart = useCallback(() => {
    setStatus(STATUS.ONGOING)
    timer.current = setInterval(() => setCurrentDate(date => date + 1000 * 3600 * 24), A_DAY)
  }, [])

  const handleRestart = useCallback(() => {
    timer.current && clearInterval(timer.current)
    setStatus(STATUS.IDLE)
    setCurrentDate(INITIAL_DATE)
    setCurrentBalance([100,100,100,100])
    setAbsolutePrices([600/168, 600/140, 600/120, 600/105])
    setProductionRates({
        spring: 168/600,
        summer: 140/600,
        autumn: 120/600,
        winter: 105/600
    })
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
      setCurrentBalance(prevBalance => {
        const balance = prevBalance
        balance[selectedTradeId] = 0
        balance[selectedForId] += balanceFor[selectedForId]
        balanceFor[selectedForId] = 0
        return balance
      })
      setBalanceTrade([0,0,0,0])
      setBalanceFor([0,0,0,0])
      setSelectedForId(null)
      setSelectedTradeId(null)
    }
  }, [balanceFor, selectedForId, selectedTradeId, status])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

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
                      value={currentBalance[idx].toFixed(2)}
                      img={item}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field key={idx} value={relativePrices[idx].toFixed(5)}/>
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
          <div className={classes.marginLeft15}>
            <Typography variant="h6" ml={4} gutterBottom>
              Total Tokens
            </Typography>
            <div className={classes.totalTokens}>
              <img className={classes.seasonalLogo} src={SeasonalLogo} alt='Seasonal Token'/>
              <div className={classes.totalField}>
                <Field value={totalBalance}/>
              </div>
            </div>
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
      <TransitionModal
        open={open}
        onClose={handleClose}
        total={totalBalance}
        content={`Trading game ended. You earned ${totalBalance} tokens. Please click Restart game button to restart. Thank you`}
      />
    </Container>
  );
}

export default App;
