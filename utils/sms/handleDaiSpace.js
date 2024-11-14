function handleDaiSpace(content) {
    let contentTmp = content;
    let vt = contentTmp.indexOf('2.d');

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else {
            content = contentTmp.slice(0, vt) + '2d' + contentTmp.slice(vt + 3);
        }

        contentTmp = contentTmp.slice(vt + 2);
        vt = contentTmp.indexOf('2.d');
    }

    contentTmp = content;
    vt = contentTmp.indexOf('3.d');

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else {
            content = contentTmp.slice(0, vt) + '3d' + contentTmp.slice(vt + 3);
        }

        contentTmp = contentTmp.slice(vt + 2);
        vt = contentTmp.indexOf('3.d');
    }

    contentTmp = content;
    vt = contentTmp.indexOf('4.d');

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else {
            content = contentTmp.slice(0, vt) + '4d' + contentTmp.slice(vt + 3);
        }

        contentTmp = contentTmp.slice(vt + 2);
        vt = contentTmp.indexOf('4.d');
    }

    return content;
}

export default handleDaiSpace;
