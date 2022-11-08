import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  container: {
    marginTop: 30
  },
  display: {
    display: 'flex',
    alignItems: 'center'
  },
  marginTop30: {
    marginTop: 30
  },
  marginLeft20: {
    marginLeft: 20
  },
  marginLeft15: {
    marginLeft: 7
  },
  executeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    border: 'solid',
    padding: 25,
    height: 120
  },
  img: {
    border: 'solid'
  },
  totalTokens: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60
  },
  seasonalLogo: {
    width: 45,
    height:  45
  },
  totalField: {
    marginTop: 10,
    marginLeft: 15
  },
  totalValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 25
  },
  modebtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  flex: {
    display: 'flex',
  }
}))
