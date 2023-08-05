import { getAllUserProjects } from "@/lib/actions";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectInterface, UserProfile } from "@/common.types";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const data = (await getAllUserProjects(userId)) as { user: UserProfile };

  const filteredProjects = data?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  return (
    <div>
      <section className="flex flex-col w-full mt-32">
     {filteredProjects.length !== 0 && <div className="flexBetween">
                <p className="text-base font-bold">
                    More by {data?.user?.name}
                </p>
                <Link
                    href={`/profile/${data?.user?.id}`}
                    className="text-primary-purple text-base"
                >
                    View All
                </Link>
            </div>}
        <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-5 gap-8">
          {filteredProjects.map(({ node }) => (
            <Link href={`/project/${node.id}`} className="relative group">
              <Image
                src={node.image}
                alt="project image"
                width={414}
                className="w-full h-full object-cover rounded-2xl"
                height={314}
              />
              <div className="hidden group-hover:flex justify-center items-center text-center font-semibold text-lg rounded-b-2xl absolute bottom-0 right-0 bg-gradient-to-b from-transparent to-black/50 w-full h-1/3 p-4 text-white">
                <p className="w-full">{node.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RelatedProjects;
