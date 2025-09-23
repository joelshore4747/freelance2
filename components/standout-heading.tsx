interface StandoutHeadingProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function StandoutHeading({ children, className = "", as: Component = "h2" }: StandoutHeadingProps) {
  const words = children.split(" ")
  const lastWord = words.pop()
  const restOfText = words.join(" ")

  return (
    <Component className={className}>
      {restOfText && <span>{restOfText} </span>}
      <span className="text-standout">{lastWord}</span>
    </Component>
  )
}
