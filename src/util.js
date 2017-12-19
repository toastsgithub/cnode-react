function html2text(html){
  const reg = /<[^>]*>/g
  return html.replace(reg, '')
}


export { html2text }