"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import './login.css';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'dypcoe') {
            setIsLoading(true);
            // Simulate loading/authentication delay for effect
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 2000);
        } else {
            setError('Access Denied: Invalid Security Credential');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    return (
        <div className="login-container">
            <div className={`login-box ${isShaking ? 'shake' : ''}`}>

                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <div className="loading-text">Authenticating Credentials...</div>
                    </div>
                ) : (
                    <div className="login-content">
                        <div className="logo-section">
                            <div className="admin-icon">
                                <ShieldCheck size={40} />
                            </div>
                            <h1 className="login-title">Admin Portal</h1>
                            <p className="login-subtitle">Security Clearance Required</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label className="input-label" htmlFor="password">Security Key</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type="password"
                                        id="password"
                                        className="password-input"
                                        placeholder="Enter access code..."
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError('');
                                        }}
                                        autoFocus
                                    />
                                    {error && (
                                        <div className="error-msg">
                                            <AlertCircle size={14} /> {error}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="login-btn">
                                Authenticate Access <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
