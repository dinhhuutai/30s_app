function handleMien(content, now) {
    let contentTmp = content;

    let mien = '';

    var mienMain = '';
    let length = contentTmp.length;

    var vtbd = 0;
    var fVtbd = true;

    var vtkt = 0;

    if (contentTmp[length - 1] !== '.') {
        contentTmp = contentTmp + '.';
        length = contentTmp.length;
    }

    for (var i = 0; i < length; i++) {
        if (!isFinite(Number(contentTmp[i])) && contentTmp[i] !== '.') {
            mien += contentTmp[i];

            if (fVtbd) {
                vtbd = i;
                fVtbd = false;
            }
        }

        if (contentTmp[i] === '.' || isFinite(Number(contentTmp[i]))) {
            if (mien === 'mn' || mien === 'mnam' || mien === 'miennam' || mien === 'mienam') {
                vtkt = i;

                mienMain = 'mn';

                contentTmp = mienMain + '.' + contentTmp;

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            } else if (
                mien === 'mtr' ||
                mien === 'mtrung' ||
                mien === 'mientr' ||
                mien === 'mt' ||
                mien === 'mientrung'
            ) {
                vtkt = i;

                mienMain = 'mt';

                contentTmp = mienMain + '.' + contentTmp;

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            } else if (
                mien === 'mb' ||
                mien === 'mienb' ||
                mien === 'mienbac' ||
                mien === 'hn' ||
                mien === 'hanoi' ||
                mien === 'hnoi' ||
                mien === 'han'
            ) {
                vtkt = i;

                mienMain = 'mb';

                contentTmp = mienMain + '.' + contentTmp;

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            }

            if (mien !== 'm' && mien !== 'mien' && mien !== 'h' && mien !== 'ha') {
                mien = '';
                fVtbd = true;
            }
        }
    }

    if (mienMain === '') {
        // Lấy giờ và phút hiện tại
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // if (currentHour < 16 || (currentHour === 16 && currentMinute < 15)) {
        //     mienMain = 'mn';

        //     contentTmp = mienMain + '.' + contentTmp;
        // } else if (currentHour < 17 || (currentHour === 17 && currentMinute < 15)) {
        //     mienMain = 'mt';

        //     contentTmp = mienMain + '.' + contentTmp;
        // } else if (currentHour < 18 || (currentHour === 18 && currentMinute < 15)) {
        //     mienMain = 'mb';

        //     contentTmp = mienMain + '.' + contentTmp;
        // }

        if (isFinite(Number(contentTmp[1])) && (currentHour > 16 || (currentHour === 16 && currentMinute > 15))) {
            mienMain = 'mb';
            console.log(123);

            contentTmp = mienMain + '.' + contentTmp;
        } else {
            //Ưu tiên nếu ngta không có ghi miền thì là miền nam
            mienMain = 'mn';
            contentTmp = mienMain + '.' + contentTmp;
        }
    }


    return {
        content: contentTmp,
        mien: mienMain,
    };
}

export default handleMien;
