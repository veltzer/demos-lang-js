/*global Model,TableView*/

window.onload=function() {
	var m=new Model();
	m.setColumns([
		'id',
		'name',
		'price',
		'storage'
	])
	m.addRow({
		"id": "14",
		"name":"Bicycle",
		"price":"145",
		"storage":"3"
	});
	m.addRow({
		"id": "15",
		"name":"Basketball",
		"price":"3.99",
		"storage":"12"
	});
	m.addRow({
		"id": "16",
		"name":"Baseball",
		"price":"1.99",
		"storage":"10"
	});
	var v=new TableView(m,"1");
	v.create()
};
