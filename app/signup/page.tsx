"use client";

import { Image } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../supabase";
import { toast } from "sonner";
import { useState } from "react";
import SignupButton from "./components/button";
import Link from "next/link";

const schema = z
  .object({
    name: z.string().min(1, { message: "You must say me your name" }),
    email: z.string().email({ message: "This email is invalid" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (formData) => {
    setLoading(true);

    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 300);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
      setFailure(true);
    }

    if (data.user?.email) {
      toast.success(
        "Account created! Please check your email to verify your account."
      );

      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="h-full w-[30rem] bg-zinc-950 px-8 flex flex-col justify-between">
        <Link href={"/"}>
          <h1 className="text-lg font-black text-white uppercase mr-16 pb-16 pt-16">
            Checkpoint
          </h1>
        </Link>

        <h1 className="text-xl text-white font-bold">Create your account</h1>

        <form className="mt-16 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 outline-none bg-zinc-950 text-zinc-300 w-72"
            placeholder="Your name"
            autoComplete="name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}

          <input
            type="text"
            className="py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 outline-none bg-zinc-950 text-zinc-300 w-72"
            placeholder="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}

          <input
            type="password"
            className="py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 outline-none bg-zinc-950 text-zinc-300 w-72"
            placeholder="Password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}

          <input
            type="password"
            className="py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 outline-none bg-zinc-950 text-zinc-300 w-72"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="py-8">
            {success ? (
              <SignupButton type="success" loading={loading} />
            ) : (
              <>
                {failure ? (
                  <SignupButton type="failure" loading={loading} />
                ) : (
                  <SignupButton
                    type="default"
                    buttonClicked={buttonClicked}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>

          <Link
            href={"/login"}
            className="text-indigo-500 text-sm py-4 hover:text-indigo-700"
          >
            Already have an account?
          </Link>
        </form>

        <p className="mt-16 text-xs text-zinc-400">
          There aren&apos;t many terms for this account creation process. We are
          an open-source app that only want to make it possible for you to share
          all of your platinum games.
        </p>

        <a
          href="https://twitter.com/ducaswtf"
          className="text-zinc-700 text-sm pb-16"
        >
          Follow me at twitter to get updated
        </a>
      </div>

      <Image
        className="h-full w-full object-cover"
        src="https://i.ibb.co/T4xc4vG/Sharpened.png"
      />
    </div>
  );
}
