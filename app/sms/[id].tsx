import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { AuthContext } from '@/context/AuthContext';
import { SmsContext } from '@/context/SmsContext';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import CustomAlert from '@/components/CustomAlert';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import InputDropDown from '@/components/InputDropDown';
import InputDate from '@/components/InputDate';

const EditSms = () => {

  const {id} = useLocalSearchParams();
    
  const { smsDetails, setSmsDetails, selectorSms, setSelectorSms, selecMember, setSelecMember, modalEditSucc, setModalEditSucc, modalVisible, setModalVisible, setIsLoading, isLoading, date, setDate, idMember, setIdMember, errorLocation, setErrorLocation, content, setContent} = useContext(SmsContext);
  
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const textareaRef = useRef();
    
  
  useEffect(() => {
    handleGetData();
  }, [id])

  const handleGetData = async () => {
    setIsLoading(true);
    const resSms = await axiosClient(`${BASE_URL}/v1/sms/findSmsById/${id}`, {
        method: 'post',
        data: {},
    });

    if(resSms.success) {
      console.log(resSms.sms)
      setSelectorSms(resSms)
      setSelecMember(resSms.sms.idMember?._id)
      setContent(resSms?.sms?.contentEdit)
    }

    
    const resSmsDeatils = await axiosClient(
        `${BASE_URL}/v1/smsDetail/findSmsDetailByIdSms/${id}`, {
          method: 'post',
          data: {},
      }
    );

    if (resSmsDeatils.success) {
        setSmsDetails(resSmsDeatils.smsDetails);
    }

    setIsLoading(false);
  }
  
  useEffect(() => {
    handleFindAllMembers();
  }, [user?.info?._id]);

  const handleFindAllMembers = async () => {
    try {
        
        const resMembers = await axiosClient(`${BASE_URL}/v1/member/findAllMemberByIdUser/${user?.info?._id}`, {
            method: 'post',
            data: {},
        });


        if (resMembers.success) {

            let membersTmp = resMembers?.members.map((memb) => {
                return {
                    label: memb.name,
                    value: memb._id,
                }
            })

            setMembers(membersTmp);
        }
    } catch (error) {}
  };

  useEffect(() => {
    setContent('');
  }, [])

  const handleClearError = () => {
    setErrorLocation([]); // Xóa vị trí lỗi
    if (textareaRef.current) {
      textareaRef.current.focus(); // Đưa con trỏ vào TextInput
    }
  };

  return (
  <SafeAreaView className='h-full'>
    {
      modalVisible &&
      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleOk={() => setIsLoading(false)}
        title={
          <Text>
            Lỗi <Feather name="alert-triangle" size={18} color="black" />
          </Text>}
        text={<Text>Lỗi cú pháp!!!</Text>}
      />
    }
    
    {
      modalEditSucc &&
      <CustomAlert
        modalVisible={modalEditSucc}
        setModalVisible={setModalEditSucc}
        handleOk={() => {}}
        title={
          <Text>
            Thành công!!!
          </Text>}
        text={<Text>Đã xử lý tin nhắn</Text>}
      />
    }
    
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
      <View className='flex-row items-center justify-between mt-[10px]'>
        <Text className='text-[16px]'>Người chơi:</Text>
        <InputDropDown members={members} idMember={selecMember} setIdMember={setSelecMember} />
      </View>

      <View className='mt-[10px]'>
      <Text className='text-[#555] mb-[2px]'>Nội dung gốc</Text>

        <TextInput
          value={selectorSms?.sms?.content} // Nếu có lỗi, không cho nhập
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
        {
        errorLocation?.length >= 2 && (
            <View className='border-[1px] h-[150px] border-[#bdc3d1] rounded-[4px] text-[16px] px-[8px] py-[6px] w-[100%]'>
                <ScrollView className='h-[150px]'>
                  <TouchableOpacity className='h-[150px]' onPress={handleClearError}>
                    <Text className='text-[16px]'>
                      {content.slice(0, errorLocation[0])}
                      <Text  className='bg-[#F1AF00]'>
                        {content.slice(errorLocation[0], errorLocation[1])}
                      </Text>
                      <Text className=''>{content.slice(errorLocation[1])}</Text>
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
            </View>
          )
        }
        <TextInput
          ref={textareaRef}
          value={errorLocation?.length >= 2 ? '' : content} // Nếu có lỗi, không cho nhập
          onChangeText={setContent} // Cập nhật nội dung khi thay đổi
          style={{
            height: errorLocation?.length >= 2 ? 0 : 150,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#bdc3d1',
            borderRadius: 4,
            fontSize: 16,
            paddingHorizontal: errorLocation?.length >= 2 ? 0 : 8,
            paddingVertical: errorLocation?.length >= 2 ? 0 : 6,
            width: errorLocation?.length >= 2 ? 0 : '100%',
          }}
          multiline={true} // Cho phép nhập nhiều dòng
          placeholder="Nội dung chỉnh sửa"
          numberOfLines={errorLocation?.length >= 2 ? 0 : 10}
          scrollEnabled={true}
          textAlignVertical="top"
        />
      </View>

      <View className='mt-[10px]'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt 2 con: </Text>
          <Text className='text-[16px]'>{selectorSms?.sms?.diem2con?.toLocaleString('en-US')}</Text>    
        </View>
        
        <View className='flex-row justify-between items-center mt-[6px]'>
          <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt 3,4 con: </Text>
          <Text className='text-[16px]'>{selectorSms?.sms?.diem34con?.toLocaleString('en-US')}</Text>    
        </View>
        
        <View className='flex-row justify-between items-center mt-[6px]'>
          <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng đặt: </Text>
          <Text className='text-[16px]'>{selectorSms?.sms?.tongdiem?.toLocaleString('en-US')}</Text>    
        </View>
        
        <View className='flex-row justify-between items-center mt-[10px]'>
          <Text className='text-[15px] text-[#000] font-pregular mr-[6px]'>Tổng <Text className='text-[#d9534f]'>thu</Text> | <Text className='text-[#2574ab]'>trả</Text>: </Text>
          <Text className={`text-[18px] font-psemibold ${selectorSms?.sms?.revenue > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{selectorSms?.sms?.revenue ? parseFloat(selectorSms?.sms?.revenue?.toFixed(1))?.toLocaleString('en-US') : '0.0'}</Text>    
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

export default EditSms