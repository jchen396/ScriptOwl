import os
import sys
import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence
import cv2
import json

sys.path.append("modules")

r = sr.Recognizer()


def get_video_thumbnail(video_path, thumbnail_path):
    # Load the video using cv2.VideoCapture
    cap = cv2.VideoCapture(video_path)

    # Set the frame position to 0 seconds
    cap.set(cv2.CAP_PROP_POS_MSEC, 0)

    # Read the next frame and save it as a thumbnail image
    ret, frame = cap.read()
    cv2.imwrite(thumbnail_path, frame)

    # Release the video capture object
    cap.release()


def get_video_length(filename):
    video = cv2.VideoCapture(filename)

    # calculate the video duration and amount of frames
    fps = video.get(cv2.CAP_PROP_FPS)
    frame_count = video.get(cv2.CAP_PROP_FRAME_COUNT)

    # Calculate duration in seconds
    duration = int(frame_count / fps)
    return duration


def get_large_audio_transcription(path):
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    # open the audio file using pydub
    sound = AudioSegment.from_wav(path)
    # split audio sound where silence is 700 miliseconds or more and get chunks
    chunks = split_on_silence(sound,
                              # experiment with this value for your target audio file
                              min_silence_len=500,
                              # adjust this per requirement
                              silence_thresh=sound.dBFS-14,
                              # keep the silence for 1 second, adjustable as well
                              keep_silence=500,
                              )
    folder_name = "audio-chunks"
    # create a directory to store the audio chunks
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    whole_text = ""
    # process each chunk
    for i, audio_chunk in enumerate(chunks, start=1):
        # export audio chunk and save it in
        # the `folder_name` directory.
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        # recognize the chunk
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            # try converting it to text
            try:
                text = r.recognize_google(audio_listened)
            except Exception as e:
                print(e)
            else:
                text = f"{text.capitalize()}. "
                whole_text += text
        os.remove(f"{folder_name}/chunk{i}.wav")
    # return the text for all chunks detected
    return whole_text


def main(argv):
    print("starting file")
    file_name = sys.argv[1]
    os.chdir("./src/uploads")
    # Load the video file
    video = AudioSegment.from_file(
        f"{file_name}.mp4", format="mp4")
    print("using video data...")
    audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
    audio.export(f"{file_name}.wav", format="wav")
    # Initialize recognizer class (for recognizing the speech)
    text = get_large_audio_transcription(f"{file_name}.wav")
    duration = get_video_length(f"{file_name}.mp4")

    # Set a thumbnail snapshot at 0 seconds mark
    get_video_thumbnail(f"{file_name}.mp4", f"{file_name}.jpg")
    os.remove(f"{file_name}.wav")
    result = {
        "text": text,
        "duration": duration
    }
    print(json.dumps(result))


if __name__ == "__main__":
    main(sys.argv[1:])
