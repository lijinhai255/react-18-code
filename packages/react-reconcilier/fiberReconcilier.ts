import { FiberNode, FiberRootNode } from "./fiber";
import { Container } from "./hostConfig";
import { ReactElementType } from "../shared/ReactTypes";

// setState=> scheduleUpdateOnFiber->scheduleWork->
//requestWork->performSyncWorkOnRoot->renderRootSync->workLoopSync->performUnitOfWork->beginWork

export function creaContainer(container: Container) {}

export function updateContainer() {}
