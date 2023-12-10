import { CheckCircle2, Gamepad2Icon } from "lucide-react";
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
        <div
          className={`py-2 px-4 rounded-lg bg-red-700 text-white flex items-center gap-x-2 transition-all duration-50 ease-linear justify-center`}
        >
          <TbFaceIdError /> Error!
        </div>
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
