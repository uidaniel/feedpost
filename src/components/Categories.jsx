import React, { useEffect, useState } from "react";
import { addCategory } from "../store/store";
import {useDispatch} from 'react-redux'

const Categories = () => {
  const [all, setAll] = useState(true)
  const [politics, setPolitics] = useState(false)
  const [sports, setSports] = useState(false)
  const [entertainment, setEntertainment] = useState(false)
  const [lifestyle, setLifestyle] = useState(false)
  const [technology, setTechnology] = useState(false)
  const [education, setEducation] = useState(false)
  const [music, setMusic] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(addCategory('ALL'))
  }, [])

  return (
    <section className="w-auto bg-[#FF2424] h-14 mt-4 flex items-center overflow-x-auto px-5 md:justify-center">
        <div className={all ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('ALL'))
          setPolitics(false)
          setAll(true)
          setSports(false)
          setEntertainment(false)
          setTechnology(false)
          setMusic(false)
          setLifestyle(false)
          setEducation(false)
        }}>ALL</div>
        <div className={politics ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('POLITICS'))
          setPolitics(true)
          setAll(false)
          setSports(false)
          setEntertainment(false)
          setTechnology(false)
          setLifestyle(false)
          setMusic(false)
          setEducation(false)
        }}>POLITICS</div>
        <div className={sports ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('SPORTS'))
          setPolitics(false)
          setAll(false)
          setSports(true)
          setEntertainment(false)
          setTechnology(false)
          setMusic(false)
          setLifestyle(false)
          setEducation(false)
        }}>SPORTS</div>
        <div className={music ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('MUSIC'))
          setPolitics(false)
          setAll(false)
          setSports(false)
          setMusic(true)
          setEntertainment(false)
          setTechnology(false)
          setLifestyle(false)
          setEducation(false)
        }}>MUSIC</div>
        <div className={entertainment ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('ENTERTAINMENT'))
          setPolitics(false)
          setAll(false)
          setSports(false)
          setMusic(false)
          setEntertainment(true)
          setTechnology(false)
          setLifestyle(false)
          setEducation(false)
        }}>ENTERTAINMENT</div>
        <div className={technology ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('TECHNOLOGY'))
          setPolitics(false)
          setAll(false)
          setSports(false)
          setMusic(false)
          setEntertainment(false)
          setTechnology(true)
          setLifestyle(false)
          setEducation(false)
        }}>TECHNOLOGY</div>
        <div className={lifestyle ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('LIFESTYLE'))
          setPolitics(false)
          setAll(false)
          setSports(false)
          setMusic(false)
          setEntertainment(false)
          setTechnology(false)
          setLifestyle(true)
          setEducation(false)
        }}>LIFESTYLE</div>
        <div className={education ? "w-auto px-6 h-[100%] text-white bg-[#DD0000] flex items-center justify-center" : "w-auto px-6 h-[100%] text-white bg-[##FF2424] flex items-center justify-center hover:bg-[#DD0000] duration-200 ease-in cursor-pointer"} onClick={()=> {
          dispatch(addCategory('EDUCATION'))
          setPolitics(false)
          setAll(false)
          setSports(false)
          setMusic(false)
          setEntertainment(false)
          setTechnology(false)
          setLifestyle(false)
          setEducation(true)
        }}>EDUCATION</div>
    </section>
  )
}

export default Categories