import "tippy.js/dist/tippy.css"
import "../css/tailwind.css"
import { AnalyticsWrapper } from "../components/Analytics"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
