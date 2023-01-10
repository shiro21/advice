import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../js/api';
import style from '../../styles/article.module.scss';
import bgImg from '../../styles/img/bg.gif';

import CardInline from '../card/CardInline';

const ArticleComponent = ({article, commentArray, answerArray, bookmarkArray, followArray, setCommentArray, setFollowArray}) => {
    
    const scrollRef = useRef(null);
    // const [currentImage, setCurrentImage] = useState(0);
    const slideRef = useRef(null);
    // const slideRange = currentImage * 250;

    const imageSlide = (slide) => {
        if (slide === 'next') {
            slideRef.current.scrollTo({
                left: slideRef.current.scrollLeft + 250,
                behavior: 'smooth'
            });
        }
        else if (slide === 'prev') {
            slideRef.current.scrollTo({
                left: slideRef.current.scrollLeft - 250,
                behavior: 'smooth'
            });

        }
    }

    const navigation = useNavigate();
    const params = useParams();

    const [image, setImage] = useState('');
    const [comment, setComment] = useState('');
    const [spread, setSpread] = useState('');
    const [answer, setAnswer] = useState({});
    const [bookmarkCheck, setBookmarkCheck] = useState(false);
    const [followCheck, setFollowCheck] = useState(false);
    const [followLen, setFollowLen] = useState(0);

    const user = localStorage.getItem('_advice_user');

    useEffect(() => {
        if (bookmarkArray.length === 0) return;

        for (let i = 0; i < bookmarkArray.length; i++) {
            if (bookmarkArray[i].owner === user) setBookmarkCheck(true);
            else setBookmarkCheck(false);
        }
    }, [bookmarkArray, user]);

    useEffect(() => {
        setFollowLen(followArray.length);

        if (followArray.length === 0) return;

        for (let i = 0; i < followArray.length; i++) {
            if (followArray[i].owner === user) setFollowCheck(true);
            else setFollowCheck(false);
        }
    }, [followArray, user])

    const imageExpansion = (item) => {
        if (item === 'close') return setImage('');
        setImage(item);
    };

    const commentChange = (event) => {
        setComment(event.target.value);
    };

    const commentAdd = async () => {
        if (!user) return alert('로그인을 해주세요.');

        const commentObj = {
            article: article._id,
            articleOwner: article.owner._id,
            owner: user,
            comment: comment
        };

        await api.post('comment/create', commentObj)
        .then(res => {
            if (res.data.code === 'y') {
                setCommentArray(res.data.comment);
                setComment('');
            }
        })
        .catch(err => console.log('comment err', err));
    }

    const imageChange = (item, change) => {
        if (change === 'prev') {
            if (item === article.files[0]) return alert('첫번째 이미지입니다.');
    
            for (let i = 0; i < article.files.length; i++) {
                if (article.files[i] === item) return setImage(article.files[i - 1]);
            }
        } else if (change === 'next') {
            if (item === article.files[article.files.length - 1]) return alert('마지막 이미지입니다');

            for (let i = 0; i < article.files.length; i++) {
                if (article.files[i] === item) return setImage(article.files[i + 1]);
            }
        }
    }

    const commentUpdate = (list, item) => {
        switch(list) {
            case 'delete' :
                api.post('comment/delete', item)
                .then(res => {
                    console.log(res.data);
                    if (res.data.code === 'y') setCommentArray(res.data.comment);
                })
                .catch(err => console.log('delete err', err));
            break;
            
            default :
            
            break;
        }
    };

    const answerMove = () => {
        navigation(`/enroll/${params._id}`, {state: article})
    };

    const cardSpread = (item) => {
        setSpread(item._id);

        setAnswer(item);

        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const goBackMove = () => {
        navigation(-1);
    };

    const articleButton = async (list) => {
        const articleBtn = {
            owner: user,
            article: params._id,
            articleOwner: article.owner._id
        };

        switch(list) {
            case 'bookmarkT' :
                api.post('user/bookmark', articleBtn)
                .then(res => {
                    if (res.data.code === 'y') {
                        setBookmarkCheck(true);
                        alert('북마크 되었습니다.');
                    }
                })
                .catch(err => console.log('bookmark err', err));
            break;

            case 'bookmarkF' :
                api.post('user/bookmarkCancel', articleBtn)
                .then(res => {
                    if (res.data.code === 'y') {
                        setBookmarkCheck(false);
                        alert('북마크 해제되었습니다.');
                    }
                })
                .catch(err => console.log('bookmark err', err));
            break;

            case 'followT' :
                api.post('user/follow', articleBtn)
                .then(res => {
                    if (res.data.code === 'y') {
                        setFollowCheck(true);
                        setFollowLen(leng => leng + 1);
                        alert('팔로우 하셨습니다.');
                    }
                })
                .catch(err => console.log('bookmark err', err));
            break;

            case 'followF' :
                api.post('user/followCancel', articleBtn)
                .then(res => {
                    if (res.data.code === 'y') {
                        setFollowCheck(false);
                        setFollowLen(leng => leng - 1);
                        alert('팔로우를 해제하셨습니다.');
                    }
                })
                .catch(err => console.log('bookmark err', err));
            break;

            case 'update' :
                navigation(`/update/${params._id}`, {state: { article }});
            break;

            case 'delete' :
                await api.post('/enroll/delete', {_id: article._id})
                .then(res => {
                    console.log(res);
                    if (res.data.code === 'y') navigation('/')
                })
                .catch(err => console.log('delete err', err));
            break;

            default :
            break;
        }
    };

    return (
        <section className={style.article_contents_wrap}>
            <h1>{article.title}<span>{article.updatedAt.slice(0, 10)}</span><div onClick={goBackMove}>나가기</div></h1>

            <div className={style.article_contents}>
                <div className={style.contents}>
                    {article.contents}
                </div>
                <div className={style.profile}>
                    <h3>{article.owner.nick}</h3>
                    <h4>{article.owner.email}</h4>
                    <h5>팔로워 : { followLen }</h5>
                    {
                        article.owner._id !== user ? (
                            followCheck ? <button className={style.btn_active} onClick={() => articleButton('followF')}>팔로우 해제</button> : <button className={style.btn_de_active} onClick={() => articleButton('followT')}>팔로우</button>
                        ) : null
                    }
                    {
                        bookmarkCheck ? <button className={style.btn_active} onClick={() => articleButton('bookmarkF')}>북마크 해제</button> : <button className={style.btn_de_active} onClick={() => articleButton('bookmarkT')}>북마크</button>
                    }
                    {
                        article.owner._id === user && <ul>
                            <li onClick={() => articleButton('update')}>수정</li>
                            <li onClick={() => articleButton('delete')}>삭제</li>
                        </ul>
                    }
                </div>
            </div>

            <div className={style.article_image}>
                <ul>
                    {
                        article.files && article.files.map((item, index) => (
                            <li key={index} onClick={() => imageExpansion(item)}><img src={item} alt={article.title} /></li>
                        ))
                    }
                </ul>

                {
                    image !== '' ? (
                        <div className={style.article_fixed_image_wrap}>
                            <div className={style.article_fixed_image}>
                                <button onClick={() => imageExpansion('close')}>닫기</button>
                                <img src={image} alt="이미지" />
                                <div className={style.prev} onClick={() => imageChange(image, 'prev')}>이전</div>
                                <div className={style.next} onClick={() => imageChange(image, 'next')}>다음</div>
                            </div>
                        </div>
                    ) : null
                }
            </div>

            <div className={style.article_comment_wrap}>
                <h2>댓글</h2>
                <ul>
                    {
                        commentArray.length > 0 ? (
                            commentArray.map((item) => (
                                <li key={item._id}>
                                    <div className={style.comment_owner}>{item.owner.nick}</div>
                                    <div className={style.comment_contents}>{item.comment}</div>
                                    {
                                        item.owner._id === user ? <div className={style.comment_add}><button onClick={() => commentUpdate('delete', item)}>삭제</button></div> : null
                                    }
                                </li>
                            ))
                        ) : null
                    }
                </ul>

                <div className={style.comment_input}>
                    <input type="text" value={comment} onChange={commentChange} placeholder="댓글을 입력해주세요." />
                    <button onClick={commentAdd}>댓글 추가</button>
                </div>
            </div>

            <div className={style.article_answer}>
                <h2 ref={scrollRef}>답변<span onClick={answerMove}>답변하기</span></h2>
                    {
                        spread ? (
                            <div className={style.answer_wrap}>
                                <div className={style.answer_contents}>
                                    <div className={style.answer_tag_wrap}>
                                        {
                                            answer.tags.length ? (
                                                answer.tags.map((tag) => (
                                                    <div key={tag} className={style.answer_tag}>{tag}</div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                    <h3>{answer.title}</h3>
                                    <p>{answer.contents}</p>
                                    <div className={style.answer_information}>
                                        <div className={style.answer__}>{answer.owner.id}</div>
                                        <div className={style.answer___}>{answer.owner.nick}</div>
                                        <div className={style.answer____}>{answer.owner.gender}</div>
                                    </div>
                                </div>

                                <div className={style.answer_image_wrap}>
                                    <div className={style.answer_image} ref={slideRef}>
                                        {
                                            answer.files ? (
                                                answer.files.map((item, index) => (
                                                    <img key={index} src={item} alt={answer.title} />
                                                ))
                                            ) : <img src={bgImg} alt={answer.title} />
                                        }
                                    </div>
                                    <button onClick={() => imageSlide('prev')} className={style.img_prev}>prev</button>
                                    <button onClick={() => imageSlide('next')} className={style.img_next}>next</button>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        answerArray ? (
                            <ul>
                                {
                                    answerArray.map((item) => (
                                        <li key={item._id} onClick={() => cardSpread(item)}>
                                            <CardInline
                                                title={item.title}
                                                contents={item.contents}
                                                img={item.files}
                                                nick={item.owner.nick}
                                                tag={item.tags}
                                                createdAt={item.createdAt}
                                            />

                                        </li>
                                    ))
                                }
                            </ul>
                        ) : null
                    }
            </div>
        </section>
    );
};

export default ArticleComponent;