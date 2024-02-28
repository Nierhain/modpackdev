import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Import() {
  const [file, setFile] = useState<FileList | null>();
  const [version, setVersion] = useState<string>("");
  useEffect(() => {
    console.log(file);
  }, [file]);
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
        <Button onClick={() => parseEntities(file?.item(0))}>Import</Button>
      </div>
      File:
      {file?.item.toString()}
    </>
  );
}

const parseEntities = (file: File | null | undefined) => {
  if (!file) {
    console.log("Null or undefined");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    let content = reader.result?.toString();
    if (!content) return;
      content = content.replaceAll("<entitytype:", "").replaceAll(">", "");
      const lines = content.split("\r\n");
    console.log(lines);
  };
  reader.readAsText(file);
};
