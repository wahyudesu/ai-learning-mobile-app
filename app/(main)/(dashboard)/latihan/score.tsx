import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-purple-200 justify-center items-center px-6">
      <StatusBar style="light" />
      <Image 
        source={require('~/assets/images/logo-dark.png')} 
        className="w-24 h-24 mb-6" 
        resizeMode="contain" 
      />
      
      <View className="bg-white p-6 rounded-lg w-full shadow-lg items-center">    
        <Text className="text-black text-3xl font-semibold mb-12 text-center">
          Selamat! Anda telah menyelesaikan soal
        </Text>

        <View className="bg-purple-500 w-full py-4 rounded-lg items-center">
          <Text className="text-white text-lg font-medium">Skor anda nol yahah goblog</Text>
        </View>

        {/* Tombol Latihan Lagi */}
        <TouchableOpacity 
          className="mt-4"
          onPress={() => router.push('./latihan')}
        >
          <Text className="text-purple-500 text-lg font-semibold">Latihan lagi?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
