import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser, } from "../features/userDatailsSlice";

function Read()
{
    const dispatch = useDispatch();

    const {user, loading} = useSelector((state)=>state.app)

    useEffect(()=>{
        dispatch(showUser())
    },[dispatch])

    if(loading)
    {
        return <h2>loading</h2>
    }



    return(
        <div className='container'>
        <Link to = "/Create" className='link'>create +</Link>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {user && user.map((d, i) => {
                    return (
                        <tr key={i}> {/* Each child in a list should have a unique "key" prop */}
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.password}</td>
                            <td>
                                <div className='btn'>
                                    <Link to={`/edit/${d.id}`} className="card-link" >Edit</Link>
                                    <button onClick={()=>{ dispatch(deleteUser(d.id))}}>del</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
   </div>
    )
}
export default Read;