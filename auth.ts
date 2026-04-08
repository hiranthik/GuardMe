import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    })
  ],
  callbacks: {

    async signIn({ profile }) {
      const email = profile?.email ?? '';
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

    
      return adminEmails.includes(email) || email.endsWith('@algomau.ca');
    },

    async session({ session }) {
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
      const email = session.user?.email ?? '';

      if (adminEmails.includes(email)) {
        session.user.role = 'admin';
      } else {
        session.user.role = 'viewer';
      }

      return session;
    },

  },
})