"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style/style.css");
// TODO: 常量命名 FORM_STANDARD、DEFAULT_STATE
var DEFAULT_STATE = {
    name: '',
    description: '',
    sort: '',
    email: ''
};
function FormDetail(props) {
    var changeDisplay = props.changeDisplay;
    // 提交表单信息时使用
    var formData = JSON.parse(JSON.stringify(DEFAULT_STATE)); // TODO
    // 表单项改变时使用
    var _a = react_1.useState(''), nameData = _a[0], setNameData = _a[1];
    var _b = react_1.useState(''), descriptionData = _b[0], setDescriptionData = _b[1];
    var _c = react_1.useState(''), sortData = _c[0], setSortData = _c[1];
    var _d = react_1.useState(''), emailData = _d[0], setEmailData = _d[1];
    // isEmailDisabled 为 true 代表email不可用，false 代表email可用
    var _e = react_1.useState(false), isEmailDisabled = _e[0], setEmailDisabled = _e[1];
    function closeForm() {
        changeDisplay(false);
    }
    // 提交表单并判断各项是否为空
    function submitForm(e) {
        e.preventDefault();
        //  true为显示弹框，false为关闭弹窗
        var isDisplay = false;
        var copyMessage = JSON.parse(JSON.stringify(DEFAULT_STATE));
        var prompt_message = '';
        //  TODO：后移
        // 但是后移了不好遍历
        Object.assign(copyMessage, { name: nameData }, { description: descriptionData }, { sort: sortData }, !isEmailDisabled ? { email: emailData } : {});
        for (var key in copyMessage) {
            // TODO:
            // case 1 :作业类型是否为空
            // if 空 报错
            // else 通过三元运算根据类型，决定 prompt_message 是否需要添加邮箱为空
            // 其他 判空
            if (key === 'sort') {
                prompt_message += copyMessage[key] ? '' : key + "\u4E0D\u80FD\u4E3A\u7A7A\n";
                prompt_message += copyMessage[key] === 'sort2' ? '' : checkEmailFormat(copyMessage['email']);
            }
            else if (key !== 'email') {
                prompt_message += copyMessage[key] ? '' : key + "\u4E0D\u80FD\u4E3A\u7A7A\n";
            }
        }
        if (prompt_message) {
            isDisplay = true;
            alert(prompt_message);
        }
        // false，关
        if (!isDisplay) {
            console.log('----------------表单内容----------------');
            Object.assign(formData, copyMessage);
            console.log(formData);
            changeDisplay(false);
        }
    }
    // 判断名字是否超出8个字
    function changeName(e) {
        if (e) {
            var value = e.target.value;
            if (value.length <= 8) {
                setNameData(value);
                return true;
            }
            else {
                alert('项目名称不可以超过8个字');
            }
        }
        return false;
    }
    function changeDescription(e) {
        if (e) {
            var value = e.target.value;
            setDescriptionData(value);
        }
    }
    function changeSort(e) {
        if (e) {
            var value = e.target.value;
            setSortData(value);
            value === 'sort2' ? setEmailDisabled(true) : setEmailDisabled(false);
        }
    }
    function changeEmail(e) {
        if (e) {
            var value = e.target.value;
            setEmailData(value);
        }
    }
    // 判断邮箱是否合法
    function checkEmailFormat(value) {
        var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        var isCorrectFormat = reg.test(value);
        // TODO 错误判断放前边
        // return isCorrectFormat?
        if (!value) {
            return 'email不能为空\n';
        }
        // else {
        return isCorrectFormat ? '' : 'email格式不正确\n';
        // }
    }
    // 判断选项是否选择 sort2
    // TODO: 是否需要单独函数
    //#region 已删除，改为三元运算符实现
    // function judgeSort(e: any) {
    //     let { name, value } = e.target
    //     if (value === 'sort2') {
    //         setEmailDisabled(true)
    //     }
    //     else {
    //         setEmailDisabled(false)
    //     }
    // }
    //#endregion
    return (React.createElement(react_1.Fragment, null,
        React.createElement("form", { className: 'project_form' },
            React.createElement("div", { className: 'header' },
                React.createElement("span", { className: 'label' }, "\u521B\u5EFA\u9879\u76EE\u8868\u5355"),
                React.createElement("span", { onClick: closeForm, id: 'close_dialog' }, "X")),
            React.createElement("div", { className: 'content' },
                React.createElement("div", { className: 'content_items' },
                    React.createElement("span", { className: 'label' }, "\u9879\u76EE\u540D\u79F0\uFF1A"),
                    React.createElement("div", { className: "info" },
                        React.createElement("input", { type: "text", name: 'name', onChange: changeName, value: nameData }))),
                React.createElement("div", { className: 'content_items' },
                    React.createElement("span", { className: 'label' }, "\u9879\u76EE\u63CF\u8FF0\uFF1A"),
                    React.createElement("div", { className: "info" },
                        React.createElement("textarea", { className: 'info', name: "description", onChange: changeDescription, value: descriptionData, cols: 20, rows: 5 }))),
                React.createElement("div", { className: 'content_items' },
                    React.createElement("span", { className: 'label' }, "\u9879\u76EE\u7C7B\u578B\uFF1A"),
                    React.createElement("div", { className: 'info' },
                        React.createElement("p", { className: 'info_sort' },
                            React.createElement("input", { id: 'sort1', type: "radio", onChange: changeSort, name: 'sort', value: 'sort1' }),
                            React.createElement("label", { htmlFor: "sort1" }, "\u7C7B\u578B1")),
                        React.createElement("p", { className: 'info_sort' },
                            React.createElement("input", { id: 'sort2', type: "radio", onChange: changeSort, name: 'sort', value: 'sort2' }),
                            React.createElement("label", { htmlFor: "sort2" }, "\u7C7B\u578B2")),
                        React.createElement("p", { className: 'info_sort' },
                            React.createElement("input", { id: 'sort3', type: "radio", onChange: changeSort, name: 'sort', value: 'sort3' }),
                            React.createElement("label", { htmlFor: "sort3" }, "\u7C7B\u578B3")))),
                React.createElement("div", { className: 'content_items' },
                    React.createElement("span", { className: 'label' }, "\u9879\u76EEowner\uFF1A"),
                    React.createElement("div", { className: "info" },
                        React.createElement("input", { type: "text", disabled: isEmailDisabled, name: 'email', onChange: changeEmail, value: emailData }),
                        React.createElement("p", { className: 'hint' }, "tips:\u586B\u5199\u4EBA\u5458\u7684\u90AE\u7BB1")))),
            React.createElement("div", { className: "footer" },
                React.createElement("button", { onClick: closeForm, type: "button", id: 'cancelButton' }, "\u53D6\u6D88"),
                React.createElement("button", { onClick: submitForm, type: "button", id: 'verifyButton' }, "\u786E\u8BA4")))));
}
exports["default"] = react_1.memo(function ProjectDetail(props) {
    var display = props.display, changeDisplay = props.changeDisplay;
    // TODO 三元运算符
    return display ? React.createElement(FormDetail, { changeDisplay: changeDisplay }) : React.createElement(React.Fragment, null);
});
