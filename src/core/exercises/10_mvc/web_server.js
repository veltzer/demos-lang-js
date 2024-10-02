var http = require("http");
var url=require("url");

var data=[
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
];

var mypage=`<html>
	<head>
		<script src="Model.js"></script>
		<script src="View.js"></script>
		<script src="TableView.js"></script>
		<script src="onload.js"></script>
	</head>
	<body>
		Store is:
		<div id="store"/>
		Shopping cart is:
		<div id="cart"/>
	</body>
</html>
`;

http.createServer(
	function (request, response) {
		var pathname=url.parse(request.url).pathname;
		switch(pathname) {
			case "/mypage":
				response.writeHead(200, {"Content-Type": "text/html"});
				response.end(mypage);
				break;
			case "/data":
				response.writeHead(200, {"Content-Type": "text/plain"});
				for(var i=0;i<data.length;i++) {
					data[i].price=""+Math.floor(Math.random()*30);
				}
				response.end(JSON.stringify(data));
				break;
			default:
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.end("uhu?!?");
				break;
		}
	}
).listen(8000);

console.log("Server running at http://localhost:8000/");
