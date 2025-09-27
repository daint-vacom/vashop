import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';

interface PersonProps {
  imageUrl: string;
  name: string;
  link?: string | null;
  description?: string | null;
  openInNewTab?: boolean;
}

export function Person({
  imageUrl,
  name,
  description,
  link,
  openInNewTab = false,
}: PersonProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={toAbsoluteUrl(`/media/avatars/${imageUrl}`)}
        className="rounded-full size-9 shrink-0"
        alt={`${name}`}
      />
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <Link
          className="text-sm font-medium text-mono hover:text-primary mb-px block w-full truncate"
          to={link || '#'}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {name}
        </Link>
        {description && (
          <span className="text-sm text-secondary-foreground font-normal block w-full truncate">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
