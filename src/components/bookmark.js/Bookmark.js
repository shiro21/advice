import { useCallback, useEffect, useState } from "react";
import { api } from "../../js/api";
import Header from "../item/Header";
import BookmarkComponent from "./BookmarkComponent";

const Bookmark = () => {

    const page = "북마크 페이지";
    const user = localStorage.getItem('_advice_user');
    const [confirm, setConfirm] = useState(false);

    const [userData, setUserData] = useState({});
    const [bookmarks, setBookmarks] = useState([]);

    const data = useCallback(() => {
        if (user === null || user === undefined || user === '') return alert('로그인을 해주세요.');

        api.post('total/bookmark', {_id: user})
        .then(res => {
            setUserData(res.data.user);
            setBookmarks(res.data.data);
        })
        .catch(err => console.log('bookmark err', err));
    }, [user, setUserData]);

    useEffect(() => {
        if (confirm === false) {
            data();
            setConfirm(true);
        }
    }, [data, confirm]);

    return (
        <article id="bookmark_page">
            <div className="contents_wrap">
                <div className="row">
                    {
                        userData ? <Header page={page} user={userData} /> : null
                    }
                    {
                        userData ? <BookmarkComponent bookmarks={bookmarks} /> : "로그인하러가기"
                    }
                    
                </div>
            </div>
        </article>
    );
};

export default Bookmark;