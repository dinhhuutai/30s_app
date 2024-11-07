function payXiuChuWin(content, info, kqxs) {
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    (((i === 1 || i === 17) && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && (i === 19 || i === 20 || i === 21 || i === 26)))
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
            ? info.trungxiuchuMN
            : content.domain === 'mt'
            ? info.trungxiuchuMT
            : info.trungxiuchuMB);

    return {
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payXiuChuWin;
