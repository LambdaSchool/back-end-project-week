const { server } = require("./server.js");

const port = 9900;
server.listen(port, () => {
  console.log(`\n====Running on port ${port}====\n`);
});
