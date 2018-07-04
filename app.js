const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err)=>{
    if (err){

        throw err;
    }
    console.log('Mysql connected');
});

const app = express();

app.listen('3000',()=>{
    console.log("Server started");



});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/user',function(req, res){
    
            var appData = {
                "error": 1,
                "data": ""
                };
 
             name = req.body.name;
             email = req.body.email;
             password = req.body.password;
        
            db.query('insert into user (name, email,password) values ("' + name + '", "' + email + '","'+ password+'")',function(err,results) {

                if (!err) {
                        appData.error = 0;
                        appData["data"] = "User registered successfully!";
                        res.status(201).json(appData);
                    } else {
                        appData["data"] = "Some Error Occured!";
                        res.status(400).json(appData);
                    }
            
            
                // if(err) throw err;
            
            // res.status(200).json({
            //     message : results
            // });

            
    });


       

});

app.post('/login',function(req, res){    
 
    
    email = req.body.email;
    password = req.body.password;

   db.query('Select * from user where email = "'+email+'" and password = "'+password+'" ',function(err,results) {
    if (err) throw err;    

    try{

    if (results[0].email != null){

        res.status(200).json({
            message: 'Login Successful'
          
            
        }); 


    }
}catch(error){
    res.status(200).json({
        message: 'Login Failed'
      
        
    }); 

}
    });
    

   
});

