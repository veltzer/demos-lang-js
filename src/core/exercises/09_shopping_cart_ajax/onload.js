/* jsl:import inventory.js */
/* jsl:import cart.js */
/* import { Cart } from "cart.js" */
/* import { Inventory, InventoryItem } from "inventory.js" */
/*global Inventory,InventoryItem,Cart*/
window.onload = function () {
	// lets add items to the inventory
	const i = Inventory.getInstance()
	i.setTbid("inventory_tbl")
	i.addProduct(new InventoryItem(14, "Bicycle", 145, 3))
	i.addProduct(new InventoryItem(15, "Basketball", 3.99, 12))
	i.addProduct(new InventoryItem(16, "Baseball", 1.99, 10))
	const c = Cart.getInstance()
	c.setTbid("cart_tbl")
	c.setTotalid("total_id")
	i.load("snipplet.json")
}
