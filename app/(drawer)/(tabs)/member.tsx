import { View, Text, SafeAreaView, ScrollView, RefreshControl, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import useDebounce from '@/utils/useDebounce';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { AuthContext } from '@/context/AuthContext';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import { router, useNavigation, usePathname } from 'expo-router';
import { MemberContext } from '@/context/MemberContext';
import { Swipeable } from 'react-native-gesture-handler';
import CustomAlert from '@/components/CustomAlert';

const Member = () => {
  const {selecterMember, setSelecterMember, nameSearchDebounced, nameSearch, setNameSearch, members, setMembers, handleSearchMember, isLoading, setIsLoading} = useContext(MemberContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeSwipeIndex, setActiveSwipeIndex] = useState(null);
  const swipeableRefs = useRef([]);
  
  const onRefresh = useCallback(() => {
    setNameSearch('');
    handleSearchMember();
  }, []);
  
  useEffect(() => {
    handleSearchMember();
  }, [nameSearchDebounced]);
  
  const pathname = usePathname();
  useEffect(() => {
    try {
      if(pathname === '/member') {
        swipeableRefs?.current[activeSwipeIndex]?.close();
        handleSearchMember();
      }
    } catch (error) {
      
    }
  }, [pathname]);

  
  const scrollViewRef = useRef(null);  // Tạo ref cho ScrollView
  const navigation = useNavigation();  // Lấy hook navigation

  useEffect(() => {
    // Lắng nghe sự kiện 'focus' khi người dùng quay lại tab hoặc màn hình
    const unsubscribe = navigation.addListener('focus', () => {
      // Cuộn về đầu trang khi màn hình trở lại focus
      if (scrollViewRef?.current) {
        scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
      }
    });

    // Dọn dẹp sự kiện khi component unmount
    return unsubscribe;
  }, [navigation]);


  const [modalDelete, setModalDelete] = useState(false);
  const [selectMemberDelete, setSelectMemberDelete] = useState('');

  const renderRightActions = (progress, dragX) => {
      
    return (
      <TouchableOpacity
        className='flex justify-center px-[20px] bg-[#ef2828]'
        onPress={() => {
          // Hiển thị xác nhận xóa
          setModalDelete(true);
        }}
      >
        <Feather name="trash-2" size={28} color="#fff" />
      </TouchableOpacity>
    );
  };

  const handleSwipeOpen = (index, member) => {
    try {
      
      // Nếu có item đang mở, đóng nó
      if (activeSwipeIndex !== null && activeSwipeIndex !== index) {
        swipeableRefs.current[activeSwipeIndex]?.close(); // Đóng item trước đó
      }
      
      setActiveSwipeIndex(index);
      setSelectMemberDelete(member);
    } catch (error) {
      
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
        const res = await axiosClient(`${BASE_URL}/v1/member/delete/${selectMemberDelete?._id}`,
          {
            method: 'post',
            data: {},
          }
        );

        if (res?.success) {
            swipeableRefs.current[activeSwipeIndex]?.close();
            handleSearchMember();
        } else {
          setIsLoading(false);
        }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

  return (
    
    <SafeAreaView className='h-full'>
      {
        modalDelete &&
        <CustomAlert
          modalVisible={modalDelete}
          setModalVisible={setModalDelete}
          handleOk={() => handleDelete()}
          handleCancel={() => swipeableRefs.current[activeSwipeIndex]?.close()}
          title={'Xóa người chơi'}
          text={<Text>{`Bạn có muốn xóa người chơi "${selectMemberDelete.name}" này?`}</Text>}
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
                }}>
                    <ActivityIndicator size='large' color={Colors.white} />
                </View>
    }

      <View className='px-[14px] bg-[#eae7e7] py-[6px]'>
        <View className='flex-row py-[4px] bg-[#bcd6e6] rounded-[6px] items-center justify-center'>
          <Feather className='px-[8px]' name="search" size={24} color="black" />
          <TextInput value={nameSearch} onChangeText={val => setNameSearch(val)} cursorColor="black" placeholder='Nhập tên hoặc SĐT' className='flex-1 text-[16px]' />
          {
            nameSearch && <Feather onPress={() => setNameSearch('')} className='px-[4px]' name="x" size={18} color="black" />
          }
        </View>
      </View>

      <ScrollView
        className='flex flex-1 h-full bg-[#fff]'
        ref={scrollViewRef}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
      >
        <View className='px-[8px] flex-1 h-full pb-[40px] bg-[#fff]'>
          {
            members?.map((member, index) => (
              <Swipeable key={index} renderLeftActions={false} 
                ref={(ref) => (swipeableRefs.current[index] = ref)}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}
                onSwipeableWillOpen={() => handleSwipeOpen(index, member)}
              >
                <TouchableOpacity onPress={() => {setSelecterMember(member); router.push(`/member/${member?._id}`)}} className='flex-row bg-[#fff] border-b-[1px] border-solid border-[#dad8d8] items-center px-[6px] py-[14px]'>
                  <View className='flex-1 justify-center ml-[10px]'>
                    <View className='flex-row items-center'>
                      <Text numberOfLines={1} ellipsizeMode='tail' className='text-[18px]'>{member.name}</Text>
                      {
                        member.runNumber &&
                        <Feather name="arrow-right-circle" size={16} color="black" />
                      }
                    </View>
                    <View className='mt-[4px]'>
                      <Text numberOfLines={1} ellipsizeMode='tail' className=' text-[16px] text-[#908b8b]'>{member.phone.length > 0 ? '+' + member.phone[0] : ''}</Text>
                    </View>
                  </View>
                  <View className='w-[30%]'>
                    <Text numberOfLines={1} ellipsizeMode='tail' className='text-[#908b8b] text-[15px]'>{moment(member.createDate).format('DD/MM/YYYY')}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' className='text-[#908b8b] mt-[6px] text-[13px]'>{moment(member.createDate).format('hh:mm A')}</Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            ))
          }
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Member