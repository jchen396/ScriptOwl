import axios from "axios";

export async function postYoutube(youtubeURL: string, title: string) {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}youtube`,
        {
            youtubeURL,
            title,
            downloadVideo: true,
        },
    );
    return res.data;
}
