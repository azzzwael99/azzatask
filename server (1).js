const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const mongoose =require('mongoose')
dotenv.config({path:"config.env"})


mongoose.connect(process.env.DB_URI).then((conn)=>{

    console.log(`Database connected :${conn.connection.host}`)
})
.catch((err) => {
    console.error(`Database Error: ${err}`);
    process.exit(1);

});

const app = express();

app.use(express.json());



if(process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);

}

const categorySchema = new mongoose.Schema({

    name:String
})

const CategoryModel = mongoose.model('category',categorySchema);

app.post('/',(req,res)=>{
    const name =req.body.name;
    console.log(req.body);
    const newcategory = new CategoryModel({name});
    newcategory.save().then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.json(err);

    });

});

app.get('/',(req,res)=> {
    res.send('Our API V2')
})
const PORT =process.env.PORT || 8000
app.listen(PORT,()=> {
    console.log(`App running running on port ${PORT}`);
})