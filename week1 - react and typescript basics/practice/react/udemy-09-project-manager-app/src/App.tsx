import { useRef } from "react";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import Project from "./components/Project";
import ProjectCreation from "./components/ProjectCreation";
import Sidebar, { ProjectType, SidebarImperativeHandle } from "./components/Sidebar";

function App() {

  const [settings, setSettings] = useState<{
    selectedProject: ProjectType | null,
    projectCreation: boolean
  }>({
    selectedProject: null,
    projectCreation: false,
  });
  const sidebar = useRef<SidebarImperativeHandle>();

  const handleProjectCreation = () => {
    setSettings({
      selectedProject: null,
      projectCreation: true,
    });
    sidebar.current?.deselectProject();
  };

  const handleSaveProject = (project: ProjectType | undefined) => {
    setSettings({
      selectedProject: null,
      projectCreation: false,
    });
    if (project)
      sidebar.current?.saveProject(project);
  }

  const handleProjectSelection = (project: ProjectType) => {
    setSettings({
      selectedProject: project,
      projectCreation: false,
    });
  }

  const handleProjectDelete = () => {
    sidebar.current?.deleteProject(settings.selectedProject);
    setSettings({
      selectedProject: null,
      projectCreation: false,
    });
  }

  const loadPageContent = () => {
    if (settings.selectedProject)
      return <Project project={settings.selectedProject} onDelete={handleProjectDelete} />
    if (settings.projectCreation)
      return <ProjectCreation onAction={handleSaveProject} />
    return <NoProjectSelected onNewProject={handleProjectCreation} />
  };

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar ref={sidebar}
          onNewProject={handleProjectCreation}
          onProjectSelect={handleProjectSelection}
        />
        <div className="mt-24 text-center w-2/3">
          {loadPageContent()}
        </div>
      </main>
    </>
  );
}

export default App;
