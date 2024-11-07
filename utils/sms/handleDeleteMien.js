function handleDeleteMien(content, mien) {
    let contentTmp = content;

    if (mien === 'mn') {
        contentTmp = contentTmp
            .replace(/mien.nam/g, '')
            .replace(/miennam/g, '')
            .replace(/mienam/g, '')
            .replace(/m.nam/g, '')
            .replace(/mnam/g, '')
            .replace(/m.n/g, '')
            .replace(/mn/g, '');
    } else if (mien === 'mt') {
        contentTmp = contentTmp
            .replace(/mien.trung/g, '')
            .replace(/mientrung/g, '')
            .replace(/m.trung/g, '')
            .replace(/mtrung/g, '')
            .replace(/mien.tr/g, '')
            .replace(/mientr/g, '')
            .replace(/m.tr/g, '')
            .replace(/mtr/g, '')
            .replace(/m.t/g, '')
            .replace(/mt/g, '');
    } else if (mien === 'mb') {
        contentTmp = contentTmp
            .replace(/mien.bac/g, '')
            .replace(/mienbac/g, '')
            .replace(/mien.b/g, '')
            .replace(/mienb/g, '')
            .replace(/m.b/g, '')
            .replace(/ha.noi/g, '')
            .replace(/hanoi/g, '')
            .replace(/h.noi/g, '')
            .replace(/hnoi/g, '')
            .replace(/ha.n/g, '')
            .replace(/han/g, '')
            .replace(/h.n/g, '')
            .replace(/hn/g, '');
    }

    if (contentTmp[0] === 'm' && contentTmp[1] === 'b') {
        let strD = contentTmp.substring(0, 2);
        let strS = contentTmp.substring(2);

        strS = strS.replace(/mb/g, '');

        contentTmp = strD + strS;
    }

    contentTmp = contentTmp.replace(/\.{2,}/g, '.');

    return contentTmp;
}

export default handleDeleteMien;
