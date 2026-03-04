import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { auth } from '@/data/config';
import { getStorage } from '@/tools/storage';

export const useUpdateRemote = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const syncToRemote = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const user = auth().currentUser;
            if (!user) {
                setError('You must be logged in to sync.');
                return false;
            }

            const userDocRef = firestore().collection('users').doc(user.uid);

            // Sync notes
            const notesCountStr = getStorage('notes_count');
            const notesCount = notesCountStr ? parseInt(notesCountStr, 10) : 0;
            const notes: any[] = [];

            for (let i = 1; i <= notesCount; i++) {
                const noteStr = getStorage(`N${i}`);
                if (noteStr) {
                    try {
                        const noteData = JSON.parse(noteStr);
                        notes.push({ id: `N${i}`, ...noteData });
                    } catch (e) {
                        console.error(`Failed to parse note N${i}`);
                    }
                }
            }

            // Sync todos
            const todosCountStr = getStorage('todos_count');
            const todosCount = todosCountStr ? parseInt(todosCountStr, 10) : 0;
            const todos: any[] = [];

            for (let i = 1; i <= todosCount; i++) {
                const todoStr = getStorage(`TD${i}`);
                if (todoStr) {
                    try {
                        const todoData = JSON.parse(todoStr);
                        todos.push({ id: `TD${i}`, ...todoData });
                    } catch (e) {
                        console.error(`Failed to parse todo TD${i}`);
                    }
                }
            }

            // Write to Firestore
            await userDocRef.set(
                {
                    notes,
                    todos,
                    lastSyncedAt: firestore.FieldValue.serverTimestamp(),
                },
                { merge: true },
            );

            return true;
        } catch (err: any) {
            console.error('Sync failed:', err);
            setError('Sync failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { syncToRemote, isLoading, error };
};
