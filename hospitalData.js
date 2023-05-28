const mongoose=require('mongoose');

const hospitalInfo=new mongoose.Schema({
        userId:{
            type:String,
            required:true

        },
        hospitalname:{
            type:String,
            required:true
        },

        phoneno:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        hospitaltype:{
            type:String,
            required:true
        },
        licenseId:{
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
const PatientModel = mongoose.model("hospital",hospitalInfo);

module.exports = PatientModel;