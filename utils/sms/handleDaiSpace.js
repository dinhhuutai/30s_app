function handleDaiSpace(content) {
    let contentTmp = content;
    let vt = contentTmp.indexOf("2.d");

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else if (
            (contentTmp[vt + 3] === "." ||
                isFinite(Number(contentTmp[vt + 3]))) &&
            isFinite(Number(contentTmp[vt + 4]))
        ) {
            contentTmp =
                contentTmp.slice(0, vt) + "2d" + contentTmp.slice(vt + 3);
        }

        vt = contentTmp.indexOf("2.d", vt + 1);
    }

    vt = contentTmp.indexOf("3.d");

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else if (
            (contentTmp[vt + 3] === "." ||
                isFinite(Number(contentTmp[vt + 3]))) &&
            isFinite(Number(contentTmp[vt + 4]))
        ) {
            contentTmp =
                contentTmp.slice(0, vt) + "3d" + contentTmp.slice(vt + 3);
        }

        vt = contentTmp.indexOf("3.d", vt + 1);
    }

    vt = contentTmp.indexOf("4.d");

    while (vt !== -1) {
        if (isFinite(Number(contentTmp[vt - 1]))) {
        } else if (
            (contentTmp[vt + 3] === "." ||
                isFinite(Number(contentTmp[vt + 3]))) &&
            isFinite(Number(contentTmp[vt + 4]))
        ) {
            contentTmp =
                contentTmp.slice(0, vt) + "4d" + contentTmp.slice(vt + 3);
        }

        vt = contentTmp.indexOf("4.d", vt + 1);
    }

    return contentTmp;
}

export default handleDaiSpace;
