dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit.form.Button");
var layout=[ // eslint-disable-line no-unused-vars
	{ name: "Product", field: "product" },
	{ name: "Price", field: "price" }
];
var layout2=[ // eslint-disable-line no-unused-vars
	{ name: "Price", field: "price" }
];
function init() {
	// load some data
}
function do_click() { // eslint-disable-line no-unused-vars
	var w=dijit.byId("grid");
	var store=w.store;
	for(i=0;i<w.rowCount;i++) {
		var item=w.getItem(i);
		var old_price=store.getValue(item,"price");
		var new_price=old_price*1.15;
		store.setValue(item,"price",new_price);
	}
}
function do_populate() { // eslint-disable-line no-unused-vars
	// create some data
}
dojo.addOnLoad(init);
