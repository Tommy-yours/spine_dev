# _*_ coding:utf-8 _*_
import hashlib
import time
import xmltodict
from flask import Flask, request, make_response, jsonify
import json
import os

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/user_login', methods=['GET', 'POST'])
def user_login():
    # print("res success!!!")
    # if request.method == "GET":
    #     """对接微信服务器"""
    #     signature = request.args.get('signature')
    #     timestamp = request.args.get('timestamp')
    #     nonce = request.args.get('nonce')
    #     echostr = request.args.get('echostr')
    #
    #     tmp = [WECHAT_TOKEN, timestamp, nonce]
    #     tmp.sort()
    #     tmp = "".join(tmp).encode('utf-8')
    #     tmp = hashlib.sha1(tmp).hexdigest()
    #     if tmp == signature:
    #
    #         return make_response(echostr)
    #     else:
    #         return "error"
    if request.method == "POST":
        china_id = request.values.get('china_id')
        if china_id == '123':
            info = {
                "is_register": 'yes',
                "user_info": {'name': 'xtq', 'age': 18, 'height': 180}
            }
            return jsonify(info)
        else:
            info = {
                "is_register": 'no'
            }
            return jsonify(info)


@app.route('/user_register', methods=['POST'])
def user_register():
    if request.method == "POST":
        chinaid = request.values.get('chinaid')
        person_name = request.values.get('person_name')
        username = request.values.get('username')
        print(chinaid+' '+person_name+' '+username)
        if chinaid == '330' and person_name == 'xtq' and username == '137':
            info = {
                "msg": 'success',
            }
            return jsonify(info)
        else:
            info = {
                "msg": 'fail'
            }
            return jsonify(info)


@app.route('/save_image', methods=['POST'])
def save_image():
    print("save image ...")
    img = request.files.get('image_file')
    name = request.form.get('chinaid')
    print(name)
    if os.path.exists('./filesave/'+name):
        if os.path.exists('./filesave/'+name+'/image.jpg'):
            os.remove('./filesave/'+name+'/image.jpg')
            img.save('./filesave/' + name + '/image.jpg')
        else:
            img.save('./filesave/'+name+'/image.jpg')
    else:
        os.mkdir('./filesave/'+name)
        img.save('./filesave/' + name + '/image.jpg')
    # name = str(name) + '.jpg' // 保存图片的名称，一定要加上后缀名
    # img.save(os.path.join('face_recognition/face_database', name))
    info = {
        'msg': 'successful'
    }
    return jsonify(info)


@app.route('/save_video', methods=['POST'])
def save_video():
    print("save video ...")
    img = request.files.get('video_file')
    name = request.form.get('chinaid')
    print(name)
    if os.path.exists('./filesave/' + name):
        if os.path.exists('./filesave/' + name + '/video.mp4'):
            os.remove('./filesave/' + name + '/video.mp4')
            img.save('./filesave/' + name + '/video.mp4')
        else:
            img.save('./filesave/' + name + '/video.mp4')
    else:
        os.mkdir('./filesave/' + name)
        img.save('./filesave/' + name + '/video.mp4')
    # name = str(name) + '.jpg' // 保存图片的名称，一定要加上后缀名
    # img.save(os.path.join('face_recognition/face_database', name))
    info = {
        'msg': 'successful'
    }
    return jsonify(info)


@app.route('/deal_file', methods=['POST'])  # 调用算法
def deal_file():
    print("调用算法成功！")
    info = {
        'msg': 'successful'
    }
    return jsonify(info)


if __name__ == '__main__':
    app.run(host='192.168.1.107', port=5000, debug=True)