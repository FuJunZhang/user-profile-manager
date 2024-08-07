(window.webpackJsonp = window.webpackJsonp || []).push([["chunk-69e5"], {
    "0KyN": function (t, e, a) {
    }, "0mY9": function (t, e, a) {
        "use strict";
        a.r(e);
        var o = a("t3Un"), l = {
            data: function () {
                return {
                    void: "",
                    tagName: "",
                    tagCode: "",
                    formData: {
                        id: "",
                        tagId: "",
                        taskName: "",
                        execType: "",
                        taskTime: "01:00",
                        taskComment: "",
                        taskArgs: "",
                        taskType: "FLOW",
                        taskStatus: "",
                        taskExecLevel: "",
                        taskDateOfM: "",
                        taskMonth: "",
                        fileId: "",
                        fileName: "",
                        fileList: [],
                        taskTagRuleList: []
                    },
                    isUploading: !1,
                    buttonText: "确 定",
                    taskVisible: !1,
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
                    this.formData.id = "", this.formData.taskStatus = "", this.formData.taskName = "", this.formData.execType = "", this.formData.taskComment = "", this.formData.taskArgs = "", this.formData.fileId = "", this.formData.fileName = "", this.formData.taskExecLevel = "200", this.formData.fileList = [], this.isUploading = !1, this.buttonText = "确 定"
                }, customUpload: function (t) {
                    var e = this, a = new FormData;
                    a.append("file", t.file), this.isUploading = !0, this.buttonText = "上传中", Object(o.a)({
                        url: this.uploadPath,
                        method: "post",
                        data: a,
                        onUploadProgress: function (e) {
                            console.log(e.loaded);
                            var a = e.loaded / e.total * 99 | 0;
                            t.onProgress({percent: a})
                        }
                    }).then(function (a) {
                        console.log(a), e.formData.fileId = a.fileId, console.log("fileId:" + e.formData.fileId), e.isUploading = !1, e.buttonText = "确 定", t.onProgress({percent: 100}), t.onSuccess()
                    })
                }, initTaskInfo: function () {
                    var t = this;
                    Object(o.a)({url: "/taskinfo/" + this.formData.id, method: "get"}).then(function (e) {
                        console.log("得到res：" + e.id), console.log("得到res：" + e), t.formData = e, console.log("初始化编辑：" + t.formData.id), t.initFileList()
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, initFileList: function () {
                    this.formData.fileName && "" != this.formData.fileName && (this.formData.fileList = [{name: this.formData.fileName}])
                }, showDialog: function (t) {
                    this.taskVisible = !0, this.formData.id = t, console.log("this. this.formData.id :" + this.formData.id), this.formData.id && "" != this.formData.id ? (console.log("编辑页面"), this.initTaskInfo()) : console.log("新增页面")
                }, handleRemove: function (t, e) {
                    console.log(t, e)
                }, handlePreview: function (t) {
                    console.log(t.name + "::" + t.url)
                }, handleExceed: function (t, e) {
                    this.$message.warning("当前限制选择 1 个文件，本次选择了 " + t.length + " 个文件，共选择了 " + (t.length + e.length) + " 个文件")
                }, beforeRemove: function (t, e) {
                    return this.$confirm("确定移除 " + t.name + "？")
                }, closeDialog: function () {
                    this.clearDialog(), this.taskVisible = !1, this.$parent.init()
                }, onUploadSuccess: function (t, e, a) {
                }, onClosed: function () {
                    this.clearDialog(), console.log("关闭")
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
                    var t = this;
                    return console.log("this.formData.id:::::" + this.formData.id), Object(o.a)({
                        url: "/taskinfo",
                        method: "post",
                        data: this.formData
                    }).then(function (e) {
                        t.taskVisible = !1, t.$message({
                            message: "保存成功",
                            type: "success"
                        }), t.clearDialog(), t.$parent.init()
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }
            }
        }, s = (a("COtd"), a("mgoo"), a("KHd+")), i = Object(s.a)(l, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("el-dialog", {
                attrs: {title: "添加任务", visible: t.taskVisible}, on: {
                    "update:visible": function (e) {
                        t.taskVisible = e
                    }, closed: t.onClosed
                }
            }, [a("el-form", {
                ref: "form",
                attrs: {model: t.formData, "label-width": "80px"}
            }, [a("el-form-item", {
                attrs: {
                    label: "任务状态",
                    "label-width": t.formLabelWidth
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
                    value: t.formData.taskStatus, callback: function (e) {
                        t.$set(t.formData, "taskStatus", e)
                    }, expression: "formData.taskStatus"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务名称",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: t.formData.taskName, callback: function (e) {
                        t.$set(t.formData, "taskName", e)
                    }, expression: "formData.taskName"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "执行方式",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-select", {
                attrs: {placeholder: "请选择"},
                model: {
                    value: t.formData.execType, callback: function (e) {
                        t.$set(t.formData, "execType", e)
                    }, expression: "formData.execType"
                }
            }, t._l(t.execTypeOptions, function (t) {
                return a("el-option", {key: t.value, attrs: {label: t.label, value: t.value}})
            }))], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务描述",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {type: "textarea", rows: 4, placeholder: "请输入内容"},
                model: {
                    value: t.formData.taskComment, callback: function (e) {
                        t.$set(t.formData, "taskComment", e)
                    }, expression: "formData.taskComment"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "执行时点",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-time-picker", {
                attrs: {format: "HH:mm", "value-format": "HH:mm", placeholder: "任意时间点"},
                model: {
                    value: t.formData.taskTime, callback: function (e) {
                        t.$set(t.formData, "taskTime", e)
                    }, expression: "formData.taskTime"
                }
            })], 1), t._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "JAR" == t.formData.execType,
                    expression: "formData.execType=='JAR'"
                }], attrs: {label: "任务主类(spark_jar填写)", "label-width": t.formLabelWidth}
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: t.formData.mainClass, callback: function (e) {
                        t.$set(t.formData, "mainClass", e)
                    }, expression: "formData.mainClass"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "JAR包上传",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-upload", {
                staticClass: "upload-demo",
                attrs: {
                    action: "void",
                    "http-request": t.customUpload,
                    "on-preview": t.handlePreview,
                    "on-remove": t.handleRemove,
                    "before-remove": t.beforeRemove,
                    limit: 1,
                    "on-exceed": t.handleExceed,
                    "file-list": t.formData.fileList
                }
            }, [a("el-button", {
                attrs: {
                    size: "small",
                    type: "primary"
                }
            }, [t._v("点击上传")]), t._v(" "), a("div", {
                staticClass: "el-upload__tip",
                attrs: {slot: "tip"},
                slot: "tip"
            }, [t._v("只能上传jar文件")])], 1)], 1), t._v(" "), a("el-form-item", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "SQL" == t.formData.execType,
                    expression: "formData.execType=='SQL'"
                }], attrs: {label: "任务SQL", "label-width": t.formLabelWidth}
            }, [a("el-input", {
                attrs: {type: "textarea", autosize: {minRows: 4}, placeholder: "请输入内容"},
                model: {
                    value: t.formData.taskSql, callback: function (e) {
                        t.$set(t.formData, "taskSql", e)
                    }, expression: "formData.taskSql"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务级别",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-input", {
                staticClass: "input-text",
                attrs: {autocomplete: "off"},
                model: {
                    value: t.formData.taskExecLevel, callback: function (e) {
                        t.$set(t.formData, "taskExecLevel", e)
                    }, expression: "formData.taskExecLevel"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "任务参数",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {type: "textarea", rows: 4, placeholder: "请输入内容"},
                model: {
                    value: t.formData.taskArgs, callback: function (e) {
                        t.$set(t.formData, "taskArgs", e)
                    }, expression: "formData.taskArgs"
                }
            })], 1)], 1), t._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: t.closeDialog}}, [t._v("取 消")]), t._v(" "), a("el-button", {
                attrs: {
                    type: "primary",
                    loading: t.isUploading
                }, on: {click: t.submitForm}
            }, [t._v(t._s(t.buttonText))])], 1)], 1)
        }, [], !1, null, null, null);
        i.options.__file = "flowTask.vue";
        var n = {
            components: {flowTask: i.exports, tagCommonTask: a("ErEU").a}, data: function () {
                return {taskTable: [], total: 0, pageSize: 20, curPageNo: 1, taskBusiDateVisible: !1, taskBusiDate: ""}
            }, mounted: function () {
                this.init()
            }, methods: {
                formatTaskStatus: function (t, e, a, o) {
                    return "1" == a ? "开启" : "停用"
                }, addTask: function () {
                    this.$refs.flowTask.showDialog()
                }, init: function () {
                    this.curPageNo = 1, this.refreshTable()
                }, refreshTable: function () {
                    var t = this;
                    return Object(o.a)({
                        url: "/tasklist?pageNo=" + this.curPageNo + "&pageSize=" + this.pageSize + "&taskType=FLOW",
                        method: "get"
                    }).then(function (e) {
                        console.log("response.detail:" + e.detail), t.taskTable = e.detail, t.total = e.total
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, handleCurrentChange: function (t) {
                    this.refreshTable()
                }, editTask: function (t) {
                    this.$refs.flowTask.showDialog(t.id)
                }, editTagCommonTask: function () {
                    this.$refs.tagCommonTask.showDialog()
                }, showDialogForTaskDate: function () {
                    this.taskBusiDateVisible = !0
                }, genTaskProcess: function () {
                    var t = this;
                    return Object(o.a)({
                        url: "/task-gen?busidt=" + this.taskBusiDate,
                        method: "post"
                    }).then(function (e) {
                        t.tableData = e.detail, t.total = e.total, t.closeBusiDateDialog()
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, closeBusiDateDialog: function () {
                    this.refreshTable(), this.taskBusiDateVisible = !1
                }, deleteTask: function (t) {
                    var e = this;
                    this.$confirm("确定删除该任务吗 ?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function () {
                        return Object(o.a)({url: "/taskinfo/" + t.id, method: "delete"}).then(function (t) {
                            e.$message({type: "success", message: "删除成功!"}), e.refreshTable()
                        }).catch(function (t) {
                            console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                        })
                    }).catch(function () {
                    })
                }
            }
        }, r = Object(s.a)(n, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("div", {staticClass: "app-container"}, [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 24}
            }, [a("el-col", {
                staticClass: "el-card",
                attrs: {span: 24, align: "center"}
            }, [a("div", {staticClass: "grid-content bg-purple"}, [a("el-row", {
                staticClass: "el-row",
                attrs: {gutter: 24}
            }, [a("el-form", {
                staticClass: "demo-form-inline",
                attrs: {inline: !0}
            }, [a("el-form-item", [a("el-button", {
                staticClass: "el-icon-upload",
                attrs: {type: "primary"},
                on: {click: t.editTagCommonTask}
            }, [t._v("上传SQL任务通用Jar包")])], 1), t._v(" "), a("el-form-item", [a("el-button", {
                staticClass: "el-icon-plus",
                attrs: {type: "primary"},
                on: {click: t.addTask}
            }, [t._v("添加流程任务")])], 1), t._v(" "), a("el-form-item", [a("el-button", {
                staticClass: "el-icon-video-play",
                attrs: {type: "primary"},
                on: {click: t.showDialogForTaskDate}
            }, [t._v(" 手动调度任务")])], 1)], 1)], 1), t._v(" "), a("el-table", {
                staticStyle: {
                    width: "100%",
                    "font-size": "15px"
                },
                attrs: {
                    height: "650",
                    data: t.taskTable,
                    "header-cell-style": {background: "#eef1f6", color: "#606266"}
                }
            }, [a("el-table-column", {
                attrs: {
                    prop: "id",
                    label: "任务id",
                    width: "150"
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {
                    prop: "taskName",
                    label: "任务名称",
                    width: "250"
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {
                    prop: "taskStatus",
                    label: "任务状态",
                    width: "200",
                    formatter: t.formatTaskStatus
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {
                    prop: "taskExecLevel",
                    label: "执行层级",
                    width: "100"
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {
                    prop: "taskTime",
                    label: "任务作业时间",
                    width: "200"
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {
                    prop: "taskComment",
                    label: "任务说明"
                }
            }), t._v(" "), a("el-table-column", {
                attrs: {label: "操作", width: "200"},
                scopedSlots: t._u([{
                    key: "default", fn: function (e) {
                        return [a("el-button", {
                            attrs: {type: "text", size: "medium"}, on: {
                                click: function (a) {
                                    t.editTask(e.row)
                                }
                            }
                        }, [t._v("编辑")]), t._v(" "), a("el-button", {
                            attrs: {type: "text", size: "medium"},
                            on: {
                                click: function (a) {
                                    t.deleteTask(e.row)
                                }
                            }
                        }, [t._v("删除")])]
                    }
                }])
            })], 1), t._v(" "), a("el-pagination", {
                attrs: {
                    "page-size": t.pageSize,
                    "pager-count": 7,
                    "current-page": t.curPageNo,
                    layout: "total,prev, pager, next",
                    total: t.total
                }, on: {
                    "current-change": t.handleCurrentChange, "update:currentPage": function (e) {
                        t.curPageNo = e
                    }
                }
            })], 1)])], 1), t._v(" "), a("flowTask", {ref: "flowTask"}), t._v(" "), a("tagCommonTask", {ref: "tagCommonTask"}), t._v(" "), a("el-dialog", {
                attrs: {
                    title: "填写任务执行业务日期",
                    visible: t.taskBusiDateVisible
                }, on: {
                    "update:visible": function (e) {
                        t.taskBusiDateVisible = e
                    }
                }
            }, [a("el-form", [a("el-form-item", {attrs: {label: "业务日期"}}, [a("el-date-picker", {
                attrs: {
                    type: "date",
                    "value-format": "yyyy-MM-dd",
                    placeholder: "选择日期"
                }, model: {
                    value: t.taskBusiDate, callback: function (e) {
                        t.taskBusiDate = e
                    }, expression: "taskBusiDate"
                }
            })], 1)], 1), t._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: t.closeBusiDateDialog}}, [t._v("取 消")]), t._v(" "), a("el-button", {
                attrs: {type: "primary"},
                on: {click: t.genTaskProcess}
            }, [t._v("确 定")])], 1)], 1)], 1)
        }, [], !1, null, null, null);
        r.options.__file = "flowTaskList.vue";
        e.default = r.exports
    }, BCoW: function (t, e, a) {
    }, COtd: function (t, e, a) {
        "use strict";
        var o = a("BCoW");
        a.n(o).a
    }, ErEU: function (t, e, a) {
        "use strict";
        var o = a("t3Un"), l = {
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
                }, customUpload: function (t) {
                    var e = this, a = new FormData;
                    a.append("file", t.file), this.isUploading = !0, this.buttonText = "上传中", Object(o.a)({
                        url: this.uploadPath,
                        method: "post",
                        data: a,
                        onUploadProgress: function (e) {
                            console.log(e.loaded);
                            var a = e.loaded / e.total * 99 | 0;
                            t.onProgress({percent: a})
                        }
                    }).then(function (a) {
                        e.formData.taskFileId = a.fileId, console.log("taskFileId:" + e.formData.taskFileId), e.isUploading = !1, e.buttonText = "确 定", t.onProgress({percent: 100}), t.onSuccess()
                    })
                }, initTagCommonTask: function () {
                    var t = this;
                    Object(o.a)({url: "/tagcommon/" + this.formData.id, method: "get"}).then(function (e) {
                        console.log("得到res：" + e), t.formData = e, console.log("初始化编辑：" + t.formData.id), t.formData.id && t.initFileList()
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }, initFileList: function () {
                    this.formData.fileInfo && this.formData.fileInfo.fileName && "" != this.formData.fileInfo.fileName && (this.formData.fileList = [{name: this.formData.fileInfo.fileName}])
                }, showDialog: function () {
                    this.tagCommonTaskVisible = !0, this.initTagCommonTask()
                }, handleRemove: function (t, e) {
                    console.log(t, e)
                }, handlePreview: function (t) {
                    console.log(t.name + "::" + t.url)
                }, handleExceed: function (t, e) {
                    this.$message.warning("当前限制选择 1 个文件，本次选择了 " + t.length + " 个文件，共选择了 " + (t.length + e.length) + " 个文件")
                }, beforeRemove: function (t, e) {
                    return this.$confirm("确定移除 " + t.name + "？")
                }, changeSwitch: function () {
                }, closeDialog: function () {
                    this.clearDialog(), this.tagCommonTaskVisible = !1
                }, onUploadSuccess: function (t, e, a) {
                }, onClosed: function () {
                    this.clearDialog(), console.log("关闭")
                }, submitForm: function () {
                    var t = this;
                    return console.log("this.formData.id:::::" + this.formData.id), Object(o.a)({
                        url: "/tagcommon",
                        method: "post",
                        data: this.formData
                    }).then(function (e) {
                        t.tagCommonTaskVisible = !1, t.$message({message: "保存成功", type: "success"}), t.clearDialog()
                    }).catch(function (e) {
                        console.log("失败" + e), t.$message.error("服务器错误，请稍后再试！ " + e)
                    })
                }
            }
        }, s = a("KHd+"), i = Object(s.a)(l, function () {
            var t = this, e = t.$createElement, a = t._self._c || e;
            return a("el-dialog", {
                attrs: {title: "SPARP_SQL通用任务", visible: t.tagCommonTaskVisible},
                on: {
                    "update:visible": function (e) {
                        t.tagCommonTaskVisible = e
                    }, closed: t.onClosed
                }
            }, [a("el-form", {
                ref: "form",
                attrs: {model: t.formData, "label-width": "80px"}
            }, [a("el-form-item", {
                attrs: {
                    label: "任务主类",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-input", {
                attrs: {placeholder: "请输入内容"},
                model: {
                    value: t.formData.mainClass, callback: function (e) {
                        t.$set(t.formData, "mainClass", e)
                    }, expression: "formData.mainClass"
                }
            })], 1), t._v(" "), a("el-form-item", {
                attrs: {
                    label: "JAR包上传",
                    "label-width": t.formLabelWidth
                }
            }, [a("el-upload", {
                staticClass: "upload-demo",
                attrs: {
                    action: "void",
                    "http-request": t.customUpload,
                    "on-preview": t.handlePreview,
                    "on-remove": t.handleRemove,
                    "before-remove": t.beforeRemove,
                    limit: 1,
                    "on-exceed": t.handleExceed,
                    "file-list": t.formData.fileList
                }
            }, [a("el-button", {
                attrs: {
                    size: "small",
                    type: "primary"
                }
            }, [t._v("点击上传")]), t._v(" "), a("div", {
                staticClass: "el-upload__tip",
                attrs: {slot: "tip"},
                slot: "tip"
            }, [t._v("只能上传jar文件")])], 1)], 1)], 1), t._v(" "), a("div", {
                staticClass: "dialog-footer",
                attrs: {slot: "footer"},
                slot: "footer"
            }, [a("el-button", {on: {click: t.closeDialog}}, [t._v("取 消")]), t._v(" "), a("el-button", {
                attrs: {
                    type: "primary",
                    loading: t.isUploading
                }, on: {click: t.submitForm}
            }, [t._v(t._s(t.buttonText))])], 1)], 1)
        }, [], !1, null, null, null);
        i.options.__file = "tagCommonTask.vue";
        e.a = i.exports
    }, mgoo: function (t, e, a) {
        "use strict";
        var o = a("0KyN");
        a.n(o).a
    }
}]);