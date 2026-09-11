#!/usr/bin/env python3
"""
Gerador de Relatório de Auditoria de Segurança — Floresca Floricultura
Gera PDF executivo com achados, gráficos e recomendações.
"""

import os
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, Image
)
from reportlab.graphics.shapes import Drawing, String, Wedge, Line
from reportlab.graphics.charts.piecharts import Pie
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics import renderPDF
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io

# === CONFIG ===
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PDF = os.path.join(OUTPUT_DIR, "relatorio-auditoria-seguranca.pdf")
PROJECT_NAME = "Floresca Floricultura"
AUDIT_DATE = datetime.now().strftime("%d/%m/%Y")

# Cores por severidade
COLORS = {
    "Crítica": "#B91C1C",
    "Alta": "#EA580C",
    "Média": "#D97706",
    "Baixa": "#2563EB",
    "Ponto Forte": "#059669",
}

# === DADOS DA AUDITORIA ===
FINDINGS = [
    {
        "severity": "Crítica",
        "file": "payments.ts:163-170",
        "title": "Token de cartão de crédito logado no console",
        "description": "O token de pagamento (cardData.token) é impresso via console.log no servidor. Viola PCI-DSS e pode expor dados sensíveis em sistemas de log.",
        "category": "Chaves Expostas",
        "fix": "Remover console.log que imprime o token. Usar apenas logs de status, nunca dados de pagamento.",
    },
    {
        "severity": "Crítica",
        "file": "payments.ts:183-184",
        "title": "CPF hardcoded em pagamentos com cartão",
        "description": "O CPF '12345678909' é enviado para TODOS os pagamentos com cartão. O CPF real do cliente nunca é coletado no formulário de checkout. Risco de fraude e falha KYC.",
        "category": "Input Sem Tratamento",
        "fix": "Adicionar campo CPF no formulário de checkout e usar o CPF real do cliente na requisição ao Mercado Pago.",
    },
    {
        "severity": "Alta",
        "file": "webhooks/mercadopago/route.ts:10-16",
        "title": "Assinatura de webhook nunca verificada",
        "description": "A função verifyWebhookSignature existe mas NUNCA é chamada. Um atacante pode forjar requisições para marcar qualquer Venda como 'aprovado'.",
        "category": "Permissão Definida no Navegador",
        "fix": "Chamar verifyWebhookSignature no início do handler POST, usando o header x-signature e o MERCADO_PAGO_WEBHOOK_SECRET.",
    },
    {
        "severity": "Alta",
        "file": "payments.ts:47-48",
        "title": "Race condition na geração de IDs",
        "description": "Lê todas as linhas para calcular MAX(id)+1. Duas requisições concorrentes podem gerar o mesmo nextId, causando colisão de chave primária.",
        "category": "Banco sem Tranca",
        "fix": "Usar sequences do banco de dados (CREATE SEQUENCE) ou SELECT ... FOR UPDATE para garantir atomicidade.",
    },
    {
        "severity": "Alta",
        "file": "vendas.ts:12-28, products.ts:13-16",
        "title": "Server actions de dados expostas sem autenticação",
        "description": "getVendas(), getProducts(), getFuncionarios(), getClientes() não chamam requireAdmin(). Qualquer visitante pode invocar essas server actions e acessar dados.",
        "category": "Permissão Definida no Navegador",
        "fix": "Adicionar await requireAdmin() no início de todas as server actions que retornam dados sensíveis.",
    },
    {
        "severity": "Alta",
        "file": "products.ts:85-97",
        "title": "Upload de imagem sem validação server-side",
        "description": "Não há validação de tipo de arquivo (magic bytes), limite de tamanho, ou restrição de extensão no servidor. Um arquivo .html ou .svg com extensão .avif seria servido como estático.",
        "category": "Input Sem Tratamento",
        "fix": "Validar magic bytes do arquivo, limitar tamanho (ex: 5MB), e restringir extensões permitidas (.avif, .jpg, .png, .webp) no servidor.",
    },
    {
        "severity": "Alta",
        "file": "auth.ts:54-75",
        "title": "Login sem rate limiting ou bloqueio de conta",
        "description": "O provider credentials não possui limite de tentativas de login, bloqueio de conta após falhas, ou proteção contra brute force.",
        "category": "Permissão Definida no Navegador",
        "fix": "Implementar rate limiting (ex: max 5 tentativas/minuto) e bloqueio temporário de conta após 5 falhas consecutivas.",
    },
    {
        "severity": "Média",
        "file": "funcionarios.ts:13",
        "title": "SQL injection potencial via string interpolation",
        "description": "A função getNextId usa template string com table e idColumn. Hoje são valores hardcoded, mas o padrão é perigoso para manutenção futura.",
        "category": "Input Sem Tratamento",
        "fix": "Usar parameterized queries ou Prisma query builder em vez de string interpolation com unsafe().",
    },
    {
        "severity": "Média",
        "file": "checkout/page.tsx:27",
        "title": "JSON.parse sem tratamento de erro",
        "description": "localStorage.getItem() + JSON.parse() sem try/catch. Dados corrompidos causam crash do componente.",
        "category": "Input Sem Tratamento",
        "fix": "Envolver JSON.parse em try/catch e retornar array vazio em caso de erro.",
    },
    {
        "severity": "Média",
        "file": "payments.ts:88, 160",
        "title": "Geração de email sintético quando omitido",
        "description": "Se o cliente não informa email, gera-se @floresca.com falso. Confirmações de pagamento vão para endereço inexistente.",
        "category": "Input Sem Tratamento",
        "fix": "Tornar email obrigatório no checkout (já feito) e remover fallback para email sintético.",
    },
    {
        "severity": "Média",
        "file": "contract.prisma",
        "title": "Ausência de Row-Level Security no banco",
        "description": "Nenhuma política RLS definida. Se DATABASE_URL vaza, todo o banco fica exposto. Não há isolamento de tenant/usuário no nível do banco.",
        "category": "Banco sem Tranca",
        "fix": "Implementar RLS policies no Neon/PostgreSQL para isolar dados por tenant/usuário.",
    },
    {
        "severity": "Baixa",
        "file": ".env:4-18",
        "title": "Credenciais no arquivo .env (testes)",
        "description": "O arquivo .env contém credenciais de teste (Mercado Pago, Google OAuth, Neon DB, Resend). Embora .gitignore o exclua, o arquivo está presente no filesystem.",
        "category": "Chaves Expostas",
        "fix": "Usar variáveis de ambiente do platform (Vercel, etc.) em produção. Nunca commitar .env. Usar .env.example para documentar variáveis necessárias.",
    },
    {
        "severity": "Baixa",
        "file": "funcionario-table.tsx:58",
        "title": "CPF de funcionários exibido sem mascaramento",
        "description": "CPFs são exibidos completos na tabela admin. Deveriam ser parcialmente mascarados (ex: ***.456.789-**).",
        "category": "Input Sem Tratamento",
        "fix": "Criar função de mascaramento de CPF e aplicar na renderização da tabela.",
    },
]

