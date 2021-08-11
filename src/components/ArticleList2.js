import { deleteArticle, changeCategory, selectArticles, selectCategoryFilter, selectArticlesByCategory, selectDBArticles,selectLoading, selectError, fetchArticles} from "./magazineReducer2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const ArticleList2 = () => {
    
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const categoryFilter = useSelector(selectCategoryFilter);
    const articlesByCategory = useSelector(selectArticlesByCategory);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    //const dbArticles = useSelector(selectDBArticles);

    
    const handleDeleteArticle = (articleID) => {
        dispatch(deleteArticle(articleID));
        console.log(articles);
    } 
    
    const handleFilterChange = (e) => {
        const category = e.target.value;
        dispatch(changeCategory(category));
    }

    //for fetching dbArticles

    const base = `https://newsapi.org/v2/top-headlines`;
    const category = `?category=${categoryFilter}`;
    //const defaultUS = `?country=us`;
    const key = `&apiKey=59a541b5d4284d7380ae57ef6ad7f033`;
    //const defaultQuery = base + defaultUS + key;
    const query = base + category + key;

    useEffect(() => {
        const fethcArticlesThunk = fetchArticles(query);
        dispatch(fethcArticlesThunk);
        }, [categoryFilter]);

    return ( 
        <div className="listDiv">
            <h1 className="listTitle"> Recent Articles</h1>
            <div className="filterDiv">
                <h3>Filters:</h3>
                <div className="filters" onChange={handleFilterChange}>
                    <input type="radio" id="all" name="category" value="All"/>
                    <label htmlFor="all"> All</label>
                    <input type="radio" id="business" name="category" value="Business"/>
                    <label htmlFor="business"> Business</label>
                    <input type="radio" id="health" name="category" value="Health"/>
                    <label htmlFor="health"> Health</label>
                    <input type="radio" id="technology" name="category" value="Technology"/>
                    <label htmlFor="technology"> Technology</label>
                </div>
            </div>

            {loading &&  <h1 className="loadingTitle"><i>LOADING ARTICLES</i></h1>}
            {error.length > 0 && <h1>{error}</h1>}
            {articlesByCategory &&
                    <ul>
                        {articlesByCategory.map(article => (
                            <a key={article.id} href={`#${article.id}`}>
                                <li>
                                    <h1>{article.title}</h1>
                                    <h2>{article.author}</h2>
                                    <button className="deleteBtn" onClick={() => handleDeleteArticle(article.id)}>XX</button>
                                </li>
                            </a>
                        ) )}
                    </ul>
             }
        </div>
    );
}

export default ArticleList2;