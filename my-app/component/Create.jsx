import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/userDatailsSlice";
import { useNavigate, useParams } from "react-router-dom";

function Create() {
    const { id } = useParams(); // id ko useParams hook se retrieve karein
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state)=> state.app);

    useEffect(() => {
        if(id) {
            const singleUser = user.find((d) => d.id === parseInt(id)); // id ko parseInt se convert karein
            if(singleUser) {
                setValue(singleUser);
            }
        }
    }, [id, user]); // useEffect ko id aur user par dependant banayein

    const [values, setValue] = useState({
        name: "",
        email: "",
        password: "",
        id: 0
    });

    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value }); // Object spreading theek kiya gaya hai
    };

    const validateForm = (e) => {
        console.log("values...", values);
        e.preventDefault();
        dispatch(createUser(values));
        navigate("/");
    };

    return (
        <div className="signup-container">
            <div className="currentbrd">
                <form onSubmit={validateForm} >
                    <h2>Registation form</h2>
                    <div className="input-group" >
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={values.name} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={values.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="input-group" >
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} required />
                    </div>

                    <button className="submit">Create</button>
                </form>
        
            </div>
        </div>
    );
}

export default Create;
