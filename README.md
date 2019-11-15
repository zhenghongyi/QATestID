# QATestID
一个简单的Flask的Web应用


## 背景

公司测试的自动化，为了准确性，需要我们研发为控件添加测试id（即accessibilityidentifier，靠控件文本定位实在不太可靠）。但在添加测试id后，如何跟测试形成工作协同，其实成了一个问题，毕竟靠即时通讯工具之类的告知哪个控件是什么测试id，其实不正式，同时也不方便作为一种文档留存记录。所以有了使用Flask搭建一个简单的web应用的想法。

## 调研

想要的一个功能和场景其实很简单：

* 有一个列表列出项目中的页面；
* 对应页面，有连线连接控件和测试id，类似于我们使用QQ截图功能，截图的同时，用箭头指向，标出并做文字说明；

所以：

* 使用Flask就是因为简单、便捷；
* 由于场景简单和单一，所以数据存储不打算采用数据库，采用键值对存储的plist文件就可以了。


## 成果

### 目录结构

	QATestID/
	  ├ server.py               # 应用启动程序
	  ├ data.py					# 读写数据
	  ├ data.plist				# 数据
	  ├ requirements.txt		# 列出应用程序依赖的所有Python包
	  ├ README.md				# 使用指引
	  ├ templates/				# 模板文件目录
	      ├ pageTable.html		# 页面列表html
	      ├ QATestID.html		# 页面标注html
	  ├ static/					# 静态资源目录
	      ├ favicon.ico
	      ├ js/					# js资源目录
	          ├ request.js		# web请求的通用js，需要配置ip地址
	          ├ utility.js		# 辅助方法js
	      ├ images/				# 图片资源目录，添加需要标注的页面
	          ├ 写信.png
	     
	     
	     
#### 数据

* `data.py`采用`biplist`进行plist的读写
* 遍历`\static\images`目录，以文件名为key，查找是否已存在于plist数据中，没有的话，插入一个空的数据
* 坐标点使用`x,y`的这种形式，线以`fromX,fromY-toX,toY`的形式，简化读取，但使用时需要做解析

#### 服务

* `flask_cors`解决跨域问题
* 读取post请求里的数据类型不好解析，目前使用的方法也只是暂时

#### Html

* `request.js`封装好统一的请求方法，服务器地址具体使用的时候再配置
* 访问静态资源，需要使用`src="{{ url_for('static', filename= './目录名/文件名') }}"`
* 读取url中参数，以`src="{{ 参数名 }}"`，参数名由`server.py`中的定义
* `QATestID.html`中画标注，用了3层Canvas，一层画点（鼠标按下），一层画线（鼠标拖动），一层最终渲染结果（鼠标放开）。主要目的是为了防止在同一区域上有其他的点线，会造成干扰。

#### 效果

![avatar](/demo.png)

## 参考链接：

[Python Flask Web 框架入门](
https://blog.csdn.net/sinat_38682860/article/details/82354342)