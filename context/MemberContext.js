import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axiosClient from "../apis/axiosClient";
import { AuthContext } from "./AuthContext";
import useDebounce from "@/utils/useDebounce";

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [domain, setDomain] = useState("mn");

    const [selecterMember, setSelecterMember] = useState();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState([]);
    const [phoneTmp, setPhoneTmp] = useState("");
    const [idTelegram, setIdTelegram] = useState("");
    const [idWhatsApp, setIdWhatsApp] = useState("");
    const [runNumber, setRunNumber] = useState(false);

    const [co2conMN, setCo2conMN] = useState(0.75);
    const [codauduoiMN, setCodauduoiMN] = useState(0.75);
    const [codathangMN, setCodathangMN] = useState(0.75);
    const [codaxienMN, setCodaxienMN] = useState(0.75);
    const [co3conMN, setCo3conMN] = useState(0.75);
    const [co4conMN, setCo4conMN] = useState(0.75);
    const [coxiuchuMN, setCoxiuchuMN] = useState(0.75);

    const [trung2conMN, setTrung2conMN] = useState(75);
    const [trungdauduoiMN, setTrungdauduoiMN] = useState(75);
    const [trungdathangMN, setTrungdathangMN] = useState(750);
    const [typeTrungdathangMN, setTypeTrungdathangMN] = useState(true);
    const [typeTrungdaxienMN, setTypeTrungdaxienMN] = useState(true);
    const [trungdaxienMN, setTrungdaxienMN] = useState(550);
    const [trung3conMN, setTrung3conMN] = useState(600);
    const [trung4conMN, setTrung4conMN] = useState(5000);
    const [trungxiuchuMN, setTrungxiuchuMN] = useState(600);

    const [co2conMT, setCo2conMT] = useState(0.75);
    const [codauduoiMT, setCodauduoiMT] = useState(0.75);
    const [codathangMT, setCodathangMT] = useState(0.75);
    const [codaxienMT, setCodaxienMT] = useState(0.75);
    const [co3conMT, setCo3conMT] = useState(0.75);
    const [co4conMT, setCo4conMT] = useState(0.75);
    const [coxiuchuMT, setCoxiuchuMT] = useState(0.75);

    const [trung2conMT, setTrung2conMT] = useState(75);
    const [trungdauduoiMT, setTrungdauduoiMT] = useState(75);
    const [trungdathangMT, setTrungdathangMT] = useState(750);
    const [trungdaxienMT, setTrungdaxienMT] = useState(550);
    const [typeTrungdathangMT, setTypeTrungdathangMT] = useState(true);
    const [typeTrungdaxienMT, setTypeTrungdaxienMT] = useState(true);
    const [trung3conMT, setTrung3conMT] = useState(600);
    const [trung4conMT, setTrung4conMT] = useState(5000);
    const [trungxiuchuMT, setTrungxiuchuMT] = useState(600);

    const [co2conMB, setCo2conMB] = useState(0.75);
    const [codauduoiMB, setCodauduoiMB] = useState(0.75);
    const [codathangMB, setCodathangMB] = useState(0.75);
    const [co3conMB, setCo3conMB] = useState(0.75);
    const [co4conMB, setCo4conMB] = useState(0.75);
    const [coxiuchuMB, setCoxiuchuMB] = useState(0.75);

    const [trung2conMB, setTrung2conMB] = useState(75);
    const [trungdauduoiMB, setTrungdauduoiMB] = useState(75);
    const [trungdathangMB, setTrungdathangMB] = useState(750);
    const [typeTrungdathangMB, setTypeTrungdathangMB] = useState(true);
    const [trung3conMB, setTrung3conMB] = useState(600);
    const [trung4conMB, setTrung4conMB] = useState(5000);
    const [trungxiuchuMB, setTrungxiuchuMB] = useState(600);

    const [members, setMembers] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const nameSearchDebounced = useDebounce(nameSearch, 500);

    const [errorName, setErrorName] = useState(false);
    const [modalEditSucc, setModalEditSucc] = useState(false);

    const handleSearchMember = async () => {
        try {
            setIsLoading(true);
            const res = await axiosClient(
                `${BASE_URL}/v1/member/findMemberByNameAndPhone/${user?.info?._id}?name=${nameSearchDebounced}&sortName=-1`,
                {
                    method: "post",
                    data: {},
                }
            );

            if (res?.success) {
                setMembers(res.members);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error: ", res?.members);
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!name) {
            setErrorName(true);
        } else {
            const formData = {
                idUser: user?.info?._id,
                name,
                idTelegram,
                idWhatsApp,
                phone,
                runNumber,
                co2conMN,
                codauduoiMN,
                codathangMN,
                codaxienMN,
                co3conMN,
                coxiuchuMN,
                co4conMN,
                trung2conMN,
                trungdauduoiMN,
                trungdathangMN,
                trungdaxienMN,
                typeTrungdathangMN,
                typeTrungdaxienMN,
                trung3conMN,
                trungxiuchuMN,
                trung4conMN,
                co2conMT,
                codauduoiMT,
                codathangMT,
                codaxienMT,
                co3conMT,
                coxiuchuMT,
                co4conMT,
                trung2conMT,
                trungdauduoiMT,
                trungdathangMT,
                trungdaxienMT,
                typeTrungdathangMT,
                typeTrungdaxienMT,
                trung3conMT,
                trungxiuchuMT,
                trung4conMT,
                co2conMB,
                codauduoiMB,
                codathangMB,
                co3conMB,
                coxiuchuMB,
                co4conMB,
                trung2conMB,
                trungdauduoiMB,
                trungdathangMB,
                typeTrungdathangMB,
                trung3conMB,
                trungxiuchuMB,
                trung4conMB,
            };

            try {
                setIsLoading(true);
                const res = await axiosClient(`${BASE_URL}/v1/member/create`, {
                    method: "post",
                    data: formData,
                });

                if (res?.success) {
                    const res = await axiosClient(
                        `${BASE_URL}/v1/member/findAllMemberByIdUser/${user?.info?._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );

                    if (res?.success) {
                        handleSearchMember();
                        router.back();
                    }

                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    const handleUpdate = async () => {
        if (!name) {
            setErrorName(true);
        } else {
            const formData = {
                idUser: user?.info?._id,
                name,
                idTelegram,
                idWhatsApp,
                phone,
                runNumber,
                co2conMN,
                codauduoiMN,
                codathangMN,
                codaxienMN,
                co3conMN,
                coxiuchuMN,
                co4conMN,
                trung2conMN,
                trungdauduoiMN,
                trungdathangMN,
                trungdaxienMN,
                typeTrungdathangMN,
                typeTrungdaxienMN,
                trung3conMN,
                trungxiuchuMN,
                trung4conMN,
                co2conMT,
                codauduoiMT,
                codathangMT,
                codaxienMT,
                co3conMT,
                coxiuchuMT,
                co4conMT,
                trung2conMT,
                trungdauduoiMT,
                trungdathangMT,
                trungdaxienMT,
                typeTrungdathangMT,
                typeTrungdaxienMT,
                trung3conMT,
                trungxiuchuMT,
                trung4conMT,
                co2conMB,
                codauduoiMB,
                codathangMB,
                co3conMB,
                coxiuchuMB,
                co4conMB,
                trung2conMB,
                trungdauduoiMB,
                trungdathangMB,
                typeTrungdathangMB,
                trung3conMB,
                trungxiuchuMB,
                trung4conMB,
            };

            try {
                setIsLoading(true);
                const res = await axiosClient(
                    `${BASE_URL}/v1/member/update/${selecterMember?._id}`,
                    {
                        method: "post",
                        data: formData,
                    }
                );

                if (res?.success) {
                    const res1 = await axiosClient(
                        `${BASE_URL}/v1/member/findAllMemberByIdUser/${user?.info?._id}`,
                        {
                            method: "post",
                            data: {},
                        }
                    );

                    if (res1?.success) {
                        handleSearchMember();
                        setModalEditSucc(true);
                    }

                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    return (
        <MemberContext.Provider
            value={{
                modalEditSucc,
                setModalEditSucc,
                handleUpdate,
                selecterMember,
                setSelecterMember,
                nameSearchDebounced,
                errorName,
                setErrorName,
                handleSave,
                nameSearch,
                setNameSearch,
                handleSearchMember,
                members,
                setMembers,
                handleSave,
                isLoading,
                setIsLoading,
                domain,
                setDomain,
                name,
                setName,
                phone,
                setPhone,
                phoneTmp,
                setPhoneTmp,
                idTelegram,
                setIdTelegram,
                idWhatsApp,
                setIdWhatsApp,
                runNumber,
                setRunNumber,
                co2conMN,
                setCo2conMN,
                codauduoiMN,
                setCodauduoiMN,
                codathangMN,
                setCodathangMN,
                codaxienMN,
                setCodaxienMN,
                co3conMN,
                setCo3conMN,
                co4conMN,
                setCo4conMN,
                coxiuchuMN,
                setCoxiuchuMN,
                trung2conMN,
                setTrung2conMN,
                trungdauduoiMN,
                setTrungdauduoiMN,
                trungdathangMN,
                setTrungdathangMN,
                typeTrungdathangMN,
                setTypeTrungdathangMN,
                typeTrungdaxienMN,
                setTypeTrungdaxienMN,
                trungdaxienMN,
                setTrungdaxienMN,
                trung3conMN,
                setTrung3conMN,
                trung4conMN,
                setTrung4conMN,
                trungxiuchuMN,
                setTrungxiuchuMN,
                co2conMT,
                setCo2conMT,
                codauduoiMT,
                setCodauduoiMT,
                codathangMT,
                setCodathangMT,
                codaxienMT,
                setCodaxienMT,
                co3conMT,
                setCo3conMT,
                co4conMT,
                setCo4conMT,
                coxiuchuMT,
                setCoxiuchuMT,
                trung2conMT,
                setTrung2conMT,
                trungdauduoiMT,
                setTrungdauduoiMT,
                trungdathangMT,
                setTrungdathangMT,
                trungdaxienMT,
                setTrungdaxienMT,
                typeTrungdathangMT,
                setTypeTrungdathangMT,
                typeTrungdaxienMT,
                setTypeTrungdaxienMT,
                trung3conMT,
                setTrung3conMT,
                trung4conMT,
                setTrung4conMT,
                trungxiuchuMT,
                setTrungxiuchuMT,
                co2conMB,
                setCo2conMB,
                codauduoiMB,
                setCodauduoiMB,
                codathangMB,
                setCodathangMB,
                co3conMB,
                setCo3conMB,
                co4conMB,
                setCo4conMB,
                coxiuchuMB,
                setCoxiuchuMB,
                trung2conMB,
                setTrung2conMB,
                trungdauduoiMB,
                setTrungdauduoiMB,
                trungdathangMB,
                setTrungdathangMB,
                typeTrungdathangMB,
                setTypeTrungdathangMB,
                trung3conMB,
                setTrung3conMB,
                trung4conMB,
                setTrung4conMB,
                trungxiuchuMB,
                setTrungxiuchuMB,
            }}
        >
            {children}
        </MemberContext.Provider>
    );
};
