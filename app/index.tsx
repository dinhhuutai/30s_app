import { Redirect, router } from "expo-router";
import { ImageBackground, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
    const { handleLogin, user } = useContext(AuthContext);

    if (user?.token !== null && user?.info?.isAdmin === false) {
        return <Redirect href="/home" />;
    }

    return (
        <>
            <ImageBackground
                source={require("../assets/images/onBoarding.png")}
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingHorizontal: 6,
                }}
                resizeMode="cover"
                className="flex items-center px-[6px]"
            >
                <View style={{ marginBottom: "30%", width: "100%" }}>
                    <CustomButton
                        title="Continue"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles="w-full"
                    />
                </View>
            </ImageBackground>
        </>
    );
}
