import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { AuthContext } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';

const SignIn = () => {
    const {error, setError, handleLogin, user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const {username, password} = form

    const [isSubmitting, setIsSubmitting] = useState(false)

    if(user.token !== null && user?.info?.isAdmin === false) {
        
        return <Redirect href="/home" />
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        await handleLogin(username, password)
        setIsLoading(false);
    }

  return (
    <SafeAreaView style={{position: 'relative'}} className='h-full relative'>
        
        {
            isLoading &&
            <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10000,
                    }}>
                        <ActivityIndicator size='large' color={Colors.white} />
                    </View>
        }
      <ScrollView>
        <View style={{paddingHorizontal: 10}} className='w-full justify-center px-[6px]'>
            <Text style={{fontSize: 16, marginBottom: 20}} className='text-[10px] font-psemibold'>Đăng nhập vào 10s</Text>
        
            <FormField 
                title="Tài khoản"
                value={form.username}
                handleChangeText={(e) => {setError({
                    status: false,
                    message: ''
                  }); setForm({
                    ...form,
                    username: e,
                })}}
                keyBoardType="email-address"
            />
            
            <FormField 
                title="Mật khẩu"
                value={form.password}
                handleChangeText={(e) => {setError({
                    status: false,
                    message: ''
                  }); setForm({
                    ...form,
                    password: e,
                })}}
                keyBoardType="password"
            />
        
            {
                  error.status &&
                  <View className='mt-[14px] px-[4px] flex-row gap-[4px] items-center'>
                    <Feather className='' name="alert-triangle" size={16} color="red"  />
                    <Text style={{color: 'red'}} className=''>{error.message}</Text>
                  </View>
                }
        </View>
      </ScrollView>
      <View style={{marginBottom: 14}} className='px-[14px]'>
        
        <CustomButton 
                title='Đăng nhập'
                handlePress={() => handleSubmit()}
                containerStyles={{marginTop: 60}}
                textStyles={{fontSize: 16}}
                isLoading={isSubmitting}
            />
      </View>
    </SafeAreaView>
  )
}

export default SignIn