'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideMenu from './SideMenu';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 토큰 확인 및 유효성 검증
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      
      // 토큰이 없거나 빈 문자열이면 로그아웃 상태
      if (!token || token.trim() === '') {
        setIsLoggedIn(false);
        return;
      }

      // 토큰 유효성 검증 (JWT 형식 확인 및 만료 여부 확인)
      try {
        // JWT는 보통 3개의 부분으로 구성됨 (header.payload.signature)
        const parts = token.split('.');
        if (parts.length !== 3) {
          // 유효하지 않은 토큰 형식
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          return;
        }

        // 토큰의 payload 부분 디코딩하여 만료 시간 확인
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          // 토큰이 만료됨
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          return;
        }

        // 토큰이 유효함
        setIsLoggedIn(true);
      } catch (error) {
        // 토큰 파싱 오류 (유효하지 않은 토큰)
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // storage 이벤트 리스너 추가 (다른 탭에서 로그인/로그아웃 시 동기화)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // 커스텀 이벤트 리스너 추가 (같은 탭에서 로그인/로그아웃 시 동기화)
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('loginStatusChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginStatusChange', handleStorageChange);
    };
  }, []);

  return (
    <>
      <header className="bg-white w-full h-16 grid grid-cols-3 items-center px-4 md:px-6 shadow-sm sticky top-0 z-[80]">
        {/* 좌측: 햄버거 메뉴 */}
        <div className="flex justify-start">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 중앙: 브랜드 로고 */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="홈으로 이동"
          >
            <div className="relative h-[19px] w-[57px] md:h-[25px] md:w-[75px]">
              <Image
                src="/images/logo_black.svg"
                alt="Brand Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </button>
        </div>

        {/* 우측: 로그인/마이페이지 아이콘 */}
        <div className="flex justify-end">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* 로그아웃 아이콘 */}
              <button
                onClick={() => {
                  if (confirm('로그아웃 하시겠습니까?')) {
                    localStorage.removeItem('token');
                    window.dispatchEvent(new Event('loginStatusChange'));
                    router.push('/');
                  }
                }}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="로그아웃"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              {/* 마이페이지 아이콘 */}
              <button
                onClick={() => router.push('/myPage')}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="마이페이지"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="로그인"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

