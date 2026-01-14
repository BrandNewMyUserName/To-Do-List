/**
 * Main application entry point
 * Handles UI interactions and coordinates between TaskManager and Storage
 * TypeScript implementation
 */

import { TaskManager } from './taskManager.js';
import { saveTasks, loadTasks } from './storage.js';
import { TaskItem, TaskStatistics } from './types.js';

/**
 * Main application class
 */
class TaskApp {
    private taskManager: TaskManager;
    private taskInput!: HTMLInputElement;
    private addTaskBtn!: HTMLButtonElement;
    private taskList!: HTMLElement;
    private emptyState!: HTMLElement;
    private taskCount!: HTMLElement;
    private clearCompletedBtn!: HTMLButtonElement;
    private filterButtons!: NodeListOf<HTMLButtonElement>;

    constructor() {
        this.taskManager = new TaskManager();
        this.initializeElements();
        this.attachEventListeners();
        this.loadFromStorage();
        this.render();
    }

    /**
     * Initialize DOM element references
     */
    private initializeElements(): void {
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const taskCount = document.getElementById('taskCount');
        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-group__button');

        if (!taskInput || !addTaskBtn || !taskList || !emptyState || !taskCount || !clearCompletedBtn) {
            throw new Error('Required DOM elements not found');
        }

        this.taskInput = taskInput as HTMLInputElement;
        this.addTaskBtn = addTaskBtn as HTMLButtonElement;
        this.taskList = taskList;
        this.emptyState = emptyState;
        this.taskCount = taskCount;
        this.clearCompletedBtn = clearCompletedBtn as HTMLButtonElement;
        this.filterButtons = filterButtons;
    }

    /**
     * Attach event listeners
     */
    private attachEventListeners(): void {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.handleAddTask());
        this.taskInput.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e: Event) => {
                const target = e.currentTarget as HTMLButtonElement;
                const filter = target.dataset.filter;
                if (filter) {
                    this.handleFilterChange(filter);
                }
            });
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());
    }

    /**
     * Handle adding a new task
     */
    private handleAddTask(): void {
        const text = this.taskInput.value;
        const task = this.taskManager.addTask(text);

        if (task) {
            this.taskInput.value = '';
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Handle task deletion
     * @param id - Task ID
     */
    private handleDeleteTask(id: number): void {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskManager.removeTask(id);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Handle task completion toggle
     * @param id - Task ID
     */
    private handleToggleTask(id: number): void {
        this.taskManager.toggleTask(id);
        this.saveToStorage();
        this.render();
    }

    /**
     * Handle filter change
     * @param filter - Filter type
     */
    private handleFilterChange(filter: string): void {
        this.taskManager.setFilter(filter);
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('filter-group__button--active', btn.dataset.filter === filter);
        });

        this.render();
    }

    /**
     * Handle clearing completed tasks
     */
    private handleClearCompleted(): void {
        const count = this.taskManager.clearCompleted();
        if (count > 0) {
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Render the task list
     */
    private render(): void {
        const tasks = this.taskManager.getFilteredTasks();
        const stats = this.taskManager.getStats();

        // Render tasks
        if (tasks.length === 0) {
            this.taskList.innerHTML = '';
            this.emptyState.classList.add('empty-state--visible');
        } else {
            this.emptyState.classList.remove('empty-state--visible');
            this.taskList.innerHTML = tasks.map(task => this.createTaskHTML(task)).join('');
        }

        // Attach event listeners to task items
        tasks.forEach(task => {
            const taskElement = document.querySelector<HTMLElement>(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                const checkbox = taskElement.querySelector<HTMLInputElement>('.task-item__checkbox');
                const deleteBtn = taskElement.querySelector<HTMLButtonElement>('.task-item__button');

                if (checkbox) {
                    checkbox.addEventListener('change', () => this.handleToggleTask(task.id));
                }

                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => this.handleDeleteTask(task.id));
                }
            }
        });

        // Update stats
        this.updateStats(stats);

        // Show/hide clear completed button
        this.clearCompletedBtn.style.display = stats.completed > 0 ? 'block' : 'none';
    }

    /**
     * Create HTML for a task item
     * @param task - Task object
     * @returns HTML string
     */
    private createTaskHTML(task: TaskItem): string {
        return `
            <div class="task-item ${task.completed ? 'task-item--completed' : ''}" 
                 data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-item__checkbox" 
                    ${task.completed ? 'checked' : ''}
                    aria-label="Toggle task completion"
                >
                <span class="task-item__text">
                    ${this.escapeHtml(task.text)}
                </span>
                <div class="task-item__actions">
                    <button 
                        class="task-item__button"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Update statistics display
     * @param stats - Statistics object
     */
    private updateStats(stats: TaskStatistics): void {
        const total = stats.total;
        const active = stats.active;
        const completed = stats.completed;

        let text = `${total} task${total !== 1 ? 's' : ''}`;
        if (active > 0 && completed > 0) {
            text += ` (${active} active, ${completed} completed)`;
        }

        this.taskCount.textContent = text;
    }

    /**
     * Escape HTML to prevent XSS
     * @param text - Text to escape
     * @returns Escaped text
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Save tasks to localStorage
     */
    private saveToStorage(): void {
        const tasks = this.taskManager.getAllTasks();
        saveTasks(tasks);
    }

    /**
     * Load tasks from localStorage
     */
    private loadFromStorage(): void {
        const tasks = loadTasks();
        this.taskManager.loadTasks(tasks);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TaskApp();
    });
} else {
    new TaskApp();
}

