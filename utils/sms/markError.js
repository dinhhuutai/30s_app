let listDaiError = [
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
    'bentr',
    'btre',
    'vungtau',
    'vugtau',
    'vugt',
    'vungt',
    'vtau',
    'baclieu',
    'bacl',
    'blieu',
    'bliu',
    'bacliu',
    'dongnai',
    'dognai',
    'dongn',
    'dogn',
    'dgnai',
    'dnai',
    'cantho',
    'canth',
    'ctho',
    'cth',
    'soctrang',
    'strang',
    'stran',
    'soctran',
    'strag',
    'soctrag',
    'tayninh',
    'tninh',
    'angiang',
    'ang',
    'agiang',
    'angian',
    'agian',
    'binhthuan',
    'bihthuan',
    'bihth',
    'binhth',
    'bthuan',
    'bth',
    'binhduong',
    'bduong',
    'bihduong',
    'bihduon',
    'bihduog',
    'binhduog',
    'bduog',
    'binhduon',
    'bduon',
    'vinhlong',
    'vlong',
    'vlon',
    'vihlon',
    'vihlong',
    'vinhlon',
    'travih',
    'trvih',
    'travinh',
    'trvinh',
    'tvinh',
    'logan',
    'loga',
    'longan',
    'lan',
    'lonan',
    'longa',
    'binhphuoc',
    'bph',
    'bihph',
    'bihphuoc',
    'binhph',
    'bphuoc',
    'haugiang',
    'haugiag',
    'hgiang',
    'haugian',
    'hgian',
    'tiengiag',
    'tgiag',
    'tiengiang',
    'tgiang',
    'tiengian',
    'tgian',
    'tgi',
    'kiengiag',
    'kgiag',
    'kiengiang',
    'kgiang',
    'kiengian',
    'kgian',
    'kgi',
    'dalat',
    'dlat',
    'phuin',
    'phuien',
    'pien',
    'phuy',
    'phy',
    'phuyen',
    'pyen',
    'hue',
    'thuathienhue',
    'thhue',
    'tthue',
    'tth',
    'daklak',
    'dlak',
    'dlac',
    'daclac',
    'daclak',
    'daklac',
    'quangnam',
    'quagnam',
    'qnam',
    'danag',
    'dnag',
    'danang',
    'dnang',
    'danan',
    'dnan',
    'khanhhoa',
    'khoa',
    'khhoa',
    'quangbinh',
    'quagbih',
    'quagbinh',
    'quanbih',
    'quanbinh',
    'quangbih',
    'qbih',
    'qbinh',
    'binhdinh',
    'bihdih',
    'bihdinh',
    'binhdih',
    'bdinh',
    'bdi',
    'bdih',
    'quangtri',
    'quagtr',
    'quagtri',
    'quantr',
    'quantri',
    'quangtr',
    'qtr',
    'qtri',
    'gialai',
    'glai',
    'ninhthuan',
    'ninhth',
    'nihthuan',
    'nihth',
    'nith',
    'nithuan',
    'nth',
    'ninhth',
    'nthuan',
    'quangngai',
    'quagngai',
    'quagng',
    'quangng',
    'quangai',
    'quanngai',
    'qngai',
    'dacnong',
    'dacnog',
    'dnog',
    'daknog',
    'dnong',
    'dno',
    'daknong',
    'dacnon',
    'dnon',
    'daknon',
    'kontum',
    'ktum',
    'ktom',
    'kontom',
];

