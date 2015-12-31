var http = require('http');

data=[
	{
		"id": "14",
		"name":"Bicycle",
		"price":"145",
		"storage":"3"
	},
	{
		"id": "15",
		"name":"Basketball",
		"price":"3.99",
		"storage":"12"
	},
	{
		"id": "16",
		"name":"Baseball",
		"price":"1.99",
		"storage":"10"
	}
]
 
http.createServer(
	function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		for(var i=0;i<data.length;i++) {
			data[i]["price"]=""+Math.floor(Math.random()*30)
		}
		response.end(JSON.stringify(data));
	}
).listen(8000);
	 
console.log('Server running at http://localhost:8000/');
