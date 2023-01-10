import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../js/api';
import style from '../../styles/login.module.scss';
import { setStorage } from '../../js/storage';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigation = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const idChange = (event) => {
        setId(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const loginSubmit = (event) => {
        event.preventDefault()
        const userData = {
            id: id,
            password: password
        };

        api.post('user/login', userData)
        .then(res => {
            if (res.data.code === 'n') alert(res.data.message);
            else if (res.data.code === 'y') {
                setStorage(res.data);
                navigation('/', {state: {res}});
            }
        })
        .catch(err => console.log('login Error', err));
    };
    return (
        <article id="login_page">
            <section className={style.login_component}>
                <h1>로그인</h1>
                
                <form onSubmit={loginSubmit}>
                    <div className={style.input_wrap}>
                        <input type="text" value={id} onChange={idChange} placeholder="아이디를 입력해주세요." />
                    </div>

                    <div className={style.input_wrap}>
                        <input type="password" value={password} onChange={passwordChange} placeholder="비밀번호를 입력해주세요." />
                    </div>

                    <button>로그인하기</button>

                    <div className={style.join_move}>
                        아직 회원이 아니신가요? <span><Link to="/join">회원가입하러가기</Link></span>
                    </div>
                </form>

            </section>
        </article>
    );
};

export default Login;