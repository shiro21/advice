// import { useCallback, useEffect, useMemo, useState } from "react";

import { useEffect, useState } from "react";
import { api } from "../../js/api";
import { socket } from "../../js/socket";

const Test2 = () => {

    const [state, setState] = useState({name: '', message: ''});
    const [chat, setChat] = useState([]);
    // 불러오기까지 완성시키기
    useEffect(() => {
        api.post('test/socketFind')
        .then(res => {
            let data = res.data.data;
            setChat(data);
        })
    }, [])

    useEffect(() => {
        socket.on('message', ({name, message}) => {
            setChat([...chat, {name, message}]);
        })
    }, [chat]);

    const textChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onSubmit = () => {
        const {name, message} = state;
        socket.emit('message', {name, message});
        setState({message: '', name})
    };

    return (
        <div>
            <input type="text" name="name" value={state.name} onChange={textChange} placeholder="이름입력" />
            <textarea value={state.message} name="message" onChange={textChange} />
            <button onClick={onSubmit}>내용입력</button>

            {
                chat.map((item, index) => (
                    <div key={index}>
                        <div>{item.name}</div>
                        <div>{item.message}</div>    
                    </div>
                ))
            }
        </div>
    );
};


export default Test2;
