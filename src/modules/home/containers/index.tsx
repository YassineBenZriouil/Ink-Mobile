import React, { useEffect, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/modules/home/components/PlusButton';
import NoteCard from '@/modules/home/components/noteCard';
import { navigate } from '@/tools/navigation';

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
    const [activeTab, setActiveTab] = React.useState('note');
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
                            color={COLORS.secondary}
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
