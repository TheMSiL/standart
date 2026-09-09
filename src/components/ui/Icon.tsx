import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ClipboardList,
  Clock,
  Facebook,
  Gem,
  Hammer,
  Home,
  Instagram,
  Layers,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Shield,
  Sparkles,
  Star,
  TreePine,
  Users,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import { GoogleIcon, HouzzIcon } from "./BrandIcons";

/**
 * Anything the registry can hold. Lucide icons satisfy this, and so do the
 * hand-drawn brand marks in BrandIcons — lucide-react no longer ships those.
 */
type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

/**
 * Icon registry.
 *
 * Content files reference icons by string key so that data stays serialisable
 * and CMS-editable. Adding a new key here is the only step needed to make it
 * available to content.
 */
export const icons = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  calendar: CalendarDays,
  check: Check,
  clipboard: ClipboardList,
  clock: Clock,
  facebook: Facebook,
  gem: Gem,
  google: GoogleIcon,
  hammer: Hammer,
  home: Home,
  houzz: HouzzIcon,
  instagram: Instagram,
  layers: Layers,
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
  ruler: Ruler,
  shield: Shield,
  sparkles: Sparkles,
  star: Star,
  tree: TreePine,
  users: Users,
  wrench: Wrench,
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

/** Renders a registered icon, or nothing if the key is unknown. */
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Component = icons[name as IconName];
  if (!Component) return null;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
