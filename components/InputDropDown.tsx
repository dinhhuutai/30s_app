import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { AuthContext } from '@/context/AuthContext';
import { Picker } from '@react-native-picker/picker';

const InputDropDown = ({idMember, setIdMember, members, style}) => {
    
  return (
    <View style={{...style}} className='bg-[#bcd6e6] w-[60%] h-[38px] flex justify-center items-center rounded-[10px]'>
        {/* <RNPickerSelect
            onValueChange={(value) => setIdMember(value)}
            items={members}
            style={pickerSelectStyles}
            value={idMember}
        /> */}
        <Picker
          selectedValue={idMember}
          onValueChange={(item) => setIdMember(item)}
          style={styles.picker}
        >
          {
            members?.map((mem, index) => (
              <Picker.Item key={index} label={mem?.label} value={mem.value} />
            ))
          }
        </Picker>
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

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: '#bcd6e6',
    width: '60%',
    height: 38,
    justifyContent: 'center',
    borderRadius: 10,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});

export default InputDropDown