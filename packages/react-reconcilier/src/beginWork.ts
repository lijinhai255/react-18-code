import { ReactElementType } from "../../shared/ReactTypes";
import { FiberNode } from "./fiber";
import { processUpdateQueue, UpdateQueue } from "./updatequeue";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { reconcileChildrenFibers, mountChildFibers } from "./childFibers";
function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizeState;
  const updateQueue = wip.updateQueue as UpdateQueue<Element>;
  const pending = updateQueue.shared.pending;
  updateQueue.shared.pending = null;
  const { memoizedState } = processUpdateQueue(baseState, pending);
  wip.memoizeState = memoizedState;
  const nextChildren = wip.memoizeState;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}
function updateHostComponent(wip: FiberNode) {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
  const current = wip.alternate;
  if (current !== null) {
    wip.child = reconcileChildrenFibers(wip, current?.child, children);
  } else {
    wip.child = mountChildFibers(wip, null, children);
  }
}

export const beginWork = (wip) => {
  console.log(wip, "node-node");
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip);
    case HostComponent:
      return updateHostComponent(wip);
    case HostText:
      return null;
    default:
      if (__DEV__) {
        console.log("beginWork未实现类型");
      }
      break;
  }
};
