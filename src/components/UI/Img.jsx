import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { asset, cn } from '../../lib/utils';

/** صورة بتحميل كسول Lazy + حالة احتياطية إذا كان المسار فارغًا أو خاطئًا */
export default function Img({ src, alt = '', className, eager = false, placeholder, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-2 bg-surface text-muted pattern-stars-dark', className)} role="img" aria-label={alt}>
        <ImageOff className="h-7 w-7 opacity-50" aria-hidden="true" />
        {placeholder && <span className="text-xs">{placeholder}</span>}
      </div>
    );
  }
  return (
    <img src={asset(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)}
      className={cn('object-cover', className)} {...rest} />
  );
}
