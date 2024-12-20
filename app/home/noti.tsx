import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'

const Noti = () => {

    const [isLoading, setIsLoading] = useState(false);

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
      <ScrollView>
        <View className='px-[14px] pb-[40px] mt-[10px]'>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Noti