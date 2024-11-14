import { View, Text, SafeAreaView, ActivityIndicator, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { MemberContext } from '@/context/MemberContext';
import { useLocalSearchParams } from 'expo-router';
import CustomAlert from '@/components/CustomAlert';

const DetailMember = () => {

  const {id} = useLocalSearchParams();

  const {
    modalEditSucc, setModalEditSucc,
    selecterMember,
    errorName, 
    setErrorName,
    isLoading,
    setIsLoading,
    domain,
    setDomain,
    name,
    setName,
    phone,
    setPhone,
    phoneTmp,
    setPhoneTmp,
    idTelegram,
    setIdTelegram,
    idWhatsApp,
    setIdWhatsApp,
    runNumber,
    setRunNumber,
    co2conMN,
    setCo2conMN,
    codauduoiMN,
    setCodauduoiMN,
    codathangMN,
    setCodathangMN,
    codaxienMN,
    setCodaxienMN,
    co3conMN,
    setCo3conMN,
    co4conMN,
    setCo4conMN,
    coxiuchuMN,
    setCoxiuchuMN,
    trung2conMN,
    setTrung2conMN,
    trungdauduoiMN,
    setTrungdauduoiMN,
    trungdathangMN,
    setTrungdathangMN,
    typeTrungdathangMN,
    setTypeTrungdathangMN,
    typeTrungdaxienMN,
    setTypeTrungdaxienMN,
    trungdaxienMN,
    setTrungdaxienMN,
    trung3conMN,
    setTrung3conMN,
    trung4conMN,
    setTrung4conMN,
    trungxiuchuMN,
    setTrungxiuchuMN,
    co2conMT,
    setCo2conMT,
    codauduoiMT,
    setCodauduoiMT,
    codathangMT,
    setCodathangMT,
    codaxienMT,
    setCodaxienMT,
    co3conMT,
    setCo3conMT,
    co4conMT,
    setCo4conMT,
    coxiuchuMT,
    setCoxiuchuMT,
    trung2conMT,
    setTrung2conMT,
    trungdauduoiMT,
    setTrungdauduoiMT,
    trungdathangMT,
    setTrungdathangMT,
    trungdaxienMT,
    setTrungdaxienMT,
    typeTrungdathangMT,
    setTypeTrungdathangMT,
    typeTrungdaxienMT,
    setTypeTrungdaxienMT,
    trung3conMT,
    setTrung3conMT,
    trung4conMT,
    setTrung4conMT,
    trungxiuchuMT,
    setTrungxiuchuMT,
    co2conMB,
    setCo2conMB,
    codauduoiMB,
    setCodauduoiMB,
    codathangMB,
    setCodathangMB,
    co3conMB,
    setCo3conMB,
    co4conMB,
    setCo4conMB,
    coxiuchuMB,
    setCoxiuchuMB,
    trung2conMB,
    setTrung2conMB,
    trungdauduoiMB,
    setTrungdauduoiMB,
    trungdathangMB,
    setTrungdathangMB,
    typeTrungdathangMB,
    setTypeTrungdathangMB,
    trung3conMB,
    setTrung3conMB,
    trung4conMB,
    setTrung4conMB,
    trungxiuchuMB,
    setTrungxiuchuMB,
  } = useContext(MemberContext);

  useEffect(() => {
    setName(selecterMember.name);
    setPhone(selecterMember.phone);
    setPhoneTmp();
    setIdTelegram(selecterMember.idTelegram);
    setIdWhatsApp(selecterMember.idWhatsApp);
    setRunNumber(selecterMember.runNumber);

    setCo2conMN(selecterMember.co2conMN);
    setCodauduoiMN(selecterMember.codauduoiMN);
    setCodathangMN(selecterMember.codathangMN);
    setCodaxienMN(selecterMember.codaxienMN);
    setCo3conMN(selecterMember.co3conMN);
    setCo4conMN(selecterMember.co4conMN);
    setCoxiuchuMN(selecterMember.coxiuchuMN);

    setTrung2conMN(selecterMember.trung2conMN);
    setTrungdauduoiMN(selecterMember.trungdauduoiMN);
    setTrungdathangMN(selecterMember.trungdathangMN);
    setTrungdaxienMN(selecterMember.trungdaxienMN);
    setTypeTrungdathangMN(selecterMember?.typeTrungdathangMN);
    setTypeTrungdaxienMN(selecterMember?.typeTrungdaxienMN);
    setTrung3conMN(selecterMember.trung3conMN);
    setTrung4conMN(selecterMember.trung4conMN);
    setTrungxiuchuMN(selecterMember.trungxiuchuMN);

    setCo2conMT(selecterMember.co2conMT);
    setCodauduoiMT(selecterMember.codauduoiMT);
    setCodathangMT(selecterMember.codathangMT);
    setCodaxienMT(selecterMember.codaxienMT);
    setCo3conMT(selecterMember.co3conMT);
    setCo4conMT(selecterMember.co4conMT);
    setCoxiuchuMT(selecterMember.coxiuchuMT);

    setTrung2conMT(selecterMember.trung2conMT);
    setTrungdauduoiMT(selecterMember.trungdauduoiMT);
    setTrungdathangMT(selecterMember.trungdathangMT);
    setTrungdaxienMT(selecterMember.trungdaxienMT);
    setTypeTrungdathangMT(selecterMember?.typeTrungdathangMT);
    setTypeTrungdaxienMT(selecterMember?.typeTrungdaxienMT);
    setTrung3conMT(selecterMember.trung3conMT);
    setTrung4conMT(selecterMember.trung4conMT);
    setTrungxiuchuMT(selecterMember.trungxiuchuMT);

    setCo2conMB(selecterMember.co2conMB);
    setCodauduoiMB(selecterMember.codauduoiMB);
    setCodathangMB(selecterMember.codathangMB);
    setCo3conMB(selecterMember.co3conMB);
    setCo4conMB(selecterMember.co4conMB);
    setCoxiuchuMB(selecterMember.coxiuchuMB);

    setTrung2conMB(selecterMember.trung2conMB);
    setTrungdauduoiMB(selecterMember.trungdauduoiMB);
    setTrungdathangMB(selecterMember.trungdathangMB);
    setTypeTrungdathangMB(selecterMember?.typeTrungdathangMB);
    setTrung3conMB(selecterMember.trung3conMB);
    setTrung4conMB(selecterMember.trung4conMB);
    setTrungxiuchuMB(selecterMember.trungxiuchuMB);

  }, [id])


  return (
    <SafeAreaView className='h-full'>
      
    {
      modalEditSucc &&
      <CustomAlert
        modalVisible={modalEditSucc}
        setModalVisible={setModalEditSucc}
        handleOk={() => {}}
        title={
          <Text>
            Thành công!!!
          </Text>}
        text={<Text>Cập nhật thành công</Text>}
      />
    }

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
        <View className='px-[14px] pb-[40px]'>
            <View className='mt-[10px]'>
                <Text className='text-[18px] font-psemibold'>Thông tin cơ bản</Text>
                <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                    <Text>Tên</Text>
                    <View className='flex-row justify-center items-center'>
                        <View className='flex-1'>
                            <TextInput value={name} onChangeText={val => {setErrorName(false); setName(val)}} className='text-[16px]' selectionColor="#333" />
                        </View>
                        {
                            errorName &&
                            <Feather className='' name="alert-circle" size={20} color="red"  />
                        }
                    </View>
                </View>
                
                <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                    <Text>Phòng id telegram</Text>
                    <TextInput value={idTelegram} onChangeText={val => setIdTelegram(val)} className='text-[16px]' selectionColor="#333" />
                </View>
                
                <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                    <Text>Phòng id whatsapp</Text>
                    <TextInput value={idWhatsApp} onChangeText={val => setIdWhatsApp(val)} className='text-[16px]' selectionColor="#333" />
                </View>
                
                <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                    <Text>Điện thoại</Text>
                    
                    <View className="flex-row gap-[4px] flex-wrap">
                                    {phone.map((e, index) => (
                                        <View key={index} className="px-[8px] text-center flex-row justify-center items-center py-[4px] bg-[#e0dcdc] text-[14px] text-[#000] w-fit rounded-[8px]">
                                            <Text className='text-[14px]'>{e}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const phoneArrNew = phone.filter((item) => item !== e);
                                                    setPhone(phoneArrNew);
                                                }}
                                                className="flex-row items-center justify-center ml-[6px] cursor-pointer"
                                            >
                                                <Feather className='' name="x" size={18} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                    <TextInput
                                    onBlur={() => {
                                        if (/^\d+$/.test(phoneTmp) && phoneTmp.length >= 9 && phoneTmp.length <= 11) {
                                            setPhone([...phone, phoneTmp]);
                                            setPhoneTmp('');
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();

                                            if (
                                                /^\d+$/.test(phoneTmp) &&
                                                phoneTmp.length >= 9 &&
                                                phoneTmp.length <= 11
                                            ) {
                                                setPhone([...phone, phoneTmp]);
                                                setPhoneTmp('');
                                            }
                                        }
                                    }} value={phoneTmp} onChangeText={val => setPhoneTmp(val)} className='text-[16px]' selectionColor="#333" />
                </View>
                
                <View className='mt-[10px] py-[18px] flex-row items-center border-b-[1px] border-solid border-[#d3cece]'>
                    <Text className='flex-1 text-[18px]'>Chạy số</Text>
                    <Switch
                        className=''
                        value={runNumber} 
                        onChange={() => setRunNumber(runNumber => !runNumber)} 
                        thumbColor={runNumber ? "#f5dd4b" : "#f4f3f4"}
                        trackColor={{ true: "#81b0ff", false: "#767577" }} 
                    />
                </View>

            </View>

            <View className='mt-[20px]'>
                <Text className='text-[18px] font-psemibold'>Tùy chỉnh người chơi</Text>
                
                <View className='items-center justify-center'>
                    <View className='flex flex-row items-center w-[260px] gap-[2px] px-[4px] py-[4px] bg-[#d2e5f1] rounded-[4px] mt-[10px]'>
                      <TouchableOpacity onPress={() => setDomain('mn')} className={`w-[32.8%] ${domain === 'mn' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Nam</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDomain('mt')} className={`w-[32.8%] ${domain === 'mt' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Trung</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDomain('mb')} className={`w-[32.8%] ${domain === 'mb' ? 'bg-[#f3f1f1]' : ''} py-[4px] flex justify-center items-center rounded-[4px]`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='text-[16px] px-[4px]'>M.Bắc</Text>
                      </TouchableOpacity>
                    </View>
                </View>

                {
                    domain === 'mn' ?
                    <View className='mt-[10px]'>
    
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 2 con MN</Text>
                            <TextInput keyboardType='number-pad' value={co2conMN.toString()} onChangeText={val => setCo2conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
    
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đầu đuôi MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codauduoiMN.toString()} onChangeText={val => setCodauduoiMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đá thẳng MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codathangMN.toString()} onChangeText={val => setCodathangMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đá xiên MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codaxienMN.toString()} onChangeText={val => setCodaxienMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 3 con MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co3conMN.toString()} onChangeText={val => setCo3conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò xỉu chủ MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={coxiuchuMN.toString()} onChangeText={val => setCoxiuchuMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 4 con MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co4conMN.toString()} onChangeText={val => setCo4conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 2 con MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung2conMN.toString()} onChangeText={val => setTrung2conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đầu đuôi MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdauduoiMN.toString()} onChangeText={val => setTrungdauduoiMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đá thẳng MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdathangMN.toString()} onChangeText={val => setTrungdathangMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Cách trúng đá thẳng MN</Text>
                            <View className='mt-[6px] flex-row justify-around'>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMN(true)} className='flex-row items-center'>
                                    <RadioButton
                                    onPress={() => setTypeTrungdathangMN(true)}
                                        status={typeTrungdathangMN ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Ky rưỡi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMN(false)} className='flex-row items-center'>
                                    <RadioButton 
                                    onPress={() => setTypeTrungdathangMN(false)}
                                        status={!typeTrungdathangMN ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Không Ky rưỡi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đá xiên MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdaxienMN.toString()} onChangeText={val => setTrungdaxienMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Cách trúng đá xiên MN</Text>
                            <View className='mt-[6px] flex-row justify-around'>
                                
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdaxienMN(true)} className='flex-row items-center'>
                                    <RadioButton
                                    onPress={() => setTypeTrungdaxienMN(true)}
                                        status={typeTrungdaxienMN ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Ky rưỡi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdaxienMN(false)} className='flex-row items-center'>
                                    <RadioButton 
                                    onPress={() => setTypeTrungdaxienMN(false)}
                                        status={!typeTrungdaxienMN ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Không Ky rưỡi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 3 con MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung3conMN.toString()} onChangeText={val => setTrung3conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng xỉu chủ MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungxiuchuMN.toString()} onChangeText={val => setTrungxiuchuMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 4 con MN</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung4conMN.toString()} onChangeText={val => setTrung4conMN(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
    
                    </View> :
                    domain === 'mt' ?
                    <View className='mt-[10px]'>
    
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 2 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co2conMT.toString()} onChangeText={val => setCo2conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
    
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đầu đuôi MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codauduoiMT.toString()} onChangeText={val => setCodauduoiMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đá thẳng MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codathangMT.toString()} onChangeText={val => setCodathangMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đá xiên MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codaxienMT.toString()} onChangeText={val => setCodaxienMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 3 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co3conMT.toString()} onChangeText={val => setCo3conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò xỉu chủ MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={coxiuchuMT.toString()} onChangeText={val => setCoxiuchuMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 4 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co4conMT.toString()} onChangeText={val => setCo4conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 2 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung2conMT.toString()} onChangeText={val => setTrung2conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đầu đuôi MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdauduoiMT.toString()} onChangeText={val => setTrungdauduoiMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đá thẳng MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdathangMT.toString()} onChangeText={val => setTrungdathangMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Cách trúng đá thẳng MT</Text>
                            <View className='mt-[6px] flex-row justify-around'>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMT(true)} className='flex-row items-center'>
                                    <RadioButton
                                    onPress={() => setTypeTrungdathangMT(true)}
                                        status={typeTrungdathangMT ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Ky rưỡi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMT(false)} className='flex-row items-center'>
                                    <RadioButton 
                                    onPress={() => setTypeTrungdathangMT(false)}
                                        status={!typeTrungdathangMT ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Không Ky rưỡi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đá xiên MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdaxienMT.toString()} onChangeText={val => setTrungdaxienMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Cách trúng đá xiên MT</Text>
                            <View className='mt-[6px] flex-row justify-around'>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdaxienMT(true)} className='flex-row items-center'>
                                    <RadioButton
                                    onPress={() => setTypeTrungdaxienMT(true)}
                                        status={typeTrungdaxienMT ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Ky rưỡi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdaxienMT(false)} className='flex-row items-center'>
                                    <RadioButton 
                                    onPress={() => setTypeTrungdaxienMT(false)}
                                        status={!typeTrungdaxienMT ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Không Ky rưỡi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 3 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung3conMT.toString()} onChangeText={val => setTrung3conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng xỉu chủ MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungxiuchuMT.toString()} onChangeText={val => setTrungxiuchuMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 4 con MT</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung4conMT.toString()} onChangeText={val => setTrung4conMT(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
    
                    </View> :
                    <View className='mt-[10px]'>

                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 2 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co2conMB.toString()} onChangeText={val => setCo2conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>

                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đầu đuôi MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codauduoiMB.toString()} onChangeText={val => setCodauduoiMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò đá thẳng MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={codathangMB.toString()} onChangeText={val => setCodathangMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                    
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 3 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co3conMB.toString()} onChangeText={val => setCo3conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò xỉu chủ MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={coxiuchuMB.toString()} onChangeText={val => setCoxiuchuMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Giá cò 4 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={co4conMB.toString()} onChangeText={val => setCo4conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 2 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung2conMB.toString()} onChangeText={val => setTrung2conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đầu đuôi MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdauduoiMB.toString()} onChangeText={val => setTrungdauduoiMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng đá thẳng MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungdathangMB.toString()} onChangeText={val => setTrungdathangMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Cách trúng đá thẳng MB</Text>
                            <View className='mt-[6px] flex-row justify-around'>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMB(true)} className='flex-row items-center'>
                                    <RadioButton
                                    onPress={() => setTypeTrungdathangMB(true)}
                                        status={typeTrungdathangMB ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Ky rưỡi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTypeTrungdathangMB(false)} className='flex-row items-center'>
                                    <RadioButton 
                                    onPress={() => setTypeTrungdathangMB(false)}
                                        status={!typeTrungdathangMB ? 'checked' : 'unchecked'}
                                    />
                                    <Text>Không Ky rưỡi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 3 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung3conMB.toString()} onChangeText={val => setTrung3conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng xỉu chủ MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trungxiuchuMB.toString()} onChangeText={val => setTrungxiuchuMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>
                        
                        <View className='mt-[10px] border-b-[1px] border-solid border-[#d3cece]'>
                            <Text>Trúng 4 con MB</Text>
                            <TextInput 
                                keyboardType='number-pad' 
                                value={trung4conMB.toString()} onChangeText={val => setTrung4conMB(val)} className='text-[18px]' selectionColor="#333" />
                        </View>

                    </View>
                }


            </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default DetailMember