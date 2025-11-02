import './App.css'
import { Toaster} from 'sonner';
import { TooltipProvider } from "../src/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "../src/pages/NotFound";
import Results from "../src/pages/Results";
import Detail from "../src/pages/Detail";

const App = () => (
    <TooltipProvider>
        <Toaster position="bottom-right" richColors />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/results" element={<Results />} />
                <Route path="/results/:id" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </TooltipProvider>
);

export default App
