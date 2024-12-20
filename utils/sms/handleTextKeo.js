function handleTextKeo(content) {
    let contentTmp = content;

    let errorSyntax = false;
    let errorSyntaxDetail = {};
    /// Kiểm tra chữ keo

    let index = contentTmp.indexOf('keo');

    while (
        index !== -1 &&
        (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
        isFinite(
            Number(contentTmp[index - 2]) &&
                (contentTmp[index + 3] === '.' || isFinite(Number(contentTmp[index + 3]))) &&
                isFinite(Number(contentTmp[index + 4])),
        )
    ) {
        let length = contentTmp.length;

        let mangSoKeo = [];
        let soSau = '';
        let soTruoc = '';

        //Lấy số sau k
        for (let i = index + 3; i < length; i++) {
            if (isFinite(Number(contentTmp[i]))) {
                soSau = soSau + contentTmp[i];
            }

            if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        //Lấy số trước k
        for (let i = index - 1; i >= 0; i--) {
            if (isFinite(Number(contentTmp[i]))) {
                soTruoc = contentTmp[i] + soTruoc;
            }

            if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        let lengthSo = soTruoc.length;
        let first = false;
        let NumOtherBefore = 0;

        if (
            soTruoc.length === 2 &&
            soSau.length === 2 &&
            soTruoc[0] !== soSau[0] &&
            soTruoc[1] !== soSau[1] &&
            (soTruoc[0] !== soTruoc[1] ||
                soSau[0] !== soSau[1] ||
                ((soTruoc[0] === soTruoc[1] || soSau[0] === soSau[1]) && Number(soSau[0]) - Number(soTruoc[0]) < 5))
        ) {
            let soSauKhac = Number(soSau);
            let soTruocKhac = Number(soTruoc);

            for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
                mangSoKeo.push(i);
            }
        } else if (
            // eslint-disable-next-line no-self-compare
            soTruoc.length !== soTruoc.length ||
            (soTruoc.length === 3 &&
                soTruoc[0] !== soSau[0] &&
                soTruoc[1] !== soSau[1] &&
                soTruoc[2] !== soSau[2] &&
                (soTruoc[1] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[1] ||
                    soSau[1] !== soSau[2] ||
                    soSau[0] !== soSau[2] ||
                    soSau[0] !== soSau[1]))
        ) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        } else {
            for (let i = 0; i < lengthSo; i++) {
                if (soTruoc[i] !== soSau[i]) {
                    let soSauKhac = Number(soSau[i]);
                    let soTruocKhac = Number(soTruoc[i]);

                    if (!first) {
                        for (let j = soTruocKhac + 1; j < soSauKhac; j++) {
                            mangSoKeo.push(soTruoc.slice(0, i) + j + soTruoc.slice(i + 1));
                        }

                        first = true;
                    } else {
                        // eslint-disable-next-line no-loop-func
                        mangSoKeo = mangSoKeo.map((e) => {
                            let eTmp = e.substring(0, i) + e[NumOtherBefore] + e.substring(i + 1);

                            return eTmp;
                        });
                    }

                    NumOtherBefore = i;
                }
            }
        }

        console.log('Mang so keo: ', mangSoKeo);
        if (mangSoKeo.length === 0) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        }

        let chuoiSoKeo = mangSoKeo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 3);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('keo');
    }

    /// Kiểm tra chữ k

    index = contentTmp.indexOf('k');
    
    while (index !== -1) {

        if (
            index !== -1 &&
            (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
            (contentTmp[index + 1] === '.' || isFinite(Number(contentTmp[index + 1]))) &&
            (contentTmp[index + 1] === '.' ||
                (isFinite(Number(contentTmp[index + 1])) && contentTmp[index - 1] === '.') ||
                isFinite(Number(contentTmp[index - 1]))) &&
            isFinite(Number(contentTmp[index + 2])) &&
            isFinite(Number(contentTmp[index - 2]))
        ) {
            let length = contentTmp.length;

            let mangSoKeo = [];
            let soSau = '';
            let soTruoc = '';

            //Lấy số sau k
            for (let i = index + 1; i < length; i++) {
                if (isFinite(Number(contentTmp[i]))) {
                    soSau = soSau + contentTmp[i];
                }

                if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                    break;
                }
            }

            //Lấy số trước k
            for (let i = index - 1; i >= 0; i--) {
                if (isFinite(Number(contentTmp[i]))) {
                    soTruoc = contentTmp[i] + soTruoc;
                }

                if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                    break;
                }
            }

            let lengthSo = soTruoc.length;
            let first = false;
            let NumOtherBefore = 0;

            if (
                soTruoc.length === 2 &&
                soTruoc[0] !== soSau[0] &&
                soTruoc[1] !== soSau[1] &&
                (soTruoc[0] !== soTruoc[1] ||
                    soSau[0] !== soSau[1] ||
                    ((soTruoc[0] === soTruoc[1] || soSau[0] === soSau[1]) && Number(soSau[0]) - Number(soTruoc[0]) < 5))
            ) {
                let soSauKhac = Number(soSau);
                let soTruocKhac = Number(soTruoc);

                for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
                    mangSoKeo.push(i);
                }
            } else if (
                // eslint-disable-next-line no-self-compare
                soTruoc.length !== soTruoc.length ||
                (soTruoc.length === 3 &&
                    soTruoc[0] !== soSau[0] &&
                    soTruoc[1] !== soSau[1] &&
                    soTruoc[2] !== soSau[2] &&
                    (soTruoc[1] !== soTruoc[2] ||
                        soTruoc[0] !== soTruoc[2] ||
                        soTruoc[0] !== soTruoc[1] ||
                        soSau[1] !== soSau[2] ||
                        soSau[0] !== soSau[2] ||
                        soSau[0] !== soSau[1]))
            ) {
                errorSyntax = true;
                errorSyntaxDetail = {
                    code: 'keo',
                    num: [soTruoc, soSau],
                };
            } else {
                for (let i = 0; i < lengthSo; i++) {
                    if (soTruoc[i] !== soSau[i]) {
                        let soSauKhac = Number(soSau[i]);
                        let soTruocKhac = Number(soTruoc[i]);

                        if (!first) {
                            for (let j = soTruocKhac + 1; j < soSauKhac; j++) {
                                mangSoKeo.push(soTruoc.slice(0, i) + j + soTruoc.slice(i + 1));
                            }

                            first = true;
                        } else {
                            // eslint-disable-next-line no-loop-func
                            mangSoKeo = mangSoKeo.map((e) => {
                                let eTmp = e.substring(0, i) + e[NumOtherBefore] + e.substring(i + 1);

                                return eTmp;
                            });
                        }

                        NumOtherBefore = i;
                    }
                }
            }

            console.log('Mang so keo: ', mangSoKeo);
            if (mangSoKeo.length === 0) {
                errorSyntax = true;
                errorSyntaxDetail = {
                    code: 'keo',
                    num: [soTruoc, soSau],
                };
            }

            let chuoiSoKeo = mangSoKeo.join('.');

            // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
            let before = contentTmp.slice(0, index);
            if (before.endsWith('.')) {
                // Nếu có, cắt bỏ dấu chấm
                before = before.slice(0, -1);
            }

            // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
            let after = contentTmp.slice(index + 1);
            if (after.startsWith('.')) {
                // Nếu có, cắt dấu chấm
                after = after.slice(1);
            }
            contentTmp = before + '.' + chuoiSoKeo + '.' + after;
        }

        index = contentTmp.indexOf('k', index + 1);
    }

    /// Kiểm tra chữ toi

    index = contentTmp.indexOf('toi');

    while (
        index !== -1 &&
        (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
        isFinite(
            Number(contentTmp[index - 2]) &&
                (contentTmp[index + 3] === '.' || isFinite(Number(contentTmp[index + 3]))) &&
                isFinite(Number(contentTmp[index + 4])),
        )
    ) {
        let length = contentTmp.length;

        let mangSoKeo = [];
        let soSau = '';
        let soTruoc = '';

        //Lấy số sau k
        for (let i = index + 3; i < length; i++) {
            if (isFinite(Number(contentTmp[i]))) {
                soSau = soSau + contentTmp[i];
            }

            if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        //Lấy số trước k
        for (let i = index - 1; i >= 0; i--) {
            if (isFinite(Number(contentTmp[i]))) {
                soTruoc = contentTmp[i] + soTruoc;
            }

            if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        let lengthSo = soTruoc.length;
        let first = false;
        let NumOtherBefore = 0;

        if (
            soTruoc.length === 2 &&
            soSau.length === 2 &&
            soTruoc[0] !== soSau[0] &&
            soTruoc[1] !== soSau[1] &&
            (soTruoc[0] !== soTruoc[1] ||
                soSau[0] !== soSau[1] ||
                ((soTruoc[0] === soTruoc[1] || soSau[0] === soSau[1]) && Number(soSau[0]) - Number(soTruoc[0]) < 5))
        ) {
            let soSauKhac = Number(soSau);
            let soTruocKhac = Number(soTruoc);

            for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
                mangSoKeo.push(i);
            }
        } else if (
            // eslint-disable-next-line no-self-compare
            soTruoc.length !== soTruoc.length ||
            (soTruoc.length === 3 &&
                soTruoc[0] !== soSau[0] &&
                soTruoc[1] !== soSau[1] &&
                soTruoc[2] !== soSau[2] &&
                (soTruoc[1] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[1] ||
                    soSau[1] !== soSau[2] ||
                    soSau[0] !== soSau[2] ||
                    soSau[0] !== soSau[1]))
        ) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        } else {
            for (let i = 0; i < lengthSo; i++) {
                if (soTruoc[i] !== soSau[i]) {
                    let soSauKhac = Number(soSau[i]);
                    let soTruocKhac = Number(soTruoc[i]);

                    if (!first) {
                        for (let j = soTruocKhac + 1; j < soSauKhac; j++) {
                            mangSoKeo.push(soTruoc.slice(0, i) + j + soTruoc.slice(i + 1));
                        }

                        first = true;
                    } else {
                        // eslint-disable-next-line no-loop-func
                        mangSoKeo = mangSoKeo.map((e) => {
                            let eTmp = e.substring(0, i) + e[NumOtherBefore] + e.substring(i + 1);

                            return eTmp;
                        });
                    }

                    NumOtherBefore = i;
                }
            }
        }

        console.log('Mang so keo: ', mangSoKeo);
        if (mangSoKeo.length === 0) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        }

        let chuoiSoKeo = mangSoKeo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 3);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('toi');
    }

    /// Kiểm tra chữ den

    index = contentTmp.indexOf('den');

    while (
        index !== -1 &&
        (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
        isFinite(
            Number(contentTmp[index - 2]) &&
                (contentTmp[index + 3] === '.' || isFinite(Number(contentTmp[index + 3]))) &&
                isFinite(Number(contentTmp[index + 4])),
        )
    ) {
        let length = contentTmp.length;

        let mangSoKeo = [];
        let soSau = '';
        let soTruoc = '';

        //Lấy số sau k
        for (let i = index + 3; i < length; i++) {
            if (isFinite(Number(contentTmp[i]))) {
                soSau = soSau + contentTmp[i];
            }

            if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        //Lấy số trước k
        for (let i = index - 1; i >= 0; i--) {
            if (isFinite(Number(contentTmp[i]))) {
                soTruoc = contentTmp[i] + soTruoc;
            }

            if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        let lengthSo = soTruoc.length;
        let first = false;
        let NumOtherBefore = 0;

        if (
            soTruoc.length === 2 &&
            soSau.length === 2 &&
            soTruoc[0] !== soSau[0] &&
            soTruoc[1] !== soSau[1] &&
            (soTruoc[0] !== soTruoc[1] ||
                soSau[0] !== soSau[1] ||
                ((soTruoc[0] === soTruoc[1] || soSau[0] === soSau[1]) && Number(soSau[0]) - Number(soTruoc[0]) < 5))
        ) {
            let soSauKhac = Number(soSau);
            let soTruocKhac = Number(soTruoc);

            for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
                mangSoKeo.push(i);
            }
        } else if (
            // eslint-disable-next-line no-self-compare
            soTruoc.length !== soTruoc.length ||
            (soTruoc.length === 3 &&
                soTruoc[0] !== soSau[0] &&
                soTruoc[1] !== soSau[1] &&
                soTruoc[2] !== soSau[2] &&
                (soTruoc[1] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[2] ||
                    soTruoc[0] !== soTruoc[1] ||
                    soSau[1] !== soSau[2] ||
                    soSau[0] !== soSau[2] ||
                    soSau[0] !== soSau[1]))
        ) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        } else {
            for (let i = 0; i < lengthSo; i++) {
                if (soTruoc[i] !== soSau[i]) {
                    let soSauKhac = Number(soSau[i]);
                    let soTruocKhac = Number(soTruoc[i]);

                    if (!first) {
                        for (let j = soTruocKhac + 1; j < soSauKhac; j++) {
                            mangSoKeo.push(soTruoc.slice(0, i) + j + soTruoc.slice(i + 1));
                        }

                        first = true;
                    } else {
                        // eslint-disable-next-line no-loop-func
                        mangSoKeo = mangSoKeo.map((e) => {
                            let eTmp = e.substring(0, i) + e[NumOtherBefore] + e.substring(i + 1);

                            return eTmp;
                        });
                    }

                    NumOtherBefore = i;
                }
            }
        }

        console.log('Mang so keo: ', mangSoKeo);
        if (mangSoKeo.length === 0) {
            errorSyntax = true;
            errorSyntaxDetail = {
                code: 'keo',
                num: [soTruoc, soSau],
            };
        }

        let chuoiSoKeo = mangSoKeo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 3);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('den');
    }

    return { data1: contentTmp, data2: errorSyntax, data22: errorSyntaxDetail };
}

export default handleTextKeo;
