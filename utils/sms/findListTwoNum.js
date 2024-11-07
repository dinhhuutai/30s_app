function findListTwoNum(mangSo) {
    let result = [];

    for (let i = 0; i < mangSo.length; i++) {
        for (let j = i + 1; j < mangSo.length; j++) {
            result.push([mangSo[i], mangSo[j]]);
        }
    }

    if (mangSo.length < 2) {
        result = [[mangSo]];
    }

    return result;
}

export default findListTwoNum;
