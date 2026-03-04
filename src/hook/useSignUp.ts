import { useState } from 'react';
import { auth } from '@/data/config';
import { setStorage } from '@/tools/storage';
import { useGetMe } from './useGeteMe';

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getMe } = useGetMe();

    const signUp = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            setStorage('connected', 'true');
            await getMe();
            return true;
        } catch (err: any) {
            const message =
                err?.code === 'auth/email-already-in-use'
                    ? 'This email is already in use.'
                    : err?.code === 'auth/invalid-email'
                    ? 'Invalid email address.'
                    : err?.code === 'auth/weak-password'
                    ? 'Password is too weak.'
                    : 'Sign up failed. Please try again.';
            setError(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { signUp, isLoading, error };
};
