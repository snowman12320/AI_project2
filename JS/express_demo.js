// var express = require('express');
// var app = express();
// // const port = 8080

// app.get('/json_data', function(req, res) {
//     const data = require('./data.json'); 
//     res.json(data);
// });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })


// app.get('/parameters', function(req, res) {
//     const head_info = req.query.head;
//     const para_info = req.query.para;
//     head_html = '<h1>' + head_info + '</h1>' 
//     paragraph_html = '<p>' + para_info + '</p>' 
//     res.send(head_html + paragraph_html)
// })
// // http://localhost:8080/parameters?head=Head&para=paragraph


// app.use(express.json()); // json parser for post request
// app.post('/handle', function(req, res) {
//     console.log(req.body);
//     res.json(req.body);
// })




// REST NodeJS
// 请使用 NodeJS 创建以下三个API：
// GET：/json_file?name=xxx 获取特定命名 JSON 文件的内容
// POST: /json_file?name=xxx 通过POST请求在 body 中传入 JSON 数据，更新特定文件，如文件不存在，则新建文件
// DELETE：/json_file?name=xxxx 删除特定命名的 JSON 文件
// https://turingplanet.org/2020/07/15/javascript_hw_answer/

const fs = require('fs')
var express = require('express');
var app = express();
app.use(express.json()); // JSON parser for post request

app.get('/json_file', (req, res) => {
    try {
        let data = fs.readFileSync(`${__dirname}/${req.query.name}.json`)
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.send({'error': err.toString()});
    }
});

app.post('/json_file', (req, res) => {
    try {
        const fileName = __dirname + '/' + req.query.name + '.json';
        bodyData = req.body;
        fs.open(fileName, 'r', (err, fd) => {
            if (err) {
                fs.writeFile(fileName, JSON.stringify(bodyData), (err) => { if (err) console.log(err); }); // Create new file
            } else {
                let fileContent = JSON.parse(fs.readFileSync(fileName, 'utf8')); // Read file content 
                Object.keys(bodyData).forEach( (key) => {fileContent[key] = bodyData[key];});
                fs.writeFileSync(fileName, JSON.stringify(fileContent)); // Write content to the file
            }
        })
        res.send({'success': 'File successfully updated.'})
    } catch (err) {
        console.log(err);
        res.send({'error': 'Update json file failed.'})
    }
})

app.delete('/json_file', (req, res) => {
    try {
        fs.unlinkSync(__dirname + "/" + req.query.name + '.json');
        res.send({'success': 'File deleted.'})
    } catch (err) {
        console.log(err);
        res.send({'error': 'Delete file failed.'})
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})