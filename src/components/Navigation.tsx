import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'ホーム', icon: '🏠' },
  { path: '/query', label: 'React Query', icon: '🔄' },
  { path: '/table', label: 'React Table', icon: '📊' },
  { path: '/virtual', label: 'React Virtual', icon: '📜' },
  { path: '/form', label: 'React Form', icon: '📝' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav style={{
      width: '250px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '2rem 1rem',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        marginBottom: '2rem',
        fontWeight: 'bold',
        color: '#00d8ff'
      }}>
        TanStack Playground
      </h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
              <Link
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: isActive ? '#00d8ff' : '#ccc',
                  backgroundColor: isActive ? 'rgba(0, 216, 255, 0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ marginRight: '0.75rem', fontSize: '1.25rem' }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
