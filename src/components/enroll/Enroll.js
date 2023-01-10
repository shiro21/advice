import EnrollComponent from "./EnrollComponent";
import style from '../../styles/enroll.module.scss';

const Enroll = () => {
    return (
        <article id="enroll_page">
            <div className="contents_wrap">
                <div className="row">
                    <h1 className={style.enroll}>조언하기 / 답변하기</h1>
                    <EnrollComponent />
                </div>
            </div>
        </article>
    );    
};

export default Enroll;