import { useRef } from "react"
import Plyr from "plyr"

export const MediaPlayer = () => {
  const playerRef = useRef(null)
  // See https://github.com/sampotts/plyr for Plyr demo code, features, and functionality
  const player = new Plyr("#player")

  return (
    <div className={"player-container"}>
      <div id={"player"} ref={playerRef}>
        <video
          controls
          // @ts-ignore Plyr property 'crossorigin' does not exist on type 'DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>'
          crossorigin
          playsinline
          poster="/__demo__/View_From_A_Blue_Moon_Trailer-HD.jpg"
        >
          <source
            src="/__demo__/View_From_A_Blue_Moon_Trailer-576p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="576"
          />
          {/**
           * Here are examples of how additional video files might look.
           * GitHub has a maximum file size limit of 100 MB per file, and will refuse git commit pushes that are more than 100 MB in total size.
           * This repository will store reference video at the low 576p resolution.
           *
           * Feel free to download the additional videos for your local project at:
           *  720p  - https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4
           *  1080p - https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4
           */}
          {/* <source
            src="/__demo__/View_From_A_Blue_Moon_Trailer-720p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="720"
          /> */}
          {/* <source
            src="/__demo__/View_From_A_Blue_Moon_Trailer-1080p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="1080"
          /> */}

          {/* Captions */}
          <track
            kind="captions"
            label="English"
            srcLang="en"
            src="/__demo__/captions/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
            default
          />
          <track
            kind="captions"
            label="Français"
            srcLang="fr"
            src="/__demo__/captions/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
          />

          {/* Fallback for browsers that don't support the <video> tag */}
          <a
            href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
            download
          >
            Download
          </a>
        </video>
      </div>
    </div>
  )
}
export default MediaPlayer
