import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Link from '@mui/material/Link';

import { useState } from 'react';
import { showToast } from '../../utils/tools';
import { useGetContactIcon } from './useGetContactIcon';

export const ContactCard = ({ data: { icon, text, linkText, linkUrl, buttonText } }) => {
  const [isLinkShown, setIsLinkShown] = useState(false);
  const jsxIcon = useGetContactIcon(icon);

  return (
    <Card
      className="d-flex flex-column contacts-card"
      onClick={() => {}}
      sx={{ position: 'relative', overflow: 'visible' }}
    >
      {jsxIcon}

      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: 'white' }}>
          {text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing style={{ marginTop: 'auto', marginBottom: '10px', color: 'white' }}>
        {!isLinkShown ? (
          <Button
            className="contact-card__button"
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              setIsLinkShown(true);
            }}
          >
            {buttonText}
          </Button>
        ) : (
          <Link
            href={linkUrl}
            className="contact-card__link"
            variant="h6"
            sx={{ paddingBottom: '10px', color: '#fff' }}
            underline="hover"
            onClick={e => {
              navigator.clipboard.writeText(e.target.textContent);
              showToast('INFO', 'Copied to clipboard');
            }}
            title={icon === 'telegram' ? 'Go to telegram messager' : 'Click to copy to clipboard'}
          >
            <b>{linkText}</b>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};
