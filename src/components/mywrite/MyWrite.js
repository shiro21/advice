import { useCallback, useEffect, useState } from "react";
import { api } from "../../js/api";
import Header from "../item/Header";
import MyWriteComponent from "./MyWriteComponent";
import style from '../../styles/mywrite.module.scss';


const MyWrite = () => {

    const page = "내 글 페이지";
    const user = localStorage.getItem('_advice_user');
    const [confirm, setConfirm] = useState(false);
    const [qa, setQa] = useState('질문');

    const [userData, setUserData] = useState({});
    const [enrolls, setEnrolls] = useState([]);
    const [answers, setAnswers] = useState([]);

    const data = useCallback(() => {
        if (user === null || user === undefined || user === '') return alert('로그인을 해주세요.');

        api.post('total/mywrite', {_id: user})
        .then(res => {
            setUserData(res.data.user);
            setEnrolls(res.data.enroll);
            setAnswers(res.data.answer);
        })
        .catch(err => console.log('mywrite err', err));
    }, [user, setUserData]);

    useEffect(() => {
        if (confirm === false) {
            data();
            setConfirm(true);
        }
    }, [data, confirm]);

    const listOpen = (list) => {
        setQa(list);
    }

    return (
        <article id="my_write_page">
        <div className="contents_wrap">
            <div className="row">
                
                {
                    userData ? <Header page={page} user={userData} /> : null
                }
                <div className={style.req_btn}>
                    <span onClick={() => listOpen('질문')} className={qa === '질문' ? style.req_color : ''}>질문</span>
                    <span onClick={() => listOpen('답변')} className={qa === '답변' ? style.req_color : ''}>답변</span>
                </div>
                {
                    userData ? <MyWriteComponent enrolls={enrolls} answers={answers} qa={qa} /> : "로그인하러가기"
                }
                
            </div>
        </div>
    </article>
    );
};

export default MyWrite;