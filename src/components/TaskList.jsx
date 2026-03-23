import { ClipboardList } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete }) {
  const completedCount = tasks.filter(t => t.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <ClipboardList />
        <h3>No tasks yet</h3>
        <p>Add your first task above to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span className="task-count">
          {completedCount} / {tasks.length} Completed
        </span>
      </div>
      
      <div className="tasks">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
}
