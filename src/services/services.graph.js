import { Ponto, Reta } from '../services/services.math.js';
import { validarRegiaoPonto } from '../services/utilidade/servico.utilidade.validadorPonto.js';

export class Graph
{
    constructor(pontos = [], retas = [])
    {
        this.pontos = pontos;
        this.retas = retas;
    }

    adicionarPonto(ponto)
    {
        this.pontos.forEach(p => {
            if (p.contemPonto(ponto))
            {
                return;
            }
        });

        this.pontos.push(ponto);
    }

    adicionarReta(reta)
    {
        this.retas.forEach(r => {
            r.contemReta(reta);
        })

        this.retas.push(reta);
    }

    removerPonto(ponto)
    {
        var retasParaRemover = []
        this.retas.forEach(reta => {
            if (reta.contemPonto(ponto))
            {
                retasParaRemover.push(reta);
            }
        })

        this.removerRetas(retasParaRemover);
        console.log(this.pontos.indexOf(ponto));
        this.pontos.splice(this.pontos.indexOf(ponto), 1);
    }

    removerRetas(retas)
    {
        retas.forEach(reta => {
            this.retas.splice(this.retas.indexOf(reta));
        })
    }

    renderizar(ctx)
    {
        this.pontos.forEach(ponto => {
            ponto.desenhar(ctx, {cor: "white", raio: 10 });
        });

        this.retas.forEach(reta => {
            reta.desenhar(ctx, {cor: "white",espessura: 2 });
        })
    }
}

export class GraphEditor
{
    constructor(graph, canvas)
    {
        this.graph = graph;
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;

        this.hovered = null;
        this.dragging = false;

        // PRIVADAS
        this.#eventos();
    }

    #eventos()
    {
        this.canvas.addEventListener("mousedown", (evento) => {
            const ponto = new Ponto(evento.offsetX, evento.offsetY);
            if (evento.button == 0)
            {
                var pontoSelecionado = validarRegiaoPonto(ponto, this.graph.pontos, {raio: 10, tolerencia: 2});
                if (pontoSelecionado == null)
                {
                    console.log(pontoSelecionado);
                    this.hovered = ponto;
                    this.graph.adicionarPonto(ponto);
                }
                else
                {
                    this.dragging = true;
                    this.hovered = pontoSelecionado;
                }
            }
            else if (evento.button == 2)
            {
                console.log(this.hovered)
                if (this.hovered != null)
                {
                    this.graph.removerPonto(this.hovered);
                    this.hovered = null;
                }
            }
            
        });

        this.canvas.addEventListener("mousemove", (evento) => {
            const ponto = new Ponto(evento.offsetX, evento.offsetY);
            var pontoSelecionado = validarRegiaoPonto(ponto, this.graph.pontos, {raio: 10, tolerencia: 2});
            if (pontoSelecionado != null)
            {
                this.hovered = pontoSelecionado;
                if (this.dragging)
                {
                    this.hovered.x = evento.offsetX;
                    this.hovered.y = evento.offsetY;
                }
            }
            else
            {
                this.hovered = null;
            }
        })

        this.canvas.addEventListener("contextmenu", (evento) => evento.preventDefault());
        this.canvas.addEventListener("mouseup", () => this.dragging = false);
    }

    renderizar()
    {
        this.graph.renderizar(this.ctx);
        if (this.hovered != null)
        {
            this.hovered.desenhar(this.ctx, { hovered: true })
        }
    }
}