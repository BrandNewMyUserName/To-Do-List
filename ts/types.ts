/**
 * Type definitions for Task Manager
 */

/**
 * Task item interface representing a single task
 */
export interface TaskItem {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

/**
 * Filter type for task filtering
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Task statistics interface
 */
export interface TaskStatistics {
    total: number;
    active: number;
    completed: number;
}

