// package for setting up python script calls
const { spawn } = require("child_process");

export const getVideoData = (filename: string) => {
    return new Promise<string>((resolve, reject) => {
        try {
            let result;
            const scriptPath = `${__dirname}\\..\\uploads\\test.py`;
            const pythonScript = spawn("python", [scriptPath, filename]);
            console.log(scriptPath);
            pythonScript.stdout.on("data", (data) => {
                result = data.toString();
            });
            pythonScript.on("close", () => {
                resolve(result);
                console.log(result);
            });
            pythonScript.on("error", (err) => {
                throw new Error(err.message);
            });
        } catch (e) {
            reject(e);
        }
    });
};
