import yt_dlp
import sys
import json
import os
import re

sys.stdout.reconfigure(encoding='utf-8')


def extract_video_id(url):
    regex = r'(?:https?://)?(?:www\.)?(?:youtube\.com/(?:[^/]+/.*|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\.be/)([^&\n]{11})'
    match = re.search(regex, url)
    if match:
        return match.group(1)
    return None


def get_transcript(url):
    video_id = extract_video_id(url)
    if not video_id:
        print("Error: Invalid YouTube URL", file=sys.stderr)
        sys.exit(1)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    sub_file = os.path.join(script_dir, f'_sub_{video_id}')

    ydl_opts = {
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': ['en', 'en-orig'],
        'subtitlesformat': 'json3',
        'skip_download': True,
        'outtmpl': sub_file,
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'youtube': {'js_runtimes': ['nodejs:node']}},
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Look for the downloaded subtitle file (yt-dlp names them with lang code)
        possible_suffixes = ['.en.json3', '.en-orig.json3']
        found_file = None
        for suffix in possible_suffixes:
            filepath = sub_file + suffix
            if os.path.exists(filepath):
                found_file = filepath
                break

        if not found_file:
            # Check for any json3 file that was created
            for f in os.listdir(script_dir):
                if f.startswith(f'_sub_{video_id}') and f.endswith('.json3'):
                    found_file = os.path.join(script_dir, f)
                    break

        if not found_file:
            print("Error: No English subtitles found for this video", file=sys.stderr)
            sys.exit(1)

        with open(found_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Clean up the temp file
        os.remove(found_file)

        # Extract text from json3 format
        for event in data.get('events', []):
            segs = event.get('segs', [])
            text = ''.join(seg.get('utf8', '') for seg in segs).strip()
            if text and text != '\n':
                print(text)

    except Exception as e:
        # Clean up any leftover files on error
        for f in os.listdir(script_dir):
            if f.startswith(f'_sub_{video_id}') and f.endswith('.json3'):
                os.remove(os.path.join(script_dir, f))
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    url = sys.argv[1]
    get_transcript(url)
