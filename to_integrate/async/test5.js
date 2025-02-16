const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class AsyncClass {
    static cache = new Map();

    constructor() {
        this.data = null;
    }

    static getCacheKey(a, b) {
        return `${a}_${b}`;  // Create unique key from both parameters
    }

    static async wait_for_data_and_create_instance(a, b) {
        const cacheKey = AsyncClass.getCacheKey(a, b);
        
        // Check if instance exists in cache
        if (AsyncClass.cache.has(cacheKey)) {
            return AsyncClass.cache.get(cacheKey);
        }

        // If not in cache, create new instance
        await delay(1000);
        var instance = new AsyncClass();
        instance.data = a * 2 + b;  // Modified to use both parameters
        AsyncClass.cache.set(cacheKey, instance);

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
        const instance1 = await AsyncClass.wait_for_data_and_create_instance(1000, 500);
        console.log(instance1.get_data());

        console.log("\nSecond call with same parameters - should be instant");
        const instance2 = await AsyncClass.wait_for_data_and_create_instance(1000, 500);
        console.log(instance2.get_data());

        console.log("\nThird call with different first parameter - should take 1 second");
        const instance3 = await AsyncClass.wait_for_data_and_create_instance(2000, 500);
        console.log(instance3.get_data());

        console.log("\nFourth call with different second parameter - should take 1 second");
        const instance4 = await AsyncClass.wait_for_data_and_create_instance(1000, 700);
        console.log(instance4.get_data());

        console.log("\nFifth call with previous parameters - should be instant");
        const instance5 = await AsyncClass.wait_for_data_and_create_instance(1000, 700);
        console.log(instance5.get_data());
    } catch (error) {
        console.log("Initialization failed:", error);
    }
}

test();