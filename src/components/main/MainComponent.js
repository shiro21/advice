import Card from '../card/Card';

import style from '../../styles/main.module.scss';
import bgImg from '../../styles/img/bg.gif';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../js/api';

const useInterval = (callback, delay) => {

    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;

    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const MainComponent = ({changeTitle}) => {
    console.log('main component');

    // test color
    const [count, setCount] = useState(1);
    const arrayColor = ['#222', 'green', 'orange'];
    const [numColor, setNumColor] = useState(arrayColor[0]);

    // card
    const [cards, setCards] = useState([]);
    const [answerCards, setAnswerCards] = useState([]);
    const [newCards, setNewCards] = useState([]);

    // tag
    const [tags, setTags] = useState([]);

    // search
    const [tagSearch, setTagSearch] = useState('');
    const [nickSearch, setNickSearch] = useState('');

    // color 변경을 위한 setInterval
    useInterval(()=>{
        setNumColor(arrayColor[count]);
        setCount(count => count + 1);
        if (count >= 2) {
            setCount(0);
        }
    }, 5000);

    const arrayAdvice = ['조언', '답변'];
    const [adviceOpen, setAdviceOpen] = useState(false);
    const [advice, setAdvice] = useState(arrayAdvice[0]);
    const [filterOpen, setFilterOpen] = useState(false);

    const opens = (item) => {
        switch(item) {
            case 'advice' :
                if (adviceOpen === false) setAdviceOpen(true);
                else setAdviceOpen(false);
            break;

            case 'filter' :
                if (filterOpen === false) setFilterOpen(true);
                else setFilterOpen(false);
            break;

            default :
            break;
        }
    };

    const filterChange = (item) => {
        switch(item) {
            case '조언' :
                setAdvice(arrayAdvice[0]);
            break;

            case '답변' :
                setAdvice(arrayAdvice[1]);
            break;

            default :
            break;
        }
    };

    useEffect(() => {
        api.post('enroll/find')
        .then(res => {
            setCards(res.data.data);
            setNewCards(res.data.data);
            setAnswerCards(res.data.answer);
            setTags(res.data.tag);
        })
        .catch(err => console.log('enroll find err', err));
    }, []);

    const tagInput = (event) => {
        setTagSearch(event.target.value);
        setNickSearch('');
    };
    const nickInput = (event) => {
        setNickSearch(event.target.value);
        setTagSearch('');
    };

    useEffect(() => {
        // 검색
        const filtered = cards.filter((item) => {
            return item.owner.nick.toUpperCase().includes(nickSearch.toUpperCase());
        });
        
        setNewCards(filtered);
    }, [nickSearch, cards]);

    useEffect(() => {
        const filtered = cards.filter((item) => {
            return item.title.toUpperCase().includes(changeTitle.toUpperCase());
        })

        setNewCards(filtered);
    }, [cards, changeTitle])


    useEffect(() => {
        if (tagSearch !== '') {
            let newItem = [];
    
            cards.filter((item) => {
                for (let i = 0; i < item.tags.length; i++) {
                    if (item.tags[i].toUpperCase().includes(tagSearch.toUpperCase())) {
                        newItem.push(item)
                    }
                    if (item.tags.length === i + 1) {
                        return newItem;
                    }
                }
                return newItem;
            });
            setNewCards(newItem);
        } else {
            setNewCards(cards);
        }

    }, [cards, tagSearch]);

    return (
        <div id={style.main_component}>
            <div className={style.main_bg} style={{backgroundImage: `url(${bgImg})`}}></div>
            <div className={style.bg_contents}>
                <div className={style.main_tag}>
                    <ul>
                        {
                            tags ? (
                                tags.map((item) => (
                                    <li key={item._id}>{item.tag}</li>
                                ))
                            ) : null
                        }
                    </ul>

                    <h2 className={style.main_title} style={{color: numColor}}>조언이 필요하신가요?<br />지금 바로 올려주세요.</h2>
                </div>
            </div>

            <div className={style.main_contents}>
                <div className="contents_wrap">
                    <div className="row">
                        <section className={style.filter_wrap}>
                            <div className={`${style.left_filter} ${style.filter}`}>
                                <div onClick={() => {opens('advice')}}>{advice}</div>
                                {
                                    adviceOpen ? (
                                        arrayAdvice.map((item) => (
                                            <div key={item} onClick={() => {filterChange(item)}}>{item}</div>
                                        ))
                                    ) : null
                                }
                            </div>

                            <div className={`${style.right_filter} ${style.filter}`}>
                                <div onClick={() => {opens('filter')}}>필터</div>
                                {
                                    filterOpen ? (
                                        <>
                                            <input type="text" onChange={tagInput} value={tagSearch} placeholder="태그를 입력해주세요." />
                                            <input type="text" onChange={nickInput} value={nickSearch} placeholder="닉네임을 입력해주세요." />
                                        </>
                                    ) : null
                                }
                            </div>
                        </section>

                        <section className={style.card_wrap}>
                            {
                                advice === '조언' ? (
                                    newCards.map((item, index) => (
                                        item.type === 'req' ? (
                                            <div className={style.card_decorate} key={index}>
                                                <Card
                                                    _id={item._id}
                                                    title={item.title}
                                                    contents={item.contents}
                                                    img={item.files}
                                                    nick={item.owner.nick}
                                                    tag={item.tags}
                                                    createdAt={item.createdAt}
                                                />
                                            </div>
                                        ) : null
                                    ))
                                ) : null
                            }

                            {
                                advice === '답변' ? (
                                    answerCards.map((item, index) => (
                                        item.type === 'res' ? (
                                            <div className={style.card_decorate} key={index}>
                                                <span>{item.enroll.title}</span>
                                                <Card
                                                    _id={item.enroll._id}
                                                    title={item.title}
                                                    contents={item.contents}
                                                    img={item.files}
                                                    nick={item.owner.nick}
                                                    tag={item.tags}
                                                    createdAt={item.createdAt}
                                                />
                                            </div>
                                        ) : null
                                    ))
                                ) : null
                            }
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;