import { useState } from 'react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');  // Change username to email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e:any) => {
        e.preventDefault();
        const response = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),  // Use email instead of username
        });

        if (response.ok) {
            const { token } = await response.json();
            // Store token and redirect to admin dashboard
            localStorage.setItem('adminToken', token);
            window.location.href = '/admin-dashboard';
        } else {
            const { message } = await response.json();
            setError(message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"  // Change input type to email
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default AdminLogin;
