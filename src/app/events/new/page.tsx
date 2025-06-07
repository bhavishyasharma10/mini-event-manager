'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CreateEventInput } from '@/lib/types/graphql';
import Link from 'next/link';

const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      date
    }
  }
`;

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Event date must be in the future'),
});

export default function NewEventPage() {
  const router = useRouter();
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);
  const formRef = React.useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createEvent({
          variables: {
            input: values as CreateEventInput,
          },
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        router.push('/');
      } catch (err) {
        console.error('Error creating event:', err);
      }
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Create New Event</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              ← Back to Events
            </Link>
          </div>

          <form ref={formRef} onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                  formik.touched.title && formik.errors.title
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <input
                id="date"
                name="date"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                  formik.touched.date && formik.errors.date
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.date}</div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                Error creating event: {error.message}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Link
                href="/"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
