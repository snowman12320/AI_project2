
//https://www.youtube.com/watch?v=zqV7NIFGDrQ

//215回顧

import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from '../../global/constants'

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

async function fetchData(setData) {  ////噁心可的函數取得資料，用await拿到並轉成json，管理非同步步驟
  const res = await fetch(API_GET_DATA)
  const { data } = await res.json()
  setData(data)
}

async function fetchSetData(data) {  
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ data })
  })
}

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);  ////210

  useEffect(() => {   //可設定window.alert("新增成功")的新增訊息
    // window.alert("新增成功")
    if (!submittingStatus.current){
      return
    }
    fetchSetData(data)
      .then(data => submittingStatus.current = false)
  }, [data])

  useEffect(() => {
    fetchData(setData)
  }, [])

  return (
    <div className="app">
      <Edit add={setData} submittingStatus={submittingStatus} />
      <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
  );
};

export default Home;
