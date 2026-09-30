import { Link } from 'react-router-dom';
import { cn, isExternal } from '../../lib/utils';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
  accent: 'bg-accent text-ink hover:brightness-95 shadow-sm',
  outline: 'border border-primary/25 text-primary hover:border-primary hover:bg-primary/5',
  light: 'bg-white text-primary hover:bg-surface',
  ghostLight: 'border border-white/40 text-white hover:bg-white/10',
  link: 'text-primary hover:text-primary-dark px-0 min-h-0 underline-offset-4 hover:underline',
};
const sizes = { md: 'min-h-[48px] px-5 text-[0.95rem]', lg: 'min-h-[54px] px-7 text-base', sm: 'min-h-[40px] px-4 text-sm' };

/** زر موحّد: to = رابط داخلي، href = رابط خارجي، وإلا <button> */
export default function Button({ to, href, variant = 'primary', size = 'md', className, children, ...rest }) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-out active:scale-[0.98] select-none',
    variants[variant], variant !== 'link' && sizes[size], className
  );
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) {
    const ext = isExternal(href);
    return <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
