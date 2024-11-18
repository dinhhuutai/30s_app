function handleTextCaseSpecial(content) {
    let contentTmp = content;

    contentTmp = handleGiap(contentTmp);
    contentTmp = handleLeLe(contentTmp);
    contentTmp = handleChanChan(contentTmp);
    contentTmp = handleLeChan(contentTmp);
    contentTmp = handleChanLe(contentTmp);
    contentTmp = handleLe(contentTmp);
    contentTmp = handleChan(contentTmp);
    contentTmp = handleTaiTai(contentTmp);
    contentTmp = handleXiuXiu(contentTmp);
    contentTmp = handleXiuTai(contentTmp);
    contentTmp = handleTaiXiu(contentTmp);
    contentTmp = handleTai(contentTmp);
    contentTmp = handleXiu(contentTmp);

    return contentTmp;
}

function handleXiu(contentTmp) {
    contentTmp = contentTmp.replace(/xiu/g, 'xiu');

    let index = contentTmp.indexOf('xiu');

    while (
        (index !== -1 &&
            contentTmp[index - 1] === '.' &&
            contentTmp[index + 3] === '.' &&
            contentTmp[index + 4] !== 'c' &&
            !isFinite(Number(contentTmp[index + 4]))) ||
        (index === 0 &&
            contentTmp[index + 3] === '.' &&
            contentTmp[index + 4] !== 'c' &&
            !isFinite(Number(contentTmp[index + 4])))
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i <= 4) {
                for (let j = 0; j <= 9; j++) {
                    mangSo.push(i + '' + j);
                }
            }
        }

        console.log(`Mang so xiu: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

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

        index = contentTmp.indexOf('xiu');
    }

    return contentTmp;
}

function handleTai(contentTmp) {
    contentTmp = contentTmp.replace(/tai/g, 'tai');

    let index = contentTmp.indexOf('tai');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 3] === '.') ||
        (index === 0 && contentTmp[index + 3] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i > 4) {
                for (let j = 0; j <= 9; j++) {
                    mangSo.push(i + '' + j);
                }
            }
        }

        console.log(`Mang so tai: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

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

        index = contentTmp.indexOf('tai');
    }

    return contentTmp;
}

function handleTaiXiu(contentTmp) {
    contentTmp = contentTmp.replace(/tai.xiu/g, 'taixiu');

    let index = contentTmp.indexOf('taixiu');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i > 4) {
                for (let j = 0; j <= 9; j++) {
                    if (j <= 4) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so taixiu: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('taixiu');
    }

    return contentTmp;
}

function handleXiuTai(contentTmp) {
    contentTmp = contentTmp.replace(/xiu.tai/g, 'xiutai');

    let index = contentTmp.indexOf('xiutai');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i <= 4) {
                for (let j = 0; j <= 9; j++) {
                    if (j > 4) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so xiutai: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('xiutai');
    }

    return contentTmp;
}

function handleXiuXiu(contentTmp) {
    contentTmp = contentTmp.replace(/xiu.xiu/g, 'xiuxiu');

    let index = contentTmp.indexOf('xiuxiu');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i <= 4) {
                for (let j = 0; j <= 9; j++) {
                    if (j <= 4) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so xiuxiu: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('xiuxiu');
    }

    return contentTmp;
}

function handleTaiTai(contentTmp) {
    contentTmp = contentTmp.replace(/tai.tai/g, 'taitai');

    let index = contentTmp.indexOf('taitai');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i > 4) {
                for (let j = 0; j <= 9; j++) {
                    if (j > 4) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so taitai: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('taitai');
    }

    return contentTmp;
}

function handleChan(contentTmp) {
    contentTmp = contentTmp.replace(/chan/g, 'chan');

    let index = contentTmp.indexOf('chan');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 4] === '.') ||
        (index === 0 && contentTmp[index + 4] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                if (j % 2 === 0) {
                    mangSo.push(i + '' + j);
                }
            }
        }

        console.log(`Mang so chan: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 4);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('chan');
    }

    return contentTmp;
}

function handleLe(contentTmp) {
    contentTmp = contentTmp.replace(/le/g, 'le');

    let index = contentTmp.indexOf('le');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 2] === '.') ||
        (index === 0 && contentTmp[index + 2] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                if (j % 2 !== 0) {
                    mangSo.push(i + '' + j);
                }
            }
        }

        console.log(`Mang so le: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 2);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('le');
    }

    return contentTmp;
}

function handleChanLe(contentTmp) {
    contentTmp = contentTmp.replace(/chan.le/g, 'chanle');

    let index = contentTmp.indexOf('chanle');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i % 2 === 0) {
                for (let j = 0; j <= 9; j++) {
                    if (j % 2 !== 0) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so chanle: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('chanle');
    }

    return contentTmp;
}

function handleLeChan(contentTmp) {
    contentTmp = contentTmp.replace(/le.chan/g, 'lechan');

    let index = contentTmp.indexOf('lechan');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 6] === '.') ||
        (index === 0 && contentTmp[index + 6] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i % 2 !== 0) {
                for (let j = 0; j <= 9; j++) {
                    if (j % 2 === 0) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so lechan: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 6);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('lechan');
    }

    return contentTmp;
}

function handleChanChan(contentTmp) {
    contentTmp = contentTmp.replace(/chan.chan/g, 'chanchan');

    let index = contentTmp.indexOf('chanchan');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 8] === '.') ||
        (index === 0 && contentTmp[index + 8] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i % 2 === 0) {
                for (let j = 0; j <= 9; j++) {
                    if (j % 2 === 0) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so chanchan: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 8);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('chanchan');
    }

    return contentTmp;
}

function handleLeLe(contentTmp) {
    contentTmp = contentTmp.replace(/le.le/g, 'lele');
    let index = contentTmp.indexOf('lele');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 4] === '.') ||
        (index === 0 && contentTmp[index + 4] === '.')
    ) {
        let mangSo = [];

        for (let i = 0; i <= 9; i++) {
            if (i % 2 !== 0) {
                for (let j = 0; j <= 9; j++) {
                    if (j % 2 !== 0) {
                        mangSo.push(i + '' + j);
                    }
                }
            }
        }

        console.log(`Mang so lele: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 4);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('lele');
    }

    return contentTmp;
}

function handleGiap(contentTmp) {
    let index = contentTmp.indexOf('giap');

    while (
        (index !== -1 && contentTmp[index - 1] === '.' && contentTmp[index + 4] === '.') ||
        (index === 0 && contentTmp[index + 4] === '.')
    ) {
        let mangSo = [
            '06',
            '07',
            '09',
            '10',
            '11',
            '12',
            '14',
            '15',
            '18',
            '23',
            '26',
            '28',
            '32',
            '35',
            '46',
            '47',
            '49',
            '50',
            '51',
            '52',
            '54',
            '55',
            '58',
            '63',
            '66',
            '68',
            '72',
            '75',
            '86',
            '87',
            '89',
            '90',
            '91',
            '92',
            '94',
            '95',
            '98',
        ];

        console.log(`Mang so giap: ${mangSo}  |  số lượng: ${mangSo.length}`);

        let chuoiSoKeo = mangSo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 4);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('giap');
    }

    return contentTmp;
}

export default handleTextCaseSpecial;
