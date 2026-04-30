import yt_dlp
import sys
import json
import os
import re
import time
import shutil

sys.stdout.reconfigure(encoding='utf-8')

MAX_RETRIES = 3
RETRY_DELAY = 3  # seconds


def extract_video_id(url):
    regex = r'(?:https?://)?(?:www\.)?(?:youtube\.com/(?:[^/]+/.*|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\.be/)([^&\n]{11})'
    match = re.search(regex, url)
    if match:
        return match.group(1)
    return None


def find_node_path():
    """Find the node binary path for yt-dlp JS runtime."""
    node_path = shutil.which('node')
    return node_path


def get_transcript(url):
    video_id = extract_video_id(url)
    if not video_id:
        print("Error: Invalid YouTube URL", file=sys.stderr)
        sys.exit(1)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    sub_file = os.path.join(script_dir, f'_sub_{video_id}')

    # Find node binary for JS runtime
    node_path = find_node_path()
    js_runtime = f'nodejs:{node_path}' if node_path else 'nodejs'

    ydl_opts = {
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': ['en', 'en-orig'],
        'subtitlesformat': 'json3',
        'skip_download': True,
        'outtmpl': sub_file,
        'quiet': True,
        'no_warnings': True,
        'noprogress': True,
        'socket_timeout': 30,
        'extractor_args': {'youtube': {'js_runtimes': [js_runtime]}},
        'logger': type('Logger', (), {
            'debug': lambda self, msg: print(msg, file=sys.stderr),
            'warning': lambda self, msg: print(msg, file=sys.stderr),
            'error': lambda self, msg: print(msg, file=sys.stderr),
        })(),
    }

    last_error = None
    for attempt in range(MAX_RETRIES):
        try:
            # Clean up any leftover files from previous attempts
            cleanup_files(script_dir, video_id)

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])

            # Look for the downloaded subtitle file
            found_file = find_subtitle_file(script_dir, sub_file, video_id)

            if not found_file:
                print("Error: No English subtitles found for this video", file=sys.stderr)
                sys.exit(1)

            with open(found_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            os.remove(found_file)

            # Extract and print transcript text
            for event in data.get('events', []):
                segs = event.get('segs', [])
                text = ''.join(seg.get('utf8', '') for seg in segs).strip()
                if text and text != '\n':
                    print(text)

            return  # Success

        except Exception as e:
            last_error = e
            cleanup_files(script_dir, video_id)
            error_str = str(e)

            # Retry on rate limiting / bot detection
            if '429' in error_str or 'Too Many Requests' in error_str or 'Sign in to confirm' in error_str:
                if attempt < MAX_RETRIES - 1:
                    wait = RETRY_DELAY * (attempt + 1)
                    print(f"Rate limited, retrying in {wait}s (attempt {attempt + 2}/{MAX_RETRIES})...", file=sys.stderr)
                    time.sleep(wait)
                    continue

            # Non-retryable error
            break

    print(f"An error occurred: {last_error}", file=sys.stderr)
    sys.exit(1)


def find_subtitle_file(script_dir, sub_file, video_id):
    """Find the subtitle file created by yt-dlp."""
    possible_suffixes = ['.en.json3', '.en-orig.json3']
    for suffix in possible_suffixes:
        filepath = sub_file + suffix
        if os.path.exists(filepath):
            return filepath

    # Fallback: check for any json3 file matching the video ID
    for f in os.listdir(script_dir):
        if f.startswith(f'_sub_{video_id}') and f.endswith('.json3'):
            return os.path.join(script_dir, f)

    return None


def cleanup_files(script_dir, video_id):
    """Remove any leftover subtitle files."""
    for f in os.listdir(script_dir):
        if f.startswith(f'_sub_{video_id}') and f.endswith('.json3'):
            try:
                os.remove(os.path.join(script_dir, f))
            except OSError:
                pass


if __name__ == "__main__":
    url = sys.argv[1]
    get_transcript(url)
