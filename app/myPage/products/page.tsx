'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";

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
        내가 등록한 상품
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  teamName: string;
  thumbnail: string | null;
  likeCount: number;
  reviewCount: number;
  orderCount: number;
  isPublic: boolean;
  createdAt: string;
}

export default function MyProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      
      if (!token || token.trim() === '') {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/user/products', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          if (response.status === 401) {
            localStorage.removeItem('token');
            window.dispatchEvent(new Event('loginStatusChange'));
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('상품 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-center relative shrink-0 w-full pb-[100px] pt-[40px] px-[16px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-[60px]">
            <div className="w-8 h-8 border-4 border-[#fd6f22] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-[24px] pt-[200px] pb-[270px]">
            <p className="font-normal leading-[1.5] text-[15px] text-[#85817e]">
              등록한 상품이 없습니다.
            </p>
            <p className="font-normal leading-[1.5] text-[13px] text-[#b7b3af]">
              GCS:Web에 상품을 올리고 싶다면?
            </p>
            <button
              onClick={() => {
                window.open('https://gcsweb.super.site/', '_blank');
              }}
              className="bg-[#443e3c] flex items-center justify-center gap-[8px] px-[20px] py-[12px] rounded-[12px] hover:opacity-80 transition-opacity"
            >
              <span className="font-bold leading-[1.5] text-[13px] text-white">
                창작자 가이드 보러가기
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px] items-center w-full max-w-[344px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] w-full cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  // TODO: 상품 상세 페이지로 이동
                  alert('상품 상세 페이지는 추후 구현 예정입니다.');
                }}
              >
                {/* 상품 썸네일 */}
                {product.thumbnail && (
                  <div className="relative w-full h-[200px] rounded-[8px] overflow-hidden bg-gray-200">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* 상품 정보 */}
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <div className="flex gap-[8px] items-center w-full">
                    <p className="font-bold leading-[1.5] text-[15px] text-[#1a1918] flex-1">
                      {product.name}
                    </p>
                    <div className="bg-[#fd6f22] h-[18px] relative rounded-[4px] shrink-0 px-[6px] flex items-center">
                      <p className="font-normal leading-[14px] text-[10px] text-white">
                        {product.type === 'fund' ? 'Fund' : 'Partner'}
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[1.5] text-[12px] text-[#85817e]">
                    {product.teamName}
                  </p>
                  {product.description && (
                    <p className="font-normal leading-[1.4] text-[11px] text-[#85817e] line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 플로팅 액션 버튼 */}
      <button
        onClick={() => {
          router.push('/myPage/products/register');
        }}
        className="fixed bottom-[24px] right-[16px] bg-[#fd6f22] w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-[0px_4px_12px_0px_rgba(253,111,34,0.4)] hover:opacity-90 transition-opacity z-[100]"
        aria-label="상품 등록"
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
          <path d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
