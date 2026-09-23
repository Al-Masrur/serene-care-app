import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f8faf8]">
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
        
        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-16 h-16 bg-primary-fixed rounded-2xl items-center justify-center mb-6">
            {/* Using a text placeholder since we haven't loaded material icons yet */}
            <Text className="text-primary text-3xl">🛡️</Text>
          </View>
          <Text className="text-4xl font-bold text-on-surface mb-2 text-center">Serene Care</Text>
          <Text className="text-base text-on-surface-variant text-center px-6">
            Your tranquil journey to wellness begins with a single mindful step.
          </Text>
        </View>

        {/* Login Form Card */}
        <View className="bg-white/60 p-6 md:p-10 rounded-3xl border border-white/30">
          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-on-surface-variant mb-2 ml-3">Email Address</Text>
            <View className="bg-surface-container-low rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-on-surface-variant mr-2">✉️</Text>
              <TextInput
                className="flex-1 text-base"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center px-3 mb-2">
              <Text className="text-sm font-medium text-on-surface-variant">Password</Text>
              <TouchableOpacity>
                <Text className="text-sm font-medium text-primary">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-surface-container-low rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-on-surface-variant mr-2">🔒</Text>
              <TextInput
                className="flex-1 text-base"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text className="text-on-surface-variant">{showPassword ? '👁️‍🗨️' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity className="bg-primary rounded-xl py-4 items-center justify-center mb-8 flex-row shadow-sm">
            <Text className="text-white text-lg font-medium">Sign In</Text>
            <Text className="text-white ml-2">➡️</Text>
          </TouchableOpacity>

          {/* Social Logins */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-outline-variant" />
            <Text className="mx-4 text-sm text-outline-variant">or continue with</Text>
            <View className="flex-1 h-[1px] bg-outline-variant" />
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 items-center justify-center bg-surface-container-high py-4 rounded-xl mx-1">
              <Text>📱</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center justify-center bg-surface-container-high py-4 rounded-xl mx-1">
              <Text>🌐</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center justify-center bg-surface-container-high py-4 rounded-xl mx-1">
              <Text>👆</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8 flex-row justify-center">
          <Text className="text-on-surface-variant text-base">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold text-base">Join the community</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
