import { Button } from "@/components/ui/button";
import Image from "next/image";
import {UserButton} from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <h1>Hey</h1>
      <Button>Button</Button>

      <UserButton/>

    </div>
  );
};
