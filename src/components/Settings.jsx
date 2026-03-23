import { User, Bell } from 'lucide-react';

export default function Settings({ settings, setSettings, onLogout }) {

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSettings({
      ...settings,
      fullName: formData.get('fullName'),
      email: formData.get('email')
    });
  };

  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
  };

  const toggleNotifications = () => {
    setSettings({ ...settings, emailNotifications: !settings.emailNotifications });
  };

  return (
    <div style={{ animation: 'slideIn 0.3s ease forwards' }}>
      <div className="header">
        <h1>Settings</h1>
        <p>Manage your account preferences and application settings.</p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem', maxWidth: '800px' }}>
        
        {/* Profile Settings */}
        <form onSubmit={handleUpdateProfile} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent-color)' }}>
              <User size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Profile Information</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Update your account details</p>
            </div>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <input name="fullName" type="text" className="task-input" defaultValue={settings.fullName} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>University Email</label>
              <input name="email" type="email" className="task-input" defaultValue={settings.email} readOnly style={{ opacity: 0.7, cursor: 'not-allowed' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Managed by your university identity</span>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <button type="submit" className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Save Changes</button>
            </div>
          </div>
        </form>

        {/* Danger Zone */}
        <div style={{ background: 'rgba(248, 81, 73, 0.05)', border: '1px solid rgba(248, 81, 73, 0.2)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--danger-color)' }}>Account Session</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sign out of your university dashboard</p>
          </div>
          <button onClick={onLogout} className="btn" style={{ background: 'var(--danger-color)', padding: '0.5rem 1.5rem' }}>
            Logout
          </button>
        </div>

        {/* Preferences */}
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent-color)' }}>
              <Bell size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Preferences</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Manage notifications and appearance</p>
            </div>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Email Notifications</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Receive daily summaries of pending tasks</span>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input type="checkbox" checked={settings.emailNotifications} onChange={toggleNotifications} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: settings.emailNotifications ? 'var(--accent-color)' : 'var(--border-color)', transition: '.4s', borderRadius: '34px' }}>
                  <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: settings.emailNotifications ? '22px' : '4px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                </span>
              </label>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div>
                <span style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Dark Mode</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Always use dark theme</span>
              </div>
               <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input type="checkbox" checked={settings.darkMode} onChange={toggleDarkMode} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: settings.darkMode ? 'var(--accent-color)' : 'var(--border-color)', transition: '.4s', borderRadius: '34px' }}>
                  <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: settings.darkMode ? '22px' : '4px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                </span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
