import { useState } from "react";

export default function Tasks({ initialTasks, onTaskUpdate, ...props }: { initialTasks: string[], onTaskUpdate: any, props?: unknown[] }) {

    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState<string[]>(initialTasks);

    const handleTaskCreation = () => {
        setTasks((prev) => {
            setInputValue(() => "");
            onTaskUpdate([...prev, inputValue]);
            return [...prev, inputValue];
        });
    };

    const handleTaskDelete = (taskIndex: number) => {
        setTasks((prev) => {
            const newTasks: string[] = [];
            for (let i = 0; i < prev.length; i++) {
                if (i === taskIndex)
                    continue;
                newTasks.push(prev[i]!);
            }
            onTaskUpdate(newTasks);
            return newTasks;
        });
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Tasks
            </h2>
            <div className="flex items-center gap-4">
                <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                    onChange={(event) => setInputValue(event.target.value)}
                    value={inputValue} />
                <button onClick={handleTaskCreation} className="text-stone-700 hover:text-stone-950">
                    Add Task
                </button>
            </div>
            {
                tasks ?
                    <ul className="p-4 mt-8 rounded-md bg-stone-100">
                        {
                            tasks.map((task, index) => {
                                return <li key={index} className="flex justify-between my-4">
                                    <span>{task}</span>
                                    <button onClick={() => handleTaskDelete(index)} className="text-stone-700 hover:text-red-500">Clear</button>
                                </li>
                            })
                        }
                    </ul>
                    :
                    <p className="text-stone-800 my-4">
                        This project does not have any tasks yet.
                    </p>
            }
        </section>
    );

}