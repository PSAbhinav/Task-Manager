import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Courses from './components/Courses';
import Schedule from './components/Schedule';
import Settings from './components/Settings';
import LoginPage from './components/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  setDoc,
  getDoc,
  query,
  orderBy
} from 'firebase/firestore';
import './index.css';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  
  // State for Firestore data
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [settings, setSettings] = useState({
    fullName: currentUser.displayName || 'Student User',
    email: currentUser.email,
    darkMode: true,
    emailNotifications: true
  });

  // Firestore Listeners
  useEffect(() => {
    if (!currentUser) return;

    // Tasks listener
    const tasksRef = collection(db, 'users', currentUser.uid, 'tasks');
    const qTasks = query(tasksRef, orderBy('createdAt', 'desc'));
    const unsubTasks = onSnapshot(qTasks, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Courses listener
    const coursesRef = collection(db, 'users', currentUser.uid, 'courses');
    const unsubCourses = onSnapshot(coursesRef, (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Schedule listener
    const scheduleRef = collection(db, 'users', currentUser.uid, 'schedule');
    const unsubSchedule = onSnapshot(scheduleRef, (snapshot) => {
      setSchedule(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Settings listener
    const settingsRef = doc(db, 'users', currentUser.uid, 'settings', 'data');
    const unsubSettings = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data());
      } else {
        // Initialize default settings in Firestore if they don't exist
        setDoc(settingsRef, settings);
      }
    });

    return () => {
      unsubTasks();
      unsubCourses();
      unsubSchedule();
      unsubSettings();
    };
  }, [currentUser]);

  // Apply Theme Toggle globally
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [settings.darkMode]);

  // Tasks Logic (Firestore)
  const addTask = (text) => {
    addDoc(collection(db, 'users', currentUser.uid, 'tasks'), {
      text,
      completed: false,
      createdAt: new Date().toISOString()
    });
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    updateDoc(doc(db, 'users', currentUser.uid, 'tasks', id), {
      completed: !task.completed
    });
  };

  const deleteTask = (id) => {
    deleteDoc(doc(db, 'users', currentUser.uid, 'tasks', id));
  };

  // Courses Logic (Firestore)
  const addCourse = (course) => {
    addDoc(collection(db, 'users', currentUser.uid, 'courses'), {
      ...course,
      progress: 0,
      createdAt: new Date().toISOString()
    });
  };

  const deleteCourse = (id) => {
    deleteDoc(doc(db, 'users', currentUser.uid, 'courses', id));
  };
  
  // Schedule Logic (Firestore)
  const addScheduleItem = (item) => {
    addDoc(collection(db, 'users', currentUser.uid, 'schedule'), {
      ...item,
      createdAt: new Date().toISOString()
    });
  };

  const deleteScheduleItem = (id) => {
    deleteDoc(doc(db, 'users', currentUser.uid, 'schedule', id));
  };

  // Update Settings (Firestore)
  const updateSettings = (newSettings) => {
    setDoc(doc(db, 'users', currentUser.uid, 'settings', 'data'), newSettings);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div style={{ animation: 'slideIn 0.3s ease forwards' }}>
            <div className="header">
              <h1>Welcome, {settings.fullName}</h1>
              <p>Manage your academic tasks, assignments, and study goals efficiently. Connected to Firebase.</p>
            </div>
            <TaskForm onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </div>
        );
      case 'courses':
        return <Courses courses={courses} onAddCourse={addCourse} onDeleteCourse={deleteCourse} />;
      case 'schedule':
        return <Schedule schedule={schedule} onAddScheduleItem={addScheduleItem} onDeleteScheduleItem={deleteScheduleItem} />;
      case 'settings':
        return <Settings settings={settings} setSettings={updateSettings} onLogout={logout} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={logout} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  return currentUser ? <Dashboard /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
