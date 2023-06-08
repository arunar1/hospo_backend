const mongoose=require('mongoose');

const appointmentInfoPri=new mongoose.Schema({
   hospitaltype:{
        type:String,
        required:true
        },
        DistrictName:{
            type:String,
            required:true

        },
        Doctorname:{
            type:String,
            required:true
        },
        patientname:{
            type:String,
            required:true
        },
        patientphone:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
        ,
        slotid:{
            type:String,
            required:true

        }

}
); 
const AppointmentPriModel = mongoose.model("AppointmentPri",appointmentInfoPri);

module.exports = AppointmentPriModel;