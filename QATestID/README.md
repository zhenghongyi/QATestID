# 前提

* 安装依赖库`pip3 install -r requirements.txt`，主要是`Flask`、`flask_cors`和`biplist`
* 配置，打开`QATestID/static/js/request.js`，将`serverIP`赋值为本机IP地址

# 使用

* `QATestID/static/images/`目录下添加要标注的页面截图（建议根据页面功能命名截图）
* 启动服务`python3 server.py`
* 浏览器访问`当前ip地址:5000/index.html`

