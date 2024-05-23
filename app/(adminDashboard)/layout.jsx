"use client"
import { useEffect } from "react";
import MainLayout from "./main-layout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const logindata = sessionStorage.getItem('userData');
      if (logindata) {
        const userData = JSON.parse(logindata);
        if (userData.roleid !== 1) {
          router.push('/');
          setTimeout(() => { toast("Not authorized") }, 10);
        }
      }else{
        router.push('/');
      }
    };

    fetchData();
  }, [router]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
