(window.webpackJsonp = window.webpackJsonp || []).push([["chunk-75b0"], {
    "1g4V": function (e, t, a) {
        "use strict";
        a.r(t);
        var l = a("t3Un"), o = (a("vDqi"), {
            data: function () {
                return {
                    parentTagName: "",
                    parentTagCode: "",
                    parentTagLevel: "",
                    formData: {parentTagId: "", id: "", tagCode: "", tagName: "", taglevel: "", tagType: ""},
                    tagDetailVisible: !1,
                    tagTypeOptions: [{value: "1", label: "统计型"}, {value: "2", label: "规则型"}, {
                        value: "3",
                        label: "挖掘型"
                    }, {value: "99", label: "类目"}],
                    tagValueTypeOptions: [{value: "1", label: "整数"}, {value: "2", label: "浮点"}, {
                        value: "3",
                        label: "文本"
                    }, {value: "4", label: "日期"}],
                    formLabelWidth: "180px"
                }
            }, methods: {
                clearTable: function () {
                    this.formData.parentTagId = "", this.parentTagName = "", this.parentTagCode = "", this.parentTagLevel = "", this.formData.id = "", this.formData.tagCode = "", this.formData.tagName = "", this.formData.tagType = "", this.formData.tagValueType = "", this.formData.tagValueLimit = ""
                }, initTagInfo: function (e) {
                    var t = this;
                    Object(l.a)({url: "/taginfo/" + e, method: "get"}).then(function (e) {
                        console.log("得到res：" + e.id), t.formData = e
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, showDialogForEdit: function (e) {
                    this.tagDetailVisible = !0, console.log("data id:" + e.id), console.log("data label:" + e.tagName), console.log("data tagCode:" + e.tagCode), console.log("data tagLevel:" + e.tagLevel), this.initTagInfo(e.id)
                }, showDialogForAppendRoot: function () {
                    this.tagDetailVisible = !0, this.formData.tagLevel = 1, this.formData.tagType = "99", console.log("this level:" + this.formData.tagLevel)
                }, showDialogForAppend: function (e) {
                    this.tagDetailVisible = !0, console.log("data id:" + e.id), console.log("data label:" + e.tagName), console.log("data tagCode:" + e.tagCode), console.log("data  parentData.tagLevel:" + e.tagLevel), this.formData.parentTagId = e.id, this.formData.parentTagName = e.tagName, this.formData.parentTagCode = e.tagCode, this.formData.parentTagLevel = e.tagLevel, this.formData.tagLevel = parseInt(e.tagLevel) + 1, 2 == this.formData.tagLevel && (this.formData.tagType = "99"), console.log("this level:" + this.formData.tagLevel)
                }, onClosed: function () {
                    this.clearTable()
                }, closeDialog: function () {
                    this.clearTable(), this.tagDetailVisible = !1, this.$parent.init()
                }, submitForm: function () {
                    var e = this;
                    return Object(l.a)({url: "/taginfo", method: "post", data: this.formData}).then(function (t) {
                        e.$message({
                            message: "保存成功",
                            type: "success"
                        }), e.clearTable(), e.tagDetailVisible = !1, e.$parent.init()
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }
            }
        }), i = a("KHd+"), s = Object(i.a)(o, function () {
            var e = this, t = e.$createElement, a = e._self._c || t;
            return a("el-dialog", {
                attrs: {title: "添加标签", visible: e.tagDetailVisible},
                on: {
                    "update:visible": function (t) {
                        e.tagDetailVisible = t
                    }, closed: e.onClosed
                }
            }, [a("el-form", {attrs: {model: e.formData}}, [a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: this.formData.tagLevel > 1,
                    expression: "this.formData.tagLevel>1"
                }], attrs: {label: "上级标签", "label-width": e.formLabelWidth}
            }, [a("el-input", {
                attrs: {autocomplete: "off", readonly: ""},
                model: {
                    value: e.formData.parentTagName, callback: function (t) {
                        e.$set(e.formData, "parentTagName", t)
                    }, expression: "formData.parentTagName"
                }
            })], 1), e._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: this.formData.tagLevel > 1,
                    expression: "this.formData.tagLevel>1"
                }], attrs: {label: "上级标签编码", "label-width": e.formLabelWidth}
            }, [a("el-input", {
                attrs: {autocomplete: "off", readonly: ""},
                model: {
                    value: e.formData.parentTagCode, callback: function (t) {
                        e.$set(e.formData, "parentTagCode", t)
                    }, expression: "formData.parentTagCode"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "标签编码",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {autocomplete: "off"}, model: {
                    value: e.formData.tagCode, callback: function (t) {
                        e.$set(e.formData, "tagCode", t)
                    }, expression: "formData.tagCode"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "标签名称",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {autocomplete: "off"}, model: {
                    value: e.formData.tagName, callback: function (t) {
                        e.$set(e.formData, "tagName", t)
                    }, expression: "formData.tagName"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "标签类型",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-select", {
                attrs: {placeholder: "请选择"}, model: {
                    value: e.formData.tagType, callback: function (t) {
                        e.$set(e.formData, "tagType", t)
                    }, expression: "formData.tagType"
                }
            }, e._l(e.tagTypeOptions, function (e) {
                return a("el-option", {key: e.value, attrs: {label: e.label, value: e.value}})
            }))], 1), e._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "99" != e.formData.tagType,
                    expression: "formData.tagType!='99'"
                }], attrs: {label: "标签值类型", "label-width": e.formLabelWidth}
            }, [a("el-select", {
                attrs: {placeholder: "请选择"},
                model: {
                    value: e.formData.tagValueType, callback: function (t) {
                        e.$set(e.formData, "tagValueType", t)
                    }, expression: "formData.tagValueType"
                }
            }, e._l(e.tagValueTypeOptions, function (e) {
                return a("el-option", {key: e.value, attrs: {label: e.label, value: e.value}})
            }))], 1)], 1), e._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: e.closeDialog}}, [e._v("取 消")]), e._v(" "), a("el-button", {
                attrs: {type: "primary"},
                on: {click: e.submitForm}
            }, [e._v("确 定")])], 1)], 1)
        }, [], !1, null, null, null);
        s.options.__file = "tagInfo.vue";
        var n = s.exports, r = {
            data: function () {
                return {
                    tagName: "",
                    tagCode: "",
                    formData: {
                        id: "",
                        tagId: "",
                        taskName: "",
                        execType: "",
                        taskTime: "02:40",
                        taskComment: "",
                        taskArgs: "",
                        taskType: "TAG",
                        taskStatus: "",
                        taskExecLevel: 100,
                        taskDateOfM: "",
                        taskMonth: "",
                        fileId: "",
                        fileName: "",
                        fileList: [],
                        taskTagRuleList: []
                    },
                    tagTaskVisible: !1,
                    isUploading: !1,
                    buttonText: "确 定",
                    tagTaskDateOptions: [{value: "1", label: "1"}, {value: "2", label: "2"}, {
                        value: "3",
                        label: "3"
                    }, {value: "4", label: "4"}, {value: "5", label: "5"}, {value: "6", label: "6"}, {
                        value: "7",
                        label: "7"
                    }, {value: "8", label: "8"}, {value: "9", label: "9"}, {value: "10", label: "10"}, {
                        value: "11",
                        label: "11"
                    }, {value: "12", label: "12"}, {value: "13", label: "13"}, {value: "14", label: "14"}, {
                        value: "15",
                        label: "15"
                    }, {value: "16", label: "16"}, {value: "17", label: "17"}, {value: "18", label: "18"}, {
                        value: "19",
                        label: "19"
                    }, {value: "20", label: "20"}, {value: "21", label: "21"}, {value: "22", label: "22"}, {
                        value: "23",
                        label: "23"
                    }, {value: "24", label: "24"}, {value: "25", label: "25"}, {value: "26", label: "26"}, {
                        value: "27",
                        label: "27"
                    }, {value: "28", label: "28"}, {value: "29", label: "29"}, {value: "30", label: "30"}, {
                        value: "31",
                        label: "31"
                    }],
                    tagTaskMonthOptions: [{value: "1", label: "1"}, {value: "2", label: "2"}, {
                        value: "3",
                        label: "3"
                    }, {value: "4", label: "4"}, {value: "5", label: "5"}, {value: "6", label: "6"}, {
                        value: "7",
                        label: "7"
                    }, {value: "8", label: "8"}, {value: "9", label: "9"}, {value: "10", label: "10"}, {
                        value: "11",
                        label: "11"
                    }, {value: "12", label: "12"}],
                    execTypeOptions: [{value: "SQL", label: "SPARK_SQL"}, {value: "JAR", label: "SPARK_JAR"}],
                    taskLevelOptions: [{value: "1", label: "1"}, {value: "2", label: "2"}, {
                        value: "3",
                        label: "3"
                    }, {value: "4", label: "4"}, {value: "5", label: "5"}],
                    formLabelWidth: "140px",
                    uploadPath: "http://userprofile.camc.com/upload",
                    subTagOptions: []
                }
            }, methods: {
                clearDialog: function () {
                    this.formData.tagId = "", this.formData.id = "", this.tagName = "", this.tagCode = "", this.formData.taskStatus = "", this.formData.taskName = "", this.formData.execType = "", this.formData.taskComment = "", this.formData.taskArgs = "", this.formData.taskDateOfM = "", this.formData.taskMonth = "", this.formData.fileId = "", this.formData.fileName = "", this.formData.taskExecLevel = "100", this.formData.fileList = [], this.formData.taskTagRuleList = [], this.subTagOptions = [], this.isUploading = !1, this.buttonText = "确 定"
                }, customUpload: function (e) {
                    var t = this, a = new FormData;
                    a.append("file", e.file), this.isUploading = !0, this.buttonText = "上传中", Object(l.a)({
                        url: this.uploadPath,
                        method: "post",
                        data: a,
                        onUploadProgress: function (t) {
                            console.log(t.loaded);
                            var a = t.loaded / t.total * 99 | 0;
                            e.onProgress({percent: a})
                        }
                    }).then(function (a) {
                        console.log(a), t.formData.fileId = a.fileId, console.log("fileId:" + t.formData.fileId), t.isUploading = !1, t.buttonText = "确 定", e.onProgress({percent: 100}), e.onSuccess()
                    })
                }, initSubTag: function () {
                    var e = this, t = this;
                    Object(l.a)({url: "/subtags/" + this.formData.tagId, method: "get", async: !1}).then(function (e) {
                        e.forEach(function (e, a, l) {
                            console.log({value: e.id, label: e.tagName}), t.subTagOptions.push({
                                value: e.id,
                                label: e.tagName
                            })
                        })
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }, initTaskInfo: function () {
                    var e = this;
                    Object(l.a)({url: "/taskinfo/" + this.formData.id, method: "get"}).then(function (t) {
                        console.log("得到res：" + t.id), console.log("得到res：" + t), e.formData = t, console.log("初始化编辑：" + e.formData.id), e.initFileList()
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }, initFileList: function () {
                    this.formData.fileName && "" != this.formData.fileName && (this.formData.fileList = [{name: this.formData.fileName}])
                }, showDialog: function (e) {
                    console.log(e.id + ":" + e.tagName), this.tagTaskVisible = !0, this.formData.tagId = e.id, this.tagName = e.tagName, this.tagCode = e.tagCode, this.formData.id = e.taskId, console.log("this. tagName:" + this.tagName), console.log("this. this.formData.id :" + this.formData.id), this.initSubTag(), this.formData.id && "" != this.formData.id ? (console.log("编辑页面"), this.initTaskInfo()) : (console.log("新增页面"), this.formData.taskName = "标签计算:" + this.tagName)
                }, handleRemove: function (e, t) {
                    console.log(e, t)
                }, handlePreview: function (e) {
                    console.log(e.name + "::" + e.url)
                }, handleExceed: function (e, t) {
                    this.$message.warning("当前限制选择 1 个文件，本次选择了 " + e.length + " 个文件，共选择了 " + (e.length + t.length) + " 个文件")
                }, beforeRemove: function (e, t) {
                    return this.$confirm("确定移除 " + e.name + "？")
                }, closeDialog: function () {
                    this.clearDialog(), this.tagTaskVisible = !1, this.$parent.init()
                }, onUploadSuccess: function (e, t, a) {
                }, onClosed: function () {
                    this.clearDialog(), console.log("关闭")
                }, addRow: function () {
                    this.formData.taskTagRuleList.push({
                        queryValue: "",
                        subTagId: "",
                        tagId: this.formData.tagId,
                        tagName: "",
                        status: 1
                    })
                }, deleteRow: function (e, t) {
                    t.splice(e, 1)
                }, renderHeader: function () {
                    return (0, this.$createElement)("el-button", {
                        attrs: {
                            type: "primary",
                            icon: "el-icon-plus",
                            circle: !0,
                            size: "mini"
                        }, on: {click: this.addRow}
                    })
                }, submitForm: function () {
                    var e = this;
                    return console.log("this.formData.id:::::" + this.formData.id), Object(l.a)({
                        url: "/taskinfo",
                        method: "post",
                        data: this.formData
                    }).then(function (t) {
                        e.tagTaskVisible = !1, e.$message({
                            message: "保存成功",
                            type: "success"
                        }), e.clearDialog(), e.$parent.init()
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }
            }
        }, c = (a("gRhq"), a("6F0t"), Object(i.a)(r, function () {
            var e = this, t = e.$createElement, a = e._self._c || t;
            return a("el-dialog", {
                attrs: {title: "添加任务", visible: e.tagTaskVisible},
                on: {
                    "update:visible": function (t) {
                        e.tagTaskVisible = t
                    }, closed: e.onClosed
                }
            }, [a("el-form", {
                ref: "form",
                attrs: {model: e.formData, "label-width": "80px"}
            }, [a("el-form-item", {
                attrs: {
                    label: "任务状态",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-switch", {
                staticClass: "switchStyle",
                attrs: {
                    size: "mini",
                    "on-color": "#00A854",
                    "active-text": "启用",
                    "active-value": "1",
                    "off-color": "#F04134",
                    "inactive-text": "停用",
                    "inactive-value": "2"
                },
                model: {
                    value: e.formData.taskStatus, callback: function (t) {
                        e.$set(e.formData, "taskStatus", t)
                    }, expression: "formData.taskStatus"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "标签名称",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: e.tagName, callback: function (t) {
                        e.tagName = t
                    }, expression: "tagName"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "标签编码",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: e.tagCode, callback: function (t) {
                        e.tagCode = t
                    }, expression: "tagCode"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务名称",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: e.formData.taskName, callback: function (t) {
                        e.$set(e.formData, "taskName", t)
                    }, expression: "formData.taskName"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "执行方式",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-select", {
                attrs: {placeholder: "请选择"},
                model: {
                    value: e.formData.execType, callback: function (t) {
                        e.$set(e.formData, "execType", t)
                    }, expression: "formData.execType"
                }
            }, e._l(e.execTypeOptions, function (e) {
                return a("el-option", {key: e.value, attrs: {label: e.label, value: e.value}})
            }))], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务描述",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {type: "textarea", rows: 4, placeholder: "请输入内容"},
                model: {
                    value: e.formData.taskComment, callback: function (t) {
                        e.$set(e.formData, "taskComment", t)
                    }, expression: "formData.taskComment"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务执行时点",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-time-picker", {
                attrs: {format: "HH:mm", "value-format": "HH:mm", placeholder: "任意时间点"},
                model: {
                    value: e.formData.taskTime, callback: function (t) {
                        e.$set(e.formData, "taskTime", t)
                    }, expression: "formData.taskTime"
                }
            })], 1), e._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "JAR" == e.formData.execType,
                    expression: "formData.execType=='JAR'"
                }], attrs: {label: "任务主类(spark_jar填写)", "label-width": e.formLabelWidth}
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: e.formData.mainClass, callback: function (t) {
                        e.$set(e.formData, "mainClass", t)
                    }, expression: "formData.mainClass"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "JAR包上传",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-upload", {
                staticClass: "upload-demo",
                attrs: {
                    action: "void",
                    "http-request": e.customUpload,
                    "on-preview": e.handlePreview,
                    "on-remove": e.handleRemove,
                    "before-remove": e.beforeRemove,
                    limit: 1,
                    "on-exceed": e.handleExceed,
                    "on-success": e.onUploadSuccess,
                    "file-list": e.formData.fileList
                }
            }, [a("el-button", {
                attrs: {
                    size: "small",
                    type: "primary"
                }
            }, [e._v("点击上传")]), e._v(" "), a("div", {
                staticClass: "el-upload__tip",
                attrs: {slot: "tip"},
                slot: "tip"
            }, [e._v("只能上传jar文件")])], 1)], 1), e._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "SQL" == e.formData.execType,
                    expression: "formData.execType=='SQL'"
                }], attrs: {label: "任务SQL", "label-width": e.formLabelWidth}
            }, [a("el-input", {
                attrs: {type: "textarea", autosize: {minRows: 4}, placeholder: "请输入内容"},
                model: {
                    value: e.formData.taskSql, callback: function (t) {
                        e.$set(e.formData, "taskSql", t)
                    }, expression: "formData.taskSql"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务级别",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: e.formData.taskExecLevel, callback: function (t) {
                        e.$set(e.formData, "taskExecLevel", t)
                    }, expression: "formData.taskExecLevel"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务参数",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {type: "textarea", rows: 4, placeholder: "请输入内容"},
                model: {
                    value: e.formData.taskArgs, callback: function (t) {
                        e.$set(e.formData, "taskArgs", t)
                    }, expression: "formData.taskArgs"
                }
            })], 1), e._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "SQL" == e.formData.execType,
                    expression: "formData.execType=='SQL'"
                }], attrs: {label: "标签规则配置", "label-width": e.formLabelWidth}
            }, [a("el-table", {
                staticClass: "tableBox",
                staticStyle: {width: "100%", "font-size": "14px"},
                attrs: {border: "", data: e.formData.taskTagRuleList, "header-cell-style": {background: "#f5f5f5"}}
            }, [a("el-table-column", {
                attrs: {
                    width: "100",
                    "render-header": e.renderHeader
                }
            }), e._v(" "), a("el-table-column", {
                attrs: {prop: "queryValue", label: "SQL查询值", width: "300"},
                scopedSlots: e._u([{
                    key: "default", fn: function (t) {
                        return [a("el-input", {
                            model: {
                                value: t.row.queryValue, callback: function (a) {
                                    e.$set(t.row, "queryValue", a)
                                }, expression: "scope.row.queryValue"
                            }
                        })]
                    }
                }])
            }), e._v(" "), a("el-table-column", {
                attrs: {prop: "tagId", label: "匹配标签", width: "230"},
                scopedSlots: e._u([{
                    key: "default", fn: function (t) {
                        return [a("el-select", {
                            attrs: {placeholder: "请选择"},
                            model: {
                                value: t.row.subTagId, callback: function (a) {
                                    e.$set(t.row, "subTagId", a)
                                }, expression: "scope.row.subTagId"
                            }
                        }, e._l(e.subTagOptions, function (e) {
                            return a("el-option", {key: e.value, attrs: {label: e.label, value: e.value}})
                        }))]
                    }
                }])
            }), e._v(" "), a("el-table-column", {
                attrs: {label: "操作"},
                scopedSlots: e._u([{
                    key: "default", fn: function (t) {
                        return [a("el-button", {
                            attrs: {
                                type: "primary",
                                size: "mini",
                                circle: "",
                                icon: "el-icon-minus"
                            }, nativeOn: {
                                click: function (a) {
                                    a.preventDefault(), e.deleteRow(t.$index, e.formData.taskTagRuleList)
                                }
                            }
                        })]
                    }
                }])
            })], 1)], 1)], 1), e._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: e.closeDialog}}, [e._v("取 消")]), e._v(" "), a("el-button", {
                attrs: {
                    type: "primary",
                    loading: e.isUploading
                }, on: {click: e.submitForm}
            }, [e._v(e._s(e.buttonText))])], 1)], 1)
        }, [], !1, null, null, null));
        c.options.__file = "tagTask.vue";
        var m = {
            mounted: function () {
                this.init()
            }, components: {tagInfo: n, tagTask: c.exports, tagCommonTask: a("ErEU").a}, data: function () {
                return {
                    page: "list",
                    data: [{
                        id: 1,
                        tagName: "用户属性",
                        children: [{
                            id: 4,
                            tagName: "基本属性",
                            children: [{
                                id: 9,
                                tagName: "性别",
                                taskId: 1,
                                taskStatus: 1,
                                children: [{id: 19, tagName: "男"}, {id: 29, tagName: "女"}]
                            }, {id: 10, tagName: "年龄"}]
                        }]
                    }, {
                        id: 2,
                        tagName: "一级 2",
                        children: [{id: 5, tagName: "二级 2-1"}, {id: 6, tagName: "二级 2-2"}]
                    }, {id: 3, tagName: "一级 3333", children: [{id: 7, tagName: "二级 3-1"}, {id: 8, tagName: "二级 3-2"}]}],
                    defaultProps: {children: "children", label: "tagName"}
                }
            }, methods: {
                init: function () {
                    var e = this;
                    return Object(l.a)({url: "/taglist", method: "get"}).then(function (t) {
                        e.data = t
                    }).catch(function (e) {
                        console.log("失败" + e), Vue.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, editTagCommonTask: function () {
                    this.$refs.tagCommonTask.showDialog()
                }, getCheckedNodes: function () {
                    console.log(this.$refs.tree.getCheckedNodes())
                }, getCheckedKeys: function () {
                    console.log(this.$refs.tree.getCheckedKeys())
                }, setCheckedNodes: function () {
                    this.$refs.tree.setCheckedNodes([{id: 5, label: "二级 2-1"}, {id: 9, label: "三级 1-1-1"}])
                }, setCheckedKeys: function () {
                    this.$refs.tree.setCheckedKeys([3])
                }, resetChecked: function () {
                    this.$refs.tree.setCheckedKeys([])
                }, handleClick: function (e, t, a) {
                    t && (console.log(e), this.$refs.tree.setCheckedNodes([e]))
                }, editTag: function (e) {
                    console.log(e), this.$refs.tagInfo.showDialogForEdit(e)
                }, appendRootTag: function () {
                    this.$refs.tagInfo.showDialogForAppendRoot()
                }, appendSubTag: function (e) {
                    console.log(e), this.$refs.tagInfo.showDialogForAppend(e)
                }, remove: function (e) {
                    var t = this;
                    this.$confirm("确定删除该任务吗 ?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        return Object(l.a)({url: "/taginfo/" + e.id, method: "delete"}).then(function (e) {
                            t.$message({type: "success", message: "删除成功!"}), t.refreshTable()
                        }).catch(function (e) {
                            console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                        })
                    }).catch(function () {
                    })
                }, tagTaskEdit: function (e) {
                    this.$refs.tagTask.showDialog(e)
                }, changeSwitch: function (e) {
                    console.log(e.taskStatus)
                }, renderContent: function (e, t) {
                    var a = this, l = t.node, o = t.data, i = t.store;
                    return console.log("h:" + e), console.log("node:" + l), console.log("data:" + o), console.log("store:" + i), e("span", {class: "custom-tree-node"}, [e("span", {attrs: {align: "right"}}, [" ", l.label, " "]), e("span", {
                        attrs: {align: "left"},
                        class: "rt"
                    }, [e("el-button", {
                        directives: [{name: "if", value: "node.level==2"}],
                        attrs: {size: "mini", type: "text"},
                        on: {
                            click: function () {
                                return a.append(o)
                            }
                        }
                    }, ["Append"]), e("el-button", {
                        directives: [{name: "if", value: "node.level==2"}],
                        attrs: {size: "mini", type: "text"},
                        on: {
                            click: function () {
                                return a.remove(o)
                            }
                        }
                    }, ["Delete"])])])
                }
            }
        }, u = (a("7580"), Object(i.a)(m, function () {
            var e = this, t = e.$createElement, a = e._self._c || t;
            return a("div", {staticClass: "app-container"}, [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 24}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 24}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("el-form", {
                staticClass: "demo-form-inline",
                attrs: {inline: !0}
            }, [a("el-form-item", [a("el-button", {
                staticClass: "el-icon-plus",
                attrs: {type: "primary", size: "medium"},
                on: {click: e.appendRootTag}
            }, [e._v("添加一级标签 ")]), e._v(" "), a("el-button", {
                staticClass: "el-icon-refresh",
                attrs: {type: "primary", size: "medium"},
                on: {click: e.init}
            }, [e._v("刷新 ")])], 1)], 1)], 1)])], 1), e._v(" "), a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 24}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 24, align: "center"}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("el-tree", {
                ref: "tree",
                attrs: {
                    data: e.data,
                    "expand-on-click-node": !1,
                    "check-strictly": "",
                    "default-expand-all": "",
                    "node-key": "id",
                    "highlight-current": "",
                    props: e.defaultProps
                },
                on: {"check-change": e.handleClick},
                scopedSlots: e._u([{
                    key: "default", fn: function (t) {
                        var l = t.node, o = t.data;
                        return a("span", {staticClass: "custom-tree-node"}, [a("span", [e._v(e._s(l.label) + " ")]), e._v(" "), a("span", [1 == o.taskStatus ? a("el-tag", {
                            attrs: {
                                type: "success",
                                size: "mini"
                            }
                        }, [e._v("已启用")]) : 2 == o.taskStatus ? a("el-tag", {
                            attrs: {
                                type: "info",
                                size: "mini"
                            }
                        }, [e._v("已停用")]) : e._e(), e._v(" "), a("el-button", {
                            attrs: {
                                type: "text",
                                size: "mini",
                                icon: "el-icon-edit"
                            }, on: {
                                click: function () {
                                    return e.editTag(o)
                                }
                            }
                        }, [e._v(" 编辑标签 ")]), e._v(" "), a("el-button", {
                            attrs: {
                                type: "text",
                                size: "mini",
                                icon: "el-icon-plus",
                                disabled: 4 == l.level
                            }, on: {
                                click: function () {
                                    return e.appendSubTag(o)
                                }
                            }
                        }, [e._v(" 添加子标签")]), e._v(" "), a("el-button", {
                            attrs: {
                                type: "text",
                                size: "mini",
                                icon: "el-icon-delete",
                                disabled: l.level < 2
                            }, on: {
                                click: function () {
                                    return e.remove(o)
                                }
                            }
                        }, [e._v(" 删除标签   ")])], 1)])
                    }
                }])
            })], 1)])], 1), e._v(" "), a("tagInfo", {ref: "tagInfo"}), e._v(" "), a("tagTask", {ref: "tagTask"})], 1)
        }, [], !1, null, null, null));
        u.options.__file = "tagList.vue";
        t.default = u.exports
    }, "6F0t": function (e, t, a) {
        "use strict";
        var l = a("S7A6");
        a.n(l).a
    }, 7580: function (e, t, a) {
        "use strict";
        var l = a("yZz4");
        a.n(l).a
    }, ErEU: function (e, t, a) {
        "use strict";
        var l = a("t3Un"), o = {
            data: function () {
                return {
                    formData: {id: 1, mainClass: "", fileInfo: {}, taskfileId: "", fileList: []},
                    tagCommonTaskVisible: !1,
                    isUploading: !1,
                    buttonText: "确 定",
                    formLabelWidth: "180px",
                    uploadPath: "http://userprofile.camc.com/upload",
                    subTagOptions: []
                }
            }, methods: {
                clearDialog: function () {
                    this.formData.id = 1, this.formData.mainClass = "", this.formData.taskFileId = "", this.formData.fileList = [], this.formData.fileInfo = {}, this.isUploading = !1, this.buttonText = "确 定"
                }, customUpload: function (e) {
                    var t = this, a = new FormData;
                    a.append("file", e.file), this.isUploading = !0, this.buttonText = "上传中", Object(l.a)({
                        url: this.uploadPath,
                        method: "post",
                        data: a,
                        onUploadProgress: function (t) {
                            console.log(t.loaded);
                            var a = t.loaded / t.total * 99 | 0;
                            e.onProgress({percent: a})
                        }
                    }).then(function (a) {
                        t.formData.taskFileId = a.fileId, console.log("taskFileId:" + t.formData.taskFileId), t.isUploading = !1, t.buttonText = "确 定", e.onProgress({percent: 100}), e.onSuccess()
                    })
                }, initTagCommonTask: function () {
                    var e = this;
                    Object(l.a)({url: "/tagcommon/" + this.formData.id, method: "get"}).then(function (t) {
                        console.log("得到res：" + t), e.formData = t, console.log("初始化编辑：" + e.formData.id), e.formData.id && e.initFileList()
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }, initFileList: function () {
                    this.formData.fileInfo && this.formData.fileInfo.fileName && "" != this.formData.fileInfo.fileName && (this.formData.fileList = [{name: this.formData.fileInfo.fileName}])
                }, showDialog: function () {
                    this.tagCommonTaskVisible = !0, this.initTagCommonTask()
                }, handleRemove: function (e, t) {
                    console.log(e, t)
                }, handlePreview: function (e) {
                    console.log(e.name + "::" + e.url)
                }, handleExceed: function (e, t) {
                    this.$message.warning("当前限制选择 1 个文件，本次选择了 " + e.length + " 个文件，共选择了 " + (e.length + t.length) + " 个文件")
                }, beforeRemove: function (e, t) {
                    return this.$confirm("确定移除 " + e.name + "？")
                }, changeSwitch: function () {
                }, closeDialog: function () {
                    this.clearDialog(), this.tagCommonTaskVisible = !1
                }, onUploadSuccess: function (e, t, a) {
                }, onClosed: function () {
                    this.clearDialog(), console.log("关闭")
                }, submitForm: function () {
                    var e = this;
                    return console.log("this.formData.id:::::" + this.formData.id), Object(l.a)({
                        url: "/tagcommon",
                        method: "post",
                        data: this.formData
                    }).then(function (t) {
                        e.tagCommonTaskVisible = !1, e.$message({message: "保存成功", type: "success"}), e.clearDialog()
                    }).catch(function (t) {
                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                    })
                }
            }
        }, i = a("KHd+"), s = Object(i.a)(o, function () {
            var e = this, t = e.$createElement, a = e._self._c || t;
            return a("el-dialog", {
                attrs: {title: "SPARP_SQL通用任务", visible: e.tagCommonTaskVisible},
                on: {
                    "update:visible": function (t) {
                        e.tagCommonTaskVisible = t
                    }, closed: e.onClosed
                }
            }, [a("el-form", {
                ref: "form",
                attrs: {model: e.formData, "label-width": "80px"}
            }, [a("el-form-item", {
                attrs: {
                    label: "任务主类",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {placeholder: "请输入内容"},
                model: {
                    value: e.formData.mainClass, callback: function (t) {
                        e.$set(e.formData, "mainClass", t)
                    }, expression: "formData.mainClass"
                }
            })], 1), e._v(" "), a("el-form-item", {
                attrs: {
                    label: "JAR包上传",
                    "label-width": e.formLabelWidth
                }
            }, [a("el-upload", {
                staticClass: "upload-demo",
                attrs: {
                    action: "void",
                    "http-request": e.customUpload,
                    "on-preview": e.handlePreview,
                    "on-remove": e.handleRemove,
                    "before-remove": e.beforeRemove,
                    limit: 1,
                    "on-exceed": e.handleExceed,
                    "file-list": e.formData.fileList
                }
            }, [a("el-button", {
                attrs: {
                    size: "small",
                    type: "primary"
                }
            }, [e._v("点击上传")]), e._v(" "), a("div", {
                staticClass: "el-upload__tip",
                attrs: {slot: "tip"},
                slot: "tip"
            }, [e._v("只能上传jar文件")])], 1)], 1)], 1), e._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: e.closeDialog}}, [e._v("取 消")]), e._v(" "), a("el-button", {
                attrs: {
                    type: "primary",
                    loading: e.isUploading
                }, on: {click: e.submitForm}
            }, [e._v(e._s(e.buttonText))])], 1)], 1)
        }, [], !1, null, null, null);
        s.options.__file = "tagCommonTask.vue";
        t.a = s.exports
    }, S7A6: function (e, t, a) {
    }, Vlfq: function (e, t, a) {
    }, gRhq: function (e, t, a) {
        "use strict";
        var l = a("Vlfq");
        a.n(l).a
    }, yZz4: function (e, t, a) {
    }
}]);