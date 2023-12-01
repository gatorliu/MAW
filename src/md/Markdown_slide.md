---
title:
type: Slide
tags: Markdone,
slideOptions:        # 簡報相關的設定
  #theme: moon   # 顏色主題
  transition: 'convex' # 換頁動畫 'convex, concave, fade(default for background), slide(default for slide) , zoom none
  backgroundTransition: 'concave'
  parallaxBackgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Shadow_Hand_Bulb_large_Alpha.png/350px-Shadow_Hand_Bulb_large_Alpha.png'
---

# RevealJS & Markdown

<!-->-->
## Slide 1: Config for Slide
* YAML Format
* 寫在檔案最前面
* 前後以 `---` 區隔
* Same as Hackmd
<!--v-->

## Config Example
```yaml 
---
title:
type: Slide
tags: Markdone,
slideOptions:        # 簡報相關的設定
  #theme: moon   # 顏色主題
  transition: 'convex' # 換頁動畫 'convex, concave, fade(default for background), slide(default for slide) , zoom none
  backgroundTransition: 'concave'
  parallaxBackgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Shadow_Hand_Bulb_large_Alpha.png/350px-Shadow_Hand_Bulb_large_Alpha.png'
---
```

<!-- > -->
## Slide 2 : Horizontal/Vertical Side  
* Separator is a Regexp
* data-separator `Horizontal`   
    **`^<!-- *> *-->$`**
* data-separator-vertical `Vertical`   
    **`^<!-- *[vV] *--\>$`**
* Example:
```
 <!--v-->
 ## Slide 2.1
 Vertical Slide
```

<!--v-->
## Slide 2.1
Vertical Slide


<!-->-->
## Slide 3 : Highlight
* Example:
```
```js [100: 1-2|3|4]  # JS format,  offset:100, 3 groups: (1-2, 3, 4) 
let a = 1;
let b = 2;
let c = x => 1 + 2 + x;
c(3);
``` # code end 
```

<!--v-->
```js [100: 3|1-2|4]
    let a = 1;
    let b = 2;
    let c = x => 1 + 2 + x;
    c(3);
```

<!-->-->
## Slide 4 : MATH (using KaTex)

* Block Level Math:  
<span style="color:red">$$</span> ` f(a) = \frac{1}{2\pi i} \oint_{\gamma}\frac{f(z)}{z-a}\mathrm{d}z ` <span style="color:red">$$</span>
* Inline Math :  
<span style="color:red">$</span> ` \sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6} ` <span style="color:red">$</span>


<!--v-->
* Block Level Math: $$ f(a) = \frac{1}{2\pi i} \oint_{\gamma}\frac{f(z)}{z-a}\mathrm{d}z $$
* inline Math :  $ \sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6} $ 
