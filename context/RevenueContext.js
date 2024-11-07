import { View, Text, Alert } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axiosClient from "../apis/axiosClient";
import { AuthContext } from "./AuthContext";
import moment from "moment";
import payTotalSmsByDate from "../utils/revenue/payTotalSmsByDate";
import * as Clipboard from "expo-clipboard";

export const RevenueContext = createContext();

export const RevenueProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [idMember, setIdMember] = useState("0");

    const [revenues, setRevenues] = useState([]);
    const [selectRevenue, setSelectRevenue] = useState();

    const [idSms, setIdSms] = useState();

    const [contentCopy, setContentCopy] = useState("");

    const [modalPayProccess, setModalPayProccess] = useState(false);
    const [modalPaySuccess, setModalPaySuccess] = useState(false);

    const [modalCopySuccess, setModalCopySuccess] = useState(false);

    const handleFindRevenue = async () => {
        try {
            setIsLoading(true);
            const formattedDate = moment(date).format("DD/MM/YYYY");
            const res = await axiosClient(
                `${BASE_URL}/v1/revenue/findRevenueByDateAndIdMember`,
                {
                    method: "post",
                    data: {
                        date: formattedDate,
                        idUser: user?.info?._id,
                        idMember,
                    },
                }
            );

            if (res?.success) {
                let revenueNew = res.data?.reduce((acc, curr) => {
                    let group = acc.find(
                        (item) => item.idMember?._id === curr.idMember?._id
                    );

                    if (group) {
                        group.idMember.total += curr.revenue; // Cộng dồn doanh thu trực tiếp
                        group[curr.domain] = curr; // Thêm/cập nhật dữ liệu miền hiện tại
                    } else {
                        acc.push({
                            idMember: {
                                _id: curr.idMember?._id,
                                name: curr.idMember?.name,
                                total: curr.revenue,
                                runNumber: curr.idMember?.runNumber,
                                resultDate: curr.resultDate,
                            },
                            [curr.domain]: curr,
                        });
                    }

                    return acc;
                }, []);

                if (revenueNew) {
                    revenueNew = revenueNew.filter(
                        (e) =>
                            e?.mn?.tongxac || e?.mt?.tongxac || e?.mb?.tongxac
                    );
                }

                let tongMN = 0;
                let tongMT = 0;
                let tongMB = 0;
                let tongAll = 0;
                revenueNew.map((re) => {
                    tongMN += re?.mn?.revenue || 0;
                    tongMT += re?.mt?.revenue || 0;
                    tongMB += re?.mb?.revenue || 0;
                    tongAll += re?.idMember?.total || 0;
                });

                const objTotal = {
                    tongMN,
                    tongMT,
                    tongMB,
                    tongAll,
                };

                revenueNew.push(objTotal);

                setRevenues(revenueNew);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const payTotalRevenue = async () => {
        try {
            setModalPayProccess(true);

            const formattedDate = moment(date).format("DD/MM/YYYY");

            const res = await axiosClient(
                `${BASE_URL}/v1/kqxs/findKqxsByDate`,
                {
                    method: "post",
                    data: {
                        date: formattedDate,
                    },
                }
            );

            if (res.success) {
                const mn = [];
                const mt = [];
                const mb = [];

                res.data.map((e) => {
                    if (e.domain === "mb") {
                        mb.push(e);
                    } else if (e.domain === "mt") {
                        mt.push(e);
                    } else if (e.domain === "mn") {
                        mn.push(e);
                    }
                });

                if (mn.length >= 1) {
                    const resRevenue = await axiosClient(
                        `${BASE_URL}/v1/revenue/delete`,
                        {
                            method: "post",
                            data: {
                                resultDate: formattedDate,
                                idUser: user?.info?._id,
                                domain: "mn",
                            },
                        }
                    );

                    if (resRevenue.success) {
                        await payTotalSmsByDate(
                            formattedDate,
                            date,
                            "mn",
                            user?.info?._id,
                            mn
                        );
                    }
                }
                if (mt.length >= 1) {
                    const resRevenue = await axiosClient(
                        `${BASE_URL}/v1/revenue/delete`,
                        {
                            method: "post",
                            data: {
                                resultDate: formattedDate,
                                idUser: user?.info?._id,
                                domain: "mt",
                            },
                        }
                    );

                    if (resRevenue.success) {
                        await payTotalSmsByDate(
                            formattedDate,
                            date,
                            "mt",
                            user?.info?._id,
                            mt
                        );
                    }
                }
                if (mb.length >= 1) {
                    const resRevenue = await axiosClient(
                        `${BASE_URL}/v1/revenue/delete`,
                        {
                            method: "post",
                            data: {
                                resultDate: formattedDate,
                                idUser: user?.info?._id,
                                domain: "mb",
                            },
                        }
                    );

                    if (resRevenue.success) {
                        await payTotalSmsByDate(
                            formattedDate,
                            date,
                            "mb",
                            user?.info?._id,
                            mb
                        );
                    }
                }

                await handleFindRevenue();
                setModalPayProccess(false);
                setModalPaySuccess(true);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        setModalCopySuccess(true);
        await Clipboard.setStringAsync(contentCopy);
        setTimeout(() => setModalCopySuccess(false), 1000);
    };

    return (
        <RevenueContext.Provider
            value={{
                modalCopySuccess,
                setModalCopySuccess,
                contentCopy,
                setContentCopy,
                modalPayProccess,
                setModalPayProccess,
                modalPaySuccess,
                setModalPaySuccess,
                handleCopy,
                payTotalRevenue,
                idSms,
                setIdSms,
                selectRevenue,
                setSelectRevenue,
                handleFindRevenue,
                revenues,
                setRevenues,
                idMember,
                setIdMember,
                date,
                setDate,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </RevenueContext.Provider>
    );
};
