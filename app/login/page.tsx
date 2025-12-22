'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/18c6630e-f781-4dbc-9603-de33adb9cc52";
const imgVector828 = "https://www.figma.com/api/mcp/asset/da42a51e-587c-4b66-b4aa-3a49215c89a2";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/b33709a9-60f9-453f-89dc-3825f1f81f27";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/3e1eb164-2658-47c7-bc61-c2ff7e016efa";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/e52ac109-4b78-49ea-951e-1516fda56e19";
const img = "https://www.figma.com/api/mcp/asset/74c56e8a-a032-463b-86d0-fcdeb5a94000";
const imgLine316 = "https://www.figma.com/api/mcp/asset/4d6b71fb-62f5-4a36-bddd-daf14cb29224";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/4cda9006-2cd4-4454-9cfc-a3ecd8357937";
const img1 = "https://www.figma.com/api/mcp/asset/dd5ac9ec-7654-4bf7-8938-9557012e7691";
const img2 = "https://www.figma.com/api/mcp/asset/f28dcf38-25be-475a-9058-4f053dac97a9";
const img3 = "https://www.figma.com/api/mcp/asset/0f917598-19c4-47b9-a181-40e68a8e9954";
const img4 = "https://www.figma.com/api/mcp/asset/151a9c58-c156-4e07-b7b3-bce26c241717";
const img5 = "https://www.figma.com/api/mcp/asset/262f0702-0be1-42ff-bf1a-fe02cbf94f52";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 토큰을 localStorage에 저장
        if (data.token) {
          localStorage.setItem('token', data.token);
          // 커스텀 이벤트 발생하여 Header 컴포넌트에 알림
          window.dispatchEvent(new Event('loginStatusChange'));
        }
        router.push('/');
      } else {
        setError(data.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden flex flex-col">
      {/* 주황색 배경 영역 */}
      <div className="relative w-full flex-[0.22] min-h-[22vh] overflow-hidden" style={{ backgroundImage: "linear-gradient(236.47860593860838deg, rgba(253, 111, 34, 1) 1.2987%, rgba(254, 135, 57, 1) 66.571%)" }}>
        {/* 배경 장식 요소들 */}
        <div className="absolute flex h-[294.654px] items-center justify-center left-[-47.67px] top-[-22.16px] w-[522.881px]">
          <div className="flex-none rotate-[339.444deg]">
            <div className="h-[122.508px] relative w-[512.496px]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={imgVector827} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[447.702px] items-center justify-center left-[-27.92px] top-[-23.12px] w-[567.013px]">
          <div className="flex-none rotate-[333.242deg]">
            <div className="h-[242.984px] relative w-[512.496px]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={imgVector828} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[292.809px] items-center justify-center left-[106px] top-[-101px] w-[173.072px]">
          <div className="flex-none rotate-[5.928deg]">
            <div className="h-[279.328px] relative w-[145px]">
              <div className="absolute inset-[-71.6%_-137.93%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5406} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[265.695px] items-center justify-center left-[192px] top-[-20px] w-[263.094px]">
          <div className="flex-none rotate-[43.746deg]">
            <div className="h-[229px] relative w-[145px]">
              <div className="absolute inset-[-87.34%_-137.93%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5405} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[5px] size-[145px] top-[68px]">
          <div className="absolute inset-[-137.93%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse5404} />
          </div>
        </div>

        {/* 뒤로가기 버튼 - 주황색 영역 좌측 상단 */}
        <button
          onClick={() => router.back()}
          className="absolute left-[16px] top-[16px] flex items-center justify-center w-[24px] h-[24px] z-10 hover:opacity-80 transition-opacity"
          aria-label="뒤로가기"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* 로고 */}
        <button
          onClick={() => router.push('/')}
          className="absolute h-[29.608px] left-1/2 top-1/2 -translate-y-1/2 translate-x-[-50%] w-[84px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="홈으로 이동"
        >
          <div className="absolute inset-[1.48%_82.19%_0_0]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img1} />
            </div>
          </div>
          <div className="absolute inset-[0_0_0_68.67%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img2} />
            </div>
          </div>
          <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
          <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img4} />
            </div>
          </div>
          <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img5} />
            </div>
          </div>
        </button>
      </div>

      {/* 로그인 폼 카드 */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[40px] flex-[0.78] min-h-[78vh] items-center pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] w-full overflow-y-auto">
        <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
          로그인
        </p>
        <div className="flex flex-col items-center justify-end px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[48px] items-start relative shrink-0 w-full">
            {/* 입력 필드 */}
            <div className="flex flex-col gap-[16px] items-start px-[8px] py-0 relative shrink-0 w-full">
              {/* 아이디 (이메일) 필드 */}
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      아이디 (이메일)
                    </p>
                  </div>
                  <div className="border border-[#5f5a58] border-solid flex h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0 w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                    />
                    <div className="flex items-center relative shrink-0 w-[24px]">
                      <div className="opacity-0 overflow-clip relative shrink-0 size-[24px]">
                        <div className="absolute inset-[8.33%]">
                          <div className="absolute inset-0">
                            <img alt="" className="block max-w-none size-full" src={img} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 비밀번호 필드 */}
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      비밀번호
                    </p>
                  </div>
                  <div className="border border-[#5f5a58] border-solid flex h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0 w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="8자 이상의 영문,숫자 조합"
                      className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex items-center relative shrink-0 w-[24px]"
                    >
                      <div className="overflow-clip relative shrink-0 size-[24px]">
                        <div className="absolute inset-[8.33%]">
                          <div className="absolute inset-0">
                            <img alt="" className="block max-w-none size-full" src={img} />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 로그인 버튼 및 링크 */}
            <div className="flex flex-col h-[218px] items-center justify-between px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[32px] items-center relative shrink-0 w-full">
                {error && (
                  <div className="w-full p-3 bg-red-50 border border-red-200 rounded-[12px]">
                    <p className="text-[13px] text-red-600">{error}</p>
                  </div>
                )}
                <button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="bg-[#443e3c] cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                    {isLoading ? '로그인 중...' : '로그인'}
                  </p>
                </button>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px]">
                  <p className="font-normal relative shrink-0 text-[#85817e]">
                    아직 계정이 없으신가요?
                  </p>
                  <Link href="/register" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                    회원가입
                  </Link>
                </div>
              </div>
              <div className="flex gap-[24px] h-[19.44px] items-center relative shrink-0">
                <Link href="/findID" className="flex h-full items-start justify-end relative shrink-0 w-[74px] hover:opacity-80 transition-opacity">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px]">
                    아이디 찾기
                  </p>
                </Link>
                <div className="flex h-[19.44px] items-center justify-center relative shrink-0 w-0">
                  <div className="flex-none rotate-[270deg]">
                    <div className="h-0 relative w-[19.44px]">
                      <div className="absolute inset-[-0.59px_0_0_0]">
                        <img alt="" className="block max-w-none size-full" src={imgLine316} />
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/findPassword" className="flex h-full items-start relative shrink-0 w-[74px] hover:opacity-80 transition-opacity">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px]">
                    비밀번호 찾기
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
