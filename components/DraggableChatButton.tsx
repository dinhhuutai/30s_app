import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const DraggableChatButton = ({setModalDistribute}) => {
  const [position, setPosition] = useState({ x: 14, y: 44 }); // Lưu vị trí nút
  const pan = useRef(new Animated.ValueXY(position)).current;

  useEffect(() => {
    // Cập nhật pan khi position thay đổi
    pan.setValue(position);
  }, [position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        let y = gestureState.dy;

        // Giới hạn di chuyển lên không quá 50px từ dưới cùng
        if (y < -150) {
          y = -150;
        }

        // Giới hạn di chuyển xuống không quá 54px từ dưới cùng
        if (y > 54) {
          y = 54;
        }

        // Cập nhật giá trị pan trực tiếp mà không thay đổi state
        pan.setValue({ x: gestureState.dx, y: y });
      },
      onPanResponderRelease: (e, gestureState) => {
        let newY = gestureState.moveY;

        // Giới hạn vị trí sau khi thả
        if (newY < -50) {
          newY = -50;
        } else if (newY > 54) {
          newY = 54;
        }

        // Cập nhật vị trí khi thả
        setPosition({ x: 14, y: 44 });

        // Đặt lại vị trí của nút khi thả
        Animated.spring(pan, {
          toValue: { x: 14, y: 44 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const openDistribute = () => {
    console.log(1234);
    setModalDistribute(true);
    // Thêm logic để mở kênh chat (navigating hoặc modal chat).
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.draggableButton,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers} // Gán panHandlers vào view
        pointerEvents="box-none"
      >
        <TouchableOpacity onPress={openDistribute} style={styles.buttonContent}>
          <Feather name="grid" size={26} color="#06bcee" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  draggableButton: {
    position: 'absolute',
    bottom: 54,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Hiệu ứng đổ bóng trên Android
    shadowColor: '#000', // Hiệu ứng đổ bóng trên iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99999,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default DraggableChatButton;
