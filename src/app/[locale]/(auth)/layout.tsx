import { FC, PropsWithChildren } from "react";
import { Header } from "@/components/Layout/header/header";
import { Footer } from "@/components/Layout/footer/footer";
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
