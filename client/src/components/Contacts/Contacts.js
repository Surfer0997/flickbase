import { Grid, Paper } from '@mui/material';
import { ContactCard } from './ContactCard';

const data = [
  {
    icon: 'telegram',
    text: "Let's have a chat!",
    buttonText: 'Chat us via Telegram',
    linkText: 'https://t.me/Surfer0997',
    linkUrl: 'https://t.me/Surfer0997',
  },
  {
    icon: 'email',
    text: 'Send us a letter!',
    buttonText: 'Show an email',
    linkText: 'support@flickbase.ua',
    linkUrl: '#',
  },
  {
    icon: 'call',
    text: "Let's have a call!",
    buttonText: 'Show our number',
    linkText: '+380678795416',
    linkUrl: '#',
  },
  {
    icon: 'address',
    text: 'Visit us!',
    buttonText: 'Where to go?',
    linkText: 'Victory straße, 1',
    linkUrl: '#',
  },
];

const Contacts = () => {
  return (
    <>
        <h3 className='contacts-header'>Contact us directly</h3>

      <Grid container spacing={4} className="contacts_card" sx={{ marginTop: '2rem' }}>
        {data.map(contact => (
          <Grid item key={contact.text} xs={10} sm={5} lg={5}>
            <ContactCard style={{ height: '100%' }} className="fu" data={contact} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Contacts;
