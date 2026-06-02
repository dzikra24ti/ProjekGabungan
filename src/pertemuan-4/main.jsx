import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TailwindCSS from "./TailwindCSS";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <TailwindCSS/> */}
            {/* <UserForm/> */}
            <HitungGajiForm/>
        </div>
    )