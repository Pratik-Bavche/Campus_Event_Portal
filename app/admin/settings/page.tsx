"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Bell, Save, AlertCircle } from 'lucide-react';
import './settings.css';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        autoApproveClubs: false,
        autoApproveEvents: false,
        reqFacultySignature: true,
        notifyOnSubmission: true,
        allowGuestEvents: false,
        strictDocVerification: true
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('admin_settings');
        if (stored) {
            try {
                setSettings(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
    }, []);

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = () => {
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        setShowSuccessModal(true);
        // Auto hide after 2 seconds or keep it until closed? User asked for proper dialog, so maybe manual close is better or both.
        // Let's keep it manual close for "proper dialog" feel, or simple OK button.
    };

    return (
        <div className="settings-container">
            {/* Approval Workflows Section */}
            <section className="settings-section">
                <div className="settings-header">
                    <h3><ShieldCheck size={20} className="text-primary" /> Approval Workflows</h3>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Auto-Approve Club Registrations</span>
                        <p className="setting-desc">
                            Automatically approve new club requests if all required documents are uploaded.
                            <strong className="text-danger"> Not recommended for strict compliance.</strong>
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.autoApproveClubs}
                            onChange={() => handleToggle('autoApproveClubs')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Auto-Approve Low Impact Events</span>
                        <p className="setting-desc">
                            Events with less than 50 participants and no budget requirement will be auto-approved.
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.autoApproveEvents}
                            onChange={() => handleToggle('autoApproveEvents')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Require Faculty Advisor Signature</span>
                        <p className="setting-desc">
                            Mandatory requirement for a digital signature from a faculty advisor for all club creations.
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.reqFacultySignature}
                            onChange={() => handleToggle('reqFacultySignature')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Strict Document Verification</span>
                        <p className="setting-desc">
                            System will use AI to pre-scan uploaded PDFs for validity before admin review.
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.strictDocVerification}
                            onChange={() => handleToggle('strictDocVerification')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>

            {/* Notifications & System */}
            <section className="settings-section">
                <div className="settings-header">
                    <h3><Bell size={20} className="text-primary" /> System Notifications</h3>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Email Alerts on New Submissions</span>
                        <p className="setting-desc">
                            Receive an email digest when new requests are submitted.
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.notifyOnSubmission}
                            onChange={() => handleToggle('notifyOnSubmission')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-title">Allow Guest Event Registrations</span>
                        <p className="setting-desc">
                            Allow non-college students to register for open events.
                        </p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.allowGuestEvents}
                            onChange={() => handleToggle('allowGuestEvents')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>

            <div className="flex justify-end">
                <button className="btn btn-primary" style={{ gap: '0.5rem' }} onClick={handleSave}>
                    <Save size={18} /> Save Changes
                </button>
            </div>

            {/* Success Dialog */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            color: 'var(--success)'
                        }}>
                            <ShieldCheck size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Settings Saved</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Your system preferences have been successfully updated.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowSuccessModal(false)}
                            style={{ width: '100%' }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
