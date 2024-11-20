import React from 'react';
import { FaWhatsapp, FaTwitter, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className='footer'>
    <div className="container-fluid bg-dark text-light py-5">
      <div className="row">
        <div className="col-md-4">
         <b> <h1>ImBoni</h1></b>
          <p>Feel free to join us, create your free account, and start viewing<br></br>  updates and exploring the country's education system to level up.</p>
          <div className="links">
  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-light me-3">
    <FaWhatsapp size={30} />
  </a>
  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-light me-3">
    <FaTwitter size={30} />
  </a>
  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-light">
    <FaLinkedin size={30} />
  </a>
</div>



        </div>

      
        <div className="col-md-3">
         <b><h1>Useful Links</h1></b>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light link-hover">Home</a></li>
            <li><a href="/about" className="text-light link-hover">About</a></li>
            <li><a href="/contact" className="text-light link-hover">Contact</a></li>
           
          </ul>
        </div>

        <div className="col-md-3">
         <b><h1>Our Goals</h1></b>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light link-hover">Lorem Ispum</a></li>
            <li><a href="/about" className="text-light link-hover">Lorem Ispum</a></li>
            <li><a href="/contact" className="text-light link-hover">Lorem Ispum</a></li>
           
          </ul>
        </div>

       
        <div className="col-md-3">
         <b> <h1>Contact Us</h1></b>
          <p>Kamonyi District</p>
          <p>Instagram: <a href="https://www.instagram.com/ghislain_ishimwe" className="text-[#f44336] link-hover">ghislain_ishimwe</a></p>
          <p><b>Phone:</b>+250 781262526</p>
          <p><b>Email:</b> <a href="mailto:ishi@gmail.com" className="text-[#f44336] link-hover">ishimweghislain82@gmail.com</a></p>
        </div>
      </div>

     <div className='last-footer'>
      <div className="row mt-4">
        <div className="col-12 text-center">
          <p>© Copyright ImBoni All Rights Reserved</p>
          <p>Designed by <a href="https://portfolio-link.com" className="text-light">Ishimweghislain</a></p>
        </div>
      </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
