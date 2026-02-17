import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main >
      <h1 >GuardME</h1>

      <form
        action={async () => {
          "use server";//directive 
          await signIn("google");
        }}
      >
        <button className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-full shadow hover:shadow-md">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            width="20"
            alt="Google"
          />
          <span>Sign in with Google</span>
        </button>
      </form>
    </main>
  );
}
