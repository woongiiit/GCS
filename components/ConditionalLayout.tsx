'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderFooterPaths = ['/login', '/findid', '/checkid', '/findpassword', '/resetpassword', '/register'];
  const noHeaderOnlyPaths = ['/mypage', '/myPage', '/settings', '/adminlog', '/archivemanage']; // Header만 숨기는 경로
  
  const isLoginPage = noHeaderFooterPaths.some(path => pathname?.toLowerCase() === path.toLowerCase());
  const isMyPage = noHeaderOnlyPaths.some(path => pathname?.toLowerCase() === path.toLowerCase());
  const isAdminPage = pathname?.toLowerCase().startsWith('/admin'); // /admin으로 시작하는 모든 경로
  const isArchiveManagePage = pathname?.toLowerCase().startsWith('/archivemanage'); // /archiveManage로 시작하는 모든 경로
  const isProjectDetailPage = pathname?.toLowerCase().startsWith('/archive/project'); // 프로젝트 상세 페이지
  const isMyProductsPage = pathname?.toLowerCase().startsWith('/mypage/products'); // 내가 등록한 상품 페이지

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {!isLoginPage && !isMyPage && !isAdminPage && !isArchiveManagePage && !isProjectDetailPage && !isMyProductsPage && <Header />}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      {!isLoginPage && !isProjectDetailPage && !isMyProductsPage && <Footer />}
    </div>
  );
}

