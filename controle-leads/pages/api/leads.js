export const config = {
  api: {
    bodyParser: true,
  },
};

let leads = [];

export async function POST(req) {
  const body = await req.json();

  if (!body.nome) {
    return new Response(JSON.stringify({ error: "Nome é obrigatório" }), {
      status: 400,
    });
  }

  const novaLead = {
    id: Date.now(),
    ...body,
    criado_em: new Date().toISOString(),
  };

  leads.push(novaLead);

  return new Response(JSON.stringify({ sucesso: true, lead: novaLead }), {
    status: 200,
  });
}

export async function GET() {
  return new Response(JSON.stringify(leads), {
    status: 200,
  });
}
