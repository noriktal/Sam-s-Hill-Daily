import { connect } from "react-redux";

const ArticleInfo = ({articles, articlesByCategory}) => {
    
    return ( 
        <div className="content">
            {articlesByCategory.map(article => (
            <div key={article.id} className="article">
                    <div className="articleTitles">
                        <h1  id={article.id}>{article.title}</h1>
                        <h2>{article.author}</h2>
                    </div>
                    <p>{article.article}</p>
                    
                        
            </div>
             )) }
            </div>
        );
}


const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        articlesByCategory: state.categoryFilter === "All" ?
                state.articles :
                state.articles.filter(article => article.category === state.categoryFilter)
    }
}

export default connect(mapStateToProps)(ArticleInfo);