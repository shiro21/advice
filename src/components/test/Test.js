import { useEffect, useState } from "react";
import { api } from '../../js/api';


const Test = () => {
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState([]);

    useEffect(() => {
        api.post('/test/find')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }, []);

    const onChange = (event) => {
        setTitle(event.target.value);
    };

    const onFileChange = (event) => {
        console.log(event.target.files)
        
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            console.log(1);
            if (preview.length === 0) setPreview([{ file: file, imagePreviewUrl: reader.result}]);
            else setPreview(oldData => [...oldData, { file: file, imagePreviewUrl: reader.result}]);
        }

        reader.readAsDataURL(file);

        if (files.length === 0) setFiles([file]);
        else setFiles(oldFile => [...oldFile, file]);
    }

    const onClick = async() => {

        const formData = new FormData();
        console.log(title)
        formData.append('test', title);
        
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        
        await api.post('/test/create', formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log("TEST ERR", err));
    };
    return (
        <div>
            
            <input type="text" value={title} onChange={onChange} />
            <input type="file" name="test" accept="image/*" onChange={onFileChange} />
            <button onClick={onClick}>전송</button>

            <div>
                {
                    preview.length > 0 ? (
                        preview.map((item, index) => (
                            <div key={index}>
                                <img src={item.imagePreviewUrl} alt="이미지" />
                            </div>
                        ))
                    ) : null
                }
                
            </div>
        </div>
    );
};

export default Test;