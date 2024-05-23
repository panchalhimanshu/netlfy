"use client";
import { useState, useEffect } from "react";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from "@faker-js/faker";


const ProfileInfoComponent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("userData");
    
    if (sessionData) {
      setUser(JSON.parse(sessionData));
    } else {
      setUser({
        image: "/path/to/static/image.jpg", // Replace with actual static image path
        name: "Mcc Callem",
        username: "uxuidesigner",
      });
    }
  }, []);
  console.log(user);

  const handleLogout = async () => {
    sessionStorage.clear();
    // await signOut({ redirect: false });
    router.push('/');
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center">
        <Avatar className=" ring-1 ring-primary ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={faker.image.avatarLegacy()} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
          {/* {user.image && (
            <Image
              src={user.image}
              alt={user.username ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            />
          )} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <div>
            <div className="text-sm font-medium text-default-800 capitalize">
              {user.name}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              @{user.username}
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            { name: "Profile", icon: "heroicons:user", href: "/profile" },
            { name: "Billing", icon: "heroicons:megaphone", href: "/billing" },
            { name: "Settings", icon: "heroicons:paper-airplane", href: "/settings" },
            { name: "Keyboard shortcuts", icon: "heroicons:language", href: "/shortcuts" },
          ].map((item, index) => (
            <Link href={item.href} key={`info-menu-${index}`} className="cursor-pointer">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/team" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:user-group" className="w-4 h-4" />
              Team
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background">
              <Icon icon="heroicons:user-plus" className="w-4 h-4" />
              Invite User
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  { name: "Email", href: "/invite/email" },
                  { name: "Message", href: "/invite/message" },
                  { name: "Facebook", href: "/invite/facebook" },
                ].map((item, index) => (
                  <Link href={item.href} key={`message-sub-${index}`} className="cursor-pointer">
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href="https://github.com" target="_blank" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:variable" className="w-4 h-4" />
              Github
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:phone" className="w-4 h-4" />
              Support
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  { name: "Portal", href: "/support/portal" },
                  { name: "Slack", href: "/support/slack" },
                  { name: "WhatsApp", href: "/support/whatsapp" },
                ].map((item, index) => (
                  <Link href={item.href} key={`message-sub-${index}`} className="cursor-pointer">
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProfileInfo = () => (
  <SessionProvider>
    <ProfileInfoComponent />
  </SessionProvider>
);

export default ProfileInfo;
