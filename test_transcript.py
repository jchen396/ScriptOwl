from youtube_transcript_api import YouTubeTranscriptApi

try:
    print("Testing get_transcript...")
    t = YouTubeTranscriptApi.get_transcript("M7lc1UVf-VE")
    print("get_transcript succeeded, length:", len(t))
except Exception as e:
    print("Error with get_transcript:", e)

try:
    print("Testing fetch...")
    api = YouTubeTranscriptApi()
    t2 = api.fetch("M7lc1UVf-VE")
    print("fetch succeeded, length:", len(t2))
except Exception as e:
    print("Error with fetch:", e)
