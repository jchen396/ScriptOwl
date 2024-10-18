from pytube import YouTube#

print("working")
url = "https://www.youtube.com/"

try:
   video = YouTube(url)
   stream = video.streams.filter(only_audio=True).first()
   stream.download(filename=f"{video.title}.mp3")
   print("The video is downloaded in MP3")
except KeyError:
   print("Unable to fetch video information. Please check the video URL or your network connection.")