function handleDai(dai, mien, dayOfWeek) {
    let daiTmp = [];

    if (dai === '2d' || dai === '2đ') {
        if (mien === 'mn') {
            if (dayOfWeek === 2) {
                daiTmp = ['tp', 'dt'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['br', 'vt'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['dn', 'ct'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['tn', 'ag'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['vl', 'bu'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['tp', 'la'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['tg', 'kg'];
            }
        } else if (mien === 'mt') {
            if (dayOfWeek === 2) {
                daiTmp = ['py', 'hu'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['dl', 'qn'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['dg', 'kh'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['qb', 'bd'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['gl', 'nt'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['dg', 'qg'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['kh', 'kt'];
            }
        }
    } else if (dai === '3d' || dai === '3đ') {
        if (mien === 'mn') {
            if (dayOfWeek === 2) {
                daiTmp = ['tp', 'dt', 'cm'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['br', 'vt', 'bi'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['dn', 'ct', 'st'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['tn', 'ag', 'bt'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['vl', 'bu', 'tv'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['tp', 'la', 'bp'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['tg', 'kg', 'lt'];
            }
        } else if (mien === 'mt') {
            if (dayOfWeek === 5) {
                daiTmp = ['qb', 'bd', 'qt'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['dg', 'qg', 'do'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['kh', 'kt', 'hu'];
            }
        }
    } else if (dai === '4d' || dai === '4đ') {
        if (dayOfWeek === 7) {
            daiTmp = ['tp', 'la', 'bp', 'hg'];
        }
    } else if (
        dai === 'dc' ||
        dai === 'dch' ||
        dai === 'đc' ||
        dai === 'đch' ||
        dai === 'dchanh' ||
        dai === 'ch' ||
        dai === 'chanh' ||
        dai === 'đchanh'
    ) {
        if (mien === 'mn') {
            if (dayOfWeek === 2) {
                daiTmp = ['tp'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['br'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['dn'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['tn'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['vl'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['tp'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['tg'];
            }
        } else if (mien === 'mt') {
            if (dayOfWeek === 2) {
                daiTmp = ['py'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['dl'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['dg'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['qb'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['gl'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['dg'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['kh'];
            }
        }
    } else if (dai === 'dp' || dai === 'dph' || dai === 'đp' || dai === 'đph' || dai === 'dphu' || dai === 'đphu') {
        if (mien === 'mn') {
            if (dayOfWeek === 2) {
                daiTmp = ['dt'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['vt'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['ct'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['ag'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['bu'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['la'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['kg'];
            }
        } else if (mien === 'mt') {
            if (dayOfWeek === 2) {
                daiTmp = ['hu'];
            } else if (dayOfWeek === 3) {
                daiTmp = ['qn'];
            } else if (dayOfWeek === 4) {
                daiTmp = ['kh'];
            } else if (dayOfWeek === 5) {
                daiTmp = ['bd'];
            } else if (dayOfWeek === 6) {
                daiTmp = ['nt'];
            } else if (dayOfWeek === 7) {
                daiTmp = ['qg'];
            } else if (dayOfWeek === 1) {
                daiTmp = ['kt'];
            }
        }
    } else if (dai.length > 2) {
        let tachDai = '';

        for (let i = 0; i < dai.length; i++) {
            tachDai += dai[i];

            if (tachDai.length === 2) {
                daiTmp = [...daiTmp, tachDai];

                tachDai = '';
            }
        }
    } else {
        daiTmp = [dai];
    }

    return daiTmp;
}

export default handleDai;
