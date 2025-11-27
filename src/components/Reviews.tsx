import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Mohammed Ali",
      rating: 5,
      review: "Best shawarma in the area! The chicken is always fresh and juicy. Highly recommend the Spl Chicken Shawarma!",
      date: "2 days ago"
    },
    {
      name: "Priya Sharma",
      rating: 5,
      review: "Amazing taste and great value for money. The wraps are delicious and the staff is very friendly. Will definitely order again!",
      date: "1 week ago"
    },
    {
      name: "Rahul Kumar",
      rating: 5,
      review: "The broasted chicken is incredible! Crispy on the outside, juicy inside. Their french fries are also really good. Great food!",
      date: "2 weeks ago"
    },
    {
      name: "Ayesha Khan",
      rating: 5,
      review: "Clean, hygienic, and absolutely delicious! My go-to place for shawarma. The mini shawarma is perfect for a quick bite.",
      date: "3 weeks ago"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="text-secondary mb-4" size={32} />
                
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="fill-secondary text-secondary" size={16} />
                  ))}
                </div>

                <p className="text-foreground mb-4 italic">
                  "{review.review}"
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
