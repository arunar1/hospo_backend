const mongoose=require('mongoose');

const appointmentInfoGov=new mongoose.Schema({
   hospitaltype:{
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
        DistrictName:{
            type:String,
            required:true

        },
        govhospitalname:{
            type:String,
            required:true
        },

        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        },
        slotid:{
            type:String,
            required:true

        },
        category:{
            type:String

        }

}
); 
const AppointmentGOvModel = mongoose.model("AppointmentGov",appointmentInfoGov);

module.exports = AppointmentGOvModel;