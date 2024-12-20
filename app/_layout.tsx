import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
// Import your global CSS file
import "./global.css";
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';

import { AuthProvider } from '../context/AuthContext';
import { SmsProvider } from '../context/SmsContext';
import { RevenueProvider } from '../context/RevenueContext';
import { MemberProvider } from '../context/MemberContext';
import AppNav from './AppNav';
SplashScreen.preventAutoHideAsync();

const RooyLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <SmsProvider>
        <RevenueProvider>
          <MemberProvider>
            <AppNav />
          </MemberProvider>
        </RevenueProvider>
      </SmsProvider>
    </AuthProvider>
  )
}

export default RooyLayout

const styles = StyleSheet.create({})