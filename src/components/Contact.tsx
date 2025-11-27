import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visit us or reach out for any queries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <Phone className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground mb-2">Get in touch with us</p>
                  <a href="tel:+919876543210" className="text-primary hover:text-primary-hover font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <MapPin className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Tappachabutra Road <br />
                    opposite to Naseeb Hotel, <br />
                    Hyderabad - 500006, India
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <Clock className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Sunday<br />
                    11:00 AM - 11:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <Mail className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <a href="mailto:info@alshashawarma.com" className="text-primary hover:text-primary-hover">
                    info@alshashawarma.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                asChild
              >
                <a href="tel:+919876543210">
                  <Phone className="mr-2" size={20} />
                  Call Now
                </a>
              </Button>
              <Button 
                className="flex-1 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                asChild
              >
                <a href="https://wa.me/919876543210?text=Hi%20AL-SHA%20SHAWARMA!%20I%20would%20like%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Map */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full min-h-[500px] bg-muted flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28954.776390778872!2d78.4481416!3d17.3756871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb970011a9fdd3%3A0x9f96e063ffbecb41!2sAL%20SHAH%20SHAWARMA!5e1!3m2!1sen!2sin!4v1764238607566!5m2!1sen!2sin" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
