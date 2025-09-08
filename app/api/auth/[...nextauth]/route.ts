import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
    { id: "1", name: "John Smith", email: "admin@example.com", password: "password123" },
    { id: "2", name: "Jane Doe", email: "jane@example.com", password: "janepass" },
];
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Demo: Hardcoded users array for frontend-only assignment

                const user = users.find(
                    (u) => u.email === credentials?.email && u.password === credentials?.password
                );
                if (user) {
                    // Don't return password in user object
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                }
                // If login fails, return null
                return null;
            }
        })
    ],

    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };