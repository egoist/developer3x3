import "tippy.js/dist/tippy.css"
import "../css/tailwind.css"
import { AnalyticsWrapper } from "../components/Analytics"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NODE_ENV === "production" && <AnalyticsWrapper />}
      </body>
    </html>
  )
}
