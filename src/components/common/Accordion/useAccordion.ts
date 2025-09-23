import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";

export function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordion must be used within an Accordion component");
    }
    return context;
}
