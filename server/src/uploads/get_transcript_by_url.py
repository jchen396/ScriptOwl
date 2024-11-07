from youtube_transcript_api import YouTubeTranscriptApi
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')


def extract_video_id(url):
    # Regular expression to match YouTube video ID
    regex = r'(?:https?://)?(?:www\.)?(?:youtube\.com/(?:[^/]+/.*|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\.be/)([^&\n]{11})'
    
    match = re.search(regex, url)
    if match:
        return match.group(1)
    return None

# Example usage
def main(argv):
    url = sys.argv[1] 
    video_id = extract_video_id(url)

    try:
        # Fetch the transcript
        transcript = YouTubeTranscriptApi.get_transcript(video_id)


        # Print the transcript
        for entry in transcript:
            print(f"{entry['text']}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main(sys.argv[1:])
