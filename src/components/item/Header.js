import { Link, useNavigate } from 'react-router-dom';
import style from '../../styles/header.module.scss';

const Header = ({page, user}) => {

    // const params = useParams();
    const navigation = useNavigate();

    return (
        <header id={style.header}>
            <div className={style.left}>
                <h1>{page}</h1>
                <div>{user.id}</div>
                <div>{user.nick}</div>
                <div>{user.gender}</div>
            </div>
            <div className={style.right}>
                <Link to onClick={(e) => {
                    e.preventDefault();
                    navigation(-1);
                }}>이전 페이지로 이동</Link>
            </div>
        </header>
    );
};

export default Header;