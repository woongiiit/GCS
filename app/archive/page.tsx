'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 배너 배경 이미지
const imgBannerBg = "https://www.figma.com/api/mcp/asset/00353ccf-f556-4931-bb5d-33e0ac26a1fd";
// News 탭용 아이콘
const imgArrowUpRight = "https://www.figma.com/api/mcp/asset/9b54eb61-c96d-43a8-8327-1679d4f11d8c";

type Project = {
  id: string;
  title: string;
  description: string | null;
  teamName: string | null;
  year: number;
  category: string | null;
  thumbnail: string | null;
  viewCount: number;
  tags: string[];
  createdAt: string;
};

function ArchiveContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'project' | 'news'>('project');
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setIsTagOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // URL 쿼리 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'news' || tab === 'project') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  // 프로젝트 목록 로드
  useEffect(() => {
    if (selectedTab === 'project') {
      loadProjects();
    }
  }, [selectedTab, selectedYear, selectedTag]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (selectedYear) {
        params.append('year', selectedYear);
      }
      if (selectedTag) {
        params.append('tag', selectedTag);
      }
      
      params.append('page', '1');
      params.append('limit', '100');

      const response = await fetch(`/api/projects?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
        
        // 연도 및 태그 목록 추출
        const years: number[] = Array.from(new Set(data.projects.map((p: Project) => p.year))).sort((a, b) => b - a);
        const tags: string[] = Array.from(new Set(data.projects.flatMap((p: Project) => p.tags || [])));
        setAvailableYears(years);
        setAvailableTags(tags);
      } else {
        console.error('프로젝트 목록 로드 실패');
      }
    } catch (error) {
      console.error('프로젝트 목록 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 연도별로 프로젝트 그룹화
  const projectsByYear = projects.reduce((acc, project) => {
    const key = `${project.year} ${project.category || ''}`.trim();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const sortedYearGroups = Object.keys(projectsByYear).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[0]);
    const yearB = parseInt(b.split(' ')[0]);
    return yearB - yearA;
  });

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
          <div ref={yearRef} className="relative">
            <button
              onClick={() => {
                setIsYearOpen(!isYearOpen);
                setIsTagOpen(false);
              }}
              className="bg-white flex gap-[8px] items-center overflow-hidden pl-[12px] pr-0 py-[4px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)] shrink-0 w-[126px] cursor-pointer"
            >
              <div className="flex flex-1 flex-col font-normal h-full justify-center overflow-hidden relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px] whitespace-nowrap">
                <p className="leading-[1.5] overflow-hidden">{selectedYear || '연도'}</p>
              </div>
              <div className="flex flex-col items-center justify-center relative shrink-0 w-[24px]">
                <div className="flex flex-col font-bold h-[24px] justify-center relative shrink-0 text-[#1a1918] text-[10px] text-center w-full">
                  <p className="leading-[16px]">▼</p>
                </div>
              </div>
            </button>
            {isYearOpen && (
              <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-[126px] z-50 max-h-[200px] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedYear(null);
                    setIsYearOpen(false);
                  }}
                  className={`w-full px-[12px] py-[8px] text-left hover:bg-[#f8f6f4] transition-colors ${
                    !selectedYear ? 'bg-[#fff5f0]' : ''
                  }`}
                >
                  <p className="font-normal text-[13px] text-[#1a1918]">전체</p>
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year.toString());
                      setIsYearOpen(false);
                    }}
                    className={`w-full px-[12px] py-[8px] text-left hover:bg-[#f8f6f4] transition-colors ${
                      selectedYear === year.toString() ? 'bg-[#fff5f0]' : ''
                    }`}
                  >
                    <p className="font-normal text-[13px] text-[#1a1918]">{year}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 태그 드롭다운 */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTagOpen(!isTagOpen);
                setIsYearOpen(false);
              }}
              className="bg-white flex gap-[8px] items-center overflow-hidden pl-[12px] pr-0 py-[4px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)] shrink-0 w-[126px] cursor-pointer"
            >
              <div className="flex flex-1 flex-col font-normal h-full justify-center overflow-hidden relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px] whitespace-nowrap">
                <p className="leading-[1.5] overflow-hidden">{selectedTag || '태그'}</p>
              </div>
              <div className="flex flex-col items-center justify-center relative shrink-0 w-[24px]">
                <div className="flex flex-col font-bold h-[24px] justify-center relative shrink-0 text-[#1a1918] text-[10px] text-center w-full">
                  <p className="leading-[16px]">▼</p>
                </div>
              </div>
            </button>
            {isTagOpen && (
              <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-[126px] z-50 max-h-[200px] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setIsTagOpen(false);
                  }}
                  className={`w-full px-[12px] py-[8px] text-left hover:bg-[#f8f6f4] transition-colors ${
                    !selectedTag ? 'bg-[#fff5f0]' : ''
                  }`}
                >
                  <p className="font-normal text-[13px] text-[#1a1918]">전체</p>
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsTagOpen(false);
                    }}
                    className={`w-full px-[12px] py-[8px] text-left hover:bg-[#f8f6f4] transition-colors ${
                      selectedTag === tag ? 'bg-[#fff5f0]' : ''
                    }`}
                  >
                    <p className="font-normal text-[13px] text-[#1a1918] truncate">{tag}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col gap-[40px] items-start px-[16px] py-[20px] relative shrink-0 w-full min-h-[400px]">
        {selectedTab === 'project' && (
          <div className="flex flex-col gap-[40px] items-start relative shrink-0 w-full">
            {isLoading ? (
              <div className="flex items-center justify-center w-full py-[40px]">
                <p className="text-[#85817e] text-[13px]">로딩 중...</p>
              </div>
            ) : sortedYearGroups.length === 0 ? (
              <div className="flex items-center justify-center w-full py-[40px]">
                <p className="text-[#85817e] text-[13px]">프로젝트가 없습니다.</p>
              </div>
            ) : (
              sortedYearGroups.map((yearCategory) => {
                const projectsInGroup = projectsByYear[yearCategory];
                const [year, category] = yearCategory.split(' ');
                const displayTitle = `${year} ${category || ''}`.trim();
                
                return (
                  <div key={yearCategory} className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                    {/* 연도/카테고리 제목 */}
                    <div className="flex items-start relative shrink-0">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#443e3c]">
                        {displayTitle}
                      </p>
                    </div>
                    
                    {/* 가로 스크롤 가능한 프로젝트 카드 리스트 */}
                    <div className="flex gap-[16px] items-start overflow-x-auto relative shrink-0 w-full pb-[8px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {projectsInGroup.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => router.push(`/archive/project/${project.id}`)}
                          className="bg-white flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[280px] min-w-[280px] overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          {/* 썸네일 이미지 */}
                          <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
                            {project.thumbnail ? (
                              <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#fff5f0] to-[#fd6f22]">
                                <p className="font-bold text-white text-[24px] text-center px-[16px]">
                                  {project.title}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {/* 카드 정보 */}
                          <div className="flex flex-col gap-[12px] items-start p-[16px] relative w-full">
                            {/* 카테고리/연도 */}
                            <div className="flex items-center gap-[8px] relative shrink-0">
                              {project.category && (
                                <div className={`px-[8px] py-[4px] rounded-[6px] ${
                                  project.category === '겨울공모전' ? 'bg-[#e8f4ff] text-[#06c]' :
                                  project.category === '여름공모전' ? 'bg-[#fff5e6] text-[#ff8c00]' :
                                  project.category === '캡스톤디자인' ? 'bg-[#f3e8ff] text-[#8b5cf6]' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  <p className="font-medium text-[11px]">{project.category}</p>
                                </div>
                              )}
                              <p className="font-normal text-[11px] text-[#85817e]">{project.year}</p>
                            </div>
                            
                            {/* 프로젝트 제목 */}
                            <div className="flex flex-col items-start relative shrink-0 w-full">
                              <p className="font-bold leading-[1.4] relative text-[16px] text-[#1a1918] line-clamp-2 text-left">
                                {project.title}
                              </p>
                            </div>
                            
                            {/* 팀명 */}
                            {project.teamName && (
                              <div className="flex items-center relative shrink-0 w-full">
                                <p className="font-medium text-[14px] text-[#443e3c]">
                                  {project.teamName}
                                </p>
                              </div>
                            )}
                            
                            {/* 태그 */}
                            {project.tags && project.tags.length > 0 && (
                              <div className="flex flex-wrap gap-[6px] items-center relative shrink-0 w-full">
                                {project.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-[8px] py-[2px] rounded-[4px] bg-[#f8f6f4] text-[#85817e] text-[10px]"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
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

