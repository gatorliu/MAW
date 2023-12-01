import {Marked} from 'https://cdnjs.cloudflare.com/ajax/libs/marked/10.0.0/lib/marked.esm.min.js';
import {default as hljs} from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';



  let markedHighlight = await import(`https://cdn.jsdelivr.net/npm/marked-highlight/lib/index.umd.js`)
  //let markedKatex = await import('https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js');
                                    

  //importModule.default()
let hlcss_udn = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-dark.min.css'
//let hlcss_udn = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/arduino-light.min.css';

//import sheet from hlcss_udn assert { type: 'css' };

imoprtCss('./doc.css')
imoprtCss(hlcss_udn)


function imoprtCss(csslink) {

    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = csslink;
    //link.integrity="sha512-Vj6gPCk8EZlqnoveEyuGyYaWZ1+jyjMPg8g4shwyyNlRQl6d3L9At02ZHQr5K6s5duZl/+YKMnM3/8pDhoUphg==";
    link.crossorigin="anonymous";
    link.referrerpolicy="no-referrer";
    document.head.appendChild(link);
}




let toc = [] // clean toc
const renderer = {
    link(href, title, text) {
      title =  title == null ? '' : '" title="'+ title
      if (href.search(/:[0-9]*\/\//) >= 0) { // 外部連結
          return '<a href="' + href + title + '" target="_blank">' + text + '</a>';
      }
      // Internal links form here
      if (href.search(/\.md$/) >= 0) { // Other MD File
          var l = '<a href="?' + getAbsMDpath(baseUrl, href)+ '">' + text + '</a>'
          return l;
      } else {	// Others
          return '<a href="' + baseUrl + href + title + '" target="_blank">' + text + '</a>';
      }
    },
  heading(text, level, raw) {
      var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
      
      toc.push({
          anchor: anchor,
          level: level,
          text: text
      });
      
      return '<h'
          + level
          + ' id="'
          + anchor
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
  }
};



function test_render() {    
    document.getElementById('content').innerHTML =
        Marked.parse('# Marked in browser\n\nRendered by **marked**. \n\n ## AS');
}

function render(configs, mdstring) {    
    if ( configs == undefined) {
        test_render();
        return;
    }
    
    marked_callback(configs, mdstring);
}

function marked_callback (configs, mdstring) {
    const {markedHighlight} = globalThis.markedHighlight;
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);


const options = {
    throwOnError: false
  };
    marked.use({ renderer });
    
      
    marked.use(markedKatex(options));
    marked.setOptions({
        //renderer: new marked.Renderer(),
        /*
        highlight: function(code, language) {
            var validLanguage = hljs.getLanguage(language) ? language : 'bash' /* 'plaintext' * / ;
            return '<code class="hljs handlebars">' + hljs.highlight(validLanguage, code).value + '</code>';
            // return '<code class="hljs handlebars">' + hljs.highlightAuto(code).value
        },
        */
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        //xhtml: false,
        //baseUrl: baseUrl
    })
    
    //let toc = [] // clean toc
    //var markhtml = marked.parse(mdstring);
    var markhtml = marked.parse(mdstring);
    
    if (configs.toc == undefined || configs.toc != false) {    
        var tocHTML = 'Table of Contents<ul>';
        toc.forEach(function (entry) {
            tocHTML += '<li><a href="#'+entry.anchor+'">'+entry.text+'<a></li>\n';
            });
        tocHTML += '</ul>';
        document.getElementById('toc').innerHTML= tocHTML  
    }
    
    //$('.markdown-body').html(markhtml)
    document.getElementById('content').innerHTML = markhtml
    document.title = toc[0].text
    //if (MathJax.typesetPromise != undefined) MathJax.typesetPromise() // re-render Math
    //katex.render($('.markdown-body')) // re-render Math
}


const getDirDepth = function(s) {
    if (s.substr(0,3) == "../") {
        return 1 + getDirDepth(s.substr(3))
    } else if (s.substr(0,2) == "./" ) { 
        return getDirDepth(s.substr(2))
    }
    else return 0;
}
const getAbsMDpath =  function(baseUrl,  currUrl) {
    sp = baseUrl.split("/");
    d = Math.min( getDirDepth(currUrl)-1, sp.length) ;
    for (var i = 0; i <=d; i++) {
        if (currUrl.substr(0,3) == "../") {
            currUrl = currUrl.substr(3);
        } else if (currUrl.substr(0,2) == "./" ) continue;
          else break;
    }
    //console.log(sp.slice(0,d).join('/'))
    //console.log(currUrl)
    return  sp.slice(0,d).join('/') + currUrl;
    
}
export {render};
export default render;
