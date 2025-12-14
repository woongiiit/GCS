'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/fc046765-84dd-4c1a-8db8-431253b7db0c";
const imgIcon = "https://www.figma.com/api/mcp/asset/feebcd44-da01-4e43-8056-1631f2bf6484";
const imgGroup1707482239 = "https://www.figma.com/api/mcp/asset/d0d4ede0-2ecf-4d03-9c6f-dc4e81624670";
const img1 = "https://www.figma.com/api/mcp/asset/97c0fee6-fb14-4d55-ab1e-4bfed635207f";

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
        글 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  type MemberType = {
    id: string;
    name: string;
    nickname: string;
    displayName: string;
    email: string;
  };
  
  const [selectedMembers, setSelectedMembers] = useState<Array<MemberType>>([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberSearchResults, setMemberSearchResults] = useState<Array<MemberType>>([]);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const memberSearchRef = useRef<HTMLDivElement>(null);
  const memberInputRef = useRef<HTMLInputElement>(null);
  const [year, setYear] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [showOnHome, setShowOnHome] = useState(false);

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleDetailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDetailImages([...detailImages, ...Array.from(e.target.files)]);
    }
  };

  // 사용자 검색
  useEffect(() => {
    const searchUsers = async () => {
      if (!memberSearchQuery.trim()) {
        setMemberSearchResults([]);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`/api/users/search?q=${encodeURIComponent(memberSearchQuery)}&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // 이미 선택된 멤버 제외
          const filtered = data.users.filter(
            (user: {id: string}) => !selectedMembers.some((m) => m.id === user.id)
          );
          setMemberSearchResults(filtered);
          setShowMemberDropdown(true);
        }
      } catch (error) {
        console.error('사용자 검색 오류:', error);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300); // 디바운스
    return () => clearTimeout(timeoutId);
  }, [memberSearchQuery, selectedMembers]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memberSearchRef.current && !memberSearchRef.current.contains(event.target as Node)) {
        setShowMemberDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMemberSelect = (user: MemberType) => {
    if (!selectedMembers.some((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
      setMemberSearchQuery('');
      setShowMemberDropdown(false);
      memberInputRef.current?.focus();
    }
  };

  const handleMemberRemove = (userId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[40px] items-center px-0 py-[40px] relative shrink-0 w-full pb-[100px]">
        <div className="flex flex-col gap-[12px] items-center px-[20px] py-0 relative shrink-0 w-full">
          {/* 제목 */}
          <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                제목
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] shrink-0 w-full text-[13px] text-[#1a1918] focus:outline-none"
              placeholder=""
            />
          </div>

          {/* 팀명 */}
          <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                팀명
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] shrink-0 w-full text-[13px] text-[#1a1918] focus:outline-none"
              placeholder=""
            />
          </div>

          {/* 팀원 */}
          <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full" ref={memberSearchRef}>
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                팀원
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <div className="bg-white min-h-[36px] px-[12px] py-[4px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] shrink-0 w-full relative">
              {/* 선택된 멤버들 */}
              <div className="flex flex-wrap gap-[4px] items-center mb-[4px]">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#ffc26d] flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px]"
                  >
                    <span className="text-[12px] text-[#1a1918]">{member.displayName}</span>
                    <button
                      type="button"
                      onClick={() => handleMemberRemove(member.id)}
                      className="text-[#1a1918] hover:opacity-80 text-[14px] font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {/* 검색 입력란 */}
                <input
                  ref={memberInputRef}
                  type="text"
                  value={memberSearchQuery}
                  onChange={(e) => {
                    setMemberSearchQuery(e.target.value);
                    setShowMemberDropdown(true);
                  }}
                  onFocus={() => {
                    if (memberSearchResults.length > 0) {
                      setShowMemberDropdown(true);
                    }
                  }}
                  className="flex-1 min-w-[100px] bg-transparent border-0 text-[13px] text-[#1a1918] focus:outline-none"
                  placeholder={selectedMembers.length === 0 ? "팀원 검색 (이름, 닉네임, 학번)" : ""}
                />
              </div>
              
              {/* 검색 결과 드롭다운 */}
              {showMemberDropdown && memberSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-[#eeebe6] rounded-[8px] shadow-lg max-h-[200px] overflow-y-auto z-50">
                  {memberSearchResults.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleMemberSelect(user)}
                      className="w-full text-left px-[12px] py-[8px] hover:bg-[#f8f6f4] text-[13px] text-[#1a1918] border-b border-[#eeebe6] last:border-b-0"
                    >
                      <div className="font-medium">{user.displayName}</div>
                      {user.email && <div className="text-[11px] text-[#85817e]">{user.email}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 연도 */}
          <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                연도
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] shrink-0 w-full text-[13px] text-[#1a1918] focus:outline-none"
              placeholder=""
            />
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                태그
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <div className="bg-white flex flex-col h-[36px] items-start justify-center overflow-clip pl-[12px] pr-0 py-0 relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] shrink-0 w-full min-h-[36px]">
              <div className="flex flex-wrap gap-[4px] items-center px-0 py-[4px] relative shrink-0 w-full">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#ffc26d] flex items-start px-[4px] py-[2px] relative rounded-[2px] shrink-0"
                  >
                    <p className="font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[#1a1918] tracking-[-0.2px]">
                      {tag}
                    </p>
                    <button
                      onClick={() => handleTagRemove(index)}
                      className="ml-[4px] text-[#1a1918] hover:opacity-80"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 min-w-[100px] bg-transparent border-0 text-[13px] text-[#1a1918] focus:outline-none"
                  placeholder={tags.length === 0 ? "태그를 입력하고 Enter를 누르세요" : ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] items-start px-[20px] py-0 relative shrink-0 w-full">
          {/* 표지 */}
          <div className="flex items-center gap-[2px] relative shrink-0">
            <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
              표지
            </p>
          </div>
          <label className="bg-white flex flex-col gap-[8px] h-[206px] items-center justify-center overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[167px] cursor-pointer hover:opacity-80 transition-opacity">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />
            {coverImage ? (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover"
                className="w-full h-full object-cover rounded-[10px]"
              />
            ) : (
              <div className="flex flex-col gap-[4px] items-center justify-center">
                <div className="relative shrink-0 size-[32px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon} />
                </div>
                <div className="flex flex-col gap-[4px] items-center">
                  <p className="font-medium leading-[18px] not-italic text-[#1a1918] text-[12px] text-center tracking-[-0.24px]">
                    이미지를 드래그하거나
                  </p>
                  <p className="font-medium leading-[16.5px] not-italic text-[#85817e] text-[11px] text-center tracking-[-0.22px]">
                    클릭하여 선택
                  </p>
                </div>
              </div>
            )}
          </label>

          {/* 세부내용 */}
          <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[2px] relative shrink-0">
              <p className="font-bold leading-[18px] not-italic text-[12px] text-black">
                세부내용
              </p>
              <p className="font-bold leading-[19.5px] not-italic text-[13px] text-[#eb5b09]">
                *
              </p>
            </div>
            <label className="bg-white h-[141px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] w-full cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleDetailImageChange}
                className="hidden"
              />
              {detailImages.length > 0 ? (
                <div className="flex flex-wrap gap-[8px] p-[12px] w-full h-full overflow-auto">
                  {detailImages.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Detail ${index + 1}`}
                      className="w-[100px] h-[100px] object-cover rounded-[4px]"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-[4px] items-center justify-center">
                  <div className="relative shrink-0 size-[32px]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup1707482239} />
                  </div>
                  <div className="flex flex-col gap-[4px] items-center">
                    <p className="font-medium leading-[18px] not-italic text-[#1a1918] text-[12px] text-center tracking-[-0.24px]">
                      이미지를 드래그하거나
                    </p>
                    <p className="font-medium leading-[16.5px] not-italic text-[#85817e] text-[11px] text-center tracking-[-0.22px]">
                      클릭하여 선택
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div className="fixed bg-[#fd6f22] flex gap-[76px] h-[65px] items-center px-[18px] py-[12px] left-0 bottom-0 rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full z-[100]">
        <button
          onClick={() => setShowOnHome(!showOnHome)}
          className="relative shrink-0 size-[24px] cursor-pointer"
        >
          <div className="absolute contents left-[2px] top-[2px]">
            <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${showOnHome ? 'bg-[#2a2a2e]' : ''}`} />
            {showOnHome && (
              <div className="absolute flex inset-0 items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </button>
        <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[-0.24px]">
          홈화면에 띄우기
        </p>
        <div className="flex gap-[9px] items-center relative shrink-0">
          <button className="bg-white flex h-[34px] items-center justify-center px-[12px] py-0 relative rounded-[12px] shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px]">
              저장
            </p>
          </button>
          <button className="bg-white flex h-[34px] items-center justify-center px-[12px] py-0 relative rounded-[12px] shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px]">
              등록
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

