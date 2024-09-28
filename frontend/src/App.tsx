// import { BackgroundBeamsWithCollisionDemo } from "./components/landing/Bg"
// import EndEvent from "./components/landing/EndEvent"
// import OrderBook from "./components/landing/Orderbook"
// import PortfolioPage from "./components/landing/PortfolioPage"
// import { ThemeProvider } from "./components/theme-provider"
// import {BrowserRouter, Route, Routes} from "react-router-dom"

// export default function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={ <BackgroundBeamsWithCollisionDemo/>}/>
//         <Route path="/event/india-will-win-match" element={<OrderBook/>}/>
//         <Route path="/event/end" element={<EndEvent/>}/>
//         <Route path="/portfolio" element={<PortfolioPage/>}/>
//       </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   )
// }


import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import EventOverview from "./pages/EventOverview"
import PortfolioPage from "./pages/PortfolioPage"

export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/event" element={<EventOverview/>}/>
        <Route path="/portfolio" element={<PortfolioPage/>}/>
      </Routes>
      </BrowserRouter>
  )
}
