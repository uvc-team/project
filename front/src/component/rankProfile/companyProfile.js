import React, { useState } from "react";
import "./companyProfile.css";
const companies = [
  {
    name: "유비씨",
    homepage: "https://uvc.co.kr/",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "사이버테크프랜드",
    homepage: "http://www.cyberwin.co.kr/",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "크로이스",
    homepage: "https://croisadmin.gabia.io",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "더블유지에스",
    homepage: "https://www.wgslabs.com",
    companyInfo: "홈페이지X",
  },
  {
    name: "디케이랩",
    homepage: "홈페이지X",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "온더라이브",
    homepage: "https://www.onthelive.kr",
    companyInfo: "회사소개서 첨부",
  },
];


function CompanyProfile() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div>
      <div>
        <h2>협력회사 정보</h2>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              <button onClick={() => handleCompanyClick(company.name)}>
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedCompany && (
          <div>
            <h3 className="companyName">{selectedCompany}</h3>
            <p className="companyInfo">홈페이지: {companies.find((c) => c.name === selectedCompany).homepage}</p>
            <p className="companyInfo">회사 정보: {companies.find((c) => c.name === selectedCompany).companyInfo}</p>
            {/* 추가된 부분: 회사 정보 링크 */}
            <p className="companyInfo">회사 정보 링크: {companies.find((c) => c.name === selectedCompany).companyInfoLink}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default CompanyProfile;