POINTS_STRONG = [
    ("Autenticação JWT", "NextAuth v5 com JWT strategy configurada corretamente. Sessões são stateless e seguras."),
    ("Middleware de Auth", "middleware.ts protege corretamente todas as rotas /admin com verificação de login e role."),
    ("requireAdmin()", "Server actions de escrita (create, update, delete) chamam requireAdmin() corretamente."),
    ("Validação de Input", "CheckoutSchema e outros schemas Zod validam todos os campos de entrada."),
    ("Webhooks Route", "A rota webhook valida o tipo de notificação e o paymentId antes de processar."),
    (".gitignore", "O arquivo .env está excluído do versionamento (verificado via git ls-files)."),
    ("SQL Parametrizado", "As queries em auth.ts usam parâmetros $1, $2 corretamente (sem injeção SQL)."),
]

# === ESTILOS ===
styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    'CoverTitle', parent=styles['Title'],
    fontSize=28, leading=34, textColor=colors.HexColor("#1e1b4b"),
    spaceAfter=10, alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    'CoverSubtitle', parent=styles['Normal'],
    fontSize=14, leading=18, textColor=colors.HexColor("#6b7280"),
    spaceAfter=6, alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    'SectionTitle', parent=styles['Heading1'],
    fontSize=18, leading=22, textColor=colors.HexColor("#1e1b4b"),
    spaceBefore=20, spaceAfter=10,
))
styles.add(ParagraphStyle(
    'SubSectionTitle', parent=styles['Heading2'],
    fontSize=14, leading=17, textColor=colors.HexColor("#374151"),
    spaceBefore=12, spaceAfter=6,
))
styles.add(ParagraphStyle(
    'BodyText2', parent=styles['Normal'],
    fontSize=10, leading=13, textColor=colors.HexColor("#374151"),
    spaceAfter=4, alignment=TA_JUSTIFY,
))
styles.add(ParagraphStyle(
    'FindingTitle', parent=styles['Normal'],
    fontSize=11, leading=14, textColor=colors.HexColor("#111827"),
    spaceBefore=6, spaceAfter=2,
))
styles.add(ParagraphStyle(
    'CodeStyle', parent=styles['Normal'],
    fontSize=8, leading=10, textColor=colors.HexColor("#374151"),
    fontName='Courier', backColor=colors.HexColor("#f3f4f6"),
    spaceBefore=2, spaceAfter=2, leftIndent=10,
))


