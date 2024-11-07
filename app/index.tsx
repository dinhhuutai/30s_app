import { Link, Redirect, router, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
    
    const {handleLogin, user} = useContext(AuthContext);

    if(user?.token !== null && user?.info?.isAdmin === false) {
        
        return <Redirect href="/home" />
    }


    return (
        <>
            <ImageBackground
                source={require('../assets/images/onBroading.png')}
                style={{flex: 1, justifyContent: 'flex-end'}}
                resizeMode='cover'
                className="flex items-center px-[6px]"
            >
                <View style={{marginBottom: '30%', width: '100%'}}>
                    <CustomButton 
                        title='Continue'
                        handlePress={() => router.push('/sign-in')}
                        containerStyles='w-full'
                    />
                </View>
            </ImageBackground>
        </>
    )
}