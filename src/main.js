import cdn_config from './config.js';

const jsyaml = await import(cdn_config.yaml)
console.log('jsyaml');
console.log(jsyaml);


/*
import parser from './modules/doc.js';
init(cdn_config)
*/ 
//const parser = await import('./modules/doc.js')
/*
import mod from './modules/doc_old.js';
let pClass = mod(cdn_config.marked)
let instant = new pClass()
await instant.init()
*/
//instant.render()


//import sheet from './github-markdown.min.css' assert { type: 'css' };
import sheet from 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css' assert { type: 'css' };
//document.adoptedStyleSheets = [sheet];
//shadowRoot.adoptedStyleSheets = [sheet];
/*
const cssModule = await import('./style.css', {
    assert: { type: 'css' }
  });
  document.adoptedStyleSheets = [cssModule.default];
*/

init()

function getMDPath() {
    return [
        location.origin
        ,location.search.replace(/^\?/, '')
        ];
};



const getMD_Local = function(mdpath, history_push=true) {
    fetch(mdpath)
    .then(response => response.text()).catch(function(){
            alert('Chrome Browser does not support.\n\nPlease start a web servivr (python -m http.server')
        })
    .then(text => callback(text))
}
/*
async function getMD_Web (mdpath, history_push=true) {
    //getJSON(mdpath, callback);
    
    callback(  
        await fetch(mdpath, {method: 'get'}).then(function(response) {
            if (!response.ok) 
                throw new Error(response.statusText)
            console.log(response)
            return response.text()
        }).catch(function(err) {
            console.log(err)
        })
    )
    
}
*/
function getMD_Web (mdpath, history_push=true) {
    //getJSON(mdpath, callback);
    
        fetch(mdpath, {method: 'get'}).then(function(response) {
            if (!response.ok) 
                throw new Error(response.statusText)
            console.log(response)
            response.text().then(function(data){callback(data)})
            
        }).catch(function(err) {
            console.log(err)
        })
    
    
}


async function callback(data) {
    const [configstr, mdstring]  = splitHeader(data)
    var configs ={}
    jsyaml.loadAll(configstr, function (obj) {
        if (obj == null) return;
        configs =  obj
    });
    if (configs.type == undefined || configs.type.toLowerCase() != 'slide' ) {
        //marked_callback(configs, mdstring)
        let doc = await import('./modules/doc.js')
        doc.render(configs, mdstring)
    } else {
         // revealjs_callback(configs, mdstring)
    }

}

function splitHeader(md) {
    var h=""
    var mdstring = md
    if ("---" == md.substring(0,3)) {
        var mds = md.split('\n')
        var first = false
        var i=0
        for(i in mds) {
            if ("---" == mds[i].substring(0,3) && first == false) {
                first = true
                continue
            } else if("---" == mds[i].substring(0,3)) {
                i = parseInt(i) + 1
                break;
            }
        }
        h = mds.slice(0,i).join('\n')
        mdstring = mds.slice(i, mds.length).join('\n')
    }
    return [h, mdstring]
}

function init() {
	var baseUrl = ''
	var init_mdpath  = baseUrl + 'md/00_index.md'
	var toc = []
	var title=''

	var [ URL,  mdpath] = getMDPath() 	
    console.log(URL)
    console.log(mdpath)

	if (mdpath=='') {
		mdpath= init_mdpath
	}
	baseUrl = mdpath.replace(/[^/]*.md$/, '')
	console.log(baseUrl)
    let getMD = (location.protocol == 'file:') ? getMD_Local : getMD_Web
	getMD(mdpath)
}
