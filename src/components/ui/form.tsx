'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { Label as LabelPrimitive } from 'radix-ui';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const formItemVariants = cva('flex gap-2.5', {
  variants: {
    orient: {
      vertical: 'flex-col',
      horizontal: 'sm:flex-row sm:items-center gap-1.5',
    },
  },
  defaultVariants: {
    orient: 'vertical',
  },
});

function FormItem({
  className,
  orient,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof formItemVariants>) {
  const id = React.useId();
  const { error } = useFormField();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn(formItemVariants({ orient }), className)}
        data-invalid={!!error}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormSectionLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { formItemId } = useFormField();

  return (
    <Label
      data-slot="form-section-label"
      className={cn('font-medium text-secondary-foreground', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

const formLabelVariants = cva(
  'font-medium text-foreground sm:whitespace-nowrap sm:flex-shrink-0',
  {
    variants: {
      size: {
        md: '',
        sm: 'text-xs font-normal',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

function FormLabel({
  required,
  className,
  children,
  size,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  required?: boolean;
} & VariantProps<typeof formLabelVariants>) {
  const { formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      className={cn(formLabelVariants({ size }), className)}
      htmlFor={formItemId}
      {...props}
    >
      {children} {required && <span className="text-destructive">*</span>}
    </Label>
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId, error } = useFormField();

  if (error) {
    return null; // Hide the description when there's an error
  }

  return (
    <div
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground -mt-0.5', className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField();
  const extractMessage = (err: any): string | undefined => {
    if (!err) return undefined;
    if (typeof err === 'string') return err;
    if (err.message) return String(err.message);
    // React Hook Form + resolver can put array validation errors under `root`
    if (err.root && err.root.message) return String(err.root.message);
    // zod/resolver may return a `types` object with messages
    if (err.types) {
      if (typeof err.types === 'string') return err.types;
      if ((err.types as any).root) return String((err.types as any).root);
      const first = Object.values(err.types)[0];
      if (first) return String(first);
    }
    return undefined;
  };

  const body = error ? extractMessage(error) : children;

  if (!body) return null;

  return (
    <div
      data-slot="form-message"
      id={formMessageId}
      className={cn('-mt-0.5 text-xs font-normal text-destructive', className)}
      {...props}
    >
      {body}
    </div>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormSectionLabel,
  FormLabel,
  FormMessage,
  useFormField,
};
