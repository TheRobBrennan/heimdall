import { useRef } from "react"
import Plyr from "plyr"

export const MediaPlayer = () => {
  const playerRef = useRef(null)
  const player = new Plyr("#player")

  return (
    <div className={"player-container"}>
      <div id={"player"} ref={playerRef}>
        <video
          controls
          // @ts-ignore Plyr property 'crossorigin' does not exist on type 'DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>'
          crossorigin
          // playsinline
          poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        >
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="576"
          />
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="720"
          />
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
            type="video/mp4"
            // @ts-ignore Plyr property 'size' does not exist on type 'DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>'
            size="1080"
          />

          {/* Captions */}
          {/* <track
            kind="captions"
            label="English"
            srcLang="en"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
            default
          />
          <track
            kind="captions"
            label="Français"
            srcLang="fr"
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
          /> */}

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
