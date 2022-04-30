interface Iprops {
  children: React.ReactNode;
}

export default function Layout({ children }: Iprops) {
  return <div className='w-full h-screen font-mono bg-blue-50'>{children}</div>;
}
