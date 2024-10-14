import { createContainer, updateContainer } from "./src/fiberReconcilier";

export interface Reconciler {
  createContainer: typeof createContainer;
  updateContainer: typeof updateContainer;
}

export default {
  createContainer,
  updateContainer,
} as Reconciler;
