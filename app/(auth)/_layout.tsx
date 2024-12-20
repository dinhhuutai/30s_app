import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Redirect, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { AuthContext } from '@/context/AuthContext'

const AuthLayout = () => {
    
  return (
    <>
        <Stack>
            <Stack.Screen 
                name='sign-in'
                options={{
                    title: '10s',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    gestureEnabled: false,
                }} 
            />
        </Stack>
    </>
  )
}

export default AuthLayout
