import { FC, PropsWithChildren } from "react";
import { Footer } from "@/components/Layout/footer/footer";
import { Header } from "@/components/Layout/header/header";

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
