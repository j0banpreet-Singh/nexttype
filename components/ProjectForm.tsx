"use client";
import { FormState, ProjectInterface, SessionInterface } from "@/common.types";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constant";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { uploadImage, createProject, fetchToken,updateProject } from "@/lib/actions";

type props = {
  session: SessionInterface;
  type: string;
  project?:ProjectInterface
};

const ProjectForm = ({ session, type ,project}: props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title||"",
    description: project?.description||"",
    liveSiteUrl: project?.liveSiteUrl||"",
    githubUrl: project?.githubUrl||"",
    category: project?.category||"",
    image: project?.image||"",
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("please upload an image");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      console.log(result)
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { token } = await fetchToken();
    setSubmitting(true);
    try {
      if (type === "create") {
        await createProject(form, session?.user?.id, token);
        router.push("/")
      }

      if (type === "edit") {
        await updateProject(form,project?.id as string,token)
        router.push("/")
      }
    } catch (error) {
      alert(
        `${type === "create" ? "creating" : "editing"} form failed. Try! Again`
      );
    }finally{
      setSubmitting(false)
    }
  };

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container ">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose an Poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Description for your project"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="http://localhost:3000"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        title="Github URL"
        state={form.githubUrl}
        placeholder="http://github/jobnarora678@gmail.com"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="category"
        state={form.category}
        setState={(value) => handleStateChange("category", value)}
        filters={categoryFilters}
      />
      <div className="w-full flexStart">
        <Button
        bgColor="bg-black-100"
          title={
            submitting
              ? `${type === "create" ? "creating" : "editing"}`
              : `${type === "create" ? "create" : "edit"}`
          }
          Submitting={submitting}
          leftIcon={submitting ? "" : "/plus.svg"}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
