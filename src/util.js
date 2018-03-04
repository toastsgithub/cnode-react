/**
 * 解析出 html tag 中的 text
 * i.e. 
 * 输入 <p>hello world</p>
 * 输出 hello world 
 * @param {*} html 
 */
function html2text(html){
  const reg = /<[^>]*>/g
  return html.replace(reg, '')
}


export { html2text }