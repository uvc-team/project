import React, { useState, useEffect } from 'react';
import './Rolling.css';

const Rolling = () => {
    const rollingItems= [
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
  const nextIndex = (currentIndex + 1) % rollingItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rollingItems.length);
    }, 2000);  

    return () => clearInterval(interval);
}, []);

return (
<ul className="rolling">
        <li className={`rolling-content ${currentIndex === nextIndex ? 'active' : ''}`}>
          <span className="rolling-header">공지사항:</span>
          <span className="rolling-title">{rollingItems[currentIndex].title}</span>
        </li>
        {currentIndex !== nextIndex && (
            <li className={`rolling-content active`}>
              <span className="rolling-header">공지사항:</span>
              <span className="rolling-title">{rollingItems[nextIndex].title}</span>
            </li>
        )}
</ul>
);
};

export default Rolling;