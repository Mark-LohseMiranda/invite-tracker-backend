const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const https_options = {
  ca: fs.readFileSync("ca_bundle.crt"),
 key: fs.readFileSync("private.key"),
 cert: fs.readFileSync("certificate.crt")
}

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//LOCAL
// app.use(cors());
 
//DEPLOYED
app.use(cors({
    origin:["https://gingerbread.mark-lohsemiranda.com"]
}))

app.use("/",routes);

db.once('open', () => {
  // app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  https.createServer(https_options, app).listen(8443)
}); 
