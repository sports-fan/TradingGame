import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const ModeSwtiching = ({value, onChange}) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Platform"
    >
      <ToggleButton value={0}>Beginner</ToggleButton>
      <ToggleButton value={1}>Advanced</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ModeSwtiching
