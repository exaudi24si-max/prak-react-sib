import { createRoot } from 'react-dom/client';
import './tailwind.css'
import FrameworklistSerachFilter from './FrameworklistSearchFilter';
import FrameworkList from './FrameworkList';



createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/> */}
            <FrameworklistSerachFilter/>
        </div>

    )