import Typography from '@mui/material/Typography';
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
  container: {
    maxWidth: '150px',
    width: '150px',

  }
})

const LogoField = ({value, img}) => {
  const classes = useStyles()
  return (
    <div className={classes.logo}>
      <img src={img} alt="logo"/>
      <div className={classes.container}>
        <Typography
          variant="body1"
          ml={6}
          gutterBottom
        >
          {value}        
        </Typography>
      </div>
    </div>
  )
}

export default LogoField