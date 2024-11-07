import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { MemberContext } from '@/context/MemberContext';

const MemberLayout = () => {

  const {handleSave, selecterMember, handleUpdate} = useContext(MemberContext);

  return (
    <Stack>
      <Stack.Screen name='addMember' 
                options={{
                    title: `Thêm mới`,
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
                      <TouchableOpacity className='' onPress={() => {handleSave()}}>
                        <Feather name="check" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      
      />
      <Stack.Screen name='[id]' 
                options={{
                    title: `Chi tiết - ${selecterMember?.name}`,
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
                      <TouchableOpacity className='' onPress={() => {handleUpdate()}}>
                        <Feather name="check" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
      
      />
    </Stack>
  )
}

export default MemberLayout