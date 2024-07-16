(window.webpackJsonp = window.webpackJsonp || [])
    .push([["chunk-1784"], {
        Qn4E: function (e, t, a) {
            "use strict";
            var o = a("SZmH");
            a.n(o).a
        }, RCSH: function (e, t, a) {
            "use strict";
            a.r(t);
            var o, r = a("t3Un"), l = a("YEIV"), i = a.n(l), s = {


                    data: function () {
                        function getYesterdayFormatted() {
                            let today = new Date();
                            let yesterday = new Date(today);
                            yesterday.setDate(today.getDate() - 1);

                            let year = yesterday.getFullYear();
                            let month = String(yesterday.getMonth() + 1).padStart(2, '0');
                            let day = String(yesterday.getDate()).padStart(2, '0');

                            return `${year}-${month}-${day}`;
                        }

                        return {
                            // formData 是用于存储表单数据的对象。
                            formData: {
                                // id: 用户分群的唯一标识符。
                                id: "",
                                // userGroupName: 分群名称。
                                userGroupName: "",
                                // tagConditions: 标签条件列表。
                                tagConditions: [],
                                // userGroupNum: 预估的分群人数。
                                userGroupNum: "",
                                // updateType: 分群的更新类型。
                                updateType: "",
                                // userGroupComment: 分群的备注信息。
                                userGroupComment: "",
                                // busiDate: 业务日期（用于调试）。
                                busiDate: getYesterdayFormatted()
                            },
                            // userGroupVisible: !1: 控制用户分群对话框的显示状态，初始值为 false。
                            userGroupVisible: !1,
                            // updateTypeOptions: [{...}, {...}]: 更新类型的选项，包括手动和每日。
                            updateTypeOptions: [{value: "MANUAL", label: "手动"}, {value: "DAILY", label: "每日"}],
                            // operatorOptions: [{...}, {...}, ...]: 操作符的选项，包括等于、大于等于、小于等于、大于、小于、不等于、包含和不包含。
                            operatorOptions: [
                                {value: "eq", label: "等于"},
                                {value: "gte", label: "大于等于"},
                                {value: "lte", label: "小于等于"},
                                {value: "gt", label: "大于"},
                                {value: "lt", label: "小于"},
                                {value: "neq", label: "不等于"},
                                {value: "in", label: "包含"},
                                {value: "nin", label: "不包含"}],
                            // formLabelWidth 是表单标签的宽度。
                            formLabelWidth: "180px",
                            // tagOptions: []: 标签选项的初始化为空数组，后续会从服务器获取。
                            tagOptions: []
                        }
                    },


                    methods: (o = {
                        // 清空对话框中的表单数据。
                        clearDialog: function () {
                            this.formData.id = "",
                                this.formData.userGroupName = "",
                                this.formData.tagConditions = [],
                                this.formData.userGroupNum = "",
                                this.formData.updateType = "",
                                this.formData.userGroupComment = ""
                        },
                        // 根据用户分群ID初始化用户分群信息
                        initUserGroup: function () {
                            var e = this;
                            Object(r.a)({url: "/user-group/" + this.formData.id, method: "get"})// 发送GET请求获取用户分群信息
                                .then(function (t) {
                                    console.log("得到res：" + t.id), // 打印返回的ID
                                        console.log("得到res：" + t),// 打印返回的数据
                                        e.formData = t,// 将返回的数据赋值给表单数据
                                        console.log("初始化编辑：" + e.formData.id),// 打印初始化编辑信息
                                        e.initFileList()// 初始化文件列表（假设存在此方法）
                                }).catch(function (t) {
                                console.log("失败" + t), // 打印错误信息
                                    e.$message.error("服务器错误，请稍后再试！ " + t)// 显示错误消息
                            })
                        },


                        // 初始化标签选项。
                        initTagOptions: function () {
                            var e = this;
                            Object(r.a)({url: "/tag-cascader/3", method: "get"})// 发送GET请求获取标签选项
                                .then(function (t) {
                                    e.tagOptions = t// 将返回的标签选项赋值给tagOptions
                                })
                                .catch(function (t) {
                                    console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                                })
                        },


                        // 检查表单数据是否完整有效。
                        checkData: function () {
                            var e = this;
                            if (!this.formData.tagConditions || 0 == this.formData.tagConditions.length || this.formData.tagConditions.tagValues || !this.formData.busiDate)
                                return console.log(this.formData.tagConditions), // 打印标签条件
                                    console.log(this.formData.busiDate),// 打印业务日期
                                    this.$message.error("请填写条件及业务日期 "), !1;// 显示错误消息
                            var t = !0;
                            return this.formData.tagConditions.forEach(function (a) {
                                console.log(a.tagValues.length + "111" + a.operator),// 打印标签值长度和操作符
                                a.tagValues.length > 1 && "in" != a.operator && "nin" != a.operator && (e.$message.error("多条标签值，请使用包含或不包含！"), t = !1)
                            }),
                                console.log("operatorflag:" + t), // 打印操作符标志
                                !!t
                        },


                        // 根据表单数据预估人数。
                        evaluateNum: function () {
                            var e = this;
                            // 首先检查数据是否有效，如果无效则直接返回
                            if (this.checkData())

                                console.log("Sending request with data:", this.formData);

                            // 发送一个POST请求到服务器进行预估
                                return Object(r.a)({
                                    url: "/user-group-evaluate",// 预估的API地址
                                    method: "post",// 使用POST方法
                                    data: this.formData// 发送的数据为当前表单数据
                                })
                                    .then(function (t) {
                                        // 如果请求成功，将返回的分群人数设置到表单数据中
                                        e.formData.userGroupNum = t
                                    })
                                    .catch(function (t) {
                                        // 如果请求失败，输出错误信息并显示错误提示
                                        console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                                    })
                        },

                        // 显示用户分群对话框并初始化标签选项。
                        showDialog: function (e) {
                            this.userGroupVisible = !0,// 设置对话框可见
                                this.formData.id = e,    // 设置表单数据的ID为传入的参数
                                this.initTagOptions(),// 初始化标签选项
                                console.log("this. this.formData.id :" + this.formData.id),
                                // 如果ID存在且不为空，则初始化任务信息（编辑页面），否则为新增页面
                                this.formData.id && "" != this.formData.id ? (console.log("编辑页面"), this.initTaskInfo()) : console.log("新增页面")
                        },

                        // 处理标签值失焦事件。
                        selectBlur: function (e, t) {
                            // 当标签值输入框失去焦点时，更新表单数据中的标签值
                            t.tagValue = e.target.value
                        },

                        // 处理标签改变事件，更新标签名称和值。
                        selectTagChange: function (e, t) {
                            var a = this;
                            console.log("index:" + t), console.log("tagref:label:" + this.$refs.tagRef), console.log("label:" + this.$refs.tagRef.getCheckedNodes()[0]), console.log("label" + this.$refs.tagRef.getCheckedNodes()[0].pathLabels);
                            var o = this.$refs.tagRef.getCheckedNodes()[0].pathLabels, l = "";
                            o && (l = o[o.length - 1]),  // 获取标签路径中的最后一个标签名
                                this.formData.tagConditions[t].tagName = l,
                                this.formData.tagConditions[t].tagValue = "";
                            console.log("#######");
                            var i = e[e.length - 1];
                            this.formData.tagConditions[t].tagCode = i,
                                // 发送一个GET请求获取标签值列表
                                Object(r.a)({
                                    url: "/tagcode-tagvalue/" + i,
                                    method: "get"
                                }).then(function (e) {
                                    // 请求成功后，更新标签值列表
                                    a.formData.tagConditions[t].tagValueList = e, console.log(a.formData)
                                }).catch(function (e) {
                                    console.log("失败" + e), a.$message.error("服务器错误，请稍后再试！ " + e)
                                });


                        },


                        // 处理操作符改变事件。
                        selectOperatorChange: function (e, t) {
                            // 根据选中的操作符值查找对应的操作符对象
                            var a = this.operatorOptions.find(function (t) {
                                return t.value === e
                            });
                            console.log("optItem.label:" + a.label), this.formData.tagConditions[t].operatorName = a.label
                        },

                        // 获取标签值列表
                        // fetchTagValues: function (e, t) {
                        //     var e = this;
                        //     // 发送请求获取标签值列表
                        //     console.log("bbbbbb");
                        //     console.log(t);
                        //     console.log(e);
                        //
                        //     return Object(r.a)({
                        //         url: "/tagcode-tagvalue/" + encodeURIComponent(tagCode), // 假设这个是获取标签值的API
                        //         method: "get"
                        //     }).then(function (t) {
                        //         // 将获取的标签值列表赋值给当前行的 tagValueList
                        //         e.$set(row, "tagValueList", t.data);
                        //     }).catch(function (t) {
                        //         console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                        //     })
                        // },


                        // 关闭对话框并清空数据。
                        closeDialog: function () {
                            // 清空对话框中的数据
                            this.clearDialog(),
                                // 隐藏对话框
                                this.userGroupVisible = !1,
                                // 调用父组件的初始化方法
                                this.$parent.init()
                        },

                        // 对话框关闭时清空数据。
                        onClosed: function () {
                            // 清空对话框中的数据
                            this.clearDialog(),
                                console.log("关闭")
                        },

                        // 渲染表格头部，添加按钮。
                        renderHeader: function () {
                            // 返回一个创建的el-button元素，用于在表格头部添加按钮
                            return (0, this.$createElement)("el-button", {
                                attrs: {
                                    type: "primary",
                                    icon: "el-icon-plus",
                                    circle: !0,
                                    size: "mini"
                                }, on: {click: this.addRow}
                            })
                        },

                        // 在标签条件中添加一行。
                        addRow: function () {
                            // 向表单数据中的标签条件数组添加一个新的空对象
                            this.formData.tagConditions.push({
                                tagCodePath: "",
                                tagCode: "",
                                tagName: "",
                                operator: "",
                                tagValue: "",
                                tagValueList: []
                            })
                        },
                        // 删除标签条件中的一行。
                        deleteRow: function (e, t) {
                            // 从标签条件数组中删除指定索引的一行
                            t.splice(e, 1)
                        }
                    },

                        i()(o, "renderHeader", function () {
                            return (0, this.$createElement)("el-button", {
                                attrs: {
                                    type: "primary",
                                    icon: "el-icon-plus",
                                    circle: !0,
                                    size: "mini"
                                }, on: {click: this.addRow}
                            })
                        }),
                        // 提交表单数据。
                        i()(o, "submitForm", function () {
                            var e = this;
                            // 返回一个创建的el-button元素，用于在表格头部添加按钮（重复代码，可能是错误）
                            return console.log("this.formData.id:::::" + this.formData.id), Object(r.a)({
                                url: "/user-group", // 提交的API地址
                                method: "post",
                                data: this.formData // 发送的数据为当前表单数据
                            }).then(function (t) {
                                // 请求成功后，隐藏对话框并显示成功提示
                                e.userGroupVisible = !1, e.$message({
                                    message: "保存成功",
                                    type: "success"
                                }), e.clearDialog(), e.$parent.init()
                            }).catch(function (t) {
                                console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                            })
                        }), o)


                },


                // 引入模块和组件
                n = (a("Qn4E"), a("fhhM"), a("KHd+")),
                // 创建一个 Vue 组件
                u = Object(n.a)(s, function () {
                        var e = this, t = e.$createElement, a = e._self._c || t;
                        // 返回创建的组件结构
                        // el-dialog：创建一个对话框，用于输入用户分群信息
                        return a("el-dialog", {
                                attrs: {title: "创建分群", visible: e.userGroupVisible, width: "60%"},
                                on: {
                                    // 绑定对话框可见属性的更新事件
                                    "update:visible": function (t) {
                                        e.userGroupVisible = t
                                    },
                                    // 对话框关闭事件
                                    closed: e.onClosed
                                }
                            },
                            // el-form：创建一个表单，包含多个 el-form-item 表单项。
                            [a("el-form", {
                                // 绑定表单引用和表单数据模型
                                ref: "form",
                                attrs: {model: e.formData, "label-width": "80px", size: "mini"}
                            }, [
                                // 表单项：分群名称
                                a("el-form-item", {
                                        attrs: {
                                            label: "分群名称",
                                            "label-width": e.formLabelWidth,
                                            size: "mini"
                                        }
                                    },
                                    // el-input：用于输入文本信息，如分群名称、业务日期、分群备注等。
                                    [a("el-input", {
                                        staticClass: "input-text",
                                        attrs: {autocomplete: "off"},
                                        model: {
                                            // 双向绑定分群名称
                                            value: e.formData.userGroupName, callback: function (t) {
                                                e.$set(e.formData, "userGroupName", t)
                                            }, expression: "formData.userGroupName"
                                        }
                                    })], 1),


                                e._v(" "),
                                // 表单项：业务日期（调试专用）
                                a("el-form-item", {
                                        attrs: {
                                            label: "业务日期(调试专用)",
                                            "label-width": e.formLabelWidth,
                                            size: "mini"
                                        }
                                    },
                                    // el-date-picker：日期选择器，用于选择业务日期。
                                    [a("el-date-picker", {
                                        attrs: {type: "date", "value-format": "yyyy-MM-dd", placeholder: "选择日期"},
                                        model: {
                                            // 双向绑定业务日期
                                            value: e.formData.busiDate, callback: function (t) {
                                                e.$set(e.formData, "busiDate", t)
                                            }, expression: "formData.busiDate"
                                        }
                                    })],

                                    1),


                                e._v(" "),
                                // 表单项：筛选条件
                                a("el-form-item", {
                                        attrs: {
                                            label: "筛选条件",
                                            "label-width": e.formLabelWidth,
                                            size: "mini"
                                        }
                                    },
                                    // el-table：用于显示和输入标签条件，包括标签、操作符和标签值。
                                    [a("el-table", {
                                        staticClass: "tableBox",
                                        staticStyle: {width: "100%", "font-size": "14px"},
                                        attrs: {
                                            border: "",
                                            data: e.formData.tagConditions,
                                            "header-cell-style": {background: "#f5f5f5"},
                                            size: "mini"
                                        }
                                    }, [
                                        // 表头：添加按钮
                                        a("el-table-column", {
                                            attrs: {
                                                width: "60",
                                                "render-header": e.renderHeader
                                            }
                                        }), e._v(" "),

                                        // 标签列
                                        a("el-table-column", {
                                            attrs: {prop: "tagCodePath", label: "标签", width: "160", size: "mini"},
                                            scopedSlots: e._u([{
                                                key: "default", fn: function (t) {
                                                    return [a("el-cascader", {
                                                        ref: "tagRef",
                                                        attrs: {"show-all-levels": !1, options: e.tagOptions},
                                                        on: {
                                                            // 标签改变事件
                                                            change: function (a) {
                                                                e.selectTagChange(a, t.$index);
                                                                console.log("aaaaaa, ");
                                                                console.log(t.row);
                                                                // e.fetchTagValues(a, t.row); // 调用方法获取标签值
                                                            }
                                                        },
                                                        model: {
                                                            value: t.row.tagCodePath, callback: function (a) {
                                                                e.$set(t.row, "tagCodePath", a)
                                                            }, expression: "scope.row.tagCodePath"
                                                        }
                                                    })]
                                                }
                                            }])
                                        }),
                                        e._v(" "),

                                        // 操作符列
                                        a("el-table-column", {
                                            attrs: {prop: "operator", label: "操作", width: "130"},
                                            scopedSlots: e._u([{
                                                key: "default", fn: function (t) {
                                                    return [a("el-select", {
                                                        ref: "operatorRef",
                                                        attrs: {placeholder: "请选择"},
                                                        on: {
                                                            // 操作符改变事件
                                                            change: function (a) {
                                                                e.selectOperatorChange(a, t.$index)
                                                            }
                                                        },
                                                        model: {
                                                            value: t.row.operator, callback: function (a) {
                                                                e.$set(t.row, "operator", a)
                                                            }, expression: "scope.row.operator"
                                                        }
                                                    }, e._l(e.operatorOptions, function (e) {
                                                        return a("el-option", {
                                                            key: e.value,
                                                            attrs: {label: e.label, value: e.value}
                                                        })
                                                    }))]
                                                }
                                            }])
                                        }),
                                        e._v(" "),
                                // 标签值列
                                a("el-table-column", {
                                    attrs: {prop: "tagValues", label: "标签值", width: "170"},
                                    scopedSlots: e._u([{
                                        key: "default", fn: function (t) {
                                            return [a("el-select", {
                                                attrs: {
                                                    filterable: "",
                                                    multiple: "",
                                                    placeholder: "请选择标签值"
                                                }, on: {
                                                    // 失去焦点事件
                                                    blur: function (a) {
                                                        e.selectBlur(a, t.row)
                                                    }
                                                }, model: {
                                                    value: t.row.tagValues, callback: function (a) {
                                                        e.$set(t.row, "tagValues", a)
                                                    }, expression: "scope.row.tagValues"
                                                }
                                            }, e._l(t.row.tagValueList, function (e) {
                                                return a("el-option", {
                                                    key: e.label,
                                                    attrs: {label: e.label, value: e.label}
                                                })
                                            }))]
                                        }
                                    }])
                                }),
                                e._v(" "),
                                        // 操作列：删除按钮
                                        a("el-table-column", {
                                            attrs: {label: "操作"},
                                            scopedSlots: e._u([{
                                                key: "default", fn: function (t) {
                                                    // el-button：提供添加、删除、保存和取消的按钮。
                                                    // 这段代码完整地定义了一个 Vue.js 组件，提供了用于管理用户分群的界面和逻辑。
                                                    return [a("el-button", {
                                                        attrs: {
                                                            type: "primary",
                                                            size: "mini",
                                                            circle: "",
                                                            icon: "el-icon-minus"
                                                        }, nativeOn: {
                                                            // 删除行事件
                                                            click: function (a) {
                                                                a.preventDefault(), e.deleteRow(t.$index, e.formData.tagConditions)
                                                            }
                                                        }
                                                    })]
                                                }
                                            }])
                                        })], 1)], 1),
                                e._v(" "),
                                // el-form-item：用于显示分群人数
                                a("el-form-item", {
                                    attrs: {
                                        label: "分群人数",
                                        "label-width": e.formLabelWidth
                                    }
                                }, [a("el-input", {
                                    staticClass: "input-text",
                                    staticStyle: {width: "140px"},
                                    attrs: {autocomplete: "off", readonly: ""},
                                    model: {
                                        value: e.formData.userGroupNum, callback: function (t) {
                                            e.$set(e.formData, "userGroupNum", t)
                                        }, expression: "formData.userGroupNum"
                                    }
                                }), e._v(" "), a("el-button", {
                                    attrs: {type: "primary"},
                                    on: {click: e.evaluateNum}
                                }, [e._v("预估人数")])], 1), e._v(" "),
                                // el-form-item：用于选择更新类型
                                a("el-form-item", {
                                    attrs: {
                                        label: "更新类型",
                                        "label-width": e.formLabelWidth
                                    }
                                }, [a("el-select", {
                                    attrs: {"allow-create": "", filterable: "", placeholder: "请选择"},
                                    model: {
                                        value: e.formData.updateType, callback: function (t) {
                                            e.$set(e.formData, "updateType", t)
                                        }, expression: "formData.updateType"
                                    }
                                }, e._l(e.updateTypeOptions, function (e) {
                                    return a("el-option", {key: e.value, attrs: {label: e.label, value: e.value}})
                                }))], 1), e._v(" "),
                                // el-form-item：用于输入分群说明
                                a("el-form-item", {
                                    attrs: {
                                        label: "分群说明",
                                        "label-width": e.formLabelWidth
                                    }
                                }, [a("el-input", {
                                    attrs: {type: "textarea", rows: 4, placeholder: "请输入内容"},
                                    model: {
                                        value: e.formData.userGroupComment, callback: function (t) {
                                            e.$set(e.formData, "userGroupComment", t)
                                        }, expression: "formData.userGroupComment"
                                    }
                                })], 1)], 1), e._v(" "),
                                // 对话框底部按钮
                                a("div", {
                                    staticClass: "dialog-footer",
                                    attrs: {slot: "footer"},
                                    slot: "footer"
                                }, [a("el-button", {on: {click: e.closeDialog}}, [e._v("取 消")]), e._v(" "), a("el-button", {
                                    attrs: {type: "primary"},
                                    on: {click: e.submitForm}
                                }, [e._v("确 定")])], 1)], 1)
                    },

                    [], !1, null, null, null);
            u.options.__file = "userGroup.vue";

// 定义一个 Vue 组件对象
            var c = {
                    // 定义该组件包含的子组件
                    components: {userGroup: u.exports},
                    // 定义组件的数据
                    data: function () {
                        return {
                            refreshId: "",
                            tableData: [],
                            total: 0,
                            pageSize: 20,
                            curPageNo: 1,
                            busiDateVisible: !1,
                            busiDate: ""
                        }
                    },
                    // 组件挂载时调用的钩子函数
                    mounted: function () {
                        // 初始化组件
                        this.init()
                    },
                    // 定义组件的方法
                    methods: {
                        // 格式化日期
                        dateFormat: function (e, t, a, o) {
                            var r = e[t.property];
                            if (null != r) {
                                var l = new Date(r);
                                return l.getFullYear() + "/" + (l.getMonth() + 1) + "/" + l.getDate() + " " + l.getHours() + ":" + l.getMinutes() + ":" + l.getSeconds()
                            }
                        },
                        // 初始化组件
                        init: function () {
                            this.curPageNo = 1, this.refreshTable()
                        },
                        // 显示用户洞察（功能未实现）
                        showUserInsight: function (e) {
                        },
                        // 显示业务日期对话框
                        showDialogForBusiDate: function (e) {
                            this.refreshId = e.id, this.busiDateVisible = !0
                        },
                        // 刷新表格数据
                        refreshTable: function () {
                            var e = this;
                            return Object(r.a)({
                                url: "/user-group-list?pageNo=" + this.curPageNo + "&pageSize=" + this.pageSize + " ",
                                method: "get"
                            }).then(function (t) {
                                console.log("response.detail:" + t.detail), e.tableData = t.detail, e.total = t.total
                            }).catch(function (t) {
                                console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                            })
                        },
                        // 刷新用户分群
                        refreshUserGroup: function () {
                            var e = this;
                            return Object(r.a)({
                                url: "/user-group-refresh/" + this.refreshId + "?busiDate=" + this.busiDate,
                                method: "post"
                            }).then(function (t) {
                                e.$message({type: "success", message: "刷新完成!"}), e.busiDateVisible = !1, e.refreshTable()
                            }).catch(function (t) {
                                console.log("失败" + t), e.$message.error("服务器错误，请稍后再试！ " + t)
                            })
                        },
                        // 处理当前页码变化
                        handleCurrentChange: function (e) {
                            this.refreshTable()
                        },
                        // 关闭业务日期对话框
                        closeBusiDateDialog: function () {
                            this.refreshTable(), this.busiDateVisible = !1, this.refreshId = ""
                        },
                        // 显示创建用户分群对话框
                        showDialogCreateUserGroup: function () {
                            this.$refs.userGroup.showDialog()
                        },
                        // 格式化更新类型
                        formatUpdateType: function (e, t, a, o) {
                            return "MANUAL" == a ? "手动" : "自动"
                        },
                    }
                },
                // 创建并导出 Vue 组件
                f = Object(n.a)(c, function () {
                    var e = this, t = e.$createElement, a = e._self._c || t;
                    return a("div", {staticClass: "app-container"}, [
                        // 创建行和列
                        a("el-row", {
                            staticClass: "el-row",
                            attrs: {gutter: 24}
                        }, [a("el-col", {
                            staticClass: "el-card",
                            attrs: {span: 24, align: "center"}
                        }, [a("div", {staticClass: "grid-content bg-purple"}, [
                            // 创建行和表单
                            a("el-row", {
                                staticClass: "el-row",
                                attrs: {gutter: 24}
                            }, [a("el-form", {
                                staticClass: "demo-form-inline",
                                attrs: {inline: !0}
                            }, [a("el-form-item", [
                                // 创建按钮
                                a("el-button", {
                                    attrs: {type: "primary"},
                                    on: {click: e.showDialogCreateUserGroup}
                                }, [e._v("创建分群")])], 1)], 1)], 1), e._v(" "),
                            // 创建表格
                            a("el-table", {
                                staticStyle: {
                                    width: "100%",
                                    "font-size": "15px"
                                },
                                attrs: {
                                    height: "1000",
                                    data: e.tableData,
                                    "header-cell-style": {background: "#eef1f6", color: "#2559c2"}
                                }
                            }, [
                                // 创建表格列：分群ID
                                a("el-table-column", {
                                    attrs: {
                                        prop: "id",
                                        label: "分群ID",
                                        width: "100"
                                    }
                                }), e._v(" "),
                                // 创建表格列：分群名称
                                a("el-table-column", {
                                    attrs: {
                                        prop: "userGroupName",
                                        label: "分群名称",
                                        width: "150"
                                    }
                                }), e._v(" "),
                                // 创建表格列：分群条件
                                a("el-table-column", {
                                    attrs: {
                                        prop: "conditionComment",
                                        label: "分群条件"
                                    }
                                }), e._v(" "),
                                // 创建表格列：更新方式
                                a("el-table-column", {
                                    attrs: {
                                        prop: "updateType",
                                        label: "更新方式",
                                        width: "100",
                                        formatter: e.formatUpdateType
                                    }
                                }), e._v(" "),
                                // 创建表格列：分群人数
                                a("el-table-column", {
                                    attrs: {
                                        prop: "userGroupNum",
                                        label: "分群人数",
                                        width: "100"
                                    }
                                }), e._v(" "),
                                // 创建表格列：创建日期
                                a("el-table-column", {
                                    attrs: {
                                        prop: "createTime",
                                        label: "创建日期",
                                        formatter: e.dateFormat,
                                        width: "150"
                                    }
                                }), e._v(" "),
                                // 创建表格列：更新日期
                                a("el-table-column", {
                                    attrs: {
                                        prop: "updateTime",
                                        label: "更新日期",
                                        formatter: e.dateFormat,
                                        width: "150"
                                    }
                                }),
                                e._v(" "),
                                // 创建表格列：操作
                                a("el-table-column", {
                                    attrs: {label: "操作", width: "140"},
                                    scopedSlots: e._u([{
                                        key: "default", fn: function (t) {
                                            return [
                                                // 创建更新按钮
                                                a("el-button", {
                                                    attrs: {type: "text", size: "medium"}, on: {
                                                        click: function (a) {
                                                            e.showDialogForBusiDate(t.row)
                                                        }
                                                    }
                                                }, [e._v("更新")]), e._v(" "),

                                                // 创建洞察链接
                                                a("router-link", {attrs: {to: "/statistics/userProfile/user_insight/" + t.row.id}}, [a("el-button", {
                                                        attrs: {
                                                            type: "text",
                                                            size: "medium"
                                                        }
                                                    }
                                                    // , [e._v("洞察")]
                                                )], 1)]
                                        }
                                    }])
                                })], 1), e._v(" "),

                            // 创建分页组件
                            a("el-pagination", {
                                attrs: {
                                    "page-size": e.pageSize,
                                    "pager-count": 7,
                                    "current-page": e.curPageNo,
                                    layout: "total,prev, pager, next",
                                    total: e.total
                                }, on: {
                                    "current-change": e.handleCurrentChange, "update:currentPage": function (t) {
                                        e.curPageNo = t
                                    }
                                }
                            })], 1)])], 1), e._v(" "),
                        // 创建用户分群组件
                        a("userGroup", {ref: "userGroup"}), e._v(" "),
                        // 创建业务日期对话框
                        a("el-dialog", {
                            attrs: {
                                title: "填写业务日期",
                                visible: e.busiDateVisible,
                                width: "60%"
                            }, on: {
                                "update:visible": function (t) {
                                    e.busiDateVisible = t
                                }
                            }
                        }, [
                            // 创建表单
                            a("el-form", [
                                // 创建表单项：业务日期
                                a("el-form-item", {attrs: {label: "业务日期"}}, [a("el-date-picker", {
                                    attrs: {
                                        type: "date",
                                        "value-format": "yyyy-MM-dd",
                                        placeholder: "选择日期"
                                    }, model: {
                                        value: e.busiDate, callback: function (t) {
                                            e.busiDate = t
                                        }, expression: "busiDate"
                                    }
                                })], 1)], 1), e._v(" "),
                            // 创建对话框底部按钮
                            a("div", {
                                staticClass: "dialog-footer",
                                attrs: {slot: "footer"},
                                slot: "footer"
                            }, [
                                // 创建取消按钮
                                a("el-button", {on: {click: e.closeBusiDateDialog}}, [e._v("取 消")]), e._v(" "),
                                // 创建确定按钮
                                a("el-button", {
                                    attrs: {type: "primary"},
                                    on: {click: e.refreshUserGroup}
                                }, [e._v("确 定")])], 1)], 1)], 1)
                }, [], !1, null, null, null);
            // 导出组件
            f.options.__file = "userGroupList.vue";
            t.default = f.exports
        },


        "RU/L": function (e, t, a) {
            // 导入依赖模块
            a("Rqdy");
            var o = a("WEpk").Object;
            // 导出一个函数，用于定义对象属性
            e.exports = function (e, t, a) {
                return o.defineProperty(e, t, a)
            }
        },

// 定义了一个模块 "Rqdy"
        Rqdy: function (e, t, a) {
            var o = a("Y7ZC");
            o(o.S + o.F * !a("jmDH"), "Object", {defineProperty: a("2faE").f})
        },
// 定义了模块 "SEkw"
        SEkw: function (e, t, a) {
            e.exports = {default: a("RU/L"), __esModule: !0}
        },
// 空模块 "SZmH"
        SZmH: function (e, t, a) {
        },
// 定义了模块 "YEIV"
        YEIV: function (e, t, a) {
            "use strict";
            t.__esModule = !0;
            var o = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(a("SEkw"));
            t.default = function (e, t, a) {
                return t in e ? (0, o.default)(e, t, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = a, e
            }
        },
// 空模块 "c5Tt"
        c5Tt: function (e, t, a) {
        },
// 空模块 "fhhM"
        fhhM: function (e, t, a) {
            "use strict";
            var o = a("c5Tt");
            a.n(o).a
        }
    }]);

    