import {
  EndlessGateway,
  Gateway,
  createDefaultEndlessGateway,
  createDefaultGateway,
} from "@/models/gateway";
import { atom } from "jotai";

export type GatewayType = "basic" | "endless";
export const pickedGatewayAtom = atom<GatewayType>("basic");
export const gatewayAtom = atom<Gateway>(createDefaultGateway());
export const endlessGatewayAtom = atom<EndlessGateway>(
  createDefaultEndlessGateway(),
);
