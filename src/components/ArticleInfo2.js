import {selectArticles, selectArticlesByCategory} from "./magazineReducer2";
import { useSelector } from "react-redux";

const ArticleInfo2 = () => {
    
    const articles = useSelector(selectArticles);
    const articlesByCategory = useSelector(selectArticlesByCategory);


    return ( 
        <div className="content">
            {articlesByCategory.map(article => (
            <div key={article.id} className="article">
                    <div className="articleTitles">
                        <h1  id={article.id}>{article.title}</h1>
                        <h2>{article.author}</h2>
                    </div>
                    <p>{article.content}</p>
                    <img src={article.urlToImage} />
                    
                        
            </div>
             )) }
            </div>
        );
}

export default ArticleInfo2;