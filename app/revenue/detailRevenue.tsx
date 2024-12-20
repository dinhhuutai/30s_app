import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RevenueContext } from '@/context/RevenueContext'
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { router } from 'expo-router';
import parseDate from '@/utils/parseDate';
import CustomAlert from '@/components/CustomAlert';

const DetailRevenue = () => {

  const { 
    contentCopy,
    setContentCopy, modalCopySuccess, setModalCopySuccess, idSms, setIdSms, selectRevenue, isLoading, setIsLoading } = useContext(RevenueContext);
  const [domain, setDomain] = useState('mn');
  const [smsDetails, setSmsDetails] = useState([]);
  
  useEffect(() => {
    handleGetData();
  }, [selectRevenue, domain]);

  const handleGetData = async () => {
      try {
          setIsLoading(true);
          const res = await axiosClient(
              `${BASE_URL}/v1/smsDetail/findSmsDetailByRevenueWin?resultDate=${selectRevenue.resultDate}`,
              {
                method: 'post',
                data: {
                  ...selectRevenue,
                  domain,
                }
              }
          );

          if (res.success) {
            
            const date = selectRevenue?.[domain] && parseDate(selectRevenue?.[domain]?.resultDate);
            let day; // Ngày trong tháng (1-31)
            let month; // Tháng (0-11), cộng thêm 1 để có giá trị tháng (1-12)
            let dayOfWeek;

            if(date) {
              day = date.getDate(); // Ngày trong tháng (1-31)
              month = date.getMonth() + 1; // Tháng (0-11), cộng thêm 1 để có giá trị tháng (1-12)
              dayOfWeek = date.getDay() + 1;
            }
            
            let contentTmp = `${selectRevenue.name}
              ${
                  selectRevenue?.[domain]?.tongxac > 0
                      ? `${domain === 'mn' ? 'M.Nam' : domain === 'mt' ? 'M.Trung' : 'M.Bắc'} ${
                            dayOfWeek === 1
                                ? 'chủ nhật'
                                : dayOfWeek === 2
                                ? 'thứ hai'
                                : dayOfWeek === 3
                                ? 'thứ ba'
                                : dayOfWeek === 4
                                ? 'thứ tư'
                                : dayOfWeek === 5
                                ? 'thứ năm'
                                : dayOfWeek === 6
                                ? 'thứ sáu'
                                : 'thứ bảy'
                        } ${day}/${month}
              2c:  ${parseFloat(selectRevenue[domain]?.diem2con.toFixed(1))?.toLocaleString('en-US') || 0}
              3,4c:  ${parseFloat(selectRevenue[domain]?.diem34con.toFixed(1))?.toLocaleString('en-US') || 0}
              Trúng:  ${parseFloat(selectRevenue[domain]?.tongtrung.toFixed(1))?.toLocaleString('en-US') || 0}
              ${selectRevenue[domain]?.revenue > 0 || !selectRevenue[domain]?.revenue ? 'Thu' : 'Bù'}:  ${
                            parseFloat(selectRevenue[domain]?.revenue.toFixed(1))?.toLocaleString('en-US') || 0
                        }`
                      : ''
              }`;

            setContentCopy(contentTmp)

              setSmsDetails(res.smsDetails);
              setIsLoading(false);
          }
      } catch (error) {
          console.log(error);
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
      
      {
        modalCopySuccess &&
        <CustomAlert
          modalVisible={modalCopySuccess}
          setModalVisible={setModalCopySuccess}
          text={<Text>Sao chép thành công</Text>}
        />
      }

      <ScrollView>
        <View className='pb-[30px] px-[14px] border-t-[1px] border-solid border-[#d8d6d6]'>
                  
                  
                  <View className='items-center justify-center'>
                    <View className='flex flex-row items-center w-full gap-[2px] px-[4px] py-[4px] bg-[#d2e5f1] rounded-[4px] mt-[10px]'>
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
                  
                  <View className='items-center mt-[10px]'>
                    <View className='border-[1px] items-center justify-center w-[210px] h-[160px] border-solid border-[#c7c3c3] rounded-[4px] py-[6px] px-[10px]'>
                      <ScrollView className='' scrollEnabled={true}><Text>{contentCopy}</Text></ScrollView>
                    </View>
                  </View>

                  <View className='mt-[14px]'>
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Điểm 2 con:</Text>
                        <Text className={`text-[15px] font-semibold`}>{selectRevenue?.[domain]?.diem2con ? parseFloat(selectRevenue?.[domain]?.diem2con.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
  
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Điểm 3,4 con:</Text>
                        <Text className={`text-[15px] font-semibold`}>{selectRevenue?.[domain]?.diem34con ? parseFloat(selectRevenue?.[domain]?.diem34con.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                      
                      
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Tổng điểm:</Text>
                        <Text className={`text-[15px] font-semibold`}>{(selectRevenue?.[domain]?.diem2con + selectRevenue?.[domain]?.diem34con) ? parseFloat((selectRevenue?.[domain]?.diem2con + selectRevenue?.[domain]?.diem34con).toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
  
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Tiền xác:</Text>
                        <Text className={`text-[15px] font-semibold ${selectRevenue?.[domain]?.tongxac > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{selectRevenue?.[domain]?.tongxac ? parseFloat(selectRevenue?.[domain]?.tongxac.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                      
                      <View className='flex-row justify-between items-center mt-[10px]'>
                        <Text className='text-[15px]'>Tiền trúng:</Text>
                        <Text className={`text-[15px] font-semibold ${selectRevenue?.[domain]?.tongtrung > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{selectRevenue?.[domain]?.tongtrung ? parseFloat(selectRevenue?.[domain]?.tongtrung.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                      </View>
                    
                    <View className='flex-row justify-between items-center mt-[10px]'>
                      <Text className='text-[18px]'>Tổng <Text className='text-[#d9534f]'>thu</Text> | <Text className='text-[#2574ab]'>trả</Text>: </Text>
                      <Text className={`text-[18px] font-semibold ${selectRevenue?.[domain]?.revenue > 0 ? 'text-[#d9534f]' : 'text-[#2574ab]'}`}>{selectRevenue?.[domain]?.revenue ? parseFloat(selectRevenue?.[domain]?.revenue?.toFixed(1))?.toLocaleString('en-US') : 0}</Text>
                    </View>

                  </View>

                  
          <View className='mt-[30px]'>
            <Text className='text-[20px] font-psemibold'>Chi tiết trúng</Text>

            <View className='mt-[6px] pb-[50px]'>
              <View className='flex-row gap-[2px] mb-[8px]'>
                <Text className='flex-1 text-[16px] font-pmedium'>Nội dung</Text>
                <Text className='w-[60px] px-[2px] text-[16px] text-center font-pmedium'>Đặt</Text>
                <Text className='w-[80px] px-[2px] text-[16px] text-center font-pmedium'>Trúng</Text>
              </View>

              {
                smsDetails?.map((sm, index) => (
                  <TouchableOpacity onPress={() => {setIdSms(sm.idSms); router.push('revenue/smsWin')}} key={index} className='flex-row gap-[2px] py-[14px] items-center justify-center border-t-[1px] border-solid border-[#e1d9d9]'>
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
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>
      

    </SafeAreaView>
  )
}

export default DetailRevenue