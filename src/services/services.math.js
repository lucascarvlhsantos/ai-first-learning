class Ponto
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    contemPonto(ponto)
    {
        if (this.x == ponto.x && this.y == ponto.y)
        {
            return true;
        }

        return false;
    }

    desenhar(ctx, { cor, raio = 10, hovered = false })
    {
        ctx.beginPath();
        ctx.fillStyle = cor;
        ctx.arc(this.x, this.y, raio, 0, 2 * Math.PI);
        ctx.fill();
        if (hovered)
        {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.arc(this.x, this.y, raio * 0.8, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

class Reta 
{
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }

    contemReta(reta)
    {
        if (this.a.contemPonto(reta.a) && this.b.contemPonto(reta.b) || this.a.contemPonto(reta.b) && this.b.contemPonto(reta.a))
        {
            return true;
        }

        return false;
    }

    desenhar(ctx, { cor, espessura })
    {
        ctx.beginPath();
        ctx.lineWidth = espessura;
        ctx.strokeStyle = cor;
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.a.x, this.a.y);
        ctx.stroke();
    }
}

export { Reta, Ponto }