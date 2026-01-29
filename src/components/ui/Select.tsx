import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export const Select = ({ label, style, children, ...props }: SelectProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%', minWidth: 0 }}>
            {label && (
                <label style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>
                    {label}
                </label>
            )}
            <select
                style={{
                    width: '100%',
                    minWidth: 0,
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                    ...style
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--app-accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                {...props}
            >
                {children}
            </select>
        </div>
    );
};
