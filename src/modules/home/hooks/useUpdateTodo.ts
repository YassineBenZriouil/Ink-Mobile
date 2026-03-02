import { useState } from 'react';
import { getStorage, setStorage } from '@/tools/storage';
import { TodoData } from './useAddTodo';

export const useUpdateTodo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateTodo = (todoId: string, updatedData: TodoData) => {
        setIsLoading(true);
        try {
            // Verify it exists first
            const existingStr = getStorage(todoId);
            if (!existingStr) {
                throw new Error(`Todo with ID ${todoId} not found`);
            }

            // Save the new data securely
            setStorage(todoId, JSON.stringify(updatedData));
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('Failed to update todo:', error);
            setIsLoading(false);
            throw error;
        }
    };

    return { updateTodo, isLoading };
};
