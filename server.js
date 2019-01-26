const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////
//cities

const cities = [
  // {
  //     name: "",
  //     country: "",
  //     countryCode: "",
  //     timezone: "",
  // },
  // {
  //     name: "",
  //     country: "",
  //     countryCode: "",
  //     timezone: "",
  // },
  {
    name: "Adelaide",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Adelaide",
  },
  {
    name: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Melbourne",
  },
  {
    name: "New York",
    country: "United States",
    countryCode: "US",
    timezone: "America/New_York",
  },
  {
    name: "New Jersey",
    country: "United States",
    countryCode: "US",
    timezone: "America/New_York",
  },
  {
    name: "New Orleans",
    country: "United States",
    countryCode: "US",
    timezone: "America/???",
  },
  {
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    timezone: "Europe/London",
  },
  {
    name: "Shanghai",
    country: "China",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
  },
  {
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    timezone: "Africa/Cairo",
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    timezone: "America/Argentina/Buenos_Aires",
  },
  {
    name: "Manila",
    country: "Philippines",
    countryCode: "PH",
    timezone: "Asia/Manila",
  },
  {
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    timezone: "Asia/Tokyo",
  },
];

app.get('/api/cities', (req, res) => {
	console.log('cities', cities);
 	res.send(cities);
});

//////////////////////////////

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));