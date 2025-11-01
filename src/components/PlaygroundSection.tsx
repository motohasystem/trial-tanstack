import type { ReactNode } from 'react';

interface PlaygroundSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  code?: string;
}

export function PlaygroundSection({ title, description, children, code }: PlaygroundSectionProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '#1a1a1a'
      }}>
        {title}
      </h2>
      <p style={{
        color: '#666',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        {description}
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        {children}
      </div>

      {code && (
        <details style={{ marginTop: '1rem' }}>
          <summary style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#00d8ff',
            marginBottom: '0.5rem'
          }}>
            コードを表示
          </summary>
          <pre style={{
            backgroundColor: '#1a1a1a',
            color: '#f8f8f2',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            <code>{code}</code>
          </pre>
        </details>
      )}
    </div>
  );
}
