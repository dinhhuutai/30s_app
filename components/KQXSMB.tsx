import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'

const KQXSMB = ({kqxsMB}) => {

  return (
    <>
        <View className='flex-1 flex-col items-center px-[6px] mt-[10px]'>
            <Text className='text-[16px] capitalize font-psemibold'>
                Miền Bắc
            </Text>
        </View>
        <FlatList 
            data={kqxsMB}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
                <View className={`flex-row flex-wrap w-[100%] justify-around flex-1 items-center mt-[14px]`}>
                        {
                            item?.map((ch, idx) => (
                                <Text key={idx} className={`${index === 3 || index === 5 || index === 6 ? 'w-[33%]' : ''} text-center ${(index === 0 || index === 7) ? 'text-[#fb0000] text-[18px] font-psemibold' : 'text-[15px]'}`}>{ch}</Text>
                            ))
                        }
                </View>
            )}
        />
    </>
  )
}

export default KQXSMB