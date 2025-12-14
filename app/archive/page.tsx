'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 배너 배경 이미지
const imgBannerBg = "https://www.figma.com/api/mcp/asset/00353ccf-f556-4931-bb5d-33e0ac26a1fd";
// News 탭용 아이콘
const imgArrowUpRight = "https://www.figma.com/api/mcp/asset/9b54eb61-c96d-43a8-8327-1679d4f11d8c";

function ArchiveContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'project' | 'news'>('project');
  const [isAdmin, setIsAdmin] = useState(false);

  // URL 쿼리 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'news' || tab === 'project') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  // 관리자 권한 확인
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.user.memberType === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('관리자 권한 확인 오류:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Banner */}
      <div className="h-[191px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            alt="" 
            className="absolute h-[101.02%] left-0 max-w-none top-[-1.02%] w-full object-cover" 
            src={imgBannerBg} 
          />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="absolute bg-gradient-to-l from-[rgba(255,178,114,0.6)] h-[192px] left-0 to-[#fd6f22] top-[-1px] w-full" />
        {/* 텍스트 */}
        <div className="absolute flex flex-col items-start leading-[1.5] left-[19px] text-white top-[49px]">
          <p className="font-['Paperlogy:8_ExtraBold',sans-serif] relative shrink-0 text-[44px]">
            Archive
          </p>
          <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0 text-[15px] text-center">
            GCS의 모든 활동과 기록
          </p>
        </div>
        {/* 글 관리 버튼 - Admin만 표시 */}
        {isAdmin && (
          <button
            onClick={() => router.push('/archiveManage')}
            className="absolute bg-white border border-[#e8e4df] flex items-center justify-center px-[14px] py-[12px] right-[16px] rounded-[30.5px] bottom-[16px] hover:opacity-80 transition-opacity"
          >
            <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
              글 관리
            </p>
          </button>
        )}
      </div>

      {/* Tab Bar */}
      <div className="bg-[#f8f6f4] flex gap-[21px] h-[59px] items-center justify-center pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('project')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'project'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'project' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Project
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('news')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'news'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'news' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            News
          </p>
        </button>
      </div>

      {/* Filter Dropdowns - Project 탭에서만 표시 */}
      {selectedTab === 'project' && (
        <div className="flex gap-[20px] items-center px-[16px] py-[20px] relative shrink-0 w-full max-w-[344px]">
          {/* 연도 드롭다운 */}
          <div className="bg-white flex gap-[8px] items-center overflow-hidden pl-[12px] pr-0 py-[4px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)] shrink-0 w-[126px]">
            <div className="flex flex-1 flex-col font-normal h-full justify-center overflow-hidden relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px] whitespace-nowrap">
              <p className="leading-[1.5] overflow-hidden">연도</p>
            </div>
            <div className="flex flex-col items-center justify-center relative shrink-0 w-[24px]">
              <div className="flex flex-col font-bold h-[24px] justify-center relative shrink-0 text-[#1a1918] text-[10px] text-center w-full">
                <p className="leading-[16px]">▼</p>
              </div>
            </div>
          </div>

          {/* 태그 드롭다운 */}
          <div className="bg-white flex gap-[8px] items-center overflow-hidden pl-[12px] pr-0 py-[4px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)] shrink-0 w-[126px]">
            <div className="flex flex-1 flex-col font-normal h-full justify-center overflow-hidden relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px] whitespace-nowrap">
              <p className="leading-[1.5] overflow-hidden">태그</p>
            </div>
            <div className="flex flex-col items-center justify-center relative shrink-0 w-[24px]">
              <div className="flex flex-col font-bold h-[24px] justify-center relative shrink-0 text-[#1a1918] text-[10px] text-center w-full">
                <p className="leading-[16px]">▼</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col gap-[40px] items-center px-[16px] py-[20px] relative shrink-0 w-full min-h-[400px]">
        {selectedTab === 'project' && (
          <div className="flex flex-col items-center relative shrink-0 w-full">
            {/* 프로젝트 콘텐츠가 여기에 표시됩니다 */}
            <p className="text-[#85817e] text-[13px]">프로젝트 콘텐츠가 표시됩니다</p>
          </div>
        )}

        {selectedTab === 'news' && (
          <div className="flex flex-col gap-[40px] items-center relative shrink-0 w-full max-w-[330px]">
            {/* 헤드라인 카드 - API로 받아올 데이터가 여기에 표시됩니다 */}
            
            {/* 연도별 뉴스 리스트 */}
            {/* 2025 섹션 */}
            <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              <div className="flex items-start relative shrink-0">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#443e3c]">
                  2025
                </p>
              </div>
              <div className="flex flex-col gap-[16px] items-start relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
                {/* 뉴스 카드들이 여기에 표시됩니다 */}
                <div className="bg-white flex flex-col items-start px-[12px] py-[20px] relative rounded-[12px] shrink-0 w-full">
                  <div className="flex flex-col font-normal justify-center relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                    <p className="leading-[1.5]">날짜</p>
                  </div>
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <div className="flex flex-col font-bold justify-center relative shrink-0 text-[15px] text-[#443e3c] whitespace-nowrap">
                      <p className="leading-[1.5]">뉴스 제목</p>
                    </div>
                    <div className="relative shrink-0 w-[16px] h-[16px]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowUpRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 섹션 */}
            <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              <div className="flex items-start relative shrink-0">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#443e3c]">
                  2024
                </p>
              </div>
              <div className="flex flex-col gap-[16px] items-start relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
                {/* 뉴스 카드들이 여기에 표시됩니다 */}
                <div className="bg-white flex flex-col items-start px-[12px] py-[20px] relative rounded-[12px] shrink-0 w-full">
                  <div className="flex flex-col font-normal justify-center relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                    <p className="leading-[1.5]">날짜</p>
                  </div>
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <div className="flex flex-col font-bold justify-center relative shrink-0 text-[15px] text-[#443e3c] whitespace-nowrap">
                      <p className="leading-[1.5]">뉴스 제목</p>
                    </div>
                    <div className="relative shrink-0 w-[16px] h-[16px]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowUpRight} />
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

export default function ArchivePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ArchiveContent />
    </Suspense>
  );
}

