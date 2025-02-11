import * as React from 'react';
import { View, Image } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Screen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 bg-secondary/30'>
      <Image source={require('~/assets/images/red-wave.jpg')} className="h-full" resizeMode="contain" />
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <Card className='absolute bottom-0 w-full p-2 rounded-t-3xl border-0 bg-zinc-900 pt-10 pb-4'>
        <CardContent>
          <Text className='text-2xl items-center text-center font-semibold'>Ini Halaman Utama</Text>
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <View />
          <Button
            variant='outline'
            size='lg'
            className='w-full rounded-3xl'
          >
            <Text>Ini tombol</Text>
          </Button>
          <Button
            variant='ghost'
            className='w-full rounded-3xl'
            onPress={() => router.push('./login')}
          >
            <Text>Login page</Text>
          </Button>
          <Button
            variant='ghost'
            className='w-full rounded-3xl'
            onPress={() => router.push('./(main)/dashboard')}
          >
            <Text>Main menu</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
