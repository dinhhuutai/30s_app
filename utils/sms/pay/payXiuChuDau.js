function payXiuChuDau(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;


    let lengthSo = content.number[0].length;

    diem =
        content.price *
        (content.domain === 'mn' || content.domain === 'mt' ? 1 : content.domain === 'mb' ? 3 : 1) *
        content.province.length;

    tienxac =
        diem * (content.domain === 'mn' ? info.coxiuchuMN : content.domain === 'mt' ? info.coxiuchuMT : info.coxiuchuMB);

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    (((i === 1) && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && (i === 19 || i === 20 || i === 21)))
                ) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.price *
        quantitySoTrung *
        (content.domain === 'mn' ? info.trungxiuchuMN : content.domain === 'mt' ? info.trungxiuchuMT : info.trungxiuchuMB);


    return {
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payXiuChuDau;
