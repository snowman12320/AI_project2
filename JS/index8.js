
//JS備忘錄實作 事件監聽、取得DOM資料

const content = document.getElementById('content') //設定變數取得DOM
const date = document.getElementById('date')
const time = document.getElementById('time')
const addedBtn = document.getElementById('addedBtn')
const deletedBtn = document.getElementById('deletedBtn')
const list = document.getElementById('list') ////使用list的DOM

const listContent = [] //新增資料的陣列，顯示表單



//----------------------------
// class RenderFeature{ ///////也可寫成類別，包成類別去分類，再去繼承使用，const r1 = new RenderFeature，r1.render()
//   append() {

//   }
//   render() {
//     //// 渲染頁面的list
//     let htmlStr = ''
  
//     listContent.forEach(function (item) {
//       htmlStr = htmlStr + `
//       <div class="item">
//         <div>
//           <p>內容：${item.content}</p>
//           <p>時間：${item.date} ${item.time}</p>
//         </div>
//       </div>
//       `
//     })
  
//     list.innerHTML = htmlStr  
//   }
// }

//----------------------------


// function 
function render() {  //////最後也可將渲染函數包成函數去給新增和刪除使用渲染
  ////渲染頁面的list
  let htmlStr = ''

  listContent.forEach(function (item) { ///透過簡寫迴圈 ，取出自訂定義名稱item(項目)的每個項目，需要還可另外取出(index索引和array本身)
    htmlStr = htmlStr + `      ///並新增這個模塊，使用反引號進行換行，方便檢視
    <div class="item">
      <div>
        <p>內容：${item.content}</p>  ////模反語法帶入要顯示的值
        <p>時間：${item.date} ${item.time}</p>
      </div>
    </div>
    `
  })

  list.innerHTML = htmlStr  ///使用list的DOM，新增模塊
}

/////// const r1 = new RenderFeature()

addedBtn.addEventListener('click', function () {  //監聽函數，取得DOM的資料，並新增push進去陣列(前面推)

  listContent.unshift({  //unshift從後面推進去
    content: content.value,
    date: date.value,
    time: time.value
  })

  render() //////回調
  
})

deletedBtn.addEventListener('click', function () {
  listContent.shift() //後面拿

  render()  ///////回調
})


/////listContent.pop() 可刪除最後一個
