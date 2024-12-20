import { View, Text, Alert } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axiosClient from "../apis/axiosClient";
import moment from "moment";
import { AuthContext } from "./AuthContext";
import convertContentDetail from "../utils/sms/convertContentDetail";
import payBySms from "../utils/sms/payBySms";
import CustomAlert from "@/components/CustomAlert";

export const SmsContext = createContext();

export const SmsProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isSelected, setIsSelected] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [listCheck, setListCheck] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const [sms, setSms] = useState([]);
    const [label, setLabel] = useState("mn");

    const [idMember, setIdMember] = useState("0");
    const [deleted, setDeleted] = useState(false);

    const [errorLocation, setErrorLocation] = useState([]);
    const [content, setContent] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditSucc, setModalEditSucc] = useState(false);

    const [smsDetails, setSmsDetails] = useState([]);
    const [selectorSms, setSelectorSms] = useState();
    const [selecMember, setSelecMember] = useState();

    const handleDeleteMany = async () => {
        try {
            setIsLoading(true);
            const res = await axiosClient(`${BASE_URL}/v1/sms/delete`, {
                method: "post",
                data: { listId: listCheck },
            });

            if (res?.success) {
                const formattedDate = moment(date).format("DD/MM/YYYY");
                const resKQXS = await axiosClient(
                    `${BASE_URL}/v1/kqxs/findKqxsByDate`,
                    {
                        method: "post",
                        data: { date: formattedDate },
                    }
                );

                const mn = [];
                const mt = [];
                const mb = [];
                if (resKQXS?.success) {
                    resKQXS?.data.map((e) => {
                        if (e.domain === "mb") {
                            mb.push(e);
                        } else if (e.domain === "mt") {
                            mt.push(e);
                        } else if (e.domain === "mn") {
                            mn.push(e);
                        }
                    });
                }

                if (
                    (res.sms[0].domain === "mn" && mn.length >= 3) ||
                    (res.sms[0].domain === "mt" && mt.length >= 2) ||
                    (res.sms[0].domain === "mb" && mb.length === 1)
                ) {
                    await Promise.all(
                        res.sms?.map(async (sms) => {
                            let resRevenue = await axiosClient(
                                `${BASE_URL}/v1/revenue/findRevenueBy`,
                                {
                                    method: "post",
                                    data: {
                                        idMember: sms.idMember,
                                        domain: sms.domain,
                                        resultDate: formattedDate,
                                    },
                                }
                            );

                            if (
                                resRevenue?.revenue?.length > 0 &&
                                sms?.statusSms === "Đã xổ"
                            ) {
                                await axiosClient(
                                    `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                                    {
                                        method: "post",
                                        data: {
                                            diem2con:
                                                resRevenue.revenue[0]
                                                    ?.diem2con - sms?.diem2con,
                                            diem34con:
                                                resRevenue.revenue[0]
                                                    ?.diem34con -
                                                sms?.diem34con,
                                            tongxac:
                                                resRevenue.revenue[0]?.tongxac -
                                                sms?.tongxac,
                                            tongtrung:
                                                resRevenue.revenue[0]
                                                    ?.tongtrung -
                                                sms?.tongtrung,
                                            revenue:
                                                resRevenue.revenue[0]?.revenue -
                                                sms?.revenue,
                                        },
                                    }
                                );
                            }
                        })
                    );
                }

                await handleFindSms();

                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("error: ", error);
        }
    };

    const handleRestoreMany = async () => {
        try {
            setIsLoading(true);
            const res = await axiosClient(`${BASE_URL}/v1/sms/restoreSmsAll`, {
                method: "post",
                data: { listId: listCheck },
            });

            if (res.success) {
                const formattedDate = moment(date).format("DD/MM/YYYY");
                const resKQXS = await axiosClient(
                    `${BASE_URL}/v1/kqxs/findKqxsByDate`,
                    {
                        method: "post",
                        data: { date: formattedDate },
                    }
                );

                const mn = [];
                const mt = [];
                const mb = [];
                if (resKQXS.success) {
                    resKQXS.data.map((e) => {
                        if (e.domain === "mb") {
                            mb.push(e);
                        } else if (e.domain === "mt") {
                            mt.push(e);
                        } else if (e.domain === "mn") {
                            mn.push(e);
                        }
                    });
                }

                if (
                    (res.sms[0].domain === "mn" && mn.length >= 3) ||
                    (res.sms[0].domain === "mt" && mt.length >= 2) ||
                    (res.sms[0].domain === "mb" && mb.length === 1)
                ) {
                    await Promise.all(
                        res.sms?.map(async (sms) => {
                            const dateRestore = new Date(sms.resultDate);

                            let { arr, errorSyntax } = convertContentDetail(
                                sms.contentEdit,
                                dateRestore
                            );

                            let smsDetailList = arr;

                            let mien =
                                smsDetailList[0] && smsDetailList[0].domain;
                            let kqxs =
                                mien === "mn" ? mn : mien === "mt" ? mt : mb;

                            const resMember = await axiosClient(
                                `${BASE_URL}/v1/member/findMemberById/${sms.idMember}`,
                                {
                                    method: "post",
                                    data: {},
                                }
                            );
                            smsDetailList = payBySms(
                                smsDetailList,
                                resMember?.member,
                                kqxs
                            );

                            let tongxacRestore = 0;
                            let tongtrungRestore = 0;
                            let tongdiemRestore = 0;
                            let diem2conRestore = 0;
                            let diem34conRestore = 0;

                            smsDetailList.map(async (e) => {
                                tongxacRestore += e.tienxac;
                                tongtrungRestore += e.tientrung;
                                tongdiemRestore += e.diem;
                                if (e.number[0].length === 2) {
                                    diem2conRestore += e.diem;
                                } else {
                                    diem34conRestore += e.diem;
                                }
                            });

                            let revenueRestore = resMember?.member.runNumber
                                ? 0 - (tongxacRestore - tongtrungRestore)
                                : tongxacRestore - tongtrungRestore;

                            const form = {
                                statusSms: errorSyntax ? "Chưa xử lý" : "Đã xổ",
                                diem2conRestore,
                                diem34conRestore,
                                tongdiemRestore,
                                tongxacRestore,
                                tongtrungRestore,
                                revenueRestore,
                            };

                            const resSms = await axiosClient(
                                `${BASE_URL}/v1/sms/update/${sms._id}`,
                                {
                                    method: "post",
                                    data: form,
                                }
                            );

                            if (resSms.success && !errorSyntax) {
                                let resRevenue = await axiosClient(
                                    `${BASE_URL}/v1/revenue/findRevenueBy`,
                                    {
                                        method: "post",
                                        data: {
                                            idMember: sms.idMember,
                                            domain: sms.domain,
                                            resultDate: formattedDate,
                                        },
                                    }
                                );

                                if (resRevenue.revenue.length > 0) {
                                    await axiosClient(
                                        `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                                        {
                                            method: "post",
                                            data: {
                                                diem2con:
                                                    resRevenue.revenue[0]
                                                        ?.diem2con +
                                                    diem2conRestore,
                                                diem34con:
                                                    resRevenue.revenue[0]
                                                        ?.diem34con +
                                                    diem34conRestore,
                                                tongxac:
                                                    resRevenue.revenue[0]
                                                        ?.tongxac +
                                                    tongxacRestore,
                                                tongtrung:
                                                    resRevenue.revenue[0]
                                                        ?.tongtrung +
                                                    tongtrungRestore,
                                                revenue:
                                                    resRevenue.revenue[0]
                                                        ?.revenue +
                                                    revenueRestore,
                                            },
                                        }
                                    );
                                } else {
                                    const formRevenue = {
                                        idMember: sms.idMember,
                                        idUser: sms.idUser,
                                        domain: sms.domain,
                                        diem2con: diem2conRestore,
                                        diem34con: diem34conRestore,
                                        tongxac: tongxacRestore,
                                        tongtrung: tongtrungRestore,
                                        revenue: revenueRestore,
                                        resultDate: formattedDate,
                                    };

                                    await axiosClient(
                                        `${BASE_URL}/v1/revenue/create`,
                                        {
                                            method: "post",
                                            data: formRevenue,
                                        }
                                    );
                                }
                            }
                        })
                    );
                }

                await handleFindSms();

                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("error: ", error);
        }
    };

    const handleFindSms = async () => {
        try {
            setIsLoading(true);

            const resSms = await axiosClient(
                `${BASE_URL}/v1/sms/findSmsByNameAndPhone/${user?.info?._id}?idMember=${idMember}&resultDate=${date}&deleted=${deleted}&domain=${label}&sortCreateDate=-1`,
                {
                    method: "post",
                    data: {},
                }
            );

            if (resSms.success) {
                setSms(resSms.sms);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const handleAddSms = async () => {
        let resSms;

        try {
            setIsLoading(true);

            const formattedDate = moment(date).format("DD/MM/YYYY");
            const resKQXS = await axiosClient(
                `${BASE_URL}/v1/kqxs/findKqxsByDate`,
                {
                    method: "post",
                    data: { date: formattedDate },
                }
            );

            const mn = [];
            const mt = [];
            const mb = [];
            if (resKQXS.success) {
                resKQXS.data?.map((e) => {
                    if (e.domain === "mb") {
                        mb.push(e);
                    } else if (e.domain === "mt") {
                        mt.push(e);
                    } else if (e.domain === "mn") {
                        mn.push(e);
                    }
                });
            }

            let { arr, errorSyntax, locationError } =
                await convertContentDetail(content, date);

            let smsDetailList = arr;

            if (locationError?.location?.length >= 2) {
                if (
                    locationError?.location[0] === undefined ||
                    locationError?.location[1] === undefined
                ) {
                    setErrorLocation([0, 0]);
                } else {
                    setErrorLocation(locationError?.location);
                }
            }

            if (errorSyntax) {
                setModalVisible(true);

                return;
            }

            let mien = smsDetailList[0] && smsDetailList[0].domain;
            let kqxs = mien === "mn" ? mn : mien === "mt" ? mt : mb;

            const resMember = await axiosClient(
                `${BASE_URL}/v1/member/findMemberById/${idMember}`,
                {
                    method: "post",
                    data: {},
                }
            );
            smsDetailList = await payBySms(
                smsDetailList,
                resMember?.member,
                kqxs
            );

            let tongxac = 0;
            let tongtrung = 0;
            let tongdiem = 0;
            let diem2con = 0;
            let diem34con = 0;

            smsDetailList.map((e) => {
                tongxac += e.tienxac;
                tongtrung += e.tientrung;
                tongdiem += e.diem;
                if (e.number[0].length === 2) {
                    diem2con += e.diem;
                } else {
                    diem34con += e.diem;
                }
            });

            if (tongxac === 0) {
                setModalVisible(true);

                return;
            }

            let form = {};
            const date1 = moment(date).format("YYYY-MM-DD");
            let dateTmp = new Date(date1);

            dateTmp.setUTCHours(0, 0, 0, 0);

            if (
                (mien === "mn" &&
                    mn.length >= 3 &&
                    mn[0].result.length === 18 &&
                    mn[1].result.length === 18 &&
                    mn[2].result.length === 18 &&
                    (mn.length === 4 ? mn[3].result.length === 18 : true)) ||
                (mien === "mt" &&
                    mt.length >= 2 &&
                    mt[0].result.length === 18 &&
                    mt[1].result.length === 18 &&
                    (mt.length === 3 ? mt[2].result.length === 18 : true)) ||
                (mien === "mb" && mb.length === 1 && mb[0].result.length === 27)
            ) {
                let revenue = resMember?.member.runNumber
                    ? 0 - (tongxac - tongtrung)
                    : tongxac - tongtrung;

                const resRevenue = await axiosClient(
                    `${BASE_URL}/v1/revenue/findRevenueBy`,
                    {
                        method: "post",
                        data: {
                            idMember: idMember,
                            domain: mien,
                            resultDate: formattedDate,
                        },
                    }
                );

                if (resRevenue?.revenue?.length > 0 && !errorSyntax) {
                    await axiosClient(
                        `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                        {
                            method: "post",
                            data: {
                                diem2con:
                                    diem2con + resRevenue.revenue[0].diem2con,
                                diem34con:
                                    diem34con + resRevenue.revenue[0].diem34con,
                                tongxac:
                                    tongxac + resRevenue.revenue[0].tongxac,
                                tongtrung:
                                    tongtrung + resRevenue.revenue[0].tongtrung,
                                revenue:
                                    revenue + resRevenue.revenue[0].revenue,
                            },
                        }
                    );
                } else if (!errorSyntax) {
                    const formRevenue = {
                        idMember,
                        idUser: user?.info?._id,
                        domain: mien,
                        diem2con,
                        diem34con,
                        tongxac,
                        tongtrung,
                        revenue,
                        resultDate: formattedDate,
                    };

                    await axiosClient(`${BASE_URL}/v1/revenue/create`, {
                        method: "post",
                        data: formRevenue,
                    });
                }

                form = {
                    idUser: user?.info?._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: errorSyntax ? "Chưa xử lý" : "Đã xổ",
                    resultDate: dateTmp,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                    tongtrung,
                    revenue,
                };
            } else {
                form = {
                    idUser: user?.info?._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: errorSyntax ? "Chưa xử lý" : "Đang xử lý",
                    resultDate: dateTmp,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                };
            }

            resSms = await axiosClient(`${BASE_URL}/v1/sms/create`, {
                method: "post",
                data: form,
            });

            if (resSms.success) {
                smsDetailList = smsDetailList.map((e) => {
                    return {
                        ...e,
                        idSms: resSms.sms._id,
                        idUser: user?.info?._id,
                        idMember,
                        resultDate: dateTmp,
                    };
                });

                console.log("SMS: ", resSms.sms);

                const resSmsDetail = await axiosClient(
                    `${BASE_URL}/v1/smsDetail/create`,
                    {
                        method: "post",
                        data: { data: smsDetailList },
                    }
                );

                if (resSmsDetail.success) {
                    setContent("");
                    await handleFindSms();
                    router.back();
                } else {
                    await axiosClient(
                        `${BASE_URL}/v1/sms/update/${resSms.sms._id}`,
                        {
                            method: "post",
                            data: { statusSms: "Chưa xử lý" },
                        }
                    );
                    await axiosClient(
                        `${BASE_URL}/v1/smsDetail/delete/${resSms.sms._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            await axiosClient(`${BASE_URL}/v1/sms/update/${resSms?.sms?._id}`, {
                method: "post",
                data: {
                    statusSms: "Chưa xử lý",
                },
            });
            await axiosClient(
                `${BASE_URL}/v1/smsDetail/delete/${resSms?.sms?._id}`,
                {
                    method: "post",
                    data: {},
                }
            );
            setIsLoading(false);
        }
    };

    const handleEditSms = async () => {
        setIsLoading(true);
        let resSms;
        console.log("selectorSms: ", selectorSms);
        try {
            const formattedDate = moment(selectorSms.sms.resultDate).format(
                "DD/MM/YYYY"
            );
            const resKQXS = await axiosClient(
                `${BASE_URL}/v1/kqxs/findKqxsByDate`,
                {
                    method: "post",
                    data: {
                        date: formattedDate,
                    },
                }
            );

            const mn = [];
            const mt = [];
            const mb = [];
            if (resKQXS.success) {
                resKQXS.data.map((e) => {
                    if (e.domain === "mb") {
                        mb.push(e);
                    } else if (e.domain === "mt") {
                        mt.push(e);
                    } else if (e.domain === "mn") {
                        mn.push(e);
                    }
                });
            }

            const date = new Date(selectorSms.sms.resultDate);

            let { arr, errorSyntax, locationError } = convertContentDetail(
                content,
                date
            );
            let smsDetailList = arr;

            if (locationError?.location?.length >= 2) {
                if (
                    locationError?.location[0] === undefined ||
                    locationError?.location[1] === undefined
                ) {
                    setErrorLocation([0, 0]);
                } else {
                    setErrorLocation(locationError?.location);
                }
            }

            if (errorSyntax) {
                setModalVisible(true);

                return;
            }

            let mien = smsDetailList[0] && smsDetailList[0].domain;
            let kqxs = mien === "mn" ? mn : mien === "mt" ? mt : mb;

            const resMember = await axiosClient(
                `${BASE_URL}/v1/member/findMemberById/${selecMember}`,
                {
                    method: "post",
                    data: {},
                }
            );

            console.log("MEMBER: ", resMember?.member);
            smsDetailList = payBySms(smsDetailList, resMember?.member, kqxs);

            let tongxac = 0;
            let tongtrung = 0;
            let tongdiem = 0;
            let diem2con = 0;
            let diem34con = 0;

            smsDetailList.map(async (e) => {
                tongxac += e.tienxac;
                tongtrung += e.tientrung;
                tongdiem += e.diem;
                if (e.number[0].length === 2) {
                    diem2con += e.diem;
                } else {
                    diem34con += e.diem;
                }
            });

            if (tongxac === 0) {
                setModalVisible(true);
                return;
            }

            let form = {};
            if (
                (mien === "mn" &&
                    mn.length >= 3 &&
                    mn[0].result.length === 18 &&
                    mn[1].result.length === 18 &&
                    mn[2].result.length === 18 &&
                    (mn.length === 4 ? mn[3].result.length === 18 : true)) ||
                (mien === "mt" &&
                    mt.length >= 2 &&
                    mt[0].result.length === 18 &&
                    mt[1].result.length === 18 &&
                    (mt.length === 3 ? mt[2].result.length === 18 : true)) ||
                (mien === "mb" &&
                    mb.length === 1 &&
                    mb[0].result.length === 27) ||
                mien !== selectorSms?.sms?.domain ||
                selectorSms.sms.idMember._id !== selecMember
            ) {
                let revenue = resMember?.member.runNumber
                    ? 0 - (tongxac - tongtrung)
                    : tongxac - tongtrung;

                console.log("Tin cũ: ", selectorSms);

                if (selectorSms.sms.idMember._id !== selecMember) {
                    const resRevenue = await axiosClient(
                        `${BASE_URL}/v1/revenue/findRevenueBy`,
                        {
                            method: "post",
                            data: {
                                idMember: selectorSms?.sms?.idMember?._id,
                                domain: selectorSms?.sms?.domain,
                                resultDate: formattedDate,
                            },
                        }
                    );

                    if (resRevenue.revenue.length > 0) {
                        await axiosClient(
                            `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                            {
                                method: "post",
                                data: {
                                    diem2con:
                                        resRevenue.revenue[0]?.diem2con -
                                        selectorSms?.sms?.diem2con,
                                    diem34con:
                                        resRevenue.revenue[0]?.diem34con -
                                        selectorSms?.sms?.diem34con,
                                    tongxac:
                                        resRevenue.revenue[0]?.tongxac -
                                        selectorSms?.sms?.tongxac,
                                    tongtrung:
                                        resRevenue.revenue[0]?.tongtrung -
                                        selectorSms?.sms?.tongtrung,
                                    revenue:
                                        resRevenue.revenue[0]?.revenue -
                                        selectorSms?.sms?.revenue,
                                },
                            }
                        );
                    }

                    if ([mien].length >= 1) {
                        const resRevenueNew = await axiosClient(
                            `${BASE_URL}/v1/revenue/findRevenueBy`,
                            {
                                method: "post",
                                data: {
                                    idMember: selecMember,
                                    domain: mien,
                                    resultDate: formattedDate,
                                },
                            }
                        );

                        if (resRevenueNew.revenue.length > 0) {
                            await axiosClient(
                                `${BASE_URL}/v1/revenue/update/${resRevenueNew.revenue[0]._id}`,
                                {
                                    method: "post",
                                    data: {
                                        diem2con:
                                            diem2con +
                                            resRevenueNew.revenue[0]?.diem2con,
                                        diem34con:
                                            diem34con +
                                            resRevenueNew.revenue[0]?.diem34con,
                                        tongxac:
                                            tongxac +
                                            resRevenueNew.revenue[0]?.tongxac,
                                        tongtrung:
                                            tongtrung +
                                            resRevenueNew.revenue[0]?.tongtrung,
                                        revenue:
                                            revenue +
                                            resRevenueNew.revenue[0]?.revenue,
                                    },
                                }
                            );
                        } else {
                            const formRevenue = {
                                idMember: selecMember,
                                idUser: resMember?.member?.idUser,
                                domain: mien,
                                diem2con,
                                diem34con,
                                tongxac,
                                tongtrung,
                                revenue,
                                resultDate: formattedDate,
                            };

                            await axiosClient(`${BASE_URL}/v1/revenue/create`, {
                                method: "post",
                                data: formRevenue,
                            });
                        }
                    }
                } else {
                    if (mien !== selectorSms?.sms?.domain) {
                        const resRevenue = await axiosClient(
                            `${BASE_URL}/v1/revenue/findRevenueBy`,
                            {
                                method: "post",
                                data: {
                                    idMember: selecMember,
                                    domain: selectorSms?.sms?.domain,
                                    resultDate: formattedDate,
                                },
                            }
                        );

                        if (resRevenue.revenue.length > 0) {
                            await axiosClient(
                                `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                                {
                                    method: "post",
                                    data: {
                                        diem2con:
                                            resRevenue.revenue[0]?.diem2con -
                                            selectorSms?.sms?.diem2con,
                                        diem34con:
                                            resRevenue.revenue[0]?.diem34con -
                                            selectorSms?.sms?.diem34con,
                                        tongxac:
                                            resRevenue.revenue[0]?.tongxac -
                                            selectorSms?.sms?.tongxac,
                                        tongtrung:
                                            resRevenue.revenue[0]?.tongtrung -
                                            selectorSms?.sms?.tongtrung,
                                        revenue:
                                            resRevenue.revenue[0]?.revenue -
                                            selectorSms?.sms?.revenue,
                                    },
                                }
                            );
                        }

                        if ([mien].length >= 1) {
                            const resRevenueNew = await axiosClient(
                                `${BASE_URL}/v1/revenue/findRevenueBy`,
                                {
                                    method: "post",
                                    data: {
                                        idMember: selecMember,
                                        domain: mien,
                                        resultDate: formattedDate,
                                    },
                                }
                            );

                            if (resRevenueNew.revenue.length > 0) {
                                await axiosClient(
                                    `${BASE_URL}/v1/revenue/update/${resRevenueNew.revenue[0]._id}`,
                                    {
                                        method: "post",
                                        data: {
                                            diem2con:
                                                diem2con +
                                                resRevenueNew.revenue[0]
                                                    ?.diem2con,
                                            diem34con:
                                                diem34con +
                                                resRevenueNew.revenue[0]
                                                    ?.diem34con,
                                            tongxac:
                                                tongxac +
                                                resRevenueNew.revenue[0]
                                                    ?.tongxac,
                                            tongtrung:
                                                tongtrung +
                                                resRevenueNew.revenue[0]
                                                    ?.tongtrung,
                                            revenue:
                                                revenue +
                                                resRevenueNew.revenue[0]
                                                    ?.revenue,
                                        },
                                    }
                                );
                            } else {
                                const formRevenue = {
                                    idMember: selecMember,
                                    idUser: resMember?.member?.idUser,
                                    domain: mien,
                                    diem2con,
                                    diem34con,
                                    tongxac,
                                    tongtrung,
                                    revenue,
                                    resultDate: formattedDate,
                                };

                                await axiosClient(
                                    `${BASE_URL}/v1/revenue/create`,
                                    {
                                        method: "post",
                                        data: formRevenue,
                                    }
                                );
                            }
                        }
                    } else {
                        const resRevenue = await axiosClient(
                            `${BASE_URL}/v1/revenue/findRevenueBy`,
                            {
                                method: "post",
                                data: {
                                    idMember: selecMember,
                                    domain: mien,
                                    resultDate: formattedDate,
                                },
                            }
                        );

                        if (resRevenue.revenue.length > 0) {
                            await axiosClient(
                                `${BASE_URL}/v1/revenue/update/${resRevenue.revenue[0]._id}`,
                                {
                                    method: "post",
                                    data: {
                                        diem2con:
                                            diem2con +
                                            (resRevenue.revenue[0]?.diem2con -
                                                selectorSms?.sms?.diem2con),
                                        diem34con:
                                            diem34con +
                                            (resRevenue.revenue[0]?.diem34con -
                                                selectorSms?.sms?.diem34con),
                                        tongxac:
                                            tongxac +
                                            (resRevenue.revenue[0]?.tongxac -
                                                selectorSms?.sms?.tongxac),
                                        tongtrung:
                                            tongtrung +
                                            (resRevenue.revenue[0]?.tongtrung -
                                                selectorSms?.sms?.tongtrung),
                                        revenue:
                                            revenue +
                                            (resRevenue.revenue[0]?.revenue -
                                                selectorSms?.sms?.revenue),
                                    },
                                }
                            );
                        } else {
                            const formRevenue = {
                                idMember: selecMember,
                                idUser: resMember?.member?.idUser,
                                domain: mien,
                                diem2con,
                                diem34con,
                                tongxac,
                                tongtrung,
                                revenue,
                                resultDate: formattedDate,
                            };

                            await axiosClient(`${BASE_URL}/v1/revenue/create`, {
                                method: "post",
                                data: formRevenue,
                            });
                        }
                    }
                }

                form = {
                    idMember: selecMember,
                    contentEdit: content,
                    statusSms: errorSyntax ? "Chưa xử lý" : "Đã xổ",
                    domain: mien,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                    tongtrung,
                    revenue,
                };
            } else {
                form = {
                    idMember: selecMember,
                    contentEdit: content,
                    statusSms: errorSyntax ? "Chưa xử lý" : "Đã xử lý",
                    domain: mien,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                };
            }

            resSms = await axiosClient(
                `${BASE_URL}/v1/sms/update/${selectorSms.sms._id}`,
                {
                    method: "post",
                    data: form,
                }
            );

            console.log("resSms: ", resSms);

            if (resSms.success) {
                smsDetailList = smsDetailList.map((e) => {
                    return {
                        ...e,
                        idSms: resSms.sms._id,
                        idUser: user?.info?._id,
                        idMember,
                        resultDate: dateTmp,
                    };
                });

                setSelectorSms(resSms);
                setSelecMember(resSms.sms.idMember._id);

                //console.log('SMSEdit: ', resSms.data.sms);

                // Xóa các smsDetail cũ

                const resSmsDetailDele = await axiosClient(
                    `${BASE_URL}/v1/smsDetail/delete/${resSms.sms._id}`,
                    {
                        method: "post",
                        data: {},
                    }
                );

                // Thêm các smsDetai mới

                const resSmsDetail = await axiosClient(
                    `${BASE_URL}/v1/smsDetail/create`,
                    {
                        method: "post",
                        data: { data: smsDetailList },
                    }
                );

                console.log("111111111111: ", resSmsDetail.success);
                if (resSmsDetail.success) {
                    const resSmsDeatils = await axiosClient(
                        `${BASE_URL}/v1/smsDetail/findSmsDetailByIdSms/${resSms.sms._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );

                    if (resSmsDeatils.success) {
                        setSmsDetails(resSmsDeatils.smsDetails);
                    }

                    setIsLoading(false);

                    setModalEditSucc(true);

                    //console.log('SMSDetailEdit: ', resSmsDetail.data.smsDetail);
                } else {
                    await axiosClient(
                        `${BASE_URL}/v1/sms/update/${resSms.sms._id}`,
                        {
                            method: "post",
                            data: {
                                statusSms: "Chưa xử lý",
                            },
                        }
                    );
                    await axiosClient(
                        `${BASE_URL}/v1/smsDetail/delete/${resSms.sms._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );
                }
            } else {
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            await axiosClient(`${BASE_URL}/v1/sms/update/${resSms?.sms?._id}`, {
                method: "post",
                data: {
                    statusSms: "Chưa xử lý",
                },
            });
            await axiosClient(
                `${BASE_URL}/v1/smsDetail/delete/${resSms?.sms?._id}`,
                {
                    method: "post",
                    data: {},
                }
            );
            setIsLoading(false);
        }
    };

    return (
        <SmsContext.Provider
            value={{
                smsDetails,
                setSmsDetails,
                selectorSms,
                modalEditSucc,
                setModalEditSucc,
                setSelectorSms,
                selecMember,
                setSelecMember,
                modalVisible,
                setModalVisible,
                handleEditSms,
                handleAddSms,
                handleDeleteMany,
                handleRestoreMany,
                errorLocation,
                setErrorLocation,
                content,
                setContent,
                date,
                setDate,
                isLoading,
                setIsLoading,
                isSelected,
                setIsSelected,
                listCheck,
                setListCheck,
                checkAll,
                setCheckAll,
                isDelete,
                setIsDelete,
                sms,
                setSms,
                label,
                setLabel,
                idMember,
                setIdMember,
                deleted,
                setDeleted,
                handleFindSms,
            }}
        >
            {children}
        </SmsContext.Provider>
    );
};
