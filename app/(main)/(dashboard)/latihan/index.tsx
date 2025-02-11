import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Latihan() {
  const router = useRouter();
  const soalList = ["sejarah", "pengetahuan-umum"]; // Soal didefinisikan

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold mb-4 text-black">Pilih Soal Latihan</Text>
        {soalList.map((soal) => (
          <TouchableOpacity
            key={soal}
            className="bg-purple-500 p-4 rounded-lg mb-2 w-48 items-center"
            onPress={() => router.push(`./latihan/${soal}`)}
          >
            <Text className="text-white font-semibold capitalize">{soal.replace("-", " ")}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
