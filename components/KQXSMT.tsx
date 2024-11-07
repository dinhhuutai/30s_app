import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'

const KQXSMT = ({kqxsMT, day}) => {
    let pro1 =
        day === 2
            ? 'py'
            : day === 3
            ? 'dl'
            : day === 4
            ? 'dg'
            : day === 5
            ? 'qb'
            : day === 6
            ? 'gl'
            : day === 7
            ? 'dg'
            : 'kh';

    let pro2 =
        day === 2
            ? 'hu'
            : day === 3
            ? 'qn'
            : day === 4
            ? 'kh'
            : day === 5
            ? 'bd'
            : day === 6
            ? 'nt'
            : day === 7
            ? 'qg'
            : 'kt';

    let pro3 = day === 5 ? 'qt' : day === 7 ? 'do' : day === 1 ? 'hu' : '';


  return (
    <>
        <View className='flex-row justify-around gap-[4px] mt-[10px]'>

            <View className='flex-1 flex-col items-center px-[6px]'>
                <Text className='text-[16px] capitalize font-psemibold'>
                {day === 2
                                ? 'phú yên'
                                : day === 3
                                ? 'đắk lắk'
                                : day === 4
                                ? 'đà nẵng'
                                : day === 5
                                ? 'quảng bình'
                                : day === 6
                                ? 'gia lai'
                                : day === 7
                                ? 'đà nẵng'
                                : 'khánh hòa'}
                </Text>
            </View>

            <View className='flex-1 flex-col items-center px-[6px]'>
                <Text className='text-[16px] capitalize font-psemibold'>
                {day === 2
                                ? 'Huế'
                                : day === 3
                                ? 'quảng nam'
                                : day === 4
                                ? 'khánh hòa'
                                : day === 5
                                ? 'bình định'
                                : day === 6
                                ? 'ninh thuận'
                                : day === 7
                                ? 'quảng ngãi'
                                : 'kom tum'}
                </Text>
            </View>

            {
                day === 1 || day === 5 || day === 7 &&
                <View className='flex-1 flex-col items-center px-[6px]'>
                    <Text className='text-[16px] capitalize font-psemibold'>
                    {day === 1 ? 'huế' : day === 5 ? 'quảng trị' : day === 7 ? 'đắc nông' : ''}
                    </Text>
                </View>
            }

        </View>

        <FlatList 
            data={kqxsMT}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
                <View className='flex-1 flex-row justify-around gap-[4px] mt-[10px]'>
                
                <View className='flex flex-col items-center'>
                    {
                    item?.[pro1]?.map((ch, idx) => (
                        <Text key={idx} className={`${(index === 0 || index === 8) ? 'text-[#fb0000] text-[18px] font-psemibold' : 'text-[15px]'}`}>{ch}</Text>
                    ))
                    }
                </View>
                <View className='flex flex-col items-center'>
                    {
                    item?.[pro2]?.map((ch, idx) => (
                        <Text key={idx} className={`${(index === 0 || index === 8) ? 'text-[#fb0000] text-[18px] font-psemibold' : 'text-[15px]'}`}>{ch}</Text>
                    ))
                    }
                </View>
                    {
                        day === 1 || day === 5 || day === 7 &&
                        <View className='flex flex-col items-center'>
                            {
                            item?.[pro3]?.map((ch, idx) => (
                                <Text key={idx} className={`${(index === 0 || index === 8) ? 'text-[#fb0000] text-[18px] font-psemibold' : 'text-[15px]'}`}>{ch}</Text>
                            ))
                            }
                        </View>
                    }
                </View>
            )}
        />
    </>
  )
}

export default KQXSMT