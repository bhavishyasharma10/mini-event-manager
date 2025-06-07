import React from 'react';
import { useField } from 'formik';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  label?: string;
  size?: InputSize;
  helperText?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-5 py-3 text-lg',
};

export const Input: React.FC<InputProps> = ({
  name,
  label,
  size = 'md',
  helperText,
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
      {helperText && !hasError && (
        <div className="text-sm text-gray-500">{helperText}</div>
      )}
    </div>
  );
}; 