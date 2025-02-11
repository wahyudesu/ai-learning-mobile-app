import React, { useState } from "react";
import { 
  View, ScrollView, ActivityIndicator, 
  TouchableOpacity, SafeAreaView, StatusBar 
} from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { 
  Select, SelectItem, SelectGroup, SelectLabel, 
  SelectContent, SelectTrigger, SelectValue 
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tipe untuk soal dan pilihan jawabannya
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function App() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [numberQuestion, setNumberQuestion] = useState({ value: "10", label: "10" });
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!numberQuestion.value || !topic) {
      setError("Harap masukkan jumlah soal dan topik!");
      return;
    }

    const jumlahSoal = parseInt(numberQuestion.value, 10);
    if (isNaN(jumlahSoal) || jumlahSoal <= 0) {
      setError("Jumlah soal harus berupa angka positif!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://server-ts-3.bun-hono-backend.workers.dev/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number_question: jumlahSoal, topic }),
      });

      const data = await response.json();

      if (response.ok) {
        setQuestions(Array.isArray(data) ? data : [data]);
      } else {
        throw new Error(data.error || "API tidak memberikan respons yang valid");
      }
    } catch (err) {
      setError((err as Error).message || "Terjadi kesalahan saat memanggil API");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <StatusBar />
        <Text className="text-2xl font-bold text-center mb-6">
          Generate Soal
        </Text>
        <Text className="text-xl font-medium mb-2">
          Jumlah soal
        </Text>
        {/* Dropdown Select */}
        <View className="mb-6">
          <Select
            defaultValue={{ value: "10", label: "10" }}
            onValueChange={(selected) => setNumberQuestion(selected)}
            className="items-center"
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue className="text-foreground text-sm native:text-lg" placeholder={""} />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-[250px]">
              <SelectGroup>
                <SelectItem label="10" value="10">10</SelectItem>
                <SelectItem label="15" value="15">15</SelectItem>
                <SelectItem label="20" value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        {/* Input untuk topik */}
        <View className="mb-6">
          <Text className="text-xl font-medium mb-2">
            Topik Soal
          </Text>
          <Input 
            placeholder="Masukkan topik soal" 
            value={topic} 
            onChangeText={setTopic} 
          />
        </View>

        {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}

        <Button onPress={handleSubmit}>
          <Text>
            Generate soal
          </Text>
        </Button>

        {isLoading ? (
          <ActivityIndicator size="large" color="#4CAF50" className="mt-6" />
        ) : (
          questions.length > 0 && (
            <View className="mt-6">
              {questions.map((question, index) => (
                <View key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <Text className="font-semibold text-xl text-gray-800">
                    {question.question}
                  </Text>
                  {question.options.map((option, optionIndex) => (
                    <TouchableOpacity 
                      key={optionIndex} 
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
                    >
                      <Text className="text-lg text-gray-700">{option}</Text>
                    </TouchableOpacity>
                  ))}
                  <Text className="text-green-500 mt-4 text-lg">
                    Jawaban Benar: {question.correctAnswer}
                  </Text>
                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
