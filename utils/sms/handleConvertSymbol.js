function handleConvertSymbol(content, mien, dayOfWeek) {
    let contentTmp = content;

    contentTmp = contentTmp
        .replace(/đ/g, "d")
        .replace(/ă/g, "a")
        .replace(/â/g, "a")
        .replace(/ư/g, "u")
        .replace(/ơ/g, "o")
        .replace(/ô/g, "o")
        .replace(/ê/g, "e")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/dai/g, "d");

    let length = contentTmp.length;

    const searchChars = [
        "2d",
        "hd",
        "2đ",
        "3d",
        "3đ",
        "4d",
        "4đ",
        "dc",
        "dp",
        "dt",
        "tp",
        "cm",
        "br",
        "vt",
        "bi",
        "dn",
        "ct",
        "st",
        "tn",
        "ag",
        "bt",
        "bu",
        "vl",
        "tv",
        "la",
        "bp",
        "hg",
        "tg",
        "kg",
        "lt",
        "py",
        "hu",
        "dl",
        "qn",
        "dg",
        "kh",
        "qb",
        "qt",
        "gl",
        "bd",
        "nt",
        "qg",
        "do",
        "kt",
        "mb",
        "bl",
    ];

    let dai = "";
    let listDai = [
        "thanhpho",
        "tpho",
        "tph",
        "thpho",
        "thph",
        "thp",
        "dongthap",
        "dthap",
        "dth",
        "camau",
        "cmau",
        "bentre",
        "bentr",
        "btre",
        "vungtau",
        "vugtau",
        "vugt",
        "vungt",
        "vtau",
        "baclieu",
        "bacl",
        "blieu",
        "bliu",
        "bacliu",
        "dongnai",
        "dognai",
        "dongn",
        "dogn",
        "dgnai",
        "dnai",
        "cantho",
        "canth",
        "ctho",
        "cth",
        "soctrang",
        "strang",
        "stran",
        "strag",
        "soctrag",
        "soctran",
        "tayninh",
        "tninh",
        "angiang",
        "ang",
        "agiang",
        "angian",
        "agian",
        "binhthuan",
        "bihthuan",
        "bihth",
        "binhth",
        "bthuan",
        "bth",
        "binhduong",
        "bduong",
        "bihduong",
        "bihduon",
        "bihduog",
        "binhduog",
        "bduog",
        "binhduon",
        "bduon",
        "vinhlong",
        "vlong",
        "vlon",
        "vihlon",
        "vihlong",
        "vinhlon",
        "travih",
        "trvih",
        "travinh",
        "trvinh",
        "tvinh",
        "logan",
        "loga",
        "longan",
        "lan",
        "lonan",
        "longa",
        "binhphuoc",
        "bphuoc",
        "bph",
        "bihph",
        "bihphuoc",
        "binhph",
        "haugiang",
        "haugiag",
        "hgiang",
        "haugian",
        "hgian",
        "tiengiag",
        "tgiag",
        "tiengiang",
        "tgiang",
        "tiengian",
        "tgian",
        "tgi",
        "kiengiag",
        "kgiag",
        "kiengiang",
        "kgiang",
        "kiengian",
        "kgian",
        "kgi",
        "dalat",
        "dlat",
        "phuin",
        "phuien",
        "pien",
        "phuy",
        "phy",
        "phuyen",
        "pyen",
        "hue",
        "thuathienhue",
        "thhue",
        "tthue",
        "tth",
        "daklak",
        "dlak",
        "dlac",
        "daclac",
        "daclak",
        "daklac",
        "quangnam",
        "quagnam",
        "qnam",
        "danag",
        "dnag",
        "danang",
        "dnang",
        "danan",
        "dnan",
        "khanhhoa",
        "khoa",
        "khhoa",
        "quagbih",
        "quagbinh",
        "quanbih",
        "quanbinh",
        "quangbih",
        "qbih",
        "quangbinh",
        "qbinh",
        "binhdinh",
        "bihdih",
        "bihdinh",
        "binhdih",
        "bdinh",
        "bdi",
        "bdih",
        "quangtri",
        "quagtr",
        "quagtri",
        "quantr",
        "quantri",
        "quangtr",
        "qtr",
        "qtri",
        "gialai",
        "glai",
        "ninhth",
        "nihthuan",
        "nihth",
        "nith",
        "nithuan",
        "nth",
        "ninhth",
        "ninhthuan",
        "nthuan",
        "quangngai",
        "quagngai",
        "quagng",
        "quangng",
        "quangai",
        "quanngai",
        "qngai",
        "dacnog",
        "dnog",
        "daknog",
        "dacnong",
        "dnong",
        "daknong",
        "dno",
        "dacnon",
        "dnon",
        "daknon",
        "kontum",
        "ktum",
        "ktom",
        "kontom",
    ];

    let bDai = false;
    var daiMain = "";

    var vtbd = 0;
    var fVtbd = true;

    var vtkt = 0;

    for (var i = 0; i < length; i++) {
        if (!isFinite(Number(contentTmp[i])) && contentTmp[i] !== ".") {
            dai += contentTmp[i];

            if (fVtbd) {
                vtbd = i;
                fVtbd = false;
            }
        }

        if (
            (contentTmp[i] === "." || isFinite(Number(contentTmp[i]))) &&
            dai.length > 2
        ) {
            console.log(dai);

            if (dai === "dng") {
                vtkt = i;

                daiMain = "dg";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "haid") {
                vtkt = i;

                daiMain = "2d";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "bad") {
                vtkt = i;

                daiMain = "3d";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "bond" || dai === "tud") {
                vtkt = i;

                daiMain = "4d";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "hcm") {
                vtkt = i;

                daiMain = "tp";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "btr") {
                vtkt = i;

                daiMain = "br";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "dlk") {
                vtkt = i;

                daiMain = "dl";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "bihdinh") {
                vtkt = i;

                daiMain = "bd";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "bihdih") {
                vtkt = i;

                daiMain = "bd";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "binhdih") {
                vtkt = i;

                daiMain = "bd";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "travih") {
                vtkt = i;

                daiMain = "tv";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "vlong") {
                vtkt = i;

                daiMain = "vl";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (
                dai === "dphu" ||
                dai === "daiphu" ||
                dai === "dph" ||
                (dai === "phu" &&
                    contentTmp[i + 1] !== "y" &&
                    contentTmp[i + 1] !== "i") ||
                dai === "daiph" ||
                dai === "daip"
            ) {
                vtkt = i;

                daiMain = "dp";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (
                dai === "dch" ||
                dai === "chanh" ||
                dai === "chinh" ||
                dai === "chah" ||
                dai === "chih" ||
                dai === "daich" ||
                dai === "daichinh" ||
                dai === "daichih" ||
                dai === "daichin" ||
                dai === "daichi" ||
                dai === "daichanh" ||
                dai === "daichah" ||
                dai === "daicha" ||
                dai === "daic" ||
                dai === "dchinh" ||
                dai === "dchih" ||
                dai === "dchin" ||
                dai === "dchi" ||
                dai === "dchanh" ||
                dai === "dcha" ||
                dai === "dchah"
            ) {
                vtkt = i;

                daiMain = "dc";

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (listDai.includes(dai)) {
                vtkt = i;

                if (
                    dai === "thanhpho" ||
                    dai === "tpho" ||
                    dai === "tph" ||
                    dai === "thpho" ||
                    dai === "thph" ||
                    dai === "thp"
                ) {
                    daiMain = "tp";
                } else if (
                    dai === "dongthap" ||
                    dai === "dthap" ||
                    dai === "dth"
                ) {
                    daiMain = "dt";
                } else if (dai === "camau" || dai === "cmau") {
                    daiMain = "cm";
                } else if (
                    dai === "bentr" ||
                    dai === "bentre" ||
                    dai === "btre"
                ) {
                    daiMain = "br";
                } else if (
                    dai === "vugtau" ||
                    dai === "vugt" ||
                    dai === "vungt" ||
                    dai === "vungtau" ||
                    dai === "vtau"
                ) {
                    daiMain = "vt";
                } else if (
                    dai === "bacl" ||
                    dai === "baclieu" ||
                    dai === "blieu" ||
                    dai === "bliu" ||
                    dai === "bacliu"
                ) {
                    daiMain = "bi";
                } else if (
                    dai === "dgnai" ||
                    dai === "dogn" ||
                    dai === "dognai" ||
                    dai === "dongn" ||
                    dai === "dongnai" ||
                    dai === "dnai"
                ) {
                    daiMain = "dn";
                } else if (
                    dai === "cantho" ||
                    dai === "ctho" ||
                    dai === "canth" ||
                    dai === "cth"
                ) {
                    daiMain = "ct";
                } else if (
                    dai === "soctrang" ||
                    dai === "strang" ||
                    dai === "stran" ||
                    dai === "soctran" ||
                    dai === "strag" ||
                    dai === "soctrag"
                ) {
                    daiMain = "st";
                } else if (dai === "tayninh" || dai === "tninh") {
                    daiMain = "tn";
                } else if (
                    dai === "angiang" ||
                    dai === "agiang" ||
                    dai === "ang" ||
                    dai === "angian" ||
                    dai === "agian"
                ) {
                    daiMain = "ag";
                } else if (
                    dai === "bihthuan" ||
                    dai === "bihth" ||
                    dai === "binhth" ||
                    dai === "binhthuan" ||
                    dai === "bthuan" ||
                    dai === "bth"
                ) {
                    daiMain = "bt";
                } else if (
                    dai === "bihduong" ||
                    dai === "bihduon" ||
                    dai === "bihduog" ||
                    dai === "binhduog" ||
                    dai === "bduog" ||
                    dai === "binhduon" ||
                    dai === "bduon" ||
                    dai === "binhduong" ||
                    dai === "bduong"
                ) {
                    daiMain = "bu";
                } else if (
                    dai === "vinhlong" ||
                    dai === "vlong" ||
                    dai === "vlon" ||
                    dai === "vinhlon" ||
                    dai === "vihlon" ||
                    dai === "vihlong"
                ) {
                    daiMain = "vl";
                } else if (
                    dai === "trvih" ||
                    dai === "travih" ||
                    dai === "travinh" ||
                    dai === "tvinh" ||
                    dai === "trvinh"
                ) {
                    daiMain = "tv";
                } else if (
                    dai === "logan" ||
                    dai === "loga" ||
                    dai === "longan" ||
                    dai === "lan" ||
                    dai === "lonan" ||
                    dai === "longa"
                ) {
                    daiMain = "la";
                } else if (
                    dai === "bph" ||
                    dai === "bihph" ||
                    dai === "bihphuoc" ||
                    dai === "binhph" ||
                    dai === "binhphuoc" ||
                    dai === "bphuoc"
                ) {
                    daiMain = "bp";
                } else if (
                    dai === "haugiag" ||
                    dai === "haugiang" ||
                    dai === "hgiang" ||
                    dai === "haugian" ||
                    dai === "hgian"
                ) {
                    daiMain = "hg";
                } else if (
                    dai === "tiengiang" ||
                    dai === "tgiang" ||
                    dai === "tiengiag" ||
                    dai === "tgiag" ||
                    dai === "tgi" ||
                    dai === "tiengian" ||
                    dai === "tgian"
                ) {
                    daiMain = "tg";
                } else if (
                    dai === "kiengiag" ||
                    dai === "kgiag" ||
                    dai === "kiengiang" ||
                    dai === "kgiang" ||
                    dai === "kgi" ||
                    dai === "kiengian" ||
                    dai === "kgian"
                ) {
                    daiMain = "kg";
                } else if (dai === "dalat" || dai === "dlat") {
                    daiMain = "lt";
                } else if (
                    dai === 'phuin' ||
                    dai === 'phuien' ||
                    dai === 'pien' ||
                    dai === "phuy" ||
                    dai === "phy" ||
                    dai === "phuyen" ||
                    dai === "pyen"
                ) {
                    daiMain = "py";
                } else if (
                    dai === "thuathienhue" ||
                    dai === "thhue" ||
                    dai === "tthue" ||
                    dai === "hue" ||
                    dai === "tth"
                ) {
                    daiMain = "hu";
                } else if (
                    dai === "dlac" ||
                    dai === "dlak" ||
                    dai === "daklak" ||
                    dai === "daclac" ||
                    dai === "daclak" ||
                    dai === "daklac"
                ) {
                    daiMain = "dl";
                } else if (
                    dai === "quagnam" ||
                    dai === "quangnam" ||
                    dai === "qnam"
                ) {
                    daiMain = "qn";
                } else if (
                    dai === "danag" ||
                    dai === "dnag" ||
                    dai === "danang" ||
                    dai === "dnang" ||
                    dai === "danan" ||
                    dai === "dnan"
                ) {
                    daiMain = "dg";
                } else if (
                    dai === "khanhhoa" ||
                    dai === "khoa" ||
                    dai === "khhoa"
                ) {
                    daiMain = "kh";
                } else if (
                    dai === "quagbih" ||
                    dai === "quagbinh" ||
                    dai === "quanbih" ||
                    dai === "quanbinh" ||
                    dai === "quangbih" ||
                    dai === "qbih" ||
                    dai === "quangbinh" ||
                    dai === "qbinh"
                ) {
                    daiMain = "qb";
                } else if (
                    dai === "bihdih" ||
                    dai === "bihdinh" ||
                    dai === "binhdih" ||
                    dai === "binhdinh" ||
                    dai === "bdinh" ||
                    dai === "bdi" ||
                    dai === "bdih"
                ) {
                    daiMain = "bd";
                } else if (
                    dai === "quagtr" ||
                    dai === "quagtri" ||
                    dai === "quantr" ||
                    dai === "quantri" ||
                    dai === "quangtr" ||
                    dai === "qtr" ||
                    dai === "quangtri" ||
                    dai === "qtri"
                ) {
                    daiMain = "qt";
                } else if (dai === "gialai" || dai === "glai") {
                    daiMain = "gl";
                } else if (
                    dai === "ninhth" ||
                    dai === "nihthuan" ||
                    dai === "nihth" ||
                    dai === "nith" ||
                    dai === "nithuan" ||
                    dai === "nth" ||
                    dai === "ninhth" ||
                    dai === "ninhthuan" ||
                    dai === "nthuan"
                ) {
                    daiMain = "nt";
                } else if (
                    dai === "quagngai" ||
                    dai === "quagng" ||
                    dai === "quangng" ||
                    dai === "quangai" ||
                    dai === "quangngai" ||
                    dai === "qngai" ||
                    dai === "quanngai"
                ) {
                    daiMain = "qg";
                } else if (
                    dai === "dacnog" ||
                    dai === "daknog" ||
                    dai === "dnog" ||
                    dai === "dacnong" ||
                    dai === "daknong" ||
                    dai === "dnong" ||
                    dai === "dno" ||
                    dai === "dacnon" ||
                    dai === "daknon" ||
                    dai === "dnon"
                ) {
                    daiMain = "do";
                } else if (
                    dai === "kontum" ||
                    dai === "kontom" ||
                    dai === "ktum" ||
                    dai === "ktom"
                ) {
                    daiMain = "kt";
                }

                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === "hoa") {
                vtkt = i;
                console.log("vtbd: ", contentTmp.slice(0, vtbd));
                console.log("vtkt: ", contentTmp.slice(vtkt + 1));
                contentTmp =
                    contentTmp.slice(0, vtbd) + contentTmp.slice(vtkt + 1);

                i = vtbd - 3 + 1;
                length = contentTmp.length;

                dai = "";
                bDai = false;
            } else if (
                !(
                    dai.includes("dao") ||
                    dai.includes("dat") ||
                    dai.includes("dathang") ||
                    dai.includes("dav") ||
                    dai.includes("dv") ||
                    dai.includes("davong") ||
                    dai.includes("dath") ||
                    dai.includes("dth") ||
                    dai.includes("dthang") ||
                    dai.includes("daxien") ||
                    dai.includes("dxien") ||
                    dai.includes("đat") ||
                    dai.includes("dax") ||
                    dai.includes("blo") ||
                    dai.includes("blô") ||
                    dai.includes("baolo") ||
                    dai.includes("bao") ||
                    dai.includes("baol") ||
                    dai.includes("baolô") ||
                    dai.includes("dlo") ||
                    dai.includes("lod") ||
                    dai.includes("dbl") ||
                    dai.includes("đbl") ||
                    dai.includes("dblo") ||
                    dai.includes("đblô") ||
                    dai.includes("daobaolo") ||
                    dai.includes("daobaolô") ||
                    dai.includes("blodao") ||
                    dai.includes("daoblo") ||
                    dai.includes("baolodao") ||
                    dai.includes("daobaolo") ||
                    dai.includes("bldao") ||
                    dai.includes("daobl") ||
                    dai.includes("bdao") ||
                    dai.includes("daob") ||
                    dai.includes("baoldao") ||
                    dai.includes("daobaol") ||
                    dai.includes("baodao") ||
                    dai.includes("daobao") ||
                    dai.includes("daolo") ||
                    dai.includes("lodao") ||
                    dai.includes("bđao") ||
                    dai.includes("bld") ||
                    dai.includes("dauduoi") ||
                    dai.includes("daudui") ||
                    dai.includes("daud") ||
                    dai.includes("ddui") ||
                    dai.includes("dduoi") ||
                    dai.includes("đâuđuôi") ||
                    dai.includes("đầuđuôi") ||
                    dai.includes("đauđuôi") ||
                    dai.includes("xiuchu") ||
                    dai.includes("xiuch") ||
                    dai.includes("xiuc") ||
                    dai.includes("xiu") ||
                    dai.includes("xiudau") ||
                    dai.includes("xiudui") ||
                    dai.includes("xiuduoi") ||
                    dai.includes("xiud") ||
                    dai.includes("xiudao") ||
                    dai.includes("xiuddau") ||
                    dai.includes("xiudaud") ||
                    dai.includes("xiudaodau") ||
                    dai.includes("xiudaudao") ||
                    dai.includes("xiudduoi") ||
                    dai.includes("xiuduoid") ||
                    dai.includes("xiudaoduoi") ||
                    dai.includes("xiuduoidao") ||
                    dai.includes("xch") ||
                    dai.includes("xchu") ||
                    dai.includes("siuchu") ||
                    dai.includes("siuch") ||
                    dai.includes("siuc") ||
                    dai.includes("sch") ||
                    dai.includes("schu") ||
                    dai.includes("xdau") ||
                    dai.includes("xcdau") ||
                    dai.includes("xchdau") ||
                    dai.includes("xchudau") ||
                    dai.includes("xiuchudau") ||
                    dai.includes("xiuchdau") ||
                    dai.includes("xiucdau") ||
                    dai.includes("xđau") ||
                    dai.includes("xcđau") ||
                    dai.includes("xiuchuđau") ||
                    dai.includes("sdau") ||
                    dai.includes("scdau") ||
                    dai.includes("schdau") ||
                    dai.includes("schudau") ||
                    dai.includes("siuchudau") ||
                    dai.includes("siuchdau") ||
                    dai.includes("siucdau") ||
                    dai.includes("sđau") ||
                    dai.includes("scđau") ||
                    dai.includes("siuchuđau") ||
                    dai.includes("xduoi") ||
                    dai.includes("xcduoi") ||
                    dai.includes("xchduoi") ||
                    dai.includes("xchuduoi") ||
                    dai.includes("xiuchuduoi") ||
                    dai.includes("xiuchduoi") ||
                    dai.includes("xiucduoi") ||
                    dai.includes("xduoi") ||
                    dai.includes("xcduoi") ||
                    dai.includes("xiuchuduoi") ||
                    dai.includes("xdui") ||
                    dai.includes("xcdui") ||
                    dai.includes("xchdui") ||
                    dai.includes("xchudui") ||
                    dai.includes("xiuchudui") ||
                    dai.includes("xiuchdui") ||
                    dai.includes("xiucdui") ||
                    dai.includes("xdui") ||
                    dai.includes("xcdui") ||
                    dai.includes("xiuchudui") ||
                    dai.includes("sduoi") ||
                    dai.includes("scduoi") ||
                    dai.includes("schduoi") ||
                    dai.includes("schuduoi") ||
                    dai.includes("siuchuduoi") ||
                    dai.includes("siuchduoi") ||
                    dai.includes("siucduoi") ||
                    dai.includes("sduoi") ||
                    dai.includes("scduoi") ||
                    dai.includes("siuchuduoi") ||
                    dai.includes("sdui") ||
                    dai.includes("scdui") ||
                    dai.includes("schdui") ||
                    dai.includes("schudui") ||
                    dai.includes("siuchudui") ||
                    dai.includes("siuchdui") ||
                    dai.includes("siucdui") ||
                    dai.includes("sdui") ||
                    dai.includes("scdui") ||
                    dai.includes("siuchudui") ||
                    dai.includes("daoxc") ||
                    dai.includes("daox") ||
                    dai.includes("dxchu") ||
                    dai.includes("dxc") ||
                    dai.includes("xdao") ||
                    dai.includes("xcdao") ||
                    dai.includes("xiuchudao") ||
                    dai.includes("xchudao") ||
                    dai.includes("xchdao") ||
                    dai.includes("xiucdao") ||
                    dai.includes("xiuchdao") ||
                    dai.includes("xcd") ||
                    dai.includes("xiuchud") ||
                    dai.includes("xchud") ||
                    dai.includes("xchd") ||
                    dai.includes("xiucd") ||
                    dai.includes("xiuchd") ||
                    dai.includes("đaoxc") ||
                    dai.includes("đaox") ||
                    dai.includes("đxchu") ||
                    dai.includes("đxc") ||
                    dai.includes("xđao") ||
                    dai.includes("xcđ") ||
                    dai.includes("xcđao") ||
                    dai.includes("xiuchuđao") ||
                    dai.includes("daox") ||
                    dai.includes("daoxc") ||
                    dai.includes("daoxiuchu") ||
                    dai.includes("daoxchu") ||
                    dai.includes("daoxch") ||
                    dai.includes("daoxiuc") ||
                    dai.includes("daoxiuch") ||
                    dai.includes("dxc") ||
                    dai.includes("dxiuchu") ||
                    dai.includes("dxchu") ||
                    dai.includes("dxch") ||
                    dai.includes("dxiuc") ||
                    dai.includes("dxiuch") ||
                    dai.includes("daosc") ||
                    dai.includes("daos") ||
                    dai.includes("dschu") ||
                    dai.includes("dsc") ||
                    dai.includes("sdao") ||
                    dai.includes("scdao") ||
                    dai.includes("siuchudao") ||
                    dai.includes("schudao") ||
                    dai.includes("schdao") ||
                    dai.includes("siucdao") ||
                    dai.includes("siuchdao") ||
                    dai.includes("scd") ||
                    dai.includes("siuchud") ||
                    dai.includes("schud") ||
                    dai.includes("schd") ||
                    dai.includes("siucd") ||
                    dai.includes("siuchd") ||
                    dai.includes("đaosc") ||
                    dai.includes("đaos") ||
                    dai.includes("đschu") ||
                    dai.includes("đsc") ||
                    dai.includes("sđao") ||
                    dai.includes("scđ") ||
                    dai.includes("scđao") ||
                    dai.includes("siuchuđao") ||
                    dai.includes("daos") ||
                    dai.includes("daosc") ||
                    dai.includes("daosiuchu") ||
                    dai.includes("daoschu") ||
                    dai.includes("daosch") ||
                    dai.includes("daosiuc") ||
                    dai.includes("daosiuch") ||
                    dai.includes("dsc") ||
                    dai.includes("dsiuchu") ||
                    dai.includes("dschu") ||
                    dai.includes("dsch") ||
                    dai.includes("dsiuc") ||
                    dai.includes("dsiuch") ||
                    dai.includes("dau") ||
                    dai.includes("duoi") ||
                    dai.includes("đuôi") ||
                    dai.includes("duôi") ||
                    dai.includes("đuoi") ||
                    dai.includes("dui") ||
                    dai.includes("đui") ||
                    dai.includes("daoxcdau") ||
                    dai.includes("daoxdau") ||
                    dai.includes("dxchudau") ||
                    dai.includes("dxdau") ||
                    dai.includes("dxcdau") ||
                    dai.includes("xddau") ||
                    dai.includes("xdaodau") ||
                    dai.includes("xcdaodau") ||
                    dai.includes("xiuchudaodau") ||
                    dai.includes("xchudaodau") ||
                    dai.includes("xchdaodau") ||
                    dai.includes("xiucdaodau") ||
                    dai.includes("xiuchdaodau") ||
                    dai.includes("xcddau") ||
                    dai.includes("xiuchuddau") ||
                    dai.includes("xchuddau") ||
                    dai.includes("xchddau") ||
                    dai.includes("xiucddau") ||
                    dai.includes("xiuchddau") ||
                    dai.includes("đaoxcdau") ||
                    dai.includes("đaoxdau") ||
                    dai.includes("đxchudau") ||
                    dai.includes("đxdau") ||
                    dai.includes("đxcdau") ||
                    dai.includes("xđdau") ||
                    dai.includes("xđaodau") ||
                    dai.includes("xcđdau") ||
                    dai.includes("xcđaodau") ||
                    dai.includes("xiuchuđaodau") ||
                    dai.includes("daoxdau") ||
                    dai.includes("daoxcdau") ||
                    dai.includes("daoxiuchudau") ||
                    dai.includes("daoxchudau") ||
                    dai.includes("daoxchdau") ||
                    dai.includes("daoxiucdau") ||
                    dai.includes("daoxiuchdau") ||
                    dai.includes("dxcdau") ||
                    dai.includes("dxiuchudau") ||
                    dai.includes("dxchudau") ||
                    dai.includes("dxchdau") ||
                    dai.includes("dxiucdau") ||
                    dai.includes("dxiuchdau") ||
                    dai.includes("daoscdau") ||
                    dai.includes("daosdau") ||
                    dai.includes("dschudau") ||
                    dai.includes("dsdau") ||
                    dai.includes("dscdau") ||
                    dai.includes("sddau") ||
                    dai.includes("sdaodau") ||
                    dai.includes("scdaodau") ||
                    dai.includes("siuchudaodau") ||
                    dai.includes("schudaodau") ||
                    dai.includes("schdaodau") ||
                    dai.includes("siucdaodau") ||
                    dai.includes("siuchdaodau") ||
                    dai.includes("scddau") ||
                    dai.includes("siuchuddau") ||
                    dai.includes("schuddau") ||
                    dai.includes("schddau") ||
                    dai.includes("siucddau") ||
                    dai.includes("siuchddau") ||
                    dai.includes("đaoscdau") ||
                    dai.includes("đaosdau") ||
                    dai.includes("đschudau") ||
                    dai.includes("đsdau") ||
                    dai.includes("đscdau") ||
                    dai.includes("sđdau") ||
                    dai.includes("sđaodau") ||
                    dai.includes("scđdau") ||
                    dai.includes("scđaodau") ||
                    dai.includes("siuchuđaodau") ||
                    dai.includes("daosdau") ||
                    dai.includes("daoscdau") ||
                    dai.includes("daosiuchudau") ||
                    dai.includes("daoschudau") ||
                    dai.includes("daoschdau") ||
                    dai.includes("daosiucdau") ||
                    dai.includes("daosiuchdau") ||
                    dai.includes("dscdau") ||
                    dai.includes("dsiuchudau") ||
                    dai.includes("dschudau") ||
                    dai.includes("dschdau") ||
                    dai.includes("dsiucdau") ||
                    dai.includes("dsiuchdau") ||
                    dai.includes("xcdaudao") ||
                    dai.includes("xiuchudaudao") ||
                    dai.includes("xchudaudao") ||
                    dai.includes("xcdaud") ||
                    dai.includes("xiuchudaud") ||
                    dai.includes("xchudaud") ||
                    dai.includes("scdaudao") ||
                    dai.includes("siuchudaudao") ||
                    dai.includes("schudaudao") ||
                    dai.includes("scdaud") ||
                    dai.includes("siuchudaud") ||
                    dai.includes("schudaud") ||
                    dai.includes("daoxcduoi") ||
                    dai.includes("daoxduoi") ||
                    dai.includes("dxchuduoi") ||
                    dai.includes("dxduoi") ||
                    dai.includes("dxcduoi") ||
                    dai.includes("xdduoi") ||
                    dai.includes("xdaoduoi") ||
                    dai.includes("xcdaoduoi") ||
                    dai.includes("xiuchudaoduoi") ||
                    dai.includes("xchudaoduoi") ||
                    dai.includes("xchdaoduoi") ||
                    dai.includes("xiucdaoduoi") ||
                    dai.includes("xiuchdaoduoi") ||
                    dai.includes("xcdduoi") ||
                    dai.includes("xiuchudduoi") ||
                    dai.includes("xchudduoi") ||
                    dai.includes("xchdduoi") ||
                    dai.includes("xiucdduoi") ||
                    dai.includes("xiuchdduoi") ||
                    dai.includes("đaoxcduoi") ||
                    dai.includes("đaoxduoi") ||
                    dai.includes("đxchuduoi") ||
                    dai.includes("đxduoi") ||
                    dai.includes("đxcduoi") ||
                    dai.includes("xđduoi") ||
                    dai.includes("xđaoduoi") ||
                    dai.includes("xcđduoi") ||
                    dai.includes("xcđaoduoi") ||
                    dai.includes("xiuchuđaoduoi") ||
                    dai.includes("daoxduoi") ||
                    dai.includes("daoxcduoi") ||
                    dai.includes("daoxiuchuduoi") ||
                    dai.includes("daoxchuduoi") ||
                    dai.includes("daoxchduoi") ||
                    dai.includes("daoxiucduoi") ||
                    dai.includes("daoxiuchduoi") ||
                    dai.includes("dxcduoi") ||
                    dai.includes("dxiuchuduoi") ||
                    dai.includes("dxchuduoi") ||
                    dai.includes("dxchduoi") ||
                    dai.includes("dxiucduoi") ||
                    dai.includes("dxiuchduoi") ||
                    dai.includes("daoscduoi") ||
                    dai.includes("daosduoi") ||
                    dai.includes("dschuduoi") ||
                    dai.includes("dsduoi") ||
                    dai.includes("dscduoi") ||
                    dai.includes("sdduoi") ||
                    dai.includes("sdaoduoi") ||
                    dai.includes("scdaoduoi") ||
                    dai.includes("siuchudaoduoi") ||
                    dai.includes("schudaoduoi") ||
                    dai.includes("schdaoduoi") ||
                    dai.includes("siucdaoduoi") ||
                    dai.includes("siuchdaoduoi") ||
                    dai.includes("scdduoi") ||
                    dai.includes("siuchudduoi") ||
                    dai.includes("schudduoi") ||
                    dai.includes("schdduoi") ||
                    dai.includes("siucdduoi") ||
                    dai.includes("siuchdduoi") ||
                    dai.includes("đaoscduoi") ||
                    dai.includes("đaosduoi") ||
                    dai.includes("đschuduoi") ||
                    dai.includes("đsduoi") ||
                    dai.includes("đscduoi") ||
                    dai.includes("sđduoi") ||
                    dai.includes("sđaoduoi") ||
                    dai.includes("scđduoi") ||
                    dai.includes("scđaoduoi") ||
                    dai.includes("siuchuđaoduoi") ||
                    dai.includes("daosduoi") ||
                    dai.includes("daoscduoi") ||
                    dai.includes("daosiuchuduoi") ||
                    dai.includes("daoschuduoi") ||
                    dai.includes("daoschduoi") ||
                    dai.includes("daosiucduoi") ||
                    dai.includes("daosiuchduoi") ||
                    dai.includes("dscduoi") ||
                    dai.includes("dsiuchuduoi") ||
                    dai.includes("dschuduoi") ||
                    dai.includes("dschduoi") ||
                    dai.includes("dsiucduoi") ||
                    dai.includes("dsiuchduoi") ||
                    dai.includes("xcduoidao") ||
                    dai.includes("xiuchuduoidao") ||
                    dai.includes("xchuduoidao") ||
                    dai.includes("xcduoid") ||
                    dai.includes("xiuchuduoid") ||
                    dai.includes("xchuduoid") ||
                    dai.includes("scduoidao") ||
                    dai.includes("siuchuduoidao") ||
                    dai.includes("schuduoidao") ||
                    dai.includes("scduoid") ||
                    dai.includes("siuchuduoid") ||
                    dai.includes("schuduoid") ||
                    dai.includes("baylo") ||
                    dai.includes("baobay") ||
                    dai.includes("baobaylo") ||
                    dai.includes("baylod") ||
                    dai.includes("baobayd") ||
                    dai.includes("baobaylod") ||
                    dai.includes("baylodao") ||
                    dai.includes("baobaydao") ||
                    dai.includes("baobaylodao") ||
                    dai.includes("dbaylo") ||
                    dai.includes("dbaobay") ||
                    dai.includes("dbaobaylo") ||
                    dai.includes("daobaylo") ||
                    dai.includes("daobaobay") ||
                    dai.includes("daobaobaylo") ||
                    dai.includes("tamlo") ||
                    dai.includes("baotam") ||
                    dai.includes("baotamlo") ||
                    dai.includes("tamlod") ||
                    dai.includes("baotamd") ||
                    dai.includes("baotamlod") ||
                    dai.includes("tamlodao") ||
                    dai.includes("baotamdao") ||
                    dai.includes("baotamlodao") ||
                    dai.includes("dtamlo") ||
                    dai.includes("dbaotam") ||
                    dai.includes("dbaotamlo") ||
                    dai.includes("daotamlo") ||
                    dai.includes("daobaotam") ||
                    dai.includes("daobaotamlo") ||
                    dai.includes("xdaudao") ||
                    dai.includes("xdaud") ||
                    dai.includes("xdaodau") ||
                    dai.includes("xddau") ||
                    dai.includes("xduidao") ||
                    dai.includes("xduoidao") ||
                    dai.includes("xduid") ||
                    dai.includes("xduoid") ||
                    dai.includes("xdaodui") ||
                    dai.includes("xdaoduoi") ||
                    dai.includes("xddui") ||
                    dai.includes("xdduoi")
                )
            ) {
                vtkt = i;
                daiMain = dai.match(/.{2}/g);

                // eslint-disable-next-line no-loop-func
                daiMain = daiMain.map((d) => {
                    if (d === "dl" && mien === "mn" && dayOfWeek === 1) {
                        return "lt";
                    }

                    if (d === "bd" && mien === "mn" && dayOfWeek === 6) {
                        return "bu";
                    }

                    if (d === "qn" && mien === "mt" && dayOfWeek === 7) {
                        return "qg";
                    }

                    if (d === "bt" && dayOfWeek === 3) {
                        return "br";
                    }

                    if (d === "dn" && mien === "mt") {
                        return "dg";
                    }

                    return d;
                });

                daiMain = daiMain.join(".");

                const lengthTmp = daiMain.length;
                contentTmp =
                    contentTmp.slice(0, vtbd) +
                    daiMain +
                    contentTmp.slice(vtkt);

                i = vtbd + lengthTmp;
                length = contentTmp.length;

                bDai = false;
            } else {
                bDai = false;
            }
        } else if (
            (contentTmp[i] === "." || isFinite(Number(contentTmp[i]))) &&
            dai.length === 2 &&
            searchChars.includes(dai)
        ) {
            vtkt = i;

            daiMain = dai;

            if (dai === "dl" && mien === "mn" && dayOfWeek === 1) {
                daiMain = "lt";
            }

            if (dai === "bd" && mien === "mn" && dayOfWeek === 6) {
                daiMain = "bu";
            }

            if (dai === "qn" && mien === "mt" && dayOfWeek === 7) {
                daiMain = "qg";
            }

            if (dai === "bt" && dayOfWeek === 3) {
                daiMain = "br";
            }

            if (dai === "dn" && mien === "mt") {
                daiMain = "dg";
            }

            if (dai === "hd") {
                daiMain = "2d";
            }

            contentTmp =
                contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

            i = vtbd + 1;
            length = contentTmp.length;

            bDai = true;
        }

        if (
            isFinite(Number(contentTmp[i])) ||
            (contentTmp[i] === "." && isFinite(Number(contentTmp[i + 1])))
        ) {
            dai = "";
            vtbd = 0;
            fVtbd = true;
        }

        if (bDai) {
            dai = "";
            vtbd = 0;
            fVtbd = true;

            vtkt = 0;

            bDai = false;
        }
    }

    return contentTmp;
}

export default handleConvertSymbol;
