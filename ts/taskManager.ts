/**
 * Task Manager module for managing task operations
 * TypeScript implementation with TaskItem interface
 */

import { TaskItem, FilterType, TaskStatistics } from './types.js';

/**
 * Create a new task object
 * @param text - Task description
 * @param id - Unique task identifier (optional)
 * @returns TaskItem object
 */
export function createTask(text: string, id?: number): TaskItem {
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
    private tasks: TaskItem[];
    private currentFilter: FilterType;

    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
    }

    /**
     * Add a new task
     * @param text - Task description
     * @returns Created task object or null if invalid
     */
    addTask(text: string): TaskItem | null {
        if (!text || !text.trim()) {
            return null;
        }

        const task = createTask(text);
        this.tasks.push(task);
        return task;
    }

    /**
     * Remove a task by ID
     * @param id - Task ID
     * @returns True if task was removed
     */
    removeTask(id: number): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }

    /**
     * Toggle task completion status
     * @param id - Task ID
     * @returns Updated task object or null if not found
     */
    toggleTask(id: number): TaskItem | null {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            return task;
        }
        return null;
    }

    /**
     * Clear all completed tasks
     * @returns Number of tasks removed
     */
    clearCompleted(): number {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => !task.completed);
        return initialLength - this.tasks.length;
    }

    /**
     * Get tasks based on current filter
     * @returns Filtered tasks array
     */
    getFilteredTasks(): TaskItem[] {
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
     * @param filter - Filter type ('all', 'active', 'completed')
     */
    setFilter(filter: string): void {
        if (['all', 'active', 'completed'].includes(filter)) {
            this.currentFilter = filter as FilterType;
        }
    }

    /**
     * Get task statistics
     * @returns Statistics object
     */
    getStats(): TaskStatistics {
        return {
            total: this.tasks.length,
            active: this.tasks.filter(t => !t.completed).length,
            completed: this.tasks.filter(t => t.completed).length
        };
    }

    /**
     * Load tasks from array
     * @param tasks - Array of task objects
     */
    loadTasks(tasks: TaskItem[]): void {
        this.tasks = Array.isArray(tasks) ? tasks : [];
    }

    /**
     * Get all tasks
     * @returns All tasks array
     */
    getAllTasks(): TaskItem[] {
        return this.tasks;
    }
}

