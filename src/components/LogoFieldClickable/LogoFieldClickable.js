import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  logo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: 210
  },
  typography: {
    marginTop: '-5px',
    maxWidth: '150px',
    width: '150px',
  }
})

const LogoFieldClickable = ({onClick, className, value, img}) => {
  const classes = useStyles()
  return (
    <div className={classes.logo}>
      {}
      <div className={className}>
        <img src={img} alt="logo" onClick={onClick}/>
      </div>
      <div className={classes.typography}>
        <TextField
          disabled
          size='small'
          variant='outlined'
          value={value}
        />
      </div>
    </div>
  )
}

export default LogoFieldClickable