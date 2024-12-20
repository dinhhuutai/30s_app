import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import InputDate from '@/components/InputDate'
import { Colors } from '@/constants/Colors'
import InputDropDown from '@/components/InputDropDown';
import { Checkbox } from 'react-native-paper';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { AuthContext } from '@/context/AuthContext';
import { router, useNavigation, usePathname } from 'expo-router';
import { SmsContext } from '@/context/SmsContext';
import Feather from '@expo/vector-icons/Feather';
import DraggableChatButton from '@/components/DraggableChatButton';
import ModalDistribute from '@/components/ModalDistribute';

const Sms = () => {
  const { handleFindSms, sms, setSms, label, setLabel, idMember, setIdMember, deleted, setDeleted, isSelected, setIsSelected, isDelete, setIsDelete, date, setDate, isLoading, setIsLoading, listCheck, setListCheck, setCheckAll, checkAll } = useContext(SmsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [modalDistribute, setModalDistribute] = useState(false);

  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([{
      label: 'Tất cả',
      value: '0',
  }]);
  
  const pathname = usePathname();
  
  useEffect(() => {
    try {
      if(pathname === '/sms') {
        setIdMember('0');
        setDate(new Date());
      }
    } catch (error) {
      
    }
  }, [pathname]);
  
  const onRefresh = useCallback(() => {
    try {
      setLabel('mn');
      setIdMember('0');
      setDate(new Date());
      setDeleted(false);
      setIsDelete(false);
      setListCheck([]);
      handleFindSms();
    } catch (error) {
      
    }
  }, []);



  useEffect(() => {
    try {
      
      if(pathname === '/sms') {
        handleFindSms();
        setListCheck([]);
        setCheckAll(false);
      }
    } catch (error) {
      
    }
  }, [date, idMember, label, deleted]);

  const handleCheck = (id) => {
    try {
      let newArray = [];

      if(listCheck?.includes(id)) {
        newArray = listCheck?.filter(item => item !== id);
        
      } else {
        newArray = [...listCheck, id]
      }
      
      setListCheck(newArray)

      if(newArray?.length === sms?.length && sms?.length !== 0) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
    } catch (error) {
      
    }
  }
  

  
  useEffect(() => {
    try {
      handleFindAllMembers();
    } catch (error) {
      
    }
  }, [user?.info?._id]);

  const handleFindAllMembers = async () => {
      try {
          
          const resMembers = await axiosClient(`${BASE_URL}/v1/member/findAllMemberByIdUser/${user?.info?._id}`, {
              method: 'post',
              data: {},
          });


          if (resMembers?.success) {

              let membersTmp = resMembers?.members?.map((memb) => {
                  return {
                      label: memb?.name,
                      value: memb?._id,
                  }
              })
              
              membersTmp = [
                  {
                      label: 'Tất cả',
                      value: '0',
                  },
                  ...membersTmp,
              ]

              setMembers(membersTmp);
          }
      } catch (error) {}
  };

  
  const flatListRef = useRef(null); // Tham chiếu đến FlatList
  const navigation = useNavigation(); // Lấy hook navigation

  useEffect(() => {
    // Lắng nghe sự kiện 'focus' khi người dùng quay lại tab hoặc màn hình
    const unsubscribe = navigation?.addListener('focus', () => {
      // Cuộn về đầu khi màn hình trở lại focus
      if (flatListRef?.current) {
        flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 }); // Cuộn về đầu
      }
    });

    // Dọn dẹp sự kiện khi component unmount
    return unsubscribe;
  }, [navigation]);

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
      <View className='flex flex-row gap-[4px] py-[4px] px-[4px] justify-center bg-[#e8e7e7]'>
          <InputDate date={date} setDate={setDate} />
          <View className='flex flex-row gap-[2px] px-[4px] py-[4px] bg-[#bcd6e6] rounded-[4px]'>
            <TouchableOpacity onPress={() => setLabel('mn')} className={`w-[60px] ${label === 'mn' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
              <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLabel('mt')} className={`w-[60px] ${label === 'mt' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
              <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>Trung</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLabel('mb')} className={`w-[60px] ${label === 'mb' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
              <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>Bắc</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View className='flex flex-row gap-[4px] py-[4px] px-[4px] justify-around bg-[#e8e7e7]'>
        <InputDropDown members={members} idMember={idMember} setIdMember={setIdMember} />

        <View className='flex flex-row scale-110 justify-center items-center'>
          <Checkbox
            status={deleted ? 'checked' : 'unchecked'}
            onPress={() => {
              setDeleted(!deleted);
              setIsDelete(!deleted)
            }}
          />
          <Text onPress={() => {
              setDeleted(!deleted);
              setIsDelete(!deleted)
            }} style={{}}>Đã xóa</Text>
        </View>
      </View>
      
      <FlatList 
          ref={flatListRef}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
            initialNumToRender={5}
            scrollEnabled={true}
            data={sms}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
                <TouchableOpacity onLongPress={() => {setIsSelected(true); handleCheck(item?._id)}} onPress={() => isSelected ? handleCheck(item?._id) : isDelete ? {} : router.push(`/sms/${item?._id}`)} className={`flex-row items-center px-[8px] py-[10px] border-b-[1px] border-solid border-b-[#dddddd]`}>
                     {
                      isSelected ?
                      <View>
                        <Checkbox status={listCheck.includes(item?._id) ? 'checked' : 'unchecked'} />
                      </View> :
                     <View className={`h-[34px] rounded-[50px] flex justify-center items-center text-center w-[34px] ${isDelete ? 'bg-[#a08383]' : item?.statusSms === 'Đã xổ' ? 'bg-[#05c51f]' : item?.statusSms === 'Đã xử lý' || item?.statusSms === 'Đang xổ xử lý' ? 'bg-[#308cdd]' : 'bg-[#e63131]'}`}>
                        <Text className={`font-psemibold text-[16px] text-white`}>{index + 1}</Text>
                      </View> 
                     }  
                     <View className='ml-[12px] flex-1'>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[15px]'>
                          {item?.idMember?.name}
                          {
                            item?.idMember?.runNumber &&
                            <Feather name="arrow-right-circle" size={16} color="black" />
                          }
                        </Text> 
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[15px] text-[#605e5e] mt-[2px]'>{item?.contentEdit}</Text>
                        <View className='flex-row flex-wrap items-center text-[15px] mt-[2px]'>
                          <View className='flex-row'>
                            <Text className='font-psemibold text-[15px] ml-[4px]'>
                              <Text className='text-[14px] text-[#000] font-pregular mr-[6px]'>2c: </Text>
                              {item?.diem2con?.toLocaleString('en-US')}
                            </Text>
                          </View>
                          <View className='flex-row ml-[10px]'>
                            <Text className='font-psemibold text-[15px] ml-[4px]'>
                              <Text className='text-[14px] text-[#000] font-pregular mr-[6px]'>3,4c: </Text>
                              {item?.diem34con?.toLocaleString('en-US')}
                            </Text>
                          </View>
                          <View className='flex-row ml-[10px]'>
                            <Text className={`font-psemibold flex ml-[4px] ${item?.tongtrung > 0 ? 'text-[#0a58e0] text-[15px]' : 'text-[15px]'}`}>
                              <Text className='text-[14px] text-[#000] font-pregular'>Trúng: </Text>
                              {item?.tongtrung?.toLocaleString('en-US')}
                            </Text>
                          </View>
                        </View>
                     </View>   
                </TouchableOpacity>
            )}

            ListFooterComponent={
              <View className="p-4">
              </View>
          }
        />

        <DraggableChatButton setModalDistribute={setModalDistribute} />

        {
          modalDistribute &&
          <ModalDistribute modalDistribute={modalDistribute} setModalDistribute={setModalDistribute} />
        }

    </SafeAreaView>
  )
}



export default Sms