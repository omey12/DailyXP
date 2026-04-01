"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../assets/DailyXP logo.png";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout(); // Clear auth context and localStorage
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });

    router.push("/account/login");
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="DailyXP"
                width={180}
                height={180}
                className="rounded-md"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <Link href="/account/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLogoutOpen(true)}
                  className="hover:bg-red-100"
                >
                  <LogOut className="h-5 w-5 text-red-600" />
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={logoutOpen}
        setOpen={setLogoutOpen}
        title="Logout?"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        variant="destructive"
        onConfirm={handleLogout}
      />
    </nav>
  );
}
