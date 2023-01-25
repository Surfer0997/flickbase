import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, IconButton, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { articleLike } from '../store/actions/usersThunk';
import { useEffect, useState } from 'react';

/* TODO ADD DEBOUNCE TO LIKE ICON */
const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const usersLikedArticles = useSelector(state => state.users.data.likedArticles);
  let initialLikeButtonStyle = '';
  if (usersLikedArticles) {
    initialLikeButtonStyle = usersLikedArticles.includes(article._id) ? 'primary' : '';
  }
  
  const [likeButtonStyle, setLikeButtonStyle] = useState(initialLikeButtonStyle);
  const dispatch = useDispatch();

  const handleLikeButton = () => {
    dispatch(articleLike(article._id));
  };
  const navigateToArticleHandler = (path) => (e) => {
    if (e.target?.tagName === 'path' || e.target?.tagName === 'svg' || e.target?.tagName === 'BUTTON') {
      return;
    } else {
      navigate(path);
    }
  }

  useEffect(() => {
    if (usersLikedArticles) {
      setLikeButtonStyle(usersLikedArticles.includes(article._id) ? 'primary' : '');
    }
  }, [usersLikedArticles, article._id]);

  return (
      <Card className="d-flex flex-column article-card" onClick={navigateToArticleHandler(`/articles/article/${article._id}`)}>
        <CardMedia
          style={{ height: 0, paddingTop: '56.25%' }}
          image={`https://picsum.photos/200?${article._id}`}
          title="some title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" component="p">
            {article.excerpt}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: 'auto' }}>
          <IconButton onClick={handleLikeButton}>
            <FavoriteIcon color={likeButtonStyle} />
          </IconButton>
          <Button size="small" color="primary" component={RouterLink} to={`/articles/article/${article._id}`}>
            View article
          </Button>
        </CardActions>
      </Card>
  );
};

export default ArticleCard;
