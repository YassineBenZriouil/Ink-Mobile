import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes, { RootStackParamList } from './Routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}
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
