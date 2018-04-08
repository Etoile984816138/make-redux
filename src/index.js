// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
const appState = {
    title: {
        text: 'React.js ',
        color: 'red',
    },
    content: {
        text: 'React.js 内容',
        color: 'blue'
    }
}

// 渲染内容
function renderApp(state) {
    renderTitle(state)
    renderContent(state)
}

function renderTitle(state) {
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = state.title.text;
    titleDOM.style.color = state.title.color;
}

function renderContent(state) {
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = state.content.text;
    contentDOM.style.color = state.content.color;
}

/**
 * @argument state:表示应用程序状态 
 * @argument reducer:描述应用程序状态会根据 action 发生什么变化
 * @return {getState} 返回state {dispatch} 用于修改数据
 */
function createStore(state, reducer) {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener()); // 每次dispatch时遍历监听者数组调用渲染函数
    }
    return { getState, dispatch, subscribe };
}

/**
 * @description 描述应用程序状态会根据 action 发生什么变化
 * @param state 
 * @param action 
 */
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state;
    }
}

const store = createStore(appState, reducer);
let oldState = store.getState();
store.subscribe(() => {
    const newState = store.getState(); // 获取新的state
    if (oldState === newState) return;
    renderApp(newState);
    oldState = newState;
}); // 添加监听者

renderApp(appState); // 首次渲染
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色