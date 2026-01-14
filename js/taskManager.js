/**
 * Task Manager module for managing task operations
 * Designed to be easily migrated to TypeScript with a TaskItem interface
 */

/**
 * Create a new task object
 * @param {string} text - Task description
 * @param {number} id - Unique task identifier
 * @returns {Object} Task object
 */
export function createTask(text, id) {
    return {
        id: id || Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
}

/**
 * Task Manager class
 * Handles all task-related operations
 */
export class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
    }

    /**
     * Add a new task
     * @param {string} text - Task description
     * @returns {Object|null} Created task object or null if invalid
     */
    addTask(text) {
        if (!text || !text.trim()) {
            return null;
        }

        const task = createTask(text);
        this.tasks.push(task);
        return task;
    }

    /**
     * Remove a task by ID
     * @param {number} id - Task ID
     * @returns {boolean} True if task was removed
     */
    removeTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }

    /**
     * Toggle task completion status
     * @param {number} id - Task ID
     * @returns {Object|null} Updated task object or null if not found
     */
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            return task;
        }
        return null;
    }

    /**
     * Clear all completed tasks
     * @returns {number} Number of tasks removed
     */
    clearCompleted() {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => !task.completed);
        return initialLength - this.tasks.length;
    }

    /**
     * Get tasks based on current filter
     * @returns {Array} Filtered tasks
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    /**
     * Set the current filter
     * @param {string} filter - Filter type ('all', 'active', 'completed')
     */
    setFilter(filter) {
        if (['all', 'active', 'completed'].includes(filter)) {
            this.currentFilter = filter;
        }
    }

    /**
     * Get task statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            total: this.tasks.length,
            active: this.tasks.filter(t => !t.completed).length,
            completed: this.tasks.filter(t => t.completed).length
        };
    }

    /**
     * Load tasks from array
     * @param {Array} tasks - Array of task objects
     */
    loadTasks(tasks) {
        this.tasks = Array.isArray(tasks) ? tasks : [];
    }

    /**
     * Get all tasks
     * @returns {Array} All tasks
     */
    getAllTasks() {
        return this.tasks;
    }
}

