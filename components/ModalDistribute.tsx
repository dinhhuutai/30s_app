import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import InputDropDown from './InputDropDown';
import { AuthContext } from '@/context/AuthContext';
import { SmsContext } from '@/context/SmsContext';
import axiosClient from '@/apis/axiosClient';
import { BASE_URL } from '@/config';
import { Colors } from '@/constants/Colors';
import * as Clipboard from "expo-clipboard";
import CustomAlert from './CustomAlert';


function arraysAreEqualSet(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false; // Khác số lượng phần tử thì không bằng
    return [...set1].every((value) => set2.has(value));
}

const ModalDistribute = ({modalDistribute, setModalDistribute}) => {

    const { idMember, setIdMember, date } = useContext(SmsContext);
    
    const { user } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleFindAllMembers();
      }, [user?.info?._id]);
    
      const handleFindAllMembers = async () => {
        try {
          setIsLoading(true);
            const resMembers = await axiosClient(`${BASE_URL}/v1/member/findAllMemberByIdUser/${user?.info?._id}`, {
                method: 'post',
                data: {},
            });
    
    
            if (resMembers.success) {
    
                let membersTmp = resMembers?.members.map((memb) => {
                    return {
                        label: memb.name,
                        value: memb._id,
                    }
                })
                
                setIdMember(membersTmp[0].value);
    
                setMembers(membersTmp);
                setIsLoading(false);
            }
        } catch (error) {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        handleFindAllMembers();
      }, [])

      
    const [contentBaoLo2con, setContentBaoLo2con] = useState('');
    const [contentBaoLo3con, setContentBaoLo3con] = useState('');
    const [contentBaoLo4con, setContentBaoLo4con] = useState('');
    const [contentXiuChu, setContentXiuChu] = useState('');
    const [contentDauDuoi, setContentDauDuoi] = useState('');
    const [contentBayLo, setContentBayLo] = useState('');
    const [contentTamLo, setContentTamLo] = useState('');
    const [contentDaThang, setContentDaThang] = useState('');
    const [contentDaXien, setContentDaXien] = useState('');

    const [modalCopySuccess, setModalCopySuccess] = useState(false);

    const [distributes, setDistributes] = useState({
        baolo2con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baolo3con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baolo4con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baylo: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        tamlo: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        daxien: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        dathang: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        xiuchu: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        dauduoi: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
    });

    useEffect(() => {
        setContentBaoLo2con('');
        setContentBaoLo3con('');
        setContentBaoLo4con('');
        setContentXiuChu('');
        setContentDauDuoi('');
        setContentBayLo('');
        setContentTamLo('');
        setContentDaThang('');
        setContentDaXien('');

        handleDistribute();
    }, [date, idMember]);

    const handleDistribute = async () => {
        try {
            setIsLoading(true);

            const resSmsDetail = await axiosClient(
                `${BASE_URL}/v1/smsDetail/findSmsDetailByIdMemberAndDomainAndDate/${user?.info?._id}?idMember=${idMember}&resultDate=${date}&domain=0`, {
                    
                    method: 'post',
                    data: {},
                }
            );
            
            console.log(resSmsDetail);

            const data = resSmsDetail?.smsDetails?.reduce(
                (accumulator, currentValue) => {
                    if (currentValue.typePlay === 'baolo' || currentValue.typePlay === 'baolodao') {
                        if (currentValue?.number[0]?.length === 2) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo2con = {
                                priceTotal: (accumulator.baolo2con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo2con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo2con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo2con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo2con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo2con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo2con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo2con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        } else if (currentValue?.number[0]?.length === 3) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo3con = {
                                priceTotal: (accumulator.baolo3con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo3con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo3con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo3con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo3con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo3con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo3con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo3con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        } else if (currentValue?.number[0]?.length === 4) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo4con = {
                                priceTotal: (accumulator.baolo4con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo4con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo4con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo4con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo4con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo4con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo4con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo4con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        }
                    } else if (
                        currentValue.typePlay === 'xiuchu' ||
                        currentValue.typePlay === 'xiuchudao' ||
                        currentValue.typePlay === 'xiuchudau' ||
                        currentValue.typePlay === 'xiuchudaudao' ||
                        currentValue.typePlay === 'xiuchuduoi' ||
                        currentValue.typePlay === 'xiuchuduoidao'
                    ) {
                        console.log('accumulator: ', accumulator);
                        accumulator.xiuchu = {
                            priceTotal: (accumulator.xiuchu?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.xiuchu?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.xiuchu?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.xiuchu?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.xiuchu.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.xiuchu.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.xiuchu.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.xiuchu.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (
                        currentValue.typePlay === 'dauduoi' ||
                        currentValue.typePlay === 'dau' ||
                        currentValue.typePlay === 'duoi'
                    ) {
                        console.log('accumulator: ', accumulator);
                        accumulator.dauduoi = {
                            priceTotal: (accumulator.dauduoi?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.dauduoi?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.dauduoi?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.dauduoi?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.dauduoi.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.dauduoi.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.dauduoi.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.dauduoi.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'baylo') {
                        console.log('accumulator: ', accumulator);
                        accumulator.baylo = {
                            priceTotal: (accumulator.baylo?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.baylo?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.baylo?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.baylo?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.baylo.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.baylo.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.baylo.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.baylo.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'tamlo') {
                        console.log('accumulator: ', accumulator);
                        accumulator.tamlo = {
                            priceTotal: (accumulator.tamlo?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.tamlo?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.tamlo?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.tamlo?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.tamlo.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.tamlo.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.tamlo.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.tamlo.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'da(thang)') {
                        console.log('accumulator: ', accumulator);
                        accumulator.dathang = {
                            priceTotal: (accumulator.dathang?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.dathang?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.dathang?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: [
                                ...(accumulator.dathang.contentTotal || []),
                                {
                                    province: currentValue.province,
                                    price: currentValue.price,
                                    typePlay: currentValue.typePlay,
                                    nums: currentValue.number,
                                },
                            ],
                        };
                    } else if (currentValue.typePlay === 'da(xien)') {
                        console.log('accumulator: ', accumulator);
                        accumulator.daxien = {
                            priceTotal: (accumulator.daxien?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.daxien?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.daxien?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: [
                                ...(accumulator.daxien.contentTotal || []),
                                {
                                    province: currentValue.province,
                                    price: currentValue.price,
                                    typePlay: currentValue.typePlay,
                                    nums: currentValue.number,
                                },
                            ],
                        };
                    }

                    return accumulator;
                },
                {
                    baolo2con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baolo3con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baolo4con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baylo: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    tamlo: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    daxien: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    dathang: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    xiuchu: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    dauduoi: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                },
            );

            if (resSmsDetail?.success) {
                setIsLoading(false);
                setDistributes(data);

                let content = '';
                data?.baolo2con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo2con(content);

                content = '';
                data?.baolo3con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo3con(content);

                content = '';
                data?.baolo4con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo4con(content);

                content = '';
                data?.baylo?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBayLo(content);

                content = '';
                data?.tamlo?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentTamLo(content);

                content = '';
                data?.daxien?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDaXien(content);

                content = '';
                data?.dathang?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDaThang(content);

                content = '';
                data?.xiuchu?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentXiuChu(content);

                content = '';
                data?.dauduoi?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDauDuoi(content);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    
    const handleCopy = async (contentCopy) => {
        setModalCopySuccess(true);
        await Clipboard.setStringAsync(contentCopy);
        setTimeout(() => setModalCopySuccess(false), 1000);
    };


  return (
    <View style={styles.container}>
    
    {
        modalCopySuccess &&
        <CustomAlert
          modalVisible={modalCopySuccess}
          setModalVisible={setModalCopySuccess}
          text={<Text>Sao chép thành công</Text>}
        />
      }
      <Modal
        animationType="slide"
        transparent={false} // Đảm bảo modal chiếm toàn bộ màn hình
        visible={modalDistribute}
        onRequestClose={() => setModalDistribute(false)}
      >
        
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
        <View style={styles.modalContainer}>
            <View className='h-[60px] mt-[80px] px-[20px] justify-between rounded-t-[10px] bg-[#06bcee] w-[100%] flex-row items-center'>
                <TouchableOpacity onPress={() => setModalDistribute(false)}>
                    <Feather size={26} name='x-circle' color='#fff' />
                </TouchableOpacity>
                <View>
                    <Text className='font-semibold text-[20px] text-white'>Phân loại đề</Text>
                </View>
                <View className=''>
                    <Feather size={24} name='x-circle' color='#06bcee' />
                </View>
            </View>
          <View style={styles.modalContent}>
            
            <View className='flex flex-row gap-[4px] py-[4px] px-[4px] justify-center bg-[#e8e7e7]'>
                <InputDropDown members={members} idMember={idMember} setIdMember={setIdMember} />
            </View>
            
            <ScrollView>
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Bao 2c: <Text className='font-psemibold'>{`${distributes?.baolo2con?.priceTotal?.toLocaleString()} = ${distributes?.baolo2con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo2con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentBaoLo2con)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentBaoLo2con} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Bao 3c: <Text className='font-psemibold'>{`${distributes?.baolo3con?.priceTotal?.toLocaleString()} = ${distributes?.baolo3con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo3con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentBaoLo3con)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentBaoLo3con} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                
                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Bao 4c: <Text className='font-psemibold'>{`${distributes?.baolo4con?.priceTotal?.toLocaleString()} = ${distributes?.baolo4con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo4con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentBaoLo4con)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentBaoLo4con} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Xỉu chủ: <Text className='font-psemibold'>{`${distributes?.xiuchu?.priceTotal?.toLocaleString()} = ${distributes?.xiuchu?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.xiuchu?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentXiuChu)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentXiuChu} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Đầu đuôi: <Text className='font-psemibold'>{`${distributes?.dauduoi?.priceTotal?.toLocaleString()} = ${distributes?.dauduoi?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.dauduoi?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentDauDuoi)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentDauDuoi} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Đá thẳng: <Text className='font-psemibold'>{`${distributes?.dathang?.priceTotal?.toLocaleString()} = ${distributes?.dathang?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.dathang?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentDaThang)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentDaThang} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Đá xiên: <Text className='font-psemibold'>{`${distributes?.daxien?.priceTotal?.toLocaleString()} = ${distributes?.daxien?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.daxien?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentDaXien)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentDaXien} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Bảy lô: <Text className='font-psemibold'>{`${distributes?.baylo?.priceTotal?.toLocaleString()} = ${distributes?.baylo?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baylo?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentBayLo)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentBayLo} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                
                <View className='mt-[10px] px-[20px] pb-[4px]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[16px]'>Tám lô: <Text className='font-psemibold'>{`${distributes?.tamlo?.priceTotal?.toLocaleString()} = ${distributes?.tamlo?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.tamlo?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</Text></Text>
                        <TouchableOpacity onPress={() => handleCopy(contentTamLo)}><Feather name='copy' size={24} color='#06bcee' /></TouchableOpacity>
                    </View>
                    
                    <View className='border-b-[1px] border-solid border-[#d7cbcb]'>
                        <TextInput
                            value={contentTamLo} // Nếu có lỗi, không cho nhập
                            style={{
                                height: 100,
                                borderRadius: 4,
                                fontSize: 16,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                width: '100%',
                            }}
                            className='text-[#1c1a1a]'
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={10}
                            scrollEnabled={true}
                            pointerEvents='none'
                            textAlignVertical="top"
                        />
                    </View>
                </View>
            </ScrollView>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối mờ khi modal xuất hiện
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ModalDistribute;
