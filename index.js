const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const WilderController = require("./controllers/wilder-controller");

const uri = "mongodb://127.0.0.1:27017/wilderdb";
const port = 3200;
const app = express();
const versionApi = '/api/wilder';

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Mongoose connected");
    })
    .catch(() => {
        console.error("Mongoose failed");
    });

app.use(bodyParser.json());

app.get(`${versionApi}/:name`, WilderController.read);
app.get(`${versionApi}/`, WilderController.readAll);
app.post(`${versionApi}`, WilderController.create);
app.put(`${versionApi}/:id`, WilderController.update);
app.delete(`${versionApi}/:name`, WilderController.delete);

app.listen(port, error => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Server started on " + port);
}); 