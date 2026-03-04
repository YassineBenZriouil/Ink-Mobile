import { useState } from 'react';
import { auth } from '@/data/config';
import { useGlobalStore } from '@/store/globalStore';

export const useGetMe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const setCurrentUser = useGlobalStore(state => state.setCurrentUser);

    const getMe = async () => {
        setIsLoading(true);
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const userData = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                };
                setCurrentUser(userData);
                return userData;
            }
            return null;
        } catch (error) {
            console.error('Failed to get user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { getMe, isLoading };
};
