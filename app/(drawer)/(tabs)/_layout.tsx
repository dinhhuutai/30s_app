import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Link, router, Tabs, useNavigation } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { SmsContext } from '@/context/SmsContext';
import { Checkbox } from 'react-native-paper';
import { RevenueContext } from '@/context/RevenueContext';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center mt-[8px]'>
            {
                icon
            }
            <Text style={{flexDirection: 'row', width: '100%'}} className={`${focused ? 'font-psemibold text-[#fff]' : 'font-pregular text-[#ece1e1]'} text-[12px]`}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    const navigation = useNavigation();
    const { handleDeleteMany, handleRestoreMany, isSelected, setIsSelected, checkAll, setCheckAll, isDelete, setListCheck, 
        sms,
        setSms, } = useContext(SmsContext);
    const {payTotalRevenue} = useContext(RevenueContext)

  return (
    <>
        <Tabs 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                    borderTopWidth: 1,
                    borderTopColor: Colors.primary,
                    height: 54,
                },
                headerLeft: () => (
                  <TouchableOpacity>
                    <DrawerToggleButton tintColor={Colors.white} />
                  </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen 
                name='home' 
                options={{
                    title: 'Trang chủ',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={<AntDesign name="home" size={24} color={focused ? '#fff' : '#ece1e1'} />}
                            color={color}
                            name="Trang chủ"
                            focused={focused}
                        />
                    ),
                    headerRight: () => (
                      <TouchableOpacity className='mr-[14px]'  onPress={() => router.push('/home/noti')}>
                        <Feather name="bell" size={26} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
            />
            
            <Tabs.Screen 
                name='sms' 
                options={{
                    headerTitle: () => (
                        isSelected ?
                        (isDelete ?
                        <TouchableOpacity onPress={() => handleRestoreMany()}>
                            <Feather name="rotate-ccw" size={24} color='#fff' />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => handleDeleteMany()}>
                            <Feather name="trash" size={24} color='#fff' />
                        </TouchableOpacity>) :
                        <Text className='font-semibold text-[20px] text-white'>Tin nhắn</Text>
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={<Feather name="message-circle" size={24} color={focused ? '#fff' : '#ece1e1'} />}
                            color={color}
                            name="Tin nhắn"
                            focused={focused}
                        />
                    ),
                    headerLeft: () => (
                        isSelected ?
                        <TouchableOpacity className='ml-[14px]' onPress={() => {setIsSelected(false); setListCheck([])}}>
                            <Feather name="x-circle" size={24} color='#fff' />
                        </TouchableOpacity> :
                      <TouchableOpacity>
                        <DrawerToggleButton tintColor={Colors.white} />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                        isSelected ?
                        <View className='mr-[14px] scale-100'>
                            <Checkbox 
                                status={checkAll ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    if(!checkAll) {
                                        let newArray = sms.map(item => item?._id);
                                        setListCheck(newArray)
                                    } else {
                                        setListCheck([])
                                    }
                                    setCheckAll(!checkAll);
                                }}
                                uncheckedColor='white'
                            />
                        </View> :
                      <TouchableOpacity className='mr-[14px]' onPress={() => router.push('/sms/addSms')}>
                        <Feather name="plus-circle" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
            />
            
            <Tabs.Screen 
                name='revenue' 
                options={{
                    title: 'Doanh thu',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={<Ionicons name="stats-chart-outline" size={24} color={focused ? '#fff' : '#ece1e1'} />}
                            color={color}
                            name="Doanh thu"
                            focused={focused}
                        />
                    ),
                    headerRight: () => (
                      <TouchableOpacity className='mr-[14px]' onPress={() => {payTotalRevenue()}}>
                        <Feather name="rotate-ccw" size={24} color='#fff' />
                      </TouchableOpacity>
                    ),
                }} 
            />
            
            <Tabs.Screen 
                name='member' 
                options={{
                    title: 'Danh bạ',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontSize: 20,
                    },
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={<Feather name="users" size={24} color={focused ? '#fff' : '#ece1e1'} />}
                            color={color}
                            name="Danh bạ"
                            focused={focused}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity className='mr-[14px]' onPress={() => router.push('/member/addMember')}>
                          <Feather name="plus-circle" size={24} color='#fff' />
                        </TouchableOpacity>
                    ),
                }} 
            />
        </Tabs>
    </>
  )
}

export default TabsLayout