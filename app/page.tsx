'use client';

// 이미지 URL 상수들
const imgRectangle2823 = "https://www.figma.com/api/mcp/asset/c3ee537a-e1ea-4035-bd79-2081dfbbdab3";
const imgEllipse5500 = "https://www.figma.com/api/mcp/asset/4721401e-a2f1-4bfa-a974-5319fd96604c";
const imgVector833 = "https://www.figma.com/api/mcp/asset/d1838ece-4916-4cea-978a-61d80b712a2e";
const imgVector832 = "https://www.figma.com/api/mcp/asset/81028f71-633c-44f4-9499-228a31613864";
const imgEllipse5499 = "https://www.figma.com/api/mcp/asset/356b5bc8-8876-4dfb-a577-c557ee303d3c";
const imgEllipse5498 = "https://www.figma.com/api/mcp/asset/9a19c218-4519-4cc1-bc62-42042ce9dfa3";
const img10 = "https://www.figma.com/api/mcp/asset/615ebb9a-f45a-4340-9ade-7b82e1548635";
const img11 = "https://www.figma.com/api/mcp/asset/4d048553-1cf9-4256-916c-7b6cf44e319a";
const img12 = "https://www.figma.com/api/mcp/asset/3d06e91c-8f93-4bcf-8058-2d3fb5ef50b6";
const img13 = "https://www.figma.com/api/mcp/asset/60dc003b-2fd7-4e63-ad2d-e78a3239be9f";
const img14 = "https://www.figma.com/api/mcp/asset/99082565-5c3b-48fe-991e-b4a1d430e329";

export default function Home() {
  return (
    <div className="bg-[#f8f6f4] min-h-screen w-full overflow-x-hidden">
      {/* 주황색 배경 영역 */}
      <div className="h-[243.75px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute h-[243.75px] left-0 top-0 w-full">
          <img alt="" className="block max-w-none size-full object-cover" src={imgRectangle2823} />
        </div>
        
        {/* 장식 요소 1 - 큰 원형 */}
        <div className="absolute h-[392.578px] left-[-82.62px] top-[-29px] w-[467.285px]">
          <div className="absolute inset-[-22.39%_-18.81%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse5500} />
          </div>
        </div>
        
        {/* 장식 요소 2 - 벡터 1 */}
        <div className="absolute flex h-[212.668px] items-center justify-center left-[-35.16px] top-[54.23px] w-[427.441px]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="h-[212.668px] relative w-[427.441px]">
              <img alt="" className="block max-w-none size-full" src={imgVector833} />
            </div>
          </div>
        </div>
        
        {/* 장식 요소 3 - 벡터 2 */}
        <div className="absolute h-[181.574px] left-[-79.1px] top-[149.71px] w-[427.502px]">
          <img alt="" className="block max-w-none size-full" src={imgVector832} />
        </div>
        
        {/* 장식 요소 4 - 원형 1 */}
        <div className="absolute flex items-center justify-center left-[calc(50%-158.78px)] size-[304.117px] top-[calc(50%+98.74px)] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[215.556px]">
              <div className="absolute inset-[-23.11%_-20.39%_-17.67%_-20.39%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5499} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 장식 요소 5 - 원형 2 */}
        <div className="absolute flex items-center justify-center left-[calc(50%+146.99px)] size-[197.888px] top-[-51.56px] translate-x-[-50%]">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[140.262px]">
              <div className="absolute inset-[-6.27%_-18.8%_-14.62%_-2.09%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5498} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 중앙 로고 */}
        <div className="absolute flex flex-col items-center left-1/2 top-[calc(50%-0.15px)] translate-x-[-50%] translate-y-[-50%] w-[343px]">
          <div className="h-[52.441px] relative shrink-0 w-[148.242px]">
            <div className="absolute inset-[1.48%_82.19%_0_0]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img10} />
              </div>
            </div>
            <div className="absolute inset-[0_0_0_68.67%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img11} />
              </div>
            </div>
            <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
              <img alt="" className="block max-w-none size-full" src={img12} />
            </div>
            <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img13} />
              </div>
            </div>
            <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

