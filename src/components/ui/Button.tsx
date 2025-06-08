/**
 * Button Component
 * 
 * A reusable button component that supports different variants, sizes, and states.
 * Built on top of the native button element with additional styling and functionality.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import Link from 'next/link';

/**
 * Available button variants
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Available button sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Maps button variants to their corresponding Tailwind classes
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
  secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-gray-400 hover:text-red-600',
};

/**
 * Maps button sizes to their corresponding Tailwind classes
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Button component that renders a styled button element
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to display inside the button
 * @param {ButtonVariant} [props.variant='primary'] - The visual style of the button
 * @param {ButtonSize} [props.size='md'] - The size of the button
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state
 * @param {string} [props.href] - The URL to navigate to when the button is clicked
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
      variant = 'primary',
      size = 'md',
    isLoading, 
      href,
      leftIcon,
      rightIcon,
      fullWidth = false,
    className = '',
    disabled,
      ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={buttonStyles}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button'; 