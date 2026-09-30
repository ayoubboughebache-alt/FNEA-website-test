import { Inbox } from 'lucide-react';
export default function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-surface px-6 py-14 text-center text-muted">
      <Inbox className="h-8 w-8 opacity-60" aria-hidden="true" /><p>{text}</p>
    </div>
  );
}
