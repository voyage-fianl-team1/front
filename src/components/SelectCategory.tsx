import React from 'react';

const SelectCategory = () => {
  return (
    <div className='border-[1px] border-matchgi-gray rounded-full py-1 px-3 text-sm'>
      <select>
        <option value='all'>전체</option>
        <option value='basketball'>농구</option>
        <option value='cue-sports'>당구</option>
        <option value='badminton'>배드민턴</option>
        <option value='bowling'>볼링</option>
        <option value='tennis'>테니스</option>
        <option value='soccer'>축구</option>
        <option value='etc'>기타</option>
      </select>
    </div>
  );
};

export default SelectCategory;
