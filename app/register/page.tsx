'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgCheck = "https://www.figma.com/api/mcp/asset/f0d8ce17-162f-4579-85d3-f6af98339c4e";
const img = "https://www.figma.com/api/mcp/asset/6beae36a-5572-4d47-bac8-eff974203718";
const img1 = "https://www.figma.com/api/mcp/asset/30ebfe4d-d9cd-49cc-9b90-c0f7be5ab4d6";
const imgVector827 = "https://www.figma.com/api/mcp/asset/357a561b-b8bb-4210-8493-f76b200a24e2";
const imgVector828 = "https://www.figma.com/api/mcp/asset/00d2467a-5d2e-4a1e-a432-ef90a15ff2bb";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/1198ad88-0245-4304-ae6d-106bf09d6b1a";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/bcd5e497-6f83-4dc9-b95a-2350ec0d2042";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/2fc990ef-debe-4780-bdbc-4966e9d9f097";
const imgLine336 = "https://www.figma.com/api/mcp/asset/c952a930-5bc5-48a1-95d0-b0f1dd19fe85";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/e035aa49-c107-43c5-a700-e04f00c7455d";
const img2 = "https://www.figma.com/api/mcp/asset/1060d2d6-c940-4925-b6ae-8c0bf85bac25";
const img3 = "https://www.figma.com/api/mcp/asset/38e39a12-4d35-4308-96dc-882dbe8f8720";
const img4 = "https://www.figma.com/api/mcp/asset/7d891adb-8246-4df5-bd4f-ae8531af7788";
const img5 = "https://www.figma.com/api/mcp/asset/53dbb1d7-30fe-4672-8bde-7d51fe367044";
const img6 = "https://www.figma.com/api/mcp/asset/cf93c7a8-cf0d-49fd-a8c4-ed69b8e8b82c";
const imgLine297 = "https://www.figma.com/api/mcp/asset/1d8d2aeb-cbd2-4408-a9a6-674a5e721eca";
const imgFluentRadioButton24Filled = "https://www.figma.com/api/mcp/asset/c43ef871-635e-44ae-b607-1582664665ae";
const imgFluentRadioButton24Regular = "https://www.figma.com/api/mcp/asset/b2b47c8a-f4b7-4e1b-974b-5a1b6c8cc7e4";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'terms' | 'info'>('terms');
  const [allAgreed, setAllAgreed] = useState(false);
  const [ageAgreed, setAgeAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // 정보입력 스텝 상태
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [memberType, setMemberType] = useState<'general' | 'major'>('general');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  // 비밀번호 유효성 검사
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isPasswordValid = password.length > 0 && passwordRegex.test(password);
  const isPasswordMatch = passwordConfirm.length > 0 && password === passwordConfirm;
  
  // API 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [nicknameError, setNicknameError] = useState(''); // 닉네임 필드 관련 에러
  const [nicknameSuccess, setNicknameSuccess] = useState(''); // 닉네임 사용 가능 메시지
  const [emailError, setEmailError] = useState(''); // 이메일 필드 관련 에러
  const [emailSuccess, setEmailSuccess] = useState(''); // 이메일 전송 성공 메시지
  const [verificationError, setVerificationError] = useState(''); // 인증번호 필드 관련 에러
  const [verificationSuccess, setVerificationSuccess] = useState(''); // 인증 완료 성공 메시지

  const handleAllAgreed = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setAgeAgreed(newValue);
    setTermsAgreed(newValue);
    setPrivacyAgreed(newValue);
  };

  // 나머지 3개 항목이 모두 체크되면 전체 동의 자동 체크
  useEffect(() => {
    if (ageAgreed && termsAgreed && privacyAgreed) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  }, [ageAgreed, termsAgreed, privacyAgreed]);

  // 모든 항목이 체크되었는지 확인
  const isAllChecked = allAgreed && ageAgreed && termsAgreed && privacyAgreed;

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // 이메일 유효성 검사
  const isEmailValid = email.includes('@') && email.length > 0;

  // 인증번호 입력 여부
  const isVerificationCodeEntered = verificationCode.length > 0;

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.');
      setNicknameSuccess('');
      return;
    }

    setIsLoading(true);
    setNicknameError('');
    setNicknameSuccess('');

    try {
      const response = await fetch('/api/auth/check-nickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });

      const data = await response.json();

      if (response.ok && data.available) {
        setNicknameChecked(true);
        setNicknameError('');
        setNicknameSuccess('사용 가능한 닉네임입니다.');
      } else {
        setNicknameChecked(false);
        setNicknameError(data.message || '이미 사용 중인 닉네임입니다.');
        setNicknameSuccess('');
      }
    } catch (error) {
      setNicknameChecked(false);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setNicknameSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 전송
  const handleSendVerification = async () => {
    if (!isEmailValid) {
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
        body: JSON.stringify({ email, type: 'register' }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationSent(true);
        setError('');
        setEmailError('');
        setEmailSuccess('인증번호가 전송되었습니다.');
      } else {
        // 409 에러인 경우 (이미 사용 중인 이메일)
        if (response.status === 409) {
          setEmailError('이미 사용 중인 이메일입니다.');
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

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setVerificationError('인증번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    setVerificationError('');
    setVerificationSuccess('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode, type: 'register' }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setEmailVerified(true);
        setError('');
        setVerificationError('');
        setVerificationSuccess('인증이 완료되었습니다.');
      } else {
        setVerificationError(data.error || '인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setVerificationError('인증번호 확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입
  const handleRegister = async () => {
    // 유효성 검사
    if (!nickname.trim() || !name.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (!nicknameChecked) {
      setError('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (!emailVerified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (memberType === 'major' && (!studentId.trim() || !major.trim())) {
      setError('전공 회원은 학번과 전공을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          nickname,
          name,
          phone: phone.replace(/-/g, ''), // 하이픈 제거
          memberType,
          studentId: memberType === 'major' ? studentId : null,
          major: memberType === 'major' ? major : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        router.push('/login');
      } else {
        // 409 에러인 경우 (이미 사용 중인 이메일)
        if (response.status === 409) {
          setEmailError('이미 사용 중인 이메일입니다.');
        } else {
          setError(data.error || '회원가입에 실패했습니다.');
        }
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isTermsModalOpen || isPrivacyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTermsModalOpen, isPrivacyModalOpen]);

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
              <img alt="" className="block max-w-none size-full" src={img2} />
            </div>
          </div>
          <div className="absolute inset-[0_0_0_68.67%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img3} />
            </div>
          </div>
          <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
            <img alt="" className="block max-w-none size-full" src={img4} />
          </div>
          <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img5} />
            </div>
          </div>
          <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={img6} />
            </div>
          </div>
        </button>
      </div>

      {/* 회원가입 폼 카드 */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[40px] flex-[0.78] min-h-[78vh] items-center pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] w-full overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-center relative shrink-0 w-full">
          {step === 'info' && (
            <button
              onClick={() => setStep('terms')}
              className="absolute left-[16px] flex items-center justify-center w-[24px] h-[24px] hover:opacity-80 transition-opacity"
              aria-label="뒤로가기"
            >
              <svg
                className="w-6 h-6 text-[#2a2a2e]"
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
          )}
          <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
            회원가입
          </p>
        </div>

        {step === 'terms' ? (
        /* 약관 동의 영역 */
        <div className="flex flex-col items-center justify-end px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[48px] items-start relative shrink-0 w-full">
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* 약관 전체 동의 */}
                  <button
                    onClick={handleAllAgreed}
                    className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full"
                  >
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${allAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {allAgreed && (
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
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          약관 전체 동의
                        </p>
                      </div>
                    </div>
                  </button>
                  {/* 구분선 */}
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine336} />
                    </div>
                  </div>
                  {/* 만 14세 이상 */}
                  <button
                    onClick={() => setAgeAgreed(!ageAgreed)}
                    className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full"
                  >
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${ageAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {ageAgreed && (
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
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 만 14세 이상입니다.
                        </p>
                      </div>
                    </div>
                  </button>
                  {/* 홈페이지 이용약관 동의 */}
                  <div className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full">
                    <button
                      onClick={() => setTermsAgreed(!termsAgreed)}
                      className="block cursor-pointer relative shrink-0 size-[24px]"
                    >
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${termsAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {termsAgreed && (
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
                    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                      <div className="flex flex-[1_0_0] h-full items-center relative shrink-0">
                        <p className="flex-[1_0_0] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 홈페이지 이용약관 동의
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsTermsModalOpen(true)}
                      className="flex items-center justify-center relative shrink-0 cursor-pointer p-1 hover:opacity-70 transition-opacity"
                      aria-label="이용약관 보기"
                    >
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <div className="relative size-[16.667px]">
                          <div className="absolute contents left-[7.5px] top-[4.17px]">
                            <div className="absolute flex h-[11.667px] items-center justify-center left-[7.5px] top-[4.17px] w-[5px]">
                              <div className="flex-none rotate-[270deg]">
                                <div className="h-[5px] relative w-[11.667px]">
                                  <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                                    <img alt="" className="block max-w-none size-full" src={img1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  {/* 개인정보 수집·이용 동의 */}
                  <div className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full">
                    <button
                      onClick={() => setPrivacyAgreed(!privacyAgreed)}
                      className="block cursor-pointer relative shrink-0 size-[24px]"
                    >
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${privacyAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {privacyAgreed && (
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
                    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                      <div className="flex flex-[1_0_0] h-full items-center relative shrink-0">
                        <p className="flex-[1_0_0] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 개인정보 수집·이용 동의
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsPrivacyModalOpen(true)}
                      className="flex items-center justify-center relative shrink-0 cursor-pointer p-1 hover:opacity-70 transition-opacity"
                      aria-label="개인정보 수집·이용 동의 보기"
                    >
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <div className="relative size-[16.667px]">
                          <div className="absolute contents left-[7.5px] top-[4.17px]">
                            <div className="absolute flex h-[11.667px] items-center justify-center left-[7.5px] top-[4.17px] w-[5px]">
                              <div className="flex-none rotate-[270deg]">
                                <div className="h-[5px] relative w-[11.667px]">
                                  <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                                    <img alt="" className="block max-w-none size-full" src={img1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 다음 버튼 */}
            <div className="flex flex-col items-center justify-between relative shrink-0 w-full">
              <div className="flex flex-col items-center px-[8px] py-0 relative shrink-0 w-full">
                <button 
                  onClick={() => {
                    if (isAllChecked) {
                      setStep('info');
                    }
                  }}
                  className={`${isAllChecked ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity ${!isAllChecked ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={!isAllChecked}
                >
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                    다음
                  </p>
                </button>
              </div>
              <div className="h-[19.44px] shrink-0 w-[74px]" />
            </div>
          </div>
        </div>
        ) : (
        /* 정보입력 스텝 */
        <div className="flex flex-col items-center justify-end px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[68px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-[32px] items-center px-[8px] py-0 relative shrink-0 w-full">
              {/* 회원정보 */}
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#5f5a58] w-full">
                  회원정보
                </p>
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* 닉네임 */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          닉네임
                        </p>
      </div>
                      <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => {
                            setNickname(e.target.value);
                            // 닉네임 변경 시 메시지 초기화
                            setNicknameError('');
                            setNicknameSuccess('');
                            setNicknameChecked(false);
                          }}
                          className="border border-[#5f5a58] border-solid flex-1 h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                        />
                        <button 
                          onClick={handleCheckNickname}
                          disabled={isLoading || !nickname.trim()}
                          className={`${
                            nickname.trim() 
                              ? 'bg-[#443e3c]' 
                              : 'bg-[#c9c1b7]'
                          } flex items-center justify-center px-[12px] h-[48px] rounded-[12px] shrink-0 w-[85px] hover:opacity-90 transition-opacity ${!nickname.trim() ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          <p className="font-normal leading-[1.5] text-[13px] text-[#f8f6f4] tracking-[-0.26px] whitespace-nowrap">
                            중복 확인
                          </p>
                        </button>
                      </div>
                      {/* 닉네임 메시지 */}
                      <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                        {nicknameError && (
                          <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                            {nicknameError}
                          </p>
                        )}
                        {nicknameSuccess && (
                          <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                            {nicknameSuccess}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 이름 */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          이름
                        </p>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-[#5f5a58] border-solid w-full h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* 전화번호 */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          전화번호
                        </p>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="border border-[#5f5a58] border-solid w-full h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine297} />
                </div>
              </div>
              {/* 회원유형 */}
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#5f5a58] w-full">
                  회원유형
                </p>
                <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                  <button
                    onClick={() => setMemberType('general')}
                    className="flex items-center justify-center relative shrink-0"
                  >
                    <img
                      alt=""
                      className="block max-w-none size-[16px]"
                      src={memberType === 'general' ? imgFluentRadioButton24Filled : imgFluentRadioButton24Regular}
                    />
                  </button>
                  <div className="flex items-center justify-center relative shrink-0">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      일반 회원
                    </p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                  <button
                    onClick={() => setMemberType('major')}
                    className="flex items-center justify-center relative shrink-0"
                  >
                    <img
                      alt=""
                      className="block max-w-none size-[16px]"
                      src={memberType === 'major' ? imgFluentRadioButton24Filled : imgFluentRadioButton24Regular}
                    />
                  </button>
                  <div className="flex items-center justify-center relative shrink-0">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      전공 회원
                    </p>
                  </div>
                </div>
                {/* 전공 회원 선택 시 학번, 전공 입력란 표시 */}
                {memberType === 'major' && (
                  <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    {/* 학번 */}
                    <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                      <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                        <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                          <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                            학번
                          </p>
                        </div>
                        <input
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="border border-[#5f5a58] border-solid w-full h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                        />
                      </div>
                    </div>
                    {/* 전공 */}
                    <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                      <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                        <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                          <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                            전공
                          </p>
                        </div>
                        <input
                          type="text"
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          className="border border-[#5f5a58] border-solid w-full h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine297} />
                </div>
              </div>
              {/* ID/PW */}
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[17px] text-[#5f5a58] w-full">
                  ID/PW
                </p>
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* 아이디 (이메일) */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          아이디 (이메일)
                        </p>
                      </div>
                      <div className="flex items-center justify-between relative shrink-0 w-full">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(''); // 입력 시 에러 메시지 초기화
                            setEmailSuccess(''); // 입력 시 성공 메시지 초기화
                          }}
                          className="border border-[#5f5a58] border-solid h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none w-[228px]"
                        />
                        <button 
                          onClick={handleSendVerification}
                          disabled={!isEmailValid || isLoading || verificationSent}
                          className={`${isEmailValid && !verificationSent ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} flex h-[48px] items-center justify-center px-[12px] rounded-[12px] shrink-0 hover:opacity-90 transition-opacity ${!isEmailValid || verificationSent ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          <p className="font-normal leading-[1.5] text-[13px] text-[#f8f6f4] text-center tracking-[-0.26px]">
                            {verificationSent ? '전송 완료' : '인증번호 전송'}
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
                  {/* 인증번호 */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          인증번호
                        </p>
                      </div>
                      <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => {
                            setVerificationCode(e.target.value);
                            setVerificationError(''); // 입력 시 에러 메시지 초기화
                            setVerificationSuccess(''); // 입력 시 성공 메시지 초기화
                          }}
                          className="border border-[#5f5a58] border-solid flex-1 h-[48px] px-[12px] rounded-[12px] text-[13px] text-[#5f5a58] tracking-[-0.26px] focus:outline-none"
                        />
                        <button 
                          onClick={handleVerifyCode}
                          disabled={!isVerificationCodeEntered || isLoading || emailVerified}
                          className={`${isVerificationCodeEntered && !emailVerified ? 'bg-[#443e3c]' : 'bg-[#c9c1b7]'} flex items-center justify-center px-[12px] h-[48px] rounded-[12px] shrink-0 w-[85px] hover:opacity-90 transition-opacity ${!isVerificationCodeEntered || emailVerified ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          <p className="font-normal leading-[1.5] text-[13px] text-[#f8f6f4] tracking-[-0.26px] whitespace-nowrap">
                            {emailVerified ? '확인 완료' : '확인'}
                          </p>
                        </button>
                      </div>
                      {verificationError && (
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                          {verificationError}
                        </p>
                      )}
                      {verificationSuccess && (
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#fd6f22] tracking-[-0.26px]">
                          {verificationSuccess}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 비밀번호 */}
                  <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                    <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                      <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          비밀번호
                        </p>
                      </div>
                      <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                        <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                  </div>
                  {/* 비밀번호 확인 */}
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
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="8자 이상 영문, 숫자 조합"
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
                  </div>
                </div>
              </div>
            </div>
            {/* 회원가입 버튼 */}
            <div className="flex flex-col items-center px-[8px] py-0 relative shrink-0 w-full">
              {error && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px]">
                  <p className="text-[13px] text-red-600">{error}</p>
                </div>
              )}
              <div className="flex flex-col items-center relative shrink-0 w-full">
                <button 
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="bg-[#443e3c] flex items-center justify-center p-[16px] rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                    {isLoading ? '처리 중...' : '회원가입'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* 이용약관 모달 */}
      {isTermsModalOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setIsTermsModalOpen(false)}
            aria-hidden="true"
          />

          {/* 모달 컨텐츠 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[12px] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-lg">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="font-bold text-[18px] text-[#443e3c]">홈페이지 이용약관</h2>
                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="p-1 hover:opacity-70 transition-opacity"
                  aria-label="닫기"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 모달 본문 */}
              <div className="flex-1 overflow-y-auto p-4 text-[13px] text-[#5f5a58] leading-[1.6]">
                <div className="whitespace-pre-wrap">
                  <h3 className="font-bold text-[15px] mb-2 mt-4">제 1 장 총칙</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 1 조 (목적)</h4>
                  <p className="mb-3">
                    본 약관은 안북스 스튜디오(이하 "회사")가 인터넷 사이트(https://gcsweb.kr)를 통하여 제공하는 회원 서비스, 크라우드펀딩 서비스, 스토어 서비스 등 제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 2 조 (약관의 효력과 변경)</h4>
                  <p className="mb-2">
                    당 사이트는 이용자가 본 약관 내용에 동의하는 것을 조건으로 이용자에게 서비스를 제공하며, 당 사이트의 서비스 제공 행위 및 이용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용하겠습니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 변경된 약관은 당 사이트 내에 공지함으로써 이용자가 직접 확인하도록 할 것입니다. 이용자가 변경된 약관에 동의하지 아니하는 경우 본인의 회원등록을 취소(회원 탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 3 조 (약관외 준칙)</h4>
                  <p className="mb-3">
                    본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신윤리위원회심의규정, 정보통신윤리강령, 저작권법 및 기타 관련 법령의 규정에 의합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 4 조 (용어의 정의)</h4>
                  <p className="mb-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>이용자 : 본 약관에 따라 당 사이트가 제공하는 서비스를 받는 자</li>
                    <li>회원 : 당 사이트에 개인 정보를 제공하여 회원 등록을 한 자로서, 당 사이트의 정보 및 서비스를 이용할 수 있는 자</li>
                    <li>아이디 : 당 사이트 회원가입 시 발급받은 회원의 신분을 증명하는 고유 코드</li>
                    <li>비밀번호 : 아이디에 대한 본인 여부를 확인하기 위하여 사용하는 문자, 숫자, 특수 문자등의 조합</li>
                    <li>가입 : 회원가입 시 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위</li>
                    <li>탈퇴 : 회원이 이용계약을 종료시키는 행위</li>
                  </ul>
                  <p className="mb-3">
                    본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-2 mt-4">제 2 장 서비스 제공 및 이용</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 5 조 (이용 계약의 성립)</h4>
                  <p className="mb-2">
                    이용계약은 이용자가 온라인으로 당 사이트에서 제공하는 이용계약 신청서를 작성하여 가입을 완료하는 것으로 성립됩니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 다음 각 호에 해당하는 경우에 가입을 취소할 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>다른 사람의 명의를 사용하여 신청한 경우</li>
                    <li>이용계약 신청서의 내용을 허위로 기재하였거나 신청한 경우</li>
                    <li>사회의 안녕 질서 혹은 미풍양속을 저해할 목적으로 신청한 경우</li>
                    <li>다른 사람의 당 사이트 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 한 경우</li>
                    <li>당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 한 경우</li>
                    <li>기타 당 사이트가 정한 이용신청요건이 미비한 경우</li>
                  </ul>
                  <p className="mb-2">
                    당 사이트는 다음 각 호에 해당하는 경우 그 사유가 소멸될 때까지 이용계약 성립을 유보할 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>서비스 관련 제반 용량이 부족한 경우</li>
                    <li>기술상 장애 사유가 있는 경우</li>
                  </ul>
                  <p className="mb-3">
                    당 사이트가 제공하는 서비스는 자체 개발하거나 다른 기관과의 협의 등을 통해 제공하는 일체의 서비스를 말하는 것이며, 그 내용을 변경할 경우에는 이용자에게 공지한 후 변경하여 제공할 수 있습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 6 조 (회원정보 사용에 대한 동의)</h4>
                  <p className="mb-2">
                    회원의 개인정보는 개인정보보호법에 의해 보호되며 개별 사이트의 개인정보처리방침이 적용됩니다.
                  </p>
                  <p className="mb-2">
                    당 사이트의 회원 정보는 다음과 같이 수집, 사용, 관리, 보호됩니다.
                  </p>
                  <p className="mb-1"><strong>개인정보의 수집</strong> : 당 사이트는 회원가입 시 회원이 제공하는 정보를 수집합니다.</p>
                  <p className="mb-1"><strong>개인정보의 사용</strong> : 당 사이트는 서비스 제공과 관련해서 수집된 회원정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 방송통신심의위원회의 요청이 있는 경우 또는 기타 법령에서 정한 절차에 따른 요청이 있는 경우, 회원이 당 사이트에 제공한 개인정보를 스스로 공개한 경우에는 그러하지 않습니다.</p>
                  <p className="mb-1"><strong>개인정보의 관리</strong> : 회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수 있습니다. 수신되는 정보 중 불필요하다고 생각되는 부분도 변경/조정할 수 있습니다.</p>
                  <p className="mb-3"><strong>개인정보의 보호</strong> : 회원의 개인정보는 오직 회원만이 열람/수정/삭제할 수 있으며, 이는 전적으로 회원의 아이디와 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 아이디와 비밀번호를 알려주어서는 아니 되며, 작업 종료 시에는 반드시 로그아웃 해주시고, 웹 브라우저의 창을 닫아주시기 바랍니다(이는 타인과 컴퓨터를 공유하는 인터넷 카페나 도서관 같은 공공장소에서 컴퓨터를 사용하는 경우에 회원의 정보의 보호를 위하여 필요한 사항입니다.)</p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 7 조 (회원의 정보 보안)</h4>
                  <p className="mb-2">
                    가입 신청자가 당 사이트 서비스 가입 절차를 완료하는 순간부터 회원은 입력한 정보의 비밀을 유지할 책임이 있으며, 회원이 본인의 아이디와 비밀번호를 타인에게 제공하여 발생하는 모든 결과에 대한 책임은 본인에게 있습니다.
                  </p>
                  <p className="mb-2">
                    회원은 본인의 아이디와 비밀번호를 타인에게 누설하지 않을 책임이 있으며, 회원의 아이디나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 당 사이트에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든 책임은 회원 본인에게 있습니다.
                  </p>
                  <p className="mb-3">
                    회원은 당 사이트 서비스의 사용 종료 시마다 정확히 접속을 종료하도록 해야 하며, 정확히 종료하지 아니함으로써 제3자가 이용자 또는 회원에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 당 사이트는 책임을 부담하지 아니합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 8 조 (서비스 이용시간)</h4>
                  <p className="mb-2">
                    서비스 이용시간은 당 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.
                  </p>
                  <p className="mb-3">
                    제1항의 이용시간은 정기점검 등의 필요로 인하여 당 사이트가 정한 날 또는 시간 및 예기치 않은 사건사고로 인한 시간은 예외로 합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 9 조 (서비스의 중지 및 정보의 저장과 사용)</h4>
                  <p className="mb-2">
                    당 사이트 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, 당 사이트의 관리 범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 당 사이트는 관련 책임을 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트가 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전의 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 이용자가 고지내용을 인지하지 못한 데 대하여 당 사이트는 책임을 부담하지 아니합니다. 부득이한 사정이 있을 경우 위 사전 고지기간은 감축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 당 사이트는 책임을 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항에 의거합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 이용자 또는 제3자에게 어떠한 책임도 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 이용자가 본 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 제한 및 중지할 수 있습니다. 이 경우 당 사이트는 위 이용자의 접속을 금지할 수 있습니다.
                  </p>
                  <p className="mb-3">
                    장기간 휴면 이용자인 경우 안내 메일 또는 공지사항 발표 후 1주일간의 통지 기간을 거쳐 서비스 사용을 중지할 수 있습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 10 조 (서비스의 변경 및 해지)</h4>
                  <p className="mb-2">
                    당 사이트는 이용자가 서비스를 이용하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않으며, 회원이 당 사이트에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의, 과실에 의한 손해에 대하여 책임을 부담하지 아니합니다.
                  </p>
                  <p className="mb-3">
                    회원을 탈퇴하고자 하는 경우에는 당 사이트 로그인 후 회원탈퇴 절차에 따라 해지할 수 있으며, 통합회원으로서 이용 가능한 모든 통계정보 사이트의 회원 서비스로부터 동시에 해지됩니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 11 조 (정보 제공 및 홍보물 게재)</h4>
                  <p className="mb-2">
                    당 사이트는 서비스를 운영함에 있어서 각종 정보를 사이트에 게재하는 방법 등으로 회원에게 제공할 수 있습니다.
                  </p>
                  <p className="mb-3">
                    당 사이트는 서비스에 적절하다고 판단하거나 활용 가능성 있는 홍보물을 게재할 수 있습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제12조 (게시물의 저작권)</h4>
                  <p className="mb-2">
                    이용자가 게시한 게시물의 내용에 대한 권리는 이용자에게 있습니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 게시된 내용을 사전 통지 없이 편집, 이동할 수 있는 권리를 보유하며, 다음의 경우 사전 통지 없이 삭제할 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>본 이용약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우</li>
                    <li>다른 이용자 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우</li>
                    <li>공공질서 및 미풍양속에 위반되는 내용인 경우</li>
                    <li>범죄적 행위에 결부된다고 인정되는 내용일 경우</li>
                    <li>제3자의 저작권 등 기타 권리를 침해하는 내용인 경우</li>
                    <li>기타 관계 법령에 위배되는 경우</li>
                  </ul>
                  <p className="mb-3">
                    이용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민·형사상의 책임은 전적으로 이용자가 부담하여야 합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 13 조 (이용자의 행동규범 및 서비스 이용제한)</h4>
                  <p className="mb-2">
                    이용자가 제공하는 정보의 내용이 허위인 것으로 판명되거나, 그러하다고 의심할 만한 합리적인 사유가 발생한 경우 당 사이트는 이용자의 본 서비스 사용을 일부 또는 전부 중지할 수 있으며, 이로 인해 발생하는 불이익에 대해 책임을 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    이용자가 당 사이트 서비스를 통하여 게시, 전송, 입수하였거나 전자메일 기타 다른 수단에 의하여 게시, 전송 또는 입수한 모든 형태의 정보에 대하여는 이용자가 모든 책임을 부담하며 당 사이트는 어떠한 책임도 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 당 사이트가 제공한 서비스가 아닌 가입자 또는 기타 유관기관이 제공하는 서비스의 내용상의 정확성, 완전성 및 질에 대하여 보장하지 않습니다. 따라서 당 사이트는 이용자가 위 내용을 이용함으로 인하여 입게 된 모든 종류의 손실이나 손해에 대하여 책임을 부담하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    이용자는 본 서비스를 통하여 다음과 같은 행동을 하지 않는데 동의합니다.
                  </p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>타인의 아이디(ID)와 비밀번호를 도용하는 행위</li>
                    <li>저속, 음란, 모욕적, 위협적이거나 타인의 프라이버시를 침해할 수 있는 내용을 전송, 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위</li>
                    <li>서비스를 통하여 전송된 내용의 출처를 위장하는 행위</li>
                    <li>법률, 계약에 의하여 이용할 수 없는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위</li>
                    <li>타인의 특허, 상표, 영업비밀, 저작권, 기타 지적재산권을 침해하는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위</li>
                    <li>당 사이트의 승인을 받지 아니한 광고, 판촉물, 정크메일, 스팸, 행운의 편지, 피라미드 조직 기타 다른 형태의 권유를 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위</li>
                    <li>다른 이용자의 개인정보를 수집 또는 저장하는 행위</li>
                  </ul>
                  <p className="mb-2">
                    당 사이트는 이용자가 본 약관을 위배했다고 판단되면 서비스와 관련된 모든 정보를 이용자의 동의 없이 삭제할 수 있습니다.
                  </p>
                  <p className="mb-2">
                    1항의 규정에 의하여 서비스의 제한을 받게 된 이용자가 위 조치에 대한 이의가 있을 경우에는 이의신청을 할 수 있으나 서비스 제한 시 삭제된 이용자의 데이터에 대해서는 책임지지 아니합니다.
                  </p>
                  <p className="mb-3">
                    당 사이트는 제6항의 규정에 의한 이의신청에 대하여 그 확인이 완료될 때까지 이용제한을 연기할 수 있습니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-2 mt-4">제 3 장 의무 및 책임</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 14 조 (당 사이트의 의무)</h4>
                  <p className="mb-2">
                    당 사이트는 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 노력할 의무가 있습니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 회원의 개인 신상 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않습니다. 다만, 전기통신관련법령 등 관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다.
                  </p>
                  <p className="mb-2">
                    당 사이트는 이용자가 안전하게 당 사이트 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함) 보호를 위한 보안시스템을 갖추어야 합니다.
                  </p>
                  <p className="mb-3">
                    당 사이트는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 15 조 (이용자의 의무)</h4>
                  <p className="mb-2">
                    회원 가입 시에 요구되는 정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가 정확한 정보가 되도록 유지ㆍ갱신하여야 하며, 회원은 자신의 아이디 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다.
                  </p>
                  <p className="mb-2">
                    이용자는 당 사이트의 사전 승낙 없이 서비스를 이용하여 어떠한 영리행위도 할 수 없습니다. 단 개별 사이트에서 별도로 정하는 경우에는 예외로 합니다.
                  </p>
                  <p className="mb-2">
                    회원은 당 사이트의 서비스를 이용하여 얻은 정보를 각 사이트의 사전승낙 없이 복사, 복제, 변경, 번역, 출 판·방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다. 단, 개별사이트에서 별도로 정하는 경우에는 예외로 합니다.
                  </p>
                  <p className="mb-2">
                    이용자는 당 사이트 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다.
                  </p>
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    <li>다른 회원의 ID를 부정 사용하는 행위</li>
                    <li>범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위</li>
                    <li>선량한 풍속, 기타 사회질서를 해하는 행위</li>
                    <li>타인의 명예를 훼손하거나 모욕하는 행위</li>
                    <li>타인의 지적재산권 등의 권리를 침해하는 행위</li>
                    <li>해킹행위 또는 컴퓨터바이러스의 유포행위</li>
                    <li>타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위</li>
                    <li>서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위</li>
                    <li>당 사이트에 게시된 정보의 변경</li>
                    <li>기타 전기통신법 제53조와 전기통신사업법 시행령 16조(불온통신), 통신사업법 제53조 3항에 위배되는 행위</li>
                  </ul>

                  <h3 className="font-bold text-[15px] mb-2 mt-4">제 4 장 기 타</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 16 조 (당 사이트의 소유권)</h4>
                  <p className="mb-2">
                    당 사이트가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스 명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 당 사이트에 소유권이 있습니다.
                  </p>
                  <p className="mb-3">
                    이용자는 명시적으로 승인받거나 개별 사이트에서 별도로 정하는 경우를 제외하고는 제1항의 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정 행위, 상업적 이용 행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 17 조 (양도금지)</h4>
                  <p className="mb-3">
                    회원이 서비스의 이용권한, 기타 이용계약 상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 18 조 (손해배상)</h4>
                  <p className="mb-3">
                    당 사이트는 무료로 제공되는 서비스와 관련하여 이용자에게 어떠한 손해가 발생하더라도 당 사이트가 고의로 행한 범죄행위를 제외하고 이에 대하여 책임을 부담하지 아니합니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 19 조 (면책조항)</h4>
                  <p className="mb-2">
                    당 사이트는 서비스에 표출된 어떠한 의견이나 정보에 대해 확신이나 대표할 의무가 없으며 회원이나 제3자에 의해 표출된 의견을 승인하거나 반대하거나 수정하지 않습니다. 당 사이트는 어떠한 경우라도 이용자가 서비스에 담긴 정보에 의존해 얻은 이득이나 입은 손해에 대해 책임이 없습니다.
                  </p>
                  <p className="mb-3">
                    당 사이트는 이용자간 또는 이용자와 제3자간에 서비스를 매개로 하여 물품거래 혹은 금전적 거래 등과 관련하여 어떠한 책임도 부담하지 아니하고, 이용자가 서비스의 이용과 관련하여 기대하는 이익에 관하여 책임을 부담하지 않습니다.
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">제 20 조 (관할법원)</h4>
                  <p className="mb-3">
                    본 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우 대전지방법원을 전속적 관할 법원으로 합니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-2 mt-4">부 칙</h3>
                  <p className="mb-2">
                    [시행일] 본 약관은 2018년 11월 22일부터 시행됩니다.
                  </p>
                  <p className="mb-3">
                    개정된 약관의 적용일자 이전 이용자 또는 회원은 개정된 이용약관의 적용을 받습니다.
                  </p>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="flex items-center justify-end p-4 border-t border-gray-200">
                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="bg-[#c9c1b7] text-white px-6 py-2 rounded-[12px] hover:opacity-90 transition-opacity font-normal text-[15px]"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 개인정보 수집·이용 동의 모달 */}
      {isPrivacyModalOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setIsPrivacyModalOpen(false)}
            aria-hidden="true"
          />

          {/* 모달 컨텐츠 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[12px] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-lg">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="font-bold text-[18px] text-[#443e3c]">개인정보 수집 및 이용 동의서</h2>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-1 hover:opacity-70 transition-opacity"
                  aria-label="닫기"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 모달 본문 */}
              <div className="flex-1 overflow-y-auto p-4 text-[13px] text-[#5f5a58] leading-[1.6]">
                <div className="whitespace-pre-wrap">
                  <h3 className="font-bold text-[15px] mb-3 mt-2">1. 개인정보의 수집 및 이용 목적</h3>
                  <p className="mb-3">
                    본 서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                  </p>
                  <p className="mb-3">
                    <strong>수집 및 이용 목적</strong>: 기획혁신본부장 공모에 필요한 사항(응시원서 접수, 선발전형, 자격증빙 확인, 지원자의 시험성적 확인, 경력사항 증빙 등) 및 외부공모 과정 진행
                  </p>

                  <h3 className="font-bold text-[15px] mb-3 mt-4">2. 수집하는 개인정보의 항목</h3>
                  <p className="mb-2">
                    원활한 서비스 제공 및 심사를 위해 필요한 최소한의 범위 내에서 다음의 개인정보를 수집하고 있습니다.
                  </p>
                  <p className="mb-2"><strong>[필수항목]</strong>: 성명(한글/한자/영문), 생년월일, 연락처, 전자우편, 주소, 병역사항, 증명사진, 경력사항, 자격증 취득여부</p>
                  <p className="mb-3"><strong>[선택항목]</strong>: 보훈대상, 장애 관련 사항, 자격사항, 사회경험, 경력사항 등 입사에 필요한 일반 정보</p>

                  <h3 className="font-bold text-[15px] mb-3 mt-4">3. 개인정보의 보유 및 이용 기간</h3>
                  <p className="mb-2">
                    <strong>보유 기간</strong>: 입사지원자의 개인정보 수집ㆍ이용에 관한 동의일로부터 채용절차 종료 시까지 보유 및 이용합니다.
                  </p>
                  <p className="mb-3">
                    <strong>예외 사항</strong>: 단, 채용절차 종료 후에는 고용계약 유지, 민원처리, 분쟁해결 및 법령상 의무이행 등을 위하여 1년간 보유하게 됩니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-3 mt-4">4. 동의를 거부할 권리 및 불이익</h3>
                  <p className="mb-2">
                    이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
                  </p>
                  <p className="mb-2">
                    <strong>필수항목</strong>: 필수정보의 수집ㆍ이용에 관한 동의는 외부공모 진행을 위해 필수적이므로, 동의하지 않을 경우 심사 및 계약 체결이 불가능합니다.
                  </p>
                  <p className="mb-3">
                    <strong>선택항목</strong>: 선택항목 제공 동의를 거부할 권리가 있으며, 동의를 거부하더라도 기본 서비스 이용에는 제한이 없으나 원활한 심사가 어려워 공모 접수에 제한을 받을 수 있습니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-3 mt-4">민감정보 수집 및 이용 동의 (해당 시)</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">1. 수집 및 이용 목적</h4>
                  <p className="mb-3">
                    한국저작권위원회 외부공모 심사, 선발 시 우대사항 적용 참고 자료
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">2. 수집하는 민감정보 항목</h4>
                  <p className="mb-3">
                    보훈대상, 장애 관련 사항
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">3. 보유 및 이용 기간</h4>
                  <p className="mb-3">
                    1년
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">4. 동의 거부 권리</h4>
                  <p className="mb-3">
                    지원자는 민감정보 처리에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부하는 경우 원활한 공모 심사를 할 수 없어 공모 접수에 제한을 받을 수 있습니다.
                  </p>

                  <h3 className="font-bold text-[15px] mb-3 mt-4">개인정보의 제3자 제공에 대한 동의</h3>
                  
                  <h4 className="font-semibold text-[14px] mb-1 mt-3">1. 제공받는 자</h4>
                  <p className="mb-3">
                    외부공모 관련 경력사항에 대한 증명서 발급기관
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">2. 제공받는 자의 이용 목적</h4>
                  <p className="mb-3">
                    지원자 제출정보의 검증
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">3. 제공하는 개인정보 항목</h4>
                  <p className="mb-3">
                    성명, 경력사항
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">4. 보유 및 이용 기간</h4>
                  <p className="mb-3">
                    1년 (제공받는 자는 이용목적 달성 후 개인정보 보호법 등에 따라 기록, 보관, 파기합니다.)
                  </p>

                  <h4 className="font-semibold text-[14px] mb-1 mt-3">5. 동의 거부 권리</h4>
                  <p className="mb-3">
                    지원자는 제3자 제공 동의를 거부할 권리가 있습니다. 다만, 동의를 거부하는 경우 원활한 공모 심사를 할 수 없어 공모 접수에 제한을 받을 수 있습니다.
                  </p>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="flex items-center justify-end p-4 border-t border-gray-200">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="bg-[#c9c1b7] text-white px-6 py-2 rounded-[12px] hover:opacity-90 transition-opacity font-normal text-[15px]"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

