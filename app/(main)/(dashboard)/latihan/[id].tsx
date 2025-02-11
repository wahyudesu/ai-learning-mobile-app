import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router"; // Import useRouter

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type DataFile = {
  questions: Question[];
};

// Mapping file JSON berdasarkan ID
const dataFiles: Record<string, DataFile> = {
  "sejarah": require("~/data/sejarah.json"),
  "pengetahuan-umum": require("~/data/pengetahuan-umum.json"),
};

export default function SoalLatihanScreen() {
  const { id } = useLocalSearchParams(); // Ambil parameter dari URL
  const [selected, setSelected] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [data, setData] = useState<DataFile | null>(null);

  const [timeLeft, setTimeLeft] = useState(10); // Timer 1 menit
  const router = useRouter(); // Hook untuk melakukan redirect

  useEffect(() => {
    if (id && dataFiles[id]) {
      setData(dataFiles[id]); // Load soal berdasarkan ID
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return; // Cegah eksekusi ulang saat waktu sudah habis
  
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(timer); // Hentikan timer sebelum redirect
          router.replace("./score"); // Gunakan replace agar tidak bisa kembali dengan tombol back
          return 0; // Pastikan tidak ada angka negatif
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer); // Bersihkan interval saat unmount
  }, [timeLeft, router]);  

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">Memuat soal...</Text>
      </View>
    );
  }

  const questions = data.questions;
  const currentQuestion = questions[activePage];

  const handleAnswerSelection = (option: string) => {
    setSelected(option);
    if (option === currentQuestion.correctAnswer) {
      setModalMessage("Selamat, Anda benar!");
    } else {
      setModalMessage("Sayang sekali, Anda salah!");
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        {/* Header with Timer */}
        <SafeAreaView className="w-full bg-purple-200">
          <Text className="text-lg text-center text-black py-2">{`Waktu: ${timeLeft}s`}</Text>
          <ScrollView horizontal={true} className="w-full py-2">
            <View className="w-full flex-row px-2">
              {questions.map((_, i: number) => (
                <TouchableOpacity
                  key={i}
                  className={`w-10 h-10 rounded-full items-center justify-center mx-1 ${
                    activePage === i ? "bg-purple-500" : "bg-white"
                  }`}
                  onPress={() => setActivePage(i)}
                >
                  <Text className={`text-lg font-bold ${activePage === i ? "text-white" : "text-black"}`}>{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Soal */}
        <View className="flex-1 w-full p-6 bg-purple-200 justify-center">
          <Text className="text-2xl font-semibold text-center text-black">{currentQuestion.question}</Text>
        </View>

        {/* Navigasi Kiri & Kanan */}
        <View className="flex-row w-full justify-end gap-4 bg-purple-200 p-4">
          <TouchableOpacity disabled={activePage === 0} onPress={() => setActivePage(activePage - 1)}>
            <FontAwesome6 name="circle-chevron-left" size={42} color={activePage === 0 ? "gray" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity disabled={activePage === questions.length - 1} onPress={() => setActivePage(activePage + 1)}>
            <FontAwesome6 name="circle-chevron-right" size={42} color={activePage === questions.length - 1 ? "gray" : "black"} />
          </TouchableOpacity>
        </View>

        {/* Pilihan Jawaban */}
        <View className="w-full bg-white p-4 pt-12 pb-6">
          <View className="flex-row flex-wrap justify-between gap-2">
            {currentQuestion.options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                className={`w-[48%] p-4 rounded-lg mb-2 text-center ${
                  selected === option
                    ? option === currentQuestion.correctAnswer
                      ? "bg-black text-white"
                      : "bg-gray-800"
                    : "bg-gray-200"
                }`}
                onPress={() => handleAnswerSelection(option)}
              >
                <Text className={`text-center text-lg font-semibold ${selected === option ? "text-white" : "text-black"}`}>
                  {option} {selected === option && option === currentQuestion.correctAnswer ? "✅" : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Modal Feedback */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View className="flex-1 justify-center items-center bg-opacity-50">
            <View className="bg-white p-6 rounded-lg">
              <Text className="text-lg font-bold">{modalMessage}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4 bg-purple-500 p-2 rounded-lg">
                <Text className="text-white text-center">Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}
