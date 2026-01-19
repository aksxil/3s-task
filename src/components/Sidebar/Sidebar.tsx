import React from 'react';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  hasChildren?: boolean;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'planned-maintenance', label: 'Planned Maintenance', icon: '📅', hasChildren: true },
    { id: 'spares-inventory', label: 'Spares Inventory', icon: '📦', hasChildren: true },
    { id: 'machinery-running', label: 'Machinery Running Hrs', icon: '⏱️', hasChildren: true },
    { id: 'lube-oil', label: 'Lube Oil Summary', icon: '📊', hasChildren: true },
    { id: 'library', label: 'Library', icon: '📚', hasChildren: true },
    { id: 'pms-calendar', label: 'PMS Calendar', icon: '📅' },
    { id: 'user-management', label: 'User Management Roles', icon: '👥', hasChildren: true },
    { id: 'reports', label: 'Reports', icon: '📋', hasChildren: true },
    { id: 'fleet-management', label: 'Fleet Management', icon: '🚢', hasChildren: false },
    { id: 'settings', label: 'Settings', icon: '⚙️', hasChildren: true },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">3S</div>
          <div className="logo-text">SMART SHIP SOLUTIONS</div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${item.id === 'fleet-management' ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.hasChildren && <span className="nav-arrow">▼</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-name">shadcn</div>
          <div className="user-role">
            Super Admin
            <span className="role-arrow">▲</span>
          </div>
        </div>
        <div className="sidebar-branding">
          <div className="brand-name">Stream.</div>
          <div className="brand-text">powered by 3S Smart Ships Solutions</div>
          <div className="brand-version">version 0.0.1</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

