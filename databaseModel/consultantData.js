const mongoose=require('mongoose');

const consultantInfo=new mongoose.Schema({
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
            required:true,
            unique:true
        },
        category:{
            type:String,
            required:true
        },
        licenceId:{
            type:String
            
        },
        gender:{
            type:String,
            required:true
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
const ConsultantModel = mongoose.model("consultant",consultantInfo);

module.exports = ConsultantModel;