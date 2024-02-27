import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EndlessGateway, Gateway, gatewaySchema } from "@/models/gateway";
import { endlessGatewayAtom, gatewayAtom, pickedGatewayAtom } from "@/store";
import JsonView from "@uiw/react-json-view";
import { nordTheme } from "@uiw/react-json-view/nord";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Gateways() {
  return (
    <div className="flex min-w-full flex-col items-center gap-4">
      <h1 className="text-3xl">Gateway Generator</h1>
      <div className="flex min-w-full justify-between">
        <Generator />
        <GeneratorOutput />
      </div>
    </div>
  );
}

function Generator() {
  const form = useForm<Gateway>({
    resolver: zodResolver(gatewaySchema),
    defaultValues: {},
  });
  return (
    <div>
      <GatewayTypeSelector />
    </div>
  );
}

function GatewayTypeSelector() {
  const [pickedGateway, setPickedGateway] = useAtom(pickedGatewayAtom);
  return (
    <Select onValueChange={setPickedGateway} value={pickedGateway}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Gateway type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="basic">Basic</SelectItem>
        <SelectItem value="endless">Endless</SelectItem>
      </SelectContent>
    </Select>
  );
}

function GeneratorOutput() {
  const [gateway] = useAtom(gatewayAtom);
  const [endlessGateway] = useAtom(endlessGatewayAtom);
  const [pickedGateway] = useAtom(pickedGatewayAtom);
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-xl">Generated output</h4>
      <ScrollArea className="h-96 whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          <JsonView
            value={pickedGateway === "basic" ? gateway : endlessGateway}
            style={nordTheme}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
