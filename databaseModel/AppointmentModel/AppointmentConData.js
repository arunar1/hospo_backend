const mongoose=require('mongoose');

const appointmentInfoCon=new mongoose.Schema({
   hospitaltype:{
        type:String,
        required:true
        },
        DistrictName:{
            type:String,
            required:true

        },
        hospitalname:{
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
        },
        slotid:{
            type:String,
            required:true

        }
}
); 
const AppointmentConModel = mongoose.model("AppointmentCon",appointmentInfoCon);

module.exports = AppointmentConModel;