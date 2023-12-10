"use client";

import { CheckCircle2, Gamepad2Icon, HeartIcon } from "lucide-react";
import { useState } from "react";
import { GiPotionBall } from "react-icons/gi";
import { TbFaceIdError } from "react-icons/tb";

interface SignupButtonProps {
  type: string;
  buttonClicked?: boolean;
  loading: boolean;
}

export default function SignupButton({
  type,
  buttonClicked,
  loading,
}: SignupButtonProps) {
  const [buttonHover, setButtonHover] = useState<boolean>(false);

  switch (type) {
    case "success":
      return (
        <div
          className={`py-2 px-4 rounded-lg bg-green-700 text-white flex items-center gap-x-2 transition-all duration-50 ease-linear justify-center`}
        >
          <CheckCircle2 /> Success!
        </div>
      );

    case "failure":
      return (
        <>
          {buttonHover ? (
            <button
              className={`py-2 px-4 rounded-lg bg-pink-700 text-white flex items-center gap-x-2 duration-50 ease-linear justify-center cursor-pointer transition-all duration-150 hover:bg-pink-800 w-full ${
                buttonClicked ? "scale-105" : ""
              }`}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-x-2">
                  <HeartIcon className="h-4 w-4" /> Working on it...
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  <HeartIcon className="h-4 w-4" /> Try again?
                </div>
              )}
            </button>
          ) : (
            <div
              className={`py-2 px-4 rounded-lg bg-red-700 text-white flex items-center gap-x-2 transition-all duration-50 ease-linear justify-center`}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              <TbFaceIdError /> Error!
            </div>
          )}
        </>
      );

    default:
      return (
        <button
          className={`py-2 px-4 rounded-lg bg-indigo-700 text-white flex items-center gap-x-2 transition-all duration-50 ease-linear hover:bg-indigo-800 cursor-pointer ${
            buttonClicked ? "scale-105" : ""
          }`}
          type="submit"
        >
          {loading ? (
            <>
              <GiPotionBall /> Drinking some HP potions...
            </>
          ) : (
            <>
              <Gamepad2Icon /> Continue
            </>
          )}
        </button>
      );
  }
}
