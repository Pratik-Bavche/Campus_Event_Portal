"use client";
import React, { useEffect, useState } from 'react';
import './profile.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Shield, Calendar, MapPin, Edit3, LogOut } from 'lucide-react';

type ClubRequest = {
  id: number | string;
  name?: string;
  status?: string;
  [key: string]: any;
};

export default function AdminProfilePage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('admin@dypcoe.edu.in');
  const [role, setRole] = useState('Super Administrator');
  const [department, setDepartment] = useState('Student Affairs');

  const [clubs, setClubs] = useState<ClubRequest[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('club_requests') || '[]');
      if (Array.isArray(stored)) setClubs(stored);
    } catch (e) {
      setClubs([]);
    }

    // Optional: read admin info from localStorage if available
    try {
      const admin = JSON.parse(localStorage.getItem('admin_profile') || 'null');
      if (admin && typeof admin === 'object') {
        if (admin.name) setAdminName(admin.name);
        if (admin.email) setAdminEmail(admin.email);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear relevant local storage items
      localStorage.removeItem('admin_profile');
      // Redirect to home page
      router.push('/');
    }
  };

  const total = clubs.length;
  const approved = clubs.filter(c => (c.status || '').toLowerCase() === 'approved').length;
  const rejected = clubs.filter(c => (c.status || '').toLowerCase() === 'rejected').length;
  const pending = clubs.filter(c => (c.status || '').toLowerCase() === 'pending').length;

  return (
    <div className="profile-container">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-banner"></div>
        <div className="profile-content">
          <div className="profile-main-info">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {adminName.charAt(0)}
              </div>
              <div className="online-indicator"></div>
            </div>
            <div className="profile-identity">
              <h1 className="profile-name">{adminName} <Shield size={18} className="verified-badge" fill="var(--primary)" color="var(--bg-card)" /></h1>
              <p className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row">
                <span className="contact-item"><Mail size={14} /> {adminEmail}</span>
                <span className="contact-item"><MapPin size={14} /> DYPCOE Campus</span>
                <span className="contact-item"><Calendar size={14} /> Joined 2026</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats-grid">
        <Link href="/admin/dashboard" className="stat-card stat-total" style={{ textDecoration: 'none' }}>
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Clubs Handled</div>
        </Link>
        <Link href="/admin/clubs/manage?tab=Approved" className="stat-card stat-approved" style={{ textDecoration: 'none' }}>
          <div className="stat-value">{approved}</div>
          <div className="stat-label">Approved</div>
        </Link>
        <Link href="/admin/clubs/requests" className="stat-card stat-pending" style={{ textDecoration: 'none' }}>
          <div className="stat-value">{pending}</div>
          <div className="stat-label">Pending Review</div>
        </Link>
        <Link href="/admin/clubs/manage?tab=Rejected" className="stat-card stat-rejected" style={{ textDecoration: 'none' }}>
          <div className="stat-value">{rejected}</div>
          <div className="stat-label">Rejected</div>
        </Link>
      </div>

      {/* Additional Details Placeholder (Bio/Recent Activity) */}
      <div className="profile-details-grid">
        <div className="card detail-card">
          <h3>About</h3>
          <p className="text-muted" style={{ marginTop: '1rem' }}>
            Responsible for overseeing all student club activities, managing registrations, and ensuring compliance with college policies.
            Dedicated to fostering a vibrant and inclusive campus community through diverse student organizations.
          </p>
        </div>
      </div>
    </div>
  );
}