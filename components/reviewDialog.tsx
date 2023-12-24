import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollShadow } from "@nextui-org/react";
import { Flower, PlusIcon } from "lucide-react";
import { useState } from "react";
import RatingStar from "./ratingStar";
import ReviewScreenshot, { Screenshot } from "./reviewScreenshot";
import { z } from "zod";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/app/supabase";
import { CheckpointUser } from "@/interfaces/user";

interface FeedbackDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGame: Game | undefined;
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
  user: CheckpointUser | undefined;
}

const schema = z.object({
  review: z
    .string()
    .min(1, { message: "You must write a title to your review" }),
  text: z.string().min(1, { message: "You must write a text to your review" }),
});

export default function FeedbackDialog({
  open,
  setOpen,
  selectedGame,
  setSelectedGame,
  user,
}: FeedbackDialogProps) {
  const [stars, setStars] = useState<number>(0);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [screenshotsFiles, setScreenshotsFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [screenshotsError, setScreenshotsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const clickImageInput = () => {
    const imageInput = document.getElementById("image-input");

    if (imageInput) imageInput.click();
  };

  const onImageInputChange = (files: any) => {
    const imageInput = document.getElementById("image-input");

    if (imageInput) {
      if (files) {
        const file = files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const result = e.target?.result;

            if (result) {
              setScreenshots([
                ...screenshots,
                {
                  id: screenshots.length,
                  url: result.toString(),
                },
              ]);
            }
          };

          reader.readAsDataURL(file);
          setScreenshotsFiles([...screenshotsFiles, file]);
        }
      }
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (formData) => {
    setLoading(true);

    const uploadedScreenshots = [];

    for (const image of screenshotsFiles) {
      const { data, error } = await supabase.storage
        .from("screenshots")
        .upload(
          `${user?.email?.split(
            "@",
          )[0]}-${selectedGame?.id}/${screenshotsFiles.indexOf(image)}`,
          image,
        );

      if (error) {
        toast.error("Error while uploading screenshots. Try again");
        setScreenshotsError(true);
        break;
      }

      uploadedScreenshots.push(data.path);
    }

    if (screenshotsError && uploadedScreenshots.length)
      setScreenshotsError(false);

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        stars,
        review: formData.review,
        text: formData.text,
        screenshots: JSON.stringify(uploadedScreenshots),
        user: user?.id,
        game_id: selectedGame?.id,
      })
      .select("id");

    if (error) {
      toast.error("Error while submitting review. Try again");
      console.log({ error });
    }

    if (data && data[0].id) {
      toast.success("Review submitted!");
      setLoading(false);
      setOpen(false);
      window.location.href = `/review/${data[0].id}`;
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setSelectedGame(undefined);
      }}
    >
      <DialogContent className="sm:max-w-2xl dark bg-black p-0 rounded-xl border-zinc-800">
        <ScrollShadow className="w-full h-[45rem]">
          <div className="w-full border-b-2 border-zinc-800 py-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-zinc-300">
                What do you think about {selectedGame?.name}?
              </h3>
            </div>
          </div>

          <div className="mt-4 pl-4 pr-6 py-2">
            <div className="w-full grid grid-flow-row-dense grid-cols-2 gap-4 transitionl-all duration-150 ease-soft-spring">
              {screenshots.map((screenshot, index) => (
                <ReviewScreenshot
                  key={index}
                  id={index}
                  url={screenshot.url}
                  setScreenshots={setScreenshots}
                />
              ))}

              {screenshots.length < 4 && (
                <div className="w-[20rem] h-48">
                  <div
                    className="bg-zinc-900 w-full h-full rounded-lg border border-zinc-800 flex items-center justify-center transition-all duration-75 ease-soft-spring hover:bg-zinc-800 cursor-pointer"
                    onClick={clickImageInput}
                  >
                    <PlusIcon className="h-16 w-16 text-zinc-500" />

                    <input
                      type="file"
                      name="image-input"
                      id="image-input"
                      hidden
                      accept="image/*"
                      onChange={(e) => onImageInputChange(e.target.files)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <h3 className="text-md text-zinc-500 px-4">
              You&apos;ve uploaded {screenshots.length}/4 screenshots
            </h3>
          </div>

          <div className="flex gap-x-4 items-center p-4">
            {[0, 1, 2, 3, 4].map((_) => (
              <RatingStar stars={stars} setStars={setStars} index={_} key={_} />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4">
              <textarea
                className={`w-full bg-zinc-900 rounded-xl border border-zinc-700 text-zinc-300 outline-none p-4 text-md placeholder:text-zinc-500 min-h-[10rem] ${
                  errors?.review ? "border-red-700" : ""
                }`}
                placeholder="A title for your review"
                {...register("review")}
              />
            </div>

            <div className="px-4">
              {errors.review && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.review.message}
                </p>
              )}
            </div>

            <div className="p-4">
              <textarea
                className={`w-full bg-zinc-900 rounded-xl border border-zinc-700 text-zinc-300 outline-none p-4 text-md placeholder:text-zinc-500 min-h-[10rem] ${
                  errors?.text ? "border-red-700" : ""
                }`}
                placeholder="Write your review"
                {...register("text")}
              />
            </div>

            <div className="px-4">
              {errors.text && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.text.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4 px-4 pb-4">
              <button
                className="py-2 px-4 rounded-lg bg-indigo-500 border border-indigo-800 text-white flex gap-x-2 items-center w-32 justify-center transition-all duration-75 hover:bg-indigo-700"
                type="submit"
                disabled={screenshotsError || loading}
              >
                {loading ? (
                  <span className="flex items-center gap-x-2">
                    <Flower className="animate-spin" /> Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-x-2">
                    <Flower /> Send
                  </span>
                )}
              </button>
            </div>
          </form>
        </ScrollShadow>
      </DialogContent>
    </Dialog>
  );
}
