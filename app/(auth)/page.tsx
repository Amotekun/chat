import { AuthForm } from "./components/auth-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 
          className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Sign into your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
