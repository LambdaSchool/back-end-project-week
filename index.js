const express = require('express');
const server = require('./server.js');

// server.listen(5000, () => {
//   console.log('\n* Server Running on http://localhost:5000 *\n');
// });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});