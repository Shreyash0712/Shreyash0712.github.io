import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    style,
    children,
    ...props
}: ButtonProps) => {

    const baseStyles = {
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--app-accent)',
            color: '#fff',
        },
        secondary: {
            backgroundColor: '#e5e7eb',
            color: '#1f2937',
        },
        danger: {
            backgroundColor: '#ef4444',
            color: '#fff',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'currentColor',
            border: '1px solid currentColor',
        }
    };

    const sizes = {
        sm: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
        md: { padding: '0.5rem 1rem', fontSize: '1rem' },
        lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
    };

    const combinedStyle = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        ...style,
    };

    return (
        <button
            style={combinedStyle}
            onMouseOver={(e) => {
                if (variant !== 'ghost') e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
                if (variant !== 'ghost') e.currentTarget.style.opacity = '1';
            }}
            {...props}
        >
            {children}
        </button>
    );
};
