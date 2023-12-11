"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "@nextui-org/react";
import { Gamepad2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "../supabase";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "This email is invalid" }),
  password: z.string(),
});

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (formData) => {
    setButtonClicked(true);
    setLoading(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 300);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
      setFailure(true);
      setLoading(false);
    }

    if (data.user) {
      toast.success("Welcome back!");

      setTimeout(() => {
        window.location.href = "/";
      }, 200);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="h-full w-[30rem] bg-zinc-950 px-8 flex flex-col justify-between">
        <div className="flex flex-col">
          <Link href={"/"}>
            <h1 className="text-lg font-black text-white uppercase mr-16 pb-4 pt-16">
              Checkpoint
            </h1>
          </Link>

          <h1 className="text-xl text-white font-bold">Login</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={`py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 bg-zinc-950 text-zinc-300 w-72 outline-none ${
              failure ? "ring-1 ring-red-500" : ""
            }`}
            placeholder="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}

          <input
            type="password"
            className={`py-2 px-4 rounded-lg border focus:border-indigo-800 border-zinc-800 ring-0 bg-zinc-950 text-zinc-300 w-72 outline-none ${
              failure ? "ring-1 ring-red-500" : ""
            }`}
            {...register("password")}
            placeholder="Password"
          />

          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}

          <button
            className={`py-2 px-4 rounded-lg bg-indigo-700 text-white flex items-center gap-x-2 transition-all duration-50 ease-linear hover:bg-indigo-800 cursor-pointer ${
              buttonClicked ? "scale-105" : ""
            }`}
            type="submit"
          >
            {loading ? (
              <div className="flex gap-x-2 items-center">
                <Gamepad2Icon /> Almost there...
              </div>
            ) : (
              <div className="flex gap-x-2 items-center">
                <Gamepad2Icon /> Login
              </div>
            )}
          </button>
        </form>

        <div className="mb-16 flex flex-col gap-y-8">
          <a
            href="https://twitter.com/ducaswtf"
            className="text-zinc-700 text-sm pb-16"
          >
            Follow me at twitter to get updated
          </a>
        </div>
      </div>

      <Image
        className="h-full w-full object-cover rounded-tl-xl rounded-bl-lg rounded-tr-none rounded-br-none md:rounded-xl"
        src="https://i.ibb.co/T4xc4vG/Sharpened.png"
      />
    </div>
  );
}
