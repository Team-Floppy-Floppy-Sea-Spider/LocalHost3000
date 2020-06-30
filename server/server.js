const express = require('express');
const path = require('path');

// server and PORT
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});



// express Router -----------------------------------
const apiRouter = require('./routes/apiRouter.js');

/* GLOBAL HANDLERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use('/api', apiRouter);

app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// catch-all route handler for any requests to an unknown route
// This catches any unknown routes.
app.use((req, res) => {
  console.log("Unknown route. Try another route.");
  return res.status(404);
});

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
