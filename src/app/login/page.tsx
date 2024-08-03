import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function LoginPage() {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className={`w-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
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
          <form action="#" method="POST" className={`space-y-6`}>
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
              <ThemedButton text="Sign In" type="submit" className="flex w-full justify-center" color="primary" />
            </div>
          </form>

          <p className={`mt-10 text-center text-sm text-gray-500`}>
            Not a member?{" "}
            <a
              href="#"
              className={`font-semibold leading-6 ${tw.TEXT_TERTIARY} hover:text-indigo-500`}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}