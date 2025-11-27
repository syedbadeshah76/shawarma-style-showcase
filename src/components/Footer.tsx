import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">AL-SHA</span>
              <span className="text-secondary"> SHAWARMA</span>
            </h3>
            <p className="text-accent-foreground/80 mb-4">
              Serving the best shawarma, wraps, and street food with authentic flavors and fresh ingredients. Your satisfaction is our priority.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-accent-foreground/80 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#menu" className="text-accent-foreground/80 hover:text-primary transition-colors">Menu</a></li>
              <li><a href="#offers" className="text-accent-foreground/80 hover:text-primary transition-colors">Offers</a></li>
              <li><a href="#gallery" className="text-accent-foreground/80 hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-accent-foreground/80 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-accent-foreground/80">
              <li>Tappachabutra opp Naseeb Hotel </li>
              <li>HYDERABAD, INDIA (500006)</li>
              <li>+91 98765 43210</li>
              <li>info@alshashawarma.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-accent-foreground/60 text-sm">
            © {currentYear} AL-SHA SHAWARMA. All rights reserved.
          </p>
          {/* <p className="text-accent-foreground/60 text-sm">
            Designed by <span className="text-primary font-semibold">Syed Badeshah</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
