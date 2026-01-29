import { useEffect } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div style={{ padding: '0.5rem 1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <nav>
                    <Link to="/admin" style={{ marginRight: '1rem' }}>Dashboard</Link>
                    <Link to="/" style={{ marginRight: '1rem' }}>View Site</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
