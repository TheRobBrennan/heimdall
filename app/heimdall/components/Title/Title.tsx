import { FC } from "react"

// Material UI
import { Typography } from "@material-ui/core"

export interface ITitleProps {
  children?: string
}

const Title: FC<ITitleProps> = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  )
}
export default Title
