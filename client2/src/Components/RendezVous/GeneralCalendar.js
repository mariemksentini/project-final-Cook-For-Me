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
// import moment from "moment";
// import { current } from "../../Redux/Actions/AuthActions";
// import { getAllRendezVous } from "../../Redux/Actions/RendezVousActions";
// import { Card } from "flowbite-react";
// import { useNavigate } from "react-router-dom";

// // Register Syncfusion license key
// registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0");

// const GeneralCalendar = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.AuthReducer.user);
//   const rendezVouss = useSelector((state) => state.rendezVousReducer.rendezVouss);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     dispatch(current());
//     dispatch(getAllRendezVous());
//   }, [dispatch]);

//   useEffect(() => {
//     if (rendezVouss.length > 0) {
//       const formattedAppointments = rendezVouss.map((rdv) => ({
//         Id: rdv._id,
//         Subject: rdv?.privateChef?.email || "No Title",
//         StartTime: moment(rdv.startTime).toDate(), // Ensure proper Date conversion
//         EndTime: moment(rdv.endTime).toDate(),
//       }));
//       setAppointments(formattedAppointments);
//     }
//   }, [rendezVouss]);

//   return (
//     <>
//       <ScheduleComponent
//         height="550px"
//         width="48vw"
//         selectedDate={new Date()}
//         eventSettings={{ dataSource: appointments }} // Updated dynamically
//       >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//       </ScheduleComponent>

//       {user.role === "privateChef" && <button>add appointment</button>}

//       {/* List of Accepted Orders */}
//       <div className="w-1/2 p-4 overflow-y-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Accepted Orders</h2>
//         {rendezVouss.map((rdv) => (
//           <Card key={rdv._id} className="p-4 shadow-md rounded-lg mb-4 cursor-pointer" onClick={()=>navigate(`/RendezVousDetails/${rdv._id}`)}>

//             <p><strong>ID:</strong> {rdv._id}</p>
//             <p><strong>Private Chef:</strong> {rdv?.privateChef?.name} {rdv?.privateChef?.lastName}</p>
//             <p><strong>Type:</strong> {rdv?.type}</p>
//             <p><strong>start time:</strong> {rdv?.startTime}</p>
//             <p><strong>end time:</strong> {rdv?.endTime}</p>
//           </Card>
//         ))}
//       </div>
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
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0");

const GeneralCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const token = localStorage.getItem('token')
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
        StartTime: moment(rdv.startTime).toDate(),
        EndTime: moment(rdv.endTime).toDate(),
        BackgroundColor:
          !rdv.client || (token && rdv.client === user._id) ? "bg-green-200" : "bg-red-300",
      }));
      setAppointments(formattedAppointments);
    }
  }, [rendezVouss, user, token]);

  const filteredRendezVous = rendezVouss.filter(
    (rdv) => !rdv.client || (token && rdv.client === user._id)
  );

  return (
    <div className="flex w-full h-screen p-4 space-x-4">
      {/* Calendar */}
      <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
        <ScheduleComponent
          height="550px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: appointments }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>

      {/* Accepted Orders */}
      <div className="w-1/2 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">List of appointments</h2>
        {filteredRendezVous.map((rdv) => (
          <Card
            key={rdv._id}
            className={`p-4 shadow-md rounded-lg mb-4 cursor-pointer flex items-center space-x-4 ${
              rdv.client && rdv.client !== user._id ? "bg-red-300" : "bg-white"
            }`}
            onClick={() => navigate(`/RendezVousDetails/${rdv._id}`)}
          >
            <img
              src={rdv?.privateChef?.image || "https://via.placeholder.com/50"}
              alt="Chef Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{rdv.privateChef?.name} {rdv.privateChef?.lastName}</p>
              <p className="text-gray-500">{rdv?.type}</p>
              <p className="text-sm"><strong>Start:</strong> {moment(rdv.startTime).format("LLL")}</p>
              <p className="text-sm"><strong>End:</strong> {moment(rdv.endTime).format("LLL")}</p>
              <p className="text-sm text-center text-teal-800"><strong>{rdv.price}</strong></p>
              {rdv.client && (
                <p className="text-sm text-gray-700">
                  <strong>Client:</strong> {rdv.client.name} {rdv.client.lastName}
                </p>
              )}
            </div>
          </Card>
        ))}
        {user.role === "privateChef" && <Button onClick={()=> navigate('/AddRendezVous')}>add appointment</Button>}
      </div>
    </div>
  );
};

export default GeneralCalendar;