import './App.css'
import { Toaster } from 'sonner';
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Results from "./pages/Results";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import BookingResult from "./pages/BookingResult";

// use Vite-provided base at runtime
const base = import.meta.env.BASE_URL || "/"; //BASE_URL is provided automatically by Vite, based on your base setting in vite.config.ts.

const App = () => (
    <TooltipProvider>
        <Toaster position="bottom-right" richColors />
        <BrowserRouter basename={base}>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/results" element={<Results />} />
                <Route path="/results/:id" element={<Detail />} />
                <Route path="/results/:id/booking" element={<Booking /> } />
                <Route path="/booking-result" element={<BookingResult /> } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </TooltipProvider>
);

export default App
