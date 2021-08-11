import { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

const AddArticle = ({ addArticle }) => {
    
  const  [article, setArticle] = useState({});
  const history = useHistory();
    
    const handleNewArticle = (e) => {
        let value = e.target.value;
        let name = e.target.name;
    
        setArticle(prev => ({
        ...prev,
        [name]: value,
        id: Date.now() 
        }))
    }

    const handleArticleSubmit = (e) => {
        e.preventDefault();
        addArticle(article);
        setArticle({});
        history.push('/');
    }

    return ( 
        <div className="newDiv">
            <h1>Add New Article</h1>
            <form className="newForm" onSubmit={handleArticleSubmit}>
                <div className="upperForm">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        size="50" 
                        id="title" 
                        name="title"
                        onChange={handleNewArticle} 
                        value={article.title || ""}
                        required/>
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        size="25" 
                        id="author"
                        name="author" 
                        onChange={handleNewArticle} 
                        value={article.author || ""} 
                        required/>
                </div>
                <div className="chooseCategory">
                    <span>Category:</span>
                    <input type="radio" id="fashion" name="category" value="Fashion"/>
                    <label htmlFor="fashion"> Fashion</label>
                    <input type="radio" id="politics" name="category" value="Politics"/>
                    <label htmlFor="politics"> Politics</label>
                </div>

                <div className="lowerForm">
                    <label for="article">Article:</label>
                    <textarea 
                        id="article" 
                        name="article"
                        cols="50" 
                        rows="25" 
                        onChange={handleNewArticle} 
                        value={article.article || ""} 
                        required/>
                </div>
                <input type="submit" />

            </form>
        </div>

     );
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (article) => {dispatch({type:"ADD_ARTICLE", article: article})}
    }
}

 
export default connect(mapStateToProps,mapDispatchToProps)(AddArticle);