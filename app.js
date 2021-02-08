
import express from 'express';
import { connect } from 'mongoose';
import { json as _json, urlencoded as _urlencoded } from 'body-parser';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from "passport";
//import users from "./routes/users";
import events from "./routes/event_info"
import infos from "./routes/infos"
import staff  from "./routes/staff";
import slots  from "./routes/Slots";
import staffDate from './routes/staffslot'
import years from "./routes/Years"




const app = express();

const PORT = process.env.PORT || 5000
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1'

// DB Config // mongodb://127.0.0.1:27017/Feedback_system
const mongoDB = `mongodb://${MONGO_HOST}:${MONGO_PORT}/Feedback_system`
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Mongoose connected`))
  .catch(console.error)

// Passport middleware
app.use(passport.initialize());

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// Bodyparser middleware
app.use(express.json({ limit: "1mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(join(__dirname, '/public')));

app.use('/staff', staff);
//app.use('/users', users); route for student login via database 
app.use('/todos', infos); //route for fetching module info on student side
app.use('/api', years); //route for fetching year on student side
app.use('/api', slots); // route for fetching time slots on staff side
app.use('/api', staffDate); // route for POST, GET & DELETE staff availability
app.use('/api', events); //route for saving & fetching Calendar API response on student side


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`))
