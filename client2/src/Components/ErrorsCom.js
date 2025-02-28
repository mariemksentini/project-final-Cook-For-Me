// import {useSelector} from 'react-redux'

// import { Alert } from "flowbite-react";

// const ErrorsCom = () => {

//     const Errors = useSelector(state => state.ErrorsReducer)
//   return (
//     <div>
//         {
//             Errors.map((el,i,t)=>
//                 <Alert color="info" key={i}>
//             <span className="font-medium">{el.msg}</span> 
//           </Alert>
//           )
//         }
//     </div>
//   )
// }

// export default ErrorsCom
import { useSelector } from 'react-redux';
import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";

const ErrorsCom = () => {
    const Errors = useSelector(state => state.ErrorsReducer);
    const [visibleErrors, setVisibleErrors] = useState([]);

    useEffect(() => {
        if (Errors.length) {
            setVisibleErrors(Errors);
            Errors.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleErrors(prev => prev.filter((_, i) => i !== index));
                }, 3000);
            });
        }
    }, [Errors]);

    return (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 z-50">
            {visibleErrors.map((el, i) => (
                <Alert color="failure" key={i} className="opacity-100 transition-opacity duration-1000 ease-in-out fade-out">
                    <span className="font-medium">{el.msg}</span>
                </Alert>
            ))}
        </div>
    );
};

export default ErrorsCom;
