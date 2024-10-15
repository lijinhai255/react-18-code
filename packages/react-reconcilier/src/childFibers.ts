import { ReactElement, ReactElementType } from "../../shared/ReactTypes";
import { FiberNode } from "./fiber";
import { Placement } from "./fiberFlags";
import { HostText } from "./workTags";
import { createFiberFromElement } from "./fiber";
import { REACT_ELEMENT_TYPE } from "../../shared/ReactSymbols";

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
  function placeSingleChild(fiber: FiberNode) {
    if (shouldTrackEffects && fiber.alternate === null) {
      fiber.flags |= Placement;
    }
    return fiber;
  }
  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ): FiberNode | null {
    // 处理对象类型的newChild
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFiber, newChild)
          );
        default:
          if (__DEV__) {
            console.log("为实现的Reconcil类型", newChild);
          }
          break;
      }
      // 如果到这里还没处理,说明是无效的对象
      throw new Error("Invalid child type.");
    }
    // 处理文本节点 (string 或 number)
    if (typeof newChild === "string" || typeof newChild === "number") {
      return placeSingleChild(
        reconcileSingleTextNode(returnFiber, currentFiber, "" + newChild)
      );
    }
    if (__DEV__) {
      console.log("为实现的Reconcil类型", newChild);
    }
    return null;
  };
}

export const reconcileChildrenFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(true);
