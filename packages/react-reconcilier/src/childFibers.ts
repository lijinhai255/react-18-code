import { ReactElement } from "../../shared/ReactTypes";
import { FiberNode } from "./fiber";
import { Placement } from "./fiberFlags";
import { HostText } from "./workTags";
import { createFiberFromElement } from "./fiber";

function ChildReconciler(shouldTrackEffects: boolean) {
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    element: ReactElement
  ) {
    const fiber = createFiberFromElement(element);
    fiber.return = returnFiber;
    return fiber;
  }
  function reconcileSingleTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    content: String
  ) {
    const fiber = new FiberNode(HostText, { content }, null);
    fiber.return = returnFiber;
    return fiber;
  }
  function placeSigleChild(fiber: FiberNode) {
    if (shouldTrackEffects && fiber.alternate === null) {
      fiber.flag |= Placement;
    }
    return fiber;
  }
}

export const reconcileChildrenFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(true);
