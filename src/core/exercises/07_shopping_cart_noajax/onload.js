/*global Inventory,InventoryItem,Cart*/
window.onload=function() {
	// lets add items to the inventory
	var i=Inventory.getInstance();
	i.addProduct(new InventoryItem(14,"Bicycle",145,3));
	i.addProduct(new InventoryItem(15,"Basketball",3.99,12));
	i.addProduct(new InventoryItem(16,"Baseball",1.99,10));
	console.log(i);
	var c=Cart.getInstance();
	c.buyItemById(14,2);
	c.buyItemById(15,1);
	console.log(c);
	console.log(c.cartPrice());
};
