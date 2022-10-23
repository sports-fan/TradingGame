import { useEffect, useState, useCallback, useMemo } from 'react';
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
import Charts from './components/Charts'
import useStyles from './styles.js'
import SpringSVG from './assets/box-1.svg'
import SummerSVG from './assets/box-2.svg'
import AutumnSVG from './assets/box-3.svg'
import WinterSVG from './assets/box-4.svg'
import { formatDate, getForBalance } from './utils';

function App() {
  const classes = useStyles()
  const iconSVG = [
    SpringSVG,
    SummerSVG,
    AutumnSVG,
    WinterSVG,
  ]
  const STATUS = {
    IDLE: 0,
    ONGOING: 1,
    PAUSED: 2
  }
  const [currentStatus, setCurrentStatus] = useState(STATUS.IDLE)
  const [selectedTradeId, setSelectedTradeId] = useState(null)
  const [selectedForId, setSelectedForId] = useState(null)
  const [balanceFor, setBalanceFor] = useState([0,0,0,0])
  const [balanceTrade, setBalanceTrade] = useState([0,0,0,0])
  const [currentDate, setCurrentDate] = useState(new Date('2021/09/05'))
  const [currentBalance, setCurrentBalance] = useState([100,100,100,100])
  const [totalBalance, setTotalBalance] = useState(400)
  const [absolutePrices, setAbsolutePrices] = useState([1, 1, 1, 1])
  const [relativePrices, setRelativePrices] = useState([
                                                        5/((5+6+7+8)/4),
                                                        6/((5+6+7+8)/4),
                                                        7/((5+6+7+8)/4),
                                                        8/((5+6+7+8)/4)
                                                      ])
  var initialProductionRates = {
    spring: 168,
    summer: 140,
    autumn: 120,
    winter: 105
  }
  const aday = 30 * 1000/365
  useEffect(() => {
    if (currentStatus === STATUS.ONGOING){
      if (currentDate === new Date('2022/6/5')) {
        initialProductionRates.spring = initialProductionRates.spring / 2
      } else if (currentDate === new Date('2025/6/5')) {
        initialProductionRates.summer = initialProductionRates.summer / 2
      } else if (currentDate === new Date('2028/6/5')) {
        initialProductionRates.autumn = initialProductionRates.autumn / 2
      } else if (currentDate === new Date('2031/6/5')) {
        initialProductionRates.winter = initialProductionRates.winter / 2
      }
      
      const productionRates = Object.values(initialProductionRates)
      const nextAbsPriceArr = absolutePrices.map((prevPrice, idx) => {
        return 0.99 * prevPrice  + 0.01 * (1 / productionRates[idx])
      })
      const totalPrices = nextAbsPriceArr.reduce((total, price) => total + price, 0)
      const updatedRelativePrice = nextAbsPriceArr.map((price) => {return price / totalPrices / 4})
      // setRelativePrices(updatedRelativePrice)
      setCurrentBalance([
        currentBalance[0] + initialProductionRates.spring * 144,
        currentBalance[1] + initialProductionRates.summer * 144,
        currentBalance[2] + initialProductionRates.winter * 144,
        currentBalance[3] + initialProductionRates.autumn * 144
      ])
      const tb = currentBalance.reduce((total, bal) => total + bal, 0)
      setTotalBalance(tb)
    }
  }, [currentDate, currentBalance, relativePrices, currentStatus, absolutePrices])

  useEffect(() => {
    if (currentStatus === STATUS.ONGOING){
      var date = new Date(currentDate)
      setInterval(function () {
        setCurrentDate(date.setDate(date.getDate() + 1))
      }, aday);
    }
  }, [currentDate, currentStatus])

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
    setCurrentStatus(STATUS.ONGOING)
  }, [])

  const handlePause = useCallback(() => {
    setCurrentStatus(STATUS.PAUSED)
  }, [])

  const handleRestart = useCallback(() => {
    setCurrentStatus(STATUS.IDLE)
    setCurrentDate(new Date('2021/09/05'))
    setCurrentBalance([100,100,100,100])
    setAbsolutePrices([1, 1, 1, 1])
    setRelativePrices([
      5/((5+6+7+8)/4),
      6/((5+6+7+8)/4),
      7/((5+6+7+8)/4),
      8/((5+6+7+8)/4)
    ])
    setBalanceFor([0,0,0,0])
    setBalanceTrade([0,0,0,0])
  }, [])

  const handleExecute = useCallback(() => {
    switch(selectedTradeId) {
      case 0:
        setCurrentBalance([currentBalance[selectedForId] - balanceTrade[selectedForId], currentBalance[1], currentBalance[2], currentBalance[3]])
        console.log('DDDDDDDDDDDDDDDDD', currentBalance[selectedForId], balanceTrade[selectedForId], currentBalance[selectedForId] - balanceTrade[selectedForId])
        break
      case 1:
        setCurrentBalance([currentBalance[0], currentBalance[selectedForId] - balanceTrade[selectedForId], currentBalance[2], currentBalance[3]])
        break
      case 2:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[selectedForId] - balanceTrade[selectedForId], currentBalance[3]])
        break
      case 3:
        setCurrentBalance([currentBalance[0], currentBalance[1], currentBalance[2], currentBalance[selectedForId] - balanceTrade[selectedForId]])
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
              <>
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
              </>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.chart}>
            <Charts />
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
              <IconButton color='inherit' onClick={handlePause}>
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
              <>{/* Trade */}
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
              </>
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
                value={formatDate(new Date(currentDate))}
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
