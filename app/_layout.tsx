import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userService";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth ,setUserData} = useAuth();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session User ", session?.user?.id);
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user)
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    let res = await getUserData(user.id);
    if(res?.success && res?.data){
      console.log("User Data", res.data);
      // You can set user data in context or state here if needed
      setUserData(res.data);
    }
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;

const styles = StyleSheet.create({});
