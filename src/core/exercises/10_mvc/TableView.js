// here comes the cart...
function TableView(m, id) {
	this.model=m;
	this.id=id;
	// key: item id, value: amount to buy
	this.buyMap={};
	// key: item id, value: element showing the entire row
	this.domRowMap={};
	// key: item id, value: element showing the amount bought
	this.domAmountMap={};
}
TableView.prototype.create=function() {
	var d_div=document.getElementById(this.id);
	var d_table=document.createElement("table");
	var d_body=document.createElement("body");
	var d_tr=document.createElement("tr");
	var columns=this.model.getColumns();
	for(var i=0;i<columns.length;i++) {
		var cur_col=columns[i];
		var d_td=document.createElement("td");
		var d_text=document.createTextNode(cur_col);
		d_td.appendChild(d_text);
		d_tr.appendChild(d_td);
	}
	d_body.appendChild(d_tr);
	for(var j=0;j<this.model.getRows();j++) {
		d_tr=document.createElement("tr");
		for(i=0;i<columns.length;i++) {
			var c_cur_col=columns[i];
			// var data=this.model.getData(j, cur_col);
			var c_d_td=document.createElement("td");
			var c_d_text=document.createTextNode(c_cur_col);
			c_d_td.appendChild(c_d_text);
			c_d_tr.appendChild(c_d_td);
		}
		d_body.appendChild(d_tr);
	}
	d_table.appendChild(d_body);
	d_div.appendChild(d_table);
};
