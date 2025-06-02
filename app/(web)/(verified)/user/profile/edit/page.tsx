import AddImageForm from "@/components/web/settings/settings-add-image-form";
import Images from "@/components/web/settings/settings-images";

export default function SettingsPage() {
  return (
    <section aria-label="Images" className="grid grid-cols-[1fr_1fr_1fr] grid-rows-2 gap-4" style={{
      gridTemplateColumns: "repeat(3, calc(var(--spacing) * 24))"
    }}>
      <Images />
      {/* <AddImageForm /> */}
    </section>
  );
}
