import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const userSession = await auth();

  if (userSession) {
    redirect("/dashboard");
  }

  return (

    //divided screen 
    <main className="min-h-screen flex">

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8  pink-bg">
          <div>    
            <h1 className="text-3xl font-semibold text-slate-800"> Mindmetrics : Student Mental Health Literacy Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to access your dashboard</p>
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
      
     <img src="image.png" alt="login visual" />
    
    </main>
  );
}