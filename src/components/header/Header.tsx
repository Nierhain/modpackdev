import { ModeToggle } from "../theme-toggle";
import Menu from "./Menu";
import UserInfo from "./UserInfo";

export default function Header() {
  return (
    <div className="flex h-16 max-h-16 min-w-full flex-1 justify-between border-b p-4">
      <div>Logo</div>
      <Menu />
      <div className="flex gap-4">
        <ModeToggle />
        <UserInfo />
      </div>
    </div>
  );
}
