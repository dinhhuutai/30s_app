import axios from "axios";
import payBaoLoWin from "./pay/payBaoLoWin";
import payDauDuoiWin from "./pay/payDauDuoiWin";
import payXiuChuWin from "./pay/payXiuChuWin";
import payDauWin from "./pay/payDauWin";
import payDuoiWin from "./pay/payDuoiWin";
import payXiuChuDauWin from "./pay/payXiuChuDauWin";
import payXiuChuDuoiWin from "./pay/payXiuChuDuoiWin";
import payDaThangWin from "./pay/payDaThangWin";
import payDaXienWin from "./pay/payDaXienWin";
import payBayLoWin from "./pay/payBayLoWin";
import payTamLoWin from "./pay/payTamLoWin";
import moment from "moment";
import payRevenue from "./payRevenue";
import axiosClient from "@/apis/axiosClient";
import { BASE_URL } from "@/config";

async function payTotalSmsByDate(date, dateSelect, domain, idUser, kqxs) {
    try {
        const smsMany = await axiosClient(
            `${BASE_URL}/v1/sms/findSmsByStatus?date=${dateSelect}`,
            {
                method: "post",
                data: { domain, idUser },
            }
        );

        if (smsMany.success && smsMany.sms.length > 0) {
            await Promise.all(
                smsMany?.sms?.map(async (sms, index) => {
                    let smsDetails = await axiosClient(
                        `${BASE_URL}/v1/smsDetail/findSmsDetailByIdSms/${sms._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );

                    smsDetails = await Promise.all(
                        smsDetails?.smsDetails?.map(async (e, index) => {
                            let pay = {};

                            if (
                                e.typePlay === "baolo" ||
                                e.typePlay === "baolodao"
                            ) {
                                pay = payBaoLoWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "dauduoi") {
                                pay = payDauDuoiWin(e, sms.idMember, kqxs);
                            } else if (
                                e.typePlay === "xiuchu" ||
                                e.typePlay === "xiuchudao"
                            ) {
                                pay = payXiuChuWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "dau") {
                                pay = payDauWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "duoi") {
                                pay = payDuoiWin(e, sms.idMember, kqxs);
                            } else if (
                                e.typePlay === "xiuchudau" ||
                                e.typePlay === "xiuchudaudao"
                            ) {
                                pay = payXiuChuDauWin(e, sms.idMember, kqxs);
                            } else if (
                                e.typePlay === "xiuchuduoi" ||
                                e.typePlay === "xiuchuduoidao"
                            ) {
                                pay = payXiuChuDuoiWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "da(thang)") {
                                pay = payDaThangWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "da(xien)") {
                                pay = payDaXienWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "baylo") {
                                pay = payBayLoWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === "tamlo") {
                                pay = payTamLoWin(e, sms.idMember, kqxs);
                            }

                            await axiosClient(
                                `${BASE_URL}/v1/smsDetail/update/${e._id}`,
                                {
                                    method: "post",
                                    data: pay,
                                }
                            );

                            return { ...e, ...pay };
                        })
                    );

                    let tongtrung = 0;

                    smsDetails?.map((e) => {
                        tongtrung += e.tientrung;
                    });

                    const form = {
                        statusSms: "Đã xổ",
                        tongtrung,
                        revenue: sms.idMember.runNumber
                            ? tongtrung - sms.tongxac
                            : sms.tongxac - tongtrung,
                    };

                    await axiosClient(`${BASE_URL}/v1/sms/update/${sms._id}`, {
                        method: "post",
                        data: form,
                    });
                })
            );

            const dateSle = moment(dateSelect).format("YYYY-MM-DD");

            const res = await payRevenue(dateSle, date, domain, idUser);

            return res;
        }
    } catch (error) {
        console.log(error);
    }
}

export default payTotalSmsByDate;
