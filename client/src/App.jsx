import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchAllTickets, createNewTicket, markTicketAsFixed, loginUser, registerUser } from './services/api';
import './App.css';

// LOGIN SCREEN
function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('employee');

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await registerUser({ name, email, password, role });
                alert("🎉 Registration successful! Please log in.");
                setIsRegister(false);
            } else {
                const response = await loginUser({ email, password });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Authentication process failed.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', fontFamily: 'Arial' }}>
            {/* Renamed to Company IT Desk */}
            <h2 style={{ textAlign: 'center', color: '#0070f3' }}>🛠️ Company IT Desk {isRegister ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {isRegister && (
                    <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '10px' }} />
                )}
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }} />
                {isRegister && (
                    <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '10px' }}>
                        <option value="employee">Employee</option>
                        <option value="admin">IT Admin</option>
                    </select>
                )}
                <button type="submit" style={{ background: '#0070f3', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isRegister ? 'Create Account' : 'Log In'}
                </button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)} style={{ textAlign: 'center', color: '#0070f3', cursor: 'pointer', marginTop: '15px', fontSize: '14px' }}>
                {isRegister ? 'Already have an account? Login here' : 'New user? Create an account here'}
            </p>
        </div>
    );
}

// MASTER APPLICATION DASHBOARD
function Dashboard({ user, handleLogout }) {
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => { loadTickets(); }, []);

    const loadTickets = async () => {
        try {
            const response = await fetchAllTickets();
            setTickets(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error logs:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return alert("Fill all fields!");
        try {
            await createNewTicket({ title, description });
            setTitle(''); setDescription('');
            loadTickets();
            alert("✅ Issue reported successfully to IT!");
        } catch (error) {
            alert("Submission error.");
        }
    };

    const handleFix = async (id) => {
        try {
            await markTicketAsFixed(id);
            loadTickets();
        } catch (error) {
            alert("Update failure.");
        }
    };

    const filteredTickets = tickets.filter(t => filter === 'All' || t.status === filter);

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2>Welcome, {user.name} <span style={{ fontSize: '14px', color: '#666' }}>({user.role.toUpperCase()})</span></h2>
                <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </div>

            {/* Ordinary Employee Submission */}
            {user.role === 'employee' && (
                <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h3>Report a New Technical Issue</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input type="text" placeholder="Issue Title" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px' }} />
                        <textarea placeholder="Describe the issue details..." value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px', height: '70px' }} />
                        <button type="submit" style={{ background: '#0070f3', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '150px' }}>Submit Ticket</button>
                    </form>
                </div>
            )}

            {/*  Master Ticket Management Engine with Filter Hooks */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3>Recent System Support Tickets</h3>
                    <div>
                        <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Filter:</label>
                        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '5px' }}>
                            <option value="All">Show All Tickets</option>
                            <option value="Pending">Pending Only</option>
                            <option value="Fixed">Fixed Only</option>
                        </select>
                    </div>
                </div>

                {loading ? <p>Loading data layers...</p> : filteredTickets.length === 0 ? <p style={{ color: '#888' }}>No tickets found matching this category.</p> : (
                    filteredTickets.map(t => (
                        <div key={t._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', marginBottom: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{t.title}</h4>
                            <p style={{ margin: '0 0 10px 0', color: '#555' }}>{t.description}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: t.status === 'Pending' ? '#fef3c7' : '#dcfce7', color: t.status === 'Pending' ? '#d97706' : '#15803d', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                                    {t.status}
                                </span>
                                {user.role === 'admin' && t.status === 'Pending' && (
                                    <button onClick={() => handleFix(t._id)} style={{ background: '#22c55e', color: '#fff', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                        Mark as Fixed ✓
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
                <Route path="/" element={user ? <Dashboard user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}