function markError(content, errorSyntaxDetail, mien, dayOfWeek) {
    let length = content.length;

    if (errorSyntaxDetail?.code === 'keo') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num[0]);
        let positionFirstTmp = positionFirst;
        let positionEnd;
        let keoTmp = '';
        let soSauTmp = '';

        while (positionFirstTmp !== -1) {
            for (let i = positionFirst + errorSyntaxDetail.num[0].length; i < length; i++) {
                if (
                    /^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                        content[i],
                    )
                ) {
                    if (
                        /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                            content[i],
                        )
                    ) {
                        keoTmp += content[i]
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/đ/g, 'd')
                            .replace(/ă/g, 'a')
                            .replace(/â/g, 'a')
                            .replace(/ư/g, 'u')
                            .replace(/ơ/g, 'o')
                            .replace(/ô/g, 'o')
                            .replace(/ê/g, 'e');
                    } else if (/^[0-9]$/.test(content[i])) {
                        soSauTmp += content[i];
                    }
                } else if (keoTmp.length >= 1 && soSauTmp.length >= 1) {
                    if (
                        (keoTmp === 'k' || keoTmp === 'keo' || keoTmp === 'toi' || keoTmp === 'den') &&
                        soSauTmp === errorSyntaxDetail.num[1]
                    ) {
                        positionEnd = i;
                        positionFirstTmp = -1;
                        break;
                    } else {
                        positionFirst = content.indexOf(
                            errorSyntaxDetail.num[0],
                            positionFirst + errorSyntaxDetail.num[0].length,
                        );

                        positionFirstTmp = positionFirst;
                        keoTmp = '';
                        soSauTmp = '';
                        break;
                    }
                }
            }
        }

        return { code: 'keo', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'duaphiatruoc') {
        let positionFirst = -1;
        let positionEnd;
        let stringRedun = '';

        for (let i = 0; i < length; i++) {
            if (
                content[i] !== '.' &&
                content[i] !== ' ' &&
                !(isFinite(Number(content[i])) && isFinite(Number(content[i + 1])))
            ) {
                stringRedun += content[i]
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/đ/g, 'd')
                    .replace(/ă/g, 'a')
                    .replace(/â/g, 'a')
                    .replace(/ư/g, 'u')
                    .replace(/ơ/g, 'o')
                    .replace(/ô/g, 'o')
                    .replace(/ê/g, 'e');

                if (positionFirst === -1) {
                    positionFirst = i;
                }
            } else {
                if (stringRedun === errorSyntaxDetail.string) {
                    positionEnd = i;
                    break;
                }
            }
        }

        return { code: 'duaphiatruoc', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'dai') {
        let daiTmp = '';
        let positionFirst = -1;
        let positionEnd;
        let countKC = 0;
        let isKC = false;

        for (let i = 0; i < length; i++) {
            if (
                /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[i],
                ) ||
                content[i] === '.'
            ) {
                isKC = true;
                if (
                    /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                        content[i],
                    )
                ) {
                    daiTmp += content[i]
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .replace(/đ/g, 'd')
                        .replace(/ă/g, 'a')
                        .replace(/â/g, 'a')
                        .replace(/ư/g, 'u')
                        .replace(/ơ/g, 'o')
                        .replace(/ô/g, 'o')
                        .replace(/ê/g, 'e');

                    if (positionFirst === -1) {
                        positionFirst = i;
                    }
                }
            } else if (
                (content[i] === ' ' || content[i] === '\n' || content[i] === '\t' || content[i] === '\r') &&
                (daiTmp === 'n' || daiTmp === 'N')
            ) {
                isKC = true;
                daiTmp = '';
                positionFirst = -1;
            } else if (/^[0-9]$/.test(content[i]) || (content[i] === ' ' && daiTmp.length >= 2 && isKC)) {
                countKC++;

                isKC = false;

                if (daiTmp.toLowerCase() === 'dng') {
                    daiTmp = 'dg';
                } else if (daiTmp.toLowerCase() === 'hcm') {
                    daiTmp = 'tp';
                } else if (daiTmp.toLowerCase() === 'btr') {
                    daiTmp = 'br';
                } else if (daiTmp.toLowerCase() === 'dlk') {
                    daiTmp = 'dl';
                } else if (daiTmp.toLowerCase() === 'bihdinh') {
                    daiTmp = 'bd';
                } else if (daiTmp.toLowerCase() === 'bihdih') {
                    daiTmp = 'bd';
                } else if (daiTmp.toLowerCase() === 'binhdih') {
                    daiTmp = 'bd';
                } else if (daiTmp.toLowerCase() === 'travih') {
                    daiTmp = 'tv';
                } else if (daiTmp.toLowerCase() === 'vlong') {
                    daiTmp = 'vl';
                } else if (listDaiError.includes(daiTmp)) {
                    if (
                        daiTmp.toLowerCase() === 'thanhpho' ||
                        daiTmp.toLowerCase() === 'tpho' ||
                        daiTmp.toLowerCase() === 'tph' ||
                        daiTmp.toLowerCase() === 'thpho' ||
                        daiTmp.toLowerCase() === 'thph' ||
                        daiTmp.toLowerCase() === 'thp'
                    ) {
                        daiTmp = 'tp';
                    } else if (
                        daiTmp.toLowerCase() === 'dongthap' ||
                        daiTmp.toLowerCase() === 'dthap' ||
                        daiTmp.toLowerCase() === 'dth'
                    ) {
                        daiTmp = 'dt';
                    } else if (daiTmp.toLowerCase() === 'camau' || daiTmp.toLowerCase() === 'cmau') {
                        daiTmp = 'cm';
                    } else if (
                        daiTmp.toLowerCase() === 'bentr' ||
                        daiTmp.toLowerCase() === 'bentre' ||
                        daiTmp.toLowerCase() === 'btre'
                    ) {
                        daiTmp = 'br';
                    } else if (
                        daiTmp.toLowerCase() === 'vungtau' ||
                        daiTmp.toLowerCase() === 'vugtau' ||
                        daiTmp.toLowerCase() === 'vugt' ||
                        daiTmp.toLowerCase() === 'vungt' ||
                        daiTmp.toLowerCase() === 'vtau'
                    ) {
                        daiTmp = 'vt';
                    } else if (
                        daiTmp.toLowerCase() === 'baclieu' ||
                        daiTmp.toLowerCase() === 'bacl' ||
                        daiTmp.toLowerCase() === 'blieu' ||
                        daiTmp.toLowerCase() === 'bliu' ||
                        daiTmp.toLowerCase() === 'bacliu'
                    ) {
                        daiTmp = 'bi';
                    } else if (
                        daiTmp.toLowerCase() === 'dognai' ||
                        daiTmp.toLowerCase() === 'dongn' ||
                        daiTmp.toLowerCase() === 'dogn' ||
                        daiTmp.toLowerCase() === 'dgnai' ||
                        daiTmp.toLowerCase() === 'dongnai' ||
                        daiTmp.toLowerCase() === 'dnai'
                    ) {
                        daiTmp = 'dn';
                    } else if (
                        daiTmp.toLowerCase() === 'cantho' ||
                        daiTmp.toLowerCase() === 'ctho' ||
                        daiTmp.toLowerCase() === 'cth' ||
                        daiTmp.toLowerCase() === 'canth'
                    ) {
                        daiTmp = 'ct';
                    } else if (
                        daiTmp.toLowerCase() === 'soctrang' ||
                        daiTmp.toLowerCase() === 'strang' ||
                        daiTmp.toLowerCase() === 'stran' ||
                        daiTmp.toLowerCase() === 'soctran' ||
                        daiTmp.toLowerCase() === 'strag' ||
                        daiTmp.toLowerCase() === 'soctrag'
                    ) {
                        daiTmp = 'st';
                    } else if (daiTmp.toLowerCase() === 'tayninh' || daiTmp.toLowerCase() === 'tninh') {
                        daiTmp = 'tn';
                    } else if (
                        daiTmp.toLowerCase() === 'angiang' ||
                        daiTmp.toLowerCase() === 'agiang' ||
                        daiTmp.toLowerCase() === 'angian' ||
                        daiTmp.toLowerCase() === 'agian' ||
                        daiTmp.toLowerCase() === 'ang'
                    ) {
                        daiTmp = 'ag';
                    } else if (
                        daiTmp.toLowerCase() === 'bihthuan' ||
                        daiTmp.toLowerCase() === 'bihth' ||
                        daiTmp.toLowerCase() === 'binhth' ||
                        daiTmp.toLowerCase() === 'binhthuan' ||
                        daiTmp.toLowerCase() === 'bthuan' ||
                        daiTmp.toLowerCase() === 'bth'
                    ) {
                        daiTmp = 'bt';
                    } else if (
                        daiTmp.toLowerCase() === 'bihduong' ||
                        daiTmp.toLowerCase() === 'bihduon' ||
                        daiTmp.toLowerCase() === 'bihduog' ||
                        daiTmp.toLowerCase() === 'binhduog' ||
                        daiTmp.toLowerCase() === 'bduog' ||
                        daiTmp.toLowerCase() === 'binhduon' ||
                        daiTmp.toLowerCase() === 'bduon' ||
                        daiTmp.toLowerCase() === 'binhduong' ||
                        daiTmp.toLowerCase() === 'bduong'
                    ) {
                        daiTmp = 'bu';
                    } else if (
                        daiTmp.toLowerCase() === 'vinhlong' ||
                        daiTmp.toLowerCase() === 'vlong' ||
                        daiTmp.toLowerCase() === 'vlon' ||
                        daiTmp.toLowerCase() === 'vihlon' ||
                        daiTmp.toLowerCase() === 'vihlong' ||
                        daiTmp.toLowerCase() === 'vinhlon'
                    ) {
                        daiTmp = 'vl';
                    } else if (
                        daiTmp.toLowerCase() === 'travih' ||
                        daiTmp.toLowerCase() === 'trvih' ||
                        daiTmp.toLowerCase() === 'travinh' ||
                        daiTmp.toLowerCase() === 'tvinh' ||
                        daiTmp.toLowerCase() === 'trvinh'
                    ) {
                        daiTmp = 'tv';
                    } else if (
                        daiTmp.toLowerCase() === 'logan' ||
                        daiTmp.toLowerCase() === 'loga' ||
                        daiTmp.toLowerCase() === 'longan' ||
                        daiTmp.toLowerCase() === 'lan' ||
                        daiTmp.toLowerCase() === 'longa' ||
                        daiTmp.toLowerCase() === 'lonan'
                    ) {
                        daiTmp = 'la';
                    } else if (
                        daiTmp.toLowerCase() === 'bph' ||
                        daiTmp.toLowerCase() === 'bihph' ||
                        daiTmp.toLowerCase() === 'bihphuoc' ||
                        daiTmp.toLowerCase() === 'binhph' ||
                        daiTmp.toLowerCase() === 'binhphuoc' ||
                        daiTmp.toLowerCase() === 'bphuoc'
                    ) {
                        daiTmp = 'bp';
                    } else if (
                        daiTmp.toLowerCase() === 'haugiang' ||
                        daiTmp.toLowerCase() === 'haugiag' ||
                        daiTmp.toLowerCase() === 'hgiang' ||
                        daiTmp.toLowerCase() === 'haugian' ||
                        daiTmp.toLowerCase() === 'hgian'
                    ) {
                        daiTmp = 'hg';
                    } else if (
                        daiTmp.toLowerCase() === 'tiengiang' ||
                        daiTmp.toLowerCase() === 'tgiang' ||
                        daiTmp.toLowerCase() === 'tiengiag' ||
                        daiTmp.toLowerCase() === 'tgiag' ||
                        daiTmp.toLowerCase() === 'tiengian' ||
                        daiTmp.toLowerCase() === 'tgian' ||
                        daiTmp.toLowerCase() === 'tgi'
                    ) {
                        daiTmp = 'tg';
                    } else if (
                        daiTmp.toLowerCase() === 'kiengiag' ||
                        daiTmp.toLowerCase() === 'kgiag' ||
                        daiTmp.toLowerCase() === 'kiengiang' ||
                        daiTmp.toLowerCase() === 'kgiang' ||
                        daiTmp.toLowerCase() === 'kiengian' ||
                        daiTmp.toLowerCase() === 'kgian' ||
                        daiTmp.toLowerCase() === 'kgi'
                    ) {
                        daiTmp = 'kg';
                    } else if (daiTmp.toLowerCase() === 'dalat' || daiTmp.toLowerCase() === 'dlat') {
                        daiTmp = 'lt';
                    } else if (
                        daiTmp.toLowerCase() === 'phuy' ||
                        daiTmp.toLowerCase() === 'phy' ||
                        daiTmp.toLowerCase() === 'phuyen' ||
                        daiTmp.toLowerCase() === 'pyen'
                    ) {
                        daiTmp = 'py';
                    } else if (
                        daiTmp.toLowerCase() === 'phuin' ||
                        daiTmp.toLowerCase() === 'phuien' ||
                        daiTmp.toLowerCase() === 'pien' ||
                        daiTmp.toLowerCase() === 'thuathienhue' ||
                        daiTmp.toLowerCase() === 'thhue' ||
                        daiTmp.toLowerCase() === 'tthue' ||
                        daiTmp.toLowerCase() === 'hue' ||
                        daiTmp.toLowerCase() === 'tth'
                    ) {
                        daiTmp = 'hu';
                    } else if (
                        daiTmp.toLowerCase() === 'dlac' ||
                        daiTmp.toLowerCase() === 'dlak' ||
                        daiTmp.toLowerCase() === 'daklak' ||
                        daiTmp.toLowerCase() === 'daclac' ||
                        daiTmp.toLowerCase() === 'daclak' ||
                        daiTmp.toLowerCase() === 'daklac'
                    ) {
                        daiTmp = 'dl';
                    } else if (
                        daiTmp.toLowerCase() === 'quagnam' ||
                        daiTmp.toLowerCase() === 'quangnam' ||
                        daiTmp.toLowerCase() === 'qnam'
                    ) {
                        daiTmp = 'qn';
                    } else if (
                        daiTmp.toLowerCase() === 'danag' ||
                        daiTmp.toLowerCase() === 'dnag' ||
                        daiTmp.toLowerCase() === 'danang' ||
                        daiTmp.toLowerCase() === 'dnang' ||
                        daiTmp.toLowerCase() === 'dnan' ||
                        daiTmp.toLowerCase() === 'danan'
                    ) {
                        daiTmp = 'dg';
                    } else if (
                        daiTmp.toLowerCase() === 'khanhhoa' ||
                        daiTmp.toLowerCase() === 'khoa' ||
                        daiTmp.toLowerCase() === 'khhoa'
                    ) {
                        daiTmp = 'kh';
                    } else if (
                        daiTmp.toLowerCase() === 'quagbih' ||
                        daiTmp.toLowerCase() === 'quagbinh' ||
                        daiTmp.toLowerCase() === 'quanbih' ||
                        daiTmp.toLowerCase() === 'quanbinh' ||
                        daiTmp.toLowerCase() === 'quangbih' ||
                        daiTmp.toLowerCase() === 'qbih' ||
                        daiTmp.toLowerCase() === 'quangbinh' ||
                        daiTmp.toLowerCase() === 'qbinh'
                    ) {
                        daiTmp = 'qb';
                    } else if (
                        daiTmp.toLowerCase() === 'bihdih' ||
                        daiTmp.toLowerCase() === 'bihdinh' ||
                        daiTmp.toLowerCase() === 'binhdih' ||
                        daiTmp.toLowerCase() === 'binhdinh' ||
                        daiTmp.toLowerCase() === 'bdinh' ||
                        daiTmp.toLowerCase() === 'bdi' ||
                        daiTmp.toLowerCase() === 'bdih'
                    ) {
                        daiTmp = 'bd';
                    } else if (
                        daiTmp.toLowerCase() === 'quagtr' ||
                        daiTmp.toLowerCase() === 'quagtri' ||
                        daiTmp.toLowerCase() === 'quantr' ||
                        daiTmp.toLowerCase() === 'quantri' ||
                        daiTmp.toLowerCase() === 'quangtr' ||
                        daiTmp.toLowerCase() === 'qtr' ||
                        daiTmp.toLowerCase() === 'quangtri' ||
                        daiTmp.toLowerCase() === 'qtri'
                    ) {
                        daiTmp = 'qt';
                    } else if (daiTmp.toLowerCase() === 'gialai' || daiTmp.toLowerCase() === 'glai') {
                        daiTmp = 'gl';
                    } else if (
                        daiTmp.toLowerCase() === 'ninhth' ||
                        daiTmp.toLowerCase() === 'nihthuan' ||
                        daiTmp.toLowerCase() === 'nihth' ||
                        daiTmp.toLowerCase() === 'nith' ||
                        daiTmp.toLowerCase() === 'nithuan' ||
                        daiTmp.toLowerCase() === 'nth' ||
                        daiTmp.toLowerCase() === 'ninhth' ||
                        daiTmp.toLowerCase() === 'ninhthuan' ||
                        daiTmp.toLowerCase() === 'nthuan'
                    ) {
                        daiTmp = 'nt';
                    } else if (
                        daiTmp.toLowerCase() === 'quagngai' ||
                        daiTmp.toLowerCase() === 'quagng' ||
                        daiTmp.toLowerCase() === 'quangng' ||
                        daiTmp.toLowerCase() === 'quangai' ||
                        daiTmp.toLowerCase() === 'quangngai' ||
                        daiTmp.toLowerCase() === 'qngai' ||
                        daiTmp.toLowerCase() === 'quanngai'
                    ) {
                        daiTmp = 'qg';
                    } else if (
                        daiTmp.toLowerCase() === 'dacnog' ||
                        daiTmp.toLowerCase() === 'daknog' ||
                        daiTmp.toLowerCase() === 'dnog' ||
                        daiTmp.toLowerCase() === 'dacnong' ||
                        daiTmp.toLowerCase() === 'daknong' ||
                        daiTmp.toLowerCase() === 'dnong' ||
                        daiTmp.toLowerCase() === 'dacnon' ||
                        daiTmp.toLowerCase() === 'daknon' ||
                        daiTmp.toLowerCase() === 'dnon' ||
                        daiTmp.toLowerCase() === 'dno'
                    ) {
                        daiTmp = 'do';
                    } else if (
                        daiTmp.toLowerCase() === 'kontum' ||
                        daiTmp.toLowerCase() === 'kontom' ||
                        daiTmp.toLowerCase() === 'ktum' ||
                        daiTmp.toLowerCase() === 'ktom'
                    ) {
                        daiTmp = 'kt';
                    }
                }

                console.log('dais: ', [errorSyntaxDetail.dais, daiTmp]);

                // eslint-disable-next-line no-loop-func
                if (errorSyntaxDetail.dais?.some((dai) => dai === daiTmp)) {
                    if (
                        (mien === 'mn' && dayOfWeek === 2 && ['tp', 'dt', 'cm'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 3 && ['br', 'vt', 'bi'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 4 && ['dn', 'ct', 'st'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 5 && ['tn', 'ag', 'bt'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 6 && ['vl', 'bu', 'tv'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 7 && ['tp', 'la', 'bp', 'hg'].includes(daiTmp)) ||
                        (mien === 'mn' && dayOfWeek === 1 && ['tg', 'kg', 'lt'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 2 && ['py', 'hu'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 3 && ['dl', 'qn'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 4 && ['dg', 'kh'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 5 && ['qb', 'bd', 'qt'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 6 && ['gl', 'nt'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 7 && ['dg', 'qg', 'do'].includes(daiTmp)) ||
                        (mien === 'mt' && dayOfWeek === 1 && ['kh', 'kt', 'hu'].includes(daiTmp))
                    ) {
                        console.log('111111111111: ', daiTmp);
                        daiTmp = '';
                        positionFirst = -1;
                        countKC = 0;
                    } else {
                        console.log('222222222222: ', daiTmp);
                        positionEnd = i;
                        break;
                    }
                } else if (countKC >= 2) {
                    daiTmp = '';
                    positionFirst = -1;

                    countKC = 0;
                }
            }
        }

        return { code: 'dai', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'da1') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num[0]);
        let positionFirstTmp = positionFirst;
        let positionEnd;

        let daTmp = '';

        while (positionFirstTmp !== -1) {
            for (let i = positionFirst + errorSyntaxDetail.num[0].length; i < length; i++) {
                if (
                    /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                        content[i],
                    )
                ) {
                    daTmp += content[i];
                } else if (daTmp.length >= 1) {
                    if (
                        daTmp === 'da' ||
                        daTmp === 'đa' ||
                        daTmp === 'đá' ||
                        daTmp === 'dax' ||
                        daTmp === 'đax' ||
                        daTmp === 'đáx' ||
                        daTmp === 'daxien' ||
                        daTmp === 'đaxien' ||
                        daTmp === 'đáxien' ||
                        daTmp === 'daxiên' ||
                        daTmp === 'đaxiên' ||
                        daTmp === 'đáxiên'
                    ) {
                        positionEnd = i;
                        positionFirstTmp = -1;
                        break;
                    } else if (content.indexOf('2da ')) {
                        positionFirst = content.indexOf('2da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else if (content.indexOf('3da ')) {
                        positionFirst = content.indexOf('3da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else if (content.indexOf('4da ')) {
                        positionFirst = content.indexOf('4da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else {
                        positionFirst = content
                            .slice(positionFirst + errorSyntaxDetail.num[0].lenght)
                            .indexOf(errorSyntaxDetail.num[0]);
                        positionFirstTmp = positionFirst;
                        daTmp = '';
                        break;
                    }
                } else if (content.indexOf('2da ')) {
                    positionFirst = content.indexOf('2da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else if (content.indexOf('3da ')) {
                    positionFirst = content.indexOf('3da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else if (content.indexOf('4da ')) {
                    positionFirst = content.indexOf('4da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else {
                    positionFirstTmp = -1;
                    break;
                }
            }

            console.log(111111);
        }

        return { code: 'da1', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'da2') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num[0]);
        let positionFirstTmp = positionFirst;
        let positionEnd;

        let daTmp = '';
        let soSauTmp = '';

        while (positionFirstTmp !== -1) {
            for (let i = positionFirst + errorSyntaxDetail.num[0].length; i < length; i++) {
                if (
                    /^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                        content[i],
                    ) &&
                    !(
                        daTmp === 'da' ||
                        daTmp === 'đa' ||
                        daTmp === 'đá' ||
                        daTmp === 'dax' ||
                        daTmp === 'đax' ||
                        daTmp === 'đáx' ||
                        daTmp === 'daxien' ||
                        daTmp === 'đaxien' ||
                        daTmp === 'đáxien' ||
                        daTmp === 'daxiên' ||
                        daTmp === 'đaxiên' ||
                        daTmp === 'đáxiên'
                    )
                ) {
                    if (
                        /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                            content[i],
                        )
                    ) {
                        daTmp += content[i];
                    } else if (/^[0-9]$/.test(content[i])) {
                        soSauTmp += content[i];
                    } else if (content.indexOf('2da ')) {
                        positionFirst = content.indexOf('2da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else if (content.indexOf('3da ')) {
                        positionFirst = content.indexOf('3da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else if (content.indexOf('4da ')) {
                        positionFirst = content.indexOf('4da ');
                        positionEnd = positionFirst + 4;
                        positionFirstTmp = -1;
                        break;
                    } else {
                        positionFirstTmp = -1;
                        break;
                    }
                } else if (daTmp.length > 1 && soSauTmp.length > 1) {
                    console.log(11111111);
                    if (
                        (daTmp === 'da' ||
                            daTmp === 'đa' ||
                            daTmp === 'đá' ||
                            daTmp === 'dax' ||
                            daTmp === 'đax' ||
                            daTmp === 'đáx' ||
                            daTmp === 'daxien' ||
                            daTmp === 'đaxien' ||
                            daTmp === 'đáxien' ||
                            daTmp === 'daxiên' ||
                            daTmp === 'đaxiên' ||
                            daTmp === 'đáxiên') &&
                        soSauTmp === errorSyntaxDetail.num[1]
                    ) {
                        positionEnd = i;
                        positionFirstTmp = -1;
                        break;
                    } else {
                        positionFirst = content.indexOf(
                            errorSyntaxDetail.num[0],
                            positionFirst + errorSyntaxDetail.num[0].length,
                        );

                        positionFirstTmp = positionFirst;
                        daTmp = '';
                        soSauTmp = '';
                        break;
                    }
                } else if (/^[0-9]$/.test(content[i])) {
                    soSauTmp += content[i];
                } else if (content.indexOf('2da ')) {
                    positionFirst = content.indexOf('2da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else if (content.indexOf('3da ')) {
                    positionFirst = content.indexOf('3da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else if (content.indexOf('4da ')) {
                    positionFirst = content.indexOf('4da ');
                    positionEnd = positionFirst + 4;
                    positionFirstTmp = -1;
                    break;
                } else {
                    positionFirstTmp = -1;
                    break;
                }
            }
        }

        return { code: 'da2', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'quantity1') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num);
        let positionFirstTmp = positionFirst;
        let positionEnd;

        while (positionFirstTmp !== -1) {
            if (/^[0-9]$/.test(content[positionFirst - 1]) || /^[0-9]$/.test(content[positionFirst + 1])) {
                positionFirst = content.indexOf(errorSyntaxDetail.num, positionFirst + errorSyntaxDetail.num.length);
            } else {
                positionEnd = positionFirst + 1;
                positionFirstTmp = -1;
            }
        }

        return { code: 'quantity1', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'quantity2') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num);
        let positionFirstTmp = positionFirst;
        let positionEnd;
        let ddTmp = '';

        while (positionFirstTmp !== -1) {
            if (
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst - 1],
                ) &&
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst + errorSyntaxDetail.num.length],
                )
            ) {
                for (let i = positionFirst + errorSyntaxDetail.num.length; i < length; i++) {
                    if (
                        /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                            content[i],
                        )
                    ) {
                        ddTmp += content[i]
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/đ/g, 'd')
                            .replace(/ă/g, 'a')
                            .replace(/â/g, 'a')
                            .replace(/ư/g, 'u')
                            .replace(/ơ/g, 'o')
                            .replace(/ô/g, 'o')
                            .replace(/ê/g, 'e');
                    } else if (ddTmp.length >= 1) {
                        if (ddTmp === 'd' || ddTmp === 'dd' || ddTmp === 'dauduoi') {
                            positionEnd = i;
                            positionFirstTmp = -1;
                            break;
                        } else {
                            positionFirst = content.indexOf(
                                errorSyntaxDetail.num,
                                positionFirst + errorSyntaxDetail.num.length,
                            );

                            positionFirstTmp = positionFirst;
                            ddTmp = '';
                            break;
                        }
                    }
                }
            } else {
                positionFirst = content.indexOf(errorSyntaxDetail.num, positionFirst + errorSyntaxDetail.num.length);

                positionFirstTmp = positionFirst;
                ddTmp = '';
            }
        }

        return { code: 'quantity2', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'quantity3') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num);
        let positionFirstTmp = positionFirst;
        let positionEnd;
        let xcTmp = '';

        while (positionFirstTmp !== -1) {
            if (
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst - 1],
                ) &&
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst + errorSyntaxDetail.num.length],
                )
            ) {
                for (let i = positionFirst + errorSyntaxDetail.num.length; i < length; i++) {
                    if (
                        /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                            content[i],
                        )
                    ) {
                        xcTmp += content[i]
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/đ/g, 'd')
                            .replace(/ă/g, 'a')
                            .replace(/â/g, 'a')
                            .replace(/ư/g, 'u')
                            .replace(/ơ/g, 'o')
                            .replace(/ô/g, 'o')
                            .replace(/ê/g, 'e');
                    } else if (xcTmp.length >= 1 && /^[0-9]$/.test(content[i])) {
                        console.log(xcTmp);
                        if (
                            xcTmp === 'xiuchu' ||
                            xcTmp === 'xc' ||
                            xcTmp === 'x' ||
                            xcTmp === 'xiu' ||
                            xcTmp === 'xiuch' ||
                            xcTmp === 'xiuc' ||
                            xcTmp === 'xch' ||
                            xcTmp === 'xchu' ||
                            xcTmp === 's' ||
                            xcTmp === 'sc' ||
                            xcTmp === 'siuchu' ||
                            xcTmp === 'siuch' ||
                            xcTmp === 'siuc' ||
                            xcTmp === 'sch' ||
                            xcTmp === 'schu' ||
                            xcTmp === 'xdau' ||
                            xcTmp === 'xcdau' ||
                            xcTmp === 'xchdau' ||
                            xcTmp === 'xchudau' ||
                            xcTmp === 'xiuchudau' ||
                            xcTmp === 'xiuchdau' ||
                            xcTmp === 'xiucdau' ||
                            xcTmp === 'xđau' ||
                            xcTmp === 'xcđau' ||
                            xcTmp === 'xiuchuđau' ||
                            xcTmp === 'sdau' ||
                            xcTmp === 'scdau' ||
                            xcTmp === 'schdau' ||
                            xcTmp === 'schudau' ||
                            xcTmp === 'siuchudau' ||
                            xcTmp === 'siuchdau' ||
                            xcTmp === 'siucdau' ||
                            xcTmp === 'sđau' ||
                            xcTmp === 'scđau' ||
                            xcTmp === 'siuchuđau' ||
                            xcTmp === 'xduoi' ||
                            xcTmp === 'xcduoi' ||
                            xcTmp === 'xchduoi' ||
                            xcTmp === 'xchuduoi' ||
                            xcTmp === 'xiuchuduoi' ||
                            xcTmp === 'xiuchduoi' ||
                            xcTmp === 'xiucduoi' ||
                            xcTmp === 'xduoi' ||
                            xcTmp === 'xcduoi' ||
                            xcTmp === 'xiuchuduoi' ||
                            xcTmp === 'xdui' ||
                            xcTmp === 'xcdui' ||
                            xcTmp === 'xchdui' ||
                            xcTmp === 'xchudui' ||
                            xcTmp === 'xiuchudui' ||
                            xcTmp === 'xiuchdui' ||
                            xcTmp === 'xiucdui' ||
                            xcTmp === 'xdui' ||
                            xcTmp === 'xcdui' ||
                            xcTmp === 'xiuchudui' ||
                            xcTmp === 'sduoi' ||
                            xcTmp === 'scduoi' ||
                            xcTmp === 'schduoi' ||
                            xcTmp === 'schuduoi' ||
                            xcTmp === 'siuchuduoi' ||
                            xcTmp === 'siuchduoi' ||
                            xcTmp === 'siucduoi' ||
                            xcTmp === 'sduoi' ||
                            xcTmp === 'scduoi' ||
                            xcTmp === 'siuchuduoi' ||
                            xcTmp === 'sdui' ||
                            xcTmp === 'scdui' ||
                            xcTmp === 'schdui' ||
                            xcTmp === 'schudui' ||
                            xcTmp === 'siuchudui' ||
                            xcTmp === 'siuchdui' ||
                            xcTmp === 'siucdui' ||
                            xcTmp === 'sdui' ||
                            xcTmp === 'scdui' ||
                            xcTmp === 'siuchudui' ||
                            xcTmp === 'daoxc' ||
                            xcTmp === 'daox' ||
                            xcTmp === 'dxchu' ||
                            xcTmp === 'dx' ||
                            xcTmp === 'dxc' ||
                            xcTmp === 'xd' ||
                            xcTmp === 'xdao' ||
                            xcTmp === 'xcdao' ||
                            xcTmp === 'xiuchudao' ||
                            xcTmp === 'xchudao' ||
                            xcTmp === 'xchdao' ||
                            xcTmp === 'xiucdao' ||
                            xcTmp === 'xiuchdao' ||
                            xcTmp === 'xcd' ||
                            xcTmp === 'xiuchud' ||
                            xcTmp === 'xchud' ||
                            xcTmp === 'xchd' ||
                            xcTmp === 'xiucd' ||
                            xcTmp === 'xiuchd' ||
                            xcTmp === 'đaoxc' ||
                            xcTmp === 'đaox' ||
                            xcTmp === 'đxchu' ||
                            xcTmp === 'đx' ||
                            xcTmp === 'đxc' ||
                            xcTmp === 'xđ' ||
                            xcTmp === 'xđao' ||
                            xcTmp === 'xcđ' ||
                            xcTmp === 'xcđao' ||
                            xcTmp === 'xiuchuđao' ||
                            xcTmp === 'daox' ||
                            xcTmp === 'daoxc' ||
                            xcTmp === 'daoxiuchu' ||
                            xcTmp === 'daoxchu' ||
                            xcTmp === 'daoxch' ||
                            xcTmp === 'daoxiuc' ||
                            xcTmp === 'daoxiuch' ||
                            xcTmp === 'dxc' ||
                            xcTmp === 'dxiuchu' ||
                            xcTmp === 'dxchu' ||
                            xcTmp === 'dxch' ||
                            xcTmp === 'dxiuc' ||
                            xcTmp === 'dxiuch' ||
                            xcTmp === 'daosc' ||
                            xcTmp === 'daos' ||
                            xcTmp === 'dschu' ||
                            xcTmp === 'ds' ||
                            xcTmp === 'dsc' ||
                            xcTmp === 'sd' ||
                            xcTmp === 'sdao' ||
                            xcTmp === 'scdao' ||
                            xcTmp === 'siuchudao' ||
                            xcTmp === 'schudao' ||
                            xcTmp === 'schdao' ||
                            xcTmp === 'siucdao' ||
                            xcTmp === 'siuchdao' ||
                            xcTmp === 'scd' ||
                            xcTmp === 'siuchud' ||
                            xcTmp === 'schud' ||
                            xcTmp === 'schd' ||
                            xcTmp === 'siucd' ||
                            xcTmp === 'siuchd' ||
                            xcTmp === 'đaosc' ||
                            xcTmp === 'đaos' ||
                            xcTmp === 'đschu' ||
                            xcTmp === 'đs' ||
                            xcTmp === 'đsc' ||
                            xcTmp === 'sđ' ||
                            xcTmp === 'sđao' ||
                            xcTmp === 'scđ' ||
                            xcTmp === 'scđao' ||
                            xcTmp === 'siuchuđao' ||
                            xcTmp === 'daos' ||
                            xcTmp === 'daosc' ||
                            xcTmp === 'daosiuchu' ||
                            xcTmp === 'daoschu' ||
                            xcTmp === 'daosch' ||
                            xcTmp === 'daosiuc' ||
                            xcTmp === 'daosiuch' ||
                            xcTmp === 'dsc' ||
                            xcTmp === 'dsiuchu' ||
                            xcTmp === 'dschu' ||
                            xcTmp === 'dsch' ||
                            xcTmp === 'dsiuc' ||
                            xcTmp === 'dsiuch' ||
                            xcTmp === 'daoxcdau' ||
                            xcTmp === 'daoxdau' ||
                            xcTmp === 'dxchudau' ||
                            xcTmp === 'dxdau' ||
                            xcTmp === 'dxcdau' ||
                            xcTmp === 'xddau' ||
                            xcTmp === 'xdaodau' ||
                            xcTmp === 'xcdaodau' ||
                            xcTmp === 'xiuchudaodau' ||
                            xcTmp === 'xchudaodau' ||
                            xcTmp === 'xchdaodau' ||
                            xcTmp === 'xiucdaodau' ||
                            xcTmp === 'xiuchdaodau' ||
                            xcTmp === 'xcddau' ||
                            xcTmp === 'xiuchuddau' ||
                            xcTmp === 'xchuddau' ||
                            xcTmp === 'xchddau' ||
                            xcTmp === 'xiucddau' ||
                            xcTmp === 'xiuchddau' ||
                            xcTmp === 'đaoxcdau' ||
                            xcTmp === 'đaoxdau' ||
                            xcTmp === 'đxchudau' ||
                            xcTmp === 'đxdau' ||
                            xcTmp === 'đxcdau' ||
                            xcTmp === 'xđdau' ||
                            xcTmp === 'xđaodau' ||
                            xcTmp === 'xcđdau' ||
                            xcTmp === 'xcđaodau' ||
                            xcTmp === 'xiuchuđaodau' ||
                            xcTmp === 'daoxdau' ||
                            xcTmp === 'daoxcdau' ||
                            xcTmp === 'daoxiuchudau' ||
                            xcTmp === 'daoxchudau' ||
                            xcTmp === 'daoxchdau' ||
                            xcTmp === 'daoxiucdau' ||
                            xcTmp === 'daoxiuchdau' ||
                            xcTmp === 'dxcdau' ||
                            xcTmp === 'dxiuchudau' ||
                            xcTmp === 'dxchudau' ||
                            xcTmp === 'dxchdau' ||
                            xcTmp === 'dxiucdau' ||
                            xcTmp === 'dxiuchdau' ||
                            xcTmp === 'daoscdau' ||
                            xcTmp === 'daosdau' ||
                            xcTmp === 'dschudau' ||
                            xcTmp === 'dsdau' ||
                            xcTmp === 'dscdau' ||
                            xcTmp === 'sddau' ||
                            xcTmp === 'sdaodau' ||
                            xcTmp === 'scdaodau' ||
                            xcTmp === 'siuchudaodau' ||
                            xcTmp === 'schudaodau' ||
                            xcTmp === 'schdaodau' ||
                            xcTmp === 'siucdaodau' ||
                            xcTmp === 'siuchdaodau' ||
                            xcTmp === 'scddau' ||
                            xcTmp === 'siuchuddau' ||
                            xcTmp === 'schuddau' ||
                            xcTmp === 'schddau' ||
                            xcTmp === 'siucddau' ||
                            xcTmp === 'siuchddau' ||
                            xcTmp === 'đaoscdau' ||
                            xcTmp === 'đaosdau' ||
                            xcTmp === 'đschudau' ||
                            xcTmp === 'đsdau' ||
                            xcTmp === 'đscdau' ||
                            xcTmp === 'sđdau' ||
                            xcTmp === 'sđaodau' ||
                            xcTmp === 'scđdau' ||
                            xcTmp === 'scđaodau' ||
                            xcTmp === 'siuchuđaodau' ||
                            xcTmp === 'daosdau' ||
                            xcTmp === 'daoscdau' ||
                            xcTmp === 'daosiuchudau' ||
                            xcTmp === 'daoschudau' ||
                            xcTmp === 'daoschdau' ||
                            xcTmp === 'daosiucdau' ||
                            xcTmp === 'daosiuchdau' ||
                            xcTmp === 'dscdau' ||
                            xcTmp === 'dsiuchudau' ||
                            xcTmp === 'dschudau' ||
                            xcTmp === 'dschdau' ||
                            xcTmp === 'dsiucdau' ||
                            xcTmp === 'dsiuchdau' ||
                            xcTmp === 'xcdaudao' ||
                            xcTmp === 'xiuchudaudao' ||
                            xcTmp === 'xchudaudao' ||
                            xcTmp === 'xcdaud' ||
                            xcTmp === 'xiuchudaud' ||
                            xcTmp === 'xchudaud' ||
                            xcTmp === 'scdaudao' ||
                            xcTmp === 'siuchudaudao' ||
                            xcTmp === 'schudaudao' ||
                            xcTmp === 'scdaud' ||
                            xcTmp === 'siuchudaud' ||
                            xcTmp === 'schudaud' ||
                            xcTmp === 'daoxcduoi' ||
                            xcTmp === 'daoxduoi' ||
                            xcTmp === 'dxchuduoi' ||
                            xcTmp === 'dxduoi' ||
                            xcTmp === 'dxcduoi' ||
                            xcTmp === 'xdduoi' ||
                            xcTmp === 'xdaoduoi' ||
                            xcTmp === 'xcdaoduoi' ||
                            xcTmp === 'xiuchudaoduoi' ||
                            xcTmp === 'xchudaoduoi' ||
                            xcTmp === 'xchdaoduoi' ||
                            xcTmp === 'xiucdaoduoi' ||
                            xcTmp === 'xiuchdaoduoi' ||
                            xcTmp === 'xcdduoi' ||
                            xcTmp === 'xiuchudduoi' ||
                            xcTmp === 'xchudduoi' ||
                            xcTmp === 'xchdduoi' ||
                            xcTmp === 'xiucdduoi' ||
                            xcTmp === 'xiuchdduoi' ||
                            xcTmp === 'đaoxcduoi' ||
                            xcTmp === 'đaoxduoi' ||
                            xcTmp === 'đxchuduoi' ||
                            xcTmp === 'đxduoi' ||
                            xcTmp === 'đxcduoi' ||
                            xcTmp === 'xđduoi' ||
                            xcTmp === 'xđaoduoi' ||
                            xcTmp === 'xcđduoi' ||
                            xcTmp === 'xcđaoduoi' ||
                            xcTmp === 'xiuchuđaoduoi' ||
                            xcTmp === 'daoxduoi' ||
                            xcTmp === 'daoxcduoi' ||
                            xcTmp === 'daoxiuchuduoi' ||
                            xcTmp === 'daoxchuduoi' ||
                            xcTmp === 'daoxchduoi' ||
                            xcTmp === 'daoxiucduoi' ||
                            xcTmp === 'daoxiuchduoi' ||
                            xcTmp === 'dxcduoi' ||
                            xcTmp === 'dxiuchuduoi' ||
                            xcTmp === 'dxchuduoi' ||
                            xcTmp === 'dxchduoi' ||
                            xcTmp === 'dxiucduoi' ||
                            xcTmp === 'dxiuchduoi' ||
                            xcTmp === 'daoscduoi' ||
                            xcTmp === 'daosduoi' ||
                            xcTmp === 'dschuduoi' ||
                            xcTmp === 'dsduoi' ||
                            xcTmp === 'dscduoi' ||
                            xcTmp === 'sdduoi' ||
                            xcTmp === 'sdaoduoi' ||
                            xcTmp === 'scdaoduoi' ||
                            xcTmp === 'siuchudaoduoi' ||
                            xcTmp === 'schudaoduoi' ||
                            xcTmp === 'schdaoduoi' ||
                            xcTmp === 'siucdaoduoi' ||
                            xcTmp === 'siuchdaoduoi' ||
                            xcTmp === 'scdduoi' ||
                            xcTmp === 'siuchudduoi' ||
                            xcTmp === 'schudduoi' ||
                            xcTmp === 'schdduoi' ||
                            xcTmp === 'siucdduoi' ||
                            xcTmp === 'siuchdduoi' ||
                            xcTmp === 'đaoscduoi' ||
                            xcTmp === 'đaosduoi' ||
                            xcTmp === 'đschuduoi' ||
                            xcTmp === 'đsduoi' ||
                            xcTmp === 'đscduoi' ||
                            xcTmp === 'sđduoi' ||
                            xcTmp === 'sđaoduoi' ||
                            xcTmp === 'scđduoi' ||
                            xcTmp === 'scđaoduoi' ||
                            xcTmp === 'siuchuđaoduoi' ||
                            xcTmp === 'daosduoi' ||
                            xcTmp === 'daoscduoi' ||
                            xcTmp === 'daosiuchuduoi' ||
                            xcTmp === 'daoschuduoi' ||
                            xcTmp === 'daoschduoi' ||
                            xcTmp === 'daosiucduoi' ||
                            xcTmp === 'daosiuchduoi' ||
                            xcTmp === 'dscduoi' ||
                            xcTmp === 'dsiuchuduoi' ||
                            xcTmp === 'dschuduoi' ||
                            xcTmp === 'dschduoi' ||
                            xcTmp === 'dsiucduoi' ||
                            xcTmp === 'dsiuchduoi' ||
                            xcTmp === 'xcduoidao' ||
                            xcTmp === 'xiuchuduoidao' ||
                            xcTmp === 'xchuduoidao' ||
                            xcTmp === 'xcduoid' ||
                            xcTmp === 'xiuchuduoid' ||
                            xcTmp === 'xchuduoid' ||
                            xcTmp === 'scduoidao' ||
                            xcTmp === 'siuchuduoidao' ||
                            xcTmp === 'schuduoidao' ||
                            xcTmp === 'scduoid' ||
                            xcTmp === 'siuchuduoid' ||
                            xcTmp === 'schuduoid' ||
                            xcTmp === 'xdaudao' ||
                            xcTmp === 'xdaud' ||
                            xcTmp === 'xdaodau' ||
                            xcTmp === 'xddau' ||
                            xcTmp === 'xduidao' ||
                            xcTmp === 'xduoidao' ||
                            xcTmp === 'xduid' ||
                            xcTmp === 'xduoid' ||
                            xcTmp === 'xdaodui' ||
                            xcTmp === 'xdaoduoi' ||
                            xcTmp === 'xddui' ||
                            xcTmp === 'xdduoi' ||
                            xcTmp === 'baylo' ||
                            xcTmp === 'baobay' ||
                            xcTmp === 'baobaylo' ||
                            xcTmp === 'baylod' ||
                            xcTmp === 'baobayd' ||
                            xcTmp === 'baobaylod' ||
                            xcTmp === 'baylodao' ||
                            xcTmp === 'baobaydao' ||
                            xcTmp === 'baobaylodao' ||
                            xcTmp === 'dbaylo' ||
                            xcTmp === 'dbaobay' ||
                            xcTmp === 'dbaobaylo' ||
                            xcTmp === 'daobaylo' ||
                            xcTmp === 'daobaobay' ||
                            xcTmp === 'daobaobaylo' ||
                            xcTmp === 'tamlo' ||
                            xcTmp === 'baotam' ||
                            xcTmp === 'baotamlo' ||
                            xcTmp === 'tamlod' ||
                            xcTmp === 'baotamd' ||
                            xcTmp === 'baotamlod' ||
                            xcTmp === 'tamlodao' ||
                            xcTmp === 'baotamdao' ||
                            xcTmp === 'baotamlodao' ||
                            xcTmp === 'dtamlo' ||
                            xcTmp === 'dbaotam' ||
                            xcTmp === 'dbaotamlo' ||
                            xcTmp === 'daotamlo' ||
                            xcTmp === 'daobaotam' ||
                            xcTmp === 'daobaotamlo'
                        ) {
                            positionEnd = i;
                            positionFirstTmp = -1;
                            break;
                        } else {
                            positionFirst = content.indexOf(
                                errorSyntaxDetail.num,
                                positionFirst + errorSyntaxDetail.num.length,
                            );

                            positionFirstTmp = positionFirst;
                            xcTmp = '';
                            break;
                        }
                    }
                }
            } else {
                positionFirst = content.indexOf(errorSyntaxDetail.num, positionFirst + errorSyntaxDetail.num.length);

                positionFirstTmp = positionFirst;
                xcTmp = '';
            }
        }

        return { code: 'quantity3', location: [positionFirst, positionEnd] };
    } else if (errorSyntaxDetail?.code === 'notKD') {
        let positionFirst = content.indexOf(errorSyntaxDetail.num);
        let positionFirstTmp = positionFirst;
        let positionEnd;
        let kdTmp = '';

        while (positionFirstTmp !== -1) {
            if (
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst - 1],
                ) &&
                !/^[a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                    content[positionFirst + errorSyntaxDetail.num.length],
                )
            ) {
                for (let i = positionFirst + errorSyntaxDetail.num.length; i < length; i++) {
                    if (
                        /^[a-zA-ZÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ]$/.test(
                            content[i],
                        )
                    ) {
                        kdTmp += content[i]
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/đ/g, 'd')
                            .replace(/ă/g, 'a')
                            .replace(/â/g, 'a')
                            .replace(/ư/g, 'u')
                            .replace(/ơ/g, 'o')
                            .replace(/ô/g, 'o')
                            .replace(/ê/g, 'e');
                    } else if (kdTmp.length >= 1) {
                        if (kdTmp === errorSyntaxDetail.kdanh) {
                            positionEnd = i;
                            positionFirstTmp = -1;
                            break;
                        } else {
                            positionFirst = content.indexOf(
                                errorSyntaxDetail.num,
                                positionFirst + errorSyntaxDetail.num.length,
                            );

                            positionFirstTmp = positionFirst;
                            kdTmp = '';
                            break;
                        }
                    }
                }
            } else {
                positionFirst = content.indexOf(errorSyntaxDetail.num, positionFirst + errorSyntaxDetail.num.length);

                positionFirstTmp = positionFirst;
                kdTmp = '';
            }
        }

        return { code: 'notKD', location: [positionFirst, positionEnd] };
    }
}

export default markError;
