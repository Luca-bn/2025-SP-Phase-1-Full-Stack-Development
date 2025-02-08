import { ProjectType } from "./Sidebar";
import Tasks from "./Tasks";

export default function Project({ project, onDelete, ...props }: { project: ProjectType, onDelete: () => void, props?: unknown[] }) {

    const handleTaskUpdate = (tasks: string[]) => {
        project.tasks = tasks;
    }

    return (
        <div className="w-[35rem] text-left">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">
                        {project.name}
                    </h1>
                    <button onClick={onDelete} className="text-stone-600 hover:text-stone-950">
                        Delete
                    </button>
                </div>
                <p className="mb-4 text-stone-400">
                    {project.date}
                </p>
                <p className="text-stone-600 whitespace-pre-wrap">
                    {project.description}
                </p>
            </header>
            <Tasks initialTasks={project.tasks} onTaskUpdate={handleTaskUpdate} />
        </div>
    );

}