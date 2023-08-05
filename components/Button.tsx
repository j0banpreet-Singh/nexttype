import { MouseEventHandler } from "react";
import Image from "next/image";

type props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
  handleClick?: MouseEventHandler;
  Submitting?: boolean | false;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  type,
  handleClick,
  textColor,
  bgColor,
  Submitting,
}: props) => {
  return (
    <button
      disabled={Submitting || false}
      className={`max-md:w-full font-medium ${
        Submitting ? "cursor-wait" : "cursor-pointer"
      } flex items-center gap-3 rounded-xl capitalize px-4 py-3 text-sm ${
        Submitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      } ${textColor ? textColor : "text-white"}`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="leftIcon" />
      )}
      {title}
    </button>
  );
};

export default Button;
