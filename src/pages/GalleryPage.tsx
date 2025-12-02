import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import shawarmaMain from "@/assets/shawarma-main.jpg";
import miniShawarma from "@/assets/mini-shawarma.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import wrap from "@/assets/wrap.jpg";
import broasted from "@/assets/broasted.jpg";
import momos from "@/assets/momos.jpg";

const images = [
  { src: shawarmaMain, alt: "Delicious Chicken Shawarma", category: "Shawarma" },
  { src: burger, alt: "Juicy Chicken Burger", category: "Burgers" },
  { src: wrap, alt: "Fresh Chicken Wrap", category: "Wraps" },
  { src: fries, alt: "Crispy French Fries", category: "Sides" },
  { src: momos, alt: "Chicken Momos", category: "Momos" },
  { src: broasted, alt: "Broasted Chicken", category: "Broasted" },
  { src: miniShawarma, alt: "Mini Shawarma", category: "Shawarma" },
  { src: shawarmaMain, alt: "Special Shawarma", category: "Shawarma" },
  { src: burger, alt: "Classic Burger", category: "Burgers" },
  { src: wrap, alt: "Veggie Wrap", category: "Wraps" },
  { src: broasted, alt: "Crispy Broasted", category: "Broasted" },
  { src: momos, alt: "Steamed Momos", category: "Momos" },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Food <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A visual feast of our mouth-watering dishes. Click on any image to view in full size.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mb-2">
                    {image.category}
                  </span>
                  <p className="text-white font-bold text-lg text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 to-transparent p-6">
                <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-2xl font-bold mt-2">{selectedImage.alt}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GalleryPage;
