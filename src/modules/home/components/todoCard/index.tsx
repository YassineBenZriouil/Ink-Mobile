import React from 'react';
import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    Animated,
    Pressable,
} from 'react-native';
import { usePressScale } from '@/tools/interactions';
import useStyles from './styles';
import Checkbox from './components/Checkbox';
import { TodoData, TodoItem } from '../../hooks/useAddTodo';

export interface TodoCardProps {
    data: TodoData;
    onPress?: () => void;
    onToggleMain?: (newValue: boolean) => void;
    onToggleSubTodo?: (todoId: string, newValue: boolean) => void;
    style?: StyleProp<ViewStyle>;
}

const TodoCard: React.FC<TodoCardProps> = ({
    data,
    onPress,
    onToggleMain,
    onToggleSubTodo,
    style,
}) => {
    const styles = useStyles();
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.99);

    const hasSubTodos = data.todos && data.todos.length > 0;

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                style={[styles.container, style]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={styles.mainRow}>
                    <Checkbox
                        value={data.isCompleted}
                        onValueChange={onToggleMain}
                        size={hasSubTodos ? 20 : 18}
                    />
                    <Text
                        style={[
                            styles.mainTitle,
                            data.isCompleted && styles.completedTitle,
                        ]}
                        numberOfLines={1}
                    >
                        {data.mainTitle}
                    </Text>
                </View>

                {hasSubTodos && (
                    <View style={styles.subTodosContainer}>
                        {[...data.todos]
                            .sort((a, b) => {
                                if (a.isCompleted === b.isCompleted) return 0;
                                return a.isCompleted ? 1 : -1;
                            })
                            .map(
                                (
                                    subTodo: TodoItem,
                                    index: number,
                                    sortedArray,
                                ) => {
                                    // Don't add bottom margin to the very last item
                                    const isLast =
                                        index === sortedArray.length - 1;
                                    return (
                                        <View
                                            key={subTodo.id}
                                            style={[
                                                styles.subTodoRow,
                                                isLast && { marginBottom: 0 },
                                            ]}
                                        >
                                            <Checkbox
                                                value={subTodo.isCompleted}
                                                onValueChange={newValue =>
                                                    onToggleSubTodo &&
                                                    onToggleSubTodo(
                                                        subTodo.id,
                                                        newValue,
                                                    )
                                                }
                                                size={14}
                                            />
                                            <Text
                                                style={[
                                                    styles.subTodoTitle,
                                                    subTodo.isCompleted &&
                                                        styles.completedTitle,
                                                ]}
                                                numberOfLines={1}
                                            >
                                                {subTodo.title}
                                            </Text>
                                        </View>
                                    );
                                },
                            )}
                    </View>
                )}
            </Pressable>
        </Animated.View>
    );
};

export default TodoCard;
