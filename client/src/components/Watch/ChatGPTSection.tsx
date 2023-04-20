import { getTranscriptServices } from "@/functions/openai_function/getReply";
import React, { useState } from "react";

interface Props {
    wordSelected: string | null;
    chatReply: string | null;
    setChatReply: React.Dispatch<React.SetStateAction<string | null>>;
    chatLoading: boolean;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
    service: string;
    transcript: string;
}
const ChatGPTSection: React.FC<Props> = ({
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
            e.currentTarget.language.value
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
        <div className="h-4/5 w-full flex flex-col space-y-4">
            <div className="basis-4/5 text-gray-600 flex justify-center items-center border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4 hover:cursor-default ">
                {chatLoading ? (
                    <div className="w-full flex flex-row justify-center items-center space-x-4">
                        <div role="status">
                            <div
                                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col space-y-4 p-4 text-gray-400 break-words overflow-y-auto">
                        {getChatQuery()}
                        {service === "assess" ? (
                            <p className="whitespace-pre-line">{chatReply}</p>
                        ) : (
                            <p>{chatReply}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatGPTSection;
