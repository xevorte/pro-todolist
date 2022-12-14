import * as REACTSTRAP from "reactstrap";
import * as SVG from "@Configs/Svgs";
import { useSelector } from "react-redux";

export default function Alert() {
    const { show, label } = useSelector(state => state);

    return (
        <REACTSTRAP.Alert color="light" className={`${!show && "hidden"} px-4 py-3 shadow-md`}>
            <div className="flex items-center max-w-6xl mx-auto">
                <img src={SVG.IC_INFO} alt="info" />
                <p className="text-basic text-sm font-medium ml-3 leading-none">{label}</p>
            </div>
        </REACTSTRAP.Alert>
    )
}