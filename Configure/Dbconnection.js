const mongoose=require('mongoose')

module.exports.Dbconnect=async ()=>{
   try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('db connceted');
   } catch (error) {
    console.log('db failed',error);
   }
}

