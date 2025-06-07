'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CREATE_EVENT } from '@/graphql/operations/mutations';
import { eventValidationSchema } from '@/lib/validations/event';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function NewEventPage() {
  const router = useRouter();
  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      router.push('/');
    },
  });

  const handleSubmit = async (values: { title: string; date: string }) => {
    try {
      await createEvent({
        variables: {
          input: {
            title: values.title,
            date: new Date(values.date).toISOString(),
          },
        },
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <Card padding="lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Event</h1>
            <p className="text-gray-600">Fill in the details to create a new event</p>
          </div>

          <Formik
            initialValues={{ title: '', date: '' }}
            validationSchema={eventValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form className="space-y-6">
                <Input
                  name="title"
                  label="Event Title"
                  placeholder="Enter event title"
                  required
                />

                <Input
                  name="date"
                  label="Event Date"
                  type="datetime-local"
                  required
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.push('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={loading}
                    disabled={!isValid || loading}
                  >
                    Create Event
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </main>
  );
}
