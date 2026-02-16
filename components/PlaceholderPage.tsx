"use client";

import React from 'react';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '1rem', textAlign: 'center' }}>
            <div style={{ padding: '1.5rem', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '50%' }}>
                <Construction size={48} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{title} Under Development</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
                We are currently building this section to provide you with a comprehensive admin experience. Stay tuned for updates!
            </p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
};

export default PlaceholderPage;
