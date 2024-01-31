interface LinkProps {
  href: string
  text: string,
  tabIndex: number
}
const Link: React.FC<LinkProps> = ({ href, text, tabIndex }) => {
  return (

    <a
      className="text-blue-500"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
    >
      {text}
    </a>
  )
}

export default Link