var store=Ext.create("Ext.data.Store", { // eslint-disable-line no-unused-vars
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
