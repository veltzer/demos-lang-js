import { Inventory } from "inventory.js"
// here comes the cart...
function Cart () {
	this.tbid = undefined
	this.totalid = undefined
	// key: item id, value: amount to buy
	this.buyMap = {}
	// key: item id, value: element showing the entire row
	this.domRowMap = {}
	// key: item id, value: element showing the amount bought
	this.domAmountMap = {}
}
Cart.prototype.setTbid = function (tbid) {
	this.tbid = tbid
}
Cart.prototype.setTotalid = function (totalid) {
	this.totalid = totalid
	this.updateTotal()
}
Cart.prototype.buyItemById = function (id, amount) {
	i = Inventory.getInstance()
	i.verifyEnoughItems(id, amount)
	if (id in this.buyMap) {
		// already have item in cart
		this.buyMap[id] += amount
	} else {
		// first time buying this item
		this.buyMap[id] = amount
		this.createRow(id)
	}
	this.domAmountMap[id].nodeValue = this.buyMap[id]
	i.changeStorage(id, -amount)
	this.updateTotal()
}
Cart.prototype.verifyBuyingItem = function (id) {
	if (!(id in this.buyMap)) {
		throw new Error("didnt buy item " + id)
	}
}
Cart.prototype.sellItemById = function (id, amount) {
	i = Inventory.getInstance()
	i.verifyItemInInventory(id)
	this.verifyBuyingItem(id)
	amountInCart = this.buyMap[id]
	if (amountInCart < amount) {
		throw new Error("too many items sold " + amount)
	}
	this.buyMap[id] -= amount
	this.domAmountMap[id].nodeValue = this.buyMap[id]
	if (this.buyMap[id] === 0) {
		this.domRowMap[id].parentNode.removeChild(this.domRowMap[id])
		delete this.buyMap[id]
		delete this.domRowMap[id]
		delete this.domAmountMap[id]
	}
	i.changeStorage(id, amount)
	this.updateTotal()
}
Cart.prototype.cartPrice = function () {
	i = Inventory.getInstance()
	let sum = 0
	for (id in this.buyMap) {
		sum += i.getItemById(id).price * this.buyMap[id]
	}
	return sum
}
Cart.prototype.createRow = function (id) {
	row = document.createElement("tr")
	cell1 = document.createElement("td")
	cell2 = document.createElement("td")
	cell3 = document.createElement("button")
	cell3.onclick = (function (iid) {
		return function () {
			Cart.getInstance().sellItemById(iid, 1)
		}
	})(id)
	text1 = document.createTextNode(id)
	text2 = document.createTextNode(this.buyMap[id])
	text3 = document.createTextNode("-")
	cell1.appendChild(text1)
	cell2.appendChild(text2)
	cell3.appendChild(text3)
	row.appendChild(cell1)
	row.appendChild(cell2)
	row.appendChild(cell3)
	this.domRowMap[id] = row
	this.domAmountMap[id] = text2
	table = document.getElementById(this.tbid)
	table.appendChild(row)
}
Cart.prototype.updateTotal = function () {
	span = document.getElementById(this.totalid)
	span.innerHTML = this.cartPrice()
}
// singleton pattern
Cart.instance = new Cart()
Cart.getInstance = function () {
	return Cart.instance
}
