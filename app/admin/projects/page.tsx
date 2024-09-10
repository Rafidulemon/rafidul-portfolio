"use client";
import { useState } from "react";
import ProjectsCard from "@/app/components/cards/ProjectsCard";
import PageTitle from "@/app/components/typography/PageTitle";
import Button from "@/app/components/display/Button";

interface Project {
  src: string;
  project_title: string;
  project_details: string;
}

const initialProjects: Project[] = [
  {
    src: "/images/projects/portfolio-web.png",
    project_title: "Portfolio Website",
    project_details:
      "A personal portfolio website built with React and Tailwind CSS to showcase my projects and blogs.",
  },
  {
    src: "/images/projects/ecom-website.png",
    project_title: "E-commerce App",
    project_details:
      "A full-stack e-commerce application built with Next.js, Node.js, and MongoDB with features like product listing, cart, and checkout.",
  },
  {
    src: "/images/projects/alizaAi.jpg",
    project_title: "Social Media App",
    project_details:
      "A social media platform where users can post updates, follow others, and interact through comments and likes.",
  },
];

const ProjectsEdit = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    src: "/path-to-image-placeholder.jpg",
    project_title: "",
    project_details: "",
  });

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    setNewProject(projects[index]);
  };

  const handleSaveClick = () => {
    if (currentEditIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[currentEditIndex] = newProject;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleAddNewProject = () => {
    setNewProject({
      src: "/path-to-image-placeholder.jpg",
      project_title: "",
      project_details: "",
    });
    setIsEditing(true);
    setCurrentEditIndex(null);
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 min-h-screen flex flex-col items-center">
      <PageTitle name="Projects" />
      
      <div className="w-full flex flex-col md:flex-row justify-center gap-6 my-16">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col items-center">
            <ProjectsCard
              src={project.src}
              project_title={project.project_title}
              project_details={project.project_details}
            />
            <Button
              onClick={() => handleEditClick(index)}
              theme="secondary"
              className="w-[100px] mt-2"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleAddNewProject}
        theme="primary"
      >
        Add New Project
      </Button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-2xl shadow-md shadow-cyan-900 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {currentEditIndex !== null ? "Edit Project" : "Add New Project"}
            </h2>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Project Image URL</label>
              <input
                type="text"
                value={newProject.src}
                onChange={(e) =>
                  setNewProject({ ...newProject, src: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Project Title</label>
              <input
                type="text"
                value={newProject.project_title}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    project_title: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Project Details</label>
              <textarea
                value={newProject.project_details}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    project_details: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-black"
                rows={4}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleCancelClick}
                theme="secondary"
                className="w-[100px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveClick}
                theme="primary"
                className="w-[100px]"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsEdit;
