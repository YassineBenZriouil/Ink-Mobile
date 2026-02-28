import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/modules/home/components/PlusButton';
import NoteCard from '@/modules/home/components/noteCard';
import { useNavigation } from '@react-navigation/native';

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

const Home = () => {
    const [activeTab, setActiveTab] = React.useState('note');
    const navigation = useNavigation();

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handlePlusPress = () => {
        navigation.navigate('NoteDetails');
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

    return (
        <View style={styles.container}>
            <HomeHeader />
            <TabToggler
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            <ScrollView
                style={{ flex: 1, marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
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

export default Home;





