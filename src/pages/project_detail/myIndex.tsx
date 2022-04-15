import React, { Fragment, memo, useState } from 'react'
import './style/style.css'

interface FormStandard {
    [name: string]: string;
    description: string;
    sort: string;
    email?: any;
}

// TODO: 常量命名 FORM_STANDARD
const defaultState: FormStandard = {
    name: '',
    description: '',
    sort: '',
    email: ''
}

function FormDetail(props: any) {// TODO: props 类型
    const { changeDisplay } = props
    let [formData, setFormData] = useState<FormStandard>(defaultState) // TODO

    // isEmailDisabled 为 true 代表不可用，false 代表可用
    let [isEmailDisabled, setEmailDisabled] = useState(false)

    function closeForm() {
        changeDisplay(false)
    }
    // function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
    //     return key in object;
    // }
    // 提交表单并判断各项是否为空
    function submitForm(e: any) {
        e.preventDefault()

        // 本来是开着的，按道理要关
        // true为开，false为关
        let isDisplay = false

        for (let key in formData) {
            //#region 
            // if (key && key !== 'email' && isValidKey(key, formData)) {
            //     if (formData[key] === '') {
            //         // 不关
            //         isDisplay = true
            //         alert(`${key}不能为空`)
            //     }
            // }
            // else if(key === 'email'){
            //     if(formData[key] === ''){
            //         alert('email不能为空')
            //     }
            // }
            //#endregion
            if (formData[key] === '' && key !== 'email') {// TODO
                // 不关
                isDisplay = true
                alert(`${key}不能为空`)
            }
            else if (key === 'email') {
                // 不可用
                if (isEmailDisabled) {
                    // 不弹窗，不提交内容
                    Object.assign(formData, { [key]: '' })// TODO 不允许
                    // setFormData({ ...formData, [key]: '' })
                    // 设置一个新的对象，全部替换
                    // const newObj = { ...formData, [key]: '' }
                    // setFormData(newObj)
                    // console.log('不弹窗，不提交内容', formData)
                }
                // 可用
                else {// TODO 多重嵌套尽量不要用
                    if (formData[key] === '') {
                        // 不关
                        isDisplay = true
                        alert('email不能为空')
                    }
                    else {
                        let emailObj = {
                            target: {
                                name: key,
                                value: formData[key]
                            }
                        }
                        isDisplay = changeEmail(emailObj) as boolean
                    }
                }

            }
        }
        // false，关
        if (!isDisplay) {
            console.log('----------------表单内容----------------')
            console.log(formData)
            changeDisplay(false)
        }
    }
    // 监听各个表单的onChange事件
    function changeFormData(e: any) {
        const { name, value } = e.target
        // 1. Object.assign()
        // Object.assign(formData, { [name]: value })

        // 2. setData({...data, key: newValue})
        setFormData({ ...formData, [name]: value })

        // 3. 设置一个新的对象，全部替换
        // const newObj = { ...formData, [name]: value }
        // setFormData(newObj)

        if (name === 'sort') {
            judgeSort(e)
        }
    }
    // 判断名字是否超出8个字
    function changeName(e: any) {
        if (e) {
            const { name, value } = e.target
            if (value.length <= 8) {
                setFormData({ ...formData, [name]: value })
            }
            else {
                alert('项目名称不可以超过8个字')
            }
        }
    }
    // 判断选项是否选择 sort2
    // TODO: 是否需要单独函数
    function judgeSort(e: any) {
        let { name, value } = e.target
        if (value === 'sort2') {
            setEmailDisabled(true)
        }
        else {
            setEmailDisabled(false)
        }
    }
    // 判断邮箱是否合法
    function changeEmail(e: any) {
        if (e) {
            const { name, value } = e.target
            var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
            // TODO 错误判断放前边
            if (value === '') {
                alert('email不能为空')
            }
            else if (reg.test(value)) {
                setFormData({ ...formData, [name]: value })
                return false
            }
            else {
                alert('邮箱格式不正确')
                return true
            }
        }
    }

    return (
        <Fragment>
            <form className='project_form'>
                <div className='header'>
                    <span className='label'>创建项目表单</span>
                    <span onClick={closeForm} id='close_dialog'>X</span>
                </div>
                <div className='content'>
                    <div className='content_items'>
                        <span className='label'>项目名称：</span>
                        <div className="info">
                            <input type="text" name='name'
                                onChange={changeName}
                                value={formData.name} />
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目描述：</span>
                        <div className="info">
                            <textarea className='info' name="description" onChange={changeFormData} cols={20} rows={5}></textarea>
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目类型：</span>
                        <div className='info'>
                            <p className='info_sort'>
                                <input id='sort1' type="radio" onChange={changeFormData} name='sort' value='sort1' />
                                <label htmlFor="sort1">类型1</label>
                            </p>
                            <p className='info_sort'>
                                <input id='sort2' type="radio" onChange={changeFormData} name='sort' value='sort2' />
                                <label htmlFor="sort2">类型2</label>
                            </p>
                            <p className='info_sort'>
                                <input id='sort3' type="radio" onChange={changeFormData} name='sort' value='sort3' />
                                <label htmlFor="sort3">类型3</label>
                            </p>
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目owner：</span>
                        <div className="info">
                            <input type="text" disabled={isEmailDisabled} name='email' onChange={changeFormData} onBlur={changeEmail} />
                            <p className='hint'>tips:填写人员的邮箱</p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={closeForm} type="button" id='cancelButton'>取消</button>
                    <button onClick={submitForm} type="button" id='verifyButton'>确认</button>
                </div>
            </form>
        </Fragment>
    )
}

export default memo(function ProjectDetail(props: any): any {
    const { display, changeDisplay } = props
    // TODO 三元运算符
    if (display) {
        return <FormDetail changeDisplay={changeDisplay} />
    }
    else {
        return <></>
    }
})