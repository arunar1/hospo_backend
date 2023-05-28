const mongoose=require('mongoose');

const hospitalInfo=new mongoose.Schema({
    usertype:{
        type:String,
        required:true
        },
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
        hospitaltype:{
            type:String,
            required:true
        },
        licenceId:{
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
const HospitalModel = mongoose.model("hospital",hospitalInfo);

module.exports = HospitalModel;