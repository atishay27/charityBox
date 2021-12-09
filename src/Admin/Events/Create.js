import React from 'react';
import { useState,useEffect } from 'react';
import "./form.css";
import Select from 'react-select';
import { DatePicker, Space, TimePicker } from 'antd';
import 'antd/dist/antd.css';
import { projectFirestore } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Create = () => {
    const [name, setName] = useState("");
    const [address, SetAddress] = useState("");
    const [selectedValue, setSelectedValue] = useState([]);
    const [myvolunteer, setMyVolunteer] = useState([]);
    var isError = false;
    useEffect(() => {
        setMyVolunteer([]);
        projectFirestore.collection("users").where('role', '==', 'volunteer').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                const newVolunteer = {};
                var data = element.data()
                newVolunteer['value'] = data.email;
                newVolunteer['label'] = data.name;
                setMyVolunteer(arr => [...arr, newVolunteer]);

            });
        })
      }, [isError]);
    const city = [
        { value: 'Bengaluru', label: 'Bengaluru' }
    ]
    const area = [
        { value: 'BSK 3rd Stage', label: "BSK 3rd Stage" },
        { value: 'Electronic City', label: "Electronic City" }
    ]
    
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    const isEmpty = (str) => {
        return (!str || str.length === 0);
    }
    const checkValidation = (e) => {   
        if (isEmpty(e.target.city.value)) {
            isError=true;
            toast.error("City Field is Empty!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
        if (isEmpty(e.target.area.value)) {
            isError=true;
            toast.error("AREA FIELD IS EMPTY!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
        if (isEmpty(e.target.startDate.value)) {
            isError=true;
            toast.error("ENTER START DATE!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
        if (isEmpty(e.target.startTime.value)) {
            isError=true;
            toast.error("ENTER START TIME!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
        if (isEmpty(e.target.endTime.value)) {
            isError=true;
            toast.error("ENTER END TIME!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
        if (selectedValue.length<=0) {
            isError=true;
            console.log(selectedValue);
            toast.error("ENTER VOLUNTEER NAME!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        };
    }

    const sub = (e) => {
        e.preventDefault();
        isError=false;
        checkValidation(e);
        console.log(e.target.volunteer.value);
        
        // Add data to the store
        if (isError) {
            toast.error("CANNOT ADD EVENT!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            projectFirestore.collection("events").add({
                name: name,
                address: address,
                city: e.target.city.value,
                area: e.target.area.value,
                volunteer: selectedValue,  
                startDateTime: new Date(e.target.startDate.value +" " + e.target.startTime.value),
                endDateTime: new Date(e.target.startDate.value +" " + e.target.endTime.value)

            })
                .then((docRef) => {
                    toast.success('EVENT ADDED SUCCESSFULLY!!!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((error) => {
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    }

    return (
        <div className="container">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <form className="myform" onSubmit={(event) => { sub(event) }}>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline required-field">
                                    <Select placeholder="Select City" name="city" options={city} defaultValue={city[0]} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline required-field">
                                    <Select placeholder="Select Area" name="area" options={area} />
                                </div>
                            </div>
                        </div>
                        <div className="form-outline mb-4 required-field">
                            <input type="text" required id="eventName" className="form-control" placeholder="Enter Event Name" onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="form-outline mb-4 required-field">
                            <textarea required className="form-control" id="eventAddress" rows="4" placeholder="Enter Full Address" onChange={(e) => { SetAddress(e.target.value) }}></textarea>
                        </div>
                        <div className="form-outline mb-4 required-field">
                            <Select isMulti name="volunteer" id="volunteer" className="basic-multi-select" classNamePrefix="select"
                                placeholder="Select Volunteer" options={myvolunteer} onChange={handleChange} />
                        </div>
                        <div className="form-outline mb-4">
                            <div className="row justify-content-between">
                                <div className="col-4 required-field">
                                    <Space direction="vertical">
                                        <DatePicker name="startDate" size="large" onChange={onChange} placeholder="Event Date" format="YYYY-MM-DD" />
                                    </Space>
                                </div>
                                <div className="col-4 required-field">
                                    <Space direction="vertical">
                                        <TimePicker name="startTime" size="large" onChange={onChange} placeholder="Start Time" />
                                    </Space>
                                </div>
                                <div className="col-4 required-field">
                                    <Space direction="vertical">
                                        <TimePicker name="endTime" size="large" onChange={onChange} placeholder="End Time" />
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <div className="form-outline mb-4 fbt">
                            <button type="submit fbt" className="btn btn-primary">CREATE EVENT</button>
                        </div>
                        <div className="form-outline required-field">
                            <small><i>Required Fields</i></small>
                        </div>
                    </form>
                </div>
                <div className="col-2" />
            </div>
        </div>
    )
}

export default Create;