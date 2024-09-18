from pytube import YouTube 
import sys
import os 

def main(argv):
    try:
        # url input from user 
        yt = sys.argv[1]
        # extract only audio 
        video = yt.streams.filter(only_audio=True).first() 
        
        # check for destination to save file 
        destination = '.'
        
        # download the file 
        out_file = video.download(output_path=destination) 
        
        # save the file 
        base, ext = os.path.splitext(out_file) 
        new_file = base + '.mp3'
        os.rename(out_file, new_file) 
        
        # result of success 
        print(yt.title + " has been successfully downloaded.")
    except:
        print("An error has occured.")
        sys.exit(2)


if __name__ == "__main__":
    print("running")
    main(sys.argv[1:])

  