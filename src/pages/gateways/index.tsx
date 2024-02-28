import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Gateway,
  gatewaySchema,
  createDefaultGateway,
  createDefaultWave,
  createDefaultEntity,
} from "@/models/gateway";
import {
  type GatewayType,
  endlessGatewayAtom,
  gatewayAtom,
  pickedGatewayAtom,
} from "@/store";
import JsonView from "@uiw/react-json-view";
import { nordTheme } from "@uiw/react-json-view/nord";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronsUpDown, HelpCircle } from "lucide-react";
import { api } from "@/utils/api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Gateways() {
  return (
    <Card className="flex min-w-full flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Gateway Generator</span>
          <GatewayTypeSelector />
        </CardTitle>
        <CardDescription>
          For a thorough explanation of what each option does, take a look at
          <br />
          the JSON schema provided in the Gateways to Eternity Github repository{" "}
          <Link
            href="https://github.com/Shadows-of-Fire/GatewaysToEternity/blob/1.20/schema/Gateway.md"
            target="_blank"
            className="font-medium italic text-primary underline underline-offset-4"
          >
            here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-w-full justify-between">
        <Generator />
        <GeneratorOutput />
      </CardContent>
    </Card>
  );
}

function Generator() {
  const form = useForm<Gateway>({
    resolver: zodResolver(gatewaySchema),
    defaultValues: createDefaultGateway(),
  });
  const [_gateway, setGateway] = useAtom(gatewayAtom);
  return (
    <div className="h-full min-h-full w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) => {
            setGateway(value);
          })}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="w-48">
                  <FormLabel>Gateway Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex min-w-full items-center gap-2">
                    Color{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Can be any minecraft color or hex code (e.g
                          &apos;#ff0000&apos; or &apos;red&apos; for red)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => field.onChange(e.target.value)}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Button
                onClick={() =>
                  form.setValue("waves", [
                    ...form.getValues("waves"),
                    createDefaultWave(),
                  ])
                }
              >
                Add Wave
              </Button>
              <Button onClick={() => form.setValue("waves", [])}>
                Clear Waves
              </Button>
            </div>
            <div>Waves</div>
            <FormField
              control={form.control}
              name="waves"
              render={({ field }) => (
                <div className="rounded border p-4">
                  {field.value.map((x, index) => (
                    <FormItem key={index}>
                      <Collapsible>
                        <CollapsibleTrigger className="w-full cursor-pointer rounded border p-4">
                          <FormLabel className="flex w-full min-w-full cursor-pointer items-center justify-between space-x-4 px-4">
                            Wave {index + 1}
                            <ChevronsUpDown className="h-4 w-4" />
                          </FormLabel>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="rounded rounded-t-none border border-t-0 bg-muted p-4">
                          <FormControl className="flex flex-col">
                            <div className="flex gap-4">
                              <div>
                                <Label htmlFor={"entityMaxWaveTime_" + index}>
                                  Max Wave Time
                                </Label>
                                <Input
                                  type="number"
                                  id={"entityMaxWaveTime_" + index}
                                  placeholder="Time in ticks"
                                  defaultValue={x.max_wave_time}
                                />
                              </div>
                              <div>
                                <Label htmlFor={"entitySetupTime_" + index}>
                                  Setup Time
                                </Label>
                                <Input
                                  type="number"
                                  id={"entitySetupTime_" + index}
                                  placeholder="Time in ticks"
                                  defaultValue={x.setup_time}
                                />
                              </div>
                              <div>
                                <Button
                                  onClick={() =>
                                    form.setValue(`waves.${index}.entities`, [
                                      ...form.getValues(
                                        `waves.${index}.entities`,
                                      ),
                                      createDefaultEntity(),
                                    ])
                                  }
                                >
                                  Add Entity
                                </Button>
                              </div>
                              <div>
                                Entities
                                {field.value[index]?.entities.map(
                                  (entity, entityIndex) => (
                                    <Collapsible key={entityIndex}>
                                      <CollapsibleTrigger>
                                        Entity {entityIndex} ({entity.entity})
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        Test
                                      </CollapsibleContent>
                                    </Collapsible>
                                  ),
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </CollapsibleContent>
                      </Collapsible>
                    </FormItem>
                  ))}
                </div>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function EntitySelect() {
  const { data } = api.catalogue.getEntities.useQuery();
  return (
    <>
      <div>
        <Label htmlFor="entity">Entity</Label>
        <Select>
          <SelectTrigger id="entity">
            <SelectValue placeholder="Entities" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((x) => (
              <SelectItem key={x.id} value={`${x.modId}:${x.resourceName}`}>
                {x.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="count">Count</Label>
        <Input type="number" id="count" />
      </div>
    </>
  );
}

function GatewayTypeSelector() {
  const [pickedGateway, setPickedGateway] = useAtom(pickedGatewayAtom);
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="typeSelect">Gateway Type</Label>
      <Select
        onValueChange={(value: GatewayType) => setPickedGateway(value)}
        value={pickedGateway}
      >
        <SelectTrigger className="w-[180px]" id="typeSelect">
          <SelectValue placeholder="Gateway type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="endless">Endless</SelectItem>
        </SelectContent>
      </Select>
    </div>
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
