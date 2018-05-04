const mongoose = require("mongoose");

const config = require("./api/config");
const server = require("./server");

const MONGODB_URL = config.db;

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log(`=== ${config.env} DB connection Achieve ===`))
    .catch(err => {
        // only show the exact error in develoment
        if (config.env === "development") {
            console.log(err);
        } else {
            // probably do something else but throw ageneral error for now
            console.log("unexpected error occured!!");
        }
    });

const port = config.port;
server.listen(port, err => {
    console.log(`\n=== The server is up and running on ${port} ===\n`);
});
