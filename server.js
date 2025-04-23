const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 提供靜態文件
app.use(express.static(path.join(__dirname, './')));

// 路由處理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// 啟動服務器
app.listen(port, () => {
  console.log(`服務器運行在 http://localhost:${port}`);
});