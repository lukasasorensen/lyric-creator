"use client";
import { createUser } from "@/clients/userClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import IUserDb from "@/interfaces/db/IUserDb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
export default function NewUserRegistrationPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordsMatching = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const onRegisterFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (!email || !firstName || !lastName) {
      throw new Error("Register new user error - missing form values");
    }
    if (password !== confirmPassword) {
      throw new Error("Register new user error - passwords do not match");
    }

    const newUser = {
      email,
      firstName,
      lastName,
      password,
    } as Partial<IUserDb>;

    console.log("Create New Users POST", newUser);

    try {
      setIsSaving(true);
      await createUser(newUser);
    } catch (error) {
      console.error(error);
      throw new Error("Error registering new user");
    } finally {
      setIsSaving(false);
      router.push("/login");
    }
  };

  if (isSaving) {
    return (
      <div className={`flex h-full w-full justify-center`}>
        <LoadingDisplay text="Registering..." />
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
      <h2 className={`${tw.TEXT_PRIMARY} text-center text-2xl`}>Create Your Account</h2>
      <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
        <form onSubmit={onRegisterFormSubmit} className={`space-y-6`}>
          <div className="flex justify-between gap-2">
            <ThemedTextInput
              id="firstName"
              name="firstName"
              type="text"
              minLength={2}
              placeholder="First Name"
              required
              autoComplete="firstName"
            />
            <ThemedTextInput
              id="lastName"
              name="lastName"
              type="text"
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
              minLength={8}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={`mt-2`}>
            <ThemedTextInput
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && !isPasswordsMatching && (
              <p className={`mt-2 text-sm ${tw.TEXT_DANGER}`}>Passwords do not match.</p>
            )}
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
        <p className={`mt-10 text-center text-sm text-gray-500`}>
          Already a member?{" "}
          <Link
            href="/login"
            className={`font-semibold leading-6 ${tw.TEXT_TERTIARY} hover:text-indigo-500`}
          >
            Go to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
