import React from 'react'
import Alert from '@mui/material/Alert';
function CustomAlert({error , calorieAlert , alertStatus}) {
  return (
    <div  >
    <Alert severity={alertStatus}>{error} {calorieAlert && calorieAlert}</Alert>
    </div>
  )
}

export default CustomAlert