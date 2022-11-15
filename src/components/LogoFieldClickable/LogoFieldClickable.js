import Typography from '@mui/material/Typography';
import * as cn from 'classnames';
import { makeStyles } from "@mui/styles"


const useStyles = makeStyles({
  logo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    width: 210,
    height: 56
  },
  typography: {
    marginTop: '-2px',
    maxWidth: '150px',
    width: '150px',
  }
})

const LogoFieldClickable = ({onClick, classClicked, value, img}) => {
  const classes = useStyles()
  return (
    <div className={cn(classes.logo, classClicked)} onClick={onClick}>
      <div>
        <img src={img} alt="logo"/>
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