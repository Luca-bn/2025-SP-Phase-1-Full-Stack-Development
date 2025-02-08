import { useRef } from "react";
import Dialog from "./Dialog";
import { ProjectType } from "./Sidebar";

export default function ProjectCreation({ onAction, ...props }: { onAction: (p: ProjectType | undefined) => void, props?: unknown[] }) {

    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const dialog = useRef<{
        open: () => void;
    }>(null);

    const handleCancel = () => {
        onAction(undefined);
    }

    const handleSave = () => {
        if (name.current?.value && description.current?.value && date.current?.value) {
            onAction({
                name: name.current.value,
                description: description.current.value,
                date: date.current.value,
                tasks: []
            });
            return;
        }

        dialog.current?.open();
    }

    return (
        <>
            <Dialog ref={dialog} />
            <div className="w-[35rem]">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={() => handleCancel()} className="text-stone-800 hover:text-stone-950">
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleSave()} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <p className="flex flex-col gap-1 my-4">
                        <label className="text-sm font-bold uppercase text-stone-500 text-left">
                            Title
                        </label>
                        <input ref={name} className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" type="text" />
                    </p>
                    <p className="flex flex-col gap-1 my-4">
                        <label className="text-sm font-bold uppercase text-stone-500 text-left">
                            Description
                        </label>
                        <textarea ref={description} className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
                    </p>
                    <p className="flex flex-col gap-1 my-4">
                        <label className="text-sm font-bold uppercase text-stone-500 text-left">Due Date</label>
                        <input ref={date} className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" type="date" />
                    </p>
                </div>
            </div>
        </>
    );

}