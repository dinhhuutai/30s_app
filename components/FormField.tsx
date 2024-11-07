import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from "@/constants/Colors";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`} style={{marginTop: 10}}>
      <Text className="text-base font-pmedium">{title}</Text>

      <View style={{
        borderRadius: 6,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingHorizontal: 6,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }} 
      className="w-full h-16 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          style={{flex: 1, width: '100%'}}
          className="flex-1 text-[14px] text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Mật khẩu" && !showPassword}
          {...props}
        />

        {title === "Mật khẩu" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {
                !showPassword ?
                <Entypo name="eye" size={24} color="black" /> :
                <Entypo name="eye-with-line" size={24} color="black" />
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;