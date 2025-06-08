/**
 * Date Utility Functions
 * 
 * This module provides utility functions for formatting and manipulating dates.
 */

/**
 * Formats a date string into a human-readable format
 * @param dateString - The date string to format (ISO 8601 format)
 * @returns Formatted date string (e.g., "Monday, March 20, 2024 at 10:00 AM")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};