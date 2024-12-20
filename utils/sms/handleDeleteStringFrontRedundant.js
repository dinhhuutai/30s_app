function handleDeleteStringFrontRedundant(content) {
    let contentTmp = content;
    let length = contentTmp.length;

    const searchChars = [
        '2d',
        'hd',
        '2đ',
        '3d',
        '3đ',
        '4d',
        '4đ',
        'dc',
        'dp',
        'dt',
        'tp',
        'cm',
        'br',
        'vt',
        'bi',
        'dn',
        'ct',
        'st',
        'tn',
        'ag',
        'bt',
        'bu',
        'vl',
        'tv',
        'la',
        'bp',
        'hg',
        'tg',
        'kg',
        'lt',
        'py',
        'hu',
        'dl',
        'qn',
        'dg',
        'kh',
        'qb',
        'bd',
        'qt',
        'gl',
        'nt',
        'qg',
        'do',
        'kt',
        'mb',
        'bl',
    ];

    let stringRedun = '';
    let countDelete = 0;
    let errorSyntax = false;
    let errorSyntaxDetail = {};
    let stringRedunFirst = '';
    let isStringRedunFirst = false;

    for (let i = 0; i < length; i++) {
        if (contentTmp[i] !== '.' && !(isFinite(Number(contentTmp[i])) && isFinite(Number(contentTmp[i + 1])))) {
            stringRedun += contentTmp[i];
        } else {
            if (!isStringRedunFirst && stringRedun.length > 1) {
                stringRedunFirst = stringRedun;
                isStringRedunFirst = true;
            }

            if (searchChars.includes(stringRedun)) {
                break;
            } else {
                contentTmp = contentTmp.slice(i + 1);
                stringRedun = '';
                length = contentTmp.length;
                i = -1;
            }
        }
        countDelete++;
    }

    if (countDelete >= 6) {
        errorSyntax = true;
        errorSyntaxDetail = {
            code: 'duaphiatruoc',
            string: stringRedunFirst,
        };
    }

    return { data3: contentTmp, data4: errorSyntax, data42: errorSyntaxDetail };
}

export default handleDeleteStringFrontRedundant;
