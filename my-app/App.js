import React from "react";
import Create from "./component/Create";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./component/read";
import Update from "./component/Update";
function App()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route excute path="/Create" element= {<Create />}/>
                <Route excute path="/" element={<Read />} />
                <Route excute path="/edit/:id" element ={<Update />} />
            </Routes>
        </BrowserRouter>
       
    )
}
export default App;