import { useState, useEffect } from 'react';
import { getStorage } from '@/tools/storage';
import { Note } from './useAddNote';

export const useGetNote = (noteId?: string) => {
    const [note, setNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!noteId) return;

        setIsLoading(true);
        try {
            const noteStr = getStorage(noteId);
            if (noteStr) {
                setNote(JSON.parse(noteStr));
            } else {
                setNote(null);
            }
        } catch (error) {
            console.error('Failed to get note:', error);
            setNote(null);
        } finally {
            setIsLoading(false);
        }
    }, [noteId]);

    return { note, isLoading };
};
