import { useState } from 'react';
import { removeItem } from '@/tools/storage';

export const useDeleteNote = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteNote = (noteId: string) => {
        setIsLoading(true);
        try {
            removeItem(noteId);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('Failed to delete note:', error);
            setIsLoading(false);
            throw error;
        }
    };

    return { deleteNote, isLoading };
};
