module.exports = (req, res)=>{  
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: ['https://www.googleapis.com/auth/drive.file']
// });

// console.log('Authorize this app by visiting this url:', authUrl);

oauth2Client.getToken(process.env.YOUR_AUTH_CODE).then(({ tokens }) => {
  console.log('Refresh Token:', tokens.refresh_token);
});


}