import { useEffect, useState } from "react";
import ArticleComponent from "./ArticleComponent";
import { useParams } from "react-router-dom";
import { api } from '../../js/api';

const Article = () => {
    const params = useParams();

    const [article, setArticle] = useState({});
    const [commentArray, setCommentArray] = useState([]);
    const [answerArray, setAnswerArray] = useState([]);
    const [bookmarkArray, setBookmarkArray] = useState([]);
    const [followArray, setFollowArray] = useState([]);
    
    useEffect(() => {
        console.log("들어옴");
        api.post('enroll/single', params)
        .then(res => {
            setArticle(res.data.data);
            setCommentArray(res.data.comment);
            setAnswerArray(res.data.answer);
            setBookmarkArray(res.data.bookmark);
            setFollowArray(res.data.follow);
        })
        .catch(err => console.log('enroll single err', err));
    }, [params]);



    console.log('article');
    return (
        <article id="article_page">
            <div className="contents_wrap">
                <div className="row">
                    {
                        article.owner ? (
                            <ArticleComponent
                                article={article}
                                commentArray={commentArray}
                                answerArray={answerArray}
                                bookmarkArray={bookmarkArray}
                                followArray={followArray}
                                setCommentArray={setCommentArray}
                                setFollowArray={setFollowArray}
                            />
                        ) : null
                    }
                </div>
            </div>
        </article>
    );
};

export default Article;