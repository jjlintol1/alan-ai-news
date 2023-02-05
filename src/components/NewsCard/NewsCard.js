import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@mui/material';
import classNames from 'classnames';

import './newscard.css';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = ref => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs(refs => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, [])

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    } 
  }, [i, activeArticle, elRefs])
  
  return (
    <Card ref={elRefs[i]} className={classNames("newscard", activeArticle === i ? "activeCard" : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className="media" image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} />
        <div className="details">
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className="title" gutterBottom variant="h5">{title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="cardActions">
        <Button size="small" color="primary">Learn More</Button>
        <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>  
  );
}

export default NewsCard;
