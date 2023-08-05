import { UserProfile } from "@/common.types";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "./ProjectCard";

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => {
  return (
    <section className="paddings ">
      <section className="flex max-lg:flex-col justify-between gap-10">
        <div className="flex flex-col w-full items-start">
        <Image
          src={user.avatarUrl}
          width={100}
          height={100}
          alt="useravatar"
          className="rounded-full"
        />
        <p className="md:text-4xl text-2xl font-bold mt-10">{user.name}</p>
        <p className="capitalize md:text-5xl text-3xl font-extrabold mt-5 max-w-lg">
          I'm a Freelancer and Co-founder of flexibble 👋
        </p>
        <div className="flex gap-5 mt-8 flex-wrap">
          <Button
            title="Follow"
            bgColor="bg-light-white-400 !w-max"
            textColor="black"
            leftIcon="/plus-round.svg"
          />
          <Link href={`mailto:${user?.email}`}>
            <Button title="Hire Me" leftIcon="/email.svg" bgColor="bg-black-100"/>
          </Link>
        </div>
        </div>
        {user?.projects?.edges?.length > 0 ? (
                <Image
                    src={user?.projects?.edges[0]?.node?.image}
                    alt="project image"
                    width={739}
                    height={554}
                    className='rounded-lg object-contain'
                />
            ) : (
                <Image
                    src="/profile-post.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
            )}
      </section>
      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
           <p className="w-full text-left text-lg font-semibold">Recent Work</p>
           
           <div className="profile_projects">
                {user?.projects?.edges?.map(
                    ({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={`${node?.id}`}
                            id={node?.id}
                            image={node?.image}
                            title={node?.title}
                            name={user.name}
                            avatarUrl={user.avatarUrl}
                            userId={user.id}
                        />
                    )
                )}
            </div>
       </section>
    </section>
  );
};

export default ProfilePage;
