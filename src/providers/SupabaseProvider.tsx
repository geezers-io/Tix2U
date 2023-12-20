import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '@supabase/gotrue-js/src/lib/types.ts';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, TableRowToPartial, Tables } from '@/api/@types/supabase.types.ts';

const supabaseUrl = 'https://uuswjurznunizzqrciwt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

type Profile = TableRowToPartial<Tables<'profiles'>>;
type UserInfo = User & Profile;
interface Values {
  supabase: SupabaseClient<Database>;
  user?: UserInfo;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const SupabaseContext = createContext(null as unknown as Values);

const SupabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();
  const [needFetchUser, setNeedFetchUser] = useState(true); // NOTE: supabase signInWithOAuth 후에 getUser 를 곧바로 호출할 수 없어서 bool 플래그로 처리

  const values = useMemo<Values>(() => {
    const userInfo = user ? { ...user, ...profile } : undefined;

    return {
      supabase,
      user: userInfo,
      setUser,
    };
  }, [supabase, user, profile]);

  const getProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
      setProfile(profile as Profile);
    } catch (e) {
      console.error(e);
    }
  };

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(prev => ({
          ...prev,
          ...(user as User),
        }));
        setNeedFetchUser(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (needFetchUser) {
      getUser();
    }
  }, [needFetchUser]);

  useEffect(() => {
    if (!user) {
      setProfile(undefined);
      return;
    }
    getProfile(user.id);
  }, [user]);

  return <SupabaseContext.Provider value={values}>{children}</SupabaseContext.Provider>;
};

export default SupabaseProvider;

export function useSupabase() {
  if (!SupabaseContext) {
    throw new Error('SupabaseContext is not initialized');
  }
  return useContext(SupabaseContext);
}
