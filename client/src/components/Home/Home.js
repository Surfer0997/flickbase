import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { homePageLoadMore } from '../../store/actions/articlesThunk';
import { Loader } from '../../utils/tools';
import ArticleCard from '../../utils/ArticleCard';

const Home = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();

    useEffect(()=>{
        // load more from postman
        if (articles.articles.length <= 0) {
            dispatch(homePageLoadMore(articles.homeSort));
        }
    }, [dispatch, articles.articles.length, articles.homeSort]);

const getNextArticles = () => {
    const skip = articles.homeSort.skip + articles.homeSort.limit;
    dispatch(homePageLoadMore({...articles.homeSort, skip}));
}
  
    return (
        <>
            <Grid container spacing={2} className='article_card' sx={{alignItems:"stretch"}}>
                {articles && articles.articles ?
                    articles.articles.map(article=>(
                        <Grid item key={article._id} xs={12} sm={6} lg={3}>
                            <ArticleCard style={{height: '100%'}} article={article}/>
                        </Grid>
                        ))
            
            :<Loader/>}
            </Grid>
            <hr/>
            <Button
            variant='outlined'
            onClick={getNextArticles}
            >
                Load more
            </Button>
        </>
    )
}

export default Home;