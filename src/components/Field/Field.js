import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: 150,
    height: 50
  },
  typo: {
    fontSize: '2rem'
  }
})

const Field = ({value}) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography
        className={classes.typo}
        ml={5}
        gutterBottom
      >
        {value}        
      </Typography>
    </div>
  )
}

export default Field