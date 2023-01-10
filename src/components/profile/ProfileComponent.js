import { useState } from 'react';
import { api } from '../../js/api';
import style from '../../styles/profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const ProfileComponent = ({userData}) => {
    
    const navigation = useNavigate();
    
    const [profile, setProfile] = useState(false);

    const [email, setEmail] = useState(userData.email);
    const [nick, setNick] = useState(userData.nick);

    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const nickChange = (event) => {
        setNick(event.target.value)
    }

    const profileChange = () => {
        setProfile(true)
    };

    const profileConfirm = () => {
        const newData = {
            _id: userData._id,
            email: email,
            nick: nick
        };
        api.post('user/profile', newData)
        .then(res => {
            let user = res.data.data;
            navigation('/profile', {state: {user}});
            setProfile(false);
        })
        .catch(err => console.log('profileChange Err', err));
    }

    return (
        <section className={style.profile_wrap}>
            <h1>프로필 <span><Link to="/">나가기</Link></span></h1>
            <div className={style.input_wrap}>
                <div className={style.left}>아이디</div>
                <div className={style.right}>{userData.id}</div>
            </div>

            <div className={style.input_wrap}>
                <div className={style.left}>이메일</div>
                {
                    profile ? <input type="text" onChange={emailChange} value={email} placeholder="이메일을 입력해주세요." /> : <div className={style.right}>{userData.email}</div>
                }
            </div>

            <div className={style.input_wrap}>
                <div className={style.left}>닉네임</div>
                {
                    profile ? <input type="text" onChange={nickChange} value={nick} placeholder="아이디를 입력해주세요." /> : <div className={style.right}>{userData.nick}</div>
                }
            </div>

            {
                profile ? <button onClick={profileConfirm}>변경완료</button> : <button onClick={profileChange}>변경하기</button>
            }
            
        </section>
    );
};

export default ProfileComponent;