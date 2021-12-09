import React ,{useEffect} from "react";
import firebase from "./firebase";
function PushNotification() { 

 //useEffect(()=>{
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();                                
    }).then(token=>{
      console.log('Token:',token)
    }).catch(()=>{
      console.log('error');
    })
   // })
  /*function Subscribe()
  {
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();
    }).then(token=>{
      alert("Notification is on");
      let Token=firebase.database().ref().child('token').child(token);
      Token.set(token);
    })
  }
  return (
    <div>
      <button onClick={Subscribe}>Subscribe</button>
    </div>
 );*/
}
 
export default PushNotification;
