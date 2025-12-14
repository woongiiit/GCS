'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

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

interface OptionValue {
  id: string;
  value: string;
}

interface Option {
  id: string;
  name: string;
  values: OptionValue[];
}

interface OptionCombination {
  id: string;
  values: string[];
  price: string;
}

export default function RegisterProductOptionsPage() {
  const router = useRouter();
  const [hasOptions, setHasOptions] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [combinations, setCombinations] = useState<OptionCombination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 첫 번째 단계 데이터 확인
    const step1Data = sessionStorage.getItem('productRegistrationStep1');
    if (!step1Data) {
      router.push('/myPage/products/register');
      return;
    }
  }, [router]);

  // 옵션 조합 생성 (카르테시안 곱)
  useEffect(() => {
    if (!hasOptions || options.length === 0) {
      setCombinations([]);
      return;
    }

    // 모든 옵션값 배열 생성
    const optionValuesArrays = options
      .filter(opt => opt.values.length > 0)
      .map(opt => opt.values.map(v => v.value));

    if (optionValuesArrays.length === 0) {
      setCombinations([]);
      return;
    }

    // 카르테시안 곱 계산
    const cartesianProduct = (arrays: string[][]): string[][] => {
      if (arrays.length === 0) return [[]];
      if (arrays.length === 1) return arrays[0].map(v => [v]);
      
      const [first, ...rest] = arrays;
      const restProduct = cartesianProduct(rest);
      const result: string[][] = [];
      
      for (const value of first) {
        for (const restCombo of restProduct) {
          result.push([value, ...restCombo]);
        }
      }
      
      return result;
    };

    const product = cartesianProduct(optionValuesArrays);
    const newCombinations: OptionCombination[] = product.map((values, index) => ({
      id: `combo-${index}`,
      values,
      price: '',
    }));

    setCombinations(newCombinations);
  }, [hasOptions, options]);

  const addOption = () => {
    const newOption: Option = {
      id: `option-${Date.now()}`,
      name: '',
      values: [],
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (optionId: string) => {
    setOptions(options.filter(opt => opt.id !== optionId));
  };

  const updateOptionName = (optionId: string, name: string) => {
    setOptions(options.map(opt => 
      opt.id === optionId ? { ...opt, name } : opt
    ));
  };

  const addOptionValue = (optionId: string) => {
    const newValue: OptionValue = {
      id: `value-${Date.now()}`,
      value: '',
    };
    setOptions(options.map(opt =>
      opt.id === optionId
        ? { ...opt, values: [...opt.values, newValue] }
        : opt
    ));
  };

  const removeOptionValue = (optionId: string, valueId: string) => {
    setOptions(options.map(opt =>
      opt.id === optionId
        ? { ...opt, values: opt.values.filter(v => v.id !== valueId) }
        : opt
    ));
  };

  const updateOptionValue = (optionId: string, valueId: string, value: string) => {
    setOptions(options.map(opt =>
      opt.id === optionId
        ? {
            ...opt,
            values: opt.values.map(v =>
              v.id === valueId ? { ...v, value } : v
            ),
          }
        : opt
    ));
  };

  const updateCombinationPrice = (comboId: string, price: string) => {
    // 숫자만 허용하고 콤마 제거
    const numericPrice = price.replace(/,/g, '').replace(/[^0-9]/g, '');
    const formattedPrice = numericPrice === '' ? '' : parseInt(numericPrice).toLocaleString();
    
    setCombinations(combinations.map(combo =>
      combo.id === comboId ? { ...combo, price: formattedPrice } : combo
    ));
  };

  const handleSave = async () => {
    // 저장 로직 (임시 - 추후 구현)
    alert('저장 기능은 추후 구현 예정입니다.');
  };

  const handleSubmit = async () => {
    // 필수 필드 검증
    if (hasOptions && combinations.some(combo => !combo.price)) {
      alert('모든 옵션 조합의 가격을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const step1Data = JSON.parse(sessionStorage.getItem('productRegistrationStep1') || '{}');

      // 요청 데이터 구성
      const requestData = {
        name: step1Data.productName,
        type: step1Data.salesType,
        receiveMethod: step1Data.receiveMethods.join(', '),
        goalAmount: step1Data.goalAmount ? parseInt(step1Data.goalAmount.replace(/,/g, '')) : null,
        startDate: step1Data.startDate,
        endDate: step1Data.endDate,
        description: step1Data.oneLineDescription,
        settlementAccount: `${step1Data.accountHolder}|${step1Data.bankName}|${step1Data.accountNumber}`,
        schedule: step1Data.schedule,
        options: hasOptions ? options.map(opt => ({
          name: opt.name,
          values: opt.values.map(v => v.value),
        })) : [],
        optionCombinations: hasOptions ? combinations.map(combo => ({
          values: combo.values,
          price: parseInt(combo.price.replace(/,/g, '')) || 0,
        })) : [],
      };

      const response = await fetch('/api/products/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestData }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem('productRegistrationStep1');
        alert('상품 등록 요청이 완료되었습니다.');
        router.push('/myPage/products');
      } else {
        alert(data.error || '상품 등록 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 등록 오류:', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
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
        {/* 옵션/가격 정보 */}
        <div className="flex flex-col gap-[8px] w-full">
          <h2 className="font-bold leading-[1.5] text-[15px] text-[#1a1918]">
            옵션/가격 정보
          </h2>
          
          {/* 옵션 있음/없음 토글 */}
          <div className="flex items-center gap-[12px]">
            <span className="font-normal leading-[1.5] text-[13px] text-[#443e3c]">
              옵션 있음 없음 스위치 토글
            </span>
            <button
              onClick={() => setHasOptions(!hasOptions)}
              className={`relative w-[44px] h-[24px] rounded-full transition-colors ${
                hasOptions ? 'bg-[#fd6f22]' : 'bg-[#dcd6cc]'
              }`}
            >
              <div
                className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
                  hasOptions ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 옵션 섹션 */}
        {hasOptions && (
          <>
            {options.map((option, optIndex) => (
              <div key={option.id} className="flex flex-col gap-[8px] w-full bg-white rounded-[8px] p-[12px]">
                {/* 옵션 헤더 */}
                <div className="flex items-center justify-between">
                  <span className="font-bold leading-[1.5] text-[13px] text-[#1a1918]">
                    옵션{optIndex + 1}
                  </span>
                  <button
                    onClick={() => removeOption(option.id)}
                    className="text-[#85817e] hover:text-[#443e3c] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* 옵션명 입력 */}
                <input
                  type="text"
                  value={option.name}
                  onChange={(e) => updateOptionName(option.id, e.target.value)}
                  placeholder="색깔"
                  className="bg-[#f8f6f4] border border-[#e8e4df] rounded-[8px] px-[12px] py-[10px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
                />

                {/* 옵션값 리스트 */}
                <div className="flex flex-col gap-[8px]">
                  {option.values.map((val, valIndex) => (
                    <div key={val.id} className="flex items-center gap-[8px] border-b border-[#e8e4df] pb-[8px]">
                      <input
                        type="text"
                        value={val.value}
                        onChange={(e) => updateOptionValue(option.id, val.id, e.target.value)}
                        placeholder="옵션값"
                        className="flex-1 bg-[#f8f6f4] border border-[#e8e4df] rounded-[8px] px-[12px] py-[8px] text-[13px] text-[#1a1918] placeholder:text-[#b7b3af] focus:outline-none focus:border-[#fd6f22]"
                      />
                      <button
                        onClick={() => removeOptionValue(option.id, val.id)}
                        className="text-[#85817e] hover:text-[#443e3c] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOptionValue(option.id)}
                    className="text-[#22c55e] font-normal text-[13px] text-left hover:opacity-80 transition-opacity"
                  >
                    옵션추가
                  </button>
                </div>
              </div>
            ))}

            {/* 옵션 추가 버튼 */}
            <button
              onClick={addOption}
              className="text-[#3b82f6] font-normal text-[13px] hover:opacity-80 transition-opacity"
            >
              옵션{options.length + 1} 추가
            </button>

            {/* 옵션 조합 테이블 */}
            {combinations.length > 0 && (
              <div className="flex flex-col gap-[8px] w-full">
                <div className="flex items-center gap-[8px] text-[13px] text-[#443e3c]">
                  <span className="font-normal">No.</span>
                  {options.map((opt, idx) => (
                    <span key={opt.id} className="font-normal flex-1">
                      {opt.name || `옵션${idx + 1}`}
                    </span>
                  ))}
                  <span className="font-normal text-[#fd6f22]">가격*</span>
                </div>

                <div className="flex flex-col gap-[8px]">
                  {combinations.map((combo, index) => (
                    <div key={combo.id} className="flex items-center gap-[8px] bg-white rounded-[8px] p-[12px]">
                      <span className="font-normal text-[13px] text-[#443e3c] w-[24px]">
                        {index + 1}
                      </span>
                      {combo.values.map((value, idx) => (
                        <span key={idx} className="font-normal text-[13px] text-[#1a1918] flex-1">
                          {value}
                        </span>
                      ))}
                      <input
                        type="text"
                        value={combo.price}
                        onChange={(e) => updateCombinationPrice(combo.id, e.target.value)}
                        placeholder="가격"
                        className="w-[100px] bg-[#f8f6f4] border-b-2 border-[#e8e4df] px-[4px] py-[4px] text-[13px] text-[#1a1918] focus:outline-none focus:border-[#fd6f22]"
                      />
                      <span className="text-[13px] text-[#443e3c]">원</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="w-full bg-[#1a1918] rounded-[12px] py-[14px] text-white font-normal text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          저장
        </button>

        {/* 등록 요청 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#1a1918] rounded-[12px] py-[14px] text-white font-normal text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '등록 중...' : '등록 요청'}
        </button>

        {/* 안내 문구 */}
        <div className="flex flex-col gap-[4px] w-full">
          <p className="text-[11px] text-[#85817e] text-center">
            저장 이후에도 수정 가능하며,
          </p>
          <p className="text-[11px] text-[#85817e] text-center">
            저장시 관리자에게만 글이 보입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
