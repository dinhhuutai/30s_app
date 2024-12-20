import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RevenueContext } from '@/context/RevenueContext'
import { Colors } from '@/constants/Colors';
import InputDate from '@/components/InputDate';
import InputDropDown from '@/components/InputDropDown';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { AuthContext } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation, usePathname } from 'expo-router';
import CustomAlert from '@/components/CustomAlert';

const Revenue = () => {

  const { user } = useContext(AuthContext);
  const { modalPayProccess, setModalPayProccess, modalPaySuccess, setModalPaySuccess, selectRevenue, setSelectRevenue, handleFindRevenue, revenues, setRevenues, idMember, setIdMember, date, setDate, isLoading, setIsLoading} = useContext(RevenueContext);
  const [members, setMembers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [domain, setDomain] = useState('mn');
  
  const onRefresh = useCallback(() => {
    setIdMember('0');
    setDate(new Date());
  }, []);

  
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
            
            setIdMember('0');

            setMembers(membersTmp);
        }
    } catch (error) {}
  };

  useEffect(() => {
    handleFindAllMembers();
  }, [user?.info?._id])
  
  useEffect(() => {
    handleFindAllMembers();
  }, [])
  

  const pathname = usePathname();
  useEffect(() => {
    if(pathname === '/revenue') {
      setIdMember('0');
      setDate(new Date());
      handleFindAllMembers();

    }
  }, [pathname]);


  useEffect(() => {
    handleFindRevenue()
  }, [idMember, date])

  
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

  return (
    <SafeAreaView className='h-full'>
      
      {
        modalPayProccess &&
        <CustomAlert
          modalVisible={modalPayProccess}
          setModalVisible={setModalPayProccess}
          text={<><ActivityIndicator size='small' color='#333' /><Text>Đang dò kết quả</Text></>}
        />
      }
      {
        modalPaySuccess &&
        <CustomAlert
          modalVisible={modalPaySuccess}
          setModalVisible={setModalPaySuccess}
          handleOk={() => setIsLoading(false)}
          text={<Text>Dò kết quả thành công.</Text>}
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
      <View className='flex flex-row gap-[4px] py-[4px] px-[4px] justify-around bg-[#e8e7e7]'>
          <InputDate date={date} setDate={setDate} />
        
          <InputDropDown style={{width: '50%'}} members={members} idMember={idMember} setIdMember={setIdMember} />
          
      </View>

      <ScrollView
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
      >
        <View className='pb-[30px] px-[14px]'>
          <View className='mt-[16px]'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-[16px]'>Tổng M.Nam:</Text>
              <Text className={`text-[18px] font-semibold ${revenues[revenues.length - 1]?.tongMN > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{revenues[revenues.length - 1]?.tongMN ? parseFloat(revenues[revenues.length - 1]?.tongMN.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
            </View>
            
            <View className='flex-row justify-between items-center mt-[10px]'>
              <Text className='text-[16px]'>Tổng M.Trung:</Text>
              <Text className={`text-[18px] font-semibold ${revenues[revenues.length - 1]?.tongMT > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{revenues[revenues.length - 1]?.tongMT ? parseFloat(revenues[revenues.length - 1]?.tongMT.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
            </View>
            
            <View className='flex-row justify-between items-center mt-[10px]'>
              <Text className='text-[16px]'>Tổng M.Bắc:</Text>
              <Text className={`text-[18px] font-semibold ${revenues[revenues.length - 1]?.tongMB > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{revenues[revenues.length - 1]?.tongMB ? parseFloat(revenues[revenues.length - 1]?.tongMB.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
            </View>
            
            <View className='flex-row justify-between items-center mt-[10px]'>
              <Text className='text-[16px]'>Tổng:</Text>
              <Text className={`text-[18px] font-semibold ${revenues[revenues.length - 1]?.tongAll > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{revenues[revenues.length - 1]?.tongAll ? parseFloat(revenues[revenues.length - 1]?.tongAll.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
            </View>
          </View>

          <View className='mt-[14px]'>
            {
              revenues?.map((ren, index) => (
                index !== revenues.length - 1 &&
                <View key={index} className='py-[16px] border-t-[1px] border-solid border-[#d8d6d6]'>
                  <View className='flex justify-center items-center'>
                    <Text className='text-[16px]'>
                      {ren?.idMember?.name}
                      {
                            ren?.idMember?.runNumber &&
                            <Feather name="arrow-right-circle" size={16} color="black" />
                      }
                    </Text>
                  </View>

                  <View className='items-center justify-center'>
                    <View className='flex flex-row items-center w-[260px] gap-[2px] px-[4px] py-[4px] bg-[#d2e5f1] rounded-[4px] mt-[10px]'>
                      <TouchableOpacity onPress={() => setDomain('mn')} className={`w-[32.8%] ${domain === 'mn' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Nam</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDomain('mt')} className={`w-[32.8%] ${domain === 'mt' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Trung</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDomain('mb')} className={`w-[32.8%] ${domain === 'mb' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Bắc</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity onPress={() => {setSelectRevenue(
                      {
                        ...ren,
                        idMember: ren.idMember._id,
                        resultDate: date,
                        domain: domain,
                        name: ren.idMember.name,
                      }
                    ); router.push('/revenue/detailRevenue')}}>
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Điểm 2 con:</Text>
                        <Text className={`text-[15px] font-semibold`}>{ren?.[domain]?.diem2con ? parseFloat(ren?.[domain]?.diem2con.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
  
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Điểm 3,4 con:</Text>
                        <Text className={`text-[15px] font-semibold`}>{ren?.[domain]?.diem34con ? parseFloat(ren?.[domain]?.diem34con.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                      
  
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Tiền xác:</Text>
                        <Text className={`text-[15px] font-semibold ${ren?.[domain]?.tongxac > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{ren?.[domain]?.tongxac ? parseFloat(ren?.[domain]?.tongxac.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                      
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Tiền trúng:</Text>
                        <Text className={`text-[15px] font-semibold ${ren?.[domain]?.tongtrung > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{ren?.[domain]?.tongtrung ? parseFloat(ren?.[domain]?.tongtrung.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                      
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>{`Tổng ${domain === 'mn' ? 'MN' : domain === 'mt' ? 'MT' : 'MB'}:`}</Text>
                        <Text className={`text-[15px] font-semibold ${ren?.[domain]?.revenue > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{ren?.[domain]?.revenue ? parseFloat(ren?.[domain]?.revenue.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                    </TouchableOpacity>
                    
                    
                    <View className='flex-row justify-between items-center mt-[10px]'>
                      <Text className='text-[18px]'>Tổng <Text className='text-[#d9534f]'>thu</Text> | <Text className='text-[#2574ab]'>trả</Text>: </Text>
                      <Text className={`text-[18px] font-semibold ${ren?.idMember?.total > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{ren?.idMember?.total ? parseFloat(ren?.idMember?.total?.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                    </View>

                  </View>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollView>
      

    </SafeAreaView>
  )
}

export default Revenue