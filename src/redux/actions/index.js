import{ GET_ALL_COUNTRIES, 
        GET_COUNTRY_BY_NAME, 
        GET_COUNTRY_DETAILS, 
        ADD_ACTIVITY, 
        GET_ACTIVITY,
        FILTER_BY_CONTINENT, 
        FILTER_BY_ACTIVITY, 
        FILTER_ACT_BY_SEASON, 
        SORT_COUNTRIES,
        CLEAN_DETAIL,
        CHINA,
    
       } from './actionTypes';

import axios from 'axios';



// export function getAllCountries() {
//     return async function(dispatch){
//         try{
//             const countries = await axios.get('https://pi-countr-ies.herokuapp.com/countries');
//             return dispatch({
//                 type: GET_ALL_COUNTRIES,
//                 payload: countries.data
//             });
//         }catch(err){
//             console.log(err)
//         }
//     }
// };

export const getChina = (payload) => {
        console.log("estoy en actions", payload)
        return{
            type: CHINA,
            payload:'DESC'
        }};


export const getAllCountries = () => (dispatch) => {
    try {
        return fetch('https://pi-countr-ies.herokuapp.com/countries')
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: GET_ALL_COUNTRIES,
                payload: data,
                })
            })
    } catch (error) {
        console.log(error)
    }
}

// export function getCountryByName(name) {
//     return async function(dispatch){
//         try{
//             const country = await axios.get(`https://pi-countr-ies.herokuapp.com/countries?name=${name}`)
//             return dispatch({
//                 type: GET_COUNTRY_BY_NAME,
//                 payload: country.data
//             })
//         }catch(err){
//             console.log(err)
//         }
//     }
// };

export const getCountryByName = (name) => (dispatch) => {
    try {
        return fetch(`https://pi-countr-ies.herokuapp.com/countries?name=${name}`)
            .then((response) => response.json())
            .then((data) => {
                    dispatch({
                        type: GET_COUNTRY_BY_NAME,
                        payload: data
                    })
            })
    } catch (error) {
        console.log(error)
    }
}

export function getCountryDetails(id) {
    return async function(dispatch){
        try{
            const details= await axios.get(`https://pi-countr-ies.herokuapp.com/countries/${id}`)
            
            return dispatch({
                type: GET_COUNTRY_DETAILS,
                payload: details.data
            })
           
        }catch(err){
            console.log(err)
        }   
    }
};

export function addActivity(payload) {
    return async function (dispatch){
            const newActivity= await axios.post('https://pi-countr-ies.herokuapp.com/activities', payload)
            return dispatch({
                type: ADD_ACTIVITY,
                payload: newActivity
            })
        }
    }
   


export function getActivity(){
    return async function(dispatch){
        try{
            const activity= await axios.get('https://pi-countr-ies.herokuapp.com/activities')
            return dispatch({
                type: GET_ACTIVITY,
                payload: activity.data
            })
        }catch(err){
            console.log(err)
        }
    }
};


export function filterByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
};

export function filterByActivity(payload){
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
};

export function filterActBySeason(payload){
    return {
        type: FILTER_ACT_BY_SEASON,
        payload
    }
};

export function sortCountries(payload){
    return {
        type: SORT_COUNTRIES,
        payload
    }
};

export function detailClean (){
    return{
        type:CLEAN_DETAIL
    }
}