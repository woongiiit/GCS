'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";

type Project = {
  id: string;
  title: string;
  description: string | null;
  teamName: string | null;
  year: number;
  category: string | null;
  thumbnail: string | null;
  content: string | null;
  viewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  members?: Array<{
    id: string;
    name: string;
    nickname: string;
    profileImage: string | null;
  }>;
};

function ProjectDetailContent() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailImages, setDetailImages] = useState<string[]>([]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);

        if (response.ok) {
          const data = await response.json();
          setProject(data.project);

          // 상세 이미지 URLs 파싱
          if (data.project.content) {
            try {
              const urls = JSON.parse(data.project.content);
              setDetailImages(Array.isArray(urls) ? urls : []);
            } catch (e) {
              setDetailImages([]);
            }
          }
        } else {
          const errorData = await response.json();
          alert(errorData.error || '프로젝트를 불러올 수 없습니다.');
          router.back();
        }
      } catch (error) {
        console.error('프로젝트 로드 오류:', error);
        alert('프로젝트 로드 중 오류가 발생했습니다.');
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId, router]);

  const getCategoryBadgeStyle = (category: string | null) => {
    if (!category) return { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' };
    
    const categoryMap: Record<string, { bg: string; text: string }> = {
      '겨울공모전': { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' },
      '여름공모전': { bg: 'bg-[#fff5e6]', text: 'text-[#ff8c00]' },
      '캡스톤디자인': { bg: 'bg-[#f3e8ff]', text: 'text-[#8b5cf6]' },
    };
    
    return categoryMap[category] || { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' };
  };

  if (isLoading) {
    return (
      <div className="bg-[#f8f6f4] flex items-center justify-center min-h-screen">
        <p className="text-[#85817e] text-[13px]">로딩 중...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-[#f8f6f4] flex items-center justify-center min-h-screen">
        <p className="text-[#85817e] text-[13px]">프로젝트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const badgeStyle = getCategoryBadgeStyle(project.category);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="bg-white flex h-[44px] items-center justify-between px-[16px] py-[10px] relative w-full shadow-[0px_4px_10px_0px_rgba(99,81,73,0.1)]">
        <button
          onClick={() => router.back()}
          className="h-[24px] relative shrink-0 w-[12px] hover:opacity-80 transition-opacity"
          aria-label="뒤로가기"
        >
          <img alt="" className="block max-w-none size-full" src={imgWeuiBackFilled} />
        </button>
        <div className="relative h-[21px] w-[59px]">
          <Image
            src="/images/logo.svg"
            alt="GCS Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
      </div>

      {/* 프로젝트 히어로 섹션 */}
      <div className="flex flex-col items-center px-[16px] pt-[20px] relative w-full">
        {/* 주황색 배경 영역 (배너 아래부터 대표 이미지 절반 + 50%까지) */}
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#fd6f22] to-[#ffe0c9] z-0" style={{ height: 'calc(20px + min(344px, calc(100vw - 32px)) * 225 / 344)' }}></div>
        
        {/* 썸네일 이미지 */}
        <div className="relative w-full max-w-[344px] aspect-[344/300] rounded-[12px] overflow-hidden mb-[16px] z-10">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#fff5f0] to-[#fd6f22] flex items-center justify-center">
              <p className="font-bold text-white text-[24px] text-center px-[16px]">
                {project.title}
              </p>
            </div>
          )}
        </div>

        {/* 카테고리 및 연도 */}
        <div className="flex items-center gap-[8px] mb-[8px]">
          {project.category && (
            <div className={`${badgeStyle.bg} ${badgeStyle.text} px-[8px] py-[4px] rounded-[6px]`}>
              <p className="font-medium text-[11px]">{project.category}</p>
            </div>
          )}
          <p className="font-normal text-[11px] text-[#85817e]">{project.year}</p>
        </div>

        {/* 프로젝트 제목 */}
        <h1 className="font-bold text-[24px] leading-[1.4] text-[#1a1918] text-center mb-[16px]">
          {project.title}
        </h1>

        {/* 참여인원 프로필 사진 */}
        {project.members && project.members.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-[16px]">
            <div className="flex -space-x-2">
              {project.members.map((member) => (
                <div
                  key={member.id}
                  className="relative group"
                >
                  <div className="w-[64px] h-[64px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#fd6f22]">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* 호버 툴팁 */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black bg-opacity-80 text-white text-[11px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {member.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black border-opacity-80"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 팀 소개 */}
        {project.description && (
          <div className="w-full max-w-[344px] mb-[24px]">
            <p className="font-normal text-[13px] leading-[1.6] text-[#443e3c] whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        )}

        {/* 프로젝트 상세 이미지들 */}
        {detailImages.length > 0 && (
          <div className="flex flex-col gap-[16px] items-center w-full max-w-[344px] mb-[40px]">
            {detailImages.map((url, index) => (
              <div key={index} className="relative w-full aspect-[344/400] rounded-[12px] overflow-hidden">
                <img
                  src={url}
                  alt={`${project.title} 상세 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* 프로젝트 상품 섹션 */}
        <div className="flex flex-col gap-[16px] items-center w-full max-w-[344px] mb-[40px]">
          <h2 className="font-bold text-[17px] text-[#443e3c]">프로젝트 상품</h2>
          <p className="font-normal text-[13px] text-[#85817e] text-center">
            {project.teamName || '이 프로젝트'}가 만든 제품을 만나보세요
          </p>
          {/* TODO: 프로젝트와 연결된 상품 목록 표시 */}
          <div className="w-full bg-white border border-[#fd6f22] rounded-[12px] p-[16px]">
            <p className="font-normal text-[13px] text-[#85817e] text-center">
              등록된 상품이 없습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#f8f6f4] flex items-center justify-center min-h-screen">
        <p className="text-[#85817e] text-[13px]">로딩 중...</p>
      </div>
    }>
      <ProjectDetailContent />
    </Suspense>
  );
}
