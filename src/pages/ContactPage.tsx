import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwiggyButton from "@/components/SwiggyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin, Clock, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_WHATSAPP,
} from "@/data/menuData";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi AL-SHA SHAWARMA!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${whatsappMessage}`, '_blank');
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon via WhatsApp.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact AL-SHA SHAWARMA | Hyderabad Location & Phone"
        description="Visit AL-SHA SHAWARMA on Tappachabutra Road, opposite Naseeb Hotel, Hyderabad. Call +91 88558 88965 or message us on WhatsApp."
        path="/contact"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visit us or reach out for any queries. We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                    <Phone className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground mb-2">Get in touch with us</p>
                    <a href={`tel:${BUSINESS_PHONE}`} className="text-primary hover:text-primary-hover font-medium">
                      {BUSINESS_PHONE_DISPLAY}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
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

              <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
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

              <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                    <Mail className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="text-primary hover:text-primary-hover">
                      {BUSINESS_EMAIL}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                  asChild
                >
                  <a href={`tel:${BUSINESS_PHONE}`}>
                    <Phone className="mr-2" size={20} />
                    Call Now
                  </a>
                </Button>
                <Button
                  className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                  asChild
                >
                  <a href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20AL-SHA%20SHAWARMA!%20I%20would%20like%20to%20place%20an%20order`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={20} />
                    WhatsApp
                  </a>
                </Button>
                <SwiggyButton size="default" label="Swiggy" />
              </div>
            </div>

            {/* Contact Form & Map */}
            <div className="space-y-6">
              {/* Contact Form */}
              <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="bg-muted/50"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-muted/50"
                    />
                    <Input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="bg-muted/50"
                    />
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={4}
                      className="bg-muted/50"
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow">
                      <Send className="mr-2" size={18} />
                      Send via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <CardContent className="p-0">
                  <div className="w-full h-[300px]">
                    <iframe
                      title="AL-SHA SHAWARMA location on Google Maps"
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
