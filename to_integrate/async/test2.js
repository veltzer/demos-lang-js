class AsyncClass {
    static async create() {
        const instance = new AsyncClass();
        try {
            await instance.init();  // Async initialization
            return instance;
        } catch (error) {
            throw new Error(`Failed to create instance: ${error.message}`);
        }
    }

    // Remove 'private' keyword for standard JavaScript
    async init() {
        // Async initialization that might throw
        //throw new Error("Initialization failed");
	this.data=7;
    }

    get_data() {
	    return this.data;
    }
}

// Usage:
async function test() {
    try {
        const instance = await AsyncClass.create();
        console.log("Success!");
        console.log(instance);
    } catch (error) {
        console.log("Creation failed:", error);
    }
}

test();
