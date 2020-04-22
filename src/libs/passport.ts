import dotenv from 'dotenv';
import passport from 'passport';
import Strategy as GoogleStrategy from 'passport-google-oauth2';
import client from '../data';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENTID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  callbackURL: (process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL_DEV)
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken, refreshToken, profile)
    const existingUser = await client.users.findUserByGoogleID(profile.id)
		Publisher.find({}).lean().exec(function(err, data){
      if (err) {
        return done(err)
      }
      Publisher.findOne({ 'google.oauthID': profile.id }).lean().exec(async function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        //console.log(profile, user)
        if (!err && user !== null) {
          done(null, user);
        } else {
          console.log(req.session)
          if (!req.session || !req.session.userId) {
            user = new Publisher({
              userindex: data.length,
              username: profile.name.givenName,
              email: profile.emails[0].value,
              admin: true,
              avatar: profile.photos[0].value,
              gaaccess: accessToken,
              garefresh: refreshToken,
              google: {
                oauthID: profile.id,
                name: profile.displayName,
                created: Date.now()
              }
            });
          } else {
            user = await Publisher.findOne({_id: req.session.userId}).then(pu=>pu).catch(err=>next(err));
            user.gaaccess = accessToken;
            user.garefresh = refreshToken,
            user.google = {
              oauthID: profile.id,
              name: profile.displayName,
              created: Date.now()
            }
            user.admin = true;
          }

          user.save(function(err) {
            if(err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });

        }
      });
    })

  }
));

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.SECRET
}));


app.get('/auth/google', passport.authenticate('google', {
  scope: 
    [
      //'https://www.googleapis.com/auth/plus.login', 
      'https://www.googleapis.com/auth/userinfo.email', 
      'https://www.googleapis.com/auth/userinfo.profile', 
      'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.metadata', 'https://www.googleapis.com/auth/drive.file'
    ],
    authType: 'rerequest',
    accessType: 'offline',
    prompt: 'consent',
    includeGrantedScopes: true
  }), function(req, res, next){
  return next();
});

app.get('/auth/google/callback', passport.authenticate('google', { 
  failureRedirect: '/' 
}), function(req, res, next) {
  req.session.userId = req.user._id;
  req.session.loggedin = req.user.username;
  req.session.authClient = true;
  if (!req.session.importgdrive) {
    return res.redirect('/');
    
  } else {
    return res.redirect('/importgdrive');
  }
  
});
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));