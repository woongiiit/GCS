'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 배너 배경 이미지
const imgBannerBg = "https://www.figma.com/api/mcp/asset/c7e00a88-9d5c-4514-abbf-7d5b69318d37";
// 좋아요 아이콘 (on)
const imgLikeOn = "https://www.figma.com/api/mcp/asset/df3bb719-f858-4ec0-aba5-a919d72c1053";
// 좋아요 아이콘 (off) - 통일된 디자인
const imgLikeOff = "https://www.figma.com/api/mcp/asset/39c85bd0-e8fe-4b2d-9394-706c9069a0ce";
// 구분선
const imgLine = "https://www.figma.com/api/mcp/asset/c0c8d771-a64a-4704-8d98-52dc89c7a8fd";
// Fund 더미 상품 이미지
const imgFundProduct = "https://www.figma.com/api/mcp/asset/b877ee89-3a7c-4a41-a6ba-f1b61c34e16f";

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'fund' | 'partner'>('fund');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('전체');

  // URL 쿼리 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'partner' || tab === 'fund') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const filters = ['전체', '진행 중', '진행 예정', '진행 완료'];

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Banner */}
      <div className="h-[191px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute h-[291px] left-0 top-0 w-full">
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src={imgBannerBg} 
          />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="absolute bg-gradient-to-l from-[rgba(255,178,114,0.6)] h-[191px] left-0 to-[#fd6f22] top-0 w-full" />
        {/* 텍스트 */}
        <div className="absolute flex flex-col items-start leading-[1.5] left-[19px] text-white top-[49px]">
          <p className="font-['Paperlogy:8_ExtraBold',sans-serif] relative shrink-0 text-[44px]">
            Shop
          </p>
          <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0 text-[15px] text-center">
            GCS 연계전공생들이 제작한 상품을 만나보세요
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#f8f6f4] flex h-[59px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('fund')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'fund'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'fund' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Fund
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('partner')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'partner'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'partner' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Partner up
          </p>
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[20px] items-start pb-[44px] pt-[32px] px-[20px] relative shrink-0 w-full">
        {/* Filter Dropdown */}
        <div className="relative w-[126px]">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-white flex items-center justify-between w-full px-[12px] py-[4px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)]"
          >
            <p className="font-normal text-[13px] text-[#1a1918] tracking-[-0.26px]">
              {selectedFilter}
            </p>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 0L9.33 10H0.67L5 0Z" fill="#1a1918" />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {filterOpen && (
            <div className="absolute top-full left-0 right-0 mt-[8px] bg-white rounded-[8px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.2)] z-10">
              {filters.map((filter, index) => (
                <div key={filter}>
                  <button
                    onClick={() => {
                      setSelectedFilter(filter);
                      setFilterOpen(false);
                    }}
                    className={`w-full px-[12px] py-[4px] text-left ${
                      index === 0 ? 'rounded-tl-[8px] rounded-tr-[8px]' : ''
                    } ${
                      index === filters.length - 1 ? 'rounded-bl-[8px] rounded-br-[8px]' : ''
                    } ${
                      index < filters.length - 1 ? 'border-b border-[#dcd6cc]' : ''
                    }`}
                  >
                    <p className="font-normal text-[13px] text-[#1a1918] tracking-[-0.26px]">
                      {filter}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards */}
        {selectedTab === 'fund' && (
          <div className="flex flex-col gap-[36px] items-start relative shrink-0 w-full">
            {/* 더미 상품 카드 */}
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex gap-[16px] items-start relative shrink-0 w-full">
                {/* 이미지 영역 */}
                <div className="relative rounded-[4px] shrink-0 w-[100px] h-[100px] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                    <img 
                      className="absolute h-[137.65%] left-[-1.18%] max-w-none top-[-18.82%] w-[104.71%]" 
                      alt="염소 후드집업" 
                      src={imgFundProduct} 
                    />
                  </div>
                  {/* Fund 배지 */}
                  <div className="absolute bg-[#fd6f22] flex items-center justify-center left-[4px] px-[4px] py-[2px] rounded-[999px] top-[4px]">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-white tracking-[-0.3px]">
                      Fund
                    </p>
                  </div>
                  {/* 좋아요 아이콘 */}
                  <div className="absolute left-[80px] w-[16px] h-[16px] top-[80px]">
                    <img alt="" className="block max-w-none size-full" src={imgLikeOff} />
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="flex flex-1 flex-col gap-[8px] items-start relative shrink-0">
                  <div className="flex flex-col items-start justify-end leading-[1.5] relative shrink-0 text-[#1a1918] w-full">
                    <p className="font-bold relative shrink-0 text-[15px]">
                      염소 후드집업
                    </p>
                    <p className="font-normal relative shrink-0 text-[13px] tracking-[-0.26px]">
                      MUA
                    </p>
                  </div>
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                      따뜻함 속 감성 한 스푼을 더한, 염메 그래픽 후드집업
                    </p>
                  </div>
                  <div className="bg-[#fd6f22] flex h-[19px] items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0 w-full">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[10px] text-white text-center">
                      D-4
                    </p>
                  </div>
                </div>
              </div>
              {/* Status bar */}
              <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                  {/* Progress bar */}
                  <div className="flex-1 h-[10px] relative rounded-[100px] bg-[#1a1918] bg-opacity-5 overflow-hidden">
                    <div className="absolute h-[10px] left-0 overflow-clip right-[27%] rounded-[100px] top-1/2 translate-y-[-50%]">
                      <div className="absolute bg-[#fd6f22] inset-0" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#1a1918] text-center tracking-[-0.26px]">
                      70%
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-end relative shrink-0 w-full">
                  <div className="flex items-center justify-center px-[4px] py-[2px] rounded-[4px]">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[#1a1918] text-[10px] text-center">
                      목표금액 39,930원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'partner' && (
          <div className="flex flex-col gap-[36px] items-start relative shrink-0 w-full">
            {/* Product card 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex gap-[16px] items-start relative shrink-0 w-full">
                {/* 이미지 영역 */}
                <div className="relative rounded-[4px] shrink-0 w-[80px] h-[80px] overflow-hidden bg-gray-200 shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)]">
                  {/* 이미지가 여기에 표시됩니다 */}
                  {/* 좋아요 아이콘 */}
                  <div className="absolute right-[4px] bottom-[4px] w-[16px] h-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgLikeOff} />
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="flex flex-1 flex-col gap-[8px] items-start relative shrink-0">
                  <div className="flex flex-col items-start justify-end leading-[1.5] relative shrink-0 text-[#1a1918] w-full">
                    <p className="font-bold relative shrink-0 text-[15px]">
                      상품명
                    </p>
                    <p className="font-normal relative shrink-0 text-[13px] tracking-[-0.26px]">
                      제작자명
                    </p>
                  </div>
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                      상품 설명
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 구분선 */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0] border-t border-[#dcd6cc]" />
            </div>
            {/* Product card 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex gap-[16px] items-start relative shrink-0 w-full">
                {/* 이미지 영역 */}
                <div className="relative rounded-[4px] shrink-0 w-[80px] h-[80px] overflow-hidden bg-gray-200 shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)]">
                  {/* 이미지가 여기에 표시됩니다 */}
                  {/* 좋아요 아이콘 */}
                  <div className="absolute right-[4px] bottom-[4px] w-[16px] h-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgLikeOff} />
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="flex flex-1 flex-col gap-[8px] items-start relative shrink-0">
                  <div className="flex flex-col items-start justify-end leading-[1.5] relative shrink-0 text-[#1a1918] w-full">
                    <p className="font-bold relative shrink-0 text-[15px]">
                      상품명
                    </p>
                    <p className="font-normal relative shrink-0 text-[13px] tracking-[-0.26px]">
                      제작자명
                    </p>
                  </div>
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                      상품 설명
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 구분선 */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0] border-t border-[#dcd6cc]" />
            </div>
            {/* Product card 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex gap-[16px] items-start relative shrink-0 w-full">
                {/* 이미지 영역 */}
                <div className="relative rounded-[4px] shrink-0 w-[80px] h-[80px] overflow-hidden bg-gray-200 shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)]">
                  {/* 이미지가 여기에 표시됩니다 */}
                  {/* 좋아요 아이콘 */}
                  <div className="absolute right-[4px] bottom-[4px] w-[16px] h-[16px]">
                    <img alt="" className="block max-w-none size-full" src={imgLikeOff} />
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="flex flex-1 flex-col gap-[8px] items-start relative shrink-0">
                  <div className="flex flex-col items-start justify-end leading-[1.5] relative shrink-0 text-[#1a1918] w-full">
                    <p className="font-bold relative shrink-0 text-[15px]">
                      상품명
                    </p>
                    <p className="font-normal relative shrink-0 text-[13px] tracking-[-0.26px]">
                      제작자명
                    </p>
                  </div>
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                      상품 설명
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}

