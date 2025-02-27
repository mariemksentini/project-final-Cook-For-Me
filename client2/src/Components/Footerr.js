const Footerr = () => {
  const links = [
    "Company", "About Us", "Team", "Products", 
    "Blog", "Pricing", "Contact", "Careers"
  ];

  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-8 py-16 text-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <img src="/footer-logo-cookforme.png" alt="Logo" className="w-64" />
        </div>
        
        {/* Navigation Links */}
        <div className="grid grid-cols-4 gap-6 w-2/3 text-center md:text-left">
          {links.map((link, index) => (
            <a
              key={index}
              href="#"
              style={{width : "100px" , height : "50px"}}
              className="font-medium text-gray-600 justify-start hover:text-gray-900 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      
      {/* Copyright */}
      <p className="text-sm text-gray-500 mt-8 text-center" style={{marginBottom : "20px"}}>
        &copy; {currentYear} Your Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footerr;


// const Footerr = () => {
//   const links = ["Company", "About Us", "Team", "Products", "Blog", "Pricing"];
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="px-8 py-16  text-gray-700 " >
//       <div className="container mx-auto  flex flex-col items-center justify-center">
//         <div className="w-full">
//           {/* Logo Section */}
//           <div className="mb-6 w-1/2">
//             <img src="/footer-logo-cookforme.png" alt="Logo" style={{width : "500px"}} />
//           </div>
        
//           {/* Navigation Links */}
//           <div className="flex w-1/2 flex-wrap items-center justify-center gap-6 pb-6">
//             {links.map((link, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
//                 style={{marginLeft : "15px", marginRight : "15px"}}
//               >
//                 {link}
//               </a>
//             ))}
//           </div>
//         </div>
//         {/* Social Media Icons
//         <div className="flex space-x-4 mb-6">
//           <a href="#" className="text-gray-600 hover:text-gray-900">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">
//             <i className="fab fa-instagram"></i>
//           </a>
//         </div> */}
        
//         {/* License and Copyright */}
//         <p className="text-sm text-gray-500 mt-4"  style={{marginBottom : "20px"}}>
//           &copy; {currentYear} Your Company. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footerr;