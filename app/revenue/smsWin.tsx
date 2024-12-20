import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RevenueContext } from '@/context/RevenueContext'
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { Colors } from '@/constants/Colors';

const SmsWin = () => {

    const {idSms, setIdSms, setIsLoading, isLoading} = useContext(RevenueContext);
    const [smsDetails, setSmsDetails] = useState([]);
    const [selectorSms, setSelectorSms] = useState();
    const [contentEdit, setContentEdit] = useState();

    useEffect(() => {
        handleFindData();
        handleFindSmsDetails();
    }, [idSms])
    
    
    const handleFindData = async () => {
        setIsLoading(true);
        const resSms = await axiosClient(`${BASE_URL}/v1/sms/findSmsById/${idSms}`, {method: 'post', data: {}});

        if (resSms.success) {
            setSelectorSms(resSms.sms);
            setContentEdit(resSms.sms.contentEdit);
        }
    };

    const handleFindSmsDetails = async () => {
        const resSmsDeatils = await axiosClient(
            `${BASE_URL}/v1/smsDetail/findSmsDetailByIdSms/${idSms}`, {method: 'post', data: {}},
        );

        if (resSmsDeatils.success) {
            setSmsDetails(resSmsDeatils.smsDetails);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

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
      <ScrollView className='px-[8px]'>
        <View className='mt-[10px]'>
            <Text className='text-[#555] mb-[2px]'>Nội dung gốc</Text>
          <TextInput
            value={selectorSms?.content} // Nếu có lỗi, không cho nhập
            style={{
              height: 150,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#bdc3d1',
              borderRadius: 4,
              fontSize: 16,
              paddingHorizontal: 8,
              paddingVertical: 6,
              width: '100%',
            }}
            className='text-[#8a8080]'
            multiline={true} // Cho phép nhập nhiều dòng
            placeholder="Nội dung gốc"
            numberOfLines={10}
            scrollEnabled={true}
            pointerEvents='none'
            textAlignVertical="top"
          />
        </View>
  
        <View className='mt-[4px]'>
        <Text className='text-[#555] mb-[2px]'>Nội dung đã sửa</Text>
          
        <TextInput
            value={selectorSms?.contentEdit} // Nếu có lỗi, không cho nhập
            style={{
              height: 150,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#bdc3d1',
              borderRadius: 4,
              fontSize: 16,
              paddingHorizontal: 8,
              paddingVertical: 6,
              width: '100%',
            }}
            className='text-[#8a8080]'
            multiline={true} // Cho phép nhập nhiều dòng
            placeholder="Nội dung gốc"
            numberOfLines={10}
            scrollEnabled={true}
            pointerEvents='none'
            textAlignVertical="top"
          />
        </View>
  
        <View className='mt-[10px]'>
          <View className='flex-row justify-between items-center'>
            <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt 2 con: </Text>
            <Text className='text-[16px]'>{selectorSms?.diem2con?.toLocaleString('en-US')}</Text>    
          </View>
          
          <View className='flex-row justify-between items-center mt-[6px]'>
            <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt 3,4 con: </Text>
            <Text className='text-[16px]'>{selectorSms?.diem34con?.toLocaleString('en-US')}</Text>    
          </View>
          
          <View className='flex-row justify-between items-center mt-[6px]'>
            <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt: </Text>
            <Text className='text-[16px]'>{selectorSms?.tongdiem?.toLocaleString('en-US')}</Text>    
          </View>
          
          <View className='flex-row justify-between items-center mt-[10px]'>
            <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng <Text className='text-[#d9534f]'>thu</Text> | <Text className='text-[#2574ab]'>trả</Text>: </Text>
            <Text className={`text-[18px] font-psemibold ${selectorSms?.revenue > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{selectorSms?.revenue ? parseFloat(selectorSms?.revenue?.toFixed(1))?.toLocaleString('en-US') : '0.0'}</Text>    
          </View>
        </View>
  
        <View className='mt-[20px]'>
          <Text className='text-[20px] font-psemibold'>Chi tiết tin</Text>
  
          <View className='mt-[6px] pb-[50px]'>
            <View className='flex-row gap-[2px] mb-[8px]'>
              <Text className='flex-1 text-[16px] font-pmedium'>Nội dung</Text>
              <Text className='w-[60px] px-[2px] text-[16px] text-center font-pmedium'>Đặt</Text>
              <Text className='w-[80px] px-[2px] text-[16px] text-center font-pmedium'>Trúng</Text>
            </View>
  
            {
              smsDetails?.map((sm, index) => (
                <View key={index} className='flex-row gap-[2px] py-[14px] items-center justify-center border-t-[1px] border-solid border-[#e1d9d9]'>
                  <Text className='flex-1 text-[16px]'>{sm.content}</Text>
                  <View className='relative'>
                        <Text className='w-[60px] px-[2px] text-center items-center justify-center text-[16px]'>{sm.price?.toLocaleString('en-US')}</Text>
                        {
                          sm.quantityLike > 1 && 
                          <Text className='absolute top-0 right-0 rounded-[50px] w-[14px] h-[14px] text-center justify-center items-center bg-[#d9534f] text-[10px] text-[#fff]'>
                            {sm?.quantityLike}
                          </Text>
                        }
                      </View>
                  <Text className={`w-[80px] px-[2px] text-center items-center justify-center text-[16px] font-semibold ${sm.tientrung > 0 ? 'text-[#0053d0]' : 'text-[#d9534f]'}`}>{parseFloat(sm.tientrung?.toFixed(1))?.toLocaleString('en-US')}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SmsWin