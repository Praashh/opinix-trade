import EndEvent from "./components/landing/EndEvent"
import Home from "./components/landing/Home"
import { ThemeProvider } from "./components/theme-provider"
import {BrowserRouter, Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/event/end" element={<EndEvent/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
