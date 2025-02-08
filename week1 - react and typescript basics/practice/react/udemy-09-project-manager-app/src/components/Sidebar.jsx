import { useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const MOCKED_PROJECTS = [
    {id: 0, name: "nome1", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 1, name: "nome2", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 2, name: "nome3", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 3, name: "nome4", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 4, name: "nome5", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 5, name: "nome6", description: "descrizione", date: "2024-12-06", tasks: []},
    {id: 6, name: "nome7", description: "descrizione", date: "2024-12-06", tasks: []},
];

const Sidebar = forwardRef(({ onNewProject, onProjectSelect, ...props}, ref) => {

    const [projects, setProjects] = useState(MOCKED_PROJECTS);
    const [selectedProjectId, setSelectedProjectId] = useState();

    useImperativeHandle(ref, () => {
        return {
            saveProject: (project) => {
                setProjects((prev) => {
                    return [...prev, project].map((project, index) => {
                        return {...project, id: index};
                    });
                })
            },

            deleteProject: (toDelete) => {
                setProjects((prev) => {
                    return prev
                        .filter(project => project.id !== toDelete.id)
                        .map((project, index) => {
                            return {...project, id: index}
                        });
                });
                setSelectedProjectId(null);
            },

            deselectProject: () => {
                setSelectedProjectId(null);
            }
        }
    });

    return (
        <>
            <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
                <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">PROJECTS</h2>
                <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
                        onClick={onNewProject}
                >+ Add Project</button>
                <ul className="mt-8">
                    {
                        projects.map((project, index) => {
                            return <li key={index}>
                                    <button className={
                                        project.id === selectedProjectId ?
                                        "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800 text-stone-400 "
                                        :
                                        "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400 "
                                    }
                                            onClick={() => {
                                                setSelectedProjectId(project.id);
                                                onProjectSelect(project)
                                            }}>
                                        {project.name}
                                    </button>
                                </li>
                        })
                    }
                </ul>
            </aside>
        </>
    );

});

export default Sidebar;