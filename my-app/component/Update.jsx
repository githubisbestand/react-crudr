import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userDatailsSlice";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.app);

    const [values, setValue] = useState({
        name: "",
        email: "",
        password: "",
        id: 0
    });

    useEffect(() => {
        if (id && user.length > 0) {
            const singleUser = user.find((d) => d.id === parseInt(id)); // Using find to get a single object
            if (singleUser) {
                setValue(singleUser);
            }
        }
    }, [id, user]);

    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    };

    const validateForm = (e) => {
        e.preventDefault();
        dispatch(updateUser(values));
        navigate("/");
    };

    return (
        <div className="signup-container">
            <div className="currentbrd">
                <form onSubmit={validateForm}>
                    <h2>update form</h2>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={handleChange} required />
                    </div>

                    <button className="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
