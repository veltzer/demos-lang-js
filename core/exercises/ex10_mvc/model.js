function Model() {
	this.data={}
	this.columnNames=[] // only names, not data
	this.rows=0
	this.views={}
};
// this method empties the model
Model.prototype.empty=function(v) {
	this.data={}
};
Model.prototype.addView=function(v) {
	this.views[v]=0
	this.updateViews()
};
Model.prototype.deleteView=function(v) {
	delete this.views[v]
};
Model.prototype.getColumns=function() {
	return this.columns
};
Model.prototype.getRow=function(row) {
	return data[row]
};
Model.prototype.getData=function(row, column) {
	return data[row][column]
};
Model.prototype.setData=function(row, column, val) {
	data[row][column]=val
	this.updateViews()
};
Model.prototype.addRow=function(row) {
	data[this.rows]=row
	this.rows++
	this.updateViews()
};
Model.prototype.deleteRow=function(row) {
	data[row]=data[this.rows-1]
	delete data[this.rows-1]
	this.rows--
	this.updateViews()
};
Model.prototype.updateViews=function() {
	if(view in this.views) {
		view.updateFromModel()
	}
};
