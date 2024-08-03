import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
export default function NewUserRegistrationPage() {
  return (
    <div className={`flex w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
      <h2 className={`${tw.TEXT_PRIMARY} text-center text-2xl`}>Create Your Account</h2>
      <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
        <form action="#" method="POST" className={`space-y-6`}>
          <div className="flex justify-between gap-2">
            <ThemedTextInput
              id="firstName"
              name="firstName"
              type="firstName"
              placeholder="First Name"
              required
              autoComplete="firstName"
            />
            <ThemedTextInput
              id="lastName"
              name="lastName"
              type="lastName"
              placeholder="Last Name"
              required
              autoComplete="lastName"
            />
          </div>
          <div className={`mt-2`}>
            <ThemedTextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
            />
          </div>
          <div className={`mt-2`}>
            <ThemedTextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
          </div>
          <div className={`mt-2`}>
            <ThemedTextInput
              id="confirm-password"
              name="confirm-password"
              type="confirm-password"
              placeholder="Confirm Password"
              required
              autoComplete="confirm-password"
            />
          </div>
          <div>
            <ThemedButton
              text="Register"
              type="submit"
              className="flex w-full justify-center"
              color="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
