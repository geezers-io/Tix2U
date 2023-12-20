import { PartialToTableRow } from '@/api/@types/supabase.types.ts';

export function partialToTableRow<T extends Record<string, unknown>>(obj: T): PartialToTableRow<T> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ?? null])) as PartialToTableRow<T>;
}
