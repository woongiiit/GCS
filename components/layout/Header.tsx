'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useUIStore } from '@/stores/ui';

export default function Header() {
  const { data: session } = useSession();
  const { isSideMenuOpen, toggleSideMenu } = useUIStore();

  return (
    <header className="bg-white w-full h-16 grid grid-cols-3 items-center px-4 md:px-6 shadow-sm sticky top-0 z-50">
      {/* Left: Menu Button */}
      <div className="flex justify-start">
        <button
          onClick={toggleSideMenu}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Center: Logo */}
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src="/images/logo_black.svg"
            alt="GCS Logo"
            width={80}
            height={28}
            priority
          />
        </Link>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex justify-end items-center gap-2">
        {session ? (
          <>
            <Link
              href="/mypage"
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="마이페이지"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="로그아웃"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="로그인"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
