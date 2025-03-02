const mongoose = require('mongoose');

const connectToMongodb = async () =>{
   try{
        const url = 'mongodb://127.0.0.1:27017/ElderlyCare'
        await mongoose.connect(url);
   }catch(e){
     console.log('Error connecting to MongoDB:', e.message);
   }
}
module.exports = connectToMongodb;