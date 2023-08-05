"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  title: string;
  image: string;
  avatarUrl: string;
  userId: string;
  id: string;
};
const ProjectCard = ({ name, title, id, userId, avatarUrl, image }: Props) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");
  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k");
  }, []);

  return (
    <div className="flex flex-col rounded-2xl drop-shadow-lg">
      <Link href={`/project/${id}`} className="relative group">
        <Image
          src={image}
          alt="project image"
          width={414}
          className="w-full h-full object-cover rounded-2xl"
          height={314}
        />
        <div className="hidden group-hover:flex justify-center items-center text-center font-semibold text-lg rounded-b-2xl absolute bottom-0 right-0 bg-gradient-to-b from-transparent to-black/50 w-full h-1/3 p-4 text-white">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flex justify-between mt-3 px-3">
        <Link href={`/profile/${userId}`}>
          <div className="flex gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="user-image"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flex gap-3 font-semibold text-sm">
          <div className="flex gap-2 items-center">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/eye.svg" width={12} height={9} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
