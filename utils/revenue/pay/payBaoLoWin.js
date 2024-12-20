function payBaoLoWin(content, info, kqxs) {
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s) => {
                if (s.length >= content.number[0].length && s.endsWith(content.number[0])) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.price *
        quantitySoTrung *
        (lengthSo === 2
            ? content.domain === 'mn'
                ? info.trung2conMN
                : content.domain === 'mt'
                ? info.trung2conMT
                : info.trung2conMB
            : lengthSo === 3
            ? content.domain === 'mn'
                ? info.trung3conMN
                : content.domain === 'mt'
                ? info.trung3conMT
                : info.trung3conMB
            : lengthSo === 4
            ? content.domain === 'mn'
                ? info.trung4conMN
                : content.domain === 'mt'
                ? info.trung4conMT
                : info.trung4conMB
            : 1);

    return {
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payBaoLoWin;
