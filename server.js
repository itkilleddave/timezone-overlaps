const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////
//cities

// const cities = [
//   // {
//   //     name: "",
//   //     country: "",
//   //     countryCode: "",
//   //     timezone: "",
//   // },
//   // {
//   //     name: "",
//   //     country: "",
//   //     countryCode: "",
//   //     timezone: "",
//   // },
//   {
//     name: "Adelaide",
//     country: "Australia",
//     countryCode: "AU",
//     timezone: "Australia/Adelaide",
//   },
//   {
//     name: "Melbourne",
//     country: "Australia",
//     countryCode: "AU",
//     timezone: "Australia/Melbourne",
//   },
//   {
//     name: "New York",
//     country: "United States",
//     countryCode: "US",
//     timezone: "America/New_York",
//   },
//   {
//     name: "New Jersey",
//     country: "United States",
//     countryCode: "US",
//     timezone: "America/New_York",
//   },
//   {
//     name: "New Orleans",
//     country: "United States",
//     countryCode: "US",
//     timezone: "America/???",
//   },
//   {
//     name: "London",
//     country: "United Kingdom",
//     countryCode: "GB",
//     timezone: "Europe/London",
//   },
//   {
//     name: "Shanghai",
//     country: "China",
//     countryCode: "CN",
//     timezone: "Asia/Shanghai",
//   },
//   {
//     name: "Cairo",
//     country: "Egypt",
//     countryCode: "EG",
//     timezone: "Africa/Cairo",
//   },
//   {
//     name: "Buenos Aires",
//     country: "Argentina",
//     countryCode: "AR",
//     timezone: "America/Argentina/Buenos_Aires",
//   },
//   {
//     name: "Manila",
//     country: "Philippines",
//     countryCode: "PH",
//     timezone: "Asia/Manila",
//   },
//   {
//     name: "Tokyo",
//     country: "Japan",
//     countryCode: "JP",
//     timezone: "Asia/Tokyo",
//   },
// ];

const cities = require("all-the-cities")

// cities - format example
//
// [{
//   name: 'Albuquerque',
//   country: 'US',
//   altCountry: '',
//   muni: '',
//   muniSub: '',
//   featureClass: 'P',
//   featureCode: 'PPLA2',
//   adminCode: 'NM',
//   population: 545852,
//   lat: 35.08449,
//   lon: -106.65114
// },
// ...]

getFilteredCities = value => {

	const filteredCities = cities.filter(city => {
	  return (
	  	city.name.toLowerCase().match(value.toLowerCase()) 
	  	&& 
	  	parseInt(city.population) > 50000
	  	)
	})

	console.log(filteredCities.length);

	return filteredCities;

	// const inputValue = value.trim().toLowerCase();
	// const inputLength = inputValue.length;

	// return inputLength === 0 ? [] : cities.filter(lang =>
	//   lang.name.toLowerCase().slice(0, inputLength) === inputValue
	// );
};

app.get('/api/cities', (req, res) => {
	console.log('get - api/cities', cities);
 	res.send(cities);
});

app.post('/api/filtered-cities', (req, res) => {
	console.log('post - api/filtered-cities', req.body.value)
 	res.send(getFilteredCities(req.body.value));
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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));