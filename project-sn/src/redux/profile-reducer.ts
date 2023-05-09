import {PhotosType, PostsType, ProfileType} from "../types/types"
import {ResultCodesEnum} from "../api/api"
import {stopSubmit} from "redux-form"
import {Dispatch} from "redux"
import {AppStateType} from "./redux-store"
import {ThunkAction} from "redux-thunk"
import {profileAPI} from "../api/profileAPI"

const ADD_POST = 'ADD-POST'
const SET_USER_ID = 'SET_USER_ID'
const DELETE_POST = 'DELETE_POST'
const SET_FULL_NAME = 'SET_FULL_NAME'
const SET_USER_PHOTO = 'SET_USER_PHOTO'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you', likesCount: 333},
        {id: 2, message: 'It is my first post', likesCount: 777},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    fullName: null as string | null,
    userId: null as number | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_FULL_NAME:
            return {
                ...state,
                fullName: action.fullName
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type ActionsTypes = any

    export const addPostActionCreator = (newPostText: string) => ({
        type: ADD_POST, newPostText
    })
    export const deletePost = (postId: number) => ({
        type: DELETE_POST, postId
    })
    export const setUserProfile = (profile: ProfileType) => ({
        type: SET_USER_PROFILE, profile
    })
    export const setFullName = (fullName: string) => ({
        type: SET_FULL_NAME, fullName
    })
    export const setUserId = (userId: number) => ({
        type: SET_USER_ID, userId
    })
    export const setUserStatus = (status: string) => ({
        type: SET_USER_STATUS, status
    })
    export const savePhotoSuccess = (photos: PhotosType) => ({
        type: SET_USER_PHOTO, photos
    })

type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.getUsersStatus(userId)

        dispatch(setUserStatus(data))
    }

export const savePhoto = (file: any): ThunkType =>
    async (dispatch) => {
        const response: any = await profileAPI.savePhoto(file)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(savePhotoSuccess(response.data.photos))
        }
    }

export const saveProfile = (profile: ProfileType) =>
    async (dispatch: DispatchType, getState: GetStateType) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getUserProfile(userId))

        } else {
            let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
            dispatch(stopSubmit('editProfile', {_error: message}))
            return Promise.reject(message)
        }
    }

export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.updateUsersStatus(status)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserStatus(status))
        }
    }

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfileData(userId)

    dispatch(setUserProfile(response))
    dispatch(setFullName(response.fullName))
    dispatch(setUserId(response.userId))
}

export default profileReducer