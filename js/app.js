/**
 * Main application entry point
 * Handles UI interactions and coordinates between TaskManager and Storage
 */

import { TaskManager } from './taskManager.js';
import { saveTasks, loadTasks } from './storage.js';

// Initialize application
class TaskApp {
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
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.handleAddTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.handleFilterChange(filter);
            });
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());
    }

    /**
     * Handle adding a new task
     */
    handleAddTask() {
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
     * @param {number} id - Task ID
     */
    handleDeleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskManager.removeTask(id);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Handle task completion toggle
     * @param {number} id - Task ID
     */
    handleToggleTask(id) {
        this.taskManager.toggleTask(id);
        this.saveToStorage();
        this.render();
    }

    /**
     * Handle filter change
     * @param {string} filter - Filter type
     */
    handleFilterChange(filter) {
        this.taskManager.setFilter(filter);
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    /**
     * Handle clearing completed tasks
     */
    handleClearCompleted() {
        const count = this.taskManager.clearCompleted();
        if (count > 0) {
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Render the task list
     */
    render() {
        const tasks = this.taskManager.getFilteredTasks();
        const stats = this.taskManager.getStats();

        // Render tasks
        if (tasks.length === 0) {
            this.taskList.innerHTML = '';
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');
            this.taskList.innerHTML = tasks.map(task => this.createTaskHTML(task)).join('');
        }

        // Attach event listeners to task items
        tasks.forEach(task => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                const checkbox = taskElement.querySelector('.task-checkbox');
                const deleteBtn = taskElement.querySelector('.delete-task-btn');

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
     * @param {Object} task - Task object
     * @returns {string} HTML string
     */
    createTaskHTML(task) {
        return `
            <div class="task-item d-flex align-items-center gap-3 p-3 mb-2 border rounded ${task.completed ? 'completed' : ''}" 
                 data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox form-check-input" 
                    ${task.completed ? 'checked' : ''}
                >
                <span class="task-text flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}">
                    ${this.escapeHtml(task.text)}
                </span>
                <div class="task-actions d-flex gap-2">
                    <button 
                        class="delete-task-btn btn btn-sm btn-outline-danger"
                        title="Delete task"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Update statistics display
     * @param {Object} stats - Statistics object
     */
    updateStats(stats) {
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
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Save tasks to localStorage
     */
    saveToStorage() {
        const tasks = this.taskManager.getAllTasks();
        saveTasks(tasks);
    }

    /**
     * Load tasks from localStorage
     */
    loadFromStorage() {
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

