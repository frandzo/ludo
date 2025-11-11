// web/frontend/src/pages/TeacherDashboard.jsx

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  BarChart3,
  Download,
  Search,
  Plus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Función para obtener los estudiantes desde la API
const fetchStudents = async () => {
  // Usamos el filtro por query param implementado en el backend
  const { data } = await api.get("/api/usuarios?rol=estudiante");
  return data;
};

export default function TeacherDashboard() {
  const navigate = useNavigate();

  // Usamos useQuery para manejar el fetching, cache, y estados de carga/error
  const {
    data: students = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students"], // Clave única para esta consulta en la caché
    queryFn: fetchStudents,
  });

  if (isError) {
    toast.error("Error al cargar estudiantes", {
      description:
        "No se pudo obtener la lista de estudiantes. Inténtalo de nuevo.",
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-linear-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container py-12">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-extrabold mb-2">
              Panel de{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Docente
              </span>
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus estudiantes y monitorea su progreso
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-playful">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : students.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estudiantes
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-playful">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-playful flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Grupos</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="hero" onClick={() => navigate("/registro")}>
              <Plus className="mr-2 h-4 w-4" />
              Registrar estudiante
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar datos
            </Button>
          </div>
          <Card className="p-6 shadow-playful">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar estudiante..." className="pl-10" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">
                      Última actividad
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan="3" className="text-center">
                        <div className="flex justify-center items-center p-8">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <span className="ml-2">Cargando estudiantes...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-semibold">
                          {student.nombre}
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          Hoy
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
