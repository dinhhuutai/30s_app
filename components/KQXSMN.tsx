import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'

const KQXSMN = ({kqxsMN, day}) => {
    
    let pro1 =
        day === 2 || day === 7
            ? 'tp'
            : day === 3
            ? 'br'
            : day === 4
            ? 'dn'
            : day === 5
            ? 'tn'
            : day === 6
            ? 'vl'
            : 'tg';

    let pro2 =
        day === 2
            ? 'dt'
            : day === 3
            ? 'vt'
            : day === 4
            ? 'ct'
            : day === 5
            ? 'ag'
            : day === 6
            ? 'bu'
            : day === 7
            ? 'la'
            : 'kg';

    let pro3 =
        day === 2
            ? 'cm'
            : day === 3
            ? 'bi'
            : day === 4
            ? 'st'
            : day === 5
            ? 'bt'
            : day === 6
            ? 'tv'
            : day === 7
            ? 'bp'
            : 'lt';

  return (
    <>
        <View className='flex-row justify-around gap-[4px] mt-[10px]'>

            <View className='flex-1 flex-col items-center px-[6px]'>
                <Text className='text-[16px] capitalize font-psemibold'>
                {day === 2 || day === 7
                                ? 'TP.HCM'
                                : day === 3
                                ? 'bến tre'
                                : day === 4
                                ? 'đồng nai'
                                : day === 5
                                ? 'tây ninh'
                                : day === 6
                                ? 'vĩnh long'
                                : 'tiền giang'}
                </Text>
            </View>

            <View className='flex-1 flex-col items-center px-[6px]'>
                <Text className='text-[16px] capitalize font-psemibold'>
                {day === 2
                                    ? 'đồng tháp'
                                    : day === 3
                                    ? 'vũng tàu'
                                    : day === 4
                                    ? 'cần thơ'
                                    : day === 5
                                    ? 'an giang'
                                    : day === 6
                                    ? 'bình dương'
                                    : day === 7
                                    ? 'long an'
                                    : 'kiên giang'}
                </Text>
            </View>

            <View className='flex-1 flex-col items-center px-[6px]'>
                <Text className='text-[16px] capitalize font-psemibold'>
                {day === 2
                                ? 'cà mau'
                                : day === 3
                                ? 'bạc liêu'
                                : day === 4
                                ? 'sóc trăng'
                                : day === 5
                                ? 'bình thuận'
                                : day === 6
                                ? 'trà vinh'
                                : day === 7
                                ? 'bình phước'
                                : 'đà lạt'}
                </Text>
            </View>
            {
                day === 7 && 
                <View className='flex-1 flex-col items-center px-[6px]'>
                    <Text className='text-[16px] capitalize font-psemibold'>
                    hậu giang
                    </Text>
                </View>
            }

        </View>

        <FlatList 
            data={kqxsMN}
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
                <View className='flex flex-col items-center'>
                    {
                    item?.[pro3]?.map((ch, idx) => (
                        <Text key={idx} className={`${(index === 0 || index === 8) ? 'text-[#fb0000] text-[18px] font-psemibold' : 'text-[15px]'}`}>{ch}</Text>
                    ))
                    }
                </View>
                {
                    day === 7 && 
                    <View className='flex flex-col items-center'>
                        {
                        item?.hg?.map((ch, idx) => (
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

export default KQXSMN