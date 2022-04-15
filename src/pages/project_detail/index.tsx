import { Fragment, memo, useState } from 'react'
import './style/style.css'

interface FormStandard {
    // 报错
    // 原因是遍历时 key 不是 string 类型，js是帮我们默认转好的，ts 就不是，可以在 tsconfig 里允许任何索引错误，或者声明为string类型
    // [name: string]: string;
    name: string;
    description: string;
    sort: string;
    email?: any;
}

interface ProjectDetailPropsStandard {
    display: boolean;
    changeDisplay: Function;
}

interface FormDetailPropsStandard {
    changeDisplay: Function
}

// TODO: 常量命名 FORM_STANDARD、DEFAULT_STATE
const DEFAULT_STATE: FormStandard = {
    name: '',
    description: '',
    sort: '',
    email: ''
}

function FormDetail(props: FormDetailPropsStandard) {// TODO: props 类型
    const { changeDisplay } = props
    // 提交表单信息时使用
    let formData: FormStandard = JSON.parse(JSON.stringify(DEFAULT_STATE)) // TODO
    // 表单项改变时使用
    let [nameData, setNameData] = useState<string>('')
    let [descriptionData, setDescriptionData] = useState<string>('')
    let [sortData, setSortData] = useState<string>('')
    let [emailData, setEmailData] = useState<string>('')
    // isEmailDisabled 为 true 代表email不可用，false 代表email可用
    let [isEmailDisabled, setEmailDisabled] = useState(false)

    function closeForm() {
        changeDisplay(false)
    }
    // 提交表单并判断各项是否为空
    function submitForm(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        //  true为显示弹框，false为关闭弹窗
        let isDisplay = false
        let copyMessage: FormStandard = JSON.parse(JSON.stringify(DEFAULT_STATE))
        let prompt_message = ''

        //  TODO：后移
        // 但是后移了不好遍历
        Object.assign(copyMessage, { name: nameData },
            { description: descriptionData },
            { sort: sortData },
            !isEmailDisabled ? { email: emailData } : {}
        )
        for (let key in copyMessage) {
            // TODO:
            // case 1 :作业类型是否为空
            // if 空 报错
            // else 通过三元运算根据类型，决定 prompt_message 是否需要添加邮箱为空
            // 其他 判空
            if (key === 'sort') {
                prompt_message += copyMessage[key] ? '' : `${key}不能为空\n`
                prompt_message += copyMessage[key] === 'sort2' ? '' : checkEmailFormat(copyMessage['email'])
            }
            else if (key !== 'email') {
                prompt_message += copyMessage[key] ? '' : `${key}不能为空\n`
            }
        }

        if (prompt_message) {
            isDisplay = true
            alert(prompt_message)
        }
        // false，关
        if (!isDisplay) {
            console.log('----------------表单内容----------------')
            Object.assign(formData, copyMessage)
            console.log(formData)
            changeDisplay(false)
        }
    }
    // 判断名字是否超出8个字
    function changeName(e: React.ChangeEvent<HTMLInputElement>): boolean {
        if (e) {
            const { value } = e.target
            if (value.length <= 8) {
                setNameData(value)
                return true
            }
            else {
                alert('项目名称不可以超过8个字')
            }
        }
        return false
    }
    function changeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e) {
            const { value } = e.target
            setDescriptionData(value)
        }
    }
    function changeSort(e: React.ChangeEvent<HTMLInputElement>) {
        if (e) {
            const { value } = e.target
            setSortData(value)
            value === 'sort2' ? setEmailDisabled(true) : setEmailDisabled(false)
        }
    }
    function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        if (e) {
            const { value } = e.target
            setEmailData(value)
        }
    }
    // 判断邮箱是否合法
    function checkEmailFormat(value: string): string {
        let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
        let isCorrectFormat = reg.test(value)
        // TODO 错误判断放前边
        // return isCorrectFormat?
        if (!value) {
            return 'email不能为空\n'
        }
        // else {
        return isCorrectFormat ? '' : 'email格式不正确\n'
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
                                value={nameData} />
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目描述：</span>
                        <div className="info">
                            <textarea className='info' name="description" onChange={changeDescription} value={descriptionData} cols={20} rows={5}></textarea>
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目类型：</span>
                        <div className='info'>
                            <p className='info_sort'>
                                <input id='sort1' type="radio" onChange={changeSort} name='sort' value='sort1' />
                                <label htmlFor="sort1">类型1</label>
                            </p>
                            <p className='info_sort'>
                                <input id='sort2' type="radio" onChange={changeSort} name='sort' value='sort2' />
                                <label htmlFor="sort2">类型2</label>
                            </p>
                            <p className='info_sort'>
                                <input id='sort3' type="radio" onChange={changeSort} name='sort' value='sort3' />
                                <label htmlFor="sort3">类型3</label>
                            </p>
                        </div>
                    </div>
                    <div className='content_items'>
                        <span className='label'>项目owner：</span>
                        <div className="info">
                            <input type="text" disabled={isEmailDisabled} name='email' onChange={changeEmail} value={emailData} />
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

export default memo(function ProjectDetail(props: ProjectDetailPropsStandard): any {
    const { display, changeDisplay } = props
    // TODO 三元运算符
    return display ? <FormDetail changeDisplay={changeDisplay} /> : <></>
})
