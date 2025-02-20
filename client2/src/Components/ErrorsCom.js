import {useSelector} from 'react-redux'

import { Alert } from "flowbite-react";

const ErrorsCom = () => {

    const Errors = useSelector(state => state.ErrorsReducer)
  return (
    <div>
        {
            Errors.map((el,i,t)=>
                <Alert color="info" key={i}>
            <span className="font-medium">{el.msg}</span> 
          </Alert>
          )
        }
    </div>
  )
}

export default ErrorsCom