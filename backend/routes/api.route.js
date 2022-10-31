const router = require('express').Router();
const { request } = require('express');
const {google} = require('googleapis')

const GOOGLE_CLIENT_ID = '282079938425-ltk4kb2l0vgeinup36q8un966228hblu.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECERT = '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'
const REFRESH_TOKEN = '4/0ARtbsJo-WKdy7vkftAkg4tRPs-ULWTofJZwznFLII2Bg2m69bs8tE43KFyI56PDHSL_rqA'
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECERT,
  'http://localhost:3000'
)
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens',async(req,res,next)=>{
  try{
    const { code } = req.body
    const {tokens} = await oauth2Client.getToken(code)
    res.send(tokens)
  }catch(error){
    next(error)
  }
})

router.post('/create-event' ,async(req,res,next) =>{
    try{
      const {summary,description,location,startDateTime,endDateTime} = req.body
      oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
      const calendar = google.calendar('v3')
      const resonse = await calendar.events.insert({
        auth:oauth2Client,
        calendarId: 'primary',
        requestBody:{
          summary: summary,
          description : description,
          location: location,
          colorId: '7',
          start:{
            dateTime: new date(startDateTime)
          },
          end:{
            dateTime: new date(endDateTime)
          },
        }
      })
      res.send(resonse)
    }catch(error){
      next(error)
    }
  }
)


module.exports = router;
