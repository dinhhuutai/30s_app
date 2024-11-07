import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const CustomAlert = ({ modalVisible, setModalVisible, title, text, handleOk, handleCancel }) => {

  return (
  <Modal
    visible={modalVisible}
    transparent={true} // Đảm bảo có nền mờ khi modal hiển thị
    animationType="fade" // Kiểu hoạt ảnh khi hiển thị và ẩn
    onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn vào nút quay lại trên Android
  >
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        {
            title &&
            <View className='pb-[4px]'>
                <Text className='text-[16px] font-psemibold'>{title}</Text>
            </View>
        }
        <Text className={`${title ? 'mt-[4px]' : 'mt-[0px]'}`} style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#555',
          }}
        >{text}</Text>
        {
          (handleCancel || handleOk) &&
          <View className='justify-around border-t-[1px] mt-[20px] pt-[10px] border-solid border-[#e0e0e0]' style={styles.buttonContainer}>
            {
              handleCancel &&
              <TouchableOpacity style={styles.cancelButton} onPress={() => {handleCancel(); setModalVisible(false)}}>
                <Text style={styles.buttonText1}>Hủy</Text>
              </TouchableOpacity>
            }
            {
              handleOk &&
              <TouchableOpacity style={styles.confirmButton} onPress={() => {handleOk(); setModalVisible(false)}}>
                <Text className='font-semibold' style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            }
          </View>
        }
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    showAlertButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    showAlertText: {
      color: 'white',
      fontSize: 18,
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mờ nền sau modal
    },
    modalContainer: {
      width: '70%', // Chiều rộng của modal
      minHeight: 100, // Chiều cao tối thiểu
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 5 },
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    cancelButton: {
      backgroundColor: '#ccc',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    confirmButton: {
      //backgroundColor: '#007BFF',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText1: {
      color: 'white',
      fontSize: 14,
    },
    buttonText: {
      color: '#007BFF',
      fontSize: 14,
    },
  });

export default CustomAlert