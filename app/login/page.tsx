import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex  ">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8  pink-bg">
        <div className="w-full max-w-sm flex flex-col gap-6">


          <div>
         <div className="card flex flex-col items-center gap-6 w-full max-w-sm text-center">
            <h1 className="text-3xl font-semibold text-slate-800">MindMetrics: Student Mental Health Literacy Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to access your dashboard</p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-slate-700">
              <img
                src="https://authjs.dev/img/providers/google.svg"
                width="20"
                alt="Google"
              />
              Sign in with Google
            </button>
          </form>

        </div>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center login">
      
     <img src="/image.png" alt="login visual" />
       </div>

    </main>
  );
}