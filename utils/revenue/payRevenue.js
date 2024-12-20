import axiosClient from "@/apis/axiosClient";
import { BASE_URL } from "@/config";
import axios from "axios";

async function payRevenue(date, formattedDate, domain, idUser) {
    try {
        const members = await axiosClient(
            `${BASE_URL}/v1/member/findAllMemberByIdUser/${idUser}`,
            { method: "post", data: {} }
        );

        if (members?.success) {
            await Promise.all(
                members?.members?.map(async (member, index) => {
                    const smsManyOfMember = await axiosClient(
                        `${BASE_URL}/v1/sms/findSmsByIdMember?date=${date}`,
                        {
                            method: "post",
                            data: {
                                idMember: member._id,
                                domain,
                            },
                        }
                    );

                    let diem2con = 0;
                    let diem34con = 0;
                    let tongxac = 0;
                    let tongtrung = 0;
                    let revenue = 0;

                    smsManyOfMember?.sms?.map((e) => {
                        diem2con += e.diem2con;
                        diem34con += e.diem34con;
                        tongxac += e.tongxac;
                        tongtrung += e.tongtrung;
                        revenue += e.revenue;
                    });

                    const form = {
                        idMember: member._id,
                        idUser: member.idUser,
                        domain: domain,
                        diem2con,
                        diem34con,
                        tongxac,
                        tongtrung,
                        revenue,
                        resultDate: formattedDate,
                    };

                    const resRevenue = await axiosClient(
                        `${BASE_URL}/v1/revenue/create`,
                        {
                            method: "post",
                            data: form,
                        }
                    );

                    if (resRevenue.success) {
                        return true;
                    } else {
                        return false;
                    }
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

export default payRevenue;
