// components/Header.jsx
import React from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/NavigationMenu"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full border-b bg-background px-6 py-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-xl font-semibold text-primary">Matcha</h1>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>  
              <Link to="/activity" className="text-gray-700 hover:text-primary">
                Activity
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/profile" className="text-gray-700 hover:text-primary">
                Profile
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 w-48">
                <li>
                  <NavigationMenuLink className="block hover:underline" href="/">
                    Home
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="block hover:underline" href="/profile">
                    Profile
                  </NavigationMenuLink>
                </li>
                {/* <li>
                  <NavigationMenuLink className="block hover:underline" href="/settings">
                    Settings
                  </NavigationMenuLink>
                </li> */}
              {/* </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */} 
        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </header>
  )
}
