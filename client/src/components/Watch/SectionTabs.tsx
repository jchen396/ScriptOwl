import React from "react";
import { IPost } from "../../../../types/types";

interface Props {
    post: IPost | null;
    section: string;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    service: string;
    requireUser: boolean;
}

const SectionTabs: React.FC<Props> = ({
    post,
    section,
    setSection,
    service,
    requireUser,
}) => {
    const tabs = [
        ...(requireUser
            ? [
                  {
                      id: "comment",
                      label: `${post?.comments.length ?? 0} Comments`,
                  },
              ]
            : []),
        { id: "transcript", label: "Transcript" },
        ...(service ? [{ id: "AI", label: "AI" }] : []),
    ];

    return (
        <div className="flex items-center w-full border-b border-gray-800/60 bg-gray-900/60 backdrop-blur-sm px-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`relative px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        section === tab.id
                            ? "text-blue-400"
                            : "text-gray-500 hover:text-gray-300"
                    }`}
                    onClick={() => setSection(tab.id)}
                >
                    {tab.label}
                    {/* Active indicator */}
                    {section === tab.id && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-400 rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default SectionTabs;
