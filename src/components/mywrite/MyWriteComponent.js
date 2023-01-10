import Card from "../card/Card";
import style from '../../styles/mywrite.module.scss';

const MyWriteComponent = ({enrolls, answers, qa}) => {
    
    return (
        <section className={style.mywrite_component}>
            {
                qa === '질문' ? (
                    enrolls.length > 0 ? (
                        enrolls.map((item, index) => (
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
                        ))
                    ) : null
                ) : (
                    answers.map((item) => (
                        <div className={style.card_decorate} key={item._id}>
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
                    ))
                )
            }
        </section>
    );
};

export default MyWriteComponent;