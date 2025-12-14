'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// 이미지 URL 상수들 (필요한 경우 사용)
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgLine297 = "https://www.figma.com/api/mcp/asset/5e10da2b-0f1e-4812-ba4a-01b06bc19bcb";

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
        마이페이지
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function MyPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('닉네임');
  const [memberType, setMemberType] = useState<'general' | 'major' | 'admin'>('general');
  const [notificationCount, setNotificationCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      // 토큰이 없거나 빈 문자열이면 로그인 페이지로 리다이렉트
      if (!token || token.trim() === '') {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      // 토큰 유효성 검증 (JWT 형식 확인)
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          // 유효하지 않은 토큰 형식
          localStorage.removeItem('token');
          window.dispatchEvent(new Event('loginStatusChange'));
          router.push('/login');
          return;
        }

        // 토큰의 payload 부분 디코딩하여 만료 시간 확인
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          // 토큰이 만료됨
          localStorage.removeItem('token');
          window.dispatchEvent(new Event('loginStatusChange'));
          router.push('/login');
          return;
        }
      } catch (error) {
        // 토큰 파싱 오류 (유효하지 않은 토큰)
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('loginStatusChange'));
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setNickname(data.user.nickname);
          setMemberType(data.user.memberType as 'general' | 'major' | 'admin');
          setNotificationCount(data.notificationCount || 0);
          setLikeCount(data.likeCount || 0);
          setProfileImage(data.user.profileImage || null);
        } else {
          if (response.status === 401) {
            // 인증 실패 시 토큰 제거 및 Header 업데이트
            localStorage.removeItem('token');
            window.dispatchEvent(new Event('loginStatusChange'));
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('프로필 정보 가져오기 오류:', error);
        // 오류 발생 시에도 토큰 제거 및 로그인 페이지로 리다이렉트
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('loginStatusChange'));
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const getMemberTypeText = () => {
    switch (memberType) {
      case 'general':
        return '일반 회원';
      case 'major':
        return '전공 회원';
      case 'admin':
        return '관리자';
      default:
        return '일반 회원';
    }
  };

  const handleProfileImageClick = () => {
    setShowUploadModal(true);
  };

  const handleAlbumSelect = () => {
    setShowUploadModal(false);
    fileInputRef.current?.click();
  };

  const handleCameraSelect = () => {
    setShowUploadModal(false);
    cameraInputRef.current?.click();
  };

  const handleRemoveProfileImage = async () => {
    setShowUploadModal(false);
    
    if (!confirm('프로필 사진을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // 프로필 이미지 삭제 API 호출
      const response = await fetch('/api/user/profile-image', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProfileImage(null);
        setShowSuccessModal(true);
      } else {
        alert('프로필 사진 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 사진 삭제 오류:', error);
      alert('프로필 사진 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCameraUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.imageUrl);
        // 프로필 정보 다시 불러오기
        const token = localStorage.getItem('token');
        if (token) {
          const profileResponse = await fetch('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfileImage(profileData.user.profileImage || null);
          }
        }
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || '이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      // input 초기화
      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.imageUrl);
        // 프로필 정보 다시 불러오기
        const token = localStorage.getItem('token');
        if (token) {
          const profileResponse = await fetch('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfileImage(profileData.user.profileImage || null);
          }
        }
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || '이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full pb-0">
      <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full pb-[20px]">
        <div className="flex flex-col gap-[36px] items-end relative shrink-0 w-full">
          {/* 상단 배너 */}
          <div className="flex flex-col items-start relative shrink-0 w-full">
            <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
            <NavBarMobile />
          </div>

          {/* 프로필 섹션 */}
          <div className="flex items-start px-[20px] py-0 relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative shrink-0">
              {/* 프로필 사진 */}
              <div className="bg-white relative rounded-[999px] shrink-0 size-[60px]">
                <div className="absolute left-0 rounded-[999px] size-[60px] top-0 flex items-center justify-center bg-gray-200 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                {/* 카메라 아이콘 */}
                <button
                  onClick={handleProfileImageClick}
                  disabled={isUploading}
                  className="absolute bg-[#1a1918] border-[3.333px] border-[#f8f6f4] border-solid flex items-center left-[40px] p-[2.5px] rounded-[624.375px] top-[40px] cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="프로필 사진 변경"
                >
                  {isUploading ? (
                    <div className="w-[15px] h-[15px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg
                      className="w-[15px] h-[15px] text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                {/* 숨겨진 파일 입력 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraUpload}
                  className="hidden"
                />
              </div>

              {/* 닉네임 및 권한 */}
              <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shrink-0">
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex gap-[8px] items-center relative shrink-0">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-black">
                      {nickname}
                    </p>
                    {/* 연필 아이콘 */}
                    <button className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity" aria-label="닉네임 수정">
                      <svg
                        className="w-6 h-6 text-[#2a2a2e]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                  {/* 톱니바퀴 아이콘 */}
                  <button 
                    onClick={() => router.push('/settings')}
                    className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity" 
                    aria-label="설정"
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
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <div className="flex h-[26px] items-center relative shrink-0">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#b7b3af]">
                    {getMemberTypeText()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 및 좋아요 */}
        <div className="flex flex-col gap-[44px] items-start relative shrink-0 w-full">
          <div className="border-[#eeebe6] border-b-2 border-l-0 border-r-0 border-solid border-t-0 flex items-center relative shrink-0 w-full">
            {/* 알림 */}
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-0 py-[20px] relative shrink-0">
              <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0 w-[57px]">
                <div className="relative shrink-0 size-[24px]">
                  <svg
                    className="w-6 h-6 text-[#2a2a2e]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                  <p className="font-normal relative shrink-0 text-[#443e3c]">
                    알림
                  </p>
                  <p className="font-bold relative shrink-0 text-[#ee4a08]">
                    {notificationCount}
                  </p>
                </div>
              </div>
            </div>
            {/* 좋아요 */}
            <div className="border-[#eeebe6] border-b-0 border-l-2 border-r-2 border-solid border-t-0 flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-0 py-[20px] relative shrink-0">
              <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <svg
                    className="w-6 h-6 text-[#2a2a2e]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                  <p className="font-normal relative shrink-0 text-[#443e3c]">
                    좋아요
                  </p>
                  <p className="font-bold relative shrink-0 text-[#ee4a08]">
                    {likeCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 메뉴 섹션 */}
          <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full">
            {/* 나의 쇼핑 정보 */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 쇼핑 정보
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] whitespace-pre-wrap">
                  <button className="font-bold text-left relative shrink-0 w-full hover:opacity-80 transition-opacity">
                    주문 내역
                  </button>
                  <button className="font-bold text-left relative shrink-0 w-full hover:opacity-80 transition-opacity">
                    주문 취소/변경 내역
                  </button>
                  <button className="font-bold text-left relative shrink-0 w-full hover:opacity-80 transition-opacity">
                    리뷰 쓰기
                  </button>
                </div>
              </div>
            </div>

            {/* 나의 창작 정보 */}
            <div className="flex flex-col items-end relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 창작 정보
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  <button 
                    onClick={() => router.push('/myPage/products')}
                    className="font-bold text-left relative shrink-0 hover:opacity-80 transition-opacity"
                  >
                    내가 등록한 상품
                  </button>
                  <button 
                    onClick={() => {
                      window.open('https://gcsweb.super.site/', '_blank');
                    }}
                    className="font-bold text-left relative shrink-0 hover:opacity-80 transition-opacity"
                  >
                    창작자 가이드
                  </button>
                </div>
              </div>
            </div>

            {/* 나의 문의 */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 문의
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[0px] items-start px-0 py-[12px] relative shrink-0">
                  <button className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full whitespace-pre-wrap hover:opacity-80 transition-opacity">
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 업로드 선택 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[100]" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white w-full rounded-t-[20px] p-[20px] max-w-[500px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-[16px]">
              <button
                onClick={handleCameraSelect}
                className="w-full py-[16px] flex items-center gap-[12px] text-left text-[16px] font-normal text-[#443e3c] hover:bg-gray-100 rounded-[12px] px-[16px] transition-colors"
              >
                <svg
                  className="w-6 h-6 text-[#443e3c]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>사진 촬영</span>
              </button>
              <button
                onClick={handleAlbumSelect}
                className="w-full py-[16px] flex items-center gap-[12px] text-left text-[16px] font-normal text-[#443e3c] hover:bg-gray-100 rounded-[12px] px-[16px] transition-colors"
              >
                <svg
                  className="w-6 h-6 text-[#443e3c]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>앨범에서 사진 선택</span>
              </button>
              {profileImage && (
                <button
                  onClick={handleRemoveProfileImage}
                  className="w-full py-[16px] flex items-center gap-[12px] text-left text-[16px] font-normal text-red-600 hover:bg-red-50 rounded-[12px] px-[16px] transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>등록된 사진 삭제</span>
                </button>
              )}
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full py-[16px] text-center text-[16px] font-normal text-[#443e3c] hover:bg-gray-100 rounded-[12px] px-[16px] transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-[20px] p-[32px] max-w-[300px] w-full mx-[20px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-[20px]">
              <p className="text-[18px] font-bold text-[#443e3c] text-center">
                프로필 사진 업로드 성공!
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-[12px] bg-[#443e3c] text-white rounded-[12px] font-normal text-[15px] hover:opacity-90 transition-opacity"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
