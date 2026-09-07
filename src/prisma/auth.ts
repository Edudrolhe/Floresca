import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

async function findOrCreateUser(profile: {
  name?: string | null
  email?: string | null
  image?: string | null
}) {
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const existing = await pool.query(
      'SELECT id, name, email, image, role FROM users WHERE email = $1',
      [profile.email]
    )
    if (existing.rows[0]) {
      return existing.rows[0]
    }
    const result = await pool.query(
      'INSERT INTO users (name, email, image, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, image, role',
      [profile.name ?? null, profile.email ?? null, profile.image ?? null, 'user']
    )
    return result.rows[0]
  } finally {
    await pool.end()
  }
}

async function getUserRole(userId: string): Promise<string | null> {
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const result = await pool.query('SELECT role FROM users WHERE id = $1', [userId])
    return result.rows[0]?.role ?? null
  } finally {
    await pool.end()
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { Pool } = await import('pg')
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        try {
          const result = await pool.query(
            'SELECT id, name, email, password, image, role FROM users WHERE email = $1',
            [credentials.email as string]
          )
          const user = result.rows[0]
          if (!user?.password) return null

          const valid = await bcrypt.compare(credentials.password as string, user.password)
          if (!valid) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        } finally {
          await pool.end()
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const dbUser = await findOrCreateUser({
          name: user.name,
          email: user.email,
          image: user.image,
        })
        user.id = dbUser.id
        ;(user as any).role = dbUser.role
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        ;(token as any).role = (user as any).role
      }
      if (token.id && !(token as any).role) {
        ;(token as any).role = await getUserRole(token.id as string)
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = (token as any).role
      }
      return session
    },
  },
})
