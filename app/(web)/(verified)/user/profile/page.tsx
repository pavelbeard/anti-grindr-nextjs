export default function UserProfileMainPage() {
  return (
    <main
      className="grid grid-cols-[1fr_1fr_1fr] grid-rows-2 gap-4"
      style={{
        gridTemplateColumns: "repeat(3, calc(var(--spacing) * 24))",
      }}
    >
      <section aria-label="Username">
        
      </section>
      {/* <Images /> */}
      {/* <AddImageForm /> */}
    </main>
  );
}
