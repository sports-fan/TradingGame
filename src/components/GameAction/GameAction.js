import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0px',
    marginBottom: '10px'
  }
})

const GameAction = ({children, comment}) => {
  const classes = useStyles()
  return (
    <div className={classes.actions}>
      {children}
      <Typography variant='h6' ml={1}>{comment}</Typography>
    </div>
  )
}

export default GameAction
