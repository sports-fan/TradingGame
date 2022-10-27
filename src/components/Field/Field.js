import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  typography: {
    marginTop: 5,
    marginBottom: 5,
    width: 150,
    height: 50
  }
})

const Field = ({value}) => {
  const classes = useStyles()
  return (
    <div className={classes.typography}>
      <TextField
        disabled
        size='small'
        variant='outlined'
        value={value}
      />
    </div>
  )
}

export default Field