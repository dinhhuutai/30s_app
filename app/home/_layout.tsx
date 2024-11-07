import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { MemberContext } from '@/context/MemberContext';

const NotiLayout = () => {

  return (
    <Stack>
      <Stack.Screen name='noti' 
                options={{
                    title: `Thông báo`,
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

export default NotiLayout