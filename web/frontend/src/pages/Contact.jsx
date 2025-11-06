// web/frontend/src/pages/Contact.jsx

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Conectar con el endpoint /api/contacto cuando esté disponible en el backend.
      // Por ahora, simulamos una llamada a la API.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("¡Mensaje enviado!", {
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });

      // Limpiar el formulario después del envío exitoso
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (error) {
      toast.error("Error al enviar", {
        description:
          "No se pudo enviar el mensaje. Por favor, intenta de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center animate-slide-up">
              <h1 className="text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Contacto
                </span>
              </h1>
              <p className="text-muted-foreground">
                ¿Tienes alguna pregunta o sugerencia? Estamos aquí para
                ayudarte.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Columna del Formulario */}
              <Card className="p-8 shadow-playful animate-slide-up">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold mb-2"
                    >
                      Nombre
                    </label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="asunto"
                      className="block text-sm font-semibold mb-2"
                    >
                      Asunto
                    </label>
                    <Input
                      id="asunto"
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-sm font-semibold mb-2"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="hero"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {/* Columna de Información */}
              <div
                className="space-y-6 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Card className="p-8 shadow-playful">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        contacto@ludodidactas.com
                      </p>
                      <p className="text-muted-foreground">
                        soporte@ludodidactas.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 shadow-playful">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-playful flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Redes Sociales</h3>
                      <p className="text-muted-foreground">
                        Síguenos para no perderte ninguna novedad.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
