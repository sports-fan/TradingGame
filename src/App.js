import { useEffect, useState, useCallback, useMemo } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
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
    const metadata = useMemo(() => [
      {
        title: "Spring",
        img: SpringSVG,
        balance: 100,
        relativePrice: 2
      },
      {
        title: "Summer",
        img: SummerSVG,
        balance: 100,
        relativePrice: 2.5
      },
      {
        title: "Autumn",
        img: AutumnSVG,
        balance: 100,
        relativePrice: 3
      },
      {
        title: "Winter",
        img: WinterSVG,
        balance: 100,
        relativePrice: 3.5
      },
    ], [])
  const [selectedTradeId, setSelectedTradeId] = useState(null)
  const [selectedForId, setSelectedForId] = useState(null)
  const [balanceFor, setBalanceFor] = useState([0,0,0,0])
  const [currentTime, setCurrentTime] = useState(formatDate(new Date(2021, 8, 5)))

  useEffect(() => {
    // setInterval()
  })

  const handleTradeClick = useCallback(id => {
    setSelectedTradeId(id)
  }, [setSelectedTradeId])

  const handleForClick = useCallback(id => {
    const balanceA = metadata[selectedTradeId].balance
    const priceA = metadata[selectedTradeId].relativePrice
    const priceB = metadata[id].relativePrice
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
  }, [selectedTradeId, setSelectedForId, setBalanceFor, metadata])


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
            {metadata.map((item, idx) => (
              <>
                <Grid item xs={6}>
                  <LogoField
                    key={idx}
                    value={item.balance}
                    img={item.img}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field key={idx} value={item.relativePrice}/>
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
            <Field value="Total Tokens"/>
          </div>
          <div>
            <GameAction comment="Start trading"><StartIcon fontSize='large'/></GameAction>
            <GameAction comment="Pause trading"><StopIcon fontSize='large'/></GameAction>
            <GameAction comment="Restart game"><RestartIcon fontSize='large'/></GameAction>
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
            {metadata.map((item, idx) => (
              <>
                <Grid item xs={6}>
                  <LogoFieldClickable
                    key={idx}
                    className={idx === selectedTradeId ? classes.img : null}
                    value={item.balance}
                    img={item.img}
                    onClick={() => handleTradeClick(idx)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LogoFieldClickable
                    key={idx}
                    className={idx === selectedForId ? classes.img : null}
                    value={balanceFor[idx]}
                    img={item.img}
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
                value={currentTime}
              />
            </div>
          </div>
          <div className={classes.executeBox}>
            <div className={classes.padding15}>
              <Typography variant="p" gutterBottom>
                Trade 100 Spring tokens for 120.4 Autumn tokens
              </Typography>
            </div>
            <Button variant='contained'>Execute Trade</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