def make_severity_chip(severity):
    color = COLORS.get(severity, "#6b7280")
    return f'<font color="{color}"><b>[{severity}]</b></font>'


def build_pie_chart():
    """Gera gráfico de rosca de severidades."""
    counts = {}
    for f in FINDINGS:
        counts[f["severity"]] = counts.get(f["severity"], 0) + 1

    fig, ax = plt.subplots(figsize=(4, 3))
    labels = list(counts.keys())
    sizes = list(counts.values())
    chart_colors = [COLORS.get(l, "#6b7280") for l in labels]

    wedges, texts, autotexts = ax.pie(
        sizes, labels=labels, colors=chart_colors,
        autopct='%1.0f%%', startangle=90,
        pctdistance=0.75, wedgeprops=dict(width=0.4, edgecolor='white'),
    )
    for t in texts:
        t.set_fontsize(8)
    for t in autotexts:
        t.set_fontsize(7)
        t.set_color('white')
    ax.set_title("Distribuição por Severidade", fontsize=10, fontweight='bold', pad=10)

    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=150, bbox_inches='tight', transparent=False)
    plt.close(fig)
    buf.seek(0)
    return buf


def build_bar_chart():
    """Gera gráfico de barras por categoria."""
    categories = {}
    for f in FINDINGS:
        cat = f["category"]
        categories[cat] = categories.get(cat, 0) + 1

    fig, ax = plt.subplots(figsize=(5, 2.5))
    cats = list(categories.keys())
    vals = list(categories.values())
    bar_colors = ['#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'][:len(cats)]

    bars = ax.barh(cats, vals, color=bar_colors, edgecolor='white', height=0.6)
    ax.set_xlabel("Achados", fontsize=8)
    ax.set_title("Achados por Categoria", fontsize=10, fontweight='bold')
    ax.tick_params(axis='y', labelsize=7)
    ax.tick_params(axis='x', labelsize=7)
    ax.invert_yaxis()

    for bar, val in zip(bars, vals):
        ax.text(bar.get_width() + 0.1, bar.get_y() + bar.get_height()/2,
                str(val), va='center', fontsize=8, fontweight='bold')

    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=150, bbox_inches='tight', transparent=False)
    plt.close(fig)
    buf.seek(0)
    return buf


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT_PDF, pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm,
    )

    story = []

    # === CAPA ===
    story.append(Spacer(1, 60))
    story.append(Paragraph("Relatório de Auditoria de Segurança", styles['CoverTitle']))
    story.append(Spacer(1, 8))
    story.append(Paragraph(PROJECT_NAME, styles['CoverSubtitle']))
    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="60%", thickness=2, color=colors.HexColor("#7c3aed")))
    story.append(Spacer(1, 20))
    story.append(Paragraph(f"Data: {AUDIT_DATE}", styles['CoverSubtitle']))
    story.append(Paragraph("Escopo: Código-fonte completo (server actions, API routes, auth, frontend, infra)", styles['CoverSubtitle']))
    story.append(Spacer(1, 20))

    # Stack
    story.append(Paragraph("Stack Tecnológica Detectada", styles['SubSectionTitle']))
    stack_data = [
        ["Componente", "Tecnologia"],
        ["Framework", "Next.js 16 (App Router, Turbopack)"],
        ["Linguagem", "TypeScript"],
        ["ORM / DB", "Prisma Composer + raw SQL (pg driver) / Neon PostgreSQL"],
        ["Autenticação", "NextAuth v5 (JWT strategy, Google OAuth + Credentials)"],
        ["Frontend", "React, Tailwind CSS, Mercado Pago Card Payment Brick"],
        ["Pagamentos", "Mercado Pago SDK v3 (Checkout Transparente + Preference)"],
        ["Email", "Resend (React Email)"],
        ["Deploy", "Vercel (previsto)"],
    ]
    stack_table = Table(stack_data, colWidths=[120, 340])
    stack_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1e1b4b")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor("#f9fafb")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(stack_table)
    story.append(PageBreak())

    # === RESUMO EXECUTIVO ===
    story.append(Paragraph("1. Resumo Executivo", styles['SectionTitle']))
    story.append(Spacer(1, 8))

    counts = {}
    for f in FINDINGS:
        counts[f["severity"]] = counts.get(f["severity"], 0) + 1

    summary_text = f"""
    Esta auditoria identificou <b>{len(FINDINGS)} achados</b> de segurança no código-fonte do projeto {PROJECT_NAME}:
    <br/><br/>
    """
    for sev in ["Crítica", "Alta", "Média", "Baixa"]:
        if sev in counts:
            summary_text += f'{make_severity_chip(sev)} {counts[sev]} achado(s)&nbsp;&nbsp;&nbsp;&nbsp;'
    story.append(Paragraph(summary_text, styles['BodyText2']))
    story.append(Spacer(1, 12))

    # Gráficos
    pie_buf = build_pie_chart()
    bar_buf = build_bar_chart()

    charts_data = [[
        Image(pie_buf, width=200, height=150),
        Image(bar_buf, width=250, height=125),
    ]]
    charts_table = Table(charts_data, colWidths=[220, 270])
    charts_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    story.append(charts_table)
    story.append(PageBreak())

    # === PONTOS FORTES ===
    story.append(Paragraph("2. Pontos Fortes Verificados", styles['SectionTitle']))
    story.append(Spacer(1, 6))
    strong_data = [["Item", "Descrição"]]
    for title, desc in POINTS_STRONG:
        strong_data.append([
            Paragraph(f'<font color="#059669"><b>{title}</b></font>', styles['BodyText2']),
            Paragraph(desc, styles['BodyText2']),
        ])
    strong_table = Table(strong_data, colWidths=[130, 350])
    strong_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#059669")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor("#ecfdf5")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#d1fae5")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(strong_table)
    story.append(PageBreak())

    # === TABELA DE ACHADOS ===
    story.append(Paragraph("3. Achados Detalhados", styles['SectionTitle']))
    story.append(Spacer(1, 6))

    achados_data = [["Severidade", "Arquivo:Linha", "Descrição"]]
    for f in FINDINGS:
        sev_color = COLORS.get(f["severity"], "#6b7280")
        achados_data.append([
            Paragraph(f'<font color="{sev_color}"><b>{f["severity"]}</b></font>', styles['BodyText2']),
            Paragraph(f'<font size="8" face="Courier">{f["file"]}</font>', styles['BodyText2']),
            Paragraph(f'<b>{f["title"]}</b><br/>{f["description"]}', styles['BodyText2']),
        ])

    achados_table = Table(achados_data, colWidths=[70, 110, 300])
    achados_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1e1b4b")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))

    # Alternating row colors
    for i in range(1, len(achados_data)):
        if i % 2 == 0:
            achados_table.setStyle(TableStyle([
                ('BACKGROUND', (0, i), (-1, i), colors.HexColor("#f9fafb")),
            ]))

    story.append(achados_table)
    story.append(PageBreak())

    # === RECOMENDAÇÕES ===
    story.append(Paragraph("4. Recomendações Priorizadas", styles['SectionTitle']))
    story.append(Spacer(1, 6))

    recs = [
        ("P1 — Imediato (Crítica)", [
            "Remover console.log de tokens de pagamento em payments.ts",
            "Coletar CPF real do cliente no checkout e usar no pagamento",
        ]),
        ("P2 — Alta (1-2 semanas)", [
            "Ativar verificação de assinatura de webhook (verifyWebhookSignature)",
            "Adicionar requireAdmin() em todas as server actions de leitura",
            "Implementar rate limiting no login (max 5 tentativas/minuto)",
            "Validar uploads de imagem no servidor (magic bytes, tamanho, extensão)",
            "Corrigir race condition na geração de IDs (usar sequences do banco)",
        ]),
        ("P3 — Média (1 mês)", [
            "Refatorar unsafe() para parameterized queries",
            "Adicionar try/catch no JSON.parse do checkout",
            "Implementar RLS no banco de dados",
            "Remover fallback de email sintético @floresca.com",
        ]),
        ("P4 — Baixa (Backlog)", [
            "Mascarar CPFs na tabela de funcionários",
            "Usar .env.example para documentar variáveis de ambiente",
        ]),
    ]

    rec_data = [["Prioridade", "Ações"]]
    for priority, actions in recs:
        rec_data.append([
            Paragraph(f'<b>{priority}</b>', styles['BodyText2']),
            Paragraph("<br/>".join([f"• {a}" for a in actions]), styles['BodyText2']),
        ])

    rec_table = Table(rec_data, colWidths=[130, 350])
    rec_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1e1b4b")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 1), (0, 1), colors.HexColor("#fef2f2")),
        ('BACKGROUND', (0, 2), (0, 2), colors.HexColor("#fff7ed")),
        ('BACKGROUND', (0, 3), (0, 3), colors.HexColor("#fffbeb")),
        ('BACKGROUND', (0, 4), (0, 4), colors.HexColor("#eff6ff")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(rec_table)

    # Build
    doc.build(story)
    print(f"[OK] Relatório gerado: {OUTPUT_PDF}")
    print(f"     Achados: {len(FINDINGS)} total")
    for sev in ["Crítica", "Alta", "Média", "Baixa"]:
        if sev in counts:
            print(f"     {sev}: {counts[sev]}")


if __name__ == "__main__":
    build_pdf()
