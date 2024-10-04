"use client";
import React from "react";
import { Label } from "../../lib/Label";
import { Input } from "../../lib/Input";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  IconArrowRight,
  IconBrandGoogle,
  IconQuestionMark,
} from "@tabler/icons-react";

const host = process.env.REACT_APP_BACKEND_HOST;

export function LoginForm() {
  // STATES
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // FUNCTIONS
  const onChangeMail = (e) => {
    setEmail(e.target.value);    
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);    
  };

  const showFailedAlert = (props) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: props,
    });
  };

  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history("/dashboard");
    } else {
      showFailedAlert(json.error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${host}/api/auth/google`;
  };

  return (
    <div
      style={{
        backgroundColor: "#171717",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      <div className="max-w-md z-1  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
        <div style={{ position: "relative", zIndex: 10, marginTop: 20 }}>
          <h2 className="font-bold text-4xl text-white">Welcome to Scholix</h2>
          <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
            Enter your login details to continue with your account
          </p>
        </div>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            {/* <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={onChangeMail} value={email} /> */}
            <input
              className="flex h-10 z-10  w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm "
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={onChangeMail}
              value={email}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            {/* <Input id="password" placeholder="••••••••" type="password" /> */}
            <input
              className="flex h-10 z-10  w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm "
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={onChangePassword}
              value={password}
              required
            />
          </LabelInputContainer>

          <button
            className="bg-white relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={handleGoogleLogin}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
          <Link
            to="/signup"
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          >
            <IconArrowRight className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Don't have an account? Signup
            </span>
            <BottomGradient />
          </Link>
          {/* <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                OnlyFans
              </span>
              <BottomGradient />
            </button> */}
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
