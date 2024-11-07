function handleConvertSymbol(content, mien, dayOfWeek) {
    let contentTmp = content;

    contentTmp = contentTmp
        .replace(/đ/g, 'd')
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/ư/g, 'u')
        .replace(/ơ/g, 'o')
        .replace(/ô/g, 'o')
        .replace(/ê/g, 'e')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/dai/g, 'd');

    let length = contentTmp.length;

    const searchChars = [
        '2d',
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
        'qt',
        'gl',
        'bd',
        'nt',
        'qg',
        'do',
        'kt',
        'mb',
        'bl',
    ];

    let dai = '';
    let listDai = [
        'thanhpho',
        'tpho',
        'tph',
        'thpho',
        'thph',
        'thp',
        'dongthap',
        'dthap',
        'dth',
        'camau',
        'cmau',
        'bentre',
        'btre',
        'vungtau',
        'vtau',
        'baclieu',
        'blieu',
        'bliu',
        'bacliu',
        'dongnai',
        'dnai',
        'cantho',
        'ctho',
        'soctrang',
        'strang',
        'tayninh',
        'tninh',
        'angiang',
        'ang',
        'agiang',
        'binhthuan',
        'bthuan',
        'bth',
        'binhduong',
        'bduong',
        'vinhlong',
        'vlong',
        'travinh',
        'trvinh',
        'tvinh',
        'longan',
        'lan',
        'binhphuoc',
        'bphuoc',
        'haugiang',
        'hgiang',
        'tiengiang',
        'tgiang',
        'tgi',
        'kiengiang',
        'kgiang',
        'kgi',
        'dalat',
        'dlat',
        'phuyen',
        'pyen',
        'hue',
        'daklak',
        'dlak',
        'dlac',
        'daclac',
        'daclak',
        'daklac',
        'quangnam',
        'qnam',
        'danang',
        'dnang',
        'khanhhoa',
        'khoa',
        'quangbinh',
        'qbinh',
        'binhdinh',
        'bdinh',
        'quangtri',
        'qtri',
        'gialai',
        'glai',
        'ninhthuan',
        'nthuan',
        'quangngai',
        'qngai',
        'dacnong',
        'dnong',
        'dno',
        'daknong',
        'kontum',
        'ktum',
        'kontom',
    ];

    let bDai = false;
    var daiMain = '';

    var vtbd = 0;
    var fVtbd = true;

    var vtkt = 0;

    for (var i = 0; i < length; i++) {
        if (!isFinite(Number(contentTmp[i])) && contentTmp[i] !== '.') {
            dai += contentTmp[i];

            if (fVtbd) {
                vtbd = i;
                fVtbd = false;
            }
        }

        if ((contentTmp[i] === '.' || isFinite(Number(contentTmp[i]))) && dai.length > 2) {
            if (dai === 'dng') {
                vtkt = i;

                daiMain = 'dg';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'hcm') {
                vtkt = i;

                daiMain = 'tp';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'btr') {
                vtkt = i;

                daiMain = 'br';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'dlk') {
                vtkt = i;

                daiMain = 'dl';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'bihdinh') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'bihdih') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'binhdih') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'travih') {
                vtkt = i;

                daiMain = 'tv';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'vlong') {
                vtkt = i;

                daiMain = 'vl';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (
                dai === 'dphu' ||
                dai === 'daiphu' ||
                dai === 'dph' ||
                dai === 'phu' ||
                dai === 'daiph' ||
                dai === 'daip'
            ) {
                vtkt = i;

                daiMain = 'dp';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (
                dai === 'dch' ||
                dai === 'chanh' ||
                dai === 'chinh' ||
                dai === 'daich' ||
                dai === 'daichinh' ||
                dai === 'daichih' ||
                dai === 'daichin' ||
                dai === 'daichi' ||
                dai === 'daichanh' ||
                dai === 'daichah' ||
                dai === 'daicha' ||
                dai === 'daic' ||
                dai === 'dchinh' ||
                dai === 'dchih' ||
                dai === 'dchin' ||
                dai === 'dchi' ||
                dai === 'dchanh' ||
                dai === 'dcha' ||
                dai === 'dchah'
            ) {
                vtkt = i;

                daiMain = 'dc';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (listDai.includes(dai)) {
                vtkt = i;

                if (
                    dai === 'thanhpho' ||
                    dai === 'tpho' ||
                    dai === 'tph' ||
                    dai === 'thpho' ||
                    dai === 'thph' ||
                    dai === 'thp'
                ) {
                    daiMain = 'tp';
                } else if (dai === 'dongthap' || dai === 'dthap' || dai === 'dth') {
                    daiMain = 'dt';
                } else if (dai === 'camau' || dai === 'cmau') {
                    daiMain = 'cm';
                } else if (dai === 'bentre' || dai === 'btre') {
                    daiMain = 'br';
                } else if (dai === 'vungtau' || dai === 'vtau') {
                    daiMain = 'vt';
                } else if (dai === 'baclieu' || dai === 'blieu' || dai === 'bliu' || dai === 'bacliu') {
                    daiMain = 'bi';
                } else if (dai === 'dongnai' || dai === 'dnai') {
                    daiMain = 'dn';
                } else if (dai === 'cantho' || dai === 'ctho') {
                    daiMain = 'ct';
                } else if (dai === 'soctrang' || dai === 'strang') {
                    daiMain = 'st';
                } else if (dai === 'tayninh' || dai === 'tninh') {
                    daiMain = 'tn';
                } else if (dai === 'angiang' || dai === 'agiang' || dai === 'ang') {
                    daiMain = 'ag';
                } else if (dai === 'binhthuan' || dai === 'bthuan' || dai === 'bth') {
                    daiMain = 'bt';
                } else if (dai === 'binhduong' || dai === 'bduong') {
                    daiMain = 'bu';
                } else if (dai === 'vinhlong' || dai === 'vlong') {
                    daiMain = 'vl';
                } else if (dai === 'travinh' || dai === 'tvinh' || dai === 'trvinh') {
                    daiMain = 'tv';
                } else if (dai === 'longan' || dai === 'lan') {
                    daiMain = 'la';
                } else if (dai === 'binhphuoc' || dai === 'bphuoc') {
                    daiMain = 'bp';
                } else if (dai === 'haugiang' || dai === 'hgiang') {
                    daiMain = 'hg';
                } else if (dai === 'tiengiang' || dai === 'tgiang' || dai === 'tgi') {
                    daiMain = 'tg';
                } else if (dai === 'kiengiang' || dai === 'kgiang' || dai === 'kgi') {
                    daiMain = 'kg';
                } else if (dai === 'dalat' || dai === 'dlat') {
                    daiMain = 'lt';
                } else if (dai === 'phuyen' || dai === 'pyen') {
                    daiMain = 'py';
                } else if (dai === 'hue') {
                    daiMain = 'hu';
                } else if (
                    dai === 'dlac' ||
                    dai === 'dlak' ||
                    dai === 'daklak' ||
                    dai === 'daclac' ||
                    dai === 'daclak' ||
                    dai === 'daklac'
                ) {
                    daiMain = 'dl';
                } else if (dai === 'quangnam' || dai === 'qnam') {
                    daiMain = 'qn';
                } else if (dai === 'danang' || dai === 'dnang') {
                    daiMain = 'dg';
                } else if (dai === 'khanhhoa' || dai === 'khoa') {
                    daiMain = 'kh';
                } else if (dai === 'quangbinh' || dai === 'qbinh') {
                    daiMain = 'qb';
                } else if (dai === 'binhdinh' || dai === 'bdinh') {
                    daiMain = 'bd';
                } else if (dai === 'quangtri' || dai === 'qtri') {
                    daiMain = 'qt';
                } else if (dai === 'gialai' || dai === 'glai') {
                    daiMain = 'gl';
                } else if (dai === 'ninhthuan' || dai === 'nthuan') {
                    daiMain = 'nt';
                } else if (dai === 'quangngai' || dai === 'qngai') {
                    daiMain = 'qg';
                } else if (dai === 'dacnong' || dai === 'daknong' || dai === 'dnong' || dai === 'dno') {
                    daiMain = 'do';
                } else if (dai === 'kontum' || dai === 'kontom' || dai === 'ktum') {
                    daiMain = 'kt';
                }

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else {
                bDai = false;
            }
        } else if (
            (contentTmp[i] === '.' || isFinite(Number(contentTmp[i]))) &&
            dai.length === 2 &&
            searchChars.includes(dai)
        ) {
            vtkt = i;

            daiMain = dai;

            if (dai === 'dl' && mien === 'mn' && dayOfWeek === 1) {
                daiMain = 'lt';
            }

            if (dai === 'bd' && mien === 'mn' && dayOfWeek === 6) {
                daiMain = 'bu';
            }

            if (dai === 'qn' && mien === 'mt' && dayOfWeek === 7) {
                daiMain = 'qg';
            }

            if (dai === 'bt' && dayOfWeek === 3) {
                daiMain = 'br';
            }

            if (dai === 'dn' && mien === 'mt') {
                daiMain = 'dg';
            }

            contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

            i = vtbd + 1;
            length = contentTmp.length;

            bDai = true;
        }

        if (isFinite(Number(contentTmp[i])) || (contentTmp[i] === '.' && isFinite(Number(contentTmp[i + 1])))) {
            dai = '';
            vtbd = 0;
            fVtbd = true;
        }

        if (bDai) {
            dai = '';
            vtbd = 0;
            fVtbd = true;

            vtkt = 0;

            bDai = false;
        }
    }

    return contentTmp;
}

export default handleConvertSymbol;
