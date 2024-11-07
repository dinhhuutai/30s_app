import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { AuthContext } from '@/context/AuthContext';

const InputDropDown = ({idMember, setIdMember, members, style}) => {
    

  return (
      
    <View style={{...style}} className='bg-[#bcd6e6] w-[60%] h-[38px] flex justify-center items-center rounded-[10px]'>
        <RNPickerSelect
            onValueChange={(value) => setIdMember(value)}
            items={members}
            style={pickerSelectStyles}
            value={idMember}
        />
    </View>
  )
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
    },
    inputAndroid: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
    },
  });

export default InputDropDown