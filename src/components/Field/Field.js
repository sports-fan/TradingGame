import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  typography: {
    marginTop: '15px',
    marginDown: '15px',
    marginLeft: '10px',
    marginRight: '10px',
    width: '150px',
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