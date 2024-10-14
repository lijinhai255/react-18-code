import { Props, Key, Ref } from "../shared/ReactTypes";
import { FunctionComponent, HostComponent, WorkTag } from "./workTags";
import { Flags, NoFlags } from "./fiberFlags";
import { Container } from "./hostConfig";
import { ReactElement } from "../../shared/ReactTypes";

export class FiberNode {
  type: any;
  tag: WorkTag;
  pendingProps: Props;
  key: Key;
  stateNode: any;
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;
  memoizedProps: Props | null;
  // 更新完的状态
  memoizeState: any;
  alternate: FiberNode | null;
  flags: Flags;
  subtreeFlags: Flags;
  // 更新队列
  updateQueue: unknown;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    // HostComponent <div> div DOM
    this.stateNode = null;
    // FunctionComponent (() => {})
    this.type = null;

    // Structure relationship
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.ref = null!;

    // Working unit
    this.pendingProps = pendingProps;
    this.memoizedProps = null;

    this.alternate = null;
    // Flags are initially no operations pending
    this.flags = NoFlags;

    this.memoizeState = null;
    this.updateQueue = null;
    this.subtreeFlags = NoFlags;
  }
}

export class FiberRootNode {
  container: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;
  }
}

export const createWorkInProgress = (
  current: FiberNode,
  pendingProps: Props
): FiberNode => {
  let wip = current.alternate;
  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key);

    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    // update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
    wip.subtreeFlags = NoFlags;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memoizeState = current.memoizeState;
  wip.memoizedProps = wip.memoizedProps;

  return wip;
};

export const createFiberFromElement = (element: ReactElement) => {
  const { type, key, props } = element;
  let fiberTag: WorkTag = FunctionComponent;
  if (typeof type === "string") {
    fiberTag = HostComponent;
  } else if (typeof type !== "function" && __DEV__) {
    console.warn("createFiberFrimElement未实现的类型");
  }
  const fiber = new FiberNode(fiberTag, props, key);
  fiber.type = type;
  return fiber;
};
