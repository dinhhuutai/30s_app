function errorDai(dai, mien, dayOfWeek) {
    let daiTmpError = [...dai];

    let errorSyntaxDai = false;
    let errorSyntaxDetail = {};

    if (
        !(mien === 'mn' && dayOfWeek === 2 && daiTmpError.every((item) => ['tp', 'dt', 'cm'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 3 && daiTmpError.every((item) => ['br', 'vt', 'bi'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 4 && daiTmpError.every((item) => ['dn', 'ct', 'st'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 5 && daiTmpError.every((item) => ['tn', 'ag', 'bt'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 6 && daiTmpError.every((item) => ['vl', 'bu', 'tv'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 7 && daiTmpError.every((item) => ['tp', 'la', 'bp', 'hg'].includes(item))) &&
        !(mien === 'mn' && dayOfWeek === 1 && daiTmpError.every((item) => ['tg', 'kg', 'lt'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 2 && daiTmpError.every((item) => ['py', 'hu'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 3 && daiTmpError.every((item) => ['dl', 'qn'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 4 && daiTmpError.every((item) => ['dg', 'kh'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 5 && daiTmpError.every((item) => ['qb', 'bd', 'qt'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 6 && daiTmpError.every((item) => ['gl', 'nt'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 7 && daiTmpError.every((item) => ['dg', 'qg', 'do'].includes(item))) &&
        !(mien === 'mt' && dayOfWeek === 1 && daiTmpError.every((item) => ['kh', 'kt', 'hu'].includes(item))) &&
        mien !== 'mb'
    ) {
        errorSyntaxDai = true;
        errorSyntaxDetail = {
            code: 'dai',
            dais: daiTmpError,
        };

        console.log('Loi hom nay khong co dai nay');
    }

    return { data5: errorSyntaxDai, data52: errorSyntaxDetail };
}

export default errorDai;
