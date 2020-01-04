#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2019/12/30 20:11
# @Author  : Aries
# @Site    : Home
# @File    : main.py
# @Software: PyCharm
import time
import os
from flask import Flask, render_template, json, Response
import psutil

app = Flask(__name__)


@app.route('/')
def index():
    # return Response(json.dumps({'categories':cpu_list,'data':cpu_list}), content_type='application/json')
    return render_template('1.html')


@app.route('/api/cpu', methods=['GET'])
def get_cpu_list():
    cpu_name = ['cpu' + str(i) for i in range(psutil.cpu_count())]
    cpu_list = [i for i in psutil.cpu_percent(interval=1, percpu=True)]
    print(cpu_list)
    return Response(json.dumps({'cpu_name': cpu_name, 'cpu_list': cpu_list}), content_type='application/json')


@app.route('/api/ram', methods=['GET'])
def get_ram_list():
    ram_all = psutil.virtual_memory()
    ram_time = str(time.strftime("%H:%M:%S", time.localtime()))
    ram_used = ram_all.used / 1024 ** 2
    ram_buffers = ram_all.buffers / 1024 ** 2
    ram_cache = ram_all.cached / 1024 ** 2
    ram_swap = psutil.swap_memory().used / 1024 ** 2
    ram = round(psutil.virtual_memory().total / 1024 ** 3, 2)
    return Response(json.dumps({
        'ram_time': ram_time,
        'ram_used': ram_used,
        'ram': ram,
        'ram_cache': ram_cache,
        'ram_buffers': ram_buffers,
        'ram_swap': ram_swap,
    }),
        content_type='application/json')


@app.route('/api/disk', methods=['GET'])
def disk():
    disk_name = ['product']
    disk_total = []
    disk_used = ['已使用']
    disk_free = ['未使用']
    for i in psutil.disk_partitions():
        disk_name.append(i.mountpoint)
        disk_total.append(round(psutil.disk_usage(i.mountpoint).total / 1024 ** 3, 2))
        disk_used.append(round(psutil.disk_usage(i.mountpoint).used / 1024 ** 3, 2))
        disk_free.append(round(psutil.disk_usage(i.mountpoint).free / 1024 ** 3, 2))

    return Response(json.dumps({
        'disk_name': disk_name,
        'disk_total': disk_total,
        'disk_used': disk_used,
        'disk_free': disk_free,
    }),
        content_type='application/json')


@app.route('/api/net', methods=['GET'])
def met_work():
    net_name = []
    net_list = []
    for i in psutil.net_io_counters(pernic=True):
        net_name.append(str(i))

    for i in net_name:
        s1 = psutil.net_io_counters(pernic=True).get(i)
        time.sleep(1)
        s2 = psutil.net_io_counters(pernic=True).get(i)
        net_list.append(s2.bytes_recv - s1.bytes_recv)

    return Response(json.dumps({
        'name_l': net_name,
        'list': net_list,
        'time': str(time.strftime("%H:%M:%S", time.localtime()))
    }), content_type='application/json')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5000', debug=True)
