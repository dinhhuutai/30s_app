import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useContext, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerToggleButton,
} from "@react-navigation/drawer";
import { Redirect, router, usePathname } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
    const { handleLogout, user } = useContext(AuthContext);
    const pathname = usePathname();

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    if (user?.token === null) {
        return <Redirect href="/sign-in" />;
    }

    return (
        <>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: Colors.primary,
                        paddingBottom: 6,
                        paddingTop: "16%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            className="font-psemibold"
                            style={{
                                fontSize: 20,
                                marginLeft: 10,
                                color: Colors.white,
                            }}
                        >
                            10s
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.dispatch(
                                    DrawerActions.toggleDrawer()
                                )
                            }
                        >
                            <Feather name="menu" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign
                            name="home"
                            size={size}
                            color={pathname == "/home" ? "#fff" : "#000"}
                        />
                    )}
                    label={"Trang chủ"}
                    labelStyle={[
                        { color: pathname == "/home" ? "#fff" : "#000" },
                    ]}
                    className="font-pmedium]"
                    style={{
                        backgroundColor:
                            pathname == "/home" ? Colors.primary : "#fff",
                        marginTop: 10,
                    }}
                    onPress={() => {
                        router.push("/(drawer)/(tabs)/home");
                    }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign
                            name="user"
                            size={size}
                            color={pathname == "/user" ? "#fff" : "#000"}
                        />
                    )}
                    label={"Thông tin cá nhân"}
                    labelStyle={[
                        { color: pathname == "/user" ? "#fff" : "#000" },
                    ]}
                    className="font-pmedium"
                    style={{
                        backgroundColor:
                            pathname == "/user" ? Colors.primary : "#fff",
                        marginTop: 10,
                    }}
                    onPress={() => {
                        router.push("/user");
                    }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign
                            name="setting"
                            size={size}
                            color={pathname == "/setting" ? "#fff" : "#000"}
                        />
                    )}
                    label={"Cài đặt"}
                    labelStyle={[
                        { color: pathname == "/setting" ? "#fff" : "#000" },
                    ]}
                    className="font-pmedium"
                    style={{
                        backgroundColor:
                            pathname == "/setting" ? Colors.primary : "#fff",
                        marginTop: 10,
                    }}
                    onPress={() => {
                        router.push("/setting");
                    }}
                />
                <TouchableOpacity
                    onPress={() => handleLogout()}
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: "6%",
                        marginTop: 20,
                    }}
                >
                    <AntDesign name="logout" size={20} />
                    <Text className="font-pmedium" style={{ marginLeft: "6%" }}>
                        Đăng xuất
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <View
                style={{ marginBottom: 24 }}
                className="px-[16px] flex-row flex-wrap items-center justify-between"
            >
                <Text className="">Ngày hết hạn:</Text>
                <Text className="font-semibold">DD/MM/YYYY</Text>
            </View>
        </>
    );
};

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerLeft: () => (
                        <TouchableOpacity>
                            <DrawerToggleButton tintColor={Colors.white} />
                        </TouchableOpacity>
                    ),
                }}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        title: "Trang chủ",
                        headerTitleAlign: "center",
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTitleStyle: {
                            color: Colors.white,
                            fontSize: 20,
                        },
                    }}
                />
                <Drawer.Screen
                    name="user"
                    options={{
                        title: "Thông tin cá nhân",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTitleStyle: {
                            color: Colors.white,
                            fontSize: 20,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                className="mr-[14px]"
                                onPress={() =>
                                    router.push("/user/changePassword")
                                }
                            >
                                <Ionicons
                                    name="key-outline"
                                    size={26}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="setting"
                    options={{
                        title: "Cài đặt",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTitleStyle: {
                            color: Colors.white,
                            fontSize: 20,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                className="mr-[14px]"
                                onPress={() => {}}
                            >
                                <Feather
                                    name="download"
                                    size={26}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
};

export default DrawerLayout;
