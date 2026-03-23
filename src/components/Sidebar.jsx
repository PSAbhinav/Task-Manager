import { LayoutDashboard, CheckSquare, Calendar, BookOpen, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ currentView, setCurrentView }) {
  const { logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <CheckSquare size={28} strokeWidth={2.5} />
        <span>TaskManager</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <a 
              href="#" 
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentView(item.id);
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a 
          href="#" 
          className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('settings');
          }}
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>
        <button 
          className="nav-item" 
          onClick={logout}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
