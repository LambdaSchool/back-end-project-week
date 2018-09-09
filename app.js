const { server } = require('./server');
const mongoose = require('mongoose');


 
const { DBUSER, DBPASS, DBADDRESS, PORT } = process.env;


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DBUSER}:${DBPASS}${DBADDRESS}`)
// mongoose.connect('mongodb://localhost/backend')

server.get('/', (req, res) => {
  res.send( 'api: running' )
})

const port = PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 