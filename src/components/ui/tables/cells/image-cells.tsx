import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'img'> {
  imageUrl?: string | null | undefined;
}

export function ImageCell({ imageUrl, className }: Props) {
  if (!imageUrl) return null;
  return (
    <img
      src={imageUrl}
      alt="Image"
      className={cn('max-h-4 object-contain', className)}
    />
  );
}
