import { createContext } from "react";
import type { AccordionContextType } from "./Accordion";

export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);
