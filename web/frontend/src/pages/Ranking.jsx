// web/frontend/src/pages/Ranking.jsx

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Star } from "lucide-react";
import api from "@/utils/api";

export default function Ranking() {
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await api.get("/api/ranking/global");
        setGlobalRanking(response.data);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  const getMedalIcon = (position) => {
    if (position === 0) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (position === 1) return <Medal className="h-8 w-8 text-gray-400" />;
    if (position === 2) return <Award className="h-8 w-8 text-orange-600" />;
    return (
      <div className="font-bold text-lg text-muted-foreground">
        {position + 1}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container py-12">
          <div className="mb-8 text-center animate-slide-up">
            <h1 className="text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ranking de Jugadores
              </span>
            </h1>
            <p className="text-muted-foreground">
              Los mejores estudiantes de Ludodidactas
            </p>
          </div>
          <Tabs defaultValue="global" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 mb-8">
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
            <TabsContent value="global" className="space-y-4">
              {globalRanking.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={`p-6 shadow-playful hover:shadow-playful-lg transition-all animate-slide-up ${
                    index < 3 ? "border-2 border-primary/30" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-12">
                      {getMedalIcon(index)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{entry.nombre}</h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.juegosCompletados} juegos completados
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {entry.puntaje.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        puntos
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
