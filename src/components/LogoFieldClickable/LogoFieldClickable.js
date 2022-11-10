import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  logo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: 210,
    height: 56
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
      <div className={className}>
        <img src={img} alt="logo" onClick={onClick}/>
      </div>
      <div className={classes.typography}>
        <Typography
          variant="body1"
          ml={5}
          gutterBottom
        >
          {value}        
        </Typography>
      </div>
    </div>
  )
}

export default LogoFieldClickable