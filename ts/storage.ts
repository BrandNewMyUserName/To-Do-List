/**
 * Storage module for managing task persistence in localStorage
 * TypeScript implementation
 */

import { TaskItem } from './types.js';

const STORAGE_KEY = 'taskManager_data';

/**
 * Save tasks to localStorage
 * @param tasks - Array of task objects
 */
export function saveTasks(tasks: TaskItem[]): void {
    try {
        const serialized = JSON.stringify(tasks);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

/**
 * Load tasks from localStorage
 * @returns Array of task objects
 */
export function loadTasks(): TaskItem[] {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (serialized === null) {
            return [];
        }
        const parsed = JSON.parse(serialized) as TaskItem[];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
}

/**
 * Clear all tasks from localStorage
 */
export function clearStorage(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

