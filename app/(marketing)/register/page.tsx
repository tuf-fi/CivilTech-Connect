"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerStudent, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerStudent, initialState);

  if (state.success) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Account created</h1>
        <p className="text-muted-foreground">You can now log in with your new account.</p>
        <Link
          href="/login"
          className="mt-4 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <span className="text-xs font-bold uppercase tracking-widest text-primary">Get certified</span>
      <h1 className="mt-1 text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-muted-foreground">Register with your dealership email to start training.</p>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>

        {state.error && <p className="text-sm text-destructive">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
