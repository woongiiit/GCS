'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
        새 상품 등록
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

interface Team {
  id: string;
  name: string;
}

export default function RegisterProductPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [salesType, setSalesType] = useState<'fund' | 'partner'>('fund');
  const [receiveMethods, setReceiveMethods] = useState<string[]>([]);
  const [productName, setProductName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [oneLineDescription, setOneLineDescription] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [contentImages, setContentImages] = useState<File[]>([]);
  const [contentImagePreviews, setContentImagePreviews] = useState<string[]>([]);
  const [schedule, setSchedule] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [isShowSalesTypeDropdown, setIsShowSalesTypeDropdown] = useState(false);
  
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const contentImagesInputRef = useRef<HTMLInputElement>(null);
  const salesTypeDropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (salesTypeDropdownRef.current && !salesTypeDropdownRef.current.contains(event.target as Node)) {
        setIsShowSalesTypeDropdown(false);
      }
    };

    if (isShowSalesTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowSalesTypeDropdown]);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // 사용자의 팀 정보 가져오기
        const response = await fetch('/api/user/products', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          // 팀 정보를 가져오기 위해 별도 API 호출이 필요할 수 있지만,
          // 현재는 products API에서 teamName을 가져올 수 있으므로
          // 간단하게 처리합니다. 실제로는 팀 목록 API가 필요할 수 있습니다.
          const data = await response.json();
          // TODO: 실제 팀 목록 API 호출로 대체 필요
          // 임시로 빈 배열 사용
          setTeams([]);
        }
      } catch (error) {
        console.error('팀 정보 가져오기 오류:', error);
      } finally {
        setIsLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [router]);

  const handleReceiveMethodChange = (method: string) => {
    if (receiveMethods.includes(method)) {
      setReceiveMethods(receiveMethods.filter(m => m !== method));
    } else {
      setReceiveMethods([...receiveMethods, method]);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setContentImages([...contentImages, ...files]);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setContentImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async () => {
    // 필수 필드 검증 (이미지는 일단 선택사항으로)
    if (!productName || !salesType || receiveMethods.length === 0 || !oneLineDescription || !accountHolder || !bankName || !accountNumber) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (salesType === 'fund' && !goalAmount) {
      alert('목표금액을 입력해주세요.');
      return;
    }

    if (salesType === 'fund' && (!startDate || !endDate)) {
      alert('펀딩기간을 입력해주세요.');
      return;
    }

    // 첫 번째 단계 데이터를 sessionStorage에 저장
    const firstStepData = {
      productName,
      salesType,
      receiveMethods,
      goalAmount,
      startDate,
      endDate,
      oneLineDescription,
      accountHolder,
      bankName,
      accountNumber,
      schedule,
      mainImage: mainImagePreview,
      contentImagePreviews,
    };

    sessionStorage.setItem('productRegistrationStep1', JSON.stringify(firstStepData));

    // 옵션/가격 정보 페이지로 이동
    router.push('/myPage/products/register/options');
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/,/g, '');
    if (numericValue === '') return '';
    return parseInt(numericValue).toLocaleString();
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-start relative shrink-0 w-full px-[16px] py-[20px] gap-[16px]">
        {/* 판매팀 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            판매팀 <span className="text-[#fd6f22]">*</span>
          </label>
          <input
            type="text"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            placeholder="ex. MUA"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
        </div>

        {/* 판매방식 */}
        <div className="flex flex-col gap-[8px] w-full relative">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            판매방식 <span className="text-[#fd6f22]">*</span>
          </label>
          <button
            onClick={() => setIsShowSalesTypeDropdown(!isShowSalesTypeDropdown)}
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] focus:outline-none focus:border-[#fd6f22] text-left flex items-center justify-between"
          >
            <span>{salesType === 'fund' ? 'Fund' : 'Partner up'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isShowSalesTypeDropdown ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isShowSalesTypeDropdown && (
            <div
              ref={salesTypeDropdownRef}
              className="absolute top-full mt-1 bg-white border border-[#e8e4df] rounded-[8px] shadow-lg z-10 w-full"
            >
              <button
                onClick={() => {
                  setSalesType('fund');
                  setIsShowSalesTypeDropdown(false);
                }}
                className="w-full px-[12px] py-[10px] text-left text-[13px] text-[#1a1918] hover:bg-gray-50 first:rounded-t-[8px] last:rounded-b-[8px]"
              >
                Fund
              </button>
              <button
                onClick={() => {
                  setSalesType('partner');
                  setIsShowSalesTypeDropdown(false);
                }}
                className="w-full px-[12px] py-[10px] text-left text-[13px] text-[#1a1918] hover:bg-gray-50 first:rounded-t-[8px] last:rounded-b-[8px]"
              >
                Partner up
              </button>
            </div>
          )}
        </div>

        {/* 수령방식 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            수령방식 <span className="text-[#fd6f22]">*</span>
          </label>
          <p className="text-[11px] text-[#85817e]">복수 선택 가능</p>
          <div className="flex gap-[16px] mt-[4px]">
            <button
              onClick={() => handleReceiveMethodChange('delivery')}
              className="flex items-center gap-[8px]"
            >
              <div className={`w-[20px] h-[20px] rounded-full border-2 ${receiveMethods.includes('delivery') ? 'border-[#fd6f22] bg-[#fd6f22]' : 'border-[#dcd6cc]'}`}>
                {receiveMethods.includes('delivery') && <div className="w-full h-full rounded-full bg-white scale-50" />}
              </div>
              <span className="text-[13px] text-[#443e3c]">택배 배송</span>
            </button>
            <button
              onClick={() => handleReceiveMethodChange('pickup')}
              className="flex items-center gap-[8px]"
            >
              <div className={`w-[20px] h-[20px] rounded-full border-2 ${receiveMethods.includes('pickup') ? 'border-[#fd6f22] bg-[#fd6f22]' : 'border-[#dcd6cc]'}`}>
                {receiveMethods.includes('pickup') && <div className="w-full h-full rounded-full bg-white scale-50" />}
              </div>
              <span className="text-[13px] text-[#443e3c]">현장 수령</span>
            </button>
          </div>
        </div>

        {/* 상품명 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            상품명 <span className="text-[#fd6f22]">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="ex. 염에 후드집업"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
        </div>

        {/* 목표금액 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            목표금액 <span className="text-[#fd6f22]">*</span>
          </label>
          <p className="text-[11px] text-[#85817e]">전액결제의 경우, 목표금액을 설정하지 않아도 됩니다.</p>
          <input
            type="text"
            value={goalAmount}
            onChange={(e) => {
              const formatted = formatCurrency(e.target.value);
              setGoalAmount(formatted);
            }}
            placeholder="3,232,321원"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
        </div>

        {/* 펀딩기간 (Fund일 때만 표시) */}
        {salesType === 'fund' && (
          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
              펀딩기간 <span className="text-[#fd6f22]">*</span>
            </label>
            <div className="flex items-center gap-[8px]">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] focus:outline-none focus:border-[#fd6f22] flex-1"
              />
              <span className="text-[13px] text-[#443e3c]">부터</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] focus:outline-none focus:border-[#fd6f22] flex-1"
              />
              <span className="text-[13px] text-[#443e3c]">까지</span>
            </div>
          </div>
        )}

        {/* 상품 한줄설명 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            상품 한줄설명 <span className="text-[#fd6f22]">*</span>
          </label>
          <input
            type="text"
            value={oneLineDescription}
            onChange={(e) => {
              if (e.target.value.length <= 15) {
                setOneLineDescription(e.target.value);
              }
            }}
            placeholder="15자 이내"
            maxLength={15}
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
        </div>

        {/* 제작/배송 일정 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            제작/배송 일정
          </label>
          <textarea
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="13일 최종 결제&#10;14일 상품 제작&#10;20일 배송 시작"
            rows={3}
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22] resize-none"
          />
        </div>

        {/* 정산계좌 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            정산계좌 <span className="text-[#fd6f22]">*</span>
          </label>
          <input
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            placeholder="예금주명"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="은행명"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="계좌번호"
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
          />
          <p className="text-[11px] text-[#fd6f22]">판매팀이 정산 받을 계좌입니다.</p>
        </div>

        {/* 대표 이미지 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            *대표 이미지 <span className="text-[#fd6f22]">*</span>
          </label>
          <input
            ref={mainImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="hidden"
          />
          <button
            onClick={() => mainImageInputRef.current?.click()}
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] hover:opacity-80 transition-opacity text-left"
          >
            {mainImagePreview ? '이미지 선택됨' : '이미지 선택'}
          </button>
          {mainImagePreview && (
            <div className="relative w-full h-[200px] rounded-[8px] overflow-hidden">
              <Image
                src={mainImagePreview}
                alt="대표 이미지"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* 본문 내용 이미지 */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
            본문 내용 이미지
          </label>
          <input
            ref={contentImagesInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleContentImagesChange}
            className="hidden"
          />
          <button
            onClick={() => contentImagesInputRef.current?.click()}
            className="bg-white border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] hover:opacity-80 transition-opacity text-left"
          >
            이미지 선택
          </button>
          {contentImagePreviews.length > 0 && (
            <div className="flex flex-col gap-[8px]">
              {contentImagePreviews.map((preview, index) => (
                <div key={index} className="relative w-full h-[200px] rounded-[8px] overflow-hidden">
                  <Image
                    src={preview}
                    alt={`본문 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#1a1918] rounded-[12px] py-[14px] text-white font-normal text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-[8px]"
        >
          {isLoading ? '등록 중...' : '다음'}
        </button>

        {/* 안내 문구 */}
        <p className="text-[11px] text-[#85817e] text-center w-full">
          다음 페이지로 넘어가도 작성한 내용은 저장되며, 이전으로 돌아올 수 있습니다.
        </p>
      </div>
    </div>
  );
}
