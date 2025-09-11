import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useHomeButton() {
    const navigate = useNavigate();
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "/") {
            navigate("/")
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    })
}
