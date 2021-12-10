import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// import * as api from '../api/index.js';
import { axiosInstance } from '../config';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);    
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await axiosInstance.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.likePost(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}