const router = require('express').Router();
const { google } = require('googleapis');
const Token = require('../models/tokenModel');
const Appointment = require('../models/Appointment');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
);

router.get('/', async (req, res, next) => {
  res.send({ message: 'API is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    const tokenDoc = new Token({ ...tokens });
    await tokenDoc.save();
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

router.post('/create-event', async (req, res, next) => {
  try {
    const { summary, description, location, startDateTime, endDateTime } = req.body;
    const tokenDoc = await Token.findOne({}); // Adjust query to find the correct token
    oauth2Client.setCredentials({ refresh_token: tokenDoc.refresh_token });
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId: '1',
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
      },
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});


router.get('/appointments', async (req, res, next) => {
  try {
    const appointments = await Appointment.find(); 
    res.json(appointments); 
  } catch (error) {
    next(error); 
  }
});


module.exports = router;
