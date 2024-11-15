const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3003;
const connectDB = require('../dbconn')
const { body, validationResult } = require('express-validator');
const mongoSanitize = require('mongo-sanitize');
const Appointment = require('../schema/appointment');
const {encrypt,decrypt} = require('../encryption');
app.use(cors());

app.use(express.json());

app.get('/api/appointments',async(req,res)=>{
    try {
        await connectDB();
        const appointments = await Appointment.find();
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }
        const decryptedAppointments = appointments.map((appointment) => {
            const decryptedEmail = decrypt(appointment.encryptedEmail);
            const decryptedPhone = decrypt(appointment.encryptedPhone);
            return {
                name: appointment.name,
                email: decryptedEmail,
                phone: decryptedPhone,
                date: appointment.date,
                time: appointment.time,
                service: appointment.service,
                pet: appointment.pet,
                status: appointment.status
                
            }
        })
        res.status(200).json(decryptedAppointments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
app.post('/api/appointment',[
    body('name').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').not().isEmpty().trim().escape(),
    body('date').not().isEmpty().trim().escape(),
    body('time').not().isEmpty().trim().escape(),
    body('service').not().isEmpty().trim().escape(),
    body('pet').not().isEmpty().trim().escape()
],async(req,res)=>{
   

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, date, time, service, pet } = req.body;
   
    try {
        await connectDB();
        const encryptedEmail = encrypt(email);
        const encryptedPhone = encrypt(phone);
        const appointment = new Appointment({
            name,
            encryptedEmail,
            encryptedPhone,
            date,
            time,
            service,
            pet,
            status: 'Pending'
        });
    await appointment.save();
    res.status(200).json({ message: "Appointment Added" });

    } catch (error) {
        console.log(error); 
    }
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });