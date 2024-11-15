const moogose = require('mongoose');

const appointmentSchema = new moogose.Schema({
    name :{type: String, required: true},
    encryptedEmail :{type: String, required: true},
    encryptedPhone :{type: String, required: true},
    date :{type: String, required: true},
    time :{type: String, required: true},
    service :{type: String, required: true},
    pet: {type: String, required: true},
    status: {type: String, required: true},
})

const Appointment = moogose.model('Appointment', appointmentSchema);
module.exports = Appointment;