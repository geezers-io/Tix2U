import { createClient } from '@supabase/supabase-js';
import { Database } from '@/api/lib/database.types';

const supabaseUrl = 'https://uuswjurznunizzqrciwt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
