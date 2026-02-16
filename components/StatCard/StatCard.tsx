import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isUp: boolean;
    };
    color?: string;
    onClick?: () => void;
}

const StatCard = ({ label, value, icon: Icon, trend, color = 'var(--primary)', onClick }: StatCardProps) => {
    return (
        <div className="stat-card card" onClick={onClick}>
            <div className="stat-info">
                <span className="stat-label">{label}</span>
                <h3 className="stat-value">{value}</h3>
                {trend && (
                    <div className={`stat-trend ${trend.isUp ? 'trend-up' : 'trend-down'}`}>
                        {trend.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>{trend.value}% vs last month</span>
                    </div>
                )}
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color: color }}>
                <Icon size={24} />
            </div>
        </div>
    );
};

export default StatCard;
