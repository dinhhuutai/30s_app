function payDaXien(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;
    let quantitySoTrung1 = 0;
    let quantitySoTrung2 = 0;

    diem =
        content.price *
        2 *
        (content.domain === 'mn' || content.domain === 'mt' ? 18 : content.domain === 'mb' ? 27 : 1) *
        content.province.length;

    tienxac = diem * (content.domain === 'mn' ? info.codaxienMN : content.domain === 'mt' ? info.codaxienMT : 1);

    let hasSo1 = false;
    let hasSo2 = false;

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (s.length >= content.number[0].length && s.endsWith(content.number[0])) {
                    quantitySoTrung1 += 1;
                    hasSo1 = true;
                }

                if (s.length >= content.number[1].length && s.endsWith(content.number[1])) {
                    quantitySoTrung2 += 1;
                    hasSo2 = true;
                }
            });
        }
    });

    if (hasSo1 && hasSo2) {
        if (
            (content.domain === 'mn' && info.typeTrungdaxienMN) ||
            (content.domain === 'mt' && info.typeTrungdaxienMT) ||
            (content.domain === 'mb' && info.typeTrungdaxienMB)
        ) {
            quantitySoTrung = (quantitySoTrung1 + quantitySoTrung2) / 2;
        } else {
            quantitySoTrung =
                quantitySoTrung1 < quantitySoTrung2
                    ? quantitySoTrung1
                    : quantitySoTrung1 > quantitySoTrung2
                    ? quantitySoTrung2
                    : quantitySoTrung1;
        }
    } else {
        quantitySoTrung = 0;
    }

    tientrung =
        content.price *
        quantitySoTrung *
        (content.domain === 'mn' ? info.trungdaxienMN : content.domain === 'mt' ? info.trungdaxienMT : 1);

    return {
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payDaXien;
