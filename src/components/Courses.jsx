import { BookMarked, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Courses({ courses, onAddCourse, onDeleteCourse }) {
  const [formData, setFormData] = useState({ title: '', code: '', instructor: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.code || !formData.instructor) return;
    onAddCourse(formData);
    setFormData({ title: '', code: '', instructor: '' });
  };

  return (
    <div style={{ animation: 'slideIn 0.3s ease forwards' }}>
      <div className="header">
        <h1>Your Courses</h1>
        <p>Manage and track your academic progress across all enrolled subjects.</p>
      </div>

      <form className="task-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem' }}>
        <input 
          type="text" 
          className="task-input" 
          placeholder="Course Title" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="text" 
          className="task-input" 
          placeholder="Course Code" 
          value={formData.code}
          onChange={e => setFormData({...formData, code: e.target.value})}
        />
        <input 
          type="text" 
          className="task-input" 
          placeholder="Instructor Name" 
          value={formData.instructor}
          onChange={e => setFormData({...formData, instructor: e.target.value})}
        />
        <button type="submit" className="btn" disabled={!formData.title || !formData.code || !formData.instructor}>
          <Plus size={20} /> Add
        </button>
      </form>

      {courses.length === 0 ? (
        <div className="empty-state">
           <h3>No courses added</h3>
           <p>Add your first course using the form above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {courses.map(course => (
            <div key={course.id} style={{ 
              background: 'var(--glass-bg)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '1rem', 
              padding: '1.5rem',
              transition: 'transform 0.2s',
              position: 'relative',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '0.75rem', borderRadius: '0.75rem', color: 'var(--accent-color)' }}>
                  <BookMarked size={24} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                    {course.code}
                  </span>
                  <button onClick={() => onDeleteCourse(course.id)} className="btn-icon" title="Delete Course">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{course.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <GraduationCap size={16} />
                <span>{course.instructor}</span>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                  <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{course.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--accent-color)', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
