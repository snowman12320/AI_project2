// ///  //// /////

const http = require("http"); //導入自帶的模塊 、constant持續的
const fs = require("fs"); ///導入fs檔案系統的模塊
const qs = require("querystring"); /////拆分字串

const port = 3000;
const ip = "127.0.0.1"; //這個服務器在自己電腦，要訪問這個服務器使用本機地址

const sendResponse = (filename, statusCode, response) => { ///這個函數需要三個參數、文件名、狀態馬、回應物件
  fs.readFile(`./html/${filename}`, (error, data) => { 
    ///使用這個readFile函數，來讀取HTML文件，提供文件名路徑和回調函數，成功讀取時回調成功的資料和失敗的訊息
    if (error) {
      response.statusCode = 500; ///回報錯誤代碼
      response.setHeader("Content-Type", "text/plain"); ///設定回傳內容的格式
      response.end("Sorry, internal error");///攏統的錯誤訊息 以防安全
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data); ///回應函數搞定後，開始調用這個函數，在請求頁面的部份↓
    }
  });
};

const server = http.createServer((request, response) => { //創建服務器 、創建監聽器=各類函數
  const method = request.method; //這個請求的方法，可以打印出GET或POST等等
  let url = request.url;//這個請求的方法，可以打印出請求哪個路徑，使用let 可變 32有更動到

  if (method === "GET") {
    const requestUrl = new URL(url, `http://${ip}:${port}`); 
    ////保存URL的物件並使用詳細資訊，兩個參數url是使用的路徑端口，new用以判斷新的物件新增
    url = requestUrl.pathname; ////使用路徑名資料，因為searchParams不夠詳細
    const lang = requestUrl.searchParams.get("lang"); ////可取得路徑後面的參數值
    let selector; ////保存語言字符串

    if (lang === null || lang === "en") {  ////判斷lang參數值，路徑加 /?lang=zh 判斷，需加入meta charset UTF8各頁面
      selector = "";
    } else if (lang === "zh") {
      selector = "-zh";
    } else {
      selector = "";
    }

    if (url === "/") { //判斷使用哪個路徑(請求頁面)
      sendResponse(`index${selector}.html`, 200, response);
      ///讀取首頁、輸入狀態馬、回應物件，////使用反引號才能正確使用模塊
    } else if (url === "/about.html") {
      sendResponse(`about${selector}.html`, 200, response);  ////透過更改路徑搜尋參數
    } else if (url === "/login.html") {  /////
      sendResponse(`login${selector}.html`, 200, response);
    } else if (url === "/login-success.html") {  //////
      sendResponse(`login-success${selector}.html`, 200, response);
    } else if (url === "/login-fail.html") {  //////
      sendResponse(`login-fail${selector}.html`, 200, response);
    } else {
      sendResponse(`404${selector}.html`, 404, response);
    }
  } else {
    if (url === "/process-login") {
      let body = []; /////建立空陣列Array，POST傳送數據流，數據轉成二元代碼，分批存滿BUFFER緩衝，分批給予SERVER讀取

      request.on("data", (chunk) => {    //////兩個監聽器，一個監聽是否可讀取，用箭頭回調函數放chunk存取部分數據，並將其push
        body.push(chunk);
      });

      request.on("end", () => {  /////一個監聽是否讀取完畢
        body = Buffer.concat(body).toString(); //////BUFFER類型數據看不懂，concat合併BUF數據，轉字串
        body = qs.parse(body); ///// 以拆分模塊再轉物件讀取 變成{user:'aaa' , password:'aaa'}
        console.log(body);

        if (body.username === "john" && body.password === "john123") {
          response.statusCode = 301; /////跳轉頁面的狀態馬，要用301
          response.setHeader("Location", "/login-success.html"); /////設定頭部訊息，地點和跳轉頁面
        } else {
          response.statusCode = 301;
          response.setHeader("Location", "/login-fail.html");
        }

        response.end();
      });
    }
  }
});

server.listen(port, ip, () => { ///監聽前端的請求 端口、地址、回調函數，這個函數沒有參數
  console.log(`Server is running at http://${ip}:${port}`); ///變量要用模塊包起來
});