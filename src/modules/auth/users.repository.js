import { unwrap } from '../../lib/supabase.js';

const TABLE = 'users';

// Acceso a datos de usuarios: único archivo del módulo que conoce Supabase.
export function createUsersRepository(db) {
  return {
    async findByEmail(email) {
      return unwrap(await db.from(TABLE).select('id, email, password_hash').eq('email', email).maybeSingle());
    },

    async create({ email, passwordHash }) {
      return unwrap(
        await db.from(TABLE).insert({ email, password_hash: passwordHash }).select('id, email, created_at').single(),
      );
    },
  };
}
