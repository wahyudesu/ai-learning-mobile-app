import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "~/components/ui/avatar"; // Assuming you might want to add an avatar or profile picture

export default function AccountPage() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [username, setUsername] = useState("User123");
  const [email, setEmail] = useState("user@example.com");
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder function for settings action
  const handleSettings = () => {
    console.log("Navigating to settings...");
  };

  // Placeholder function for logout action
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <StatusBar barStyle="dark-content" />
        
        {/* Profile Header */}
        <View className="items-center mb-8">
          <Avatar imageSource={require('@/assets/images/learning.png')} size="lg" className="mb-4" />
          <Text className="text-2xl font-bold text-gray-800">{username}</Text>
          <Text className="text-lg text-gray-500">{email}</Text>
        </View>

        {/* Account Management Section */}
        <View className="space-y-4">
          {/* Button for Settings */}
          <TouchableOpacity
            onPress={handleSettings}
            className="bg-blue-500 py-3 rounded-lg shadow-md"
          >
            <Text className="text-white text-center font-semibold">Account Settings</Text>
          </TouchableOpacity>

          {/* Button for Viewing Activity */}
          <TouchableOpacity
            onPress={() => console.log("Viewing Activity...")}
            className="bg-green-500 py-3 rounded-lg shadow-md"
          >
            <Text className="text-white text-center font-semibold">View Activity</Text>
          </TouchableOpacity>

          {/* Button for Logout */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-3 rounded-lg shadow-md"
          >
            <Text className="text-white text-center font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
        
        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator size="large" color="#4CAF50" className="mt-6" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
