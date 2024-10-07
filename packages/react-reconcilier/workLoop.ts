import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

// 当前正在工作的Fiber节点
let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
  // 初始化工作栈，将传入的fiber作为当前的工作节点
  workInProgress = fiber;
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;
  // 循环完成当前工作单元，遍历兄弟或返回父节点
  do {
    completeWork(node); // 完成当前节点的工作
    const sibling = node.sibling; // 获取兄弟节点
    if (sibling !== null) {
      workInProgress = sibling; // 如果有兄弟节点，处理兄弟节点
      return;
    }
    node = node.return; // 如果没有兄弟节点，回溯到父节点
    workInProgress = node; // 更新当前的工作节点
  } while (node !== null);
}

function performUnitOfWork(fiber: FiberNode): FiberNode | null {
  // 开始处理当前Fiber节点
  const next = beginWork(fiber);
  fiber.memoizedProps = fiber.pendingProps; // 将当前的pendingProps保存到memoizedProps

  if (next === null) {
    // 如果没有子节点，则进入完成阶段
    completeUnitOfWork(fiber); // 完成当前节点并继续寻找兄弟或父节点
  } else {
    // 继续处理子节点
    workInProgress = next;
  }
}

function workLoop() {
  // 当存在工作中的Fiber节点时，依次执行工作单元
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress); // 处理下一个工作单元
  }
}

function renderRoot(root: FiberNode) {
  // 初始化并准备Fiber树的根节点
  prepareFreshStack(root);
  // 进入工作循环，处理Fiber节点树
  do {
    try {
      workLoop(); // 执行工作循环
      break; // 成功完成工作，跳出循环
    } catch (e) {
      console.error("workLoop发生错误", e);
      // 错误处理，清空当前的工作进度并重新开始
      workInProgress = null;
    }
  } while (true); // 如果发生错误，重新进入循环，直到完成工作
}
