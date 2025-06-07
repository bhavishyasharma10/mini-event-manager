import React from 'react';
import { Formik, Form } from 'formik';
import { RSVP } from '@/lib/types/graphql';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { attendeeValidationSchema } from '@/lib/validations/attendee';

interface AddAttendeeFormProps {
  onSubmit: (values: { name: string; email?: string; rsvp: RSVP }) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Add Attendee Form
 * 
 * This component provides a form for adding attendees to an event.
 * It uses Formik for form handling and Yup for validation.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {boolean} [props.isLoading=false] - Whether the form is loading
 * @returns {JSX.Element} The rendered form component
 */
export const AddAttendeeForm: React.FC<AddAttendeeFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Attendee</h2>
      <Formik
        initialValues={{ name: '', email: '', rsvp: 'YES' as RSVP }}
        validationSchema={attendeeValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-6">
            <Input
              name="name"
              label="Name"
              placeholder="Enter attendee name"
              required
            />

            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Enter attendee email (optional)"
            />

            <div>
              <label htmlFor="rsvp" className="block text-sm font-medium text-gray-700 mb-1">
                RSVP Status
              </label>
              <select
                id="rsvp"
                name="rsvp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="YES">Yes, I'll be there</option>
                <option value="NO">No, I can't make it</option>
                <option value="MAYBE">Maybe, I'll let you know</option>
              </select>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
              className="w-full"
            >
              Add Attendee
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}; 