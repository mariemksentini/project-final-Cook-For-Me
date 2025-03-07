
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
import { current } from "../../Redux/Actions/AuthActions";
import { addRendezVous, getAllRendezVous, updateRendezVous } from "../../Redux/Actions/RendezVousActions";
// import { addRendezVous, updateRendezVous, current } from "../redux/actions/rendezVousActions";

// Register Syncfusion license key
registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0");

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const rendezVouss = useSelector((state)=> state.rendezVousReducer.rendezVouss)
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    dispatch(current());
    dispatch(getAllRendezVous());
  }, [dispatch]);
  
  useEffect(() => {
    if (rendezVouss.length > 0) {
      const formattedAppointments = rendezVouss.map((rdv) => ({
        Id: rdv._id, // Assuming MongoDB _id
        Subject: rdv.purpose,
        StartTime: new Date(rdv.startTime), // Convert to Date object
        EndTime: new Date(rdv.endTime), // Convert to Date object
        privateChef: rdv.privateChef,
        client: rdv.client,
      }));
      setAppointments(formattedAppointments);
    }
  }, [rendezVouss]);
  

  const onActionComplete = (args) => {
    console.log(args)
    if (args.requestType === "eventCreated") {
      const newEvent = args.addedRecords[0];
      const rdvData = {
        startTime: newEvent.StartTime.toISOString(),
        endTime: newEvent.EndTime.toISOString(),
        purpose: newEvent.Subject,
        privateChef: user._id,
      };
      if (user.role === "privateChef") {
        dispatch(addRendezVous(rdvData));
        console.log(rdvData)
      }
    }

    if (args.requestType === "eventChanged") {
      const updatedEvent = args.changedRecords[0];
      const rdvData = {
        id: updatedEvent.Id,
        startTime: updatedEvent.StartTime.toISOString(),
        endTime: updatedEvent.EndTime.toISOString(),
        purpose: updatedEvent.Subject,
      };
      if (user.role === "privateChef" && user._id === updatedEvent.privateChef) {
        dispatch(updateRendezVous(rdvData));
        console.log(rdvData)
      }
    }
  };

  return (
    <ScheduleComponent
  height="550px"
  width={"70vw"}
  
  selectedDate={new Date()}
  eventSettings={{ 
    dataSource: rendezVouss.map((rdv) => ({
      Id: rdv._id,
      Subject: rdv?.purpose || "No Title",  // Fallback to avoid empty titles
      StartTime: new Date(rdv.startTime),
      EndTime: new Date(rdv.endTime),
      privateChef: rdv.privateChef,
      client: rdv.client,
    }))
  }}
  actionComplete={onActionComplete}
>
  <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
</ScheduleComponent>

  );
};

export default CalendarComponent;

