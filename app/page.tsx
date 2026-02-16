import Link from 'next/link';
import { ShieldCheck, Users, ArrowRight } from 'lucide-react';
import './landing.css';

export default function Home() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="header-section">
          <h1 className="main-title">Campus Event Portal</h1>
          <p className="subtitle">Streamline your event management. Access the administrative dashboard or manage your club activities from one central hub.</p>
        </div>

        <div className="login-options">
          {/* Admin Login Card */}
          <Link href="/admin/login" className="login-card admin-card">
            <div className="card-icon-wrapper">
              <ShieldCheck size={40} />
            </div>
            <h3 className="card-title">Admin Login</h3>
            <p className="card-description">
              Access the master dashboard to oversee all campus events, approve requests, and manage system settings.
            </p>
            <div className="card-button">
              Enter Portal <ArrowRight size={18} />
            </div>
          </Link>

          {/* Club Login Card */}
          <Link href="/club/login" className="login-card club-card">
            <div className="card-icon-wrapper">
              <Users size={40} />
            </div>
            <h3 className="card-title">Club Login</h3>
            <p className="card-description">
              Manage your club's profile, schedule new events, and track participation statuses.
            </p>
            <div className="card-button">
              Enter Portal <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
