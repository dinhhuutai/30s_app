import { View, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'

const Setting = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView className='h-full'>
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
              }}
        >
                <ActivityIndicator size='large' color={Colors.white} />
        </View>
      }
      <ScrollView>
        <View className='px-[14px] pb-[40px] mt-[10px]'>
            <Text className='text-[20px] font-psemibold'>Thông tin ứng dụng</Text>
        
            
            <View style={{paddingVertical: 14, marginTop: 18}} className='flex-row justify-between px-[8px] border-b-[1px] border-solid border-[#d3cece]'>
                <Text className='text-[16px]'>Tên ứng dụng</Text>
                <Text className='text-[16px] font-psemibold'>10s</Text>
            </View>
            
            <View style={{paddingVertical: 14}} className='flex-row justify-between px-[8px] border-b-[1px] border-solid border-[#d3cece]'>
                <Text className='text-[16px]'>Tên gói dữ liệu</Text>
                <Text className='text-[16px] font-psemibold'>app</Text>
            </View>
            
            <View style={{paddingVertical: 14}} className='flex-row justify-between px-[8px] border-b-[1px] border-solid border-[#d3cece]'>
                <Text className='text-[16px]'>Mã phiên bản</Text>
                <Text className='text-[16px] font-psemibold'>v1</Text>
            </View>
            
            <View style={{paddingVertical: 14}} className='flex-row justify-between px-[8px] border-b-[1px] border-solid border-[#d3cece]'>
                <Text className='text-[16px]'>Số phiên bản</Text>
                <Text className='text-[16px] font-psemibold'>0.0.1</Text>
            </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Setting