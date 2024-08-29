import HomePage from "@/components/Homepage";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col ">
      <NavigationBar/> 
      {/* <div className="w-10/12 flex justify-center bg-red-600">
             <HomePage/>//home page

      </div>     */}
    </main>
  );
}
