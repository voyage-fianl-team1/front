// import React, { FC, useState } from 'react';
// import { useForm } from 'react-hook-form';

// const Review: FC = () => {
//   const { register, getValues } = useForm({});
//   const [clicked, setClicked] = useState([false, false, false, false, false]);

//   const handleStarClick = (index: number) => {
//     const clickStates = [...clicked];
//     for (let i = 0; i < 5; i++) {
//       clickStates[i] = i <= index ? true : false;
//     }
//     setClicked(clickStates);
//   };

//   const reviewPostUpload = {
//     title: getValues().title,
//     content: getValues().content,
//     star: getValues().star,
//   };
//   console.log(reviewPostUpload);

//   const ArrayIndex = [1, 2, 3, 4, 5];

//   return (
//     <section className='w-full h-[50rem] border border-matchgi-gray flex flex-col items-center justify-center gap-2 rounded-lg p-1'>
//       <div className='w-60 h-60 border border-matchgi-gray rounded-xl bg-matchgi-lightgray'></div>
//       <div className='flex flex-col justify-center items-center w-4/5 h-72 border border-matchgi-gray rounded-xl bg-matchgi-lightgray gap-2'>
//         <input className='w-11/12 h-6 border border-matchgi-gray' {...register('title')}></input>
//         <textarea className='w-11/12 h-36 border border-matchgi-gray' {...register('content')}></textarea>
//         <span className='flex flex-row'>
//           {ArrayIndex.map((v, i) => (
//             <>
//               <div className='flex items-center' key={i}>
//                 <svg
//                   aria-hidden='true'
//                   className='w-10 h-10 text-matchgi-gray active:text-yellow-300'
//                   fill='currentColor'
//                   viewBox='0 0 20 20'
//                   xmlns='http://www.w3.org/2000/svg'
//                 >
//                   <title>First star</title>
//                   <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
//                 </svg>
//               </div>
//             </>
//           ))}
//         </span>
//         <span className='flex flex-row gap-5'>
//           <button className='border w-14 h-7 border-black bg-white p-0.25 text-sm'>작성하기</button>
//           <button className='border w-14 h-7 border-black bg-white p-0.25 text-sm'>취소</button>
//         </span>
//       </div>
//     </section>
//   );
// };

// export default Review;
export {};
