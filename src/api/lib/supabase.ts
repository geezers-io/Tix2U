import { createClient } from '@supabase/supabase-js';
import { Database } from '@/api/lib/database.types';

const supabaseUrl = 'https://uuswjurznunizzqrciwt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
