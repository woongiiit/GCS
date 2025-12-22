'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/18c6630e-f781-4dbc-9603-de33adb9cc52";
const imgVector828 = "https://www.figma.com/api/mcp/asset/da42a51e-587c-4b66-b4aa-3a49215c89a2";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/b33709a9-60f9-453f-89dc-3825f1f81f27";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/3e1eb164-2658-47c7-bc61-c2ff7e016efa";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/e52ac109-4b78-49ea-951e-1516fda56e19";
const img1 = "https://www.figma.com/api/mcp/asset/dd5ac9ec-7654-4bf7-8938-9557012e7691";
const img2 = "https://www.figma.com/api/mcp/asset/f28dcf38-25be-475a-9058-4f053dac97a9";
const img3 = "https://www.figma.com/api/mcp/asset/0f917598-19c4-47b9-a181-40e68a8e9954";
const img4 = "https://www.figma.com/api/mcp/asset/151a9c58-c156-4e07-b7b3-bce26c241717";
const img5 = "https://www.figma.com/api/mcp/asset/262f0702-0be1-42ff-bf1a-fe02cbf94f52";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 비밀번호 유효성 검사
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isPasswordValid = newPassword.length > 0 && passwordRegex.test(newPassword);
  const isPasswordMatch = confirmPassword.length > 0 && newPassword === confirmPassword;

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResetPassword = async () => {
    if (!email) {
      setError('이메일이 필요합니다.');
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 검증 (8자 이상 영문, 숫자 조합)
    if (!passwordRegex.test(newPassword)) {
      setError('비밀번호는 8자 이상 영문, 숫자 조합이어야 합니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('비밀번호가 재설정되었습니다.');
        router.push('/login');
      } else {
        setError(data.error || '비밀번호 재설정에 실패했습니다.');
      }
    } catch (error) {
      setError('비밀번호 재설정 중 오류가 발생했습니다.');
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
        <div className="absolute h-[29.608px] left-1/2 top-1/2 -translate-y-1/2 translate-x-[-50%] w-[84px]">
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
        </div>
      </div>

      {/* 새 비밀번호 설정 폼 카드 */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[40px] flex-[0.78] min-h-[78vh] items-center pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] w-full overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
            새 비밀번호 설정
          </p>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-[48px] items-start px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {/* 새 비밀번호 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      새 비밀번호
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="8자 이상 영문, 숫자 조합"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[50px]">
                        <p className={`font-normal leading-[1.5] text-[13px] tracking-[-0.26px] whitespace-nowrap ${
                          isPasswordValid ? 'text-green-600' : 'text-[#fd6f22]'
                        }`}>
                          {isPasswordValid ? '가능' : '불가능'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-normal leading-[1.75] relative shrink-0 text-[10px] text-[#5f5a58] w-full whitespace-pre-wrap">
                  8자 이상 영문, 숫자 조합
                </p>
              </div>
            </div>

            {/* 비밀번호 확인 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      비밀번호 확인
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[50px]">
                        <p className={`font-normal leading-[1.5] text-[13px] tracking-[-0.26px] whitespace-nowrap ${
                          isPasswordMatch ? 'text-green-600' : 'text-[#fd6f22]'
                        }`}>
                          {isPasswordMatch ? '일치' : '불일치'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-normal leading-[1.75] relative shrink-0 text-[10px] text-[#5f5a58] w-full whitespace-pre-wrap">
                  8자 이상 영문, 숫자 조합
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 및 링크 */}
          <div className="flex flex-col gap-[32px] items-center px-[8px] py-0 relative shrink-0 w-full">
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-[12px]">
                <p className="text-[13px] text-red-600">{error}</p>
              </div>
            )}
            <button 
              onClick={handleResetPassword}
              disabled={isLoading || !newPassword.trim() || !confirmPassword.trim()}
              className={`${newPassword.trim() && confirmPassword.trim() && newPassword === confirmPassword ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                {isLoading ? '처리 중...' : '확인'}
              </p>
            </button>
            <div className="flex gap-[4px] items-start justify-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
              <p className="font-normal relative shrink-0 text-[#85817e]">
                로그인 페이지로 돌아갈까요?
              </p>
              <Link href="/login" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

