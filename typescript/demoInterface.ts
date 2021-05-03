interface DemoOption {

    autoplay: boolean;
    x?: number;
    success: (data: string) => void

}


class DemoInterface {

    private options: DemoOption;

     constructor(options: DemoOption) {
         this.options = options;
     }

}

let demoInterface = new DemoInterface(
    {
        autoplay: true,
        success: data => {

        }
    }
)
