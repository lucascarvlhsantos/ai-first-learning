export function validarRegiaoPonto(ponto, pontos = [], { raio, tolerencia })
{
    for(const p of pontos)
    {
        const modulo = Math.hypot(ponto.x - p.x, ponto.y - p.y);

        if (modulo > raio + tolerencia)
        {
            continue;
        }

        return p;
    }
}