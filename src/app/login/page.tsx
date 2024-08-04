import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Link from "next/link";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onLoginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Register new user error - missing form values");
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      throw new Error(res.error);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className={`flex w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
        <div className={`sm:mx-auto sm:w-full sm:max-w-sm`}>
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className={`mx-auto h-10 w-auto`}
          />
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${tw.TEXT_PRIMARY}`}
          >
            Sign in to your account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <form onSubmit={onLoginFormSubmit} className={`space-y-6`}>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium leading-6 ${tw.TEXT_PRIMARY}`}
              >
                Email address
              </label>
              <div className={`mt-2`}>
                <ThemedTextInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className={`flex items-center justify-between`}>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium leading-6 ${tw.TEXT_PRIMARY}`}
                >
                  Password
                </label>
                <div className={`text-sm`}>
                  <a
                    href="#"
                    className={`font-semibold ${tw.TEXT_TERTIARY} hover:text-indigo-500`}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className={`mt-2`}>
                <ThemedTextInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <ThemedButton
                text="Sign In"
                type="submit"
                className="flex w-full justify-center"
                color="primary"
              />
            </div>
          </form>

          <p className={`mt-10 text-center text-sm text-gray-500`}>
            Not a member?{" "}
            <Link
              href="/login/register"
              className={`font-semibold leading-6 ${tw.TEXT_TERTIARY} hover:text-indigo-500`}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
