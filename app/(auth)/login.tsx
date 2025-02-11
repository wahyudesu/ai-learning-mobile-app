import * as React from 'react';
import { View, Image } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  return (
    <SafeAreaView className="flex-1">

      <Image 
        source={require('~/assets/images/puzzle.jpg')} 
        className=" top-0 left-0 w-full h-full"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <View>
        <Image source={require('~/assets/images/logo-white.png')} className="h-24 w-24" resizeMode="contain" />
      </View>
      <View className="absolute bottom-0 w-full p-2 rounded-t-3xl border-0 pt-10 pb-6 gap-4 px-4">
        <View className='items-center justify-center pb-12 gap-4'>
          <Image source={require('~/assets/images/logo-white.png')} className="h-24 w-24" resizeMode="contain" />
          <Text className="text-4xl font-semibold">OpenAIOIO</Text>
        </View>
        <Button 
          variant="default" 
          size="lg" 
          className="w-full rounded-3xl"
        >
          <Text className="text-lg font-semibold">Continue with Google</Text>
        </Button>
        <Button 
          variant="secondary"
          size="lg" 
          className="w-full rounded-3xl"
        >
          <Text className="text-base">Continue with Email</Text>
        </Button>
        <Button 
          variant="secondary"
          size="lg" 
          className="w-full rounded-3xl"
          onPress={() => router.push('/(main)/dashboard')}
        >
          <Text className="text-base">Continue without login</Text>
        </Button>
        <View className='flex-row items-center justify-center gap-1 pt-8'>
          <Button 
            variant="ghost"
            size="sm" 
            className="rounded-3xl"
          >
            <Text className="text-muted-foreground font-normal">Privacy policy</Text>
          </Button>
          <Button 
            variant="ghost"
            size="sm" 
            className="rounded-3xl"
          >
            <Text className="text-muted-foreground font-normal">Terms of service</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
