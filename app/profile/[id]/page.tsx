import React from "react";
import Image from "next/image";
import { getAllUserProjects } from "@/lib/actions";
import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const data = (await getAllUserProjects(id)) as { user: UserProfile };

  console.log(data.user.avatarUrl)
  if (!data?.user)
    return <p className="no-result-text">failed to fetch user</p>;

    return <ProfilePage user={data?.user}/>;
};

export default Profile;
