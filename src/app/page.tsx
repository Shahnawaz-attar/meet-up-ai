/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth.client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const [isLogin, setIsLogin] = useState(false);

  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    authClient.signUp.email(
      {
        email: signupEmail,
        password: signupPassword,
        name: signupName,
      },
      {
        onSuccess: () => {
          window.alert("Sign up successful! You can now log in.");
          setIsLogin(true);
        },
        onError: (error) => {
          window.alert(
            `Error signing up: ${error.response || "Unknown error"}`
          );
        },
      }
    );
    setSignupEmail("");
    setSignupPassword("");
    setSignupName("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        onSuccess: () => {
          window.alert("Login successful!");
        },
        onError: (error) => {
          window.alert(
            `Error logging in: ${error.response || "Unknown error"}`
          );
        },
      }
    );
    setLoginEmail("");
    setLoginPassword("");
  };

  if (session) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="mt-4">You are already logged in.</p>
        <Button
          className="mt-4"
          onClick={() => {
            authClient.signOut();
          }}
          variant="destructive"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  if (isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      {isLogin ? (
        <form
          className="space-y-4 max-w-sm mx-auto mt-10"
          onSubmit={handleLogin}
        >
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="login-email"
            >
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="login-password"
            >
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!loginEmail || !loginPassword}
          >
            Login
          </Button>
          <p className="text-sm mt-2 text-center">
            Don't have an account?
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </p>
        </form>
      ) : (
        <form
          className="space-y-4 max-w-sm mx-auto mt-10"
          onSubmit={handleSignup}
        >
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="signup-email"
            >
              Email
            </label>
            <Input
              id="signup-email"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="signup-password"
            >
              Password
            </label>
            <Input
              id="signup-password"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!signupEmail || !signupPassword || !signupName}
          >
            Sign Up
          </Button>
          <p className="text-sm mt-2 text-center">
            Already have an account?
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
