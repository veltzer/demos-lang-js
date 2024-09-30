/* jsl:import cart.js */
/* jsl:import inventory.js */
/* global Inventory */
/* global InventoryItem */
/* global Cart */
window.onload = function () {
	"use strict"
	// lets add items to the inventory
	const i = Inventory.getInstance(); const c = Cart.getInstance()
	i.setTbid("inventory_tbl")
	i.addProduct(new InventoryItem(14, "Bicycle", 145, 3))
	i.addProduct(new InventoryItem(15, "Basketball", 3.99, 12))
	i.addProduct(new InventoryItem(16, "Baseball", 1.99, 10))
	c.setTbid("cart_tbl")
	c.setTotalid("total_id")
	i.load("snipplet.json")
}
