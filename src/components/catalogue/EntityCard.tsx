import type { Entity } from "@prisma/client";
import Image from "next/image";
import fallback from "public/fallback_image.svg";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type EntityCardProps = {
  entity: Entity;
};

export default function EntityCard({ entity }: EntityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2">
          <span>{entity.displayName}</span>
          <span className="text-sm text-muted-foreground">
            ({entity.modId}:{entity.resourceName})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={entity.image ?? fallback as string}
          width={200}
          height={300}
          alt="Image of the mob"
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex flex-col">
            <span>Available in Version(s)</span>
            <span>{entity.version}</span>
          </div>
          <div>
            <span>Mod</span>
            <span className="flex flex-col">{entity.modId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
