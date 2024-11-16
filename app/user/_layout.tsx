import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { MemberContext } from '@/context/MemberContext';

const UserLayout = () => {

  return (
    <Stack>
      <Stack.Screen name='changePassword' 
                options={{
                    title: `Thay đổi mật khẩu`,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    headerLeft: () => (
                      <TouchableOpacity style={{zIndex: 9999}} onPress={() => {console.log(123); router.back()}}>
                        <Feather name="arrow-left" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      
      />
    </Stack>
  )
}

export default UserLayout