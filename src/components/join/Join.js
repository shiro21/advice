import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../styles/join.module.scss';
import { api } from '../../js/api';
import { setStorage } from '../../js/storage';

const Join = () => {

    const navigation = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const [gender, setGender] = useState('남자');

    const idChange = (event) => {
        setId(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const emailChange = (event) => {
        setEmail(event.target.value);
    };
    const nickChange = (event) => {
        setNick(event.target.value);
    };
    const genderChange = (event) => {
        setGender(event.target.value);
    };

    const loginSubmit = (event) => {
        event.preventDefault();

        const join = {
            id: id,
            password: password,
            email: email,
            gender: gender,
            nick: nick
        }

        api.post('/user/create', join)
        .then(res => {
            console.log(res);
            if (res.data.code === 'n') return alert(res.data.message);
            
            alert('생성 성공 !');

            setStorage(res.data);

            navigation('/', {state: {res}});
        })
        .catch(err => console.log('user/create Error', err));
    };

    return (
        <article id="join_page">
            <section className={style.join_component}>
                <h1>회원가입</h1>
                
                <form onSubmit={loginSubmit}>
                    <div className={style.input_wrap}>
                        <input type="text" value={id} onChange={idChange} placeholder="아이디를 입력해주세요." />
                    </div>

                    <div className={style.input_wrap}>
                        <input type="password" value={password} onChange={passwordChange} placeholder="비밀번호를 입력해주세요." />
                    </div>

                    <div className={style.input_wrap}>
                        <input type="email" value={email} onChange={emailChange} placeholder="이메일을 입력해주세요." />
                    </div>

                    <div className={style.input_wrap}>
                        <input type="text" value={nick} onChange={nickChange} placeholder="닉네임을 입력해주세요." />
                    </div>

                    <div className={style.input_wrap}>
                        <div className={style.radio}>
                            <input type="radio" id="man" name="gender" value="남자" onChange={genderChange} defaultChecked />
                            <label htmlFor="man">남자</label>
                        </div>
                        <div className={style.radio}>
                            <input type="radio" id="woman" name="gender" value="여자" onChange={genderChange} />
                            <label htmlFor="woman">여자</label>
                        </div>
                    </div>

                    <button>회원가입</button>
                    <button className={style.cancle_button}><Link to="/login">로그인하러가기</Link></button>
                </form>

            </section>
        </article>
    );
};

export default Join;