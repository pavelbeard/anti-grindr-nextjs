export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-500">
        Manage your account settings and preferences.
      </p>
      <div className="flex flex-col gap-4">
        {/* Add your settings components here */}
      </div>
    </div>
  );
}
