import {
    View,
    Text,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
    TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import CustomAlert from "@/components/CustomAlert";
import axiosClient from "@/apis/axiosClient";
import { BASE_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/AuthContext";

const ChangePassword = () => {
    const { user, setUser } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [modalEditSucc, setModalEditSucc] = useState(false);

    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [rePasswordNew, setRePasswordNew] = useState("");

    const [errorPasswordOld, setErrorPasswordOld] = useState(false);
    const [errorPasswordNew, setErrorPasswordNew] = useState(false);
    const [errorRePasswordNew, setErrorRePasswordNew] = useState(false);

    const [error, setError] = useState({
        status: false,
        message: "",
    });

    const handleUpdate = async () => {
        if (!passwordOld) {
            setErrorPasswordOld(true);
        } else if (!passwordNew) {
            setErrorPasswordNew(true);
        } else if (passwordNew !== rePasswordNew) {
            setError({
                status: true,
                message: "Nhập lại mật khẩu mới không đúng",
            });
        } else {
            const formData = {
                password: passwordOld,
                passwordNew,
            };

            try {
                setIsLoading(true);
                const res = await axiosClient(
                    `${BASE_URL}/v1/user/changePassword/${user?.info?._id}`,
                    {
                        method: "post",
                        data: formData,
                    }
                );

                if (res.success) {
                    setUser({
                        info: res.user,
                        token: res.accessToken,
                    });

                    AsyncStorage.setItem(
                        "user",
                        JSON.stringify({
                            info: res.user,
                            token: res.accessToken,
                        })
                    );

                    setIsLoading(false);
                    setModalEditSucc(true);
                    setPasswordOld("");
                    setPasswordNew("");
                    setRePasswordNew("");
                } else {
                    setIsLoading(false);
                    setError({
                        status: true,
                        message: "Mật khẩu cũ không chính xác",
                    });
                }
            } catch (error) {
                setIsLoading(false);
                setError({
                    status: true,
                    message: "Mật khẩu cũ không chính xác",
                });
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
                    text={<Text>Đổi mật khẩu thành công</Text>}
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
            <ScrollView>
                <View className="px-[14px] pb-[40px] mt-[10px]">
                    <View className="mt-[10px] border-b-[1px] border-solid border-[#d3cece]">
                        <Text>Mật khẩu cũ</Text>
                        <View className="flex-row justify-center items-center">
                            <View className="flex-1">
                                <TextInput
                                    value={passwordOld}
                                    onChangeText={(val) => {
                                        setError({
                                            status: false,
                                            message: "",
                                        });
                                        setErrorPasswordOld(false);
                                        setPasswordOld(val);
                                    }}
                                    className="text-[16px]"
                                    selectionColor="#333"
                                />
                            </View>
                            {errorPasswordOld && (
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
                        <Text>Mật khẩu mới</Text>
                        <View className="flex-row justify-center items-center">
                            <View className="flex-1">
                                <TextInput
                                    value={passwordNew}
                                    onChangeText={(val) => {
                                        setError({
                                            status: false,
                                            message: "",
                                        });
                                        setErrorPasswordNew(false);
                                        setPasswordNew(val);
                                    }}
                                    className="text-[16px]"
                                    selectionColor="#333"
                                />
                            </View>
                            {errorPasswordNew && (
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
                        <Text>Nhập lại mật khẩu mới</Text>
                        <View className="flex-row justify-center items-center">
                            <View className="flex-1">
                                <TextInput
                                    value={rePasswordNew}
                                    onChangeText={(val) => {
                                        setError({
                                            status: false,
                                            message: "",
                                        });
                                        setErrorRePasswordNew(false);
                                        setRePasswordNew(val);
                                    }}
                                    className="text-[16px]"
                                    selectionColor="#333"
                                />
                            </View>
                            {errorRePasswordNew && (
                                <Feather
                                    className=""
                                    name="alert-circle"
                                    size={20}
                                    color="red"
                                />
                            )}
                        </View>
                    </View>

                    {error.status && (
                        <View className="mt-[14px] px-[4px] flex-row gap-[4px] items-center">
                            <Feather
                                className=""
                                name="alert-triangle"
                                size={16}
                                color="red"
                            />
                            <Text style={{ color: "red" }} className="">
                                {error.message}
                            </Text>
                        </View>
                    )}
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

export default ChangePassword;
