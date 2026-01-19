'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-[#f8f6f4] min-h-screen w-full overflow-x-hidden">
      {/* 주황색 배경 영역 */}
      <div className="h-[243.75px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/MainBack.png"
            alt="Main Banner Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* 중앙 로고 */}
        <div className="absolute flex items-center justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="relative h-[52.441px] w-[148.242px] md:h-[53px] md:w-[158px]">
            <Image
              src="/images/logo_white.svg"
              alt="GCS Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

