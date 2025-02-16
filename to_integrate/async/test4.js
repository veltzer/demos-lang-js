const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class AsyncClass {
    static cache = new Map();  // Add a static cache

    constructor() {
        this.data = null;
    }

    static async wait_for_data_and_create_instance(a) {
        // Check if instance exists in cache
        if (AsyncClass.cache.has(a)) {
            return AsyncClass.cache.get(a);
        }

        // If not in cache, create new instance
        await delay(1000);
        var instance = new AsyncClass();
        instance.data = a * 2;
	AsyncClass.cache.set(a, instance);
	

	// for tests
	// throw new Error("some error");
        return instance;
    }

    get_data() {
        return this.data;
    }

    // Optional: Method to clear cache if needed
    static clearCache() {
        AsyncClass.cache.clear();
    }
}

async function test() {
    try {
        console.log("First call - should take 1 second");
        const instance1 = await AsyncClass.wait_for_data_and_create_instance(1000);
        console.log(instance1.get_data());

        console.log("\nSecond call with same parameter - should be instant");
        const instance2 = await AsyncClass.wait_for_data_and_create_instance(1000);
        console.log(instance2.get_data());

        console.log("\nThird call with different parameter - should take 1 second");
        const instance3 = await AsyncClass.wait_for_data_and_create_instance(2000);
        console.log(instance3.get_data());
    } catch (error) {
        console.log("Initialization failed:", error);
    }
}

test();
