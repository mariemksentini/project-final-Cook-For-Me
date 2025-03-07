// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { registerLicense } from "@syncfusion/ej2-base";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
// } from "@syncfusion/ej2-react-schedule";
// import { current } from "../../Redux/Actions/AuthActions";
// import { addRendezVous, getAllRendezVous, updateRendezVous } from "../../Redux/Actions/RendezVousActions";
// import { Card } from "flowbite-react";
// // import { addRendezVous, updateRendezVous, current } from "../redux/actions/rendezVousActions";

// // Register Syncfusion license key
// registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0");

// const GeneralCalendar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.AuthReducer.user);
//   const rendezVouss = useSelector((state)=> state.rendezVousReducer.rendezVouss)
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     dispatch(current());
//     dispatch(getAllRendezVous());
//   }, [dispatch]);
  
//   useEffect(() => {
//     if (rendezVouss.length > 0) {
//       const formattedAppointments = rendezVouss.map((rdv) => ({
//         Id: rdv._id, // Assuming MongoDB _id
//         Subject: rdv?.privateChef?.email,
//         StartTime: new Date(rdv.startTime), // Convert to Date object
//         EndTime: new Date(rdv.endTime), // Convert to Date object
        
//       }));
//       setAppointments(formattedAppointments);
//     }
//   }, [rendezVouss]);
  


//   return (
//     <>
//     <ScheduleComponent
//         height="550px"
//         width={"48vw"}
        
//         selectedDate={new Date()}
//         eventSettings={{ 
//             dataSource: rendezVouss.map((rdv) => ({
//             Id: rdv._id,
//             Subject: rdv?.privateChef?.email || "No Title",  // Fallback to avoid empty titles
//             StartTime: new Date(rdv.startTime),
//             EndTime: new Date(rdv.endTime),
//             }))
//         }}
        
//         >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//     </ScheduleComponent>
//     {user.role === 'privateChef' &&
//         <button>add appointment</button>
//     }

//     {/* Liste des commandes */}
//     <div className="w-1/2 p-4 overflow-y-auto">
//     <h2 className="text-2xl font-semibold mb-4 text-center">Accepted orders</h2>
//     {rendezVouss.map((rdv) => (
//         <Card
//         key={rdv._id}
//         className="p-4  shadow-md rounded-lg mb-4 cursor-pointer"


       
//         >
        
//         <p><strong>ID:</strong> {rdv._id}</p>
//         <p><strong>Private chef:</strong> {rdv?.privateChef?.name} {rdv?.privateChef?.lastName}</p>
//         <p><strong>Type</strong> {rdv?.type}</p>
        
//         </Card>
//     ))}
//     </div>
    
//     </>
//   );
// };

// export default GeneralCalendar;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import moment from "moment";
import { current } from "../../Redux/Actions/AuthActions";
import { getAllRendezVous } from "../../Redux/Actions/RendezVousActions";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// Register Syncfusion license key
registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0");

const GeneralCalendar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const rendezVouss = useSelector((state) => state.rendezVousReducer.rendezVouss);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    dispatch(current());
    dispatch(getAllRendezVous());
  }, [dispatch]);

  useEffect(() => {
    if (rendezVouss.length > 0) {
      const formattedAppointments = rendezVouss.map((rdv) => ({
        Id: rdv._id,
        Subject: rdv?.privateChef?.email || "No Title",
        StartTime: moment(rdv.startTime).toDate(), // Ensure proper Date conversion
        EndTime: moment(rdv.endTime).toDate(),
      }));
      setAppointments(formattedAppointments);
    }
  }, [rendezVouss]);

  return (
    <>
      <ScheduleComponent
        height="550px"
        width="48vw"
        selectedDate={new Date()}
        eventSettings={{ dataSource: appointments }} // Updated dynamically
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>

      {user.role === "privateChef" && <button>add appointment</button>}

      {/* List of Accepted Orders */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Accepted Orders</h2>
        {rendezVouss.map((rdv) => (
          <Card key={rdv._id} className="p-4 shadow-md rounded-lg mb-4 cursor-pointer" onClick={()=>navigate(`/RendezVousDetails/${rdv._id}`)}>

            <p><strong>ID:</strong> {rdv._id}</p>
            <p><strong>Private Chef:</strong> {rdv?.privateChef?.name} {rdv?.privateChef?.lastName}</p>
            <p><strong>Type:</strong> {rdv?.type}</p>
            <p><strong>start time:</strong> {rdv?.startTime}</p>
            <p><strong>end time:</strong> {rdv?.endTime}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default GeneralCalendar;


