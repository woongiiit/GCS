'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이미지 URL 상수들
const imgRectangle2827 = "https://www.figma.com/api/mcp/asset/474085da-a210-432b-a0f0-8d33e28c5117";
const imgImg48121 = "https://www.figma.com/api/mcp/asset/79e90af8-a27c-4843-996e-895cf1154bb2";
const imgImg48122 = "https://www.figma.com/api/mcp/asset/0f23b4cb-34b0-4ff6-8a97-916d3c1b0bd1";
const imgImg48123 = "https://www.figma.com/api/mcp/asset/5bcdec21-6c2d-4241-9649-2449561d1696";
// 전공 소개용 이미지
const imgMajor1 = "https://www.figma.com/api/mcp/asset/97e048cb-b9b4-44fd-bd41-e431a92e79c0";
const imgMajor2 = "https://www.figma.com/api/mcp/asset/d9039223-8089-4760-a02d-0cee1383311f";
// 교수진 소개용 이미지
const imgProfessor1 = "https://www.figma.com/api/mcp/asset/d09f99b9-ad7e-41f2-b754-23b9e3575314"; // 김승용 교수
const imgProfessor2 = "https://www.figma.com/api/mcp/asset/a1c9712f-38f8-4b61-a877-9f944b81da16"; // 정구혁 교수
const imgProfessor3 = "https://www.figma.com/api/mcp/asset/46f2584f-1c5b-4e03-9448-d7fbf4cfb0f9"; // 김봉구 교수
const imgProfessor4 = "https://www.figma.com/api/mcp/asset/b871f367-416f-4d15-8029-4e17fce4e764"; // 김병수 교수
const imgProfessor5 = "https://www.figma.com/api/mcp/asset/50ea2103-a056-4842-99e9-bbd80d625ea3"; // 김정욱 교수
const imgLine = "https://www.figma.com/api/mcp/asset/10d9eb69-a6a0-4b51-b3ee-94e717e9455e";

