import { Card, CardContent, CardActions, IconButton, Typography, Button } from '@mui/material';
import Link from '@mui/material/Link';

import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';

import { useState } from 'react';
import { showToast } from '../../utils/tools';

export const ContactCard = ({ data:{icon, text, linkText, linkUrl} }) => {
  const [isLinkShown, setIsLinkShown] = useState(false);
  let jsxIcon = <TelegramIcon color="" fontSize='large' htmlColor='white' />
  switch(icon) {
    case 'telegram':
      jsxIcon = <TelegramIcon color="" fontSize='large' htmlColor='white' />
    break;
    case 'call':
      jsxIcon = <CallIcon color="" fontSize='large' htmlColor='white' />
    break;
    case 'email':
      jsxIcon = <MailOutlineIcon color="" fontSize='large' htmlColor='white' />
    break;
    case 'address':
      jsxIcon = <HomeIcon color="" fontSize='large' htmlColor='white' />
    break;
    default:
      icon = <TelegramIcon color="" fontSize='large' htmlColor='white' />
  }

  return (
    <Card className="d-flex flex-column contacts-card" onClick={() => {}} sx={{position:'relative', overflow:'visible'}}>
      <IconButton className='contact-card__icon-button'>
        {jsxIcon}
      </IconButton>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{color:'white'}}>
          {text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing style={{ marginTop: 'auto', paddingTop: 0, color: 'white' }}>
        {!isLinkShown ? (
          <Button
            variant='outlined'
            size="large"
            color="inherit"
            onClick={() => {
              setIsLinkShown(true);
            }}
          >
            View article
          </Button>
        ) : (
          <Link href={linkUrl} variant="h6" sx={{padding: '7px'}} onClick={(e)=>{
            navigator.clipboard.writeText(e.target.textContent);
            showToast('INFO', 'Copied to clipboard')
          }}>
            {linkText}
          </Link>
        )}
      </CardActions>
    </Card>
  );
};
