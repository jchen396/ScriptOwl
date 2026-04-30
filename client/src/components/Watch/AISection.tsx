import { getTranscriptServices } from "@/functions/openai_function/getReply";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
    wordSelected: string | null;
    chatReply: string | null;
    setChatReply: React.Dispatch<React.SetStateAction<string | null>>;
    chatLoading: boolean;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
    service: string;
    transcript: string;
}
const AISection: React.FC<Props> = ({
    wordSelected,
    chatReply,
    setChatReply,
    chatLoading,
    setChatLoading,
    service,
    transcript,
}) => {
    const [hasInput, setHasInput] = useState<boolean>(false);
    const onLanguageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChatLoading(true);
        const reply = await getTranscriptServices(
            transcript.replace(/(\r\n|\n|\r)/gm, ""),
            service,
            e.currentTarget.language.value,
        );
        setChatReply(reply);
        setChatLoading(false);
    };
    const getChatQuery = () => {
        if (service === "define") {
            return (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                    <span className="text-blue-400 text-sm">🔍</span>
                    <p className="text-sm text-gray-300">
                        What is <span className="text-white font-medium">{wordSelected}</span>?
                    </p>
                </div>
            );
        } else if (service === "translate") {
            return (
                <div className="mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-3">
                        <span className="text-blue-400 text-sm">🌐</span>
                        <p className="text-sm text-gray-300">Translate to which language?</p>
                    </div>
                    <form
                        onSubmit={(e) => onLanguageHandler(e)}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            id="language"
                            name="language"
                            placeholder="e.g. Spanish, French, Japanese..."
                            className="flex-1 px-4 py-2.5 text-sm text-white placeholder-gray-600 bg-gray-800/40 border border-gray-700/40 rounded-lg outline-none focus:border-blue-500/50 focus:bg-gray-800/60 transition-all duration-200"
                            onChange={(e) => {
                                e.target.value
                                    ? setHasInput(true)
                                    : setHasInput(false);
                            }}
                        />
                        <button
                            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                hasInput
                                    ? "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-gray-800/40 text-gray-600 cursor-not-allowed"
                            }`}
                            type="submit"
                            disabled={!hasInput}
                        >
                            Translate
                        </button>
                    </form>
                </div>
            );
        } else {
            return <></>;
        }
    };
    return (
        <div className="h-full w-full flex flex-col relative">
            {/* Loading overlay */}
            {chatLoading && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-950/80 backdrop-blur-sm z-10">
                    <div className="relative w-12 h-12 mb-3">
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                    </div>
                    <p className="text-blue-400/80 text-xs font-medium tracking-wide uppercase animate-pulse">
                        AI is thinking...
                    </p>
                </div>
            )}

            {/* Content */}
            <div className={`flex-1 p-5 transition-opacity duration-300 ${chatLoading ? "opacity-20" : "opacity-100"} bg-black overflow-y-scroll`}>
                {getChatQuery()}
                <div className="prose-sm text-gray-300 leading-relaxed [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-5 [&>h1]:mb-2 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-blue-400 [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-white [&>h3]:mt-3 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:my-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol]:my-2 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:my-1.5 [&_strong]:text-white [&_strong]:font-semibold [&_li]:text-sm [&_li]:text-gray-400 ">
                    <ReactMarkdown>{chatReply || ""}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default AISection;
