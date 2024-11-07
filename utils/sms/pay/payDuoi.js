function payDuoi(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;


    let lengthSo = content.number[0].length;

    diem =
        content.price *
        (content.domain === 'mn' || content.domain === 'mt' ? 1 : content.domain === 'mb' ? 1 : 1) *
        content.province.length;

    tienxac =
        diem * (content.domain === 'mn' ? info.codauduoiMN : content.domain === 'mt' ? info.codauduoiMT : info.codauduoiMB);

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    ((i === 17 && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && i === 26))
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
            ? info.trungdauduoiMN
            : content.domain === 'mt'
            ? info.trungdauduoiMT
            : info.trungdauduoiMB);


    return {
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payDuoi;
