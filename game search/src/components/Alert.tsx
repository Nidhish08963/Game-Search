import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    color?: string;
}

function Alert({children, color = "secondary"}:Props) {
    return (
    <div 
    className={`alert alert-${color}`} 
    role="alert">
    {children}
    </div>
    );
}
export default Alert