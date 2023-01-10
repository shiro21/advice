import style from '../../styles/bookmark.module.scss';
import Card from '../card/Card';

const BookmarkComponent = ({bookmarks}) => {
    return (
        <section className={style.bookmark_component}>
            {
                bookmarks.length > 0 ? (
                    bookmarks.map((item, index) => (
                        <div className={style.card_decorate} key={index}>
                            <Card
                                _id={item.article._id}
                                title={item.article.title}
                                contents={item.article.contents}
                                img={item.article.files}
                                nick={item.article.owner.nick}
                                tag={item.article.tags}
                                createdAt={item.article.createdAt}
                            />
                        </div>
                    ))
                ) : null
            }
        </section>
    );
};



export default BookmarkComponent;