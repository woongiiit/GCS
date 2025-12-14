'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgFrame1707483447 = "https://www.figma.com/api/mcp/asset/1a4cf6a0-6cb0-4b2d-ab5d-598731678cf4";
const imgLine297 = "https://www.figma.com/api/mcp/asset/225b4456-c112-4f43-89e0-a6b5f1d0a43b";
const imgDownArrow = "https://www.figma.com/api/mcp/asset/a192be1f-6159-4965-9dd2-240945dd2b44";

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
        알림
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function AdminAlarmPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[44px] items-start pb-[20px] pt-[40px] px-[20px] relative shrink-0 w-full">
        {/* 오늘 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              오늘
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 알림 항목 1 */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-start relative shrink-0 w-full">
                    <div className="flex items-start relative shrink-0">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                        Board 댓글 알림
                      </p>
                    </div>
                    <div className="h-[10px] relative shrink-0 w-[8px]">
                      <img alt="" className="block max-w-none size-full" src={imgFrame1707483447} />
                    </div>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full">
                    <p className="absolute font-bold leading-[1.5] left-0 text-[13px] text-[#85817e] top-0 tracking-[-0.26px] w-full whitespace-pre-wrap">
                      손염소 님의 &quot;다음 GCS Week 현장견학 장소 추천 받습니다&quot;  게시물에 댓글이 달렸습니다.
                    </p>
                  </div>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                  8분 전
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            {/* 알림 항목 2 */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-start relative shrink-0 w-full">
                    <div className="flex items-start relative shrink-0">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                        주문 취소
                      </p>
                    </div>
                    <div className="h-[10px] shrink-0 w-[8px]" />
                  </div>
                  <div className="flex items-start relative shrink-0 w-full">
                    <p className="font-bold h-[20px] leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full whitespace-pre-wrap">
                      &apos;김염소&apos; 계정을 판매자로 등록하였습니다.
                    </p>
                  </div>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                  25.11.17 13:17
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 어제 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              어제
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 알림 항목 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-start relative shrink-0 w-full">
                    <div className="flex items-start relative shrink-0">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                        알림 제목
                      </p>
                    </div>
                    <div className="h-[10px] relative shrink-0 w-[8px]">
                      <img alt="" className="block max-w-none size-full" src={imgFrame1707483447} />
                    </div>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full">
                    <p className="absolute font-bold leading-[1.5] left-0 text-[13px] text-[#85817e] top-0 tracking-[-0.26px] w-full whitespace-pre-wrap">
                      알림 내용
                    </p>
                  </div>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                  시간 정보
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 최근 7일 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              최근 7일
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 알림 항목 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-start relative shrink-0 w-full">
                    <div className="flex items-start relative shrink-0">
                      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                        알림 제목
                      </p>
                    </div>
                    <div className="h-[10px] relative shrink-0 w-[8px]">
                      <img alt="" className="block max-w-none size-full" src={imgFrame1707483447} />
                    </div>
                  </div>
                  <div className="h-[40px] relative shrink-0 w-full">
                    <p className="absolute font-bold leading-[1.5] left-0 text-[13px] text-[#85817e] top-0 tracking-[-0.26px] w-full whitespace-pre-wrap">
                      알림 내용
                    </p>
                  </div>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                  시간 정보
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 최근 30일 */}
        <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="flex items-start relative shrink-0">
              <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
                최근 30일
              </p>
            </div>
            <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              {/* 알림 항목 구조만 구현 (더미데이터 제외) */}
              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <div className="flex gap-[4px] items-start relative shrink-0 w-full">
                      <div className="flex items-start relative shrink-0">
                        <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                          알림 제목
                        </p>
                      </div>
                      <div className="h-[10px] relative shrink-0 w-[8px]">
                        <img alt="" className="block max-w-none size-full" src={imgFrame1707483447} />
                      </div>
                    </div>
                    <div className="h-[40px] relative shrink-0 w-full">
                      <p className="absolute font-bold leading-[1.5] left-0 text-[13px] text-[#85817e] top-0 tracking-[-0.26px] w-full whitespace-pre-wrap">
                        알림 내용
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] w-full">
                    시간 정보
                  </p>
                </div>
                {/* 구분선 */}
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
                </div>
              </div>
            </div>
          </div>
          {/* 더 많이 보기 */}
          <div className="flex items-start relative shrink-0">
            <div className="flex gap-[12px] items-center relative shrink-0">
              <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#85817e]">
                더 많이 보기
              </p>
              <div className="flex items-center justify-center relative shrink-0 w-[24px] h-[24px]">
                <div className="flex-none rotate-[270deg] scale-y-[-100%]">
                  <div className="relative w-[24px] h-[24px]">
                    <div className="absolute flex h-[14px] items-center justify-center left-[9px] top-[5px] w-[6px]">
                      <div className="flex-none rotate-[270deg]">
                        <div className="h-[6px] relative w-[14px]">
                          <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                            <img alt="" className="block max-w-none size-full" src={imgDownArrow} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

