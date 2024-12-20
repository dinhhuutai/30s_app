// import { View, Text, StyleSheet } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import RNPickerSelect from 'react-native-picker-select';
// import axiosClient from '@/apis/axiosClient';
// import { BASE_URL } from '@/config';
// import { AuthContext } from '@/context/AuthContext';
// import { Picker } from '@react-native-picker/picker';

// const InputDropDown = ({idMember, setIdMember, members, style}) => {
    
//   return (
//     <View style={{...style}} className='bg-[#bcd6e6] w-[60%] h-[38px] justify-center items-center rounded-[10px]'>
//         {/* <RNPickerSelect
//             onValueChange={(value) => setIdMember(value)}
//             items={members}
//             style={pickerSelectStyles}
//             value={idMember}
//         /> */}
//         <Picker
//           selectedValue={idMember}
//           onValueChange={(item) => setIdMember(item)}
//           style={styles.picker}
//         >
//           {
//             members?.map((mem, index) => (
//               <Picker.Item key={index} label={mem?.label} value={mem.value} />
//             ))
//           }
//         </Picker>
//     </View>
//   )
// }

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//       fontSize: 16,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       color: 'black',
//     },
//     inputAndroid: {
//       fontSize: 16,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       color: 'black',
//     },
// });

// const styles = StyleSheet.create({
//   dropdownContainer: {
//     backgroundColor: '#bcd6e6',
//     width: '60%',
//     height: 38,
//     justifyContent: 'center',
//     borderRadius: 10,
//   },
//   picker: {
//     width: '100%',
//   },
// });

// export default InputDropDown


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const InputDropDown = ({ idMember, setIdMember, members, style }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');


  const screenHeight = Dimensions.get('window').height;

  // Lọc danh sách theo tìm kiếm
  const filteredMembers = members.filter((mem) =>
    mem.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, style]}>
      {/* Nút mở modal */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.pickerButtonText}>
          {idMember
            ? members.find((mem) => mem.value === idMember)?.label
            : 'Chọn một mục'}
        </Text>
      </TouchableOpacity>

      {/* Modal chứa danh sách và ô tìm kiếm */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { maxHeight: screenHeight * 0.6 }]}>
            {/* Ô tìm kiếm */}
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={searchText}
              onChangeText={setSearchText}
            />

            {/* Danh sách chọn */}
            <FlatList
              data={filteredMembers}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setIdMember(item.value);
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.listItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Nút đóng */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    alignItems: 'center',
  },
  pickerButton: {
    backgroundColor: '#bcd6e6',
    padding: 8,
    borderRadius: 10,
    width: '100%',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#bcd6e6',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default InputDropDown;
