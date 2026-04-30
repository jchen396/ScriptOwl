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
                <>
                    <h2>
                        What is{" "}
                        <span className="text-white">{wordSelected}</span>?
                    </h2>
                </>
            );
        } else if (service === "translate") {
            return (
                <>
                    <h2>What language would you want to translate to?</h2>
                    <div>
                        <form
                            onSubmit={(e) => onLanguageHandler(e)}
                            className="basis-auto w-full flex flex-row justify-center items-center space-x-2"
                        >
                            <input
                                type="text"
                                id="language"
                                name="language"
                                placeholder=""
                                className="w-full h-auto p-2 bg-transparent border-gray-800 border-b-2"
                                onChange={(e) => {
                                    e.target.value
                                        ? setHasInput(true)
                                        : setHasInput(false);
                                }}
                            />
                            <button
                                className={`border-2 py-2 px-4 rounded-full ${
                                    hasInput
                                        ? "border-blue-700 hover:bg-blue-700 text-white "
                                        : "border-gray-600 text-gray-400 hover:cursor-not-allowed"
                                } `}
                                type="submit"
                                disabled={!hasInput}
                            >
                                Enter
                            </button>
                        </form>
                    </div>
                </>
            );
        } else {
            return <></>;
        }
    };
    return (
        <div className="h-full w-full flex flex-col p-4 gap-4">
            <div className="flex-1 flex justify-center items-start bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden shadow-inner hover:cursor-default relative">
                {chatLoading ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900/80 backdrop-blur-sm z-10">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-4 text-blue-400 font-medium animate-pulse">AI is thinking...</p>
                    </div>
                ) : null}
                
                <div className={`h-full w-full flex flex-col p-6 text-gray-300 break-words overflow-y-auto hide-scrollbar ${chatLoading ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300`}>
                    {getChatQuery()}
                    <div className="flex flex-col space-y-4 mt-2 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-blue-400 [&>h2]:mt-3 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-white [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1 [&>p]:leading-relaxed [&_strong]:text-white [&_strong]:font-semibold">
                        <ReactMarkdown>{chatReply || ""}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AISection;
