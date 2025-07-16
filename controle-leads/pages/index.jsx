// pages/index.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    origem: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 text-lg font-semibold">
              Lead registrada com sucesso!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Cadastro de Lead</h2>
              <Input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <Input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
              <Input name="origem" placeholder="Origem (evento, anúncio, etc.)" value={formData.origem} onChange={handleChange} />
              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
