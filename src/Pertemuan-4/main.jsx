import { createRoot } from 'react-dom/client';
import './tailwind.css'
import FrameworklistSerachFilter from './FrameworklistSearchFilter';
import FrameworkList from './FrameworkList';
import { ResponsiveText } from './ResponsiveDesign';



createRoot(document.getElementById("root"))
    .render(
        <div>
            <FrameworkList/>
            <FrameworklistSerachFilter/>
            <ResponsiveText/>
        </div>

    )