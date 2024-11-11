import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axiosClient from "../apis/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        info: null,
        token: null,
    });

    const handleLogin = async (username, password) => {
        try {
            const form = {
                username,
                password,
            };

            const res = await axiosClient(`${BASE_URL}/v1/user/login`, {
                method: "post",
                data: form,
            });

            if (res && res?.user?.isAdmin === false) {
                setUser({
                    info: res.user,
                    token: res.accessToken,
                });
                AsyncStorage.setItem(
                    "user",
                    JSON.stringify({
                        info: res.user,
                        token: res.accessToken,
                    })
                );
            } else {
                setError({
                  status: true,
                  message: 'Tài khoản hoặc mật khẩu không chính xác'
                })
            }
        } catch (error) {
            setError({
              status: true,
              message: 'Tài khoản hoặc mật khẩu không chính xác'
            })
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        setUser({
            info: null,
            token: null,
        });
        AsyncStorage.removeItem("user");
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let user = await AsyncStorage.getItem("user");

            setUser(
                user
                    ? JSON.parse(user)
                    : {
                          info: null,
                          token: null,
                      }
            );
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{ error, setError, handleLogin, handleLogout, isLoading, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
