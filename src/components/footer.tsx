import { Typography, Button, Input } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Company",
    items: ["About Us", "Careers", "Premium Tools", "Blog"],
  },
  {
    title: "Pages",
    items: ["Login", "Register", "Add List", "Contact"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy", "Team", "About Us"],
  },
];

const LOGOS = [
  "/image/logo1.png",
  "/image/logo2.png",
  "/image/logo3.png",
  "/image/logo4.png",
  
];

export function Footer() {
  return (
    <footer className="px-8 pt-24 pb-8 relative overflow-hidden bg-white">
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
          <div className="flex col-span-2 items-center gap-10 mb-10 lg:mb-0 md:gap-36">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      className="py-1 font-normal text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div>
            <Typography variant="h6" className="mb-3 text-left">
              Subscribe
            </Typography>
            <Typography className="text-gray-500 font-normal mb-4 text-base">
              Get access to subscriber exclusive deals and be the first who gets
              informed about fresh sales.
            </Typography>
            <Typography variant="small" className="font-medium mb-2 text-left">
              Your Email
            </Typography>
            <div className="flex mb-3 flex-col lg:flex-row items-start gap-4">
              <div className="w-full">
                <Input label="Email" color="gray" />
                <Typography className="font-medium mt-3 text-sm text-gray-500 text-left">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-bold underline hover:text-gray-900 transition-colors"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGO SECTION */}
      <div className="w-full bg-white py-6 flex justify-center">
        <div className="flex justify-center items-center gap-10 flex-wrap max-w-5xl">
          {LOGOS.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-16 w-auto max-w-[150px] object-contain"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;