import { useState } from 'react';
import { auth } from '@/data/config';
import { removeItem } from '@/tools/storage';
import { useGlobalStore } from '@/store/globalStore';
import { resetRoot } from '@/tools/navigation';

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const clearAll = useGlobalStore(state => state.clearAll);

    const logout = async () => {
        setIsLoading(true);
        try {
            await auth().signOut();
            removeItem('connected');
            clearAll();
            resetRoot('PreAuth');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { logout, isLoading };
};
