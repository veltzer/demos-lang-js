//the user Model, loaded as in the last snippet (model_rest.js): a GET request to /users/123
Ext.ModelManager.getModel("User").load(123, {
	success: function(user) {
		user.set("name", "Edward Spencer");

		//tells the Proxy to save the Model. In this case it will perform a PUT request to /users/123 as this Model already has an id
		user.save({
			success: function() {
				console.log("The User was updated");
			}
		});

		//tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
		user.destroy({
			success: function() {
				console.log("The User was destroyed!");
			}
		});
	}
});
