function findPosFirstAndTwo(content) {
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

    let changeDaiBacLieu = false;
    let changeBaoDao = [];

    function findPositions(char) {
        let positions = [];
        let index = content.indexOf(char);

        // && !isFinite(Number(content[index - 1]))

        while (index !== -1) {
            if (
                (content[index - 1] === '.' &&
                    isFinite(Number(content[index - 2])) &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2])))) ||
                index === 0 ||
                (content[index] === 'b' &&
                    content[index + 1] === 'l' &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2])))) ||
                (content[index] === 'b' &&
                    (content[index + 1] === 'u' || content[index + 1] === 'd') &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2]))))
            ) {
                positions.push(index);
            }
            index = content.indexOf(char, index + 1);
        }

        return positions;
    }

    const allPositions = searchChars.flatMap((char) => findPositions(char));

    let firstTwoPositions = allPositions.sort((a, b) => a - b);

    let stringChildTestTmp = content.slice(firstTwoPositions[0], firstTwoPositions[1]);
    stringChildTestTmp = stringChildTestTmp.replace(/[.]/g, '');
    stringChildTestTmp = stringChildTestTmp.slice(2);

    if (
        stringChildTestTmp.includes('dx') ||
        stringChildTestTmp.includes('đx') ||
        stringChildTestTmp.includes('đax') ||
        stringChildTestTmp.includes('da') ||
        stringChildTestTmp.includes('đa') ||
        stringChildTestTmp.includes('dat') ||
        stringChildTestTmp.includes('dathang') ||
        stringChildTestTmp.includes('dath') ||
        stringChildTestTmp.includes('dth') ||
        stringChildTestTmp.includes('dthang') ||
        stringChildTestTmp.includes('daxien') ||
        stringChildTestTmp.includes('dxien') ||
        stringChildTestTmp.includes('đat') ||
        stringChildTestTmp.includes('dax') ||
        (stringChildTestTmp.includes('l') &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('l') - 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('l') - 1]))) &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('l') + 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('l') + 1])))) ||
        stringChildTestTmp.includes('lo') ||
        (stringChildTestTmp.includes('b') &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('b') - 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('b') - 1]))) &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('b') + 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('b') + 1])))) ||
        stringChildTestTmp.includes('bl') ||
        stringChildTestTmp.includes('blo') ||
        stringChildTestTmp.includes('blô') ||
        stringChildTestTmp.includes('baolo') ||
        stringChildTestTmp.includes('bao') ||
        stringChildTestTmp.includes('baol') ||
        stringChildTestTmp.includes('baolô') ||
        stringChildTestTmp.includes('dl') ||
        stringChildTestTmp.includes('dlo') ||
        stringChildTestTmp.includes('ld') ||
        stringChildTestTmp.includes('lod') ||
        stringChildTestTmp.includes('db') ||
        stringChildTestTmp.includes('đb') ||
        stringChildTestTmp.includes('dbl') ||
        stringChildTestTmp.includes('đbl') ||
        stringChildTestTmp.includes('dblo') ||
        stringChildTestTmp.includes('đblô') ||
        stringChildTestTmp.includes('daobaolo') ||
        stringChildTestTmp.includes('daobaolô') ||
        stringChildTestTmp.includes('blodao') ||
        stringChildTestTmp.includes('daoblo') ||
        stringChildTestTmp.includes('baolodao') ||
        stringChildTestTmp.includes('daobaolo') ||
        stringChildTestTmp.includes('bldao') ||
        stringChildTestTmp.includes('daobl') ||
        stringChildTestTmp.includes('bdao') ||
        stringChildTestTmp.includes('daob') ||
        stringChildTestTmp.includes('baoldao') ||
        stringChildTestTmp.includes('daobaol') ||
        stringChildTestTmp.includes('baodao') ||
        stringChildTestTmp.includes('daobao') ||
        stringChildTestTmp.includes('daolo') ||
        stringChildTestTmp.includes('lodao') ||
        stringChildTestTmp.includes('bđao') ||
        stringChildTestTmp.includes('bld') ||
        stringChildTestTmp.includes('dd') ||
        stringChildTestTmp.includes('đđ') ||
        stringChildTestTmp.includes('dauduoi') ||
        stringChildTestTmp.includes('daudui') ||
        stringChildTestTmp.includes('daud') ||
        stringChildTestTmp.includes('ddui') ||
        stringChildTestTmp.includes('dduoi') ||
        stringChildTestTmp.includes('đd') ||
        stringChildTestTmp.includes('dđ') ||
        stringChildTestTmp.includes('đâuđuôi') ||
        stringChildTestTmp.includes('đầuđuôi') ||
        stringChildTestTmp.includes('đauđuôi') ||
        (stringChildTestTmp.includes('x') &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('x') - 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('x') - 1]))) &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('x') + 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('x') + 1])))) ||
        stringChildTestTmp.includes('xc') ||
        stringChildTestTmp.includes('xiuchu') ||
        stringChildTestTmp.includes('xiuch') ||
        stringChildTestTmp.includes('xiuc') ||
        stringChildTestTmp.includes('xch') ||
        stringChildTestTmp.includes('xchu') ||
        (stringChildTestTmp.includes('s') &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('s') - 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('s') - 1]))) &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('s') + 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('s') + 1])))) ||
        stringChildTestTmp.includes('sc') ||
        stringChildTestTmp.includes('siuchu') ||
        stringChildTestTmp.includes('siuch') ||
        stringChildTestTmp.includes('siuc') ||
        stringChildTestTmp.includes('sch') ||
        stringChildTestTmp.includes('schu') ||
        stringChildTestTmp.includes('xdau') ||
        stringChildTestTmp.includes('xcdau') ||
        stringChildTestTmp.includes('xchdau') ||
        stringChildTestTmp.includes('xchudau') ||
        stringChildTestTmp.includes('xiuchudau') ||
        stringChildTestTmp.includes('xiuchdau') ||
        stringChildTestTmp.includes('xiucdau') ||
        stringChildTestTmp.includes('xđau') ||
        stringChildTestTmp.includes('xcđau') ||
        stringChildTestTmp.includes('xiuchuđau') ||
        stringChildTestTmp.includes('sdau') ||
        stringChildTestTmp.includes('scdau') ||
        stringChildTestTmp.includes('schdau') ||
        stringChildTestTmp.includes('schudau') ||
        stringChildTestTmp.includes('siuchudau') ||
        stringChildTestTmp.includes('siuchdau') ||
        stringChildTestTmp.includes('siucdau') ||
        stringChildTestTmp.includes('sđau') ||
        stringChildTestTmp.includes('scđau') ||
        stringChildTestTmp.includes('siuchuđau') ||
        stringChildTestTmp.includes('xduoi') ||
        stringChildTestTmp.includes('xcduoi') ||
        stringChildTestTmp.includes('xchduoi') ||
        stringChildTestTmp.includes('xchuduoi') ||
        stringChildTestTmp.includes('xiuchuduoi') ||
        stringChildTestTmp.includes('xiuchduoi') ||
        stringChildTestTmp.includes('xiucduoi') ||
        stringChildTestTmp.includes('xduoi') ||
        stringChildTestTmp.includes('xcduoi') ||
        stringChildTestTmp.includes('xiuchuduoi') ||
        stringChildTestTmp.includes('xdui') ||
        stringChildTestTmp.includes('xcdui') ||
        stringChildTestTmp.includes('xchdui') ||
        stringChildTestTmp.includes('xchudui') ||
        stringChildTestTmp.includes('xiuchudui') ||
        stringChildTestTmp.includes('xiuchdui') ||
        stringChildTestTmp.includes('xiucdui') ||
        stringChildTestTmp.includes('xdui') ||
        stringChildTestTmp.includes('xcdui') ||
        stringChildTestTmp.includes('xiuchudui') ||
        stringChildTestTmp.includes('sduoi') ||
        stringChildTestTmp.includes('scduoi') ||
        stringChildTestTmp.includes('schduoi') ||
        stringChildTestTmp.includes('schuduoi') ||
        stringChildTestTmp.includes('siuchuduoi') ||
        stringChildTestTmp.includes('siuchduoi') ||
        stringChildTestTmp.includes('siucduoi') ||
        stringChildTestTmp.includes('sduoi') ||
        stringChildTestTmp.includes('scduoi') ||
        stringChildTestTmp.includes('siuchuduoi') ||
        stringChildTestTmp.includes('sdui') ||
        stringChildTestTmp.includes('scdui') ||
        stringChildTestTmp.includes('schdui') ||
        stringChildTestTmp.includes('schudui') ||
        stringChildTestTmp.includes('siuchudui') ||
        stringChildTestTmp.includes('siuchdui') ||
        stringChildTestTmp.includes('siucdui') ||
        stringChildTestTmp.includes('sdui') ||
        stringChildTestTmp.includes('scdui') ||
        stringChildTestTmp.includes('siuchudui') ||
        stringChildTestTmp.includes('daoxc') ||
        stringChildTestTmp.includes('daox') ||
        stringChildTestTmp.includes('dxchu') ||
        stringChildTestTmp.includes('dx') ||
        stringChildTestTmp.includes('dxc') ||
        stringChildTestTmp.includes('xd') ||
        stringChildTestTmp.includes('xdao') ||
        stringChildTestTmp.includes('xcdao') ||
        stringChildTestTmp.includes('xiuchudao') ||
        stringChildTestTmp.includes('xchudao') ||
        stringChildTestTmp.includes('xchdao') ||
        stringChildTestTmp.includes('xiucdao') ||
        stringChildTestTmp.includes('xiuchdao') ||
        stringChildTestTmp.includes('xcd') ||
        stringChildTestTmp.includes('xiuchud') ||
        stringChildTestTmp.includes('xchud') ||
        stringChildTestTmp.includes('xchd') ||
        stringChildTestTmp.includes('xiucd') ||
        stringChildTestTmp.includes('xiuchd') ||
        stringChildTestTmp.includes('đaoxc') ||
        stringChildTestTmp.includes('đaox') ||
        stringChildTestTmp.includes('đxchu') ||
        stringChildTestTmp.includes('đx') ||
        stringChildTestTmp.includes('đxc') ||
        stringChildTestTmp.includes('xđ') ||
        stringChildTestTmp.includes('xđao') ||
        stringChildTestTmp.includes('xcđ') ||
        stringChildTestTmp.includes('xcđao') ||
        stringChildTestTmp.includes('xiuchuđao') ||
        stringChildTestTmp.includes('daox') ||
        stringChildTestTmp.includes('daoxc') ||
        stringChildTestTmp.includes('daoxiuchu') ||
        stringChildTestTmp.includes('daoxchu') ||
        stringChildTestTmp.includes('daoxch') ||
        stringChildTestTmp.includes('daoxiuc') ||
        stringChildTestTmp.includes('daoxiuch') ||
        stringChildTestTmp.includes('dxc') ||
        stringChildTestTmp.includes('dxiuchu') ||
        stringChildTestTmp.includes('dxchu') ||
        stringChildTestTmp.includes('dxch') ||
        stringChildTestTmp.includes('dxiuc') ||
        stringChildTestTmp.includes('dxiuch') ||
        stringChildTestTmp.includes('daosc') ||
        stringChildTestTmp.includes('daos') ||
        stringChildTestTmp.includes('dschu') ||
        stringChildTestTmp.includes('ds') ||
        stringChildTestTmp.includes('dsc') ||
        stringChildTestTmp.includes('sd') ||
        stringChildTestTmp.includes('sdao') ||
        stringChildTestTmp.includes('scdao') ||
        stringChildTestTmp.includes('siuchudao') ||
        stringChildTestTmp.includes('schudao') ||
        stringChildTestTmp.includes('schdao') ||
        stringChildTestTmp.includes('siucdao') ||
        stringChildTestTmp.includes('siuchdao') ||
        stringChildTestTmp.includes('scd') ||
        stringChildTestTmp.includes('siuchud') ||
        stringChildTestTmp.includes('schud') ||
        stringChildTestTmp.includes('schd') ||
        stringChildTestTmp.includes('siucd') ||
        stringChildTestTmp.includes('siuchd') ||
        stringChildTestTmp.includes('đaosc') ||
        stringChildTestTmp.includes('đaos') ||
        stringChildTestTmp.includes('đschu') ||
        stringChildTestTmp.includes('đs') ||
        stringChildTestTmp.includes('đsc') ||
        stringChildTestTmp.includes('sđ') ||
        stringChildTestTmp.includes('sđao') ||
        stringChildTestTmp.includes('scđ') ||
        stringChildTestTmp.includes('scđao') ||
        stringChildTestTmp.includes('siuchuđao') ||
        stringChildTestTmp.includes('daos') ||
        stringChildTestTmp.includes('daosc') ||
        stringChildTestTmp.includes('daosiuchu') ||
        stringChildTestTmp.includes('daoschu') ||
        stringChildTestTmp.includes('daosch') ||
        stringChildTestTmp.includes('daosiuc') ||
        stringChildTestTmp.includes('daosiuch') ||
        stringChildTestTmp.includes('dsc') ||
        stringChildTestTmp.includes('dsiuchu') ||
        stringChildTestTmp.includes('dschu') ||
        stringChildTestTmp.includes('dsch') ||
        stringChildTestTmp.includes('dsiuc') ||
        stringChildTestTmp.includes('dsiuch') ||
        stringChildTestTmp.includes('duoi') ||
        stringChildTestTmp.includes('đuôi') ||
        stringChildTestTmp.includes('duôi') ||
        stringChildTestTmp.includes('đuoi') ||
        stringChildTestTmp.includes('dui') ||
        stringChildTestTmp.includes('đui') ||
        (stringChildTestTmp.includes('d') &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('d') - 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('d') - 1]))) &&
            (stringChildTestTmp[stringChildTestTmp.indexOf('d') + 1] === '.' ||
                isFinite(Number(stringChildTestTmp[stringChildTestTmp.indexOf('d') + 1])))) ||
        stringChildTestTmp.includes('daoxcdau') ||
        stringChildTestTmp.includes('daoxdau') ||
        stringChildTestTmp.includes('dxchudau') ||
        stringChildTestTmp.includes('dxdau') ||
        stringChildTestTmp.includes('dxcdau') ||
        stringChildTestTmp.includes('xddau') ||
        stringChildTestTmp.includes('xdaodau') ||
        stringChildTestTmp.includes('xcdaodau') ||
        stringChildTestTmp.includes('xiuchudaodau') ||
        stringChildTestTmp.includes('xchudaodau') ||
        stringChildTestTmp.includes('xchdaodau') ||
        stringChildTestTmp.includes('xiucdaodau') ||
        stringChildTestTmp.includes('xiuchdaodau') ||
        stringChildTestTmp.includes('xcddau') ||
        stringChildTestTmp.includes('xiuchuddau') ||
        stringChildTestTmp.includes('xchuddau') ||
        stringChildTestTmp.includes('xchddau') ||
        stringChildTestTmp.includes('xiucddau') ||
        stringChildTestTmp.includes('xiuchddau') ||
        stringChildTestTmp.includes('đaoxcdau') ||
        stringChildTestTmp.includes('đaoxdau') ||
        stringChildTestTmp.includes('đxchudau') ||
        stringChildTestTmp.includes('đxdau') ||
        stringChildTestTmp.includes('đxcdau') ||
        stringChildTestTmp.includes('xđdau') ||
        stringChildTestTmp.includes('xđaodau') ||
        stringChildTestTmp.includes('xcđdau') ||
        stringChildTestTmp.includes('xcđaodau') ||
        stringChildTestTmp.includes('xiuchuđaodau') ||
        stringChildTestTmp.includes('daoxdau') ||
        stringChildTestTmp.includes('daoxcdau') ||
        stringChildTestTmp.includes('daoxiuchudau') ||
        stringChildTestTmp.includes('daoxchudau') ||
        stringChildTestTmp.includes('daoxchdau') ||
        stringChildTestTmp.includes('daoxiucdau') ||
        stringChildTestTmp.includes('daoxiuchdau') ||
        stringChildTestTmp.includes('dxcdau') ||
        stringChildTestTmp.includes('dxiuchudau') ||
        stringChildTestTmp.includes('dxchudau') ||
        stringChildTestTmp.includes('dxchdau') ||
        stringChildTestTmp.includes('dxiucdau') ||
        stringChildTestTmp.includes('dxiuchdau') ||
        stringChildTestTmp.includes('daoscdau') ||
        stringChildTestTmp.includes('daosdau') ||
        stringChildTestTmp.includes('dschudau') ||
        stringChildTestTmp.includes('dsdau') ||
        stringChildTestTmp.includes('dscdau') ||
        stringChildTestTmp.includes('sddau') ||
        stringChildTestTmp.includes('sdaodau') ||
        stringChildTestTmp.includes('scdaodau') ||
        stringChildTestTmp.includes('siuchudaodau') ||
        stringChildTestTmp.includes('schudaodau') ||
        stringChildTestTmp.includes('schdaodau') ||
        stringChildTestTmp.includes('siucdaodau') ||
        stringChildTestTmp.includes('siuchdaodau') ||
        stringChildTestTmp.includes('scddau') ||
        stringChildTestTmp.includes('siuchuddau') ||
        stringChildTestTmp.includes('schuddau') ||
        stringChildTestTmp.includes('schddau') ||
        stringChildTestTmp.includes('siucddau') ||
        stringChildTestTmp.includes('siuchddau') ||
        stringChildTestTmp.includes('đaoscdau') ||
        stringChildTestTmp.includes('đaosdau') ||
        stringChildTestTmp.includes('đschudau') ||
        stringChildTestTmp.includes('đsdau') ||
        stringChildTestTmp.includes('đscdau') ||
        stringChildTestTmp.includes('sđdau') ||
        stringChildTestTmp.includes('sđaodau') ||
        stringChildTestTmp.includes('scđdau') ||
        stringChildTestTmp.includes('scđaodau') ||
        stringChildTestTmp.includes('siuchuđaodau') ||
        stringChildTestTmp.includes('daosdau') ||
        stringChildTestTmp.includes('daoscdau') ||
        stringChildTestTmp.includes('daosiuchudau') ||
        stringChildTestTmp.includes('daoschudau') ||
        stringChildTestTmp.includes('daoschdau') ||
        stringChildTestTmp.includes('daosiucdau') ||
        stringChildTestTmp.includes('daosiuchdau') ||
        stringChildTestTmp.includes('dscdau') ||
        stringChildTestTmp.includes('dsiuchudau') ||
        stringChildTestTmp.includes('dschudau') ||
        stringChildTestTmp.includes('dschdau') ||
        stringChildTestTmp.includes('dsiucdau') ||
        stringChildTestTmp.includes('dsiuchdau') ||
        stringChildTestTmp.includes('xcdaudao') ||
        stringChildTestTmp.includes('xiuchudaudao') ||
        stringChildTestTmp.includes('xchudaudao') ||
        stringChildTestTmp.includes('xcdaud') ||
        stringChildTestTmp.includes('xiuchudaud') ||
        stringChildTestTmp.includes('xchudaud') ||
        stringChildTestTmp.includes('scdaudao') ||
        stringChildTestTmp.includes('siuchudaudao') ||
        stringChildTestTmp.includes('schudaudao') ||
        stringChildTestTmp.includes('scdaud') ||
        stringChildTestTmp.includes('siuchudaud') ||
        stringChildTestTmp.includes('schudaud') ||
        stringChildTestTmp.includes('daoxcduoi') ||
        stringChildTestTmp.includes('daoxduoi') ||
        stringChildTestTmp.includes('dxchuduoi') ||
        stringChildTestTmp.includes('dxduoi') ||
        stringChildTestTmp.includes('dxcduoi') ||
        stringChildTestTmp.includes('xdduoi') ||
        stringChildTestTmp.includes('xdaoduoi') ||
        stringChildTestTmp.includes('xcdaoduoi') ||
        stringChildTestTmp.includes('xiuchudaoduoi') ||
        stringChildTestTmp.includes('xchudaoduoi') ||
        stringChildTestTmp.includes('xchdaoduoi') ||
        stringChildTestTmp.includes('xiucdaoduoi') ||
        stringChildTestTmp.includes('xiuchdaoduoi') ||
        stringChildTestTmp.includes('xcdduoi') ||
        stringChildTestTmp.includes('xiuchudduoi') ||
        stringChildTestTmp.includes('xchudduoi') ||
        stringChildTestTmp.includes('xchdduoi') ||
        stringChildTestTmp.includes('xiucdduoi') ||
        stringChildTestTmp.includes('xiuchdduoi') ||
        stringChildTestTmp.includes('đaoxcduoi') ||
        stringChildTestTmp.includes('đaoxduoi') ||
        stringChildTestTmp.includes('đxchuduoi') ||
        stringChildTestTmp.includes('đxduoi') ||
        stringChildTestTmp.includes('đxcduoi') ||
        stringChildTestTmp.includes('xđduoi') ||
        stringChildTestTmp.includes('xđaoduoi') ||
        stringChildTestTmp.includes('xcđduoi') ||
        stringChildTestTmp.includes('xcđaoduoi') ||
        stringChildTestTmp.includes('xiuchuđaoduoi') ||
        stringChildTestTmp.includes('daoxduoi') ||
        stringChildTestTmp.includes('daoxcduoi') ||
        stringChildTestTmp.includes('daoxiuchuduoi') ||
        stringChildTestTmp.includes('daoxchuduoi') ||
        stringChildTestTmp.includes('daoxchduoi') ||
        stringChildTestTmp.includes('daoxiucduoi') ||
        stringChildTestTmp.includes('daoxiuchduoi') ||
        stringChildTestTmp.includes('dxcduoi') ||
        stringChildTestTmp.includes('dxiuchuduoi') ||
        stringChildTestTmp.includes('dxchuduoi') ||
        stringChildTestTmp.includes('dxchduoi') ||
        stringChildTestTmp.includes('dxiucduoi') ||
        stringChildTestTmp.includes('dxiuchduoi') ||
        stringChildTestTmp.includes('daoscduoi') ||
        stringChildTestTmp.includes('daosduoi') ||
        stringChildTestTmp.includes('dschuduoi') ||
        stringChildTestTmp.includes('dsduoi') ||
        stringChildTestTmp.includes('dscduoi') ||
        stringChildTestTmp.includes('sdduoi') ||
        stringChildTestTmp.includes('sdaoduoi') ||
        stringChildTestTmp.includes('scdaoduoi') ||
        stringChildTestTmp.includes('siuchudaoduoi') ||
        stringChildTestTmp.includes('schudaoduoi') ||
        stringChildTestTmp.includes('schdaoduoi') ||
        stringChildTestTmp.includes('siucdaoduoi') ||
        stringChildTestTmp.includes('siuchdaoduoi') ||
        stringChildTestTmp.includes('scdduoi') ||
        stringChildTestTmp.includes('siuchudduoi') ||
        stringChildTestTmp.includes('schudduoi') ||
        stringChildTestTmp.includes('schdduoi') ||
        stringChildTestTmp.includes('siucdduoi') ||
        stringChildTestTmp.includes('siuchdduoi') ||
        stringChildTestTmp.includes('đaoscduoi') ||
        stringChildTestTmp.includes('đaosduoi') ||
        stringChildTestTmp.includes('đschuduoi') ||
        stringChildTestTmp.includes('đsduoi') ||
        stringChildTestTmp.includes('đscduoi') ||
        stringChildTestTmp.includes('sđduoi') ||
        stringChildTestTmp.includes('sđaoduoi') ||
        stringChildTestTmp.includes('scđduoi') ||
        stringChildTestTmp.includes('scđaoduoi') ||
        stringChildTestTmp.includes('siuchuđaoduoi') ||
        stringChildTestTmp.includes('daosduoi') ||
        stringChildTestTmp.includes('daoscduoi') ||
        stringChildTestTmp.includes('daosiuchuduoi') ||
        stringChildTestTmp.includes('daoschuduoi') ||
        stringChildTestTmp.includes('daoschduoi') ||
        stringChildTestTmp.includes('daosiucduoi') ||
        stringChildTestTmp.includes('daosiuchduoi') ||
        stringChildTestTmp.includes('dscduoi') ||
        stringChildTestTmp.includes('dsiuchuduoi') ||
        stringChildTestTmp.includes('dschuduoi') ||
        stringChildTestTmp.includes('dschduoi') ||
        stringChildTestTmp.includes('dsiucduoi') ||
        stringChildTestTmp.includes('dsiuchduoi') ||
        stringChildTestTmp.includes('xcduoidao') ||
        stringChildTestTmp.includes('xiuchuduoidao') ||
        stringChildTestTmp.includes('xchuduoidao') ||
        stringChildTestTmp.includes('xcduoid') ||
        stringChildTestTmp.includes('xiuchuduoid') ||
        stringChildTestTmp.includes('xchuduoid') ||
        stringChildTestTmp.includes('scduoidao') ||
        stringChildTestTmp.includes('siuchuduoidao') ||
        stringChildTestTmp.includes('schuduoidao') ||
        stringChildTestTmp.includes('scduoid') ||
        stringChildTestTmp.includes('siuchuduoid') ||
        stringChildTestTmp.includes('schuduoid') ||
        stringChildTestTmp.includes('baylo') ||
        stringChildTestTmp.includes('baobay') ||
        stringChildTestTmp.includes('baobaylo') ||
        stringChildTestTmp.includes('baylod') ||
        stringChildTestTmp.includes('baobayd') ||
        stringChildTestTmp.includes('baobaylod') ||
        stringChildTestTmp.includes('baylodao') ||
        stringChildTestTmp.includes('baobaydao') ||
        stringChildTestTmp.includes('baobaylodao') ||
        stringChildTestTmp.includes('dbaylo') ||
        stringChildTestTmp.includes('dbaobay') ||
        stringChildTestTmp.includes('dbaobaylo') ||
        stringChildTestTmp.includes('daobaylo') ||
        stringChildTestTmp.includes('daobaobay') ||
        stringChildTestTmp.includes('daobaobaylo') ||
        stringChildTestTmp.includes('tamlo') ||
        stringChildTestTmp.includes('baotam') ||
        stringChildTestTmp.includes('baotamlo') ||
        stringChildTestTmp.includes('tamlod') ||
        stringChildTestTmp.includes('baotamd') ||
        stringChildTestTmp.includes('baotamlod') ||
        stringChildTestTmp.includes('tamlodao') ||
        stringChildTestTmp.includes('baotamdao') ||
        stringChildTestTmp.includes('baotamlodao') ||
        stringChildTestTmp.includes('dtamlo') ||
        stringChildTestTmp.includes('dbaotam') ||
        stringChildTestTmp.includes('dbaotamlo') ||
        stringChildTestTmp.includes('daotamlo') ||
        stringChildTestTmp.includes('daobaotam') ||
        stringChildTestTmp.includes('daobaotamlo')
    ) {
    } else {
        firstTwoPositions.splice(1, 1);
    }

    if (
        content[firstTwoPositions[1]] === 'b' &&
        content[firstTwoPositions[1] + 1] === 'l' &&
        (content[firstTwoPositions[1] + 2] === '.' || isFinite(Number(content[firstTwoPositions[1] + 2])))
    ) {
        let stringChildTest = content.slice(firstTwoPositions[0], firstTwoPositions[1]);

        stringChildTest = stringChildTest.replace(/[.]/g, '');

        if (
            stringChildTest.includes('dx') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đax') ||
            stringChildTest.includes('da') ||
            stringChildTest.includes('đa') ||
            stringChildTest.includes('dat') ||
            stringChildTest.includes('dathang') ||
            stringChildTest.includes('dath') ||
            stringChildTest.includes('dth') ||
            stringChildTest.includes('dthang') ||
            stringChildTest.includes('daxien') ||
            stringChildTest.includes('dxien') ||
            stringChildTest.includes('đat') ||
            stringChildTest.includes('dax') ||
            (stringChildTest.includes('l') &&
                (stringChildTest[stringChildTest.indexOf('l') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('l') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') + 1])))) ||
            stringChildTest.includes('lo') ||
            (stringChildTest.includes('b') &&
                (stringChildTest[stringChildTest.indexOf('b') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('b') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') + 1])))) ||
            stringChildTest.includes('bl') ||
            stringChildTest.includes('blo') ||
            stringChildTest.includes('blô') ||
            stringChildTest.includes('baolo') ||
            stringChildTest.includes('bao') ||
            stringChildTest.includes('baol') ||
            stringChildTest.includes('baolô') ||
            stringChildTest.includes('dl') ||
            stringChildTest.includes('dlo') ||
            stringChildTest.includes('ld') ||
            stringChildTest.includes('lod') ||
            stringChildTest.includes('db') ||
            stringChildTest.includes('đb') ||
            stringChildTest.includes('dbl') ||
            stringChildTest.includes('đbl') ||
            stringChildTest.includes('dblo') ||
            stringChildTest.includes('đblô') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('daobaolô') ||
            stringChildTest.includes('blodao') ||
            stringChildTest.includes('daoblo') ||
            stringChildTest.includes('baolodao') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('bldao') ||
            stringChildTest.includes('daobl') ||
            stringChildTest.includes('bdao') ||
            stringChildTest.includes('daob') ||
            stringChildTest.includes('baoldao') ||
            stringChildTest.includes('daobaol') ||
            stringChildTest.includes('baodao') ||
            stringChildTest.includes('daobao') ||
            stringChildTest.includes('daolo') ||
            stringChildTest.includes('lodao') ||
            stringChildTest.includes('bđao') ||
            stringChildTest.includes('bld') ||
            stringChildTest.includes('dd') ||
            stringChildTest.includes('đđ') ||
            stringChildTest.includes('dauduoi') ||
            stringChildTest.includes('daudui') ||
            stringChildTest.includes('daud') ||
            stringChildTest.includes('ddui') ||
            stringChildTest.includes('dduoi') ||
            stringChildTest.includes('đd') ||
            stringChildTest.includes('dđ') ||
            stringChildTest.includes('đâuđuôi') ||
            stringChildTest.includes('đầuđuôi') ||
            stringChildTest.includes('đauđuôi') ||
            (stringChildTest.includes('x') &&
                (stringChildTest[stringChildTest.indexOf('x') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('x') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') + 1])))) ||
            stringChildTest.includes('xc') ||
            stringChildTest.includes('xiuchu') ||
            stringChildTest.includes('xiuch') ||
            stringChildTest.includes('xiuc') ||
            stringChildTest.includes('xch') ||
            stringChildTest.includes('xchu') ||
            (stringChildTest.includes('s') &&
                (stringChildTest[stringChildTest.indexOf('s') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('s') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') + 1])))) ||
            stringChildTest.includes('sc') ||
            stringChildTest.includes('siuchu') ||
            stringChildTest.includes('siuch') ||
            stringChildTest.includes('siuc') ||
            stringChildTest.includes('sch') ||
            stringChildTest.includes('schu') ||
            stringChildTest.includes('xdau') ||
            stringChildTest.includes('xcdau') ||
            stringChildTest.includes('xchdau') ||
            stringChildTest.includes('xchudau') ||
            stringChildTest.includes('xiuchudau') ||
            stringChildTest.includes('xiuchdau') ||
            stringChildTest.includes('xiucdau') ||
            stringChildTest.includes('xđau') ||
            stringChildTest.includes('xcđau') ||
            stringChildTest.includes('xiuchuđau') ||
            stringChildTest.includes('sdau') ||
            stringChildTest.includes('scdau') ||
            stringChildTest.includes('schdau') ||
            stringChildTest.includes('schudau') ||
            stringChildTest.includes('siuchudau') ||
            stringChildTest.includes('siuchdau') ||
            stringChildTest.includes('siucdau') ||
            stringChildTest.includes('sđau') ||
            stringChildTest.includes('scđau') ||
            stringChildTest.includes('siuchuđau') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xchduoi') ||
            stringChildTest.includes('xchuduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xiuchduoi') ||
            stringChildTest.includes('xiucduoi') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xchdui') ||
            stringChildTest.includes('xchudui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('xiuchdui') ||
            stringChildTest.includes('xiucdui') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('schduoi') ||
            stringChildTest.includes('schuduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('siuchduoi') ||
            stringChildTest.includes('siucduoi') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('schdui') ||
            stringChildTest.includes('schudui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('siuchdui') ||
            stringChildTest.includes('siucdui') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dx') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('xd') ||
            stringChildTest.includes('xdao') ||
            stringChildTest.includes('xcdao') ||
            stringChildTest.includes('xiuchudao') ||
            stringChildTest.includes('xchudao') ||
            stringChildTest.includes('xchdao') ||
            stringChildTest.includes('xiucdao') ||
            stringChildTest.includes('xiuchdao') ||
            stringChildTest.includes('xcd') ||
            stringChildTest.includes('xiuchud') ||
            stringChildTest.includes('xchud') ||
            stringChildTest.includes('xchd') ||
            stringChildTest.includes('xiucd') ||
            stringChildTest.includes('xiuchd') ||
            stringChildTest.includes('đaoxc') ||
            stringChildTest.includes('đaox') ||
            stringChildTest.includes('đxchu') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đxc') ||
            stringChildTest.includes('xđ') ||
            stringChildTest.includes('xđao') ||
            stringChildTest.includes('xcđ') ||
            stringChildTest.includes('xcđao') ||
            stringChildTest.includes('xiuchuđao') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daoxiuchu') ||
            stringChildTest.includes('daoxchu') ||
            stringChildTest.includes('daoxch') ||
            stringChildTest.includes('daoxiuc') ||
            stringChildTest.includes('daoxiuch') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('dxiuchu') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dxch') ||
            stringChildTest.includes('dxiuc') ||
            stringChildTest.includes('dxiuch') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('ds') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('sd') ||
            stringChildTest.includes('sdao') ||
            stringChildTest.includes('scdao') ||
            stringChildTest.includes('siuchudao') ||
            stringChildTest.includes('schudao') ||
            stringChildTest.includes('schdao') ||
            stringChildTest.includes('siucdao') ||
            stringChildTest.includes('siuchdao') ||
            stringChildTest.includes('scd') ||
            stringChildTest.includes('siuchud') ||
            stringChildTest.includes('schud') ||
            stringChildTest.includes('schd') ||
            stringChildTest.includes('siucd') ||
            stringChildTest.includes('siuchd') ||
            stringChildTest.includes('đaosc') ||
            stringChildTest.includes('đaos') ||
            stringChildTest.includes('đschu') ||
            stringChildTest.includes('đs') ||
            stringChildTest.includes('đsc') ||
            stringChildTest.includes('sđ') ||
            stringChildTest.includes('sđao') ||
            stringChildTest.includes('scđ') ||
            stringChildTest.includes('scđao') ||
            stringChildTest.includes('siuchuđao') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daosiuchu') ||
            stringChildTest.includes('daoschu') ||
            stringChildTest.includes('daosch') ||
            stringChildTest.includes('daosiuc') ||
            stringChildTest.includes('daosiuch') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('dsiuchu') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('dsch') ||
            stringChildTest.includes('dsiuc') ||
            stringChildTest.includes('dsiuch') ||
            stringChildTest.includes('duoi') ||
            stringChildTest.includes('đuôi') ||
            stringChildTest.includes('duôi') ||
            stringChildTest.includes('đuoi') ||
            stringChildTest.includes('dui') ||
            stringChildTest.includes('đui') ||
            (stringChildTest.includes('d') &&
                (stringChildTest[stringChildTest.indexOf('d') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('d') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') + 1])))) ||
            stringChildTest.includes('daoxcdau') ||
            stringChildTest.includes('daoxdau') ||
            stringChildTest.includes('dxchudau') ||
            stringChildTest.includes('dxdau') ||
            stringChildTest.includes('dxcdau') ||
            stringChildTest.includes('xddau') ||
            stringChildTest.includes('xdaodau') ||
            stringChildTest.includes('xcdaodau') ||
            stringChildTest.includes('xiuchudaodau') ||
            stringChildTest.includes('xchudaodau') ||
            stringChildTest.includes('xchdaodau') ||
            stringChildTest.includes('xiucdaodau') ||
            stringChildTest.includes('xiuchdaodau') ||
            stringChildTest.includes('xcddau') ||
            stringChildTest.includes('xiuchuddau') ||
            stringChildTest.includes('xchuddau') ||
            stringChildTest.includes('xchddau') ||
            stringChildTest.includes('xiucddau') ||
            stringChildTest.includes('xiuchddau') ||
            stringChildTest.includes('đaoxcdau') ||
            stringChildTest.includes('đaoxdau') ||
            stringChildTest.includes('đxchudau') ||
            stringChildTest.includes('đxdau') ||
            stringChildTest.includes('đxcdau') ||
            stringChildTest.includes('xđdau') ||
            stringChildTest.includes('xđaodau') ||
            stringChildTest.includes('xcđdau') ||
            stringChildTest.includes('xcđaodau') ||
            stringChildTest.includes('xiuchuđaodau') ||
            stringChildTest.includes('daoxdau') ||
            stringChildTest.includes('daoxcdau') ||
            stringChildTest.includes('daoxiuchudau') ||
            stringChildTest.includes('daoxchudau') ||
            stringChildTest.includes('daoxchdau') ||
            stringChildTest.includes('daoxiucdau') ||
            stringChildTest.includes('daoxiuchdau') ||
            stringChildTest.includes('dxcdau') ||
            stringChildTest.includes('dxiuchudau') ||
            stringChildTest.includes('dxchudau') ||
            stringChildTest.includes('dxchdau') ||
            stringChildTest.includes('dxiucdau') ||
            stringChildTest.includes('dxiuchdau') ||
            stringChildTest.includes('daoscdau') ||
            stringChildTest.includes('daosdau') ||
            stringChildTest.includes('dschudau') ||
            stringChildTest.includes('dsdau') ||
            stringChildTest.includes('dscdau') ||
            stringChildTest.includes('sddau') ||
            stringChildTest.includes('sdaodau') ||
            stringChildTest.includes('scdaodau') ||
            stringChildTest.includes('siuchudaodau') ||
            stringChildTest.includes('schudaodau') ||
            stringChildTest.includes('schdaodau') ||
            stringChildTest.includes('siucdaodau') ||
            stringChildTest.includes('siuchdaodau') ||
            stringChildTest.includes('scddau') ||
            stringChildTest.includes('siuchuddau') ||
            stringChildTest.includes('schuddau') ||
            stringChildTest.includes('schddau') ||
            stringChildTest.includes('siucddau') ||
            stringChildTest.includes('siuchddau') ||
            stringChildTest.includes('đaoscdau') ||
            stringChildTest.includes('đaosdau') ||
            stringChildTest.includes('đschudau') ||
            stringChildTest.includes('đsdau') ||
            stringChildTest.includes('đscdau') ||
            stringChildTest.includes('sđdau') ||
            stringChildTest.includes('sđaodau') ||
            stringChildTest.includes('scđdau') ||
            stringChildTest.includes('scđaodau') ||
            stringChildTest.includes('siuchuđaodau') ||
            stringChildTest.includes('daosdau') ||
            stringChildTest.includes('daoscdau') ||
            stringChildTest.includes('daosiuchudau') ||
            stringChildTest.includes('daoschudau') ||
            stringChildTest.includes('daoschdau') ||
            stringChildTest.includes('daosiucdau') ||
            stringChildTest.includes('daosiuchdau') ||
            stringChildTest.includes('dscdau') ||
            stringChildTest.includes('dsiuchudau') ||
            stringChildTest.includes('dschudau') ||
            stringChildTest.includes('dschdau') ||
            stringChildTest.includes('dsiucdau') ||
            stringChildTest.includes('dsiuchdau') ||
            stringChildTest.includes('xcdaudao') ||
            stringChildTest.includes('xiuchudaudao') ||
            stringChildTest.includes('xchudaudao') ||
            stringChildTest.includes('xcdaud') ||
            stringChildTest.includes('xiuchudaud') ||
            stringChildTest.includes('xchudaud') ||
            stringChildTest.includes('scdaudao') ||
            stringChildTest.includes('siuchudaudao') ||
            stringChildTest.includes('schudaudao') ||
            stringChildTest.includes('scdaud') ||
            stringChildTest.includes('siuchudaud') ||
            stringChildTest.includes('schudaud') ||
            stringChildTest.includes('daoxcduoi') ||
            stringChildTest.includes('daoxduoi') ||
            stringChildTest.includes('dxchuduoi') ||
            stringChildTest.includes('dxduoi') ||
            stringChildTest.includes('dxcduoi') ||
            stringChildTest.includes('xdduoi') ||
            stringChildTest.includes('xdaoduoi') ||
            stringChildTest.includes('xcdaoduoi') ||
            stringChildTest.includes('xiuchudaoduoi') ||
            stringChildTest.includes('xchudaoduoi') ||
            stringChildTest.includes('xchdaoduoi') ||
            stringChildTest.includes('xiucdaoduoi') ||
            stringChildTest.includes('xiuchdaoduoi') ||
            stringChildTest.includes('xcdduoi') ||
            stringChildTest.includes('xiuchudduoi') ||
            stringChildTest.includes('xchudduoi') ||
            stringChildTest.includes('xchdduoi') ||
            stringChildTest.includes('xiucdduoi') ||
            stringChildTest.includes('xiuchdduoi') ||
            stringChildTest.includes('đaoxcduoi') ||
            stringChildTest.includes('đaoxduoi') ||
            stringChildTest.includes('đxchuduoi') ||
            stringChildTest.includes('đxduoi') ||
            stringChildTest.includes('đxcduoi') ||
            stringChildTest.includes('xđduoi') ||
            stringChildTest.includes('xđaoduoi') ||
            stringChildTest.includes('xcđduoi') ||
            stringChildTest.includes('xcđaoduoi') ||
            stringChildTest.includes('xiuchuđaoduoi') ||
            stringChildTest.includes('daoxduoi') ||
            stringChildTest.includes('daoxcduoi') ||
            stringChildTest.includes('daoxiuchuduoi') ||
            stringChildTest.includes('daoxchuduoi') ||
            stringChildTest.includes('daoxchduoi') ||
            stringChildTest.includes('daoxiucduoi') ||
            stringChildTest.includes('daoxiuchduoi') ||
            stringChildTest.includes('dxcduoi') ||
            stringChildTest.includes('dxiuchuduoi') ||
            stringChildTest.includes('dxchuduoi') ||
            stringChildTest.includes('dxchduoi') ||
            stringChildTest.includes('dxiucduoi') ||
            stringChildTest.includes('dxiuchduoi') ||
            stringChildTest.includes('daoscduoi') ||
            stringChildTest.includes('daosduoi') ||
            stringChildTest.includes('dschuduoi') ||
            stringChildTest.includes('dsduoi') ||
            stringChildTest.includes('dscduoi') ||
            stringChildTest.includes('sdduoi') ||
            stringChildTest.includes('sdaoduoi') ||
            stringChildTest.includes('scdaoduoi') ||
            stringChildTest.includes('siuchudaoduoi') ||
            stringChildTest.includes('schudaoduoi') ||
            stringChildTest.includes('schdaoduoi') ||
            stringChildTest.includes('siucdaoduoi') ||
            stringChildTest.includes('siuchdaoduoi') ||
            stringChildTest.includes('scdduoi') ||
            stringChildTest.includes('siuchudduoi') ||
            stringChildTest.includes('schudduoi') ||
            stringChildTest.includes('schdduoi') ||
            stringChildTest.includes('siucdduoi') ||
            stringChildTest.includes('siuchdduoi') ||
            stringChildTest.includes('đaoscduoi') ||
            stringChildTest.includes('đaosduoi') ||
            stringChildTest.includes('đschuduoi') ||
            stringChildTest.includes('đsduoi') ||
            stringChildTest.includes('đscduoi') ||
            stringChildTest.includes('sđduoi') ||
            stringChildTest.includes('sđaoduoi') ||
            stringChildTest.includes('scđduoi') ||
            stringChildTest.includes('scđaoduoi') ||
            stringChildTest.includes('siuchuđaoduoi') ||
            stringChildTest.includes('daosduoi') ||
            stringChildTest.includes('daoscduoi') ||
            stringChildTest.includes('daosiuchuduoi') ||
            stringChildTest.includes('daoschuduoi') ||
            stringChildTest.includes('daoschduoi') ||
            stringChildTest.includes('daosiucduoi') ||
            stringChildTest.includes('daosiuchduoi') ||
            stringChildTest.includes('dscduoi') ||
            stringChildTest.includes('dsiuchuduoi') ||
            stringChildTest.includes('dschuduoi') ||
            stringChildTest.includes('dschduoi') ||
            stringChildTest.includes('dsiucduoi') ||
            stringChildTest.includes('dsiuchduoi') ||
            stringChildTest.includes('xcduoidao') ||
            stringChildTest.includes('xiuchuduoidao') ||
            stringChildTest.includes('xchuduoidao') ||
            stringChildTest.includes('xcduoid') ||
            stringChildTest.includes('xiuchuduoid') ||
            stringChildTest.includes('xchuduoid') ||
            stringChildTest.includes('scduoidao') ||
            stringChildTest.includes('siuchuduoidao') ||
            stringChildTest.includes('schuduoidao') ||
            stringChildTest.includes('scduoid') ||
            stringChildTest.includes('siuchuduoid') ||
            stringChildTest.includes('schuduoid') ||
            stringChildTest.includes('baylo') ||
            stringChildTest.includes('baobay') ||
            stringChildTest.includes('baobaylo') ||
            stringChildTest.includes('baylod') ||
            stringChildTest.includes('baobayd') ||
            stringChildTest.includes('baobaylod') ||
            stringChildTest.includes('baylodao') ||
            stringChildTest.includes('baobaydao') ||
            stringChildTest.includes('baobaylodao') ||
            stringChildTest.includes('dbaylo') ||
            stringChildTest.includes('dbaobay') ||
            stringChildTest.includes('dbaobaylo') ||
            stringChildTest.includes('daobaylo') ||
            stringChildTest.includes('daobaobay') ||
            stringChildTest.includes('daobaobaylo') ||
            stringChildTest.includes('tamlo') ||
            stringChildTest.includes('baotam') ||
            stringChildTest.includes('baotamlo') ||
            stringChildTest.includes('tamlod') ||
            stringChildTest.includes('baotamd') ||
            stringChildTest.includes('baotamlod') ||
            stringChildTest.includes('tamlodao') ||
            stringChildTest.includes('baotamdao') ||
            stringChildTest.includes('baotamlodao') ||
            stringChildTest.includes('dtamlo') ||
            stringChildTest.includes('dbaotam') ||
            stringChildTest.includes('dbaotamlo') ||
            stringChildTest.includes('daotamlo') ||
            stringChildTest.includes('daobaotam') ||
            stringChildTest.includes('daobaotamlo')
        ) {
            if (content[firstTwoPositions[1] + 2] === '.') {
                // la dai Bac Lieu
                changeDaiBacLieu = true;
            } else {
                while (
                    content[firstTwoPositions[1]] === 'b' &&
                    content[firstTwoPositions[1] + 1] === 'l' &&
                    content[firstTwoPositions[1] + 2] !== '.' &&
                    firstTwoPositions.length > 1
                ) {
                    firstTwoPositions.splice(1, 1);

                    if (
                        content[firstTwoPositions[1]] === 'b' &&
                        content[firstTwoPositions[1] + 1] === 'l' &&
                        content[firstTwoPositions[1] + 2] === '.'
                    ) {
                        // la dai Bac Lieu
                        changeDaiBacLieu = true;
                    }
                }
            }
        } else {
            firstTwoPositions.splice(1, 1);
            if (
                content[firstTwoPositions[1]] === 'b' &&
                content[firstTwoPositions[1] + 1] === 'l' &&
                content[firstTwoPositions[1] + 2] === '.'
            ) {
                // la dai Bac Lieu
                changeDaiBacLieu = true;
            }
            while (
                content[firstTwoPositions[1]] === 'b' &&
                content[firstTwoPositions[1] + 1] === 'l' &&
                content[firstTwoPositions[1] + 2] !== '.' &&
                firstTwoPositions.length > 1
            ) {
                firstTwoPositions.splice(1, 1);

                if (
                    content[firstTwoPositions[1]] === 'b' &&
                    content[firstTwoPositions[1] + 1] === 'l' &&
                    content[firstTwoPositions[1] + 2] === '.'
                ) {
                    // la dai Bac Lieu
                    changeDaiBacLieu = true;
                }
            }
        }
    } else if (
        content[firstTwoPositions[1]] === 'b' &&
        (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
        (content[firstTwoPositions[1] + 2] === '.' || isFinite(Number(content[firstTwoPositions[1] + 2])))
    ) {
        let stringChildTest = content.slice(firstTwoPositions[0], firstTwoPositions[1]);

        stringChildTest = stringChildTest.replace(/[.]/g, '');

        if (
            stringChildTest.includes('dx') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đax') ||
            stringChildTest.includes('da') ||
            stringChildTest.includes('đa') ||
            stringChildTest.includes('dat') ||
            stringChildTest.includes('dathang') ||
            stringChildTest.includes('dath') ||
            stringChildTest.includes('dth') ||
            stringChildTest.includes('dthang') ||
            stringChildTest.includes('daxien') ||
            stringChildTest.includes('dxien') ||
            stringChildTest.includes('đat') ||
            stringChildTest.includes('dax') ||
            (stringChildTest.includes('l') &&
                (stringChildTest[stringChildTest.indexOf('l') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('l') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') + 1])))) ||
            stringChildTest.includes('lo') ||
            (stringChildTest.includes('b') &&
                (stringChildTest[stringChildTest.indexOf('b') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('b') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') + 1])))) ||
            stringChildTest.includes('bl') ||
            stringChildTest.includes('blo') ||
            stringChildTest.includes('blô') ||
            stringChildTest.includes('baolo') ||
            stringChildTest.includes('bao') ||
            stringChildTest.includes('baol') ||
            stringChildTest.includes('baolô') ||
            stringChildTest.includes('dl') ||
            stringChildTest.includes('dlo') ||
            stringChildTest.includes('ld') ||
            stringChildTest.includes('lod') ||
            stringChildTest.includes('db') ||
            stringChildTest.includes('đb') ||
            stringChildTest.includes('dbl') ||
            stringChildTest.includes('đbl') ||
            stringChildTest.includes('dblo') ||
            stringChildTest.includes('đblô') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('daobaolô') ||
            stringChildTest.includes('blodao') ||
            stringChildTest.includes('daoblo') ||
            stringChildTest.includes('baolodao') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('bldao') ||
            stringChildTest.includes('daobl') ||
            stringChildTest.includes('bdao') ||
            stringChildTest.includes('daob') ||
            stringChildTest.includes('baoldao') ||
            stringChildTest.includes('daobaol') ||
            stringChildTest.includes('baodao') ||
            stringChildTest.includes('daobao') ||
            stringChildTest.includes('daolo') ||
            stringChildTest.includes('lodao') ||
            stringChildTest.includes('bđao') ||
            stringChildTest.includes('bld') ||
            stringChildTest.includes('dd') ||
            stringChildTest.includes('đđ') ||
            stringChildTest.includes('dauduoi') ||
            stringChildTest.includes('daudui') ||
            stringChildTest.includes('daud') ||
            stringChildTest.includes('ddui') ||
            stringChildTest.includes('dduoi') ||
            stringChildTest.includes('đd') ||
            stringChildTest.includes('dđ') ||
            stringChildTest.includes('đâuđuôi') ||
            stringChildTest.includes('đầuđuôi') ||
            stringChildTest.includes('đauđuôi') ||
            (stringChildTest.includes('x') &&
                (stringChildTest[stringChildTest.indexOf('x') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('x') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') + 1])))) ||
            stringChildTest.includes('xc') ||
            stringChildTest.includes('xiuchu') ||
            stringChildTest.includes('xiuch') ||
            stringChildTest.includes('xiuc') ||
            stringChildTest.includes('xch') ||
            stringChildTest.includes('xchu') ||
            (stringChildTest.includes('s') &&
                (stringChildTest[stringChildTest.indexOf('s') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('s') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') + 1])))) ||
            stringChildTest.includes('sc') ||
            stringChildTest.includes('siuchu') ||
            stringChildTest.includes('siuch') ||
            stringChildTest.includes('siuc') ||
            stringChildTest.includes('sch') ||
            stringChildTest.includes('schu') ||
            stringChildTest.includes('xdau') ||
            stringChildTest.includes('xcdau') ||
            stringChildTest.includes('xchdau') ||
            stringChildTest.includes('xchudau') ||
            stringChildTest.includes('xiuchudau') ||
            stringChildTest.includes('xiuchdau') ||
            stringChildTest.includes('xiucdau') ||
            stringChildTest.includes('xđau') ||
            stringChildTest.includes('xcđau') ||
            stringChildTest.includes('xiuchuđau') ||
            stringChildTest.includes('sdau') ||
            stringChildTest.includes('scdau') ||
            stringChildTest.includes('schdau') ||
            stringChildTest.includes('schudau') ||
            stringChildTest.includes('siuchudau') ||
            stringChildTest.includes('siuchdau') ||
            stringChildTest.includes('siucdau') ||
            stringChildTest.includes('sđau') ||
            stringChildTest.includes('scđau') ||
            stringChildTest.includes('siuchuđau') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xchduoi') ||
            stringChildTest.includes('xchuduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xiuchduoi') ||
            stringChildTest.includes('xiucduoi') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xchdui') ||
            stringChildTest.includes('xchudui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('xiuchdui') ||
            stringChildTest.includes('xiucdui') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('schduoi') ||
            stringChildTest.includes('schuduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('siuchduoi') ||
            stringChildTest.includes('siucduoi') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('schdui') ||
            stringChildTest.includes('schudui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('siuchdui') ||
            stringChildTest.includes('siucdui') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dx') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('xd') ||
            stringChildTest.includes('xdao') ||
            stringChildTest.includes('xcdao') ||
            stringChildTest.includes('xiuchudao') ||
            stringChildTest.includes('xchudao') ||
            stringChildTest.includes('xchdao') ||
            stringChildTest.includes('xiucdao') ||
            stringChildTest.includes('xiuchdao') ||
            stringChildTest.includes('xcd') ||
            stringChildTest.includes('xiuchud') ||
            stringChildTest.includes('xchud') ||
            stringChildTest.includes('xchd') ||
            stringChildTest.includes('xiucd') ||
            stringChildTest.includes('xiuchd') ||
            stringChildTest.includes('đaoxc') ||
            stringChildTest.includes('đaox') ||
            stringChildTest.includes('đxchu') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đxc') ||
            stringChildTest.includes('xđ') ||
            stringChildTest.includes('xđao') ||
            stringChildTest.includes('xcđ') ||
            stringChildTest.includes('xcđao') ||
            stringChildTest.includes('xiuchuđao') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daoxiuchu') ||
            stringChildTest.includes('daoxchu') ||
            stringChildTest.includes('daoxch') ||
            stringChildTest.includes('daoxiuc') ||
            stringChildTest.includes('daoxiuch') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('dxiuchu') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dxch') ||
            stringChildTest.includes('dxiuc') ||
            stringChildTest.includes('dxiuch') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('ds') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('sd') ||
            stringChildTest.includes('sdao') ||
            stringChildTest.includes('scdao') ||
            stringChildTest.includes('siuchudao') ||
            stringChildTest.includes('schudao') ||
            stringChildTest.includes('schdao') ||
            stringChildTest.includes('siucdao') ||
            stringChildTest.includes('siuchdao') ||
            stringChildTest.includes('scd') ||
            stringChildTest.includes('siuchud') ||
            stringChildTest.includes('schud') ||
            stringChildTest.includes('schd') ||
            stringChildTest.includes('siucd') ||
            stringChildTest.includes('siuchd') ||
            stringChildTest.includes('đaosc') ||
            stringChildTest.includes('đaos') ||
            stringChildTest.includes('đschu') ||
            stringChildTest.includes('đs') ||
            stringChildTest.includes('đsc') ||
            stringChildTest.includes('sđ') ||
            stringChildTest.includes('sđao') ||
            stringChildTest.includes('scđ') ||
            stringChildTest.includes('scđao') ||
            stringChildTest.includes('siuchuđao') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daosiuchu') ||
            stringChildTest.includes('daoschu') ||
            stringChildTest.includes('daosch') ||
            stringChildTest.includes('daosiuc') ||
            stringChildTest.includes('daosiuch') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('dsiuchu') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('dsch') ||
            stringChildTest.includes('dsiuc') ||
            stringChildTest.includes('dsiuch') ||
            stringChildTest.includes('duoi') ||
            stringChildTest.includes('đuôi') ||
            stringChildTest.includes('duôi') ||
            stringChildTest.includes('đuoi') ||
            stringChildTest.includes('dui') ||
            stringChildTest.includes('đui') ||
            (stringChildTest.includes('d') &&
                (stringChildTest[stringChildTest.indexOf('d') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('d') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') + 1])))) ||
            stringChildTest.includes('daoxcdau') ||
            stringChildTest.includes('daoxdau') ||
            stringChildTest.includes('dxchudau') ||
            stringChildTest.includes('dxdau') ||
            stringChildTest.includes('dxcdau') ||
            stringChildTest.includes('xddau') ||
            stringChildTest.includes('xdaodau') ||
            stringChildTest.includes('xcdaodau') ||
            stringChildTest.includes('xiuchudaodau') ||
            stringChildTest.includes('xchudaodau') ||
            stringChildTest.includes('xchdaodau') ||
            stringChildTest.includes('xiucdaodau') ||
            stringChildTest.includes('xiuchdaodau') ||
            stringChildTest.includes('xcddau') ||
            stringChildTest.includes('xiuchuddau') ||
            stringChildTest.includes('xchuddau') ||
            stringChildTest.includes('xchddau') ||
            stringChildTest.includes('xiucddau') ||
            stringChildTest.includes('xiuchddau') ||
            stringChildTest.includes('đaoxcdau') ||
            stringChildTest.includes('đaoxdau') ||
            stringChildTest.includes('đxchudau') ||
            stringChildTest.includes('đxdau') ||
            stringChildTest.includes('đxcdau') ||
            stringChildTest.includes('xđdau') ||
            stringChildTest.includes('xđaodau') ||
            stringChildTest.includes('xcđdau') ||
            stringChildTest.includes('xcđaodau') ||
            stringChildTest.includes('xiuchuđaodau') ||
            stringChildTest.includes('daoxdau') ||
            stringChildTest.includes('daoxcdau') ||
            stringChildTest.includes('daoxiuchudau') ||
            stringChildTest.includes('daoxchudau') ||
            stringChildTest.includes('daoxchdau') ||
            stringChildTest.includes('daoxiucdau') ||
            stringChildTest.includes('daoxiuchdau') ||
            stringChildTest.includes('dxcdau') ||
            stringChildTest.includes('dxiuchudau') ||
            stringChildTest.includes('dxchudau') ||
            stringChildTest.includes('dxchdau') ||
            stringChildTest.includes('dxiucdau') ||
            stringChildTest.includes('dxiuchdau') ||
            stringChildTest.includes('daoscdau') ||
            stringChildTest.includes('daosdau') ||
            stringChildTest.includes('dschudau') ||
            stringChildTest.includes('dsdau') ||
            stringChildTest.includes('dscdau') ||
            stringChildTest.includes('sddau') ||
            stringChildTest.includes('sdaodau') ||
            stringChildTest.includes('scdaodau') ||
            stringChildTest.includes('siuchudaodau') ||
            stringChildTest.includes('schudaodau') ||
            stringChildTest.includes('schdaodau') ||
            stringChildTest.includes('siucdaodau') ||
            stringChildTest.includes('siuchdaodau') ||
            stringChildTest.includes('scddau') ||
            stringChildTest.includes('siuchuddau') ||
            stringChildTest.includes('schuddau') ||
            stringChildTest.includes('schddau') ||
            stringChildTest.includes('siucddau') ||
            stringChildTest.includes('siuchddau') ||
            stringChildTest.includes('đaoscdau') ||
            stringChildTest.includes('đaosdau') ||
            stringChildTest.includes('đschudau') ||
            stringChildTest.includes('đsdau') ||
            stringChildTest.includes('đscdau') ||
            stringChildTest.includes('sđdau') ||
            stringChildTest.includes('sđaodau') ||
            stringChildTest.includes('scđdau') ||
            stringChildTest.includes('scđaodau') ||
            stringChildTest.includes('siuchuđaodau') ||
            stringChildTest.includes('daosdau') ||
            stringChildTest.includes('daoscdau') ||
            stringChildTest.includes('daosiuchudau') ||
            stringChildTest.includes('daoschudau') ||
            stringChildTest.includes('daoschdau') ||
            stringChildTest.includes('daosiucdau') ||
            stringChildTest.includes('daosiuchdau') ||
            stringChildTest.includes('dscdau') ||
            stringChildTest.includes('dsiuchudau') ||
            stringChildTest.includes('dschudau') ||
            stringChildTest.includes('dschdau') ||
            stringChildTest.includes('dsiucdau') ||
            stringChildTest.includes('dsiuchdau') ||
            stringChildTest.includes('xcdaudao') ||
            stringChildTest.includes('xiuchudaudao') ||
            stringChildTest.includes('xchudaudao') ||
            stringChildTest.includes('xcdaud') ||
            stringChildTest.includes('xiuchudaud') ||
            stringChildTest.includes('xchudaud') ||
            stringChildTest.includes('scdaudao') ||
            stringChildTest.includes('siuchudaudao') ||
            stringChildTest.includes('schudaudao') ||
            stringChildTest.includes('scdaud') ||
            stringChildTest.includes('siuchudaud') ||
            stringChildTest.includes('schudaud') ||
            stringChildTest.includes('daoxcduoi') ||
            stringChildTest.includes('daoxduoi') ||
            stringChildTest.includes('dxchuduoi') ||
            stringChildTest.includes('dxduoi') ||
            stringChildTest.includes('dxcduoi') ||
            stringChildTest.includes('xdduoi') ||
            stringChildTest.includes('xdaoduoi') ||
            stringChildTest.includes('xcdaoduoi') ||
            stringChildTest.includes('xiuchudaoduoi') ||
            stringChildTest.includes('xchudaoduoi') ||
            stringChildTest.includes('xchdaoduoi') ||
            stringChildTest.includes('xiucdaoduoi') ||
            stringChildTest.includes('xiuchdaoduoi') ||
            stringChildTest.includes('xcdduoi') ||
            stringChildTest.includes('xiuchudduoi') ||
            stringChildTest.includes('xchudduoi') ||
            stringChildTest.includes('xchdduoi') ||
            stringChildTest.includes('xiucdduoi') ||
            stringChildTest.includes('xiuchdduoi') ||
            stringChildTest.includes('đaoxcduoi') ||
            stringChildTest.includes('đaoxduoi') ||
            stringChildTest.includes('đxchuduoi') ||
            stringChildTest.includes('đxduoi') ||
            stringChildTest.includes('đxcduoi') ||
            stringChildTest.includes('xđduoi') ||
            stringChildTest.includes('xđaoduoi') ||
            stringChildTest.includes('xcđduoi') ||
            stringChildTest.includes('xcđaoduoi') ||
            stringChildTest.includes('xiuchuđaoduoi') ||
            stringChildTest.includes('daoxduoi') ||
            stringChildTest.includes('daoxcduoi') ||
            stringChildTest.includes('daoxiuchuduoi') ||
            stringChildTest.includes('daoxchuduoi') ||
            stringChildTest.includes('daoxchduoi') ||
            stringChildTest.includes('daoxiucduoi') ||
            stringChildTest.includes('daoxiuchduoi') ||
            stringChildTest.includes('dxcduoi') ||
            stringChildTest.includes('dxiuchuduoi') ||
            stringChildTest.includes('dxchuduoi') ||
            stringChildTest.includes('dxchduoi') ||
            stringChildTest.includes('dxiucduoi') ||
            stringChildTest.includes('dxiuchduoi') ||
            stringChildTest.includes('daoscduoi') ||
            stringChildTest.includes('daosduoi') ||
            stringChildTest.includes('dschuduoi') ||
            stringChildTest.includes('dsduoi') ||
            stringChildTest.includes('dscduoi') ||
            stringChildTest.includes('sdduoi') ||
            stringChildTest.includes('sdaoduoi') ||
            stringChildTest.includes('scdaoduoi') ||
            stringChildTest.includes('siuchudaoduoi') ||
            stringChildTest.includes('schudaoduoi') ||
            stringChildTest.includes('schdaoduoi') ||
            stringChildTest.includes('siucdaoduoi') ||
            stringChildTest.includes('siuchdaoduoi') ||
            stringChildTest.includes('scdduoi') ||
            stringChildTest.includes('siuchudduoi') ||
            stringChildTest.includes('schudduoi') ||
            stringChildTest.includes('schdduoi') ||
            stringChildTest.includes('siucdduoi') ||
            stringChildTest.includes('siuchdduoi') ||
            stringChildTest.includes('đaoscduoi') ||
            stringChildTest.includes('đaosduoi') ||
            stringChildTest.includes('đschuduoi') ||
            stringChildTest.includes('đsduoi') ||
            stringChildTest.includes('đscduoi') ||
            stringChildTest.includes('sđduoi') ||
            stringChildTest.includes('sđaoduoi') ||
            stringChildTest.includes('scđduoi') ||
            stringChildTest.includes('scđaoduoi') ||
            stringChildTest.includes('siuchuđaoduoi') ||
            stringChildTest.includes('daosduoi') ||
            stringChildTest.includes('daoscduoi') ||
            stringChildTest.includes('daosiuchuduoi') ||
            stringChildTest.includes('daoschuduoi') ||
            stringChildTest.includes('daoschduoi') ||
            stringChildTest.includes('daosiucduoi') ||
            stringChildTest.includes('daosiuchduoi') ||
            stringChildTest.includes('dscduoi') ||
            stringChildTest.includes('dsiuchuduoi') ||
            stringChildTest.includes('dschuduoi') ||
            stringChildTest.includes('dschduoi') ||
            stringChildTest.includes('dsiucduoi') ||
            stringChildTest.includes('dsiuchduoi') ||
            stringChildTest.includes('xcduoidao') ||
            stringChildTest.includes('xiuchuduoidao') ||
            stringChildTest.includes('xchuduoidao') ||
            stringChildTest.includes('xcduoid') ||
            stringChildTest.includes('xiuchuduoid') ||
            stringChildTest.includes('xchuduoid') ||
            stringChildTest.includes('scduoidao') ||
            stringChildTest.includes('siuchuduoidao') ||
            stringChildTest.includes('schuduoidao') ||
            stringChildTest.includes('scduoid') ||
            stringChildTest.includes('siuchuduoid') ||
            stringChildTest.includes('schuduoid') ||
            stringChildTest.includes('baylo') ||
            stringChildTest.includes('baobay') ||
            stringChildTest.includes('baobaylo') ||
            stringChildTest.includes('baylod') ||
            stringChildTest.includes('baobayd') ||
            stringChildTest.includes('baobaylod') ||
            stringChildTest.includes('baylodao') ||
            stringChildTest.includes('baobaydao') ||
            stringChildTest.includes('baobaylodao') ||
            stringChildTest.includes('dbaylo') ||
            stringChildTest.includes('dbaobay') ||
            stringChildTest.includes('dbaobaylo') ||
            stringChildTest.includes('daobaylo') ||
            stringChildTest.includes('daobaobay') ||
            stringChildTest.includes('daobaobaylo') ||
            stringChildTest.includes('tamlo') ||
            stringChildTest.includes('baotam') ||
            stringChildTest.includes('baotamlo') ||
            stringChildTest.includes('tamlod') ||
            stringChildTest.includes('baotamd') ||
            stringChildTest.includes('baotamlod') ||
            stringChildTest.includes('tamlodao') ||
            stringChildTest.includes('baotamdao') ||
            stringChildTest.includes('baotamlodao') ||
            stringChildTest.includes('dtamlo') ||
            stringChildTest.includes('dbaotam') ||
            stringChildTest.includes('dbaotamlo') ||
            stringChildTest.includes('daotamlo') ||
            stringChildTest.includes('daobaotam') ||
            stringChildTest.includes('daobaotamlo')
        ) {
            if (content[firstTwoPositions[1] + 2] === '.') {
            } else {
                while (
                    content[firstTwoPositions[1]] === 'b' &&
                    (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                    content[firstTwoPositions[1] + 2] !== '.' &&
                    firstTwoPositions.length > 1
                ) {
                    // la bao dao
                    changeBaoDao.push(firstTwoPositions[1]);

                    firstTwoPositions.splice(1, 1);

                    if (
                        content[firstTwoPositions[1]] === 'b' &&
                        (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                        content[firstTwoPositions[1] + 2] === '.'
                    ) {
                    }
                }
            }
        } else {
            // la bao dao
            changeBaoDao.push(firstTwoPositions[1]);

            firstTwoPositions.splice(1, 1);
            if (
                content[firstTwoPositions[1]] === 'b' &&
                (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                content[firstTwoPositions[1] + 2] === '.'
            ) {
            }

            while (
                content[firstTwoPositions[1]] === 'b' &&
                (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                content[firstTwoPositions[1] + 2] !== '.' &&
                firstTwoPositions.length > 1
            ) {
                // la bao dao
                changeBaoDao.push(firstTwoPositions[1]);

                firstTwoPositions.splice(1, 1);

                if (
                    content[firstTwoPositions[1]] === 'b' &&
                    (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                    content[firstTwoPositions[1] + 2] === '.'
                ) {
                }
            }
        }
    }

    firstTwoPositions = allPositions.slice(0, 2);

    // Nếu không có đủ hai vị trí, thêm -1 vào kết quả
    while (firstTwoPositions.length < 2) {
        firstTwoPositions.push(-1);
    }

    return { firstTwoPositions, changeDaiBacLieu, changeBaoDao };
}

export default findPosFirstAndTwo;
