import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';

export const useGetContactIcon = (icon) => {
    let jsxIcon = <TelegramIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button'/>
  
    switch(icon) {
        case 'telegram':
          jsxIcon = <TelegramIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button'/>
        break;
        case 'call':
          jsxIcon = <CallIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button' />
        break;
        case 'email':
          jsxIcon = <MailOutlineIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button'/>
        break;
        case 'address':
          jsxIcon = <HomeIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button'/>
        break;
        default:
        jsxIcon = <TelegramIcon color="" fontSize='large' htmlColor='white' className='contact-card__icon-button' />
      }
      return jsxIcon;
}