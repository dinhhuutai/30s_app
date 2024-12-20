import { View, Text, SafeAreaView, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import InputDropDown from '@/components/InputDropDown'
import { SmsContext } from '@/context/SmsContext'
import { AuthContext } from '@/context/AuthContext'
import axiosClient from '@/apis/axiosClient'
import { BASE_URL } from '@/config'
import InputDate from '@/components/InputDate'
import { Colors } from '@/constants/Colors'
import CustomAlert from '@/components/CustomAlert'
import Feather from '@expo/vector-icons/Feather';

const AddSms = () => {

  const { modalVisible, setModalVisible, setIsLoading, isLoading, date, setDate, idMember, setIdMember, errorLocation, setErrorLocation, content, setContent} = useContext(SmsContext);
  
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const textareaRef = useRef();
  
  
  useEffect(() => {
    handleFindAllMembers();
  }, [user?.info?._id]);

  const handleFindAllMembers = async () => {
    try {
      setIsLoading(true);
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
            
            setIdMember(membersTmp[0].value);

            setMembers(membersTmp);
            setIsLoading(false);
        }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setContent('');
    handleFindAllMembers();
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
        <View className='flex-row items-center justify-between mt-[14px]'>
          <Text className='text-[16px]'>Người chơi:</Text>
          <InputDropDown members={members} idMember={idMember} setIdMember={setIdMember} />
        </View>
        
        <View className='flex-row items-center justify-between mt-[10px]'>
          <Text className='text-[16px]'>Ngày xổ:</Text>
          <InputDate date={date} setDate={setDate} />
        </View>

        <View className='mt-[20px]'>
          {
          errorLocation?.length >= 2 && (
              <View className='border-[1px] h-[220px] border-[#bdc3d1] rounded-[4px] text-[16px] px-[8px] py-[6px] w-[100%]'>
                  <ScrollView className='h-[220px]'>
                    <TouchableOpacity className='h-[220px]' onPress={handleClearError}>
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
              height: errorLocation?.length >= 2 ? 0 : 220,
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
            placeholder="Nội dung gốc"
            numberOfLines={errorLocation?.length >= 2 ? 0 : 10}
            scrollEnabled={true}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddSms