(window.webpackJsonp = window.webpackJsonp || []).push([["chunk-7d4b"], {
    "62sl": function (t, e, a) {
        "use strict";
        a.r(e);
        var s = {
            data: function () {
                return {dateRange: "近7日", recentDays: 7, curDate: (new Date).toISOString().substring(0, 10)}
            }, mounted: function () {
                this.setParent()
            }, methods: {
                setParent: function () {
                    this.$parent.curDate = this.curDate, this.$parent.recentDays = this.recentDays, this.$parent.dateRange = this.dateRange
                }, dateChange: function () {
                    this.setParent(), this.$parent.refresh()
                }, radioChange: function () {
                    "近30日" == this.dateRange ? this.recentDays = 30 : "近7日" == this.dateRange ? this.recentDays = 7 : "昨日" == this.dateRange && (this.recentDays = 1), this.setParent(), this.$parent.refresh()
                }
            }
        }, n = (a("gqLT"), a("KHd+")), r = Object(n.a)(s, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("div", [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 24}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("el-col", {attrs: {span: 16}}, [a("el-radio-group", {
                on: {
                    change: function (e) {
                        t.radioChange()
                    }
                }, model: {
                    value: t.dateRange, callback: function (e) {
                        t.dateRange = e
                    }, expression: "dateRange"
                }
            }, [a("el-radio-button", {attrs: {label: "昨日"}}), t._v(" "), a("el-radio-button", {attrs: {label: "近7日"}}), t._v(" "), a("el-radio-button", {attrs: {label: "近30日"}})], 1)], 1), t._v(" "), a("el-col", {attrs: {span: 8}}, [a("el-form", {
                staticClass: "demo-form-inline ",
                attrs: {inline: !0}
            }, [a("el-form-item", {attrs: {label: " 当前日期"}}, [a("el-date-picker", {
                attrs: {
                    type: "date",
                    "value-format": "yyyy-MM-dd",
                    placeholder: "选择日期"
                }, on: {
                    change: function (e) {
                        t.dateChange()
                    }
                }, model: {
                    value: t.curDate, callback: function (e) {
                        t.curDate = e
                    }, expression: "curDate"
                }
            })], 1)], 1)], 1)], 1)])], 1)], 1)
        }, [], !1, null, null, null);
        r.options.__file = "dateRange.vue";
        var i = r.exports, l = (a("t3Un"), {
            data: function () {
                return {
                    recentDays: this.$parent.recentDays,
                    dateRange: this.$parent.dateRange,
                    curDate: this.$parent.curDate,
                    userTotal: 123123,
                    orderUserTotal: 4343,
                    newUserCount: 4341,
                    newOrderUserCount: 1234,
                    pct: 991,
                    userChurn: 33
                }
            }, mounted: function () {
                this.init()
            }, methods: {
                getParent: function () {
                    this.curDate = this.$parent.curDate, this.recentDays = this.$parent.recentDays, this.dateRange = this.$parent.dateRange
                }, init: function () {
                    this.getParent()
                }
            }
        }), o = Object(n.a)(l, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("div", [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v("总人数  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v(" " + t._s(t.userTotal)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("人")])])])]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v("活跃用户数  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v("  " + t._s(t.orderUserTotal)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("人")])])])]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v(t._s(t.dateRange) + "注册用户数  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v(t._s(t.newUserCount)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("人")])])])]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v(t._s(t.dateRange) + "消费用户数  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v(t._s(t.newUserCount)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("人")])])])]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v(t._s(t.dateRange) + "客单价  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v(" " + t._s(t.pct)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("元")])])])]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 4}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v(t._s(t.dateRange) + "流失用户数  ")]), t._v(" "), a("br"), t._v(" "), a("div", {
                staticStyle: {
                    "font-size": "40px",
                    "text-align": "center"
                }
            }, [t._v(" " + t._s(t.userChurn)), a("span", {staticStyle: {"font-size": "20px"}}, [t._v("人")])])])])], 1)], 1)
        }, [], !1, null, null, null);
        o.options.__file = "userTotal.vue";
        var c = o.exports, u = a("MT78"), d = a.n(u), p = {
            created: function () {
                console.log("list created......")
            }, mounted: function () {
                this.init()
            }, data: function () {
                return {
                    recentDays: this.$parent.$parent.$parent.recentDays,
                    dateRange: this.$parent.$parent.$parent.dateRange,
                    xData: ["非消费用户", "消费用户"],
                    yData: [{value: 40, name: "非消费用户"}, {value: 33, name: "消费用户"}]
                }
            }, methods: {
                getParent: function () {
                    this.curDate = this.$parent.$parent.$parent.curDate, this.recentDays = this.$parent.$parent.$parent.recentDays, this.dateRange = this.$parent.$parent.$parent.dateRange
                }, init: function () {
                    this.getParent(), this.setChartData()
                }, setChartData: function () {
                    var t = {
                        title: {text: "消费用户占比", subtext: this.dateRange, left: "left"},
                        tooltip: {trigger: "item", formatter: "{a} <br/>{b} : {c} ({d}%)"},
                        legend: {left: "center", top: "bottom", data: this.xData},
                        toolbox: {
                            show: !0,
                            feature: {
                                mark: {show: !0},
                                dataView: {show: !0, readOnly: !1},
                                restore: {show: !0},
                                saveAsImage: {show: !0}
                            }
                        },
                        series: [{
                            name: "消费用户占比",
                            type: "pie",
                            radius: [10, 140],
                            center: ["50%", "50%"],
                            roseType: "radius",
                            itemStyle: {borderRadius: 5},
                            emphasis: {label: {show: !1}},
                            data: this.yData
                        }]
                    };
                    d.a.init(document.getElementById("userPaidChart")).setOption(t)
                }
            }
        }, h = Object(n.a)(p, function () {
            var t = this.$createElement;
            return (this._self._c || t)("div", {
                staticStyle: {width: "100%", height: "500px"},
                attrs: {id: "userPaidChart"}
            })
        }, [], !1, null, null, null);
        h.options.__file = "userConsume.vue";
        var g = h.exports, v = {
            created: function () {
            }, mounted: function () {
                this.init()
            }, data: function () {
                return {
                    curDate: "",
                    xData: ["05/11", "05/12", "05/13", "05/14", "05/15", "05/16"],
                    yData: [100, 230, 500, 134, 550, 400]
                }
            }, methods: {
                getParent: function () {
                    this.curDate = this.$parent.$parent.$parent.curDate
                }, init: function () {
                    this.getParent(), this.setChartData()
                }, setChartData: function () {
                    var t = {
                        title: {text: "客单价变化", subtext: this.dateRange},
                        xAxis: {type: "category", data: this.xData},
                        yAxis: {type: "value"},
                        series: [{data: this.yData, type: "line"}]
                    };
                    d.a.init(document.getElementById("userPCTChart")).setOption(t)
                }
            }
        }, f = Object(n.a)(v, function () {
            var t = this.$createElement;
            return (this._self._c || t)("div", {
                staticStyle: {width: "100%", height: "500px"},
                attrs: {id: "userPCTChart"}
            })
        }, [], !1, null, null, null);
        f.options.__file = "userPCT.vue";
        var m = f.exports, _ = {
            created: function () {
                console.log("list created......")
            }, mounted: function () {
                this.init()
            }, data: function () {
                return {
                    recentDays: this.$parent.$parent.$parent.recentDays,
                    dateRange: this.$parent.$parent.$parent.dateRange,
                    xData: ["非消费用户", "消费用户"],
                    yData: [{value: 40, name: "非消费用户"}, {value: 33, name: "消费用户"}]
                }
            }, methods: {
                getParent: function () {
                    this.curDate = this.$parent.$parent.$parent.curDate, this.recentDays = this.$parent.$parent.$parent.recentDays, this.dateRange = this.$parent.$parent.$parent.dateRange
                }, init: function () {
                    this.getParent(), this.setChartData()
                }, setChartData: function () {
                    d.a.init(document.getElementById("userNumChangeChart")).setOption({
                        xAxis: {
                            type: "category",
                            data: ["6/25", "6/26", "6/27", "6/28", "6/29", "6/30", "7/1"]
                        },
                        yAxis: {type: "value"},
                        series: [{data: [820, 932, 901, 934, 1290, 1330, 1320], type: "line", smooth: !0}]
                    })
                }
            }
        }, C = Object(n.a)(_, function () {
            var t = this.$createElement;
            return (this._self._c || t)("div", {
                staticStyle: {width: "100%", height: "500px"},
                attrs: {id: "userNumChangeChart"}
            })
        }, [], !1, null, null, null);
        C.options.__file = "userNumChange.vue";
        var y = C.exports, $ = {
            mounted: function () {
                this.init()
            }, data: function () {
                return {
                    itemName: "",
                    date: "",
                    cData: [{value: 1048, name: "20岁以下"}, {value: 735, name: "20岁至29岁"}, {value: 34, name: "30岁以上"}]
                }
            }, methods: {
                getParent: function () {
                    this.date = this.$parent.$parent.$parent.date, this.itemName = this.$parent.$parent.$parent.itemName
                }, init: function () {
                    this.getParent(), this.setChartData()
                }, setChartData: function () {
                    var t = {
                        title: {text: "年龄分布", subtext: "", left: "center"},
                        tooltip: {trigger: "item"},
                        legend: {orient: "vertical", left: "left"},
                        series: [{
                            name: "年龄分布",
                            type: "pie",
                            radius: ["40%", "70%"],
                            avoidLabelOverlap: !1,
                            itemStyle: {borderRadius: 10, borderColor: "#fff", borderWidth: 2},
                            label: {show: !1, position: "center"},
                            emphasis: {label: {show: !0, fontSize: "40", fontWeight: "bold"}},
                            labelLine: {show: !1},
                            data: this.cData
                        }]
                    };
                    d.a.init(document.getElementById("ageChart")).setOption(t)
                }
            }
        }, b = Object(n.a)($, function () {
            var t = this.$createElement;
            return (this._self._c || t)("div", {staticStyle: {width: "100%", height: "300px"}, attrs: {id: "ageChart"}})
        }, [], !1, null, null, null);
        b.options.__file = "userAge.vue";
        var D = b.exports, x = {
            mounted: function () {
                this.init()
            }, data: function () {
                return {itemName: "", date: "", cData: [{value: 1048, name: "男"}, {value: 735, name: "女"}]}
            }, methods: {
                getParent: function () {
                    this.date = this.$parent.$parent.$parent.date, this.itemName = this.$parent.$parent.$parent.itemName
                }, init: function () {
                    this.getParent(), this.setChartData()
                }, setChartData: function () {
                    var t = {
                        title: {text: "性别分布", subtext: "", left: "center"},
                        color: ["#00688B", "#B22222"],
                        tooltip: {trigger: "item"},
                        legend: {orient: "vertical", left: "left"},
                        series: [{
                            name: "性别分布",
                            type: "pie",
                            radius: ["40%", "70%"],
                            avoidLabelOverlap: !1,
                            itemStyle: {borderRadius: 10, borderColor: "#fff", borderWidth: 2},
                            label: {show: !1, position: "center"},
                            emphasis: {label: {show: !0, fontSize: "40", fontWeight: "bold"}},
                            labelLine: {show: !1},
                            data: this.cData
                        }]
                    };
                    d.a.init(document.getElementById("myChart")).setOption(t)
                }
            }
        }, w = Object(n.a)(x, function () {
            var t = this.$createElement;
            return (this._self._c || t)("div", {staticStyle: {width: "100%", height: "300px"}, attrs: {id: "myChart"}})
        }, [], !1, null, null, null);
        w.options.__file = "userGender.vue";
        var R = {
            components: {
                userTotal: c,
                userConsume: g,
                userPCT: m,
                userNumChange: y,
                userAge: D,
                userGender: w.exports,
                dateRange: i
            }, mounted: function () {
                console.log("加载..." + this.$route.params.id), this.userGroupId = this.$route.params.id, console.log("userGroupId:" + this.userGroupId)
            }, data: function () {
                return {userGroupId: "", curDate: (new Date).toISOString().substring(0, 10)}
            }, methods: {
                refresh: function () {
                    this.$refs.userTotal.init(), this.$refs.userNumChange.init(), this.$refs.userConsume.init(), this.$refs.userPCT.init(), this.$refs.userAge.init(), this.$refs.userGender.init()
                }
            }
        }, S = Object(n.a)(R, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("div", {staticClass: "app-container"}, [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 24}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("div", {
                staticStyle: {
                    "font-size": "18px",
                    color: "grey"
                }
            }, [t._v("分群id :" + t._s(t.userGroupId) + " ")])])])], 1), t._v(" "), a("dateRange"), t._v(" "), a("userTotal", {ref: "userTotal"}), t._v(" "), a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12, align: "center"}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("userNumChange", {ref: "userNumChange"})], 1)]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("userPCT", {ref: "userPCT"})], 1)])], 1), t._v(" "), a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12, align: "center"}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("userGender", {ref: "userGender"})], 1)]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("userAge", {ref: "userAge"})], 1)])], 1), t._v(" "), a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 1}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12, align: "center"}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("userConsume", {ref: "userConsume"})], 1)]), t._v(" "), a("el-col", {
                staticClass: "el-card",
                attrs: {span: 12}
            }, [a("div", {staticClass: "grid-content bg-purple"})])], 1)], 1)
        }, [], !1, null, null, null);
        S.options.__file = "user.vue";
        e.default = S.exports
    }, ckIs: function (t, e, a) {
    }, gqLT: function (t, e, a) {
        "use strict";
        var s = a("ckIs");
        a.n(s).a
    }
}]);