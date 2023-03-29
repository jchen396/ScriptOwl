import sys
import speech_recognition as sr
from pydub import AudioSegment

#file_name = sys.argv[1]
file_name = "videoplayback"
print(f"loading file {file_name}...")
# Load the video file
video = AudioSegment.from_file("videoplayback.mp4", format="mp4")
audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
audio.export("videoplayback.wav", format="wav")
# Initialize recognizer class (for recognizing the speech)
r = sr.Recognizer()

# Open the audio file
with sr.AudioFile("videoplayback.wav") as source:
    audio_text = r.record(source)
# Recognize the speech in the audio
text = r.recognize_google(audio_text, language='en-US')
print(text)
