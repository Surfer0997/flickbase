import Divider from '@mui/material/Divider';

const Footer = () => {
  return (
    <div style={{}}>
      <Divider orientation={'horizontal'} light={true} textAlign={'center'} sx={{borderColor:'#fff'}}/>
      <p style={{ color: 'white', margin: '1.5rem auto', textAlign:'center', fontSize:'.8em'}}><b> All rights are reserved. <br/> Flickbase {new Date().getFullYear()} </b></p>
    </div>
  );
};

export default Footer;
