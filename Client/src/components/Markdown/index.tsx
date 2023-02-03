import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown-light.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default ({ text }: { text: string }) => {
  return (
    <article className="prose lg:prose-xl">
      <div className="markdown-body">
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={theme}
                customStyle={{ background: 'transparent', padding: '0', margin: 0, fontSize: '1em' }}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code className={className + " text-black/50"} {...props}>
                {children}
              </code>
            )
          },
          table({ children }) {
            return (
              <table style={{ width: '100%', margin: "0px" }}>
                {children}
              </table>
            )
          }
        }} />
      </div>
    </article>
  )
}