var store=Ext.create("Ext.data.Store", {
	model: "User",
	sorters: [
		{
			property : "age",
			direction: "DESC",
		},
		{
			property : "firstName",
			direction: "ASC",
		}
	]
});

// The page's HTML and its other scripts call these by name.
Object.assign(globalThis, { store });
