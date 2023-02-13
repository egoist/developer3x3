import "tippy.js/dist/tippy.css"
import "../css/tailwind.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
