import {
    getDefinition,
    getTranscriptServices,
} from "@/functions/openai_function/getReply";
import React from "react";
import { IUser } from "../../../../types/types";
import { useRouter } from "next/router";

interface Props {
    transcript: string;
    setWordSelected: React.Dispatch<React.SetStateAction<string | null>>;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    setChatReply: React.Dispatch<React.SetStateAction<string | null>>;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setService: React.Dispatch<React.SetStateAction<string>>;
    currentUser: IUser | null;
    requireUser: boolean;
}

const TranscriptSection: React.FC<Props> = ({
    transcript,
    setWordSelected,
    setSection,
    setChatReply,
    setChatLoading,
    setService,
    currentUser,
    requireUser,
}) => {
    const router = useRouter();
    const handleWordSelect = async (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    ) => {
        if (requireUser && (!currentUser || !currentUser.isVerified)) {
            return;
        }
        setChatLoading(true);
        let highlightedWord = e.currentTarget.textContent?.trim();
        if (highlightedWord) {
            // Remove period if an ending word is selected
            if (
                highlightedWord &&
                highlightedWord[highlightedWord.length - 1] === "."
            ) {
                highlightedWord = highlightedWord.slice(
                    0,
                    highlightedWord.length - 1,
                );
            }
            setWordSelected(highlightedWord);
            setService("define");
            setSection("AI");
            const reply = await getDefinition(highlightedWord);
            setChatReply(reply);
            setChatLoading(false);
        }
    };
    const handleOptionSelect = async (option: string) => {
        let reply;
        setChatLoading(true);
        setService(option);
        setSection("AI");
        if (option === "summarize" || option === "assess") {
            reply = await getTranscriptServices(
                transcript.replace(/(\r\n|\n|\r)/gm, ""),
                option,
            );
            setChatReply(reply);
        }
        setChatLoading(false);
    };
    return (
        <div className="h-full w-full flex flex-col p-4 gap-4">
            <div className="flex-1 text-gray-400 flex flex-wrap bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-y-auto hide-scrollbar p-6 shadow-inner text-lg leading-relaxed">
                {transcript.replace(/(\r\n|\n|\r)/gm, "") ? (
                    transcript.split(" ").map((word, key) => {
                        return (
                            <span
                                className={`inline-block mr-1 mb-1 transition-colors duration-200 ${
                                    (currentUser && currentUser.isVerified) ||
                                    !requireUser
                                        ? "hover:text-blue-400 hover:cursor-pointer"
                                        : ""
                                }`}
                                key={key}
                                onClick={(e) => handleWordSelect(e)}
                            >
                                {word}
                            </span>
                        );
                    })
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-gray-500">
                        <p>No transcript available</p>
                    </div>
                )}
            </div>
            {transcript.replace(/(\r\n|\n|\r)/gm, "") && (
                <div className="flex flex-col items-center gap-3 mt-2 shrink-0">
                    <p className="text-gray-400 text-sm font-medium">
                        Click on any word to search with AI, or choose an action below:
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <button
                            className="px-6 py-2.5 bg-gray-800/80 hover:bg-blue-600/20 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                            onClick={() => handleOptionSelect("translate")}
                        >
                            Translate
                        </button>
                        <button
                            className="px-6 py-2.5 bg-gray-800/80 hover:bg-purple-600/20 border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                            onClick={() => handleOptionSelect("summarize")}
                        >
                            Summarize
                        </button>
                        <button
                            className="px-6 py-2.5 bg-gray-800/80 hover:bg-emerald-600/20 border border-gray-600 hover:border-emerald-500 text-gray-300 hover:text-emerald-400 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                            onClick={() => handleOptionSelect("assess")}
                        >
                            Assess
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptSection;
