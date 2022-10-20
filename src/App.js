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

function App() {
  const classes = useStyles()
  return (
    <Container className={classes.marginTop100}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Your tokens
              </Typography>
              <div>
                <LogoField
                  value="Spring Token"
                  img={SpringSVG}
                />
                <LogoField
                  value="Summer Token"
                  img={SummerSVG}
                />
                <LogoField
                  value="Autumn Token"
                  img={AutumnSVG}
                />
                <LogoField
                  value="Winter Token"
                  img={WinterSVG}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Relative prices
              </Typography>
              <div>
                <Field value="Spring price"/>
                <Field value="Summer price"/>
                <Field value="Autumn price"/>
                <Field value="Winter price"/>
              </div>
            </Grid>
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
              <div>
                <LogoFieldClickable
                  value="Spring Token"
                  img={SpringSVG}
                />
                <LogoFieldClickable
                  value="Summer Token"
                  img={SummerSVG}
                />
                <LogoFieldClickable
                  value="Autumn Token"
                  img={AutumnSVG}
                />
                <LogoFieldClickable
                  value="Winter Token"
                  img={WinterSVG}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                For
              </Typography>
              <div>
                <LogoFieldClickable
                  value="Spring Token"
                  img={SpringSVG}
                />
                <LogoFieldClickable
                  value="Summer Token"
                  img={SummerSVG}
                />
                <LogoFieldClickable
                  value="Autumn Token"
                  img={AutumnSVG}
                />
                <LogoFieldClickable
                  value="Winter Token"
                  img={WinterSVG}
                />
              </div>
            </Grid>
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
                value='date'
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
