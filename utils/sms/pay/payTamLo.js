function payTamLo(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    diem =
        content.price *
        (content.domain === 'mn' || content.domain === 'mt' ? 8 : content.domain === 'mb' ? 8 : 8) *
        content.province.length;

    tienxac =
        diem *
        (content.domain === 'mn'
            ? lengthSo === 2
                ? info.co2conMN
                : lengthSo === 3
                ? info.co3conMN
                : info.co4conMN
            : content.domain === 'mt'
            ? lengthSo === 2
                ? info.co2conMT
                : lengthSo === 3
                ? info.co3conMT
                : info.co4conMT
            : lengthSo === 2
            ? info.co2conMB
            : lengthSo === 3
            ? info.co3conMB
            : info.co4conMB);

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    ((i <= 7 && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && i <= 7))
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
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payTamLo;
