import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/modules/home/components/PlusButton';
import NoteCard from '@/modules/home/components/noteCard';
import TodoCard from '@/modules/home/components/todoCard';
import AddTodoPopUp from '@/modules/home/components/AddTodoPopUp';
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
import { useGetTodos } from '@/modules/home/hooks/useGetTodos';
import { TodoData } from '@/modules/home/hooks/useAddTodo';
import { tr } from '@/locales/i18n';
import ThemeIcon from '@/assets/images/brush.png';
import SettingsIcon from '@/assets/images/gear.png';
import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';
import { DARK_THEME, LIGHT_THEME } from '@/theme/colors';

const HomeContent = () => {
    const { theme } = useTheme();
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState('note');
    const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);
    const navigation = useNavigation();

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handlePlusPress = () => {
        if (activeTab === 'note') {
            navigate('NoteDetails', { newNote: true });
        } else {
            setIsAddTodoVisible(true);
        }
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

    const {
        notes,
        isLoading: isNotesLoading,
        refreshNotes,
        loadMore: loadMoreNotes,
    } = useGetNotes();
    const {
        todos,
        isLoading: isTodosLoading,
        refreshTodos,
        loadMore: loadMoreTodos,
    } = useGetTodos();

    useFocusEffect(
        useCallback(() => {
            refreshNotes();
            refreshTodos();
        }, [refreshNotes, refreshTodos]),
    );

    const { updateTodo } =
        require('@/modules/home/hooks/useUpdateTodo').useUpdateTodo();
    // TEMP: import for testing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { addTodo } = require('@/modules/home/hooks/useAddTodo').useAddTodo();

    const handleToggleMain = (todoItem: TodoData, newValue: boolean) => {
        const updatedTodo = {
            ...todoItem,
            isCompleted: newValue,
            todos: todoItem.todos.map(sub => ({
                ...sub,
                isCompleted: newValue,
            })),
        };
        updateTodo(todoItem.id, updatedTodo);
        refreshTodos();
    };

    const handleToggleSubTodo = (
        todoItem: TodoData,
        subId: string,
        newValue: boolean,
    ) => {
        const updatedSubTodos = todoItem.todos.map(sub =>
            sub.id === subId ? { ...sub, isCompleted: newValue } : sub,
        );

        // If all sub-todos are completed, mark the main one as completed too
        const allCompleted =
            updatedSubTodos.length > 0 &&
            updatedSubTodos.every(sub => sub.isCompleted);

        const updatedTodo = {
            ...todoItem,
            isCompleted: allCompleted,
            todos: updatedSubTodos,
        };
        updateTodo(todoItem.id, updatedTodo);
        refreshTodos();
    };

    const renderEmptyComponent = () => (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
            }}
        >
            <Text style={styles.noNotesText}>
                {activeTab === 'note'
                    ? tr('home.noNotesText')
                    : tr('home.noTodosText')}
            </Text>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        if (activeTab === 'note') {
            const noteItem = item as NoteItem;
            return (
                <NoteCard
                    title={noteItem.title}
                    body={noteItem.body}
                    date={noteItem.date}
                    onPress={() =>
                        navigate('NoteDetails', { noteId: noteItem.id })
                    }
                />
            );
        } else {
            const todoItem = item as TodoData;
            return (
                <TodoCard
                    data={todoItem}
                    onPress={() => {
                        // TODO: Navigate to Todo Details
                        console.log('Pressed Card:', todoItem.id);
                    }}
                    onToggleMain={val => handleToggleMain(todoItem, val)}
                    onToggleSubTodo={(subId, val) =>
                        handleToggleSubTodo(todoItem, subId, val)
                    }
                />
            );
        }
    };

    const isLoading = activeTab === 'note' ? isNotesLoading : isTodosLoading;

    // Sort array so that checked items are at the bottom
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.isCompleted === b.isCompleted) return 0;
        return a.isCompleted ? 1 : -1;
    });

    const listData = activeTab === 'note' ? notes : sortedTodos;
    const handleRefresh = activeTab === 'note' ? refreshNotes : refreshTodos;
    const handleLoadMore = activeTab === 'note' ? loadMoreNotes : loadMoreTodos;

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
                data={listData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={!isLoading ? renderEmptyComponent : null}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshing={isLoading && listData.length === 0}
                onRefresh={handleRefresh}
                ListFooterComponent={
                    isLoading && listData.length > 0 ? (
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

            <AddTodoPopUp
                visible={isAddTodoVisible}
                onClose={() => setIsAddTodoVisible(false)}
                onSubmit={(mode, title, subTodos) => {
                    addTodo(title, subTodos, false);
                    setTimeout(() => refreshTodos(), 500); // Wait for MMKV to save then refresh list
                }}
            />
        </View>
    );
};

const Drawer = createDrawerNavigator();

const themes = [
    {
        id: '1',
        name: 'Dark Theme',
        icon: require('@/assets/images/moon.png'),
    },
    {
        id: '2',
        name: 'Light Theme',
        icon: require('@/assets/images/sun.png'),
    },
];

const Home = () => {
    const styles = useStyles();
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

    const { theme, setTheme } = useTheme();

    const handleThemeClick = (selectedTheme: any) => {
        if (selectedTheme.name === 'Light Theme') {
            setTheme(LIGHT_THEME);
        } else {
            setTheme(DARK_THEME);
        }
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
