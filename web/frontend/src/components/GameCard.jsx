// web/frontend/src/components/GameCard.jsx

import { Button } from "./ui/button";
import { PlayCircle, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function GameCard({
  id,
  title,
  category,
  description,
  image,
  difficulty,
  duration,
}) {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-playful hover:shadow-playful-lg transition-all hover:scale-105 border border-border">
      <div className="relative h-48 overflow-hidden bg-gradient-card">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-playful">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{difficulty}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <Button variant="default" className="w-full" asChild>
          <Link to={`/jugar/${id}`}>
            <PlayCircle className="h-4 w-4" />
            Jugar ahora
          </Link>
        </Button>
      </div>
    </div>
  );
}
