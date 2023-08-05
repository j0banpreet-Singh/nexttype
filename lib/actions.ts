import { GraphQLClient } from "graphql-request";
import {
  getUserQuery,
  createUserMutation,
  createProjectMutation,
  projectsQuery,
  getProjectByIdQuery,
  deleteProjectMutation,
  getUserProjects,
  updateProjectMutation
} from "@/graphql";
import { json } from "stream/consumers";
import { FormState, ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "icandoit";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQlRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };
  return makeGraphQlRequest(createUserMutation, variables);
};

export const uploadImage = async (path: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: JSON.stringify({
        path: path,
      }),
    });
    return response.json();
  } catch (error) {
    console.log("error occured");
    throw error;
  }
};

export const createProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  const imageUrl = await uploadImage(form.image);
  try {
    if (imageUrl.url) {
      const variables = {
        input: {
          ...form,
          image: imageUrl.url,
          createdBy: {
            link: creatorId,
          },
        },
      };
      return makeGraphQlRequest(createProjectMutation, variables);
    }
  } catch (error) {
    console.log("failed creating project");
  }
};

export const fetchAllProjects = (category?: string | null, endCursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
console.log("ewnd",endCursor)
  return  makeGraphQlRequest(projectsQuery, { category, endCursor });
};

export const getProjectDetails = async (id: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQlRequest(getProjectByIdQuery, { id });
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQlRequest(deleteProjectMutation, { id });
};

export const getAllUserProjects = async(id:string)=>{
  client.setHeader('x-api-key',apiKey);

  return makeGraphQlRequest(getUserProjects,{id})
}

export const updateProject = async(form:FormState,projectId:string,token:string)=>{
  client.setHeader('Authorization',`Bearer ${token}`)
  function isBase64DataURL(value: string) {
    console.log("testing...")
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQlRequest(updateProjectMutation, variables);
}