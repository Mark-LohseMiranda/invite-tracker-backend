const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//LOCAL
app.use(cors());
 
//DEPLOYED
// app.use(cors({
//     origin:["https://table-top-fe.herokuapp.com"]
// }))

app.use("/",routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
}); 