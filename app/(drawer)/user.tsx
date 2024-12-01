import {
    View,
    Text,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
    TextInput,
    RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { AuthContext } from "@/context/AuthContext";
import { usePathname } from "expo-router";
import CustomButton from "@/components/CustomButton";
import axiosClient from "@/apis/axiosClient";
import { BASE_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "@/components/CustomAlert";

const User = () => {
    const { user, setUser } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);

    const [modalEditSucc, setModalEditSucc] = useState(false);

    const [name, setName] = useState(user?.info?.name);
    const [idTelegram, setIdTelegram] = useState(user?.info?.idTelegram);
    const [phone, setPhone] = useState(user?.info?.phone);
    const [username, setUsername] = useState(user?.info?.username);

    const pathname = usePathname();
    useEffect(() => {
        if (pathname === "/user") {
            setName(user?.info?.name);
            setIdTelegram(user?.info?.idTelegram);
            setPhone(user?.info?.phone);
            setUsername(user?.info?.username);
        }
    }, [pathname, user]);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setName(user?.info?.name);
        setIdTelegram(user?.info?.idTelegram);
        setPhone(user?.info?.phone);
        setUsername(user?.info?.username);
        setErrorName(false);
        setErrorPhone(false);
    }, []);

    const handleUpdate = async () => {
        if (!name) {
            setErrorName(true);
        } else if (
            !(/^\d+$/.test(phone) && phone.length >= 9 && phone.length <= 11) &&
            phone.length > 0
        ) {
            setErrorPhone(true);
        } else {
            const formData = {
                name,
                idTelegram,
                phone,
            };

            try {
                setIsLoading(true);
                const res = await axiosClient(
                    `${BASE_URL}/v1/user/update/${user?.info?._id}`,
                    {
                        method: "post",
                        data: formData,
                    }
                );

                if (res.success) {
                    setUser({
                        ...user,
                        info: res.user,
                    });

                    AsyncStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...user,
                            info: res.user,
                        })
                    );

                    setIsLoading(false);
                    setModalEditSucc(true);
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
    };

    return (
        <SafeAreaView className="h-full">
            {modalEditSucc && (
                <CustomAlert
                    modalVisible={modalEditSucc}
                    setModalVisible={setModalEditSucc}
                    handleOk={() => {}}
                    title={<Text>Thành công!!!</Text>}
                    text={<Text>Cập nhật thành công</Text>}
                />
            )}

            {isLoading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000,
                    }}
                >
                    <ActivityIndicator size="large" color={Colors.white} />
                </View>
            )}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="px-[14px] pb-[40px] mt-[10px]">
                    <Text className="text-[20px] font-psemibold">
                        Thông tin cá nhân
                    </Text>

                    <View className="mt-[10px] border-b-[1px] border-solid border-[#d3cece]">
                        <Text>Tài khoản</Text>
                        <TextInput
                            editable={false}
                            value={username}
                            onChangeText={(val) => setUsername(val)}
                            className="text-[16px] text-[#a99c9c]"
                            selectionColor="#333"
                        />
                    </View>

                    <View className="mt-[10px] border-b-[1px] border-solid border-[#d3cece]">
                        <Text>Tên</Text>
                        <View className="flex-row justify-center items-center">
                            <View className="flex-1">
                                <TextInput
                                    value={name}
                                    onChangeText={(val) => {
                                        setErrorName(false);
                                        setName(val);
                                    }}
                                    className="text-[16px]"
                                    selectionColor="#333"
                                />
                            </View>
                            {errorName && (
                                <Feather
                                    className=""
                                    name="alert-circle"
                                    size={20}
                                    color="red"
                                />
                            )}
                        </View>
                    </View>

                    <View className="mt-[10px] border-b-[1px] border-solid border-[#d3cece]">
                        <Text>Phòng id telegram</Text>
                        <TextInput
                            value={idTelegram}
                            onChangeText={(val) => setIdTelegram(val)}
                            className="text-[16px]"
                            selectionColor="#333"
                        />
                    </View>

                    <View className="mt-[10px] border-b-[1px] border-solid border-[#d3cece]">
                        <Text>Số điện thoại</Text>
                        <View className="flex-row justify-center items-center">
                            <View className="flex-1">
                                <TextInput
                                    value={phone}
                                    onChangeText={(val) => {
                                        setErrorPhone(false);
                                        setPhone(val);
                                    }}
                                    className="text-[16px]"
                                    selectionColor="#333"
                                />
                            </View>
                            {errorPhone && (
                                <Feather
                                    className=""
                                    name="alert-circle"
                                    size={20}
                                    color="red"
                                />
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 14 }} className="px-[14px]">
                <CustomButton
                    title="Cập nhật"
                    handlePress={() => handleUpdate()}
                    containerStyles={{ marginTop: 10 }}
                    textStyles={{ fontSize: 16 }}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

export default User;
