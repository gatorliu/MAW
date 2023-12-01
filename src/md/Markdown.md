# Markdown Syntax
## REFERENCE
* Syntax  

    REF[&lt;a href="#r1">1</a>]  
    1\. &lt;span id="r1"></span>\[reference 1\]\(https://........./)

* Demo  
    REF[<a href="#r1">1</a>] :

## MATH using MathJax 3.2.2  
[數學公式syntax參考](https://zh.wikipedia.org/zh-tw/Help:%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)
* Block Level Math:  
<span style="color:red">$$</span>` f(a) = \frac{1}{2\pi i} \oint_{\gamma}\frac{f(z)}{z-a}\mathrm{d}z `<span style="color:red">$$</span>  

$$ f(a) = \frac{1}{2\pi i} \oint_{\gamma}\frac{f(z)}{z-a}\mathrm{d}z$$

* Inline Math :  
<span style="color:red">$</span>` \sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6} `<span style="color:red">$</span>  
inline Math :  $ \sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6} $ 


## 展開與縮合
* Default Style (詳細資料)

    <span><details></span>
    ```html
        <span><details></span>
        ```
        Default 縮合
        ```
        <span></details></span>
    ```
    <span></details></span>

    <span><details OPEN></span>
    ```html
        <span><details OPEN></span>
        ```
        Default 展開
        ```
        <span></details></span>
    ```
    <span></details></span>

* Customer Summary

    <span><details><summary>展開</summary></span>
    ``` html
        <span><details><summary>展開</summary></span>
        內容
        <span></details></span>
    ```
    <span></details></span>

    <span><details OPEN><summary>縮合</summary></span>
    ```html
        <span><details OPEN><summary>縮合</summary></span>
        內容
        <span></details></span>

    ```
    <span></details></span>


* Code Style

    <span><details><summary class="code"></summary></span>
    ``` html
        <span><details><summary class="code"></summary></span>
        ```
        Code here....
        ```
        <span></details></span>
    ```
    <span></details></span>

    <span><details OPEN><summary class="code"></summary></span>
    ```html
        <span><details OPEN><summary class="code"></summary></span>
        ```
        Code here....
        ```
        <span></details></span>

    ```
    <span></details></span>


REFERENCE:
1. <span id="r1"></span> [reference 1](https://........../)
