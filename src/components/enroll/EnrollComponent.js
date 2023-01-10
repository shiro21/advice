import { useCallback, useEffect, useState } from 'react';
import { api } from '../../js/api';
import style from '../../styles/enroll.module.scss';
import req from '../../styles/img/req.png';
import res from '../../styles/img/res.png';
import { useLocation, useNavigate } from 'react-router-dom';


const EnrollComponent = () => {
    const location = useLocation();

    const navigation = useNavigate();

    const [selectQA, setSelectQA] = useState('req');
    const [updateConfirm, setUpdateConfirm] = useState(false);

    useEffect(() => {
        console.log(location.state);
        if (location.pathname.indexOf('enroll') > -1) {

            if (location.state) setSelectQA('res');
            else setSelectQA('req');

        } else if (location.pathname.indexOf('update') > -1) {
            setUpdateConfirm(true);
            let update = location.state.article;
            api.post('/enroll/uploadDecoded', update.files)
            .then(res => {
                for(let i = 0; i < res.data.data.length; i++) {
                    setFiles(prev => [...prev, update.files[i]]);
                    setPreview(prev => [...prev, { file: res.data.data[i], imagePreviewUrl: update.files[i]}])
                }
            })
            .catch(err => console.log("decoded err", err));

            setSelectQA(update.type);
            setTitle(update.title);
            setTags(update.tags);
            setTagCheck(update.tags.length);
            setContents(update.contents);
        }

    }, [location])

    // title
    const [title, setTitle] = useState('');

    // tag
    const [tagData, setTagData] = useState('');
    const [tags, setTags] = useState([]);
    const [tagCheck, setTagCheck] = useState(0);
    const [tagCallbackBoolean, setTagCallbackBoolean] = useState(false);

    // image
    const [preview, setPreview] = useState([]);
    const [files, setFiles] = useState([]);

    // contents
    const [contents, setContents] = useState('');

    const titleChange = (event) => {
        setTitle(event.target.value);
    }

    const tagChange = (event) => {
        setTagData(event.target.value);
    };

    const tagKeyCode = async(e) => {
        if (e.key === 'Enter') {
            if (tagCheck > 4) return alert('최대 5개까지 가능합니다.');
            setTags([...tags, tagData]);
            setTagCheck(count => count + 1);
            setTagCallbackBoolean(true);
        }
    };

    const tagAdd = useCallback(() => {
        if (tags.length === 0) return;
        
        let confirm = false;
        for (let i = 0; i < tags.length - 1; i++) {
            if (tags[i] === tagData) {
                confirm = true;
            }
            if (tags.length - 1 === i + 1) {
                if (confirm === true) {
                    let newArray = tags.slice(0, -1);
                    setTags([...newArray])
                    setTagCheck(count => count - 1);
                }
            }
        }

        setTagData('');
    }, [tags, tagData]);

    useEffect(() => {
        if (tagCallbackBoolean === true) {
            tagAdd();
            setTagCallbackBoolean(false);
        }

    }, [tagAdd, tagCallbackBoolean]);


    const tagDelete = (item) => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === item) {
                setTags(tags.filter(tag => tag !== item));
                setTagCheck(count => count - 1);
            }
        }
    };

    const onFileChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            if (preview.length === 0) setPreview([{ file: file, imagePreviewUrl: reader.result }]);
            else setPreview([...preview, { file: file, imagePreviewUrl: reader.result }]);
        };

        reader.readAsDataURL(file);

        if (files.length === 0) setFiles([file]);
        else setFiles([...files, file]);
    };

    const imageDeleted = (item) => {
        console.log(files);
        console.log(item);
        for (let i = 0; i < preview.length; i++) {
            if (preview[i].file === item.file) {
                setPreview(preview.filter(preview => preview !== item));
                setFiles(files.filter(file => file !== item.file && file !== item.imagePreviewUrl));
            }
        }
    };

    const onContentsChange = (event) => {
        setContents(event.target.value);
    }

    const  onSubmit = async () => {

        const formData = new FormData();
        let pathname = "";
        let oldFiles = [];
        let newFiles = [];
        oldFiles = files.filter(arr => typeof arr === "string");
        newFiles = files.filter(arr => typeof arr !== "string");
        console.log(oldFiles);
        console.log(newFiles);

        if (title.length <= 1) return alert("제목은 2글자 이상입니다.");
        else if (tags.length === 0) return alert("태그를 입력해주세요.");
        if (location.pathname.indexOf('update') > -1) formData.append('_id', location.state.article._id);
        formData.append('type', selectQA);
        formData.append('title', title);
        for (let i = 0; i < tags.length; i++) formData.append('tags', tags[i]);

        if (oldFiles.length > 0) for (let i = 0; i < oldFiles.length; i++) formData.append('updateFiles', oldFiles[i]);
        for (let i = 0; i < newFiles.length; i++) formData.append('files', newFiles[i]);
        formData.append('contents', contents);
        formData.append('owner', localStorage.getItem('_advice_user'));

        if (location.pathname.indexOf('enroll') > -1) pathname = '/enroll/create'; else pathname = '/enroll/update';

        api.post(pathname, formData)
        .then(res => {
            if (res.data.code === 'y') navigation('/');
        })
        .catch(err => console.log('enroll Err', err));
    };

    const onAnswer = () => {

        const formData = new FormData();

        if (title.length <= 1) return alert("제목은 2글자 이상입니다.");
        else if (tags.length === 0) return alert("태그를 입력해주세요.");
        
        formData.append('type', selectQA);
        formData.append('title', title);
        for (let i = 0; i < tags.length; i++) formData.append('tags', tags[i]);
        for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
        formData.append('contents', contents);
        formData.append('owner', localStorage.getItem('_advice_user'));
        formData.append('enroll', location.state._id);
        formData.append('guest', location.state.owner._id);

        api.post('enroll/answerCreate', formData)
        .then(res => {
            if (res.data.code === 'y') navigation('/');
        })
        .catch(err => console.log('update Err', err));

    };

    return (
        <section className={style.enroll_component}>
            <div className={style.select_option_wrap}>
                <div className={`${style.select_option} ${selectQA === 'req' ? `${style.select}` : ''}`}>
                    <div className={style.select_image} style={{}}>
                        <img src={req} alt="질문" />
                    </div>
                    <div className={style.select_contents}>질문</div>
                </div>

                <div className={`${style.select_option} ${selectQA === 'res' ? `${style.select}` : ''}`}>
                    <div className={style.select_image}>
                        <img src={res} alt="응답" />
                    </div>
                    <div className={style.select_contents}>답변</div>
                </div>
            </div>

            <div className={style.title_wrap}>
                <div className={style.title}>제목</div>
                <input type="text" value={title} placeholder="Title ..." onChange={titleChange} />
            </div>

            <div className={style.select_tag_wrap}>
                <div className={style.select_tag_input}>
                    <div className={style.select_tag_title}>Tag</div>
                    {/* <input type="text" value={tagData} onKeyUpCapture={tagKeyCode} onChange={tagChange} placeholder="Tag Enter" /> */}
                    <input type="text" value={tagData} onKeyPress={tagKeyCode} onChange={tagChange} placeholder="Tag Enter" />
                </div>
                <ul>
                    {
                        tags.length > 0 ? (
                            tags.map((item, index) => (
                                <li key={index}>{item} <span onClick={() => tagDelete(item)}>x</span></li>
                            ))
                        ) : null
                    }
                </ul>
            </div>

            <div className={style.select_image_wrap}>
                <ul>
                    <li>
                        <div className={style.select_image_input}>
                            <div className={style.select_image_title}>이미지 선택</div>
                            <input type="file" name="image" accept="image/*" onChange={onFileChange} />
                        </div>
                    </li>
                    {
                        preview.length > 0 ? (
                            preview.map((item, index) => (
                                <li key={index}>
                                    <div className={style.select_image_input}>
                                        <span onClick={() => imageDeleted(item)}>x</span>
                                        <img src={item.imagePreviewUrl} alt="이미지" />
                                    </div>
                                </li>
                            ))
                        ) : null
                    }
                </ul>
            </div>

            <div className={style.contents_wrap}>
                <textarea value={contents} onChange={onContentsChange} placeholder="내용을 입력해주세요." />
            </div>

            <div className={style.submit_wrap}>
                {
                    selectQA === 'req' ? (
                        updateConfirm ? <button onClick={onSubmit}>변경하기</button> : <button onClick={onSubmit}>등록하기</button>
                        
                    ) : <button onClick={onAnswer}>답변 등록하기</button>
                }
                
            </div>
        </section>
    );
};

export default EnrollComponent;