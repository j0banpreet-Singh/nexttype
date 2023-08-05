import Modal from "@/components/Modal";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const data = (await getProjectDetails(id)) as { project: ProjectInterface };

  if (!data?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = data.project;

  return (
    <Modal>
      <section className="w-full max-w-4xl flex items-center justify-center">
        <div className="flex w-full gap-5 max-xs:flex-col">
          <Link href={`/profile/${projectDetails?.createdBy?.id}`}>
            <Image
              src={projectDetails.createdBy.avatarUrl}
              alt="avatar url"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <p className="self-start text-lg font-semibold capitalize">
              {projectDetails.title}
            </p>
            <div className="flex gap-2 font-normal w-full text-sm">
              <Link
                href={`/profile/${projectDetails.createdBy.id}`}
                target="_blank"
              >
                {projectDetails.createdBy.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                target="_blank"
                className="text-primary-purple font-semibold"
              >
                {projectDetails.category}
              </Link>
            </div>
          </div>
        </div>
        {
          (projectDetails?.createdBy?.id === session?.user?.id) && (
            <div className="flex gap-2">
              <ProjectActions projectId={projectDetails.id}/>
            </div>
          )
        }
      </section>

      <section className="mt-14 max-w-4xl ">
        <Image
          src={projectDetails.image}
          className="object-cover rounded-2xl "
          width={896}
          height={896}
          alt="project image"
        />
      </section>

      <section className="mt-20 flex-col flex justify-center items-center max-w-4xl">
        <p className="text-xl font-normal">{projectDetails.description}</p>
        <div className="flex gap-5 mt-5">
          <Link
            href={`${projectDetails.githubUrl}`}
            target="_blank"
            className="text-sm  font-medium text-primary-purple flex items-center justify-center gap-2"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Link
            href={`${projectDetails.liveSiteUrl}`}
            target="_blank"
            className="text-sm  font-medium text-primary-purple flex items-center justify-center gap-2"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
      <section className="flexCenter w-full gap-8 mt-28 max-w-5xl">
        <span className="bg-light-white-200 h-0.5 w-full"></span>
        <Link href={`/profile/${id}`} className="min-w-[82px] min-h-[82px]">
          <Image
            src={projectDetails.createdBy.avatarUrl}
            alt="avatar url"
            width={70}
            height={70}
            className="rounded-full"
          />
        </Link>
        <span className="bg-light-white-200 h-0.5 w-full"></span>
      </section>
      <RelatedProjects userId={projectDetails.createdBy.id} projectId={projectDetails.id}/>
    </Modal>
  );
};

export default Project;
