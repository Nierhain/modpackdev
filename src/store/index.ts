import {
  EndlessGateway,
  Gateway,
  createDefaultEndlessGateway,
  createDefaultGateway,
} from "@/models/gateway";
import { atom } from "jotai";

export const pickedGatewayAtom = atom<"basic" | "endless">("basic");
export const gatewayAtom = atom<Gateway>(createDefaultGateway());
export const endlessGatewayAtom = atom<EndlessGateway>(
  createDefaultEndlessGateway(),
);