export default function AboutPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('intro');

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full">
      {/* 배너 */}
      <div className="bg-black h-[191px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute h-[306px] left-0 top-[-66px] w-full">
          <img 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            alt="" 
            src={imgRectangle2827} 
          />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="absolute bg-gradient-to-l from-[rgba(255,178,114,0.6)] h-[191px] left-0 to-[#fd6f22] top-0 w-full" />
        {/* 텍스트 */}
        <div className="absolute flex flex-col items-start justify-end leading-[1.5] left-[19px] text-white top-[49px]">
          <p className="font-bold relative shrink-0 text-[44px]">
            About GCS
          </p>
          <p className="font-normal relative shrink-0 text-[15px] text-center">
            연계전공 GCS 및 사이트 소개
          </p>
        </div>
      </div>

      {/* 탭 바 */}
      <div className="bg-[#f8f6f4] flex h-[59px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('intro')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'intro' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            사이트 소개
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('major')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'major' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            전공 소개
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('curriculum')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'curriculum' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            커리큘럼
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('faculty')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'faculty' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            교수진 소개
          </p>
        </button>
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        {selectedTab === 'intro' && (
          <div className="bg-[#f8f6f4] flex flex-col gap-[8px] items-center pb-[32px] pt-[32px] px-0 relative shrink-0 w-full">
            {/* 이미지 갤러리 - 가로 스크롤 가능 */}
            <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar">
              <div className="flex gap-[12px] items-start relative shrink-0 pl-4 pr-4 pb-2" style={{ width: 'max-content' }}>
                <div className="relative rounded-[4px] shrink-0 size-[110px] overflow-hidden flex-shrink-0">
                  <img 
                    alt="" 
                    className="absolute h-[106.8%] left-[-24.6%] max-w-none top-0 w-[142.39%] object-cover" 
                    src={imgImg48121} 
                  />
                </div>
                <div className="relative rounded-[4px] shrink-0 size-[110px] overflow-hidden flex-shrink-0">
                  <img 
                    alt="" 
                    className="absolute h-[184.8%] left-[-10.48%] max-w-none top-[-53.23%] w-[117.48%] object-cover" 
                    src={imgRectangle2827} 
                  />
                </div>
                <div className="relative rounded-[4px] shrink-0 size-[110px] overflow-hidden flex-shrink-0">
                  <img 
                    alt="" 
                    className="absolute h-[177.78%] left-0 max-w-none top-[-19.09%] w-full object-cover" 
                    src={imgImg48122} 
                  />
                </div>
                <div className="relative rounded-[4px] shrink-0 size-[110px] overflow-hidden flex-shrink-0 mr-4">
                  <img 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" 
                    src={imgImg48123} 
                  />
                </div>
              </div>
            </div>

            {/* 텍스트 설명 */}
            <div className="flex flex-col gap-[44px] items-center leading-[1.5] px-[16px] pt-[30px] pb-0 relative shrink-0 text-[#1a1918] w-full max-w-[375px]">
              {/* 한국어 설명 */}
              <div className="flex flex-col font-medium h-auto justify-center relative shrink-0 w-full max-w-[343px]">
                <p className="leading-[1.5] mb-0 text-[12px]">
                  <span className="text-[#1a1918]">{`GCS:Web은 `}</span>
                  <span className="font-bold text-[#1a1918]">동국대학교 연계전공 GCS</span>
                  <span className="text-[#1a1918]">
                    의 활동 기록을 공유하고,
                    <br />
                    학생들이 직접 기획·제작한 결과물을 소개하는 이커머스
                  </span>
                  형<span className="text-[#1a1918]">{` 매거진`}</span>
                </p>
                <p className="leading-[1.5] mb-0 text-[#1a1918] text-[12px]">입니다.</p>
                <p className="leading-[1.5] mb-0 text-[12px]">&nbsp;</p>
                <p className="leading-[1.5] text-[12px]">
                  <span className="text-[#1a1918]">이곳은 전공 내에서 이루어지는 프로젝트, 내부 행사 등을 아카이빙하며, 후속 학생들이 창작을 발전시키고 확장해나갈 수 있는</span> <span className="text-[#1a1918]">지속 가능한 전공 커뮤니티를 지향합니다.</span>
                </p>
              </div>

              {/* 영어 설명 */}
              <div className="flex flex-col font-normal justify-center relative shrink-0 w-full max-w-[343px]">
                <p className="mb-0 text-[#1a1918] text-[13px] leading-[1.5] tracking-[-0.26px]">
                  <span>{`GCS:Web is an e-commerce magazine that shares the activities of `}</span>
                  <span className="font-bold tracking-[-0.26px]">Dongguk University Interdepartmental major GCS</span>, and shows student-led produced products.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="text-[#1a1918] text-[13px] leading-[1.5] tracking-[-0.26px]">GCS:Web includes an archive of projects, and events in our major, so that we aim for a sustainable community where students can develop and expand their creativity.</p>
              </div>
            </div>
          </div>
        )}

        {/* 전공 소개 탭 */}
        {selectedTab === 'major' && (
          <div className="bg-[#f8f6f4] flex flex-col items-start justify-center px-[16px] py-[32px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full max-w-[343px] mx-auto">
              {/* 제목 및 설명 */}
              <div className="flex flex-col gap-[10px] items-start leading-[1.5] relative shrink-0 text-[#443e3c] w-full">
                {/* 제목 */}
                <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[15px]">
                  <p className="mb-0">그래픽커뮤니케이션사이언스</p>
                  <p>Graphic Communication Science (GCS)</p>
                </div>
                
                {/* 설명 텍스트 */}
                <div className="flex flex-col font-normal justify-center relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
                  <p className="mb-0">
                    <span className="font-bold text-[#443e3c] tracking-[-0.26px]">GCS는</span> <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">예술(디자인)</span>
                    <span>{`과 `}</span>
                    <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">경영(마케팅 및 전략)</span>
                    <span className="text-[#fd6f22]">{`, `}</span>
                    <span>{`그리고 `}</span>
                    <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">공학(프린팅과 패키징)</span>
                    <span>{` 등의 다양한 학제가 관련된 연계전공입니다. `}</span>
                  </p>
                  <p className="mb-0">&nbsp;</p>
                  <p>본 전공은 Design, Management, Technology의 세 영역을 축으로, 브랜드 매니지먼트의 핵심인 시각적 커뮤니케이션, 전략적 기획, 기술적 구현을 종합적으로 다룹니다.</p>
                </div>
              </div>

               {/* 이미지 2개 - 좌우 배치 */}
               <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                 {/* 첫 번째 이미지 - 왼쪽에 붙게 */}
                 <div className="flex items-center pl-0 pr-[100px] py-0 relative shrink-0 w-full">
                   <div className="aspect-[110/110] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] shrink-0 w-[110px]">
                     <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                       <img 
                         alt="" 
                         className="absolute h-[106.8%] left-[-24.6%] max-w-none top-0 w-[142.39%]" 
                         src={imgMajor1} 
                       />
                     </div>
                   </div>
                 </div>
                 
                 {/* 두 번째 이미지 - 오른쪽에 붙게 */}
                 <div className="flex items-center pl-[100px] pr-0 py-0 relative shrink-0 w-full">
                   <div className="aspect-[110/110] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] shrink-0 w-[110px]">
                     <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                       <img 
                         alt="" 
                         className="absolute h-[184.8%] left-[-10.48%] max-w-none top-[-53.23%] w-[117.48%]" 
                         src={imgMajor2} 
                       />
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* 커리큘럼 탭 */}
        {selectedTab === 'curriculum' && (
          <div className="bg-[#f8f6f4] flex items-center justify-center px-0 py-[44px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[24px] items-end relative shrink-0 w-full max-w-[400px] mx-auto px-4">
              {/* GCS4004-01 캡스톤디자인 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS4004-01</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">캡스톤디자인</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      현장에서 부딪히는 문제 해결 능력을 키우기 위해 기획부터 제작까지 일련의
                      과정을 학생들이 직접 수행한다. 
                      팀 단위로 이루어지며 창의력, 팀워크, 리더십 양성 등을 목표로 한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS4006-01 4차산업과패키징 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS4006-01</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">4차산업과패키징</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      유통합리화를 위한 포장물류 개선, 포장 폐기물 환경문제 고려, 전자상거래 활성화를 위한 포장형태 개발 등 패키징 산업과 기술의 전반적인 내용을 학습한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS2004-01 그래픽커뮤니케이션사이언스입문 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS2004-01</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">그래픽커뮤니케이션사이언스입문</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] mb-0 whitespace-pre-wrap">
                      기획, 인쇄 원고 디자인, 프리프레스, 프레스(인쇄), 포스트 프레스(후가공) 공정에 의한 인쇄 제품 제작 과정을 배운다.
                    </p>
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      리프레스 공정(데이터 입고부터 인쇄 원고의 편집 및 수정, 교정, 제판, 컬러 관리까지의 공정), 프레스(인쇄 기계로 제품을 생산하는 인쇄 공정), 포스트프레스(인쇄 제품의 요구 조건에 맞도록 가공하는 후가공 공정)와 같은 제작 공정에 대한 기본적인 이론을 학습한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS2001 컬러매니지먼트 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS2001</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">컬러매니지먼트</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      컬러 켈리브레이션, 컬러 켈리브레이션의 적용 및 장법, 컬러관리의 입출력장치의 최적화, 품질과의 방법과 데이터 보존에 대해 이해하고, 공정 관리를 학습한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS2001 4차산업과상업인쇄 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS2001</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">4차산업과상업인쇄</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      본 강의에서는 상업인쇄의 기본 지식(기술, 비지니스 모델, 어플리케이션 등), 상업인쇄 어플리케이션과 브랜드 캠패인, 상업인쇄의 4차산업 혁신(디지털 인쇄, Web to Print, Smart factory) 등을 학습한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS4001-01 식품포장 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS4001-01</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">식품포장</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      식품 포장의 기능, 식품 포장재/포장용기, 포장 식품의 품질변화/유효기간 설정, 식품의 포장공정, 식품 포장설계 등에 관하여 강의한다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GCS4002-01 식품포장특론 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                  <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">GCS4002-01</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0">
                      <p className="leading-[1.5]">식품포장특론</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                    <p className="leading-[1.5] whitespace-pre-wrap">
                      식품 포장재의 물질전달/표면화학, 항균성/항산화성 포장, 가식성 포장, 생분해성 포장, 변형기체 포장, 마이크로웨이브 가열용 포장, 지능형 포장-지시계/센서/RFID-USN 포장유통등에 관하여 강의한다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 교수진 소개 탭 */}
        {selectedTab === 'faculty' && (
          <div className="bg-[#f8f6f4] flex flex-col items-start px-0 py-[32px] relative shrink-0 w-full">
            {/* 제목 */}
            <div className="flex flex-col items-start justify-center px-[16px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[15px] text-[#1a1918]">
                <p className="leading-[1.5]">교수진</p>
              </div>
            </div>

            {/* 교수진 카드들 */}
            <div className="flex flex-col gap-[22px] items-start px-[20px] py-[16px] relative shrink-0 w-full">
              {/* 김승용 교수 - 오른쪽 정렬 */}
              <div className="flex flex-col items-end relative shrink-0 w-full">
                <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                  <div className="flex gap-[12px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                      <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                        <p className="leading-[1.5]">김승용 교수</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">동국대학교 경영대학 GCS연계전공 주임교수</p>
                        <p className="leading-[1.5]">동국대학교 경영대학 경영학부 부교수</p>
                      </div>
                    </div>
                    <div className="h-[95px] relative rounded-[4px] shrink-0 w-[80px] overflow-hidden">
                      <img 
                        alt="김승용 교수" 
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" 
                        src={imgProfessor1} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 정구혁 교수 - 오른쪽 정렬 */}
              <div className="flex flex-col items-end relative shrink-0 w-full">
                <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                  <div className="flex gap-[12px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                      <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                        <p className="leading-[1.5]">정구혁 교수</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">동국대학교 경영대학 GCS연계전공 주임교수</p>
                        <p className="leading-[1.5]">동국대학교 경영대학 경영학부 부교수</p>
                      </div>
                    </div>
                    <div className="aspect-[529/630] h-[95px] relative rounded-[4px] shrink-0 overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                        <img 
                          alt="정구혁 교수" 
                          className="absolute h-[108.76%] left-0 max-w-none top-[-1.09%] w-full object-cover" 
                          src={imgProfessor2} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 김봉구 교수 (대우교수) - 왼쪽 정렬 */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                  <div className="flex gap-[12px] items-center justify-between relative shrink-0 w-full">
                    <div className="aspect-[529/630] h-[95px] relative rounded-[4px] shrink-0 overflow-hidden">
                      <img 
                        alt="김봉구 교수" 
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" 
                        src={imgProfessor3} 
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                      <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                        <p className="leading-[1.5]">김봉구 교수</p>
                      </div>
                      <div className="flex flex-col font-normal h-[29px] justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">동국대학교 경영대학 GCS연계전공 대우교수</p>
                        <p className="leading-[1.5]">프린팅플랫폼(주) 대표이사</p>
                      </div>
                      <div className="h-0 relative shrink-0 w-[140px]">
                        <div className="absolute inset-[-0.4px_0_0_0]">
                          <img alt="" className="block max-w-none size-full" src={imgLine} />
                        </div>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">담당과목</p>
                        <p className="mb-0 leading-[1.5]">그래픽커뮤니케이션사이언스입문</p>
                        <p className="mb-0 leading-[1.5]">캡스톤디자인</p>
                        <p className="leading-[1.5]">4차상업과 상업인쇄</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 김병수 교수 - 오른쪽 정렬 */}
              <div className="flex flex-col items-end relative shrink-0 w-full">
                <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                  <div className="flex gap-[12px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                      <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                        <p className="leading-[1.5]">김병수 교수</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">동국대학교 경영대학 GCS연계전공 대우교수</p>
                        <p className="leading-[1.5]">HP Asia Pacific Graphic Industrial Strategic Biz 상무</p>
                      </div>
                      <div className="h-0 relative shrink-0 w-[140px]">
                        <div className="absolute inset-[-0.4px_0_0_0]">
                          <img alt="" className="block max-w-none size-full" src={imgLine} />
                        </div>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">담당과목</p>
                        <p className="leading-[1.5]">4차산업과 패키징</p>
                      </div>
                    </div>
                    <div className="aspect-[529/630] h-[95px] relative rounded-[4px] shrink-0 overflow-hidden">
                      <img 
                        alt="김병수 교수" 
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" 
                        src={imgProfessor4} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 김정욱 교수 - 오른쪽 정렬 */}
              <div className="flex flex-col items-end relative shrink-0 w-full">
                <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                  <div className="flex gap-[12px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                      <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                        <p className="leading-[1.5]">김정욱 교수</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">동국대학교 경영대학 GCS연계전공 대우교수</p>
                        <p className="leading-[1.5]">콘타그림 대표</p>
                      </div>
                      <div className="h-0 relative shrink-0 w-[140px]">
                        <div className="absolute inset-[-0.4px_0_0_0]">
                          <img alt="" className="block max-w-none size-full" src={imgLine} />
                        </div>
                      </div>
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                        <p className="mb-0 leading-[1.5]">담당과목</p>
                        <p className="leading-[1.5]">컬러매니지먼트와 디자인</p>
                      </div>
                    </div>
                    <div className="aspect-[529/630] h-[95px] relative rounded-[4px] shrink-0 overflow-hidden">
                      <img 
                        alt="김정욱 교수" 
                        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" 
                        src={imgProfessor5} 
                      />
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

