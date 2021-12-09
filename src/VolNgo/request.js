
/*function enroll()
  {
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();
    }).then(volunteerToken=>{
      alert("you are enroll");
      let Token=firebase.database().ref().child('volunteerToken').child(volunteerToken);
      Token.set(volunteerToken);
    })
  }
export default enroll;*/
import React, { useState ,useEffect} from "react";
import '../App.css';
import firebase from "firebase";
const RequestMsg =()=>{
  const [name ,setName] = useState("");
  const [skill ,setSkill] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoader(true);
    var msgDb = firebase.firestore();
    msgDb.collection('RequestMsg')
    .add({
      name:name,
      skill:skill,
      
    }).then(()=>{
      setLoader(false);
      alert('Message has been submitted');
    })
    .catch((error)=>{
      alert(error.skill);
      setLoader(false);
    });
    setName("");
    setSkill("");
    
  };
        return(
          <form className="form" onSubmit={handleSubmit}>
            <h1>VOLUNTEER DETAIL</h1>
            <label>NAME</label>
            <input placeholder="" value={name} onChange={(e)=> setName(e.target.value)}/>
            <label>SKILL</label>
            <input placeholder="" value={skill} onChange={(e)=> setSkill(e.target.value)}/>
            <button type="submit">SEND</button>
          </form>
        );
      };
    export default RequestMsg;





/*const RequestMsg =()=>{
    const [email ,setEmail] = useState("");
   
    
    const [loader, setLoader] = useState(false);
    const handleSubmit = (e)=>{
      e.preventDefault();
      setLoader(true);
      var mailDb = firebase.firestore();
      mailDb.collection('RequestMsg')
      .add({
        email:email,
       
      }).then(()=>{
        setLoader(false);
        alert('You are enroll');
      })
      .catch((error)=>{
        alert(error.email);
        setLoader(false);
      });
      setEmail("");
      
    };
          return(
              <form>
              <label>email</label>
              <input placeholder="abc@gmail.com" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
              <button type="submit" onSubmit={handleSubmit}>SEND</button>
            </form>
          );
        };
      export default RequestMsg;*/