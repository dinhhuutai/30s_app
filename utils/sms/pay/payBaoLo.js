function payBaoLo(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    diem =
        content.price *
        ((content.domain === 'mn' || content.domain === 'mt') && lengthSo === 2
            ? 18
            : (content.domain === 'mn' || content.domain === 'mt') && lengthSo === 3
            ? 17
            : (content.domain === 'mn' || content.domain === 'mt') && lengthSo === 4
            ? 16
            : content.domain === 'mb' && lengthSo === 2
            ? 27
            : content.domain === 'mb' && lengthSo === 3
            ? 23
            : content.domain === 'mb' && lengthSo === 4
            ? 20
            : 1) *
        content.province.length;

    tienxac =
        diem *
        (lengthSo === 2
            ? content.domain === 'mn'
                ? info.co2conMN
                : content.domain === 'mt'
                ? info.co2conMT
                : info.co2conMB
            : lengthSo === 3
            ? content.domain === 'mn'
                ? info.co3conMN
                : content.domain === 'mt'
                ? info.co3conMT
                : info.co3conMB
            : lengthSo === 4
            ? content.domain === 'mn'
                ? info.co4conMN
                : content.domain === 'mt'
                ? info.co4conMT
                : info.co4conMB
            : 1);

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
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payBaoLo;
