function shortenText(content) {
    let contentTmp = content.toLowerCase();

    contentTmp = contentTmp
        .replace(/[\r\n]+/g, '.')
        .replace(/[\t\n]+/g, '.')
        .replace(/\s+/g, '.')
        .replace(/[.,:;+= ]/g, '.')
        .replace(/-/g, '.')
        .replace(/…/g, '')
        .replace(/₫/g, 'đ')
        .replace(/(\d)\s*nghìn/g, '$1.')
        .replace(/(\d)\s*nghin/g, '$1.')
        .replace(/(\d)\s*ngàn/g, '$1.')
        .replace(/(\d)\s*ngan/g, '$1.')
        .replace(/(\d)\s*ng/g, '$1.')
        .replace(/(\d)\s*n/g, '$1.')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.+/, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return contentTmp;
}

export default shortenText;
