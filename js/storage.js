/**
 * Storage module for managing task persistence in localStorage
 */

const STORAGE_KEY = 'taskManager_data';

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects
 */
export function saveTasks(tasks) {
    try {
        const serialized = JSON.stringify(tasks);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

/**
 * Load tasks from localStorage
 * @returns {Array} Array of task objects
 */
export function loadTasks() {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (serialized === null) {
            return [];
        }
        return JSON.parse(serialized);
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
}

/**
 * Clear all tasks from localStorage
 */
export function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

