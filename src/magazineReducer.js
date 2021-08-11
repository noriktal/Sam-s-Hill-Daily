
const initState = {
    categoryFilter: "All",
    articles: [
        {id: 1,
        author: "A. Botz",
        category: "Politics",
        title: "US 2020 Elections",
        article: "The 2020 United States presidential election was the 59th quadrennial presidential election, held on Tuesday, November 3, 2020.[a] The Democratic ticket of former vice president Joe Biden and the junior U.S. senator from California Kamala Harris defeated the incumbent Republican president Donald Trump and incumbent vice president Mike Pence.[6] This was the first election since 1992 (and the fifth in the past century) in which the incumbent president failed to win reelection. The election saw the highest voter turnout by percentage since 1900,[7] with each of the two main tickets receiving more than 74 million votes, surpassing Barack Obama's record of 69.5 million votes from 2008. Biden received more than 81 million votes,[8] the most votes ever cast for a candidate in a U.S. presidential election.[9]"
        },
        {id: 2,
            author: "D.Peretz",
            category: "Fashion",
            title: "The Right Way to Wear Hats in 2021",
            article: "In the past, hats were an indicator of social status.[2] In the military, hats may denote nationality, branch of service, rank or regiment.[3] Police typically wear distinctive hats such as peaked caps or brimmed hats, such as those worn by the Royal Canadian Mounted Police. Some hats have a protective function. As examples, the hard hat protects construction workers' heads from injury by falling objects, a British police Custodian helmet protects the officer's head, a sun hat shades the face and shoulders from the sun, a cowboy hat protects against sun and rain and an ushanka fur hat with fold-down earflaps keeps the head and ears warm. Some hats are worn for ceremonial purposes, such as the mortarboard, which is worn (or carried) during university graduation ceremonies. Some hats are worn by members of a certain profession, such as the Toque worn by chefs. Some hats have religious functions, such as the mitres worn by Bishops and the turban worn by Sikhs."
        },
        {id: 3,
            author: "June May",
            category: "Fashion",
            title: "2021's Color of the Year",
            article: "The biggest color trends of 2021 are taking a cue from the last tumultuous year and giving people a sense of hope, optimism and the refresh that many are looking for."
        }
    ]
}

const magazineReducer = (state = initState, action) => {
    switch(action.type){
        case "ADD_ARTICLE":
            return{
                ...state,
                articles: [action.article, ...state.articles, ]
            }

        case "DELETE_ARTICLE":
            const newArticles = state.articles.filter(article => article.id !== action.id);
            
            return{
                ...state,
                articles: [...newArticles]
            }

        case "CHANGE_CATEGORY":

            return{
                ...state,
                categoryFilter: action.category
            }

        default:
            return state;
    }
}

export default magazineReducer;