import React from 'react';
import { Link } from 'react-router-dom';
import { getAvatarFallback } from '@/lib/avatar-fallback';
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar';

interface Props {
  imageUrl: string;
  name: string;
  link?: string | null;
  description?: React.ReactNode;
  openInNewTab?: boolean;
}

export function AvatarCell({
  imageUrl,
  name,
  description,
  link,
  openInNewTab = false,
}: Props) {
  return (
    <div className="flex items-center gap-4 w-full">
      <Avatar className="rounded-full size-9 shrink-0">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0 w-full">
        <span className="text-sm font-medium text-mono hover:text-primary mb-px block w-full truncate">
          <Link
            to={link || '#'}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
          >
            {name}
          </Link>
        </span>

        {description && (
          <div className="text-sm text-secondary-foreground font-normal block w-full truncate">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
