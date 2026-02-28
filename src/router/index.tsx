import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes, { RootStackParamList } from './Routes';
import { navigationRef } from '@/tools/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialRoute = 'Home';

const Router: React.FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}
                initialRouteName={initialRoute}
            >
                {Routes.map(route => (
                    <Stack.Screen
                        key={route.id}
                        name={route.name}
                        component={route.component}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
