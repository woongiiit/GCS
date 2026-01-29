import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-[#f8f6f4] min-h-screen w-full">
      {/* Hero Section */}
      <section className="h-[300px] bg-gradient-to-r from-[#FF6F22] to-[#EE4A08] flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/logo_white.svg"
            alt="GCS Logo"
            width={160}
            height={54}
            priority
          />
          <p className="text-white/80 mt-4 text-lg">Welcome to GCS</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Getting Started
        </h2>
        <p className="text-gray-600">
          This is a fresh GCS project setup with Next.js, NextAuth.js, TanStack Query, and more.
        </p>
      </section>
    </div>
  );
}
