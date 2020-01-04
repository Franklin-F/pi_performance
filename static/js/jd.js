 //指定图标的配置和数据
        option_nets = {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {},
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

        //初始化echarts实例
        var myChart_net = echarts.init(document.getElementById('nets'));

        var time_list = [];
        var wlan_list = [];
        var eth_list = [];
        var lo_list = [];

        function to1_list(data, datalist) {
            datalist.push(data);
            if (datalist.length > 5) {
                datalist.splice(0, 1)
            }
            return datalist
        }


        function get_nets() {
            htmlobj = $.ajax({url: "http://192.168.66.2:8080/api/net", async: false}); //async如果为true后边的函数将不管ajax是否反回,继续运行
            dataobj = htmlobj.responseText;
            var net_data = JSON.parse(dataobj); // 将json数据转换为 JavaScript 对象

            var name_list = net_data.name_l;
            var time_l = to1_list(net_data.time, time_list);
            var wlan_l = to1_list(net_data.list[0], wlan_list);
            var eth_l = to1_list(net_data.list[1], eth_list);
            var lo_l = to1_list(net_data.list[2], lo_list);


            option_nets.legend.data = name_list;
            option_nets.xAxis[0].data = time_l;
            option_nets.series[0].data = wlan_l;
            option_nets.series[1].data = eth_l;
            option_nets.series[2].data = lo_l;


            myChart_net.setOption(option_nets); // 渲染echats
        }
