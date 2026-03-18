import yt_dlp
import sys
import os
import io
import json
import extract_video_data

def main():
    try:
        url = sys.argv[1]
        title= sys.argv[2]
        script_dir = os.path.dirname(os.path.abspath(__file__))
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': os.path.join(script_dir, f'{title}.%(ext)s'),
            'merge_output_format': 'mp4',
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',
            }],
            'postprocessor_args': ['-c:a', 'aac', '-c:v', 'copy'],
            'extractor_args': {'youtube': {'js_runtimes': ['nodejs:C:\\Program Files\\nodejs\\node.exe']}},
        }
        

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            sys.argv = ["extract_video_data.py", title]
            captured = io.StringIO()
            sys.stdout = captured
            
            extract_video_data.main(sys.argv[1:])
            
            # Restore stdout
            sys.stdout = sys.__stdout__
            
            # Parse the captured output
            result = json.loads(captured.getvalue())
            print(json.dumps(result))  # now you can use result however you want
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(2)

if __name__ == "__main__":
    print("running")
    main()