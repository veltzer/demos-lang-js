const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


class AsyncClass {
    constructor() {
    }

    async waitForData() {
	    await delay(1000);
	    this.data=5;
    }

    get_data() {
	    return this.data;
    }
}


async function test() {
	const instance = new AsyncClass();
	try {
	    await instance.waitForData();
	    console.log(instance.get_data());
	} catch (error) {
	    console.log("Initialization failed:", error);
	}
}

test();
