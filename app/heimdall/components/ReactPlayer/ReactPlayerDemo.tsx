// See https://github.com/CookPete/react-player for more details on the variety of sources that are supported and uses of this component
//    DEMO    https://cookpete.com/react-player/
//    Source  https://github.com/cookpete/react-player/blob/master/src/demo/App.js
import Player from "react-player"

export const ReactPlayerDemo = () => {
  return (
    <Player
      url="https://www.youtube.com/watch?v=FGy0k8J6ZWE"
      controls
      style={{ margin: "auto" }}
      width="90%"
    />
  )
}
export default ReactPlayerDemo
