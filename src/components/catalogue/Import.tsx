import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EntityType } from "@prisma/client";
import { api } from "@/utils/api";
import type { entitySchema } from "@/schemas/Entity";
import type { z } from "zod";

export default function Import() {
  const [file, setFile] = useState<FileList | null>();
  const [version, setVersion] = useState<string>("");
  const { mutate } = api.catalogue.createEntities.useMutation();

  const handleImport = () => {
    parseEntities(file?.item(0), version).then(
      (entities) => mutate(entities),
      () => {
        console.log("Parsing failed");
      },
    );
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          accept=".txt"
          onChange={(value) => setFile(value.target.files)}
        />
        <Input
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        <Button onClick={handleImport}>Import</Button>
      </div>
      File:
      {file?.item.toString()}
    </>
  );
}

const parseEntities = async (
  file: File | null | undefined,
  version: string,
): Promise<z.infer<typeof entitySchema>[]> => {
  if (!file) {
    console.log("Null or undefined");
    return [];
  }
  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  let content = result?.toString();
  if (!content) return [];
  content = parseCrafttweaker(content);
  const lines = content.split("\r\n").filter((x) => x.length !== 0);
  const entities = toEntities(lines, version);
  return entities;
};

function parseCrafttweaker(text: string) {
  return text.replaceAll("<entitytype:", "").replaceAll(">", "");
}

function toEntities(
  lines: string[],
  version: string,
): z.infer<typeof entitySchema>[] {
  return lines.map((x) => {
    const entityTexts = x.split(":");
    const modId = entityTexts[0]!;
    const entity = entityTexts[1]!;
    const displayName = entity
      .replaceAll("_", " ")
      .split(" ")
      .map((word) => word[0]?.toUpperCase() + word.substring(1))
      .join(" ");
    return {
      displayName: displayName,
      modId: modId,
      resourceName: entity,
      version: version,
      type: EntityType.Mob,
    };
  });
}
