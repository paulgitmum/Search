const express = require('express');
const cors = require('cors');
const path  = require('path')
const bodyParser = require('body-parser')
const app = express();
app.use(cors())



app.use(bodyParser.json())

app.get('/users',(req,res)=>{

    const users = require('./users/MOCK');
    res.status(200).json(users())
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html' ));
    })
}


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`listening to port at ${PORT}`);

})