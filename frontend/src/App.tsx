import { BackgroundBeamsWithCollisionDemo } from "./components/landing/Bg"
import EndEvent from "./components/landing/EndEvent"
import OrderBook from "./components/landing/Orderbook"
import { ThemeProvider } from "./components/theme-provider"
import {BrowserRouter, Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <BackgroundBeamsWithCollisionDemo/>}/>
        <Route path="/event/india-will-win-match" element={<OrderBook/>}/>
        <Route path="/event/end" element={<EndEvent/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
