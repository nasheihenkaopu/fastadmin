define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'upload'], function ($, undefined, Backend, Table, Form, Upload) {

    var Controller = {
        index: function () {

            // 初始化表格参数配置
            Table.api.init({
                search: true,
                advancedSearch: true,
                pagination: true,
                extend: {
                    "index_url": "general/profile/index",
                    "add_url": "",
                    "edit_url": "",
                    "del_url": "",
                    "multi_url": "",
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                columns: [
                    [
                        {field: 'id', title: 'ID'},
                        {field: 'title', title: __('Title')},
                        {field: 'url', title: __('Url'), align: 'left', formatter: Table.api.formatter.url},
                        {field: 'ip', title: __('ip')},
                        {field: 'username', title: __('Userame')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);//当内容渲染完成后

            Form.api.bindevent($("#update-form"), null, function () {
                $("input[name='row[password]']").val('');
                var url = Config.upload.cdnurl + $("#c-avatar").val();
                top.window.$(".user-panel .image img,.user-menu > a > img,.user-header > img").prop("src", url);
                return true;
            });
            Upload.api.custom.changeavatar = function (response) {
                var url = Config.upload.cdnurl + response.url;
                $(".profile-user-img").prop("src", url);
            };
        }
    };
    return Controller;
});