let listDai = [
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
    "haid",
    "bad",
    "bond",
    "tud",
    "hcm",
    "btr",
    "dlk",
    "bihdinh",
    "bihdih",
    "binhdih",
    "travih",
    "vlong",
    "dphu",
    "daiphu",
    "dph",
    "phu",
    "daiph",
    "daip",
    "dch",
    "chanh",
    "chinh",
    "daich",
    "daichinh",
    "daichih",
    "daichin",
    "daichi",
    "daichanh",
    "daichah",
    "daicha",
    "daic",
    "dchinh",
    "dchih",
    "dchin",
    "dchi",
    "dchanh",
    "dcha",
    "dchah",
    "dng",
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
    "soctran",
    "strag",
    "soctrag",
    "tayninh",
    "tninh",
    "angiang",
    "ang",
    "agiang",
    "angian",
    "agian",
    "binhthuan",
    "bthuan",
    "bihthuan",
    "bihth",
    "binhth",
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
    "bph",
    "bihph",
    "bihphuoc",
    "binhph",
    "bphuoc",
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
    "quangbinh",
    "quagbih",
    "quagbinh",
    "quanbih",
    "quanbinh",
    "quangbih",
    "qbih",
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
    "ninhthuan",
    "ninhth",
    "nihthuan",
    "nihth",
    "nith",
    "nithuan",
    "nth",
    "ninhth",
    "nthuan",
    "quangngai",
    "quagngai",
    "quagng",
    "quangng",
    "quangai",
    "quanngai",
    "qngai",
    "dacnong",
    "dacnog",
    "dnog",
    "daknog",
    "dnong",
    "dno",
    "daknong",
    "dacnon",
    "dnon",
    "daknon",
    "kontum",
    "ktum",
    "ktom",
    "kontom",
];

