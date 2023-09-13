import React, { useState, useEffect } from 'react';
import './notice.css';

const Notice = () => {
  const notice = [
    {
      "no": 1,
      "title": "첫번째 게시글입니다.",
      "content": "첫번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 6
    },
    {
      "no": 2,
      "title": "두번째 게시글입니다.",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 5
    },
    {
      "no": 3,
      "title": "세번째 게시글입니다.",
      "content": "세번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 1
    },
    {
      "no": 4,
      "title": "네번째 게시글입니다.",
      "content": "네번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 2
    },
    {
      "no": 5,
      "title": "다섯번째 게시글입니다.",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 4
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notice.length);
    }, 4000); // 2초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="notice">
      {notice.map((item, idx) => (
        <li className={idx === currentIndex ? 'notice-content active' : 'notice-content'} key={idx}>
          <span className="notice-header">공지사항:</span>
          <span className="notice-title">{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default Notice;
