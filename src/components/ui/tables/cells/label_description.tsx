import React from 'react';

interface Props {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export function LabelDescriptionTableCell({ label, description }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-sm font-medium text-mono hover:text-primary mb-px truncate">
        {label}
      </div>
      {description && (
        <span className="text-sm text-secondary-foreground font-normal truncate">
          {description}
        </span>
      )}
    </div>
  );
}
