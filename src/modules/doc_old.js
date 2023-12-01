export default (uri) => class Parser {
    constructor(){  
        this.uri = uri
    }
    async init () {
        this.parser = await import(this.uri)
        console.log("init: ")
        console.log(this.parser)
    }
    render() {    
        console.log("render: ")
        console.log(this.parser)
        document.getElementById('content').innerHTML =
            this.parser.parse('# Marked in browser\n\nRendered by **marked**. \n\n ## AS');
    }
    parse(mdstring) {    
        return this.parser.parse(mdstring);
    }
}

/*
let parser

async function init(cdn_config) {
    parser = await import(cdn_config.marked)
}

function render() {    
    document.getElementById('content').innerHTML =
        parser.parse('# Marked in browser\n\nRendered by **marked**. \n\n ## AS');
}
  
export { init, render };
export default init;
*/