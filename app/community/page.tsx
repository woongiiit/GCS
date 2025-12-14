'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 배너 배경 이미지
const imgBannerBg = "https://www.figma.com/api/mcp/asset/49df0f29-2ee7-48c8-b9fb-d7f35795ee4d";
// 사용자 프로필 아이콘
const imgUserProfile = "https://www.figma.com/api/mcp/asset/c6b8ae19-99ad-46ea-9cb6-c77ae9e91a8a";

function CommunityContent() {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'board' | 'lounge'>('board');

  // URL 쿼리 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'lounge' || tab === 'board') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Banner */}
      <div className="h-[191px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute h-[281.096px] left-0 top-[-101px] w-full">
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src={imgBannerBg} 
          />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="absolute bg-gradient-to-l from-[rgba(255,178,114,0.6)] h-[192px] left-0 to-[#fd6f22] top-[-1px] w-full" />
        {/* 텍스트 */}
        <div className="absolute flex flex-col items-start leading-[1.5] left-[19px] text-white top-[49px]">
          <p className="font-['Paperlogy:8_ExtraBold',sans-serif] relative shrink-0 text-[44px]">
            Community
          </p>
          <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0 text-[15px] text-center">
            GCS의 소식과 대화가 모이는 곳
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#f8f6f4] flex h-[59px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('board')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'board'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'board' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Board
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('lounge')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'lounge'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'lounge' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Lounge
          </p>
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[24px] items-start p-[20px] relative shrink-0 w-full">
        {selectedTab === 'board' && (
          <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            {/* Board 섹션 헤더 */}
            <div className="flex flex-col items-start justify-end relative shrink-0 w-full">
              <p className="font-extrabold leading-[1.75] relative shrink-0 text-[28px] text-[#1a1918]">
                Board
              </p>
              <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                GCS의 최신 소식과 산업 트렌드를 한눈에
              </p>
            </div>

            {/* 게시글 카드 리스트 */}
            <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full">
              {/* 게시글 카드들이 여기에 표시됩니다 */}
              <div className="bg-white flex flex-col items-start p-[12px] relative rounded-[12px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
                <div className="flex gap-[12px] items-end relative shrink-0 w-full">
                  {/* 썸네일 이미지 영역 */}
                  <div className="aspect-[50/50] h-[50px] relative rounded-[4px] shrink-0 overflow-hidden bg-gray-200">
                    {/* 이미지가 여기에 표시됩니다 */}
                  </div>
                  {/* 텍스트 영역 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 flex-1 min-w-0">
                    <div className="flex flex-col gap-[4px] items-start relative shrink-0 text-[#1a1918] w-full">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
                        게시글 제목
                      </p>
                      <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] w-full">
                        게시글 부제목
                      </p>
                    </div>
                    <div className="flex gap-[8px] items-start relative shrink-0">
                      {/* 작성자 정보 */}
                      <div className="flex gap-[2px] items-center relative shrink-0">
                        <div className="relative shrink-0 w-[12px] h-[12px]">
                          <img alt="" className="block max-w-none size-full" src={imgUserProfile} />
                        </div>
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[8px] text-[#1a1918] whitespace-nowrap">
                          작성자
                        </p>
                      </div>
                      {/* 날짜 */}
                      <div className="flex items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[8px] text-[#1a1918] whitespace-nowrap">
                          날짜
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'lounge' && (
          <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            {/* Lounge 섹션 헤더 */}
            <div className="flex flex-col items-start justify-end relative shrink-0 w-full">
              <p className="font-extrabold leading-[1.75] relative shrink-0 text-[28px] text-[#1a1918]">
                Lounge
              </p>
              <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                GCS 구성원만을 위한 소통공간
              </p>
            </div>

            {/* 게시글 카드 리스트 */}
            <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full">
              {/* 게시글 카드들이 여기에 표시됩니다 */}
              <div className="bg-white flex flex-col items-start p-[12px] relative rounded-[12px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
                <div className="flex gap-[12px] items-end relative shrink-0 w-full">
                  {/* 썸네일 이미지 영역 */}
                  <div className="aspect-[50/50] h-[50px] relative rounded-[4px] shrink-0 overflow-hidden bg-gray-200">
                    {/* 이미지가 여기에 표시됩니다 */}
                  </div>
                  {/* 텍스트 영역 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 flex-1 min-w-0">
                    <div className="flex flex-col gap-[4px] items-start relative shrink-0 text-[#1a1918] w-full">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
                        게시글 제목
                      </p>
                      <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] w-full">
                        게시글 내용
                      </p>
                    </div>
                    <div className="flex gap-[8px] items-start relative shrink-0">
                      {/* 작성자 정보 */}
                      <div className="flex gap-[2px] items-center relative shrink-0">
                        <div className="relative shrink-0 w-[12px] h-[12px]">
                          <img alt="" className="block max-w-none size-full" src={imgUserProfile} />
                        </div>
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[8px] text-[#1a1918] whitespace-nowrap">
                          작성자
                        </p>
                      </div>
                      {/* 날짜 */}
                      <div className="flex items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[8px] text-[#1a1918] whitespace-nowrap">
                          날짜
                        </p>
                      </div>
                    </div>
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

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CommunityContent />
    </Suspense>
  );
}

