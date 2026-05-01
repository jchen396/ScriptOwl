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
        <div className="h-full w-full flex flex-col">
            {/* Transcript text */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-5 bg-black">
                <div className="text-gray-400 text-sm leading-7 tracking-wide">
                    {transcript.replace(/(\r\n|\n|\r)/gm, " ") ? (
                        transcript.split(/\s+/).filter(Boolean).map((word, key) => {
                            return (
                                <span
                                    className={`inline mr-0.5 transition-all duration-150 rounded px-0.5 ${
                                        (currentUser && currentUser.isVerified) ||
                                        !requireUser
                                            ? "hover:text-blue-400 hover:bg-blue-500/10 hover:cursor-pointer"
                                            : ""
                                    }`}
                                    key={key}
                                    onClick={(e) => handleWordSelect(e)}
                                >
                                    {word}{" "}
                                </span>
                            );
                        })
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center py-16 gap-2">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">No transcript available</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons — pinned to bottom */}
            {transcript.replace(/(\r\n|\n|\r)/gm, " ").trim() && (
                <div className="shrink-0 border-t border-gray-800/60 px-4 py-3 bg-black">
                    <p className="text-gray-600 text-[11px] text-center mb-2.5 tracking-wide uppercase font-medium">
                        Click any word to define · or choose an action
                    </p>
                    <div className="flex justify-center items-center gap-2">
                        <button
                            className="px-4 py-2 text-xs font-medium bg-gray-800/50 hover:bg-blue-500/15 border border-gray-700/50 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-200"
                            onClick={() => handleOptionSelect("translate")}
                        >
                            TRANSLATE
                        </button>
                        <button
                            className="px-4 py-2 text-xs font-medium bg-gray-800/50 hover:bg-purple-500/15 border border-gray-700/50 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 rounded-lg transition-all duration-200"
                            onClick={() => handleOptionSelect("summarize")}
                        >
                            SUMMARIZE
                        </button>
                        <button
                            className="px-4 py-2 text-xs font-medium bg-gray-800/50 hover:bg-emerald-500/15 border border-gray-700/50 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 rounded-lg transition-all duration-200"
                            onClick={() => handleOptionSelect("assess")}
                        >
                            ASSESS
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptSection;
