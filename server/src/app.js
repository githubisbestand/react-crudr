const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const port = process.env.port || 5000;

app.use(cors());

app.use(express.json());

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root123",
    database : "regesterd"
})


con.connect(function(err){
    if(err)
    {
        console.log(err);
    }else{
        console.log("connection successfull......");
    }
})

app.get("/",(req, res)=>{
    const sql = "SELECT * FROM student";

    con.query(sql, (err, result)=>{
        if(err) return res.json({Message : "Error inside server"});
        return res.json(result);
    })
})


app.post("/singup", (req, res)=>{
      
        con.query('SELECT MAX(id) AS maxId From STUDENT',(error,results)=>{
            const newId=results[0].maxId+1;
            //console.log('hello id is ',results,newId)
            const sql = "INSERT INTO STUDENT (`id`,`name`, `email`, `password`) values (?)";
            const values = [
                newId,
                req.body.name,
                req.body.email,
                req.body.password,
            ]
            con.query(sql, [values], (err, data)=>{
                if(err) return res.json();
                return res.json(data);
        
            })
        })
       
})

app.put("/update/:id", (req, res)=>{
        const sql = "UPDATE STUDENT set `name` = ?, `email` = ?, `password` = ? WHERE id = ?";
        const id = req.params.id;
        const values = [
            req.body.name,
            req.body.email,
            req.body.password,
        ]
        con.query(sql, [...values, id], (err, data)=>{
            if(err) return res.json();
            return res.json(data);
    
        })
})


app.delete("/delete/:id", (req, res)=>{
    const sql = "DELETE FROM STUDENT WHERE id = ?";
        const id = req.params.id;
        const values = [
            req.body.name,
            req.body.email,
            req.body.password,
        ]
        con.query(sql, [id], (err, data)=>{
            if(err) return res.json();
            return res.json(data);
    
        })
})

app.listen(port, ()=>{
    console.log(`listining to the port no ${port}`);
})