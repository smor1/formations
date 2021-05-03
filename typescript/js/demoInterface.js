"use strict";
class DemoInterface {
    constructor(options) {
        this.options = options;
    }
}
let demoInterface = new DemoInterface({
    autoplay: true,
    success: data => {
    }
});
