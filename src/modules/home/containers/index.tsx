import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/modules/home/components/PlusButton';
import NoteCard from '@/modules/home/components/noteCard';
import { navigate } from '@/tools/navigation';
import ThemesSelector from '@/components/ThmesSelector';

import {
    useNavigation,
    DrawerActions,
    useFocusEffect,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '@/theme';
import SideBar from '@/modules/home/components/sideBar';
import { useGetNotes, NoteItem } from '@/modules/home/hooks/useGetNotes';
import { tr } from '@/locales/i18n';
import ThemeIcon from '@/assets/images/brush.png';
import SettingsIcon from '@/assets/images/gear.png';

const HomeContent = () => {
    const [activeTab, setActiveTab] = useState('note');
    const navigation = useNavigation();

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handlePlusPress = () => {
        navigate('NoteDetails', { newNote: true });
    };

    const handleMenuPress = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    const tabs = [
        {
            id: 'note',
            label: tr('home.notes'),
            icon: require('@/assets/images/notes.png'),
        },
        {
            id: 'todo',
            label: tr('home.todos'),
            icon: require('@/assets/images/todo.png'),
        },
    ];

    const { notes, isLoading, refreshNotes, loadMore } = useGetNotes();

    useFocusEffect(
        useCallback(() => {
            refreshNotes();
        }, [refreshNotes]),
    );

    const renderEmptyComponent = () => (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
            }}
        >
            <Text style={styles.noNotesText}>{tr('home.noNotesText')}</Text>
        </View>
    );

    const renderItem = ({ item }: { item: NoteItem }) => (
        <NoteCard
            title={item.title}
            body={item.body}
            date={item.date}
            onPress={() => navigate('NoteDetails', { noteId: item.id })}
        />
    );

    const UserName = 'John Doe';

    return (
        <View style={styles.container}>
            <HomeHeader title={UserName} onMenuPress={handleMenuPress} />
            <TabToggler
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={!isLoading ? renderEmptyComponent : null}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                refreshing={isLoading && notes.length === 0}
                onRefresh={refreshNotes}
                ListFooterComponent={
                    isLoading && notes.length > 0 ? (
                        <ActivityIndicator
                            color={theme.secondary}
                            style={{ margin: 20 }}
                        />
                    ) : null
                }
            />

            <View style={styles.plusButton}>
                <PlusButton onPress={handlePlusPress} />
            </View>
        </View>
    );
};

const Drawer = createDrawerNavigator();

const themes = [
    {
        id: '1',
        name: 'Dark Theme',
        icon: 'https://via.placeholder.com/24', // Update icon paths accordingly
    },
    {
        id: '2',
        name: 'Light Theme',
        icon: 'https://via.placeholder.com/24',
    },
];

const Home = () => {
    const [isThemeSelectorVisible, setIsThemeSelectorVisible] = useState(false);

    const sideBarItems = [
        {
            id: '1',
            name: tr('app.theme'),
            icon: ThemeIcon,
            onPress: () => {
                setIsThemeSelectorVisible(true);
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

    const handleThemeClick = (theme: any) => {
        console.log('Selected theme:', theme);
        setIsThemeSelectorVisible(false);
    };

    return (
        <>
            <Drawer.Navigator
                drawerContent={props => (
                    <SideBar sideBarItems={sideBarItems} {...props} />
                )}
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerStyle: {
                        backgroundColor: theme.darkGray,
                    },
                    drawerActiveTintColor: theme.secondary,
                    drawerInactiveTintColor: theme.gray,
                }}
            >
                <Drawer.Screen name="Home" component={HomeContent} />
            </Drawer.Navigator>

            <ThemesSelector
                visible={isThemeSelectorVisible}
                onClose={() => setIsThemeSelectorVisible(false)}
                onThemeClick={handleThemeClick}
                theme={themes}
            />
        </>
    );
};

export default Home;
