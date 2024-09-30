/* jsl:import cart.js */
/* jsl:import ajax.js */
/* global jsonGet,Cart */
function InventoryItem (id, name, price, storage) {
	this.id = id
	this.name = name
	this.price = price
	this.storage = storage
	this.domStorage = undefined
	this.domBuyButton = undefined
}
InventoryItem.prototype.verifyStorage = function (storage) {
	if (this.storage < storage) {
		throw "havent got enough items"
	}
}
InventoryItem.prototype.changeStorage = function (storage) {
	if (storage < 0) {
		this.verifyStorage(storage)
	}
	this.storage += storage
	this.domStorage.nodeValue = this.storage
	if (this.storage > 0) {
		this.domBuyButton.disabled = false
	} else {
		this.domBuyButton.disabled = true
	}
}

function Inventory () {
	this.tbid = undefined
	// this maps id->InvenrotyItem
	this.itemMap = {}
}
Inventory.prototype.setTbid = function (tbid) {
	this.tbid = tbid
}
Inventory.prototype.addProduct = function (ii) {
	this.itemMap[ii.id] = ii
	this.createRow(ii.id)
}
Inventory.prototype.delProductById = function (id) {
	delete this.itemMap[id]
}
Inventory.prototype.getItemById = function (id) {
	return this.itemMap[id]
}
Inventory.prototype.verifyItemInInventory = function (id) {
	if (!(id in this.itemMap)) {
		throw "no such item with id" + id
	}
}
Inventory.prototype.load = function (url) {
	// for closure
	const inventory = this
	jsonGet(url, function (data) {
		for (const id in data) {
			const ii = data[id]
			inventory.addProduct(new InventoryItem(id, ii.name, parseInt(ii.price, 10), parseInt(ii.storage, 10)))
			// uglier!!
			// Inventory.getInstance().addProduct(new InventoryItem(id,ii.name,parseInt(ii.price),parseInt(ii.storage)));
		}
	})
}
Inventory.prototype.verifyEnoughItems = function (id, amount) {
	this.verifyItemInInventory(id)
	const item = this.itemMap[id]
	item.verifyStorage(amount)
}
Inventory.prototype.changeStorage = function (id, storage) {
	this.verifyItemInInventory(id)
	const item = this.itemMap[id]
	item.changeStorage(storage)
}
Inventory.prototype.createRow = function (id) {
	const item = this.itemMap[id]
	const row = document.createElement("tr")
	const cell1 = document.createElement("td")
	const cell2 = document.createElement("td")
	const cell3 = document.createElement("td")
	const cell4 = document.createElement("td")
	const cell5 = document.createElement("td")
	const inner1 = document.createTextNode(item.id)
	const inner2 = document.createTextNode(item.name)
	const inner3 = document.createTextNode(item.price)
	const inner4 = document.createTextNode(item.storage)
	const inner5 = document.createElement("button")
	inner5.onclick = (function (iid) {
		return function () {
			Cart.getInstance().buyItemById(iid, 1)
		}
	})(id)
	/*
	 * This trick will not work...
	function callback(e) {
		Cart.getInstance().buyItemById(arguments.callee.id,1);
	}
	callback.id=id;
	*/
	inner5.appendChild(document.createTextNode("+"))
	cell1.appendChild(inner1)
	cell2.appendChild(inner2)
	cell3.appendChild(inner3)
	cell4.appendChild(inner4)
	cell5.appendChild(inner5)
	row.appendChild(cell1)
	row.appendChild(cell2)
	row.appendChild(cell3)
	row.appendChild(cell4)
	row.appendChild(cell5)
	const table = document.getElementById(this.tbid)
	table.appendChild(row)
	item.domStorage = inner4
	item.domBuyButton = inner5
}
// and expose it to the world as a singleton...
Inventory.theInstance = new Inventory()
Inventory.getInstance = function () {
	return Inventory.theInstance
}
