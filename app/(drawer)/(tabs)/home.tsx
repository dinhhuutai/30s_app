import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from "react-native";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputDate from "@/components/InputDate";
import moment from "moment";
import axiosClient from "@/apis/axiosClient";
import { BASE_URL } from "@/config";
import KQXSMN from "@/components/KQXSMN";
import KQXSMT from "@/components/KQXSMT";
import KQXSMB from "@/components/KQXSMB";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [date, setDate] = useState(new Date());
    const [label, setLabel] = useState("mn");

    const [kqxsMB, setKqxsMB] = useState([]);
    const [kqxsMN, setKqxsMN] = useState([]);
    const [kqxsMT, setKqxsMT] = useState([]);

    useEffect(() => {
        handleFindKqxs();
    }, [date, label]);

    const handleFindKqxs = async () => {
        setIsLoading(true);
        const formattedDate = moment(date).format("DD/MM/YYYY");
        const res = await axiosClient(`${BASE_URL}/v1/kqxs/findKqxsByDate`, {
            method: "post",
            data: { date: formattedDate },
        });

        if (res?.success) {
            const mn = [];
            const mt = [];
            const mb = [];

            res?.data.map((e) => {
                if (e.domain === "mb") {
                    mb.push(e);
                } else if (e.domain === "mt") {
                    mt.push(e);
                } else if (e.domain === "mn") {
                    mn.push(e);
                }
            });

            const mnMain = [];
            let mangTmp0 = [];
            let mangTmp1 = [];
            let mangTmp2 = [];
            let mangTmp3 = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0.push(mn[0]?.result[i]);
                mangTmp1.push(mn[1]?.result[i]);
                mangTmp2.push(mn[2]?.result[i]);
                mangTmp3.push(mn[3]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mn.length === 3) {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                        };
                    } else {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                            [mn[3]?.province]: mangTmp3,
                        };
                    }

                    mangTmp0 = [];
                    mangTmp1 = [];
                    mangTmp2 = [];
                    mangTmp3 = [];

                    mnMain.push(obj);
                }
            }

            const mtMain = [];
            let mangTmp0mt = [];
            let mangTmp1mt = [];
            let mangTmp2mt = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0mt.push(mt[0]?.result[i]);
                mangTmp1mt.push(mt[1]?.result[i]);
                mangTmp2mt.push(mt[2]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mt.length === 2) {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                        };
                    } else {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                            [mt[2]?.province]: mangTmp2mt,
                        };
                    }

                    mangTmp0mt = [];
                    mangTmp1mt = [];
                    mangTmp2mt = [];

                    mtMain.push(obj);
                }
            }

            const mbMain = [];
            let mangTmpmb = [];
            for (let i = 0; i < 27; i++) {
                mangTmpmb.push(mb[0]?.result[i]);

                if (
                    i === 0 ||
                    i === 2 ||
                    i === 8 ||
                    i === 12 ||
                    i === 18 ||
                    i === 21 ||
                    i === 25 ||
                    i === 26
                ) {
                    mbMain.push(mangTmpmb);

                    mangTmpmb = [];
                }
            }

            let lastElement = mbMain.pop();
            mbMain.unshift(lastElement);

            setKqxsMB(mbMain);
            setKqxsMT(mtMain);
            setKqxsMN(mnMain);
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setLabel("mn");
        setDate(new Date());
        handleFindKqxs();
    }, []);

    const scrollViewRef = useRef(null); // Tạo ref cho ScrollView
    const navigation = useNavigation(); // Lấy hook navigation

    useEffect(() => {
        // Lắng nghe sự kiện 'focus' khi người dùng quay lại tab hoặc màn hình
        const unsubscribe = navigation.addListener("focus", () => {
            // Cuộn về đầu trang khi màn hình trở lại focus
            if (scrollViewRef?.current) {
                scrollViewRef?.current?.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                });
            }
        });

        // Dọn dẹp sự kiện khi component unmount
        return unsubscribe;
    }, [navigation]);

    const [members, setMembers] = useState([
        {
            label: "Tất cả",
            value: "0",
        },
    ]);
    const [idMember, setIdMember] = useState();

    // useEffect(() => {
    //   console.log('TAITAITIAI')
    //   // Kiểm tra và yêu cầu quyền truy cập SMS
    //   const requestPermissions = async () => {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_SMS,
    //       {
    //         title: 'SMS Permission',
    //         message: 'App needs access to your SMS to read incoming messages',
    //       }
    //     );

    //     console.log('granted: ', granted)
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('SMS permission granted');
    //     } else {
    //       console.log('SMS permission denied');
    //     }
    //   };

    //   requestPermissions();

    //   // Đăng ký nhận tin nhắn SMS đến
    //   const subscription = SmsListener.addListener((message: any) => {
    //     console.log('New SMS received:', message);
    //     // message.sender - người gửi
    //     // message.body - nội dung tin nhắn
    //   });

    //   // Dọn dẹp khi component bị hủy
    //   return () => {
    //     subscription.remove();
    //   };
    // }, []);

    return (
        <SafeAreaView className="h-full">
            <StatusBar style="light" />
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
            <View className="flex flex-row gap-[4px] py-[4px] justify-center bg-[#e8e7e7]">
                <InputDate date={date} setDate={setDate} />
                <View className="flex flex-row gap-[2px] px-[4px] py-[4px] bg-[#bcd6e6] rounded-[4px]">
                    <TouchableOpacity
                        onPress={() => setLabel("mn")}
                        className={`w-[60px] ${
                            label === "mn" ? "bg-[#f3f1f1]" : ""
                        } py-[4px] flex justify-center items-center rounded-[4px]`}
                    >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-[16px] px-[4px]"
                        >
                            Nam
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLabel("mt")}
                        className={`w-[60px] ${
                            label === "mt" ? "bg-[#f3f1f1]" : ""
                        } py-[4px] flex justify-center items-center rounded-[4px]`}
                    >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-[16px] px-[4px]"
                        >
                            Trung
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLabel("mb")}
                        className={`w-[60px] ${
                            label === "mb" ? "bg-[#f3f1f1]" : ""
                        } py-[4px] flex justify-center items-center rounded-[4px]`}
                    >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-[16px] px-[4px]"
                        >
                            Bắc
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                ref={scrollViewRef}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="pb-[80px]">
                    {label === "mn" ? (
                        <KQXSMN kqxsMN={kqxsMN} day={date.getDay() + 1} />
                    ) : label === "mt" ? (
                        <KQXSMT kqxsMT={kqxsMT} day={date.getDay() + 1} />
                    ) : (
                        <KQXSMB kqxsMB={kqxsMB} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
