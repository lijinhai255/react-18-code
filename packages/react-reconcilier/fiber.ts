import { Props, Key, Ref } from "../shared/ReactTypes";
import { WorkTag } from "./workTags";
import { Flags, NoFlags } from "./fiberFlags";

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
  alternate: FiberNode | null;
  flags: Flags;

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

    this.ref = null;

    // Working unit
    this.pendingProps = pendingProps;
    this.memoizedProps = null;

    this.alternate = null;
    // Flags are initially no operations pending
    this.flags = NoFlags;
  }

  // Other methods commonly part of the FiberNode class

  /**
   * Marks the work-in-progress tree for a pending update.
   */
  markUpdate() {
    this.flags |= Update;
  }

  /**
   * Clones the current FiberNode to create the alternate work-in-progress node.
   */
  clone() {
    const cloned = new FiberNode(this.tag, this.pendingProps, this.key);
    cloned.stateNode = this.stateNode;
    cloned.return = this.return;
    cloned.sibling = this.sibling;
    cloned.child = this.child;
    cloned.index = this.index;
    cloned.memoizedProps = this.memoizedProps;
    cloned.alternate = this;
    cloned.flags = this.flags;
    return cloned;
  }
}
