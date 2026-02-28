import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { authStyles as styles } from './styles';
import Header from '@/components/Header';
import TrashIcon from '@/assets/images/trash.png';
import ThemeIcon from '@/assets/images/brush.png';
import ShareIcon from '@/assets/images/share.png';

const NoteDetails = () => {
const headerOptions = [
    {
        id: '1',
        name: 'Delete',
        icon: TrashIcon,
        onPress: () => console.log('Settings'),
    },
    {
        id: '2',
        name: 'Theme',
        icon: ThemeIcon,
        onPress: () => console.log('Theme'),
    },
    {
        id: '3',
        name: 'Share',
        icon: ShareIcon,
        onPress: () => console.log('Share'),
    },
];

return (
    <View style={styles.container}>
        <Header
            back
            title="Note Details"
            options={headerOptions}
            additionalStyle={{ marginBottom: 20 }}
        />
    </View>
);
};

export default NoteDetails;





