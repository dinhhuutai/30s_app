import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import { SmsContext } from '@/context/SmsContext';
import { RevenueContext } from '@/context/RevenueContext';

const SmsLayout = () => {

  const { selectRevenue, handleCopy } = useContext(RevenueContext);


  return (
    <Stack>
      <Stack.Screen name='detailRevenue' 
                options={{
                    title: `Chi tiết - ${selectRevenue.name}`,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    headerLeft: () => (
                      <TouchableOpacity className='' onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity className='' onPress={() => {handleCopy()}}>
                        <Feather name="copy" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      />
      <Stack.Screen name='smsWin' 
                options={{
                    title: `Tin trúng - ${selectRevenue.name}`,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    headerLeft: () => (
                      <TouchableOpacity className='' onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      />
    </Stack>
  )
}

export default SmsLayout