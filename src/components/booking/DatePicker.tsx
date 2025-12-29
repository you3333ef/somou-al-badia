'use client';

import { forwardRef } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/Input';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  error?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, value, onChange, min, max, error }, ref) => {
    return (
      <Input
        ref={ref}
        type="date"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        error={error}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
