dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit.form.Button");
var layout=[
	{ name: "Product", field: "product" },
	{ name: "Price", field: "price" }
];
var layout2=[
	{ name: "Price", field: "price" }
];
function init() {
	// load some data
}
function do_click() {
	var w=dijit.byId("grid");
	var store=w.store;
	for(var i=0;i<w.rowCount;i++) {
		var item=w.getItem(i);
		var old_price=store.getValue(item,"price");
		var new_price=old_price*1.15;
		store.setValue(item,"price",new_price);
	}
}
function do_populate() {
	// create some data
}
dojo.addOnLoad(init);

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { layout, layout2, do_click, do_populate });
