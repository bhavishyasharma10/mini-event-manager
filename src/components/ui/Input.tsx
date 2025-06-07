import React from 'react';
import { useField } from 'formik';

/**
 * The size of the input
 */
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  label?: string;
  size?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-5 py-3 text-lg',
};

/**
 * Input component that renders a styled input element
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the input
 * @param {string} [props.label] - The label of the input
 * @param {InputSize} [props.size='md'] - The size of the input
 * @param {string} [props.className=''] - The class name to apply to the input
 */
export const Input: React.FC<InputProps> = ({
  name,
  label,
  size = 'md',
  className = '',
  ...props
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        {...field}
        {...props}
        className={`
          w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900
          ${sizeStyles[size]}
          ${hasError ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      />
      {hasError && (
        <div className="text-sm text-red-600">{meta.error}</div>
      )}
    </div>
  );
}; 