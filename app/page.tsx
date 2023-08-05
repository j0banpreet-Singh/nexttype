import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

type ProjectSearch = {
  projectSearch: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    edges: { node: ProjectInterface }[];
  };
};

type Props = {
  searchParams: {
    category: string;
    endCursor: string;
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endCursor } }: Props) => {
  console.log(endCursor);
  const data = (await fetchAllProjects(category, endCursor)) as ProjectSearch;

  console.log("requesting...", data.projectSearch.edges.length);
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="paddings flex flex-col justify-start mb-16">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, Let's Create One.
        </p>
      </section>
    );
  }
  return (
    <>
      <section className="paddings flex flex-col justify-start mb-16">
        <Categories />
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={node.id}
              id={node.id}
              image={node.image}
              avatarUrl={node.createdBy.avatarUrl}
              userId={node.createdBy.id}
              name={node.createdBy.name}
              title={node.title}
            />
          ))}
        </section>
        <LoadMore
          startCursor={data?.projectSearch?.pageInfo?.startCursor}
          endCursor={data?.projectSearch?.pageInfo?.endCursor}
          hasNextPage={data?.projectSearch?.pageInfo?.hasNextPage}
          hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        />
      </section>
    </>
  );
};

export default Home;
