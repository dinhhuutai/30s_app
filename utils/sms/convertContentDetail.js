import errorDai from './errorDai';
import findListOverturn from './findListOverturn';
import findListTwoNum from './findListTwoNum';
import findPosFirstAndTwo from './findPosFirstAndTwo';
import handleConvertSymbol from './handleConvertSymbol';
import handleDai from './handleDai';
import handleDaiSpace from './handleDaiSpace';
import handleDeleteMien from './handleDeleteMien';
import handleDeleteStringFrontRedundant from './handleDeleteStringFrontRedundant';
import handleListNumComboBao from './handleListNumComboBao';
import handleMien from './handleMien';
import handleTextCaseSpecial from './handleTextCaseSpecial';
import handleTextKeo from './handleTextKeo';
import markError from './markError';
import shortenText from './shortenText';

function convertContentDetail(content, date) {
    const now = date;

    // Lấy ngày, tháng, năm
    const day = now.getDate(); // Ngày trong tháng (1-31)
    const month = now.getMonth() + 1; // Tháng (0-11), cộng thêm 1 để có giá trị tháng (1-12)
    const year = now.getFullYear(); // Năm đầy đủ

    const dayOfWeek = now.getDay() + 1;

    console.log(`${day}/${month}/${year}`);
    console.log('Thứ: ', dayOfWeek);

    let errorSyntax = false;

    let errorSyntaxDetail = {};

    let arr = [];

    let kt = true;
    let mien = '';

    let contentTmp = shortenText(content);
    console.log('Làm gọn: ', contentTmp);

    let { data1, data2, data22 } = handleTextKeo(contentTmp);
    contentTmp = data1;
    errorSyntax = data2;
    errorSyntaxDetail = data22;

    console.log('Làm gọn sau kéo: ', contentTmp);

    contentTmp = handleTextCaseSpecial(contentTmp);
    console.log('Làm gọn sau xử lý kiểu đánh đặc biệt: ', contentTmp);

    // Lấy miền ở đây

    let objHandleMien = handleMien(contentTmp, now);

    contentTmp = objHandleMien.content;
    mien = objHandleMien.mien;

    console.log('Làm gọn sau lấy miền: ', contentTmp);
    console.log('Miền: ', mien);

    //

    contentTmp = handleDeleteMien(contentTmp, mien);
    console.log('Làm gọn sau khi xóa các miền còn dư: ', contentTmp);

    contentTmp = handleConvertSymbol(contentTmp, mien, dayOfWeek);
    console.log('Làm gọn sau viết tắc: ', contentTmp);

    contentTmp = handleDaiSpace(contentTmp);
    console.log('Làm gọn sau xử lý khoảng trống giữa đài: ', contentTmp);

    let { data3, data4, data42 } = handleDeleteStringFrontRedundant(contentTmp);
    contentTmp = data3;
    if (!errorSyntax) {
        errorSyntax = data4;
        errorSyntaxDetail = data42;
    }
    console.log('Làm gọn sau xóa các chuỗi dư thừa phía trước: ', contentTmp);

    let bd = 0;
    let kth = 0;

    let isKD = false;

    while (kt) {
        if (
            contentTmp[0] === 'b' &&
            contentTmp[1] === 'l' &&
            (contentTmp[2] === '.' || isFinite(Number(contentTmp[2])))
        ) {
            contentTmp = 'bi' + contentTmp.slice(2);
        } else if (
            contentTmp[3] === 'b' &&
            contentTmp[4] === 'l' &&
            (contentTmp[5] === '.' || isFinite(Number(contentTmp[5])))
        ) {
            contentTmp = contentTmp.slice(0, 3) + 'bi' + contentTmp.slice(5);
        } else if (
            contentTmp[6] === 'b' &&
            contentTmp[7] === 'l' &&
            (contentTmp[8] === '.' || isFinite(Number(contentTmp[8]))) &&
            !isFinite(Number(contentTmp[4]))
        ) {
            contentTmp = contentTmp.slice(0, 6) + 'bi' + contentTmp.slice(8);
        } else if (
            contentTmp[9] === 'b' &&
            contentTmp[10] === 'l' &&
            (contentTmp[11] === '.' || isFinite(Number(contentTmp[11]))) &&
            !isFinite(Number(contentTmp[7]))
        ) {
            contentTmp = contentTmp.slice(0, 9) + 'bi' + contentTmp.slice(11);
        }
        const { firstTwoPositions, changeDaiBacLieu, changeBaoDao } = findPosFirstAndTwo(contentTmp, dayOfWeek, mien);

        const pos = firstTwoPositions;
        if (changeDaiBacLieu) {
            contentTmp = contentTmp.slice(0, pos[1]) + 'bi' + contentTmp.slice(pos[1] + 2);
        }
        if (changeBaoDao.length > 0) {
            // eslint-disable-next-line no-loop-func, array-callback-return
            changeBaoDao.map((item, index) => {
                contentTmp = contentTmp.slice(0, item + 2 * index) + 'bdao' + contentTmp.slice(item + 2 * index + 2);

                if (item > pos[0] && item < pos[1]) {
                    pos[1] += 2;
                }
            });
        }

        let firstArrLength = arr.length;

        bd = pos[0];
        kth = pos[1];

        if (kth === -1) {
            kth = contentTmp.length;
        }

        if (bd === -1) {
            kt = false;
            break;
        }

        let ktThemCham = false;

        let cloChild = contentTmp.slice(bd, kth);
        if (!cloChild.endsWith('.')) {
            cloChild += '.';
            kth += 1;
            ktThemCham = true;
        }

        console.log('Cụm con: ', cloChild);

        let mangSo = [];
        let so = '';
        let kdanh = '';
        let gtien = 0;
        let ktNumZeroFirt = false;

        let fSo = true;
        let fKdanh = true;
        let fGtienDecimal = false;
        let ddCh = true;
        let isDuoi = false;

        let cbBl = false;
        let cbBld = false;

        let mangSoCbBOfXc = [];

        let dai = '';

        for (let i = bd; i < kth; i++) {
            dai += cloChild[i];

            if (isFinite(Number(cloChild[i + 1]))) {
                dai = dai.replace(/[.,:]/g, '');

                dai = handleDai(dai, mien, dayOfWeek);

                if (!errorSyntax) {
                    let { data5, data52 } = errorDai(dai, mien, dayOfWeek);
                    errorSyntax = data5;
                    errorSyntaxDetail = data52;
                }
                break;
            }
        }

        for (let i = bd + 2; i < kth; i++) {
            if (isFinite(Number(cloChild[i])) && fSo) {
                so = so + cloChild[i];
            }

            if (isFinite(Number(cloChild[i - 1])) && fSo && (cloChild[i] === '.' || !isFinite(Number(cloChild[i])))) {
                mangSo.push(so.toString());
                so = '';
                cbBl = false;
                cbBld = false;
                isDuoi = false;
            }

            if (mangSo.length > 0 && fKdanh && cloChild[i] !== '.' && !isFinite(Number(cloChild[i]))) {
                kdanh += cloChild[i];
                fSo = false;
                isKD = false;
            }

            if (isFinite(Number(cloChild[i])) && !fSo) {
                gtien = gtien * 10 + Number(cloChild[i]);
                fKdanh = false;

                if (gtien === 0 && !ktNumZeroFirt) {
                    fGtienDecimal = true;
                    ktNumZeroFirt = true;
                }
            }

            if (
                gtien > 0 &&
                cloChild[i] === '.' &&
                isFinite(Number(cloChild[i + 1])) &&
                (cloChild[i + 2] === '.' || !isFinite(Number(cloChild[i + 2])))
            ) {
                fGtienDecimal = true;
            }

            if (
                !fSo &&
                !fKdanh &&
                !(
                    cloChild[i] === '.' &&
                    isFinite(Number(cloChild[i + 1])) &&
                    (cloChild[i + 2] === '.' || !isFinite(Number(cloChild[i + 2])))
                ) &&
                (cloChild[i] === '.' || !isFinite(Number(cloChild[i])))
            ) {
                if (cloChild[i] !== '.') {
                    cloChild = cloChild.slice(0, i) + '.' + cloChild.slice(i);
                    contentTmp = contentTmp.slice(0, i) + '.' + contentTmp.slice(i);
                    kth += 1;
                }

                if (fGtienDecimal) {
                    gtien /= 10;

                    fGtienDecimal = false;
                }

                let kdSS = kdanh.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let kdanhMain = '';

                if (
                    (kdSS === 'dx' ||
                        kdSS === 'đx' ||
                        kdSS === 'đax' ||
                        kdSS === 'da' ||
                        kdSS === 'đa' ||
                        kdSS === 'dat' ||
                        kdSS === 'dathang' ||
                        kdSS === 'dath' ||
                        kdSS === 'dth' ||
                        kdSS === 'dthang' ||
                        kdSS === 'daxien' ||
                        kdSS === 'dxien' ||
                        kdSS === 'đat' ||
                        kdSS === 'dav' ||
                        kdSS === 'dv' ||
                        kdSS === 'davong' ||
                        kdSS === 'dax' ||
                        (kdSS === 'd' &&
                            !isDuoi &&
                            !(
                                cloChild[i + 1] === 'd' ||
                                cloChild[i + 2] === 'd' ||
                                cloChild[i + 3] === 'd' ||
                                cloChild[i + 4] === 'd' ||
                                cloChild[i + 5] === 'd' ||
                                cloChild[i - Number((gtien + '').length) - Number(kdSS.length) - 2] === 'd' ||
                                cloChild[i - Number((gtien + '').length) - Number(kdSS.length) - 3] === 'd' ||
                                cloChild[i - Number((gtien + '').length) - Number(kdSS.length) - 4] === 'd' ||
                                cloChild[i - Number((gtien + '').length) - Number(kdSS.length) - 5] === 'd'
                            ))) &&
                    mangSo[0].length === 2
                ) {
                    if (dai.length >= 2) {
                        kdanhMain = 'da(xien)';
                    } else {
                        kdanhMain = 'da(thang)';
                    }

                    let mangSoDa = findListTwoNum(mangSo);

                    let daiTmps = findListTwoNum(dai);

                    if (dai.length === 1) {
                        if (
                            (kdSS === 'dx' ||
                                kdSS === 'đx' ||
                                kdSS === 'đax' ||
                                kdSS === 'daxien' ||
                                kdSS === 'dxien' ||
                                kdSS === 'dax') &&
                            mien !== 'mb'
                        ) {
                            errorSyntax = true;
                            console.log(123);
                        }
                    }

                    if (dai.length > 2) {
                        if (mangSoDa[0]?.length <= 1) {
                            errorSyntax = true;
                            errorSyntaxDetail = {
                                code: 'da1',
                                num: mangSoDa[0][0],
                            };
                            console.log(123);
                        }
                        // eslint-disable-next-line no-loop-func
                        daiTmps.map((daiTmp) => {
                            mangSoDa.map((soDa) => {
                                if (
                                    kdSS === 'dat' ||
                                    kdSS === 'dathang' ||
                                    kdSS === 'dath' ||
                                    kdSS === 'dth' ||
                                    kdSS === 'dthang' ||
                                    kdSS === 'đat' ||
                                    kdSS === 'đathang' ||
                                    kdSS === 'dav' ||
                                    kdSS === 'dv' ||
                                    kdSS === 'davong' ||
                                    soDa[0].length < 2 ||
                                    soDa[1].length < 2 ||
                                    soDa[0] === soDa[1]
                                ) {
                                    errorSyntaxDetail = {
                                        code: 'da2',
                                        num: [soDa[0], soDa[1]],
                                    };
                                    errorSyntax = true;
                                    console.log(123);
                                }

                                const daiTmpContent = [...daiTmp];

                                if (daiTmpContent.includes('br')) {
                                    daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                                } else if (daiTmpContent.includes('bi')) {
                                    daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                                } else if (daiTmpContent.includes('bu')) {
                                    daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                                } else if (daiTmpContent.includes('lt')) {
                                    daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                                } else if (daiTmpContent.includes('dg')) {
                                    daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                                } else if (daiTmpContent.includes('qg')) {
                                    daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                                } else if (daiTmpContent.includes('do')) {
                                    daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                                }

                                const obj = {
                                    content: `${daiTmpContent}.${soDa[0]},${soDa[1]}.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: daiTmp,
                                    number: soDa,
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(`${daiTmpContent},${soDa[1]}.${kdanhMain}.${gtien}ngan`);
                            });
                        });
                    } else {
                        if (mangSoDa[0]?.length <= 1) {
                            errorSyntax = true;
                            errorSyntaxDetail = {
                                code: 'da1',
                                num: mangSoDa[0][0],
                            };
                            console.log(123);
                        }
                        // eslint-disable-next-line no-loop-func
                        mangSoDa.map((soDa) => {
                            if (soDa[0].length < 2 || soDa[1].length < 2 || soDa[0] === soDa[1]) {
                                errorSyntaxDetail = {
                                    code: 'da2',
                                    num: [soDa[0], soDa[1]],
                                };
                                errorSyntax = true;
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${soDa[0]},${soDa[1]}.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: soDa,
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(`${daiTmpContent}.${soDa[0]},${soDa[1]}.${kdanhMain}.${gtien}ngan`);
                        });
                    }
                } else {
                    isDuoi = false;
                    if (
                        (kdSS === 'l' ||
                            kdSS === 'lo' ||
                            kdSS === 'b' ||
                            kdSS === 'bl' ||
                            kdSS === 'blo' ||
                            kdSS === 'blô' ||
                            kdSS === 'baolo' ||
                            kdSS === 'bao' ||
                            kdSS === 'baol' ||
                            kdSS === 'baolô') &&
                        cbBl
                    ) {
                        if (mangSo[0].length === 3) {
                            mangSoCbBOfXc = mangSo;
                        }
                        mangSo = handleListNumComboBao(mangSo);
                    }

                    if (
                        (kdSS === 'dl' ||
                            kdSS === 'dlo' ||
                            kdSS === 'ld' ||
                            kdSS === 'lod' ||
                            kdSS === 'db' ||
                            kdSS === 'đb' ||
                            kdSS === 'dbl' ||
                            kdSS === 'đbl' ||
                            kdSS === 'dblo' ||
                            kdSS === 'đblô' ||
                            kdSS === 'daobaolo' ||
                            kdSS === 'daobaolô' ||
                            kdSS === 'blodao' ||
                            kdSS === 'daoblo' ||
                            kdSS === 'baolodao' ||
                            kdSS === 'daobaolo' ||
                            kdSS === 'bldao' ||
                            kdSS === 'daobl' ||
                            kdSS === 'bdao' ||
                            kdSS === 'daob' ||
                            kdSS === 'baoldao' ||
                            kdSS === 'daobaol' ||
                            kdSS === 'baodao' ||
                            kdSS === 'daobao' ||
                            kdSS === 'daolo' ||
                            kdSS === 'lodao' ||
                            kdSS === 'bđao' ||
                            kdSS === 'bld') &&
                        cbBld
                    ) {
                        if (mangSo[0].length === 3) {
                            mangSoCbBOfXc = mangSo;
                        }
                        mangSo = handleListNumComboBao(mangSo);
                    }

                    // eslint-disable-next-line no-loop-func
                    mangSo.map((eSo, index) => {
                        if (eSo.length < 2) {
                            errorSyntaxDetail = {
                                code: 'quantity1',
                                num: eSo,
                            };
                            errorSyntax = true;
                        }

                        if (
                            kdSS === 'l' ||
                            kdSS === 'lo' ||
                            kdSS === 'b' ||
                            kdSS === 'bl' ||
                            kdSS === 'blo' ||
                            kdSS === 'blô' ||
                            kdSS === 'baolo' ||
                            kdSS === 'bao' ||
                            kdSS === 'baol' ||
                            kdSS === 'baolô'
                        ) {
                            kdanhMain = 'baolo';

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${eSo}.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(`${dai}.${eSo}.${kdanhMain}.${gtien}ngan`);

                            cbBl = true;
                        }

                        if (
                            kdSS === 'dl' ||
                            kdSS === 'dlo' ||
                            kdSS === 'ld' ||
                            kdSS === 'lod' ||
                            kdSS === 'db' ||
                            kdSS === 'đb' ||
                            kdSS === 'dbl' ||
                            kdSS === 'đbl' ||
                            kdSS === 'dblo' ||
                            kdSS === 'đblô' ||
                            kdSS === 'daobaolo' ||
                            kdSS === 'daobaolô' ||
                            kdSS === 'blodao' ||
                            kdSS === 'daoblo' ||
                            kdSS === 'baolodao' ||
                            kdSS === 'daobaolo' ||
                            kdSS === 'bldao' ||
                            kdSS === 'daobl' ||
                            kdSS === 'bdao' ||
                            kdSS === 'daob' ||
                            kdSS === 'baoldao' ||
                            kdSS === 'daobaol' ||
                            kdSS === 'baodao' ||
                            kdSS === 'daobao' ||
                            kdSS === 'daolo' ||
                            kdSS === 'lodao' ||
                            kdSS === 'bđao' ||
                            kdSS === 'bld'
                        ) {
                            kdanhMain = 'baolodao';

                            let mangSoDao = findListOverturn(eSo);

                            mangSoDao.map((soDao) => {
                                if (soDao.length < 2) {
                                    errorSyntax = true;
                                    errorSyntaxDetail = {
                                        code: 'quantity1',
                                        num: soDao,
                                    };
                                    console.log(123);
                                }

                                const daiTmpContent = [...dai];

                                if (daiTmpContent.includes('br')) {
                                    daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                                } else if (daiTmpContent.includes('bi')) {
                                    daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                                } else if (daiTmpContent.includes('bu')) {
                                    daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                                } else if (daiTmpContent.includes('lt')) {
                                    daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                                } else if (daiTmpContent.includes('dg')) {
                                    daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                                } else if (daiTmpContent.includes('qg')) {
                                    daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                                } else if (daiTmpContent.includes('do')) {
                                    daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                                }

                                const obj = {
                                    content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [soDao],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });

                            cbBld = true;
                        }

                        if (kdSS === 'baylo' || kdSS === 'baobay' || kdSS === 'baobaylo') {
                            kdanhMain = 'baylo';

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${eSo}.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(`${dai}.${eSo}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'baylod' ||
                            kdSS === 'baobayd' ||
                            kdSS === 'baobaylod' ||
                            kdSS === 'baylodao' ||
                            kdSS === 'baobaydao' ||
                            kdSS === 'baobaylodao' ||
                            kdSS === 'dbaylo' ||
                            kdSS === 'dbaobay' ||
                            kdSS === 'dbaobaylo' ||
                            kdSS === 'daobaylo' ||
                            kdSS === 'daobaobay' ||
                            kdSS === 'daobaobaylo'
                        ) {
                            kdanhMain = 'baylo';

                            let mangSoDao = findListOverturn(eSo);

                            mangSoDao.map((soDao) => {
                                if (soDao.length < 2) {
                                    errorSyntax = true;
                                    errorSyntaxDetail = {
                                        code: 'quantity1',
                                        num: soDao,
                                    };
                                    console.log(123);
                                }

                                const daiTmpContent = [...dai];

                                if (daiTmpContent.includes('br')) {
                                    daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                                } else if (daiTmpContent.includes('bi')) {
                                    daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                                } else if (daiTmpContent.includes('bu')) {
                                    daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                                } else if (daiTmpContent.includes('lt')) {
                                    daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                                } else if (daiTmpContent.includes('dg')) {
                                    daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                                } else if (daiTmpContent.includes('qg')) {
                                    daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                                } else if (daiTmpContent.includes('do')) {
                                    daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                                }

                                const obj = {
                                    content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [soDao],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });
                        }

                        if (kdSS === 'tamlo' || kdSS === 'baotam' || kdSS === 'baotamlo') {
                            kdanhMain = 'tamlo';

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${eSo}.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(`${dai}.${eSo}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'tamlod' ||
                            kdSS === 'baotamd' ||
                            kdSS === 'baotamlod' ||
                            kdSS === 'tamlodao' ||
                            kdSS === 'baotamdao' ||
                            kdSS === 'baotamlodao' ||
                            kdSS === 'dtamlo' ||
                            kdSS === 'dbaotam' ||
                            kdSS === 'dbaotamlo' ||
                            kdSS === 'daotamlo' ||
                            kdSS === 'daobaotam' ||
                            kdSS === 'daobaotamlo'
                        ) {
                            kdanhMain = 'tamlo';

                            let mangSoDao = findListOverturn(eSo);

                            mangSoDao.map((soDao) => {
                                if (soDao.length < 2) {
                                    errorSyntax = true;
                                    errorSyntaxDetail = {
                                        code: 'quantity1',
                                        num: soDao,
                                    };
                                    console.log(123);
                                }

                                const daiTmpContent = [...dai];

                                if (daiTmpContent.includes('br')) {
                                    daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                                } else if (daiTmpContent.includes('bi')) {
                                    daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                                } else if (daiTmpContent.includes('bu')) {
                                    daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                                } else if (daiTmpContent.includes('lt')) {
                                    daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                                } else if (daiTmpContent.includes('dg')) {
                                    daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                                } else if (daiTmpContent.includes('qg')) {
                                    daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                                } else if (daiTmpContent.includes('do')) {
                                    daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                                }

                                const obj = {
                                    content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [soDao],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });
                        }

                        if (
                            kdSS === 'dd' ||
                            kdSS === 'đđ' ||
                            kdSS === 'dauduoi' ||
                            kdSS === 'daudui' ||
                            kdSS === 'daud' ||
                            kdSS === 'ddui' ||
                            kdSS === 'dduoi' ||
                            kdSS === 'đd' ||
                            kdSS === 'dđ' ||
                            kdSS === 'đâuđuôi' ||
                            kdSS === 'đầuđuôi' ||
                            kdSS === 'đauđuôi'
                        ) {
                            kdanhMain = 'dauduoi';

                            if (eSo.length < 2) {
                                errorSyntaxDetail = {
                                    code: 'quantity2',
                                    num: eSo,
                                };
                                errorSyntax = true;

                                console.log('error quantity2');
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(
                                `${dai}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                            );
                        }

                        if (
                            kdSS === 'x' ||
                            kdSS === 'xc' ||
                            kdSS === 'xiuchu' ||
                            kdSS === 'xiuch' ||
                            kdSS === 'xiuc' ||
                            kdSS === 'xch' ||
                            kdSS === 'xchu' ||
                            kdSS === 's' ||
                            kdSS === 'sc' ||
                            kdSS === 'siuchu' ||
                            kdSS === 'siuch' ||
                            kdSS === 'siuc' ||
                            kdSS === 'sch' ||
                            kdSS === 'xiu' ||
                            kdSS === 'schu'
                        ) {
                            kdanhMain = 'xiuchu';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${eSoXc}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [eSoXc],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${eSoXc}.${kdanhMain}.${gtien}ngan`);
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                const obj = {
                                    content: `${daiTmpContent}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(
                                    `${dai}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                );
                            }
                        }

                        if (
                            kdSS === 'xdau' ||
                            kdSS === 'xcdau' ||
                            kdSS === 'xchdau' ||
                            kdSS === 'xchudau' ||
                            kdSS === 'xiuchudau' ||
                            kdSS === 'xiuchdau' ||
                            kdSS === 'xiucdau' ||
                            kdSS === 'xiudau' ||
                            kdSS === 'xđau' ||
                            kdSS === 'xcđau' ||
                            kdSS === 'xiuchuđau' ||
                            kdSS === 'sdau' ||
                            kdSS === 'scdau' ||
                            kdSS === 'schdau' ||
                            kdSS === 'schudau' ||
                            kdSS === 'siuchudau' ||
                            kdSS === 'siuchdau' ||
                            kdSS === 'siucdau' ||
                            kdSS === 'sđau' ||
                            kdSS === 'scđau' ||
                            kdSS === 'siuchuđau'
                        ) {
                            kdanhMain = 'xiuchudau';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${eSoXc}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [eSoXc],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${eSoXc}.${kdanhMain}.${gtien}ngan`);
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                const obj = {
                                    content: `${daiTmpContent}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(
                                    `${dai}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                );
                            }
                        }

                        if (
                            kdSS === 'xduoi' ||
                            kdSS === 'xcduoi' ||
                            kdSS === 'xchduoi' ||
                            kdSS === 'xchuduoi' ||
                            kdSS === 'xiuchuduoi' ||
                            kdSS === 'xiuchduoi' ||
                            kdSS === 'xiucduoi' ||
                            kdSS === 'xduoi' ||
                            kdSS === 'xcduoi' ||
                            kdSS === 'xiuchuduoi' ||
                            kdSS === 'xdui' ||
                            kdSS === 'xcdui' ||
                            kdSS === 'xchdui' ||
                            kdSS === 'xchudui' ||
                            kdSS === 'xiuchudui' ||
                            kdSS === 'xiuchdui' ||
                            kdSS === 'xiucdui' ||
                            kdSS === 'xiudui' ||
                            kdSS === 'xiuduoi' ||
                            kdSS === 'xdui' ||
                            kdSS === 'xcdui' ||
                            kdSS === 'xiuchudui' ||
                            kdSS === 'sduoi' ||
                            kdSS === 'scduoi' ||
                            kdSS === 'schduoi' ||
                            kdSS === 'schuduoi' ||
                            kdSS === 'siuchuduoi' ||
                            kdSS === 'siuchduoi' ||
                            kdSS === 'siucduoi' ||
                            kdSS === 'sduoi' ||
                            kdSS === 'scduoi' ||
                            kdSS === 'siuchuduoi' ||
                            kdSS === 'sdui' ||
                            kdSS === 'scdui' ||
                            kdSS === 'schdui' ||
                            kdSS === 'schudui' ||
                            kdSS === 'siuchudui' ||
                            kdSS === 'siuchdui' ||
                            kdSS === 'siucdui' ||
                            kdSS === 'sdui' ||
                            kdSS === 'scdui' ||
                            kdSS === 'siuchudui'
                        ) {
                            kdanhMain = 'xiuchuduoi';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${eSoXc}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [eSoXc],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${eSoXc}.${kdanhMain}.${gtien}ngan`);
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                const obj = {
                                    content: `${daiTmpContent}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                    domain: mien,
                                    province: dai,
                                    number: [eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo],
                                    typePlay: kdanhMain,
                                    price: gtien,
                                    resultDate: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];
                                isKD = true;

                                console.log(
                                    `${dai}.${
                                        eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo
                                    }.${kdanhMain}.${gtien}ngan`,
                                );
                            }
                        }

                        if (
                            kdSS === 'daoxc' ||
                            kdSS === 'daox' ||
                            kdSS === 'dxchu' ||
                            kdSS === 'dx' ||
                            kdSS === 'dxc' ||
                            kdSS === 'xd' ||
                            kdSS === 'xdao' ||
                            kdSS === 'xcdao' ||
                            kdSS === 'xiuchudao' ||
                            kdSS === 'xchudao' ||
                            kdSS === 'xchdao' ||
                            kdSS === 'xiucdao' ||
                            kdSS === 'xiuchdao' ||
                            kdSS === 'xcd' ||
                            kdSS === 'xiuchud' ||
                            kdSS === 'xchud' ||
                            kdSS === 'xchd' ||
                            kdSS === 'xiucd' ||
                            kdSS === 'xiuchd' ||
                            kdSS === 'xiud' ||
                            kdSS === 'xiudao' ||
                            kdSS === 'đaoxc' ||
                            kdSS === 'đaox' ||
                            kdSS === 'đxchu' ||
                            kdSS === 'đx' ||
                            kdSS === 'đxc' ||
                            kdSS === 'xđ' ||
                            kdSS === 'xđao' ||
                            kdSS === 'xcđ' ||
                            kdSS === 'xcđao' ||
                            kdSS === 'xiuchuđao' ||
                            kdSS === 'daox' ||
                            kdSS === 'daoxc' ||
                            kdSS === 'daoxiuchu' ||
                            kdSS === 'daoxchu' ||
                            kdSS === 'daoxch' ||
                            kdSS === 'daoxiuc' ||
                            kdSS === 'daoxiuch' ||
                            kdSS === 'dxc' ||
                            kdSS === 'dxiuchu' ||
                            kdSS === 'dxchu' ||
                            kdSS === 'dxch' ||
                            kdSS === 'dxiuc' ||
                            kdSS === 'dxiuch' ||
                            kdSS === 'daosc' ||
                            kdSS === 'daos' ||
                            kdSS === 'dschu' ||
                            kdSS === 'ds' ||
                            kdSS === 'dsc' ||
                            kdSS === 'sd' ||
                            kdSS === 'sdao' ||
                            kdSS === 'scdao' ||
                            kdSS === 'siuchudao' ||
                            kdSS === 'schudao' ||
                            kdSS === 'schdao' ||
                            kdSS === 'siucdao' ||
                            kdSS === 'siuchdao' ||
                            kdSS === 'scd' ||
                            kdSS === 'siuchud' ||
                            kdSS === 'schud' ||
                            kdSS === 'schd' ||
                            kdSS === 'siucd' ||
                            kdSS === 'siuchd' ||
                            kdSS === 'đaosc' ||
                            kdSS === 'đaos' ||
                            kdSS === 'đschu' ||
                            kdSS === 'đs' ||
                            kdSS === 'đsc' ||
                            kdSS === 'sđ' ||
                            kdSS === 'sđao' ||
                            kdSS === 'scđ' ||
                            kdSS === 'scđao' ||
                            kdSS === 'siuchuđao' ||
                            kdSS === 'daos' ||
                            kdSS === 'daosc' ||
                            kdSS === 'daosiuchu' ||
                            kdSS === 'daoschu' ||
                            kdSS === 'daosch' ||
                            kdSS === 'daosiuc' ||
                            kdSS === 'daosiuch' ||
                            kdSS === 'dsc' ||
                            kdSS === 'dsiuchu' ||
                            kdSS === 'dschu' ||
                            kdSS === 'dsch' ||
                            kdSS === 'dsiuc' ||
                            kdSS === 'dsiuch'
                        ) {
                            kdanhMain = 'xiuchudao';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    let mangSoDao = findListOverturn(eSoXc);

                                    mangSoDao.map((soDao) => {
                                        const obj = {
                                            content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                            domain: mien,
                                            province: dai,
                                            number: [soDao],
                                            typePlay: kdanhMain,
                                            price: gtien,
                                            resultDate: now,
                                            dayOfWeek: dayOfWeek,
                                        };

                                        arr = [...arr, obj];
                                        isKD = true;

                                        console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                    });
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                let mangSoDao = findListOverturn(eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo);

                                mangSoDao.map((soDao) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [soDao],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                });
                            }
                        }

                        if (
                            kdSS === 'xdaudao' ||
                            kdSS === 'xdaud' ||
                            kdSS === 'xdaodau' ||
                            kdSS === 'xddau' ||
                            kdSS === 'daoxcdau' ||
                            kdSS === 'daoxdau' ||
                            kdSS === 'dxchudau' ||
                            kdSS === 'dxdau' ||
                            kdSS === 'dxcdau' ||
                            kdSS === 'xddau' ||
                            kdSS === 'xdaodau' ||
                            kdSS === 'xcdaodau' ||
                            kdSS === 'xiuchudaodau' ||
                            kdSS === 'xchudaodau' ||
                            kdSS === 'xchdaodau' ||
                            kdSS === 'xiucdaodau' ||
                            kdSS === 'xiuchdaodau' ||
                            kdSS === 'xcddau' ||
                            kdSS === 'xiuchuddau' ||
                            kdSS === 'xchuddau' ||
                            kdSS === 'xchddau' ||
                            kdSS === 'xiucddau' ||
                            kdSS === 'xiuddau' ||
                            kdSS === 'xiudaud' ||
                            kdSS === 'xiudaodau' ||
                            kdSS === 'xiudaudao' ||
                            kdSS === 'xiuchddau' ||
                            kdSS === 'đaoxcdau' ||
                            kdSS === 'đaoxdau' ||
                            kdSS === 'đxchudau' ||
                            kdSS === 'đxdau' ||
                            kdSS === 'đxcdau' ||
                            kdSS === 'xđdau' ||
                            kdSS === 'xđaodau' ||
                            kdSS === 'xcđdau' ||
                            kdSS === 'xcđaodau' ||
                            kdSS === 'xiuchuđaodau' ||
                            kdSS === 'daoxdau' ||
                            kdSS === 'daoxcdau' ||
                            kdSS === 'daoxiuchudau' ||
                            kdSS === 'daoxchudau' ||
                            kdSS === 'daoxchdau' ||
                            kdSS === 'daoxiucdau' ||
                            kdSS === 'daoxiuchdau' ||
                            kdSS === 'dxcdau' ||
                            kdSS === 'dxiuchudau' ||
                            kdSS === 'dxchudau' ||
                            kdSS === 'dxchdau' ||
                            kdSS === 'dxiucdau' ||
                            kdSS === 'dxiuchdau' ||
                            kdSS === 'daoscdau' ||
                            kdSS === 'daosdau' ||
                            kdSS === 'dschudau' ||
                            kdSS === 'dsdau' ||
                            kdSS === 'dscdau' ||
                            kdSS === 'sddau' ||
                            kdSS === 'sdaodau' ||
                            kdSS === 'scdaodau' ||
                            kdSS === 'siuchudaodau' ||
                            kdSS === 'schudaodau' ||
                            kdSS === 'schdaodau' ||
                            kdSS === 'siucdaodau' ||
                            kdSS === 'siuchdaodau' ||
                            kdSS === 'scddau' ||
                            kdSS === 'siuchuddau' ||
                            kdSS === 'schuddau' ||
                            kdSS === 'schddau' ||
                            kdSS === 'siucddau' ||
                            kdSS === 'siuchddau' ||
                            kdSS === 'đaoscdau' ||
                            kdSS === 'đaosdau' ||
                            kdSS === 'đschudau' ||
                            kdSS === 'đsdau' ||
                            kdSS === 'đscdau' ||
                            kdSS === 'sđdau' ||
                            kdSS === 'sđaodau' ||
                            kdSS === 'scđdau' ||
                            kdSS === 'scđaodau' ||
                            kdSS === 'siuchuđaodau' ||
                            kdSS === 'daosdau' ||
                            kdSS === 'daoscdau' ||
                            kdSS === 'daosiuchudau' ||
                            kdSS === 'daoschudau' ||
                            kdSS === 'daoschdau' ||
                            kdSS === 'daosiucdau' ||
                            kdSS === 'daosiuchdau' ||
                            kdSS === 'dscdau' ||
                            kdSS === 'dsiuchudau' ||
                            kdSS === 'dschudau' ||
                            kdSS === 'dschdau' ||
                            kdSS === 'dsiucdau' ||
                            kdSS === 'dsiuchdau' ||
                            kdSS === 'xcdaudao' ||
                            kdSS === 'xiuchudaudao' ||
                            kdSS === 'xchudaudao' ||
                            kdSS === 'xcdaud' ||
                            kdSS === 'xiuchudaud' ||
                            kdSS === 'xchudaud' ||
                            kdSS === 'scdaudao' ||
                            kdSS === 'siuchudaudao' ||
                            kdSS === 'schudaudao' ||
                            kdSS === 'scdaud' ||
                            kdSS === 'siuchudaud' ||
                            kdSS === 'schudaud'
                        ) {
                            kdanhMain = 'xiuchudaudao';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    let mangSoDao = findListOverturn(eSoXc);

                                    mangSoDao.map((soDao) => {
                                        const obj = {
                                            content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                            domain: mien,
                                            province: dai,
                                            number: [soDao],
                                            typePlay: kdanhMain,
                                            price: gtien,
                                            resultDate: now,
                                            dayOfWeek: dayOfWeek,
                                        };

                                        arr = [...arr, obj];
                                        isKD = true;

                                        console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                    });
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                let mangSoDao = findListOverturn(eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo);

                                mangSoDao.map((soDao) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [soDao],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                });
                            }
                        }

                        if (
                            kdSS === 'xduidao' ||
                            kdSS === 'xduoidao' ||
                            kdSS === 'xduid' ||
                            kdSS === 'xduoid' ||
                            kdSS === 'xdaodui' ||
                            kdSS === 'xdaoduoi' ||
                            kdSS === 'xddui' ||
                            kdSS === 'xdduoi' ||
                            kdSS === 'xiudduoi' ||
                            kdSS === 'xiuduoid' ||
                            kdSS === 'xiudaoduoi' ||
                            kdSS === 'xiuduoidao' ||
                            kdSS === 'daoxcduoi' ||
                            kdSS === 'daoxduoi' ||
                            kdSS === 'dxchuduoi' ||
                            kdSS === 'dxduoi' ||
                            kdSS === 'dxcduoi' ||
                            kdSS === 'xdduoi' ||
                            kdSS === 'xdaoduoi' ||
                            kdSS === 'xcdaoduoi' ||
                            kdSS === 'xiuchudaoduoi' ||
                            kdSS === 'xchudaoduoi' ||
                            kdSS === 'xchdaoduoi' ||
                            kdSS === 'xiucdaoduoi' ||
                            kdSS === 'xiuchdaoduoi' ||
                            kdSS === 'xcdduoi' ||
                            kdSS === 'xiuchudduoi' ||
                            kdSS === 'xchudduoi' ||
                            kdSS === 'xchdduoi' ||
                            kdSS === 'xiucdduoi' ||
                            kdSS === 'xiuchdduoi' ||
                            kdSS === 'đaoxcduoi' ||
                            kdSS === 'đaoxduoi' ||
                            kdSS === 'đxchuduoi' ||
                            kdSS === 'đxduoi' ||
                            kdSS === 'đxcduoi' ||
                            kdSS === 'xđduoi' ||
                            kdSS === 'xđaoduoi' ||
                            kdSS === 'xcđduoi' ||
                            kdSS === 'xcđaoduoi' ||
                            kdSS === 'xiuchuđaoduoi' ||
                            kdSS === 'daoxduoi' ||
                            kdSS === 'daoxcduoi' ||
                            kdSS === 'daoxiuchuduoi' ||
                            kdSS === 'daoxchuduoi' ||
                            kdSS === 'daoxchduoi' ||
                            kdSS === 'daoxiucduoi' ||
                            kdSS === 'daoxiuchduoi' ||
                            kdSS === 'dxcduoi' ||
                            kdSS === 'dxiuchuduoi' ||
                            kdSS === 'dxchuduoi' ||
                            kdSS === 'dxchduoi' ||
                            kdSS === 'dxiucduoi' ||
                            kdSS === 'dxiuchduoi' ||
                            kdSS === 'daoscduoi' ||
                            kdSS === 'daosduoi' ||
                            kdSS === 'dschuduoi' ||
                            kdSS === 'dsduoi' ||
                            kdSS === 'dscduoi' ||
                            kdSS === 'sdduoi' ||
                            kdSS === 'sdaoduoi' ||
                            kdSS === 'scdaoduoi' ||
                            kdSS === 'siuchudaoduoi' ||
                            kdSS === 'schudaoduoi' ||
                            kdSS === 'schdaoduoi' ||
                            kdSS === 'siucdaoduoi' ||
                            kdSS === 'siuchdaoduoi' ||
                            kdSS === 'scdduoi' ||
                            kdSS === 'siuchudduoi' ||
                            kdSS === 'schudduoi' ||
                            kdSS === 'schdduoi' ||
                            kdSS === 'siucdduoi' ||
                            kdSS === 'siuchdduoi' ||
                            kdSS === 'đaoscduoi' ||
                            kdSS === 'đaosduoi' ||
                            kdSS === 'đschuduoi' ||
                            kdSS === 'đsduoi' ||
                            kdSS === 'đscduoi' ||
                            kdSS === 'sđduoi' ||
                            kdSS === 'sđaoduoi' ||
                            kdSS === 'scđduoi' ||
                            kdSS === 'scđaoduoi' ||
                            kdSS === 'siuchuđaoduoi' ||
                            kdSS === 'daosduoi' ||
                            kdSS === 'daoscduoi' ||
                            kdSS === 'daosiuchuduoi' ||
                            kdSS === 'daoschuduoi' ||
                            kdSS === 'daoschduoi' ||
                            kdSS === 'daosiucduoi' ||
                            kdSS === 'daosiuchduoi' ||
                            kdSS === 'dscduoi' ||
                            kdSS === 'dsiuchuduoi' ||
                            kdSS === 'dschuduoi' ||
                            kdSS === 'dschduoi' ||
                            kdSS === 'dsiucduoi' ||
                            kdSS === 'dsiuchduoi' ||
                            kdSS === 'xcduoidao' ||
                            kdSS === 'xiuchuduoidao' ||
                            kdSS === 'xchuduoidao' ||
                            kdSS === 'xcduoid' ||
                            kdSS === 'xiuchuduoid' ||
                            kdSS === 'xchuduoid' ||
                            kdSS === 'scduoidao' ||
                            kdSS === 'siuchuduoidao' ||
                            kdSS === 'schuduoidao' ||
                            kdSS === 'scduoid' ||
                            kdSS === 'siuchuduoid' ||
                            kdSS === 'schuduoid'
                        ) {
                            kdanhMain = 'xiuchuduoidao';

                            if (eSo.length < 3 && mangSoCbBOfXc.length === 0) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity3',
                                    num: eSo,
                                };
                                console.log(123);
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            if (mangSoCbBOfXc.length > 0 && index === 0) {
                                mangSoCbBOfXc.map((eSoXc) => {
                                    let mangSoDao = findListOverturn(eSoXc);

                                    mangSoDao.map((soDao) => {
                                        const obj = {
                                            content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                            domain: mien,
                                            province: dai,
                                            number: [soDao],
                                            typePlay: kdanhMain,
                                            price: gtien,
                                            resultDate: now,
                                            dayOfWeek: dayOfWeek,
                                        };

                                        arr = [...arr, obj];
                                        isKD = true;

                                        console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                    });
                                });
                            }

                            if (mangSoCbBOfXc.length === 0) {
                                let mangSoDao = findListOverturn(eSo.length === 4 ? eSo[1] + eSo[2] + eSo[3] : eSo);

                                mangSoDao.map((soDao) => {
                                    const obj = {
                                        content: `${daiTmpContent}.${soDao}.${kdanhMain}.${gtien}ngan`,
                                        domain: mien,
                                        province: dai,
                                        number: [soDao],
                                        typePlay: kdanhMain,
                                        price: gtien,
                                        resultDate: now,
                                        dayOfWeek: dayOfWeek,
                                    };

                                    arr = [...arr, obj];
                                    isKD = true;

                                    console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                                });
                            }
                        }

                        if (kdSS === 'dau' || kdSS === 'đau' || kdSS === 'đầu' || kdSS === 'đâu') {
                            kdanhMain = 'dau';
                            isDuoi = true;

                            if (eSo.length < 2) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity2',
                                    num: eSo,
                                };
                                console.log('error quantity2');
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(
                                `${dai}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                            );
                        }

                        if (
                            kdSS === 'duoi' ||
                            kdSS === 'đuôi' ||
                            kdSS === 'duôi' ||
                            kdSS === 'đuoi' ||
                            kdSS === 'dui' ||
                            kdSS === 'đui'
                        ) {
                            kdanhMain = 'duoi';

                            if (eSo.length < 2) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity2',
                                    num: eSo,
                                };
                                console.log('error quantity2');
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(
                                `${dai}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                            );
                        }

                        if ((kdSS === 'd' || kdSS === 'đ') && ddCh) {
                            kdanhMain = 'dau';

                            if (eSo.length < 2) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity2',
                                    num: eSo,
                                };
                                console.log('error quantity2');
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(
                                `${dai}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                            );
                        } else if ((kdSS === 'd' || kdSS === 'đ') && !ddCh) {
                            kdanhMain = 'duoi';

                            if (eSo.length < 2) {
                                errorSyntax = true;
                                errorSyntaxDetail = {
                                    code: 'quantity2',
                                    num: eSo,
                                };
                                console.log('error quantity2');
                            }

                            const daiTmpContent = [...dai];

                            if (daiTmpContent.includes('br')) {
                                daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                            } else if (daiTmpContent.includes('bi')) {
                                daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                            } else if (daiTmpContent.includes('bu')) {
                                daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                            } else if (daiTmpContent.includes('lt')) {
                                daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                            } else if (daiTmpContent.includes('dg')) {
                                daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                            } else if (daiTmpContent.includes('qg')) {
                                daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                            } else if (daiTmpContent.includes('do')) {
                                daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                            }

                            const obj = {
                                content: `${daiTmpContent}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                                domain: mien,
                                province: dai,
                                number: [eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo],
                                typePlay: kdanhMain,
                                price: gtien,
                                resultDate: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];
                            isKD = true;

                            console.log(
                                `${dai}.${
                                    eSo.length === 4 ? eSo[2] + eSo[3] : eSo.length === 3 ? eSo[1] + eSo[2] : eSo
                                }.${kdanhMain}.${gtien}ngan`,
                            );
                        }
                    });

                    if ((kdSS === 'd' || kdSS === 'đ') && ddCh) {
                        ddCh = false;
                        isDuoi = true;
                    } else if ((kdSS === 'd' || kdSS === 'đ') && !ddCh) {
                        ddCh = true;
                    }
                }

                if (!isKD) {
                    errorSyntax = true;
                    errorSyntaxDetail = {
                        code: 'notKD',
                        num: mangSo[mangSo.length - 1],
                        kdanh: kdanh,
                        gtien: gtien,
                    };

                    console.log(errorSyntaxDetail);
                }

                fSo = true;
                fKdanh = true;
                kdanh = '';
                gtien = 0;
                so = '';
                ktNumZeroFirt = false;

                if (cloChild[i] === '.' && isFinite(Number(cloChild[i + 1]))) {
                    mangSo = [];
                    mangSoCbBOfXc = [];
                }
            }
        }

        if (firstArrLength === arr.length) {
            errorSyntax = true;
            console.log(123);
        }

        contentTmp = contentTmp.slice(ktThemCham ? kth - 1 : kth);
    }

    let locationError = {};

    if (errorSyntax) {
        locationError = markError(content, errorSyntaxDetail, mien, dayOfWeek);
    }

    console.log('locationError: ', locationError);

    console.log('errorSyntax: ', errorSyntax);

    return { arr, errorSyntax, locationError };
}

export default convertContentDetail;
