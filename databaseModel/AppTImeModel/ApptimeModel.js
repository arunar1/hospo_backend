const mongoose=require('mongoose');

const apptimeinfo=new mongoose.Schema({
        userId:{
            type:String,
            required:true

        },
        hospitalname:{
            type:String,
            required:true

        },
        timeslot:{
            type:Object,
            required:true,

        }
    }
    ); 
const AppointmentPriModel = mongoose.model("Appointmenttimeslot",apptimeinfo);

module.exports = AppointmentPriModel;
