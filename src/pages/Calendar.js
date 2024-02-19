import React, { useState } from 'react';
import '../index.css';
import left from "../assets/left.png";
import Right from "../assets/Right.png";

const Calendar = () => {
  // 현재 날짜 상태
  const [currentDate, setCurrentDate] = useState(new Date());

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate(prevDate => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate(prevDate => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  // 현재 달의 첫째 날의 요일을 반환합니다. (0: 일요일, 1: 월요일, ...)
  const getFirstDayOfMonth = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDayOfMonth.getDay();
  };

  // 현재 달의 날짜 배열 생성 (날짜와 요일을 모두 포함)
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // 빈 셀을 삽입하여 첫째 날이 올바른 요일에 위치하도록 합니다.
    for (let i = 0; i < getFirstDayOfMonth(); i++) {
      days.push('');
    }

    // 실제 날짜를 삽입합니다.
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // 날짜 셀을 렌더링합니다.
  const renderDays = () => {
    const days = getDaysInMonth();
    const rows = [];
    let cells = [];

    days.forEach((day, index) => {
      if (index % 7 !== 0) {
        cells.push(<td key={index}>{day}</td>);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(<td key={index}>{day}</td>);
      }

      if (index === days.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, index) => <tr key={index}>{row}</tr>);
  };

  return (
    <div className="calendar-container">
      <div className="month-nav">
        <img src={left} onClick={prevMonth} height="20"/>
        <span style={{fontSize:"20px", fontWeight:"bold"}}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <img src={Right} onClick={nextMonth} height="20"/>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {renderDays()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
