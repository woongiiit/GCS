'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/18c6630e-f781-4dbc-9603-de33adb9cc52";
const imgVector828 = "https://www.figma.com/api/mcp/asset/da42a51e-587c-4b66-b4aa-3a49215c89a2";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/b33709a9-60f9-453f-89dc-3825f1f81f27";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/3e1eb164-2658-47c7-bc61-c2ff7e016efa";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/e52ac109-4b78-49ea-951e-1516fda56e19";
const img = "https://www.figma.com/api/mcp/asset/74c56e8a-a032-463b-86d0-fcdeb5a94000";
const img1 = "https://www.figma.com/api/mcp/asset/dd5ac9ec-7654-4bf7-8938-9557012e7691";
const img2 = "https://www.figma.com/api/mcp/asset/f28dcf38-25be-475a-9058-4f053dac97a9";
const img3 = "https://www.figma.com/api/mcp/asset/0f917598-19c4-47b9-a181-40e68a8e9954";
const img4 = "https://www.figma.com/api/mcp/asset/151a9c58-c156-4e07-b7b3-bce26c241717";
const img5 = "https://www.figma.com/api/mcp/asset/262f0702-0be1-42ff-bf1a-fe02cbf94f52";

export default function FindPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(''); // 이메일 필드 관련 에러
  const [emailSuccess, setEmailSuccess] = useState(''); // 이메일 전송 성공 메시지
  const [verificationError, setVerificationError] = useState(''); // 인증번호 필드 관련 에러
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // 남은 시간 (초)

  const handleSendVerification = async () => {
    if (!email.trim() || !email.includes('@')) {
      setEmailError('올바른 이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    setEmailError('');
    setEmailSuccess('');

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'reset-password' }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationSent(true);
        setError('');
        setEmailError('');
        setEmailSuccess('인증번호가 전송되었습니다.');
        setTimeLeft(300); // 5분 = 300초
      } else {
        // 404 에러인 경우 (등록되지 않은 이메일)
        if (response.status === 404) {
          setEmailError('가입된 이메일이 없습니다.');
        } else {
          setEmailError(data.error || '인증번호 전송에 실패했습니다.');
        }
      }
    } catch (error) {
      setEmailError('인증번호 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setVerificationError('인증번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    setVerificationError('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode, type: 'reset-password' }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setIsVerified(true);
        setError('');
        setVerificationError('');
        alert('인증이 완료되었습니다. 비밀번호 재설정 페이지로 이동합니다.');
        router.push(`/resetPassword?email=${encodeURIComponent(email)}`);
      } else {
        setVerificationError(data.error || '인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setVerificationError('인증 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 타이머 효과
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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

      {/* 비밀번호 찾기 폼 카드 */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[40px] flex-[0.78] min-h-[78vh] items-center pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] w-full overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
            비밀번호 찾기
          </p>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-[48px] items-start px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {/* 아이디 (이메일) 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      아이디 (이메일)
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(''); // 입력 시 에러 메시지 초기화
                          setEmailSuccess(''); // 입력 시 성공 메시지 초기화
                        }}
                        placeholder="example@email.com"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center shrink-0 w-[35px]" />
                    </div>
                    <button 
                      onClick={handleSendVerification}
                      disabled={!email.includes('@') || isLoading || verificationSent}
                      className={`${email.includes('@') && !verificationSent ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} cursor-pointer flex items-center justify-center p-[12px] relative rounded-[12px] self-stretch shrink-0 w-[70px] hover:opacity-90 transition-opacity ${!email.includes('@') || verificationSent ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#f8f6f4] tracking-[-0.26px]">
                        {verificationSent ? '전송 완료' : '전송'}
                      </p>
                    </button>
                  </div>
                  {emailError && (
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                      {emailError}
                    </p>
                  )}
                  {emailSuccess && (
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                      {emailSuccess}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 인증번호 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      인증번호
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          setVerificationError(''); // 입력 시 에러 메시지 초기화
                        }}
                        placeholder="인증번호를 입력하세요"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[35px]">
                        {timeLeft !== null && timeLeft > 0 ? (
                          <p className="font-normal leading-[1.5] text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-nowrap">
                            {formatTime(timeLeft)}
                          </p>
                        ) : timeLeft === 0 ? (
                          <p className="font-normal leading-[1.5] text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-nowrap">
                            만료
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {verificationError && (
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                      {verificationError}
                    </p>
                  )}
                </div>
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
              onClick={handleVerify}
              disabled={!verificationCode.trim() || isLoading || isVerified}
              className={`${verificationCode.trim() && !isVerified ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity ${!verificationCode.trim() || isVerified ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                {isLoading ? '인증 중...' : isVerified ? '인증 완료' : '인증하기'}
              </p>
            </button>
            <div className="flex gap-[4px] items-start justify-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
              <p className="font-normal relative shrink-0 text-[#85817e]">
                아직 계정이 없습니까?
              </p>
              <Link href="/register" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

