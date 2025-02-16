const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


class AsyncClass {
    constructor() {
	    this.data=null;
    }

    static async wait_for_data_and_create_instance(a) {
	    await delay(1000);
	    var instance = new AsyncClass();
	    instance.data = a*2;
            throw new Error("some error");
	    return instance;
    }

    get_data() {
	    return this.data;
    }
}


async function test() {
	try {
            const instance = await AsyncClass.wait_for_data_and_create_instance(1000);
	    console.log(instance.get_data());
	} catch (error) {
	    console.log("Initialization failed:", error);
	}
}

test();
