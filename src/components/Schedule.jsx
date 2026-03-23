import { Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Schedule({ schedule, onAddScheduleItem, onDeleteScheduleItem }) {
  const [formData, setFormData] = useState({ time: '', course: '', location: '', type: 'Lecture' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.time || !formData.course || !formData.location) return;
    onAddScheduleItem({ ...formData, time: formatTime(formData.time) });
    setFormData({ time: '', course: '', location: '', type: 'Lecture' });
  };
  
  // Basic helper to convert 24hr HTML input to 12hr format
  const formatTime = (time24) => {
    if(!time24) return "";
    const [h, m] = time24.split(':');
    const hh = parseInt(h, 10);
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const hour12 = hh % 12 || 12;
    return `${hour12 < 10 ? '0'+hour12 : hour12}:${m} ${ampm}`;
  };

  return (
    <div style={{ animation: 'slideIn 0.3s ease forwards' }}>
      <div className="header">
        <h1>Today's Schedule</h1>
        <p>Your upcoming classes and academic events for today.</p>
      </div>

      <form className="task-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 1fr) 2fr 2fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="time" 
          className="task-input" 
          value={formData.time}
          onChange={e => setFormData({...formData, time: e.target.value})}
        />
        <input 
          type="text" 
          className="task-input" 
          placeholder="Event / Course Name" 
          value={formData.course}
          onChange={e => setFormData({...formData, course: e.target.value})}
        />
        <input 
          type="text" 
          className="task-input" 
          placeholder="Location (Room, Link)" 
          value={formData.location}
          onChange={e => setFormData({...formData, location: e.target.value})}
        />
        <select 
          className="task-input"
          value={formData.type}
          onChange={e => setFormData({...formData, type: e.target.value})}
          style={{ appearance: 'none' }}
        >
          <option value="Lecture">Lecture</option>
          <option value="Lab">Lab</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Break">Break</option>
          <option value="Exam">Exam</option>
        </select>
        <button type="submit" className="btn" disabled={!formData.time || !formData.course || !formData.location}>
          <Plus size={20} /> Add
        </button>
      </form>

      {schedule.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '2rem' }}>
           <h3>Schedule is empty</h3>
           <p>Add your first event using the form above.</p>
        </div>
      ) : (
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1rem', padding: '2rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Sort schedule purely by basic string representation for simple demo purposes */}
            {[...schedule].sort((a,b) => {
                const parseTime = (tString) => {
                  const [time, period] = tString.split(' ');
                  let [h, m] = time.split(':');
                  h = parseInt(h);
                  if(period === 'PM' && h !== 12) h += 12;
                  if(period === 'AM' && h === 12) h = 0;
                  return h * 60 + parseInt(m);
                };
                return parseTime(a.time) - parseTime(b.time);
            }).map((item, index, sortedSchedule) => (
              <div key={item.id} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                {/* Timeline line */}
                {index !== sortedSchedule.length - 1 && (
                  <div style={{ position: 'absolute', left: '23px', top: '40px', bottom: '-24px', width: '2px', background: 'var(--border-color)' }}></div>
                )}
                
                <div style={{ minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: '0.25rem' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.time.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.time.split(' ')[1]}</span>
                </div>
                
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: item.type === 'Break' ? 'var(--text-secondary)' : 'var(--accent-color)', 
                  marginTop: '0.4rem',
                  border: '3px solid var(--bg-color)',
                  boxShadow: `0 0 0 2px ${item.type === 'Break' ? 'var(--text-secondary)' : 'var(--accent-color)'}`,
                  zIndex: 1
                }}></div>
                
                <div style={{ 
                  flex: 1, 
                  background: item.type === 'Break' ? 'rgba(255,255,255,0.03)' : 'rgba(88, 166, 255, 0.05)', 
                  border: '1px solid',
                  borderColor: item.type === 'Break' ? 'var(--border-color)' : 'rgba(88, 166, 255, 0.2)',
                  padding: '1.25rem', 
                  borderRadius: '0.75rem',
                  opacity: item.type === 'Break' ? 0.7 : 1
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.course}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: item.type === 'Break' ? 'var(--text-secondary)' : 'var(--accent-color)', fontWeight: '600' }}>{item.type}</span>
                      <button onClick={() => onDeleteScheduleItem(item.id)} className="btn-icon" style={{ padding: '4px' }} title="Delete Event">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
