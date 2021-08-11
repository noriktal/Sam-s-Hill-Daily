import { connect } from "react-redux";


const ArticleList = ({categoryFilter, changeCategory, articles, articlesByCategory, deleteArticle}) => {
    
    const handleDeleteArticle = (articleID) => {
        deleteArticle(articleID);
        console.log(articles);
    } 
    
    const handleFilterChange = (e) => {
        const category = e.target.value;
        changeCategory(category);
        console.log("articles by category", articlesByCategory);
        console.log("active category filter:", categoryFilter);
    }


    return ( 
        <div className="listDiv">
            <h1 className="listTitle"> Recent Articles</h1>
            <div className="filterDiv">
                <h3>Filters:</h3>
                <div className="filters" onChange={handleFilterChange}>
                    <input type="radio" id="all" name="category" value="All"/>
                    <label htmlFor="all"> All</label>
                    <input type="radio" id="fashion" name="category" value="Fashion"/>
                    <label htmlFor="fashion"> Fashion</label>
                    <input type="radio" id="politics" name="category" value="Politics"/>
                    <label htmlFor="politics"> Politics</label>
                </div>
            </div>

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
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        categoryFilter: state.categoryFilter,
        articles: state.articles,
        articlesByCategory: state.categoryFilter === "All" ?
                state.articles :
                state.articles.filter(article => article.category === state.categoryFilter)
            }
            
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteArticle: (id) => {dispatch({type:"DELETE_ARTICLE", id: id})},
        changeCategory: (category) => {dispatch({type: "CHANGE_CATEGORY", category: category})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);