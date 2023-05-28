const mongoose=require('mongoose');

const patientInfo=new mongoose.Schema({
    usertype:{
        type:String,
        required:true
        },
        userId:{
            type:String,
            required:true

        },
        name:{
            type:String,
            required:true
        },

        phoneno:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        housename:{
            type:String,
            required:true
        },
        streetname:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
    }
}
); 
const PatientModel = mongoose.model("Patient",patientInfo);

module.exports = PatientModel;