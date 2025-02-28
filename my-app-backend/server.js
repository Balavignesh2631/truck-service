const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//Database Connection

const db =mysql.createConnection (
    {
        host:'localhost',
        user :'root',
        password:'2631',
        database: 'truckdeliverydb'
    }
);

//connect to mysql

db.connect ((err) => {
    if(err) {
        console.error('error connecting:' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
}
);

//start the server

app.listen ( port, () =>{
    console.log(`server running on http://localhost:${port}`);
});
//POST route to handle form submission
app.post('/api/truckdatas',(req,res)=>{
    const { truckNo,driverName,materialName,quantity,billNo,billDate,materialreturnQuality,location}=req.body;

    const query='INSERT INTO truckdata (truckNo,driverName,materialName,quantity,billNo,billDate,materialreturnQuality,location) VALUES (?,?,?,?,?,?,?,?)';
    db.query(query,[truckNo,driverName,materialName,quantity,billNo,billDate,materialreturnQuality,location], (err,result)=>{
        if (err){
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({message:'truck data successfully submitted ',id:result.insertId});
    });
});


// GET route to fetch all truck data
app.get('/api/truckdatas',(req,res)=>{
    const query='SELECT * FROM truckdata';
    db.query(query,(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.json(result);
    });
})

// DELETE route to delete a row by id
app.delete('/api/truckdatas/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM truckdata WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No row found with the given id' });
      }
      res.status(200).json({ message: 'Row successfully deleted' });
    });
  });
  
// PUT route to update a row by id
app.put('/api/truckdatas/:id', (req,res)=>{
    const {id}=req.params;
    const { truckNo,driverName,dates,materialName,quantity,billNo,billDate,materialreturnQuality,location}=req.body;

    const query='UPDATE truckdata SET truckNo=?,driverName=?,materialName=?,quantity=?,billNo=?,billDate=?,materialreturnQuality=?,location=? where id=?';
    db.query(query,[truckNo,driverName,materialName,quantity,billNo,billDate,materialreturnQuality,location,id],(err,result)=>{
        if (err){
            return res.status(500).json({error:err.message});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message:'No row found with the given id'});
        }
        res.status(200).json({message:'Row successfully updated'});
    });
});
//GET route to fetch a row by id
app.get('/api/truckdatas/:id',(req,res)=>{
    const {id}=req.params;
    const query='SELECT * FROM truckdata WHERE id=?';
    db.query(query,[id],(err,result)=>{
        if (err){
            return res.status(500).json({error:err.message});

        }
        if(result.length===0){
            return res.status(404).json({message:'no row found with the given id'});
        }
        res.json(result[0]);
    });
})
