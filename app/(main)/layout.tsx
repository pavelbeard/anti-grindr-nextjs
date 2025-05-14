import Background from "@/public/background.png";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPositionY: "0",
        backgroundPositionX: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </main>
  );
}
