from flask import Flask, request, Response
from flask import render_template
import json
from flask_cors import *
from data import *

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def makeResp(data):
    resp = Response(json.dumps(data),  mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    resp.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return resp

# 保存
@app.route('/saveMark', methods=['POST'])
def saveData():
    # 获取到的类型不好调，乱七八糟的
    tmpData = request.form.to_dict()
    for key in tmpData:
        dic = json.loads(key)
        pageId = dic["pageID"]
        pageDic = dataDic[pageId]
        info = dic['info']
        pageDic['lines'] = info['lines']
        pageDic['texts'] = info['texts']

    writeToFile(dataDic)

    return makeResp({"code":"s_ok"})

@app.route('/getMarkInfo', methods=['GET'])
def getMarkInfo():
    tmpData = request.args.to_dict()
    pageId = tmpData['pageId']
    data = dataDic[pageId]
    return makeResp(data)

# 请求页面
@app.route('/getPages', methods=['GET'])
def getPages():
    allPages = []
    for page in dataDic:
        allPages.append(page)
    pageResult = {'allPages':allPages}
    return makeResp(pageResult)

# 获取网页
@app.route('/index.html')
def get_pagesHtml():
    return render_template('pageTable.html')

@app.route('/page.html')
def get_detailHtml():
    imgName = request.args.get('page')
    file = "/static/images/" + imgName
    return render_template('QATestID.html', file=file)

if __name__ == '__main__':
    dataDic = getData()
    # app.run()
    # app.run(host='0.0.0.0',port=8080)
    app.run(host='0.0.0.0')
