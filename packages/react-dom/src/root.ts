import { ReactElementType } from "../../shared/ReactTypes";
import {
  createContainer,
  updateContainer,
} from "../../react-reconcilier/src/fiberReconcilier";
import { Container } from "./hostConfig";

export function createRoot(container: Container) {
  const root = createContainer(container);
  return {
    render(element: ReactElementType) {
      updateContainer(element, root);
    },
  };
}
