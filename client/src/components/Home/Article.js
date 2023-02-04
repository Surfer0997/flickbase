import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Loader, HTMLDecode } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux'

import ScoreCard from '../../utils/ScoreCard';
import { getArticle } from '../../store/actions/articlesThunk';
import { clearCurrentArticle } from '../../store/reducers/articlesSlice';

const Article = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(()=>{
        dispatch(getArticle(id));
        return ()=>{
            dispatch(clearCurrentArticle())
        }
    },[id,dispatch])

    return(
        <>
            { articles && articles.current ?
                <div className='article_container'>
                    <div
                        style={{
                            background: articles.current.imageSrc !== '' ? `url(${articles.current.imageSrc})` : `url(https://picsum.photos/1920/1080)`,

                        }}
                        className="image"
                    >
                    </div>
                    <h1>{articles.current.title}</h1>
                    <div className='mt-3 content'>
                        <div dangerouslySetInnerHTML={
                            {__html: HTMLDecode(articles.current.content)}
                        }>
                        </div>
                    </div>
                    <ScoreCard current={articles.current}/>
                </div>
            :
                <Loader/>
            }
        </>
    )
}

export default Article