import style from '../../styles/card.module.scss';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../styles/img/bg.gif';

const Card = ({ _id, title, contents, img, nick, tag, createdAt}) => {

    const navigation = useNavigate();

    const articleMove = () => {
        navigation(`/article/${_id}`);
    };

    return (
        <div id={style.card} onClick={articleMove}>
            {
                img ? <img src={img} alt={title} /> : <img src={bgImg} alt={title} />
            }
            <div className={style.information}>
                <h4>{title}</h4>
                <p>{contents}</p>
                <ul>
                    {
                        tag.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
                <h5>{nick}</h5>
                <h6>{createdAt}</h6>
            </div>
        </div>
    );    
};

export default Card;