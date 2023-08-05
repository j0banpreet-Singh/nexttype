'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};
const ProjectActions = ({ projectId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push("/")
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="bg-light-white-400 flex items-center justify-center p-3 rounded-lg"
      >
        <Image src="/pencile.svg" width={18} height={18} alt="pencil" />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className={`bg-gray p-3 rounded-lg hover:bg-red-600 ${isDeleting ? "bg-gray" : "bg-black-100"}`}
      >
        <Image src="/trash.svg" width={18} height={18} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
