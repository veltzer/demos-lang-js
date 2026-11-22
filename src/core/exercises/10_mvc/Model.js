function Model() {
	this.data={};
	this.columnNames=[]; // only names, not data
	this.rows=0;
	// the views showing this model, each told when it changes
	this.views=[];
}
// this method empties the model
Model.prototype.empty=function(_v) {
	this.data={};
};
Model.prototype.addView=function(v) {
	if(this.views.indexOf(v)===-1) {
		this.views.push(v);
	}
	this.updateViews();
};
Model.prototype.deleteView=function(v) {
	var i=this.views.indexOf(v);
	if(i!==-1) {
		this.views.splice(i,1);
	}
};
Model.prototype.getColumns=function() {
	return this.columns;
};
Model.prototype.setColumns=function(c) {
	this.columns=c;
};
Model.prototype.getRow=function(row) {
	return this.data[row];
};
Model.prototype.getData=function(row, column) {
	return this.data[row][column];
};
Model.prototype.setData=function(row, column, val) {
	this.data[row][column]=val;
	this.updateViews();
};
Model.prototype.addRow=function(row) {
	this.data[this.rows]=row;
	this.rows++;
	this.updateViews();
};
Model.prototype.getRows=function() {
	return this.rows;
};
Model.prototype.deleteRow=function(row) {
	this.data[row]=this.data[this.rows-1];
	delete this.data[this.rows-1];
	this.rows--;
	this.updateViews();
};
Model.prototype.updateViews=function() {
	this.views.forEach(function(view) {
		view.updateFromModel();
	});
};
