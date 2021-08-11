import { useState } from "react";
import { createSelector } from "reselect";
import { combineReducers } from "redux";

//Initial states

//1
const initStateFilter =  "All";

//2
const initStateFetch = {
    loading: false,
    dbArticles: [],
    error: ""
}

//3
const initStateArticles = [
        {id: 1,
            author: "A. Botz",
            category: "Politics",
            title: "US 2020 Elections",
            content: "The 2020 United States presidential election was the 59th quadrennial presidential election, held on Tuesday, November 3, 2020.[a] The Democratic ticket of former vice president Joe Biden and the junior U.S. senator from California Kamala Harris defeated the incumbent Republican president Donald Trump and incumbent vice president Mike Pence.[6] This was the first election since 1992 (and the fifth in the past century) in which the incumbent president failed to win reelection. The election saw the highest voter turnout by percentage since 1900,[7] with each of the two main tickets receiving more than 74 million votes, surpassing Barack Obama's record of 69.5 million votes from 2008. Biden received more than 81 million votes,[8] the most votes ever cast for a candidate in a U.S. presidential election.[9]",
            urlToImage: ""
        },
        {id: 2,
            author: "D.Peretz",
            category: "Fashion",
            title: "The Right Way to Wear Hats in 2021",
            content: "In the past, hats were an indicator of social status.[2] In the military, hats may denote nationality, branch of service, rank or regiment.[3] Police typically wear distinctive hats such as peaked caps or brimmed hats, such as those worn by the Royal Canadian Mounted Police. Some hats have a protective function. As examples, the hard hat protects construction workers' heads from injury by falling objects, a British police Custodian helmet protects the officer's head, a sun hat shades the face and shoulders from the sun, a cowboy hat protects against sun and rain and an ushanka fur hat with fold-down earflaps keeps the head and ears warm. Some hats are worn for ceremonial purposes, such as the mortarboard, which is worn (or carried) during university graduation ceremonies. Some hats are worn by members of a certain profession, such as the Toque worn by chefs. Some hats have religious functions, such as the mitres worn by Bishops and the turban worn by Sikhs.",
            urlToImage: ""
        },
        {id: 3,
            author: "June May",
            category: "Fashion",
            title: "2021's Color of the Year",
            content: "The biggest color trends of 2021 are taking a cue from the last tumultuous year and giving people a sense of hope, optimism and the refresh that many are looking for.",
            urlToImage: ""
        }
];

//Reducers

//1

export const magazineReducerArticles = (state = initStateArticles, action) => {
    switch(action.type){
        case "ADD_ARTICLE":
            return [action.article, ...state]

        case "DELETE_ARTICLE":
            const newArticles = state.filter(article => article.id !== action.id);
            
            return [...newArticles];
        default:
            return state;
    }
}
    
//2

export const magazineReducerFilter = (state = initStateFilter, action) => {
    switch(action.type){           

        case "CHANGE_CATEGORY":
            return action.category;
            
        default:
            return state;
    }
}

//3

export const magazineReducerFetch = (state = initStateFetch, action) => {
    switch(action.type){
        case "FETCH_ARTICLES_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "LOAD_ARTICLES":
            
            const finalArticles = action.articles.map((article, index) => ({...article, id: index + 100}))
            
            return {
                loading: false,
                dbArticles: finalArticles,
                error: ""
            }

        case "FETCH_ARTICLES_FAILED":
            return {
                loading: false,
                dbArticles: [],
                error: action.error
            }

        default:
            return state;
    }
}

//Combined Reducer

export const rootReducer = combineReducers({
    articles: magazineReducerArticles,
    categoryFilter: magazineReducerFilter,
    dbArticlesContainer: magazineReducerFetch
    })

//Selectors

export const selectCategoryFilter = state => state.categoryFilter;

export const selectArticles = state => state.articles;

export const selectDBArticles = state => state.dbArticlesContainer.dbArticles;

export const selectLoading = state => state.dbArticlesContainer.loading;

export const selectError = state => state.dbArticlesContainer.error;

export const selectArticlesByCategory = createSelector(
    [selectCategoryFilter, selectArticles, selectDBArticles],
    (category, articles, dbArticles) => {
        if(category === "All"){
            return [...articles, ...dbArticles];
        }else{
            return articles.filter(article => article.category === category).concat(dbArticles);
        }
    }
);



//Action Creators

export const deleteArticle = (id) => {
return {
    type:"DELETE_ARTICLE",
     id: id
    }
}

export const changeCategory = (category) => {
    return{
        type: "CHANGE_CATEGORY",
        category: category
    }
}

export const addArticle = (article) => {
    return{
        type:"ADD_ARTICLE",
        article: article
    }
}

export const fetchArticlesRequest = () => {
    return{
        type:"FETCH_ARTICLES_REQUEST"
    }
}

export const loadArticles = (articles) => {
    return{
        type:"LOAD_ARTICLES",
        articles: articles
    }
}

export const fetchArticlesFailed = (message) => {
    return{
        type:"FETCH_ARTICLES_FAILED",
        error: message
    }
}


// Action Creators- thunk functions

    

export function fetchArticles(url){
   return async function fethcArticlesThunk(dispatch){

            dispatch(fetchArticlesRequest());
            console.log("sending request to db");
       try{ 
            const response = await fetch(url); 

            const newArticles = await response.json();
            console.log("dbArticles container:", newArticles);
            dispatch(loadArticles(newArticles.articles));
    
        }catch(err){
            console.log(err.message);
            dispatch(fetchArticlesFailed(err.message))
        };

    }
}

