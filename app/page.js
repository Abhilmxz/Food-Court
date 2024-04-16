import { Button } from "@/components/ui/button";
import Image from "next/image";
import {UserButton} from "@clerk/nextjs"
import CategoryList from "./_components/CategoryList";



export default function Home() {


 
  return (
    <div>
      <CategoryList/>
    </div>
  );
};
