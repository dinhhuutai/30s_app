import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import { SmsContext } from '@/context/SmsContext';

const SmsLayout = () => {
  const { handleAddSms, handleEditSms } = useContext(SmsContext);

  return (
    <Stack>
      <Stack.Screen name='addSms' 
                options={{
                    title: 'Thêm tin',
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
                      <TouchableOpacity className='' onPress={() => handleAddSms()}>
                        <Feather name="check" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      />
      <Stack.Screen name='[id]' 
                options={{
                    title: 'Chỉnh tin',
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
                      <TouchableOpacity className='' onPress={() => handleEditSms()}>
                        <Feather name="check" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      />
    </Stack>
  )
}

export default SmsLayout