import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes, { RootStackParamList } from './Routes';
import { navigationRef } from '@/tools/navigation';
import { ThemeProvider } from '@/contexts/themeContext';
import { getStorage } from '@/tools/storage';
import { useGetMe } from '@/hook/useGeteMe';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
    const [initialRoute, setInitialRoute] = useState<
        keyof RootStackParamList | null
    >(null);
    const { getMe } = useGetMe();

    useEffect(() => {
        const checkAuth = async () => {
            const connected = getStorage('connected');
            if (connected === 'true') {
                await getMe();
                setInitialRoute('Home');
            } else {
                setInitialRoute('PreAuth');
            }
        };
        checkAuth();
    }, []);

    if (!initialRoute) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                }}
            >
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <ThemeProvider>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        gestureEnabled: true,
                    }}
                    initialRouteName={initialRoute}
                >
                    {Routes.map(route => (
                        <Stack.Screen
                            key={route.id}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default Router;
