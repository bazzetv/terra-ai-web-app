import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center text-center p-6 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;