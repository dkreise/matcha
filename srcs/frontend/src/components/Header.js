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
    <header className="w-full border-b bg-background px-4 py-3">
      <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <Link to="/">
                <NavigationMenuLink className="block hover:underline">
                Home
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link to="/profile">
                <NavigationMenuLink className="block hover:underline">
                Profile
                </NavigationMenuLink>
            </Link>
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
    </header>
  )
}
