import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/modules/home/components/PlusButton';
import NoteCard from '@/modules/home/components/noteCard';
import { navigate } from '@/tools/navigation';

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '@/theme';
import SideBar from '@/modules/home/components/sideBar';
import { tr } from '@/locales/i18n';
import ThemeIcon from '@/assets/images/brush.png';
import SettingsIcon from '@/assets/images/gear.png';

const FAKE_NOTES = [
    {
        id: '1',
        title: 'Meeting with Team',
        body: 'Discuss the new features for the next sprint. Need to prepare slides and demo.',
        date: new Date('2026-03-01T10:00:00Z'),
    },
    {
        id: '2',
        title: 'Grocery List',
        body: 'Milk, Eggs, Bread, Butter, Chicken, Rice, Vegetables.',
        date: new Date('2026-02-28T14:30:00Z'),
    },
    {
        id: '3',
        title: 'Workout Plan',
        body: 'Monday: Chest & Triceps\nTuesday: Back & Biceps\nWednesday: Legs.',
        date: new Date('2026-02-27T08:00:00Z'),
    },
    {
        id: '4',
        title: 'Project Ideas',
        body: '1. AI driven task manager.\n2. Habit tracker with gamification.',
        date: new Date('2026-02-26T18:45:00Z'),
    },
    {
        id: '5',
        title: 'Book Recommendations',
        body: '- The Pragmatic Programmer\n- Clean Code\n- Designing Data-Intensive Applications',
        date: new Date('2026-02-25T20:15:00Z'),
    },
];

const HomeContent = () => {
    const [activeTab, setActiveTab] = React.useState('note');
    const navigation = useNavigation();

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handlePlusPress = () => {
        navigate('NoteDetails');
    };

    const handleMenuPress = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    const tabs = [
        {
            id: 'note',
            label: 'Notes',
            icon: require('@/assets/images/notes.png'),
        },
        {
            id: 'todo',
            label: "Todo's",
            icon: require('@/assets/images/todo.png'),
        },
    ];

    const UserName = 'John Doe';

    return (
        <View style={styles.container}>
            <HomeHeader title={UserName} onMenuPress={handleMenuPress} />
            <TabToggler
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {FAKE_NOTES.map(note => (
                    <NoteCard
                        key={note.id}
                        title={note.title}
                        body={note.body}
                        date={note.date}
                        onPress={() => console.log('Pressed note', note.id)}
                    />
                ))}
            </ScrollView>

            <View style={styles.plusButton}>
                <PlusButton onPress={handlePlusPress} />
            </View>
        </View>
    );
};

const Drawer = createDrawerNavigator();

const Home = () => {
    const sideBarItems = [
        {
            id: '1',
            name: tr('app.theme'),
            icon: ThemeIcon,
            onPress: () => {
                console.log('Navigate to Theme settings!');
            },
        },
        {
            id: '2',
            name: tr('app.settings'),
            icon: SettingsIcon,
            onPress: () => {
                console.log('Navigate to Settings!');
            },
        },
    ];

    return (
        <Drawer.Navigator
            drawerContent={props => (
                <SideBar sideBarItems={sideBarItems} {...props} />
            )}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    backgroundColor: COLORS.darkGray,
                },
                drawerActiveTintColor: COLORS.secondary,
                drawerInactiveTintColor: COLORS.gray,
            }}
        >
            <Drawer.Screen name="Home" component={HomeContent} />
        </Drawer.Navigator>
    );
};

export default Home;





