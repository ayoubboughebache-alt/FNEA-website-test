/**
 * خريطة الأيقونات المستعملة في ملفات JSON (الحقل "icon").
 * لإضافة أيقونة جديدة: استوردها من lucide-react وأضفها هنا (قائمة الأيقونات: lucide.dev/icons)
 */
import {
  Compass, BookOpenCheck, ClipboardList, BedDouble, Wallet, MessagesSquare, Sparkles, Layers, Presentation,
  PencilLine, FlaskConical, CalendarCheck, FileCheck2, RotateCcw, Scale, Calculator, Bus, TriangleAlert,
  HelpCircle, GraduationCap, HeartHandshake, Users, Megaphone, Lightbulb, ShieldCheck,
} from 'lucide-react';

const MAP = {
  Compass, BookOpenCheck, ClipboardList, BedDouble, Wallet, MessagesSquare, Sparkles, Layers, Presentation,
  PencilLine, FlaskConical, CalendarCheck, FileCheck2, RotateCcw, Scale, Calculator, Bus, TriangleAlert,
  GraduationCap, HeartHandshake, Users, Megaphone, Lightbulb, ShieldCheck,
};

export default function Icon({ name, ...props }) {
  const C = MAP[name] ?? HelpCircle;
  return <C aria-hidden="true" {...props} />;
}
