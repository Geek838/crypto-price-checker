const fs = require("fs");
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let crp = req.body.crypto;
  let crc = req.body.currency;
  const options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    method: 'GET',
    headers: {
      'x-ba-key': 'ZjE5MDMyN2NmNDk1NGM4ZThhMjUzNjRkNjNlMTgxOWY' //Your API Key here
    },
    qs: {
      from: crp,
      to: crc,
      amount: 1
    }
  }
  request(options, (error, status, body)=>{
    let data = JSON.parse(body);
    res.send(`<body style="width:100vw; height:100vh; overflow:hidden;    background: url('https://cdn-wp.code-brew.com/wp-content/uploads/2018/10/Feature-Image-How-Cryptocurrency-is-disrupting-the-Global-Economy-.jpg');" ><h1 style="text-align:center; margin-top:300px;color:white"; >1 ${crp} is equal to ${data.price} ${crc}</h1></body>`);
  }
  );
});

app.listen(3000, () => {
  console.log("started on 3000");
});
