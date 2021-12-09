import React, { useState, useEffect, useRef } from "react";
import MaterialTable from 'material-table';
//import "./table.css";
import fakeData from './fakeData.json';
import { Button, Modal } from "react-bootstrap";
import tableIcons from "./icons";
import { projectFirestore } from '../../firebase';

const Ongoing = () => {
  let nameRef = useRef();
  let eventRef = useRef();
  let dateRef = useRef();
  let [selectedEvent, selectedState] = useState([]);
  // let [currentEvent,eventState]=useState(undefined);
  // // if(currentEvent){
  // //   projectFirestore.collection("events").where('name', '==', name).onSnapshot((querySnapshot) => {
  // //     const currEvent = []
  // //     querySnapshot.forEach((doc) => {
  // //       currEvent.push(doc.data())
  // //     })
  // //     setCurrEvent()
  // //   })
  // // }
  // // useEffect(()=>{
  // //   console.log(currentEvent)
  // //   if(currentEvent!==undefined){
  // //   projectFirestore.collection("events").where('name', '==', currentEvent).onSnapshot((querySnapshot) => {
  // //         const currEvent = []
  // //         querySnapshot.forEach((doc) => {
  // //           currEvent.push(doc.data())
  // //         })
  // //         // setCurrEvent()
  // //       })}
  // // },[currentEvent])

  // Modal
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState();
  let eventName = ""
  const handleClose = (e) => setShow(false);
  const handleShow = (name) => {
    projectFirestore.collection("events").where('name', '==', name).onSnapshot((querySnapshot) => {
      querySnapshot.forEach(e => selectedState(e.data()))
    })
    setShow(true); console.log("LLLLL", selectedEvent)
    setQuantity();
  }

  const handleSubmit = (e) => {

    projectFirestore.collection('pendingDonations').add({
      name: nameRef.current.value,
      //email:email,
      role: "donor",
      quantity: quantity,
      event: eventRef.current.value,
    })
      .then(() => {
        alert('Added');
      })
      .catch((error) => {
        alert(error.message);
      })
    setShow(false);

    ;
  }
  //
  //Start

  const ref = projectFirestore.collection("events")
  console.log('ddddaata', ref);

  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        var mydata = doc.data();
        mydata['startDateTime'] = mydata['startDateTime'].toDate();
        mydata['endDateTime'] = mydata['endDateTime'].toDate();
        items.push(mydata);
      })
      setData(items)
      setLoader(false)
      console.log('Inside Get Data', loader)
    })
  }
  //userInfo
  const email = sessionStorage.getItem("email");
  const user1 = projectFirestore.collection("users")
  console.log('Usersssssss:', user1);
  const [user, setUser] = useState([]);
  function myDate(myDate) {
    var mydate = new Date(myDate);
    console.log(myDate);
    var day = mydate.getDate();
    var month = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"][mydate.getMonth()];
    if (day < 10) {
      day = "0" + day;
    }
    var str = mydate.getFullYear() + '-' + month + '-' + day;

    return str;
  }
  function myTime(d) {
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    return hour+":"+minute+":"+seconds;;
  }
  function getUser() {
    user1.where('email', '==', email).onSnapshot((querySnapshot) => {
      const userss = [];
      querySnapshot.forEach((doc) => {
        userss.push(doc.data())
      })
      setUser(userss)
    })
  }

  useEffect(() => {
    getData()
    console.log('data', data);
    getUser()
    console.log(user);

  }, [])


  //End


  return (
    // <div className="myTable" style={{maxWidth: "85%"}}>
    //   <MaterialTable
    //   icons={tableIcons}
    //   detailPanel={rowData => {
    //     const volunteers = rowData.volunteer;
    //     const allVolunteers = volunteers.map((number) =>    <td className="mytabStyle2">{number}</td>  );
    //     const mycolspan = volunteers.length;
    //     return (
    //       <div className="detailPanel">
    //         <table className="mytabStyle">
    //           <tr className="mytabStyle">
    //             <th className="myHeader">ADDRESS</th>
    //             <td className="mytabStyle" colSpan={mycolspan}>{rowData.address}</td>
    //           </tr>
    //           <tr>
    //             <th  className="myHeader">VOLUNTEER</th>
    //             {allVolunteers}
    //           </tr>
    //         </table>

    //       </div>
    //     )
    //   }}
    //     columns={[
    //       { title: 'Name', field: 'name' },
    //       { title: 'City', field: 'city' },
    //       { title: 'Area', field: 'area'},
    //       { title: 'Event Date', field: 'startDate'},
    //       { title: 'Start Time', field: 'startTime'},
    //       { title: 'End Time', field: 'endTime'},
    //     ]}
    //     data={fakeData}
    //     title="Ongoing Event's"
    //     actions={[
    //       {   
    //         icon: ()=><Button className="Button">Donate</Button>,
    //         tooltip: 'Donate',
    //       }
    //     ]}
    //   />
    //   </div>

    //Fetching

    <div className="App">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
          <h4>DONATION DETAIL's</h4>


          {loader === false && (user.map((user) =>
            <div key={user}>
              <label>Name</label>
              <input type="text" value={user.name} ref={nameRef} disabled />
            </div>
          ))}
          {/* {loader === false && (data.map((event) =>  */}
          <div >
            <label>Event Name</label>
            <input type="text" value={selectedEvent.name} ref={eventRef} disabled /><br />
            <label>Date</label>
            <input type="text" value={myDate(selectedEvent.startDateTime)} ref={dateRef} disabled /><br />
          </div>
          {/* ))} */}
          <label>Quantity</label>
          <input type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} /><br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Ongoing Donations</h1>
      {/* <h2>{sessionStorage.getItem("email")}</h2> */}
      <form
        onSubmit={e => e.preventDefault()}
      >

        {/* <p>Name</p>
        {loader === false && (user.map((user) =>
        <div key={user}>handle
          <p>{user.name}</p>
          </div>
          ))} */}
        {loader === false && (data.map((event) => (
          <div key={event}>
            <p>{event.name}</p>
            <p>{event.city}</p>
            <p>{event.area}</p>
            <p>{myDate(event.endDateTime)}</p>
            <p>{myTime(event.endDateTime)}</p>
            <p>{event.endTime}</p>
            <Button type="submit" onClick={() => { handleShow(event.name) }} >Donate</Button>
            <hr />
          </div>
        )))}
      </form>

    </div>


    //End
  );
};

export default Ongoing;