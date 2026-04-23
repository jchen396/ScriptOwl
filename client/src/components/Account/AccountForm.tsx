import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IUser } from "./../../../../types/types";
import { ParsedUrlQuery } from "querystring";

interface Props {
    currentUser: IUser;
    changePassword?: boolean;
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
    changeUsername?: boolean;
    setChangeUsername: React.Dispatch<React.SetStateAction<boolean>>;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    setNewUsername: React.Dispatch<React.SetStateAction<string>>;
    confirmNewPassword: string;
    setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AccountForm: React.FunctionComponent<Props> = ({
    currentUser,
    changePassword,
    setChangePassword,
    changeUsername,
    setChangeUsername,
    setNewPassword,
    setNewUsername,
    setConfirmNewPassword,
}) => {
    return (
        <>
            <div className="basis-1/2">
                {changePassword ? (
                    <form
                        className="flex flex-col space-y-4 items-center"
                        action="submit"
                    >
                        <button
                            className="self-start p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur border border-gray-700 text-white transition-all hover:-translate-y-0.5"
                            onClick={() => setChangePassword(false)}
                        >
                            <ArrowBackIcon />
                        </button>
                        <label className="text-white" htmlFor="username">
                            Password
                        </label>
                        <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Type in new password..."
                            type="password"
                            className="mb-6 bg-gray-900/50 border border-gray-600 text-white text-sm rounded-xl focus:ring-cyan-400 focus:border-cyan-400 block w-1/2 p-3 transition-colors appearance-none"
                        ></input>
                        <label className="text-white" htmlFor="username">
                            Confirm Password
                        </label>
                        <input
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            type="password"
                            placeholder="Re-enter new password..."
                            className="mb-6 bg-gray-900/50 border border-gray-600 text-white text-sm rounded-xl focus:ring-cyan-400 focus:border-cyan-400 block w-1/2 p-3 transition-colors appearance-none"
                        ></input>
                    </form>
                ) : (
                    <div className="flex w-full items-center justify-center flex-col ">
                        {changeUsername ? (
                            <form
                                action=""
                                className="w-full flex flex-col space-y-4 space-x-2 justify-center items-center"
                            >
                                <label
                                    className="text-white"
                                    htmlFor="newUsername"
                                >
                                    New Username
                                </label>
                                <div className="flex w-full justify-center items-center">
                                    <button
                                        onClick={() => setChangeUsername(false)}
                                        className="flex flex-row items-center p-3 mr-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur border border-gray-700 text-white transition-all hover:-translate-y-0.5"
                                    >
                                        <ArrowBackIcon />
                                    </button>
                                    <input
                                        onChange={(e) =>
                                            setNewUsername(
                                                e.currentTarget.value
                                            )
                                        }
                                        type="text"
                                        id="disabled-input"
                                        aria-label="disabled input"
                                        className="bg-gray-900/50 border border-gray-600 text-white text-sm rounded-xl focus:ring-cyan-400 focus:border-cyan-400 block w-1/2 p-3 transition-colors appearance-none"
                                    ></input>
                                    <button className="flex flex-row items-center p-3 ml-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                onClick={() => setChangeUsername(true)}
                                className="flex flex-row justify-center w-1/2 items-center p-3 m-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5"
                            >
                                <span className="px-2">Change Username</span>
                                <ArrowForwardIcon />
                            </button>
                        )}
                        <form
                            className="flex flex-col w-full space-y-4 items-center"
                            action=""
                        >
                            <label className="text-white" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="disabled-input"
                                aria-label="disabled input"
                                className="mb-6 bg-gray-900/30 border border-gray-700 text-gray-400 text-sm rounded-xl block w-1/2 p-3 cursor-not-allowed"
                                value={`${currentUser.username}`}
                                disabled
                            ></input>
                            <label className="text-white" htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="text"
                                id="disabled-input"
                                aria-label="disabled input"
                                className="mb-6 bg-gray-900/30 border border-gray-700 text-gray-400 text-sm rounded-xl block w-1/2 p-3 cursor-not-allowed"
                                value={`${currentUser.email}`}
                                disabled
                            ></input>
                            <button
                                className="flex flex-row justify-center w-1/2 items-center p-3 m-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5"
                                onClick={() => setChangePassword(true)}
                            >
                                <span className="px-2">Change password</span>
                                <ArrowForwardIcon />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountForm;
