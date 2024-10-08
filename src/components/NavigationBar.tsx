"use client";

import  React,{useEffect, useState} from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from ""
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"

import {components} from '@/lib/constantvalue'
import { useRouter } from "next/navigation"
import Signout from "./Signout";
import axios from "axios";



export function NavigationBar() {
      const [userLogin,setUserLogin] = useState("");
      // const [token, setToken] = useState( axios.defaults.headers.head.Authorization)
      // console.log(token)
      
      useEffect(()=>{
           if(localStorage.getItem("userId") !== null){
               setUserLogin(localStorage.getItem("userId")||"");
           }
      })

      
      // const user = JSON.parse(localStorage.getItem('userId'))? localStorage.getItem('userId'):"";

      

  return (
    <>
    <nav className="flex justify-between border-b-4 border-b-slate-700 ">
        <div className="gap-3 m-4 flex justify-center items-center  sm:font-extrabold text-xl sm:text-2xl"><p>PagePal</p></div>
      <NavigationMenu>
      {
        userLogin.length >0 ?<> <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={'/all-books'}>
          <NavigationMenuTrigger>Explore Books</NavigationMenuTrigger>
          </Link>
        
          {/* <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList></>:""
      }  
     
    </NavigationMenu>
   
     {
        userLogin.length>0 ?<Signout btnName={"SignOut"} />:<div className="gap-3 m-4"><Link href={'/sign-in'}><Button className="m-1" >SignIn</Button></Link> <Link href={'/sign-up'}><Button>SignUp</Button></Link> </div>
     }
      
     
    </nav>
    
    </>
   
   
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
