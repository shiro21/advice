import style from '../../styles/main.module.scss';
import logo from '../../logo.svg';
import menuBar from '../../styles/icon/menu.svg';
import profile from '../../styles/icon/profile.svg';
import bell from '../../styles/icon/bell.svg';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeStorage } from '../../js/storage';


const MainHeader = ({user, notify, parentFunction}) => {

    const navigation = useNavigate();
    
    // list
    const [notification, setNotification] = useState(false);
    const [menu, setMenu] = useState(false);

    // search
    const [titleSearch, setTitleSearch] = useState('');

    
    const onSearch = (e) => {
        setTitleSearch(e.target.value)
    }
    useEffect(() => {
        parentFunction(titleSearch);
    }, [titleSearch, parentFunction])


    const listOpen = (list) => {
        switch(list) {
            case 'notification' :
                if (notification === false) setNotification(true);
                else setNotification(false);
            break;

            case 'menu' :
                if (menu === false) setMenu(true); 
                else setMenu(false);
            break;

            case 'close' :
                setMenu(false);
                setNotification(false);
            break;

            default :
            break;
        }
    };

    const profileMove = () => {
        navigation('/profile', {state: {user}});
    };

    const bookmarkMove = () => {
        navigation('/bookmark');
    };

    const moveNotify = (item) => {
        navigation(`/article/${item.article}`);
    }

    const logoutMove = () => {
        removeStorage();
        navigation('/login');
    };

    return (
        <header id={style.header}>
            <div className={style.items}>
                <h1>
                    <em>
                        <Link to={"/"}>
                            <img src={logo} alt="logo" />
                        </Link>
                    </em>
                </h1>
            </div>
            <div className={style.items}>
                <div className={style.input_wrap}>
                    <input type="text" value={titleSearch} onChange={onSearch} placeholder="입력해주세요." />
                </div>
            </div>
            <div className={style.items}>
                <div className={style.list_wrap}>
                    <div className={style.list}>
                        <button onClick={profileMove}>
                            <img src={profile} alt="profile" />
                        </button>
                    </div>
                    <div className={style.list}>
                        <button onClick={() => {listOpen('notification')}}>
                            <img src={bell} alt="notification" />
                        </button>
                        {
                            notification ? (
                                <div>
                                    <div className={[style.notification, style.list_open].join(" ")}>
                                        <h5>알림입니다.</h5>
                                        <ul>
                                            {
                                                notify.map((item, index) => (
                                                    <li key={index} onClick={() => moveNotify(item)}>
                                                        {
                                                            (function() {
                                                                if (item.type === 'article') return (<h6>{item.owner.nick}님께서 새로운 글을 올리셨습니다.</h6>)
                                                                else if (item.type === 'answer') return (<h6>{item.owner.nick}님께서 답변을 달아주셨습니다.</h6>)
                                                                else if (item.type === 'comment') return (<h6>{item.owner.nick}님께서 새로운 댓글을 달아주셨습니다.</h6>)
                                                            })()
                                                        }
                                                        
                                                        {/* <div>{item.createdAt}</div> */}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className="bg_color" onClick={() => {listOpen('close')}}></div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className={style.list}>
                        <button onClick={() => {listOpen('menu')}}>
                            <img src={menuBar} alt="menu" />
                        </button>
                        {
                            menu ? (
                                <div>
                                    <div className={[style.menu, style.list_open].join(" ")}>
                                        <h5>메뉴</h5>
                                        {
                                            user.id !== undefined ? (
                                                <ul>
                                                    <li><Link to onClick={(e) => {
                                                        e.preventDefault()
                                                        profileMove()
                                                    }}>{user.id}</Link></li>
                                                    <li><Link to="/enroll">글쓰기</Link></li>
                                                    <li><Link to onClick={(e) => {
                                                        e.preventDefault()
                                                        bookmarkMove()
                                                    }}>북마크</Link></li>
                                                    <li><Link to="/my_write">내 글</Link></li>
                                                    <hr />
                                                    <li><Link to onClick={(e) => {
                                                        e.preventDefault()
                                                        logoutMove()
                                                    }}>로그아웃</Link></li>
                                                </ul>
                                            ) : (
                                                <div>
                                                    <Link to="/login">로그인 해주세요.</Link>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="bg_color" onClick={() => {listOpen('close')}}></div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;