import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary rounded-[10px] min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        style={{...containerStyles, borderRadius: 10, backgroundColor: Colors.primary, minHeight: 50, justifyContent: 'center', alignItems: 'center', opacity: isLoading ? 50 : 100}}
    >
        <Text
            style={{...textStyles, color: Colors.white}}
            className={`text-white font-psemibold text-[14px]`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton