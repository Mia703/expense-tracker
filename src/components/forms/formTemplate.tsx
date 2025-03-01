export default function FormTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="form-background fixed left-0 top-0 z-10 flex h-dvh w-full flex-col items-center justify-center bg-blue-950/45 p-8">
      {children}
    </div>
  );
}
