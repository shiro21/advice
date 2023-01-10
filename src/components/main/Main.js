import MainHeader from './MainHeader';
import MainComponent from './MainComponent';
import { api } from '../../js/api';
import { useState, useEffect } from 'react';
import { getStorage } from '../../js/storage';
import { useLocation } from 'react-router-dom';

const Main = () => {

    console.log('main');
    const location = useLocation();

    const [user, setUser] = useState({});

    // notify
    const [notify, setNotify] = useState([]);

    useEffect(() => {
        const userData = {
            token: getStorage.token,
            user: getStorage.user
        };

        api.post('user/single', userData)
        .then(res => {
            if (res.data.code === 'y') {
                setUser(res.data.data);
                setNotify(res.data.notify);
            }
        })
        .catch(err => console.log('single Err', err));
    }, [location.pathname])
    console.log(notify);

    // header에서 넘어오는 내용
    const [title, setTitle] = useState('');

    const parentFunction = (title) => {
        setTitle(title);
    };

    return (
        <>
            {
                user ? (
                    <article id="main_page">
                        <div className="contents_wrap">
                            <div className="row">
                                <MainHeader
                                    user={user}
                                    notify={notify}
                                    parentFunction={parentFunction}
                                />
            
                            </div>
                        </div>
                        <MainComponent
                            changeTitle={title}
                        />
                    </article>
                ) : null
            }
        </>
    );
};

export default Main;