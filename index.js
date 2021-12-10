Page up
const express = require('express');
  
const {ErrorReporting} = require('@google-cloud/error-reporting');
// Using ES6 style imports via TypeScript or Babel
// import {ErrorReporting} from '@google-cloud/error-reporting';
// Instantiates a client
const errors = new ErrorReporting();
const app = express();
app.get('/', function (req, res,next) {
           if (req.query.name) {
        res.send("hello"+ req.query.name);
    } else {
        // send the response, no more route handlers after this
        res.send("query parameter not set")
        next( new Error("query parameter x not set"))
    }
})
app.get('/exception', () => {
  JSON.parse('{"malformedJson": true');
});
// Note that express error handling middleware should be attached after all
// the other routes and use() calls. See [express docs][express-error-docs].
app.use(errors.express);
app.listen(3000);
