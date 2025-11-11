import { Footer } from "@/components/Layout/footer/footer";
import { Header } from "@/components/Layout/header/header";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
