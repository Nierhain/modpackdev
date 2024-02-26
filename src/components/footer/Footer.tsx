import { Github, Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex max-h-24 min-w-full flex-1 flex-col justify-between border-t p-2">
      <div className="flex justify-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="https://github.com/Nierhain/modpackdev" target="_blank">
            <Github />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center">
        Made with{" "}
        <Heart className="ml-1 mr-1 mt-1 h-4 w-4 fill-red-600 text-red-600" />
        by
        <Link href="https://www.nierhain.de/" target="_blank" className="ml-1">
          Nierhain
        </Link>
      </div>
    </div>
  );
}
