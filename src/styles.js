import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  container: {
    marginTop: 30
  },
  date: {
    display: 'flex',
    alignItems: 'center',

  },
  marginTop30: {
    marginTop: 30
  },
  marginLeft20: {
    marginLeft: 20
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
    backgroundColor: '#EEEEEE',
    borderRadius: 7
  },
  total: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 7,
    padding: '1.5em 1em 1.5em 1em'
  },
  totalTokens: {
    display: 'flex',
    alignItems: 'center',
    height: 45
  },
  seasonalLogo: {
    width: 35,
    height:  35
  },
  totalValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modebtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  flex: {
    display: 'flex',
  },
  hr: {
    marginBottom: '2em',
    color: '#CCCCCC'
  },
  actions: {
    margin: '1em'
  },
  tradefor: {
    marginBottom: '1em',
    paddingLeft: '2em',
    paddingRight: '2em'
  }
}))