function shortenText(content) {
    let contentTmp = content.toLowerCase();
    
    contentTmp = contentTmp
        .replace(/đ/g, "d")
        .replace(/ă/g, "a")
        .replace(/â/g, "a")
        .replace(/ư/g, "u")
        .replace(/ơ/g, "o")
        .replace(/ô/g, "o")
        .replace(/ê/g, "e")
        .replace(/…/g, ".")
        .replace(/-/g, ".")
        .replace(/_/g, ".")
        .replace(/~/g, ".")
        .replace(/`/g, ".")
        .replace(/@/g, ".")
        .replace(/#/g, ".")
        .replace(/\$/g, ".")
        .replace(/%/g, ".")
        .replace(/\^/g, ".")
        .replace(/&/g, ".")
        .replace(/\*/g, ".")
        .replace(/\(/g, ".")
        .replace(/\)/g, ".")
        .replace(/\//g, ".")
        .replace(/\\/g, ".")
        .replace(/\{/g, ".")
        .replace(/\}/g, ".")
        .replace(/\[/g, ".")
        .replace(/\]/g, ".")
        .replace(/!/g, ".")
        .replace(/'/g, ".")
        .replace(/"/g, ".")
        .replace(/</g, ".")
        .replace(/>/g, ".")
        .replace(/\?/g, ".")
        .replace(/\|/g, ".")
        .replace(/₫/g, "đ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/dai/g, "d")
        .replace(/(?<!\d)2da/g, "2d")
        .replace(/(?<!\d)3da/g, "3d")
        .replace(/(?<!\d)4da/g, "4d")
        .replace(
            /[^a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ.,;:+=s+\r\t\s]/g,
            ""
        )
        .replace(/[\r\n]+/g, ".")
        .replace(/[\t\n]+/g, ".")
        .replace(/\s+/g, ".")
        .replace(/[.,:;+= ]/g, ".")
        .replace(/-/g, ".")
        .replace(/(\d)\s*nghìn/g, "$1.")
        .replace(/(\d)\s*nghin/g, "$1.")
        .replace(/(\d)\s*ngàn/g, "$1.")
        .replace(/(\d)\s*ngan/g, "$1.")
        .replace(/(\d)\s*ng/g, "$1.")
        .replace(/(\d)\s*n/g, "$1.")
        .replace(/\.{2,}/g, ".")
        .replace(/^\.+/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    let index = contentTmp.indexOf("ng");

    while (index !== -1) {
        if (
            isFinite(Number(contentTmp[index - 2])) &&
            contentTmp[index - 1] === "." &&
            contentTmp[index + 2] === "."
        ) {
            contentTmp =
                contentTmp.slice(0, index) + contentTmp.slice(index + 2);
        }

        index = contentTmp.indexOf("ng", index + 2);
    }

    index = contentTmp.indexOf("n");

    while (index !== -1) {
        if (
            isFinite(Number(contentTmp[index - 2])) &&
            contentTmp[index - 1] === "." &&
            (contentTmp[index + 1] !== "i" ||
                (contentTmp[index + 1] !== "." &&
                    contentTmp[index + 2] !== "i")) &&
            (contentTmp[index + 1] !== "t" ||
                (contentTmp[index + 1] !== "." &&
                    contentTmp[index + 2] !== "t")) &&
            contentTmp[index + 1] === "."
        ) {
            contentTmp =
                contentTmp.slice(0, index) + contentTmp.slice(index + 1);
        }

        index = contentTmp.indexOf("n", index + 1);
    }

    contentTmp = contentTmp
        .replace(/nghin/g, ".")
        .replace(/ngan/g, ".")
        .replace(/\.{2,}/g, ".");

    index = contentTmp.indexOf("k");
    while (index !== -1) {
        if (
            (contentTmp[index + 1] !== "." &&
                !isFinite(Number(contentTmp[index + 1]))) ||
            (contentTmp[index - 1] !== "." &&
                !isFinite(Number(contentTmp[index - 1])))
        ) {
            index = contentTmp.indexOf("k", index + 1);
            continue;
        }

        if (contentTmp[index + 1] === "e" && contentTmp[index + 2] === "o") {
            index = contentTmp.indexOf("k", index + 1);
            continue;
        }

        if (!isFinite(Number(contentTmp[index + 2]))) {
            let kdanhS = "";
            let kt = false;

            for (let j = index + 1; j < contentTmp.length; j++) {
                if (contentTmp[j] !== ".") {
                    kdanhS += contentTmp[j];
                }

                if (contentTmp[j] === "." && kdanhS !== "") {
                    console.log(kdanhS);

                    if (
                        !listDai.includes(kdanhS) &&
                        !(
                            kdanhS.includes("dx") ||
                            kdanhS.includes("davong") ||
                            kdanhS.includes("dav") ||
                            kdanhS.includes("dv") ||
                            kdanhS.includes("đx") ||
                            kdanhS.includes("đax") ||
                            kdanhS.includes("da") ||
                            kdanhS.includes("đa") ||
                            kdanhS.includes("dat") ||
                            kdanhS.includes("dathang") ||
                            kdanhS.includes("dath") ||
                            kdanhS.includes("dth") ||
                            kdanhS.includes("dthang") ||
                            kdanhS.includes("daxien") ||
                            kdanhS.includes("dxien") ||
                            kdanhS.includes("đat") ||
                            kdanhS.includes("dax") ||
                            kdanhS.includes("l") ||
                            kdanhS.includes("lo") ||
                            kdanhS.includes("b") ||
                            kdanhS.includes("bl") ||
                            kdanhS.includes("blo") ||
                            kdanhS.includes("blô") ||
                            kdanhS.includes("baolo") ||
                            kdanhS.includes("bao") ||
                            kdanhS.includes("baol") ||
                            kdanhS.includes("baolô") ||
                            kdanhS.includes("dl") ||
                            kdanhS.includes("dlo") ||
                            kdanhS.includes("ld") ||
                            kdanhS.includes("lod") ||
                            kdanhS.includes("db") ||
                            kdanhS.includes("đb") ||
                            kdanhS.includes("dbl") ||
                            kdanhS.includes("đbl") ||
                            kdanhS.includes("dblo") ||
                            kdanhS.includes("đblô") ||
                            kdanhS.includes("daobaolo") ||
                            kdanhS.includes("daobaolô") ||
                            kdanhS.includes("blodao") ||
                            kdanhS.includes("daoblo") ||
                            kdanhS.includes("baolodao") ||
                            kdanhS.includes("daobaolo") ||
                            kdanhS.includes("bldao") ||
                            kdanhS.includes("daobl") ||
                            kdanhS.includes("bdao") ||
                            kdanhS.includes("daob") ||
                            kdanhS.includes("baoldao") ||
                            kdanhS.includes("daobaol") ||
                            kdanhS.includes("baodao") ||
                            kdanhS.includes("daobao") ||
                            kdanhS.includes("daolo") ||
                            kdanhS.includes("lodao") ||
                            kdanhS.includes("bđao") ||
                            kdanhS.includes("bld") ||
                            kdanhS.includes("dd") ||
                            kdanhS.includes("đđ") ||
                            kdanhS.includes("dauduoi") ||
                            kdanhS.includes("daudui") ||
                            kdanhS.includes("daud") ||
                            kdanhS.includes("ddui") ||
                            kdanhS.includes("dduoi") ||
                            kdanhS.includes("đd") ||
                            kdanhS.includes("dđ") ||
                            kdanhS.includes("đâuđuôi") ||
                            kdanhS.includes("đầuđuôi") ||
                            kdanhS.includes("đauđuôi") ||
                            kdanhS.includes("x") ||
                            kdanhS.includes("xc") ||
                            kdanhS.includes("xiuchu") ||
                            kdanhS.includes("xiuch") ||
                            kdanhS.includes("xiuc") ||
                            kdanhS.includes("xiu") ||
                            kdanhS.includes("xiudau") ||
                            kdanhS.includes("xiudui") ||
                            kdanhS.includes("xiuduoi") ||
                            kdanhS.includes("xiud") ||
                            kdanhS.includes("xiudao") ||
                            kdanhS.includes("xiuddau") ||
                            kdanhS.includes("xiudaud") ||
                            kdanhS.includes("xiudaodau") ||
                            kdanhS.includes("xiudaudao") ||
                            kdanhS.includes("xiudduoi") ||
                            kdanhS.includes("xiuduoid") ||
                            kdanhS.includes("xiudaoduoi") ||
                            kdanhS.includes("xiuduoidao") ||
                            kdanhS.includes("xch") ||
                            kdanhS.includes("xchu") ||
                            kdanhS.includes("s") ||
                            kdanhS.includes("sc") ||
                            kdanhS.includes("siuchu") ||
                            kdanhS.includes("siuch") ||
                            kdanhS.includes("siuc") ||
                            kdanhS.includes("sch") ||
                            kdanhS.includes("schu") ||
                            kdanhS.includes("xdau") ||
                            kdanhS.includes("xcdau") ||
                            kdanhS.includes("xchdau") ||
                            kdanhS.includes("xchudau") ||
                            kdanhS.includes("xiuchudau") ||
                            kdanhS.includes("xiuchdau") ||
                            kdanhS.includes("xiucdau") ||
                            kdanhS.includes("xđau") ||
                            kdanhS.includes("xcđau") ||
                            kdanhS.includes("xiuchuđau") ||
                            kdanhS.includes("sdau") ||
                            kdanhS.includes("scdau") ||
                            kdanhS.includes("schdau") ||
                            kdanhS.includes("schudau") ||
                            kdanhS.includes("siuchudau") ||
                            kdanhS.includes("siuchdau") ||
                            kdanhS.includes("siucdau") ||
                            kdanhS.includes("sđau") ||
                            kdanhS.includes("scđau") ||
                            kdanhS.includes("siuchuđau") ||
                            kdanhS.includes("xduoi") ||
                            kdanhS.includes("xcduoi") ||
                            kdanhS.includes("xchduoi") ||
                            kdanhS.includes("xchuduoi") ||
                            kdanhS.includes("xiuchuduoi") ||
                            kdanhS.includes("xiuchduoi") ||
                            kdanhS.includes("xiucduoi") ||
                            kdanhS.includes("xduoi") ||
                            kdanhS.includes("xcduoi") ||
                            kdanhS.includes("xiuchuduoi") ||
                            kdanhS.includes("xdui") ||
                            kdanhS.includes("xcdui") ||
                            kdanhS.includes("xchdui") ||
                            kdanhS.includes("xchudui") ||
                            kdanhS.includes("xiuchudui") ||
                            kdanhS.includes("xiuchdui") ||
                            kdanhS.includes("xiucdui") ||
                            kdanhS.includes("xdui") ||
                            kdanhS.includes("xcdui") ||
                            kdanhS.includes("xiuchudui") ||
                            kdanhS.includes("sduoi") ||
                            kdanhS.includes("scduoi") ||
                            kdanhS.includes("schduoi") ||
                            kdanhS.includes("schuduoi") ||
                            kdanhS.includes("siuchuduoi") ||
                            kdanhS.includes("siuchduoi") ||
                            kdanhS.includes("siucduoi") ||
                            kdanhS.includes("sduoi") ||
                            kdanhS.includes("scduoi") ||
                            kdanhS.includes("siuchuduoi") ||
                            kdanhS.includes("sdui") ||
                            kdanhS.includes("scdui") ||
                            kdanhS.includes("schdui") ||
                            kdanhS.includes("schudui") ||
                            kdanhS.includes("siuchudui") ||
                            kdanhS.includes("siuchdui") ||
                            kdanhS.includes("siucdui") ||
                            kdanhS.includes("sdui") ||
                            kdanhS.includes("scdui") ||
                            kdanhS.includes("siuchudui") ||
                            kdanhS.includes("daoxc") ||
                            kdanhS.includes("daox") ||
                            kdanhS.includes("dxchu") ||
                            kdanhS.includes("dx") ||
                            kdanhS.includes("dxc") ||
                            kdanhS.includes("xd") ||
                            kdanhS.includes("xdao") ||
                            kdanhS.includes("xcdao") ||
                            kdanhS.includes("xiuchudao") ||
                            kdanhS.includes("xchudao") ||
                            kdanhS.includes("xchdao") ||
                            kdanhS.includes("xiucdao") ||
                            kdanhS.includes("xiuchdao") ||
                            kdanhS.includes("xcd") ||
                            kdanhS.includes("xiuchud") ||
                            kdanhS.includes("xchud") ||
                            kdanhS.includes("xchd") ||
                            kdanhS.includes("xiucd") ||
                            kdanhS.includes("xiuchd") ||
                            kdanhS.includes("đaoxc") ||
                            kdanhS.includes("đaox") ||
                            kdanhS.includes("đxchu") ||
                            kdanhS.includes("đx") ||
                            kdanhS.includes("đxc") ||
                            kdanhS.includes("xđ") ||
                            kdanhS.includes("xđao") ||
                            kdanhS.includes("xcđ") ||
                            kdanhS.includes("xcđao") ||
                            kdanhS.includes("xiuchuđao") ||
                            kdanhS.includes("daox") ||
                            kdanhS.includes("daoxc") ||
                            kdanhS.includes("daoxiuchu") ||
                            kdanhS.includes("daoxchu") ||
                            kdanhS.includes("daoxch") ||
                            kdanhS.includes("daoxiuc") ||
                            kdanhS.includes("daoxiuch") ||
                            kdanhS.includes("dxc") ||
                            kdanhS.includes("dxiuchu") ||
                            kdanhS.includes("dxchu") ||
                            kdanhS.includes("dxch") ||
                            kdanhS.includes("dxiuc") ||
                            kdanhS.includes("dxiuch") ||
                            kdanhS.includes("daosc") ||
                            kdanhS.includes("daos") ||
                            kdanhS.includes("dschu") ||
                            kdanhS.includes("ds") ||
                            kdanhS.includes("dsc") ||
                            kdanhS.includes("sd") ||
                            kdanhS.includes("sdao") ||
                            kdanhS.includes("scdao") ||
                            kdanhS.includes("siuchudao") ||
                            kdanhS.includes("schudao") ||
                            kdanhS.includes("schdao") ||
                            kdanhS.includes("siucdao") ||
                            kdanhS.includes("siuchdao") ||
                            kdanhS.includes("scd") ||
                            kdanhS.includes("siuchud") ||
                            kdanhS.includes("schud") ||
                            kdanhS.includes("schd") ||
                            kdanhS.includes("siucd") ||
                            kdanhS.includes("siuchd") ||
                            kdanhS.includes("đaosc") ||
                            kdanhS.includes("đaos") ||
                            kdanhS.includes("đschu") ||
                            kdanhS.includes("đs") ||
                            kdanhS.includes("đsc") ||
                            kdanhS.includes("sđ") ||
                            kdanhS.includes("sđao") ||
                            kdanhS.includes("scđ") ||
                            kdanhS.includes("scđao") ||
                            kdanhS.includes("siuchuđao") ||
                            kdanhS.includes("daos") ||
                            kdanhS.includes("daosc") ||
                            kdanhS.includes("daosiuchu") ||
                            kdanhS.includes("daoschu") ||
                            kdanhS.includes("daosch") ||
                            kdanhS.includes("daosiuc") ||
                            kdanhS.includes("daosiuch") ||
                            kdanhS.includes("dsc") ||
                            kdanhS.includes("dsiuchu") ||
                            kdanhS.includes("dschu") ||
                            kdanhS.includes("dsch") ||
                            kdanhS.includes("dsiuc") ||
                            kdanhS.includes("dsiuch") ||
                            kdanhS.includes("dau") ||
                            kdanhS.includes("duoi") ||
                            kdanhS.includes("đuôi") ||
                            kdanhS.includes("duôi") ||
                            kdanhS.includes("đuoi") ||
                            kdanhS.includes("dui") ||
                            kdanhS.includes("đui") ||
                            kdanhS.includes("d") ||
                            kdanhS.includes("daoxcdau") ||
                            kdanhS.includes("daoxdau") ||
                            kdanhS.includes("dxchudau") ||
                            kdanhS.includes("dxdau") ||
                            kdanhS.includes("dxcdau") ||
                            kdanhS.includes("xddau") ||
                            kdanhS.includes("xdaodau") ||
                            kdanhS.includes("xcdaodau") ||
                            kdanhS.includes("xiuchudaodau") ||
                            kdanhS.includes("xchudaodau") ||
                            kdanhS.includes("xchdaodau") ||
                            kdanhS.includes("xiucdaodau") ||
                            kdanhS.includes("xiuchdaodau") ||
                            kdanhS.includes("xcddau") ||
                            kdanhS.includes("xiuchuddau") ||
                            kdanhS.includes("xchuddau") ||
                            kdanhS.includes("xchddau") ||
                            kdanhS.includes("xiucddau") ||
                            kdanhS.includes("xiuchddau") ||
                            kdanhS.includes("đaoxcdau") ||
                            kdanhS.includes("đaoxdau") ||
                            kdanhS.includes("đxchudau") ||
                            kdanhS.includes("đxdau") ||
                            kdanhS.includes("đxcdau") ||
                            kdanhS.includes("xđdau") ||
                            kdanhS.includes("xđaodau") ||
                            kdanhS.includes("xcđdau") ||
                            kdanhS.includes("xcđaodau") ||
                            kdanhS.includes("xiuchuđaodau") ||
                            kdanhS.includes("daoxdau") ||
                            kdanhS.includes("daoxcdau") ||
                            kdanhS.includes("daoxiuchudau") ||
                            kdanhS.includes("daoxchudau") ||
                            kdanhS.includes("daoxchdau") ||
                            kdanhS.includes("daoxiucdau") ||
                            kdanhS.includes("daoxiuchdau") ||
                            kdanhS.includes("dxcdau") ||
                            kdanhS.includes("dxiuchudau") ||
                            kdanhS.includes("dxchudau") ||
                            kdanhS.includes("dxchdau") ||
                            kdanhS.includes("dxiucdau") ||
                            kdanhS.includes("dxiuchdau") ||
                            kdanhS.includes("daoscdau") ||
                            kdanhS.includes("daosdau") ||
                            kdanhS.includes("dschudau") ||
                            kdanhS.includes("dsdau") ||
                            kdanhS.includes("dscdau") ||
                            kdanhS.includes("sddau") ||
                            kdanhS.includes("sdaodau") ||
                            kdanhS.includes("scdaodau") ||
                            kdanhS.includes("siuchudaodau") ||
                            kdanhS.includes("schudaodau") ||
                            kdanhS.includes("schdaodau") ||
                            kdanhS.includes("siucdaodau") ||
                            kdanhS.includes("siuchdaodau") ||
                            kdanhS.includes("scddau") ||
                            kdanhS.includes("siuchuddau") ||
                            kdanhS.includes("schuddau") ||
                            kdanhS.includes("schddau") ||
                            kdanhS.includes("siucddau") ||
                            kdanhS.includes("siuchddau") ||
                            kdanhS.includes("đaoscdau") ||
                            kdanhS.includes("đaosdau") ||
                            kdanhS.includes("đschudau") ||
                            kdanhS.includes("đsdau") ||
                            kdanhS.includes("đscdau") ||
                            kdanhS.includes("sđdau") ||
                            kdanhS.includes("sđaodau") ||
                            kdanhS.includes("scđdau") ||
                            kdanhS.includes("scđaodau") ||
                            kdanhS.includes("siuchuđaodau") ||
                            kdanhS.includes("daosdau") ||
                            kdanhS.includes("daoscdau") ||
                            kdanhS.includes("daosiuchudau") ||
                            kdanhS.includes("daoschudau") ||
                            kdanhS.includes("daoschdau") ||
                            kdanhS.includes("daosiucdau") ||
                            kdanhS.includes("daosiuchdau") ||
                            kdanhS.includes("dscdau") ||
                            kdanhS.includes("dsiuchudau") ||
                            kdanhS.includes("dschudau") ||
                            kdanhS.includes("dschdau") ||
                            kdanhS.includes("dsiucdau") ||
                            kdanhS.includes("dsiuchdau") ||
                            kdanhS.includes("xcdaudao") ||
                            kdanhS.includes("xiuchudaudao") ||
                            kdanhS.includes("xchudaudao") ||
                            kdanhS.includes("xcdaud") ||
                            kdanhS.includes("xiuchudaud") ||
                            kdanhS.includes("xchudaud") ||
                            kdanhS.includes("scdaudao") ||
                            kdanhS.includes("siuchudaudao") ||
                            kdanhS.includes("schudaudao") ||
                            kdanhS.includes("scdaud") ||
                            kdanhS.includes("siuchudaud") ||
                            kdanhS.includes("schudaud") ||
                            kdanhS.includes("daoxcduoi") ||
                            kdanhS.includes("daoxduoi") ||
                            kdanhS.includes("dxchuduoi") ||
                            kdanhS.includes("dxduoi") ||
                            kdanhS.includes("dxcduoi") ||
                            kdanhS.includes("xdduoi") ||
                            kdanhS.includes("xdaoduoi") ||
                            kdanhS.includes("xcdaoduoi") ||
                            kdanhS.includes("xiuchudaoduoi") ||
                            kdanhS.includes("xchudaoduoi") ||
                            kdanhS.includes("xchdaoduoi") ||
                            kdanhS.includes("xiucdaoduoi") ||
                            kdanhS.includes("xiuchdaoduoi") ||
                            kdanhS.includes("xcdduoi") ||
                            kdanhS.includes("xiuchudduoi") ||
                            kdanhS.includes("xchudduoi") ||
                            kdanhS.includes("xchdduoi") ||
                            kdanhS.includes("xiucdduoi") ||
                            kdanhS.includes("xiuchdduoi") ||
                            kdanhS.includes("đaoxcduoi") ||
                            kdanhS.includes("đaoxduoi") ||
                            kdanhS.includes("đxchuduoi") ||
                            kdanhS.includes("đxduoi") ||
                            kdanhS.includes("đxcduoi") ||
                            kdanhS.includes("xđduoi") ||
                            kdanhS.includes("xđaoduoi") ||
                            kdanhS.includes("xcđduoi") ||
                            kdanhS.includes("xcđaoduoi") ||
                            kdanhS.includes("xiuchuđaoduoi") ||
                            kdanhS.includes("daoxduoi") ||
                            kdanhS.includes("daoxcduoi") ||
                            kdanhS.includes("daoxiuchuduoi") ||
                            kdanhS.includes("daoxchuduoi") ||
                            kdanhS.includes("daoxchduoi") ||
                            kdanhS.includes("daoxiucduoi") ||
                            kdanhS.includes("daoxiuchduoi") ||
                            kdanhS.includes("dxcduoi") ||
                            kdanhS.includes("dxiuchuduoi") ||
                            kdanhS.includes("dxchuduoi") ||
                            kdanhS.includes("dxchduoi") ||
                            kdanhS.includes("dxiucduoi") ||
                            kdanhS.includes("dxiuchduoi") ||
                            kdanhS.includes("daoscduoi") ||
                            kdanhS.includes("daosduoi") ||
                            kdanhS.includes("dschuduoi") ||
                            kdanhS.includes("dsduoi") ||
                            kdanhS.includes("dscduoi") ||
                            kdanhS.includes("sdduoi") ||
                            kdanhS.includes("sdaoduoi") ||
                            kdanhS.includes("scdaoduoi") ||
                            kdanhS.includes("siuchudaoduoi") ||
                            kdanhS.includes("schudaoduoi") ||
                            kdanhS.includes("schdaoduoi") ||
                            kdanhS.includes("siucdaoduoi") ||
                            kdanhS.includes("siuchdaoduoi") ||
                            kdanhS.includes("scdduoi") ||
                            kdanhS.includes("siuchudduoi") ||
                            kdanhS.includes("schudduoi") ||
                            kdanhS.includes("schdduoi") ||
                            kdanhS.includes("siucdduoi") ||
                            kdanhS.includes("siuchdduoi") ||
                            kdanhS.includes("đaoscduoi") ||
                            kdanhS.includes("đaosduoi") ||
                            kdanhS.includes("đschuduoi") ||
                            kdanhS.includes("đsduoi") ||
                            kdanhS.includes("đscduoi") ||
                            kdanhS.includes("sđduoi") ||
                            kdanhS.includes("sđaoduoi") ||
                            kdanhS.includes("scđduoi") ||
                            kdanhS.includes("scđaoduoi") ||
                            kdanhS.includes("siuchuđaoduoi") ||
                            kdanhS.includes("daosduoi") ||
                            kdanhS.includes("daoscduoi") ||
                            kdanhS.includes("daosiuchuduoi") ||
                            kdanhS.includes("daoschuduoi") ||
                            kdanhS.includes("daoschduoi") ||
                            kdanhS.includes("daosiucduoi") ||
                            kdanhS.includes("daosiuchduoi") ||
                            kdanhS.includes("dscduoi") ||
                            kdanhS.includes("dsiuchuduoi") ||
                            kdanhS.includes("dschuduoi") ||
                            kdanhS.includes("dschduoi") ||
                            kdanhS.includes("dsiucduoi") ||
                            kdanhS.includes("dsiuchduoi") ||
                            kdanhS.includes("xcduoidao") ||
                            kdanhS.includes("xiuchuduoidao") ||
                            kdanhS.includes("xchuduoidao") ||
                            kdanhS.includes("xcduoid") ||
                            kdanhS.includes("xiuchuduoid") ||
                            kdanhS.includes("xchuduoid") ||
                            kdanhS.includes("scduoidao") ||
                            kdanhS.includes("siuchuduoidao") ||
                            kdanhS.includes("schuduoidao") ||
                            kdanhS.includes("scduoid") ||
                            kdanhS.includes("siuchuduoid") ||
                            kdanhS.includes("schuduoid") ||
                            kdanhS.includes("baylo") ||
                            kdanhS.includes("baobay") ||
                            kdanhS.includes("baobaylo") ||
                            kdanhS.includes("baylod") ||
                            kdanhS.includes("baobayd") ||
                            kdanhS.includes("baobaylod") ||
                            kdanhS.includes("baylodao") ||
                            kdanhS.includes("baobaydao") ||
                            kdanhS.includes("baobaylodao") ||
                            kdanhS.includes("dbaylo") ||
                            kdanhS.includes("dbaobay") ||
                            kdanhS.includes("dbaobaylo") ||
                            kdanhS.includes("daobaylo") ||
                            kdanhS.includes("daobaobay") ||
                            kdanhS.includes("daobaobaylo") ||
                            kdanhS.includes("tamlo") ||
                            kdanhS.includes("baotam") ||
                            kdanhS.includes("baotamlo") ||
                            kdanhS.includes("tamlod") ||
                            kdanhS.includes("baotamd") ||
                            kdanhS.includes("baotamlod") ||
                            kdanhS.includes("tamlodao") ||
                            kdanhS.includes("baotamdao") ||
                            kdanhS.includes("baotamlodao") ||
                            kdanhS.includes("dtamlo") ||
                            kdanhS.includes("dbaotam") ||
                            kdanhS.includes("dbaotamlo") ||
                            kdanhS.includes("daotamlo") ||
                            kdanhS.includes("daobaotam") ||
                            kdanhS.includes("daobaotamlo") ||
                            kdanhS.includes("xdaudao") ||
                            kdanhS.includes("xdaud") ||
                            kdanhS.includes("xdaodau") ||
                            kdanhS.includes("xddau") ||
                            kdanhS.includes("xduidao") ||
                            kdanhS.includes("xduoidao") ||
                            kdanhS.includes("xduid") ||
                            kdanhS.includes("xduoid") ||
                            kdanhS.includes("xdaodui") ||
                            kdanhS.includes("xdaoduoi") ||
                            kdanhS.includes("xddui") ||
                            kdanhS.includes("xdduoi")
                        )
                    ) {
                        index = contentTmp.indexOf("k", index + 1);
                        kt = true;
                    } else if (isFinite(Number(kdanhS))) {
                        index = contentTmp.indexOf("k", index + 1);
                        kt = true;
                    } else {
                        contentTmp =
                            contentTmp.slice(0, index) +
                            contentTmp.slice(index + 1);
                    }

                    break;
                }
            }

            if (kt) {
                continue;
            }
        } else if (contentTmp[index + 1] === "." && index !== -1) {
            let kdanh = "";
            let so = "";
            let mangSo = [];
            let outW = false;
            let ktCham = 0;

            for (let i = index - 1; i >= 0; i--) {
                if (isFinite(Number(contentTmp[i]))) {
                    so += contentTmp[i];
                }

                if (contentTmp[i] === "." && so !== "") {
                    mangSo.push(so);
                    so = "";
                }

                if (contentTmp[i] !== "." && !isFinite(Number(contentTmp[i]))) {
                    kdanh += contentTmp[i];
                }

                if (
                    contentTmp[i] === "." &&
                    kdanh !== "" &&
                    mangSo.length >= 1
                ) {
                    let kDanhNew = kdanh.split("").reverse().join("");
                    console.log(kDanhNew);
                    console.log(mangSo);

                    if (
                        (kDanhNew.includes("dx") ||
                            kDanhNew.includes("davong") ||
                            kDanhNew.includes("dav") ||
                            kDanhNew.includes("dv") ||
                            kDanhNew.includes("đx") ||
                            kDanhNew.includes("đax") ||
                            kDanhNew.includes("da") ||
                            kDanhNew.includes("đa") ||
                            kDanhNew.includes("dat") ||
                            kDanhNew.includes("dathang") ||
                            kDanhNew.includes("dath") ||
                            kDanhNew.includes("dth") ||
                            kDanhNew.includes("dthang") ||
                            kDanhNew.includes("daxien") ||
                            kDanhNew.includes("dxien") ||
                            kDanhNew.includes("đat") ||
                            kDanhNew.includes("dax") ||
                            kDanhNew.includes("l") ||
                            kDanhNew.includes("lo") ||
                            kDanhNew.includes("b") ||
                            kDanhNew.includes("bl") ||
                            kDanhNew.includes("blo") ||
                            kDanhNew.includes("blô") ||
                            kDanhNew.includes("baolo") ||
                            kDanhNew.includes("bao") ||
                            kDanhNew.includes("baol") ||
                            kDanhNew.includes("baolô") ||
                            kDanhNew.includes("dl") ||
                            kDanhNew.includes("dlo") ||
                            kDanhNew.includes("ld") ||
                            kDanhNew.includes("lod") ||
                            kDanhNew.includes("db") ||
                            kDanhNew.includes("đb") ||
                            kDanhNew.includes("dbl") ||
                            kDanhNew.includes("đbl") ||
                            kDanhNew.includes("dblo") ||
                            kDanhNew.includes("đblô") ||
                            kDanhNew.includes("daobaolo") ||
                            kDanhNew.includes("daobaolô") ||
                            kDanhNew.includes("blodao") ||
                            kDanhNew.includes("daoblo") ||
                            kDanhNew.includes("baolodao") ||
                            kDanhNew.includes("daobaolo") ||
                            kDanhNew.includes("bldao") ||
                            kDanhNew.includes("daobl") ||
                            kDanhNew.includes("bdao") ||
                            kDanhNew.includes("daob") ||
                            kDanhNew.includes("baoldao") ||
                            kDanhNew.includes("daobaol") ||
                            kDanhNew.includes("baodao") ||
                            kDanhNew.includes("daobao") ||
                            kDanhNew.includes("daolo") ||
                            kDanhNew.includes("lodao") ||
                            kDanhNew.includes("bđao") ||
                            kDanhNew.includes("bld") ||
                            kDanhNew.includes("dd") ||
                            kDanhNew.includes("đđ") ||
                            kDanhNew.includes("dauduoi") ||
                            kDanhNew.includes("daudui") ||
                            kDanhNew.includes("daud") ||
                            kDanhNew.includes("ddui") ||
                            kDanhNew.includes("dduoi") ||
                            kDanhNew.includes("đd") ||
                            kDanhNew.includes("dđ") ||
                            kDanhNew.includes("đâuđuôi") ||
                            kDanhNew.includes("đầuđuôi") ||
                            kDanhNew.includes("đauđuôi") ||
                            kDanhNew.includes("x") ||
                            kDanhNew.includes("xc") ||
                            kDanhNew.includes("xiuchu") ||
                            kDanhNew.includes("xiuch") ||
                            kDanhNew.includes("xiuc") ||
                            kDanhNew.includes("xiu") ||
                            kDanhNew.includes("xiudau") ||
                            kDanhNew.includes("xiudui") ||
                            kDanhNew.includes("xiuduoi") ||
                            kDanhNew.includes("xiud") ||
                            kDanhNew.includes("xiudao") ||
                            kDanhNew.includes("xiuddau") ||
                            kDanhNew.includes("xiudaud") ||
                            kDanhNew.includes("xiudaodau") ||
                            kDanhNew.includes("xiudaudao") ||
                            kDanhNew.includes("xiudduoi") ||
                            kDanhNew.includes("xiuduoid") ||
                            kDanhNew.includes("xiudaoduoi") ||
                            kDanhNew.includes("xiuduoidao") ||
                            kDanhNew.includes("xch") ||
                            kDanhNew.includes("xchu") ||
                            kDanhNew.includes("s") ||
                            kDanhNew.includes("sc") ||
                            kDanhNew.includes("siuchu") ||
                            kDanhNew.includes("siuch") ||
                            kDanhNew.includes("siuc") ||
                            kDanhNew.includes("sch") ||
                            kDanhNew.includes("schu") ||
                            kDanhNew.includes("xdau") ||
                            kDanhNew.includes("xcdau") ||
                            kDanhNew.includes("xchdau") ||
                            kDanhNew.includes("xchudau") ||
                            kDanhNew.includes("xiuchudau") ||
                            kDanhNew.includes("xiuchdau") ||
                            kDanhNew.includes("xiucdau") ||
                            kDanhNew.includes("xđau") ||
                            kDanhNew.includes("xcđau") ||
                            kDanhNew.includes("xiuchuđau") ||
                            kDanhNew.includes("sdau") ||
                            kDanhNew.includes("scdau") ||
                            kDanhNew.includes("schdau") ||
                            kDanhNew.includes("schudau") ||
                            kDanhNew.includes("siuchudau") ||
                            kDanhNew.includes("siuchdau") ||
                            kDanhNew.includes("siucdau") ||
                            kDanhNew.includes("sđau") ||
                            kDanhNew.includes("scđau") ||
                            kDanhNew.includes("siuchuđau") ||
                            kDanhNew.includes("xduoi") ||
                            kDanhNew.includes("xcduoi") ||
                            kDanhNew.includes("xchduoi") ||
                            kDanhNew.includes("xchuduoi") ||
                            kDanhNew.includes("xiuchuduoi") ||
                            kDanhNew.includes("xiuchduoi") ||
                            kDanhNew.includes("xiucduoi") ||
                            kDanhNew.includes("xduoi") ||
                            kDanhNew.includes("xcduoi") ||
                            kDanhNew.includes("xiuchuduoi") ||
                            kDanhNew.includes("xdui") ||
                            kDanhNew.includes("xcdui") ||
                            kDanhNew.includes("xchdui") ||
                            kDanhNew.includes("xchudui") ||
                            kDanhNew.includes("xiuchudui") ||
                            kDanhNew.includes("xiuchdui") ||
                            kDanhNew.includes("xiucdui") ||
                            kDanhNew.includes("xdui") ||
                            kDanhNew.includes("xcdui") ||
                            kDanhNew.includes("xiuchudui") ||
                            kDanhNew.includes("sduoi") ||
                            kDanhNew.includes("scduoi") ||
                            kDanhNew.includes("schduoi") ||
                            kDanhNew.includes("schuduoi") ||
                            kDanhNew.includes("siuchuduoi") ||
                            kDanhNew.includes("siuchduoi") ||
                            kDanhNew.includes("siucduoi") ||
                            kDanhNew.includes("sduoi") ||
                            kDanhNew.includes("scduoi") ||
                            kDanhNew.includes("siuchuduoi") ||
                            kDanhNew.includes("sdui") ||
                            kDanhNew.includes("scdui") ||
                            kDanhNew.includes("schdui") ||
                            kDanhNew.includes("schudui") ||
                            kDanhNew.includes("siuchudui") ||
                            kDanhNew.includes("siuchdui") ||
                            kDanhNew.includes("siucdui") ||
                            kDanhNew.includes("sdui") ||
                            kDanhNew.includes("scdui") ||
                            kDanhNew.includes("siuchudui") ||
                            kDanhNew.includes("daoxc") ||
                            kDanhNew.includes("daox") ||
                            kDanhNew.includes("dxchu") ||
                            kDanhNew.includes("dx") ||
                            kDanhNew.includes("dxc") ||
                            kDanhNew.includes("xd") ||
                            kDanhNew.includes("xdao") ||
                            kDanhNew.includes("xcdao") ||
                            kDanhNew.includes("xiuchudao") ||
                            kDanhNew.includes("xchudao") ||
                            kDanhNew.includes("xchdao") ||
                            kDanhNew.includes("xiucdao") ||
                            kDanhNew.includes("xiuchdao") ||
                            kDanhNew.includes("xcd") ||
                            kDanhNew.includes("xiuchud") ||
                            kDanhNew.includes("xchud") ||
                            kDanhNew.includes("xchd") ||
                            kDanhNew.includes("xiucd") ||
                            kDanhNew.includes("xiuchd") ||
                            kDanhNew.includes("đaoxc") ||
                            kDanhNew.includes("đaox") ||
                            kDanhNew.includes("đxchu") ||
                            kDanhNew.includes("đx") ||
                            kDanhNew.includes("đxc") ||
                            kDanhNew.includes("xđ") ||
                            kDanhNew.includes("xđao") ||
                            kDanhNew.includes("xcđ") ||
                            kDanhNew.includes("xcđao") ||
                            kDanhNew.includes("xiuchuđao") ||
                            kDanhNew.includes("daox") ||
                            kDanhNew.includes("daoxc") ||
                            kDanhNew.includes("daoxiuchu") ||
                            kDanhNew.includes("daoxchu") ||
                            kDanhNew.includes("daoxch") ||
                            kDanhNew.includes("daoxiuc") ||
                            kDanhNew.includes("daoxiuch") ||
                            kDanhNew.includes("dxc") ||
                            kDanhNew.includes("dxiuchu") ||
                            kDanhNew.includes("dxchu") ||
                            kDanhNew.includes("dxch") ||
                            kDanhNew.includes("dxiuc") ||
                            kDanhNew.includes("dxiuch") ||
                            kDanhNew.includes("daosc") ||
                            kDanhNew.includes("daos") ||
                            kDanhNew.includes("dschu") ||
                            kDanhNew.includes("ds") ||
                            kDanhNew.includes("dsc") ||
                            kDanhNew.includes("sd") ||
                            kDanhNew.includes("sdao") ||
                            kDanhNew.includes("scdao") ||
                            kDanhNew.includes("siuchudao") ||
                            kDanhNew.includes("schudao") ||
                            kDanhNew.includes("schdao") ||
                            kDanhNew.includes("siucdao") ||
                            kDanhNew.includes("siuchdao") ||
                            kDanhNew.includes("scd") ||
                            kDanhNew.includes("siuchud") ||
                            kDanhNew.includes("schud") ||
                            kDanhNew.includes("schd") ||
                            kDanhNew.includes("siucd") ||
                            kDanhNew.includes("siuchd") ||
                            kDanhNew.includes("đaosc") ||
                            kDanhNew.includes("đaos") ||
                            kDanhNew.includes("đschu") ||
                            kDanhNew.includes("đs") ||
                            kDanhNew.includes("đsc") ||
                            kDanhNew.includes("sđ") ||
                            kDanhNew.includes("sđao") ||
                            kDanhNew.includes("scđ") ||
                            kDanhNew.includes("scđao") ||
                            kDanhNew.includes("siuchuđao") ||
                            kDanhNew.includes("daos") ||
                            kDanhNew.includes("daosc") ||
                            kDanhNew.includes("daosiuchu") ||
                            kDanhNew.includes("daoschu") ||
                            kDanhNew.includes("daosch") ||
                            kDanhNew.includes("daosiuc") ||
                            kDanhNew.includes("daosiuch") ||
                            kDanhNew.includes("dsc") ||
                            kDanhNew.includes("dsiuchu") ||
                            kDanhNew.includes("dschu") ||
                            kDanhNew.includes("dsch") ||
                            kDanhNew.includes("dsiuc") ||
                            kDanhNew.includes("dsiuch") ||
                            kDanhNew.includes("dau") ||
                            kDanhNew.includes("duoi") ||
                            kDanhNew.includes("đuôi") ||
                            kDanhNew.includes("duôi") ||
                            kDanhNew.includes("đuoi") ||
                            kDanhNew.includes("dui") ||
                            kDanhNew.includes("đui") ||
                            kDanhNew.includes("d") ||
                            kDanhNew.includes("daoxcdau") ||
                            kDanhNew.includes("daoxdau") ||
                            kDanhNew.includes("dxchudau") ||
                            kDanhNew.includes("dxdau") ||
                            kDanhNew.includes("dxcdau") ||
                            kDanhNew.includes("xddau") ||
                            kDanhNew.includes("xdaodau") ||
                            kDanhNew.includes("xcdaodau") ||
                            kDanhNew.includes("xiuchudaodau") ||
                            kDanhNew.includes("xchudaodau") ||
                            kDanhNew.includes("xchdaodau") ||
                            kDanhNew.includes("xiucdaodau") ||
                            kDanhNew.includes("xiuchdaodau") ||
                            kDanhNew.includes("xcddau") ||
                            kDanhNew.includes("xiuchuddau") ||
                            kDanhNew.includes("xchuddau") ||
                            kDanhNew.includes("xchddau") ||
                            kDanhNew.includes("xiucddau") ||
                            kDanhNew.includes("xiuchddau") ||
                            kDanhNew.includes("đaoxcdau") ||
                            kDanhNew.includes("đaoxdau") ||
                            kDanhNew.includes("đxchudau") ||
                            kDanhNew.includes("đxdau") ||
                            kDanhNew.includes("đxcdau") ||
                            kDanhNew.includes("xđdau") ||
                            kDanhNew.includes("xđaodau") ||
                            kDanhNew.includes("xcđdau") ||
                            kDanhNew.includes("xcđaodau") ||
                            kDanhNew.includes("xiuchuđaodau") ||
                            kDanhNew.includes("daoxdau") ||
                            kDanhNew.includes("daoxcdau") ||
                            kDanhNew.includes("daoxiuchudau") ||
                            kDanhNew.includes("daoxchudau") ||
                            kDanhNew.includes("daoxchdau") ||
                            kDanhNew.includes("daoxiucdau") ||
                            kDanhNew.includes("daoxiuchdau") ||
                            kDanhNew.includes("dxcdau") ||
                            kDanhNew.includes("dxiuchudau") ||
                            kDanhNew.includes("dxchudau") ||
                            kDanhNew.includes("dxchdau") ||
                            kDanhNew.includes("dxiucdau") ||
                            kDanhNew.includes("dxiuchdau") ||
                            kDanhNew.includes("daoscdau") ||
                            kDanhNew.includes("daosdau") ||
                            kDanhNew.includes("dschudau") ||
                            kDanhNew.includes("dsdau") ||
                            kDanhNew.includes("dscdau") ||
                            kDanhNew.includes("sddau") ||
                            kDanhNew.includes("sdaodau") ||
                            kDanhNew.includes("scdaodau") ||
                            kDanhNew.includes("siuchudaodau") ||
                            kDanhNew.includes("schudaodau") ||
                            kDanhNew.includes("schdaodau") ||
                            kDanhNew.includes("siucdaodau") ||
                            kDanhNew.includes("siuchdaodau") ||
                            kDanhNew.includes("scddau") ||
                            kDanhNew.includes("siuchuddau") ||
                            kDanhNew.includes("schuddau") ||
                            kDanhNew.includes("schddau") ||
                            kDanhNew.includes("siucddau") ||
                            kDanhNew.includes("siuchddau") ||
                            kDanhNew.includes("đaoscdau") ||
                            kDanhNew.includes("đaosdau") ||
                            kDanhNew.includes("đschudau") ||
                            kDanhNew.includes("đsdau") ||
                            kDanhNew.includes("đscdau") ||
                            kDanhNew.includes("sđdau") ||
                            kDanhNew.includes("sđaodau") ||
                            kDanhNew.includes("scđdau") ||
                            kDanhNew.includes("scđaodau") ||
                            kDanhNew.includes("siuchuđaodau") ||
                            kDanhNew.includes("daosdau") ||
                            kDanhNew.includes("daoscdau") ||
                            kDanhNew.includes("daosiuchudau") ||
                            kDanhNew.includes("daoschudau") ||
                            kDanhNew.includes("daoschdau") ||
                            kDanhNew.includes("daosiucdau") ||
                            kDanhNew.includes("daosiuchdau") ||
                            kDanhNew.includes("dscdau") ||
                            kDanhNew.includes("dsiuchudau") ||
                            kDanhNew.includes("dschudau") ||
                            kDanhNew.includes("dschdau") ||
                            kDanhNew.includes("dsiucdau") ||
                            kDanhNew.includes("dsiuchdau") ||
                            kDanhNew.includes("xcdaudao") ||
                            kDanhNew.includes("xiuchudaudao") ||
                            kDanhNew.includes("xchudaudao") ||
                            kDanhNew.includes("xcdaud") ||
                            kDanhNew.includes("xiuchudaud") ||
                            kDanhNew.includes("xchudaud") ||
                            kDanhNew.includes("scdaudao") ||
                            kDanhNew.includes("siuchudaudao") ||
                            kDanhNew.includes("schudaudao") ||
                            kDanhNew.includes("scdaud") ||
                            kDanhNew.includes("siuchudaud") ||
                            kDanhNew.includes("schudaud") ||
                            kDanhNew.includes("daoxcduoi") ||
                            kDanhNew.includes("daoxduoi") ||
                            kDanhNew.includes("dxchuduoi") ||
                            kDanhNew.includes("dxduoi") ||
                            kDanhNew.includes("dxcduoi") ||
                            kDanhNew.includes("xdduoi") ||
                            kDanhNew.includes("xdaoduoi") ||
                            kDanhNew.includes("xcdaoduoi") ||
                            kDanhNew.includes("xiuchudaoduoi") ||
                            kDanhNew.includes("xchudaoduoi") ||
                            kDanhNew.includes("xchdaoduoi") ||
                            kDanhNew.includes("xiucdaoduoi") ||
                            kDanhNew.includes("xiuchdaoduoi") ||
                            kDanhNew.includes("xcdduoi") ||
                            kDanhNew.includes("xiuchudduoi") ||
                            kDanhNew.includes("xchudduoi") ||
                            kDanhNew.includes("xchdduoi") ||
                            kDanhNew.includes("xiucdduoi") ||
                            kDanhNew.includes("xiuchdduoi") ||
                            kDanhNew.includes("đaoxcduoi") ||
                            kDanhNew.includes("đaoxduoi") ||
                            kDanhNew.includes("đxchuduoi") ||
                            kDanhNew.includes("đxduoi") ||
                            kDanhNew.includes("đxcduoi") ||
                            kDanhNew.includes("xđduoi") ||
                            kDanhNew.includes("xđaoduoi") ||
                            kDanhNew.includes("xcđduoi") ||
                            kDanhNew.includes("xcđaoduoi") ||
                            kDanhNew.includes("xiuchuđaoduoi") ||
                            kDanhNew.includes("daoxduoi") ||
                            kDanhNew.includes("daoxcduoi") ||
                            kDanhNew.includes("daoxiuchuduoi") ||
                            kDanhNew.includes("daoxchuduoi") ||
                            kDanhNew.includes("daoxchduoi") ||
                            kDanhNew.includes("daoxiucduoi") ||
                            kDanhNew.includes("daoxiuchduoi") ||
                            kDanhNew.includes("dxcduoi") ||
                            kDanhNew.includes("dxiuchuduoi") ||
                            kDanhNew.includes("dxchuduoi") ||
                            kDanhNew.includes("dxchduoi") ||
                            kDanhNew.includes("dxiucduoi") ||
                            kDanhNew.includes("dxiuchduoi") ||
                            kDanhNew.includes("daoscduoi") ||
                            kDanhNew.includes("daosduoi") ||
                            kDanhNew.includes("dschuduoi") ||
                            kDanhNew.includes("dsduoi") ||
                            kDanhNew.includes("dscduoi") ||
                            kDanhNew.includes("sdduoi") ||
                            kDanhNew.includes("sdaoduoi") ||
                            kDanhNew.includes("scdaoduoi") ||
                            kDanhNew.includes("siuchudaoduoi") ||
                            kDanhNew.includes("schudaoduoi") ||
                            kDanhNew.includes("schdaoduoi") ||
                            kDanhNew.includes("siucdaoduoi") ||
                            kDanhNew.includes("siuchdaoduoi") ||
                            kDanhNew.includes("scdduoi") ||
                            kDanhNew.includes("siuchudduoi") ||
                            kDanhNew.includes("schudduoi") ||
                            kDanhNew.includes("schdduoi") ||
                            kDanhNew.includes("siucdduoi") ||
                            kDanhNew.includes("siuchdduoi") ||
                            kDanhNew.includes("đaoscduoi") ||
                            kDanhNew.includes("đaosduoi") ||
                            kDanhNew.includes("đschuduoi") ||
                            kDanhNew.includes("đsduoi") ||
                            kDanhNew.includes("đscduoi") ||
                            kDanhNew.includes("sđduoi") ||
                            kDanhNew.includes("sđaoduoi") ||
                            kDanhNew.includes("scđduoi") ||
                            kDanhNew.includes("scđaoduoi") ||
                            kDanhNew.includes("siuchuđaoduoi") ||
                            kDanhNew.includes("daosduoi") ||
                            kDanhNew.includes("daoscduoi") ||
                            kDanhNew.includes("daosiuchuduoi") ||
                            kDanhNew.includes("daoschuduoi") ||
                            kDanhNew.includes("daoschduoi") ||
                            kDanhNew.includes("daosiucduoi") ||
                            kDanhNew.includes("daosiuchduoi") ||
                            kDanhNew.includes("dscduoi") ||
                            kDanhNew.includes("dsiuchuduoi") ||
                            kDanhNew.includes("dschuduoi") ||
                            kDanhNew.includes("dschduoi") ||
                            kDanhNew.includes("dsiucduoi") ||
                            kDanhNew.includes("dsiuchduoi") ||
                            kDanhNew.includes("xcduoidao") ||
                            kDanhNew.includes("xiuchuduoidao") ||
                            kDanhNew.includes("xchuduoidao") ||
                            kDanhNew.includes("xcduoid") ||
                            kDanhNew.includes("xiuchuduoid") ||
                            kDanhNew.includes("xchuduoid") ||
                            kDanhNew.includes("scduoidao") ||
                            kDanhNew.includes("siuchuduoidao") ||
                            kDanhNew.includes("schuduoidao") ||
                            kDanhNew.includes("scduoid") ||
                            kDanhNew.includes("siuchuduoid") ||
                            kDanhNew.includes("schuduoid") ||
                            kDanhNew.includes("baylo") ||
                            kDanhNew.includes("baobay") ||
                            kDanhNew.includes("baobaylo") ||
                            kDanhNew.includes("baylod") ||
                            kDanhNew.includes("baobayd") ||
                            kDanhNew.includes("baobaylod") ||
                            kDanhNew.includes("baylodao") ||
                            kDanhNew.includes("baobaydao") ||
                            kDanhNew.includes("baobaylodao") ||
                            kDanhNew.includes("dbaylo") ||
                            kDanhNew.includes("dbaobay") ||
                            kDanhNew.includes("dbaobaylo") ||
                            kDanhNew.includes("daobaylo") ||
                            kDanhNew.includes("daobaobay") ||
                            kDanhNew.includes("daobaobaylo") ||
                            kDanhNew.includes("tamlo") ||
                            kDanhNew.includes("baotam") ||
                            kDanhNew.includes("baotamlo") ||
                            kDanhNew.includes("tamlod") ||
                            kDanhNew.includes("baotamd") ||
                            kDanhNew.includes("baotamlod") ||
                            kDanhNew.includes("tamlodao") ||
                            kDanhNew.includes("baotamdao") ||
                            kDanhNew.includes("baotamlodao") ||
                            kDanhNew.includes("dtamlo") ||
                            kDanhNew.includes("dbaotam") ||
                            kDanhNew.includes("dbaotamlo") ||
                            kDanhNew.includes("daotamlo") ||
                            kDanhNew.includes("daobaotam") ||
                            kDanhNew.includes("daobaotamlo") ||
                            kDanhNew.includes("xdaudao") ||
                            kDanhNew.includes("xdaud") ||
                            kDanhNew.includes("xdaodau") ||
                            kDanhNew.includes("xddau") ||
                            kDanhNew.includes("xduidao") ||
                            kDanhNew.includes("xduoidao") ||
                            kDanhNew.includes("xduid") ||
                            kDanhNew.includes("xduoid") ||
                            kDanhNew.includes("xdaodui") ||
                            kDanhNew.includes("xdaoduoi") ||
                            kDanhNew.includes("xddui") ||
                            kDanhNew.includes("xdduoi")) &&
                        mangSo.length === 1
                    ) {
                        contentTmp =
                            contentTmp.slice(0, index) +
                            contentTmp.slice(index + 1);
                        break;
                    } else {
                        if (ktCham > 1) {
                            break;
                        }
                        ktCham++;
                    }
                }
            }
        }

        index = contentTmp.indexOf("k", index + 1);
    }

    index = contentTmp.indexOf("t");
    while (index !== -1) {
        if (
            (isFinite(
                Number(contentTmp[index - 1]) && contentTmp[index - 2] === "."
            ) ||
                (contentTmp[index - 1] === "." &&
                    contentTmp[index - 3] === "." &&
                    isFinite(Number(contentTmp[index - 2])))) &&
            (contentTmp[index + 1] === "." ||
                contentTmp[index + 1] === undefined ||
                contentTmp[index + 1] === null) &&
            index !== -1
        ) {
            contentTmp =
                contentTmp.slice(0, index - 1) + contentTmp.slice(index + 1);
        }

        index = contentTmp.indexOf("t", index + 1);
    }

    contentTmp = contentTmp.replace(/\.{2,}/g, ".");

    return contentTmp;
}

export default shortenText;
