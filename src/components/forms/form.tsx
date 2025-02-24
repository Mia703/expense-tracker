export default function FormTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="form-background absolute left-0 top-0 flex h-dvh w-full flex-col items-center justify-center bg-blue-950/45 p-8 z-10">
      {children}
    </div>
  );
}
