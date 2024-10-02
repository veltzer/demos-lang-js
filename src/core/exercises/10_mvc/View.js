function View(m) {
	this.model=m;
}
View.prototype.getModel=function() {
	return this.model;
};
// ?? Do we need this method?!?
View.prototype.setModel=function(m) {
	this.model=m;
};
View.prototype.updateFromModel=function() {
	throw "you must override this";
};
View.prototype.updateModel=function() {
	throw "you must override this";
};
