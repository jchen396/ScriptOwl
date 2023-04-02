import os
import sys
import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence
sys.path.append("modules")

r = sr.Recognizer()


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
    try:
        file_name = sys.argv[1].split(".")[0]
        os.chdir("./src/uploads")
        # Load the video file
        video = AudioSegment.from_file(
            f"{file_name}.mp4", format="mp4")
        audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
        audio.export(f"{file_name}.wav", format="wav")
        # Initialize recognizer class (for recognizing the speech)
        text = get_large_audio_transcription(f"{file_name}.wav")
        os.remove(f"{file_name}.wav")
        print(text)

    except:
        print("Error occured...")
        sys.exit(2)


if __name__ == "__main__":
    main(sys.argv[1:])
