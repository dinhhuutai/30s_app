import { View, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react'


const InputDate = ({date, setDate}) => {
    const [showPicker, setShowPicker] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowPicker(false); // Ẩn DateTimePicker
      setDate(currentDate); // Cập nhật ngày
    };
  
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
      const year = date.getFullYear();
      return `${day} thg ${month}, ${year}`;
    };

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
        <TouchableOpacity className='bg-[#bcd6e6] py-[8px] w-[150px] flex justify-center items-center rounded-[10px] px-[10px]' onPress={() => setShowPicker(true)}>
          <Text className='text-[16px]' numberOfLines={1} ellipsizeMode='tail'>
            {formatDate(date)}
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default InputDate