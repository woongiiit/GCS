'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6402a3a8-7e09-40ca-880e-7b535ca7ce59";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/59df9338-22a3-4333-81f9-5ec9cd461f37";
const imgCheckLight = "https://www.figma.com/api/mcp/asset/21afb6cf-a3a4-47ca-91d2-1115bcb45710";
const imgArrowRight = "https://www.figma.com/api/mcp/asset/9c7f1b7a-9383-4737-8d36-65f304e8f920";
const imgPlus = "https://www.figma.com/api/mcp/asset/7541332f-7fbf-415d-b13c-5aed9542ba8c";

function NavBarMobile() {
  const router = useRouter();
  
  return (
    <div className="bg-[#f8f6f4] flex h-[44px] items-center justify-between px-[16px] py-[10px] relative shadow-[0px_4px_10px_0px_rgba(99,81,73,0.1)] w-full">
      <button
        onClick={() => router.back()}
        className="h-[24px] relative shrink-0 w-[12px] hover:opacity-80 transition-opacity"
        aria-label="뒤로가기"
      >
        <img alt="" className="block max-w-none size-full" src={imgWeuiBackFilled} />
      </button>
      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-black">
        사용자 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

function MemberManageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'member' | 'team'>('member');
  const [selectedMemberFilter, setSelectedMemberFilter] = useState('전체');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'team') {
      setSelectedTab('team');
    } else {
      setSelectedTab('member');
    }
  }, [searchParams]);

  const handleCheckboxClick = (index: number) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      setIsAllSelected(false);
    } else {
      setSelectedItems([0, 1, 2, 3, 4, 5, 6]);
      setIsAllSelected(true);
    }
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col h-[78px] items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Tab Bar */}
      <div className="flex h-[62px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('member')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'member'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'member' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            회원 관리
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('team')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'team'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'team' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            판매팀 관리
          </p>
        </button>
      </div>

      {/* Content Area */}
      {selectedTab === 'member' && (
        <div className="flex flex-col gap-[20px] items-start pb-[44px] pt-[32px] px-[20px] relative shrink-0 w-full">
          {/* Filter and Search */}
          <div className="flex gap-[12px] items-center relative shrink-0 w-full">
            {/* Filter Dropdown */}
            <div className="relative w-[126px]">
              <button className="bg-white flex items-center justify-between w-full px-[12px] py-[4px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)]">
                <p className="font-normal text-[13px] text-[#1a1918] tracking-[-0.26px]">
                  {selectedMemberFilter}
                </p>
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 0L9.33 10H0.67L5 0Z" fill="#1a1918" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 bg-white flex items-center px-[12px] py-[4px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)]">
              <img alt="" className="block max-w-none size-[16px] mr-[8px]" src={imgSearchIcon} />
              <input
                type="text"
                placeholder="검색"
                className="flex-1 bg-transparent border-0 text-[13px] text-[#1a1918] focus:outline-none"
              />
            </div>
          </div>

          {/* Member List - 간단한 구조만 표시 */}
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-normal text-[13px] text-[#85817e]">
              회원 목록이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      )}

      {selectedTab === 'team' && (
        <div className="flex flex-col gap-[20px] items-start pb-[44px] pt-[32px] px-[20px] relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-normal text-[13px] text-[#85817e]">
              판매팀 목록이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MemberManagePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <MemberManageContent />
    </Suspense>
  );
}
