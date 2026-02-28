import React, { useEffect } from 'react';
import { View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import HomeHeader from '@/modules/home/components/homeHeader';
import TabToggler from '@/components/TabToggler';
import PlusButton from '@/components/PlusButton';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [activeTab, setActiveTab] = React.useState('note');
    const navigation = useNavigation();
    useEffect(() => {
        const init = async () => {
            try {
                await RNBootSplash.hide({ fade: true });
                console.log('Bootsplash hidden successfully');
            } catch (error) {
                console.warn('Bootsplash hide error:', error);
            }
        };
        init();
    }, []);

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
            <View style={styles.plusButton}>
                <PlusButton onPress={handlePlusPress} />
            </View>
        </View>
    );
};

export default Home;





