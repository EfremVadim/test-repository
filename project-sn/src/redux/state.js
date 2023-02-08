const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello, how are you', likesCount: 333, },
                { id: 2, message: 'It is my first post', likesCount: 777, },
            ],
            newPostText: 'Im Ok',
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Taya' },
                { id: 2, name: 'Max' },
                { id: 3, name: 'Serj' },
                { id: 4, name: 'Elnur' },
                { id: 5, name: 'Dima' },
                { id: 6, name: 'Simba' }

            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How are you' },
                { id: 3, message: 'Yoyoyo' },
                { id: 4, message: 'Welcome to the club, buddy' },
                { id: 5, message: 'Lets go' },
                { id: 6, message: 'Meow Meoooow' }
            ],

        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('State was changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);

        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);

        }
    },

}

// Action-creators
export const addPostActionCreater = () => ({type: ADD_POST});
export const updateNewPostTextActionCreater = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});


export default store;