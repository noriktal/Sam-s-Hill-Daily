import { useState } from "react";
import { useHistory } from "react-router";
import { addArticle, selectArticles } from "./magazineReducer2";
import { useSelector, useDispatch } from "react-redux";

const AddArticle2 = () => {
    
  const  [article, setArticle] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
    
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
        dispatch(addArticle(article));
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
                <div className="chooseCategory" onChange={handleNewArticle} >
                    <span>Category:</span>
                    <input type="radio" id="Business" name="category" value="Business"/>
                    <label htmlFor="Business"> Business</label>
                    <input type="radio" id="health" name="category" value="Health"/>
                    <label htmlFor="health"> Health</label>
                    <input type="radio" id="technology" name="category" value="Technology"/>
                    <label htmlFor="technology"> Politics</label>
                </div>

                <div className="lowerForm">
                    <label htmlFor="article">Article:</label>
                    <textarea 
                        id="content" 
                        name="content"
                        cols="50" 
                        rows="25" 
                        onChange={handleNewArticle} 
                        value={article.content || ""} 
                        required/>
                </div>
                <input type="submit" />

            </form>
        </div>

     );
}


export default AddArticle2;