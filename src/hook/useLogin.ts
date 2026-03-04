import { useState } from 'react';
import { auth } from '@/data/config';
import { setStorage } from '@/tools/storage';
import { useGetMe } from './useGeteMe';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getMe } = useGetMe();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            setStorage('connected', 'true');
            await getMe();
            return true;
        } catch (err: any) {
            const message =
                err?.code === 'auth/user-not-found'
                    ? 'No account found with this email.'
                    : err?.code === 'auth/wrong-password'
                    ? 'Incorrect password.'
                    : err?.code === 'auth/invalid-email'
                    ? 'Invalid email address.'
                    : err?.code === 'auth/too-many-requests'
                    ? 'Too many attempts. Please try again later.'
                    : 'Login failed. Please try again.';
            setError(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
