function payBayLoWin(content, info, kqxs) {
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    ((i <= 6 && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && i <= 6))
                ) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.price *
        quantitySoTrung *
        (content.domain === 'mn'
            ? lengthSo === 2
                ? info.trung2conMN
                : lengthSo === 3
                ? info.trung3conMN
                : info.trung4conMN
            : content.domain === 'mt'
            ? lengthSo === 2
                ? info.trung2conMT
                : lengthSo === 3
                ? info.trung3conMT
                : info.trung4conMT
            : lengthSo === 2
            ? info.trung2conMB
            : lengthSo === 3
            ? info.trung3conMB
            : info.trung4conMB);

    return {
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payBayLoWin;
