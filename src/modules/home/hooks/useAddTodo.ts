import { useState } from 'react';
import { getStorage, setStorage } from '@/tools/storage';

export interface TodoItem {
    id: string; // e.g., 'sub1'
    title: string;
    isCompleted: boolean;
}

export interface TodoData {
    id: string; // e.g., 'TD1'
    mainTitle: string; 
    isCompleted: boolean; 
    todos: TodoItem[]; 
    date?: string; 
}

export const useAddTodo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addTodo = (mainTitle: string, todos: TodoItem[] = [], isCompleted = false) => {
        setIsLoading(true);
        try {
            // Retrieve current counter to generate the next ID (e.g., TD1, TD2)
            const countStr = getStorage('todos_count');
            const currentCount = countStr ? parseInt(countStr, 10) : 0;
            const nextCount = currentCount + 1;

            const todoId = `TD${nextCount}`;

            const todoData: TodoData = {
                id: todoId,
                mainTitle,
                isCompleted,
                todos,
                date: new Date().toISOString(),
            };

            // Store the todo in JSON format under its specific ID
            setStorage(todoId, JSON.stringify(todoData));

            // Update the counter
            setStorage('todos_count', nextCount.toString());

            setIsLoading(false);
            return todoId;
        } catch (error) {
            console.error('Failed to add todo:', error);
            setIsLoading(false);
            throw error;
        }
    };

    return { addTodo, isLoading };
};
