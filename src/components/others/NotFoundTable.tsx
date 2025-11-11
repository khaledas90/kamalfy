import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

const searchAnimation = `
  @keyframes search {
    0% {
      transform: translateX(0) rotate(0deg);
    }
    25% {
      transform: translateX(-5px) rotate(-5deg);
    }
    50% {
      transform: translateX(5px) rotate(5deg);
    }
    75% {
      transform: translateX(-5px) rotate(-5deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }
`;

export function TableNotFound() {
  const commonT = useTranslations("Dashboard");
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <style jsx>{searchAnimation}</style>
      <div className="bg-muted relative flex h-24 w-24 items-center justify-center rounded-full">
        <div className="relative">
          <Icon
            icon={"material-symbols:search-off"}
            className="text-muted-foreground h-20 w-20 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#c1c1c1] p-4"
            style={{
              transformOrigin: "center",
              animation: "search 3s ease-in-out infinite",
            }}
          />
          <span className="bg-muted-foreground/5 absolute inset-0 animate-ping rounded-full" />
        </div>
        <span className=" absolute -right-1 -top-1 flex h-8 w-8 animate-[bounce_1.5s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#d01f1f] text-xl font-bold text-white">
          0
        </span>
      </div>
      <h3 className="text-foreground mt-6 text-xl font-semibold">
        {commonT("common.No data found")}
      </h3>
      <p className="text-muted-foreground mt-2 text-center text-sm">
        {commonT(
          "common.We could not find any matching records in the database"
        )}
      </p>
    </div>
  );
}
