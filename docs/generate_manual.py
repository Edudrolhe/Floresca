#!/usr/bin/env python3
"""
Gerador de Manual do Sistema — Floresca Floricultura
Gera documento Word (.docx) simplificado para clientes não-técnicos.
"""

import os
from datetime import datetime
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'generated')
OUTPUT_DOCX = os.path.join(OUTPUT_DIR, 'manual-do-sistema-floresca.docx')

os.makedirs(OUTPUT_DIR, exist_ok=True)

doc = Document()

# === ESTILOS ===
style = doc.styles['Normal']
font = style.font
font.name = 'Calibri'
font.size = Pt(11)
font.color.rgb = RGBColor(0x37, 0x41, 0x51)

for level in range(1, 4):
    heading_style = doc.styles[f'Heading {level}']
    heading_style.font.color.rgb = RGBColor(0x7c, 0x3a, 0xed)

def add_table(doc, headers, rows):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        hdr_cells[i].text = header
        for paragraph in hdr_cells[i].paragraphs:
            for run in paragraph.runs:
                run.bold = True
                run.font.size = Pt(10)
    for row_data in rows:
        row_cells = table.add_row().cells
        for i, cell_text in enumerate(row_data):
            row_cells[i].text = str(cell_text)
            for paragraph in row_cells[i].paragraphs:
                for run in paragraph.runs:
                    run.font.size = Pt(10)
    return table

def add_code_block(doc, code):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(1)
    run = p.add_run(code)
    run.font.name = 'Courier New'
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x1f, 0x29, 0x37)

# === CAPA ===
doc.add_paragraph()
doc.add_paragraph()
doc.add_paragraph()
title = doc.add_heading('Manual do Sistema', level=0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
subtitle = doc.add_heading('Floresca Floricultura', level=1)
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_paragraph()
p = doc.add_paragraph('Guia Completo de Uso')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.runs[0].font.size = Pt(16)
p.runs[0].font.color.rgb = RGBColor(0x7c, 0x3a, 0xed)
doc.add_paragraph()
p = doc.add_paragraph(f'Versão 1.0 — {datetime.now().strftime("%d/%m/%Y")}')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_page_break()

# === SUMÁRIO ===
doc.add_heading('Sumário', level=1)
toc_items = [
    '1. Apresentação do Sistema',
    '2. Como Funciona o Sistema',
    '3. Área do Cliente (Loja Online)',
    '4. Painel Administrativo',
    '5. Configurações Importantes',
    '6. Perguntas Frequentes',
    '7. Contato e Suporte',
]
for item in toc_items:
    p = doc.add_paragraph(item)
    p.paragraph_format.space_after = Pt(6)
    p.runs[0].font.size = Pt(12)
doc.add_page_break()

# === 1. APRESENTAÇÃO ===
doc.add_heading('1. Apresentação do Sistema', level=1)

doc.add_heading('1.1 O que é o Floresca?', level=2)
doc.add_paragraph(
    'O Floresca é um sistema completo de e-commerce desenvolvido especialmente '
    'para floriculturas. Ele permite gerenciar produtos, processar vendas online '
    'e acompanhar todo o negócio em um só lugar.'
)

doc.add_heading('1.2 Para quem foi feito?', level=2)
doc.add_paragraph('Proprietários de floriculturas', style='List Bullet')
doc.add_paragraph('Equipe de vendas', style='List Bullet')
doc.add_paragraph('Gerentes de loja', style='List Bullet')

doc.add_heading('1.3 O que você pode fazer com o Floresca?', level=2)
doc.add_paragraph('Cadastrar e gerenciar produtos (flores, buquês, arranjos, cestas)', style='List Bullet')
doc.add_paragraph('Receber pedidos online 24 horas', style='List Bullet')
doc.add_paragraph('Processar pagamentos via Pix ou Cartão de Crédito', style='List Bullet')
doc.add_paragraph('Enviar confirmação automática por email', style='List Bullet')
doc.add_paragraph('Gerenciar funcionários e vendas', style='List Bullet')
doc.add_paragraph('Acompanhar estoque em tempo real', style='List Bullet')
doc.add_page_break()

# === 2. COMO FUNCIONA ===
doc.add_heading('2. Como Funciona o Sistema', level=1)

doc.add_heading('2.1 Visão Geral', level=2)
doc.add_paragraph(
    'O sistema funciona como uma loja virtual completa. O cliente escolhe os produtos, '
    'adiciona ao carrinho, preenche seus dados e paga. Tudo acontece de forma automática e segura.'
)

doc.add_heading('2.2 Fluxo de uma Venda', level=2)
add_code_block(doc, '''
┌─────────────────┐
│  Cliente escolhe │
│    os produtos   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Adiciona ao    │
│    carrinho      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Preenche dados  │
│  pessoais e      │
│  endereço        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Escolhe forma   │
│  de pagamento    │
│  (Pix ou Cartão) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Confirma o     │
│     pedido       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Recebe email    │
│  de confirmação  │
└─────────────────┘
''')
doc.add_page_break()

# === 3. ÁREA DO CLIENTE ===
doc.add_heading('3. Área do Cliente (Loja Online)', level=1)

doc.add_heading('3.1 Página Inicial', level=2)
doc.add_paragraph('Quando o cliente acessa a loja, ele vê:')
doc.add_paragraph('Produtos em destaque', style='List Bullet')
doc.add_paragraph('Categorias (Flores, Buquês, Arranjos, Cestas)', style='List Bullet')
doc.add_paragraph('Ofertas especiais', style='List Bullet')

doc.add_heading('3.2 Escolhendo Produtos', level=2)
doc.add_paragraph('1. Navegue pelas categorias ou use a busca')
doc.add_paragraph('2. Clique no produto para ver detalhes')
doc.add_paragraph('3. Escolha a quantidade')
doc.add_paragraph('4. Clique em "Adicionar ao Carrinho"')

doc.add_heading('3.3 Carrinho de Compras', level=2)
doc.add_paragraph('Visualize todos os itens selecionados', style='List Bullet')
doc.add_paragraph('Altere quantidades ou remova itens', style='List Bullet')
doc.add_paragraph('Veja o total com frete calculado', style='List Bullet')
doc.add_paragraph('Frete grátis para compras acima de R$ 100,00', style='List Bullet')

doc.add_heading('3.4 Finalizando a Compra', level=2)
doc.add_paragraph('O cliente precisa preencher:')
add_table(doc,
    ['Campo', 'Descrição'],
    [
        ['Nome', 'Nome completo do cliente'],
        ['Telefone', 'Número de contato'],
        ['Email', 'Para receber confirmações'],
        ['CPF', 'Documento de identificação'],
        ['Rua', 'Logradouro de entrega'],
        ['Número', 'Número do imóvel'],
        ['Complemento', 'Apto, bloco, etc.'],
        ['Bairro', 'Bairro de entrega'],
        ['Cidade', 'Cidade de entrega'],
        ['CEP', 'Código postal (8 dígitos)'],
    ]
)

doc.add_heading('3.5 Pagamento', level=2)

doc.add_heading('Opção 1: Pix', level=3)
doc.add_paragraph('1. O cliente escolhe Pix')
doc.add_paragraph('2. Gera um QR Code')
doc.add_paragraph('3. Escaneia com o app do banco')
doc.add_paragraph('4. Pagamento confirmado automaticamente')

doc.add_heading('Opção 2: Cartão de Crédito', level=3)
doc.add_paragraph('1. O cliente escolhe Cartão de Crédito')
doc.add_paragraph('2. Preenche os dados do cartão')
doc.add_paragraph('3. Escolhe número de parcelas')
doc.add_paragraph('4. Pagamento processado instantaneamente')

doc.add_heading('3.6 Confirmação do Pedido', level=2)
doc.add_paragraph('Após o pagamento, o cliente recebe um email com:')
doc.add_paragraph('Número do pedido', style='List Bullet')
doc.add_paragraph('Lista de itens comprados', style='List Bullet')
doc.add_paragraph('Valor total', style='List Bullet')
doc.add_paragraph('Endereço de entrega', style='List Bullet')
doc.add_paragraph('Status do pedido', style='List Bullet')
doc.add_page_break()

# === 4. PAINEL ADMINISTRATIVO ===
doc.add_heading('4. Painel Administrativo', level=1)

doc.add_heading('4.1 Como Acessar', level=2)
doc.add_paragraph('1. Acesse a página de login')
doc.add_paragraph('2. Insira email e senha')
doc.add_paragraph('3. Clique em "Entrar"')

doc.add_heading('4.2 Dashboard (Painel Inicial)', level=2)
doc.add_paragraph('No painel principal, você vê:')
doc.add_paragraph('Resumo de vendas do dia', style='List Bullet')
doc.add_paragraph('Pedidos pendentes', style='List Bullet')
doc.add_paragraph('Produtos com estoque baixo', style='List Bullet')
doc.add_paragraph('Gráficos de desempenho', style='List Bullet')

doc.add_heading('4.3 Gerenciamento de Produtos', level=2)

doc.add_heading('Cadastrar Novo Produto', level=3)
doc.add_paragraph('1. Clique em "Produtos" → "Novo Produto"')
doc.add_paragraph('2. Preencha os dados:')
add_table(doc,
    ['Campo', 'Exemplo'],
    [
        ['Descrição', 'Buquê de Rosas Vermelhas'],
        ['Preço', 'R$ 89,90'],
        ['Categoria', 'Buquês'],
        ['Quantidade', '15 unidades'],
        ['Código de Barras', '7891234567890'],
    ]
)
doc.add_paragraph('3. Faça upload da foto do produto')
doc.add_paragraph('4. Clique em "Salvar"')

doc.add_heading('Editar Produto', level=3)
doc.add_paragraph('1. Vá em "Produtos"')
doc.add_paragraph('2. Clique no produto desejado')
doc.add_paragraph('3. Altere os campos necessários')
doc.add_paragraph('4. Clique em "Atualizar"')

doc.add_heading('Excluir Produto', level=3)
doc.add_paragraph('1. Vá em "Produtos"')
doc.add_paragraph('2. Clique no produto desejado')
doc.add_paragraph('3. Clique em "Excluir"')
doc.add_paragraph('4. Confirme a exclusão')

doc.add_heading('4.4 Gerenciamento de Vendas', level=2)

doc.add_heading('Visualizar Vendas', level=3)
doc.add_paragraph('1. Clique em "Vendas"')
doc.add_paragraph('2. Veja a lista de todas as vendas')
doc.add_paragraph('3. Filtre por data, status ou cliente')

doc.add_heading('Detalhes da Venda', level=3)
doc.add_paragraph('Clique em uma venda para ver:')
doc.add_paragraph('Dados do cliente', style='List Bullet')
doc.add_paragraph('Itens comprados', style='List Bullet')
doc.add_paragraph('Forma de pagamento', style='List Bullet')
doc.add_paragraph('Status do pedido', style='List Bullet')

doc.add_heading('Status do Pedido', level=3)
add_table(doc,
    ['Status', 'Significado'],
    [
        ['Pendente', 'Aguardando pagamento'],
        ['Pago', 'Pagamento confirmado'],
        ['Cancelado', 'Pedido cancelado'],
        ['Reembolsado', 'Valor devolvido'],
    ]
)

doc.add_heading('4.5 Gerenciamento de Funcionários', level=2)

doc.add_heading('Cadastrar Funcionário', level=3)
doc.add_paragraph('1. Clique em "Funcionários" → "Novo"')
doc.add_paragraph('2. Preencha os dados:')
add_table(doc,
    ['Campo', 'Descrição'],
    [
        ['Nome', 'Nome completo'],
        ['CPF', 'Documento de identificação'],
        ['Telefone', 'Número de contato'],
        ['Email', 'Email profissional'],
        ['Data de Admissão', 'Data que começou a trabalhar'],
        ['Salário', 'Remuneração mensal'],
    ]
)
doc.add_paragraph('3. Clique em "Salvar"')

doc.add_heading('Editar ou Excluir', level=3)
doc.add_paragraph('1. Vá em "Funcionários"')
doc.add_paragraph('2. Clique no funcionário desejado')
doc.add_paragraph('3. Escolha "Editar" ou "Excluir"')
doc.add_page_break()

# === 5. CONFIGURAÇÕES ===
doc.add_heading('5. Configurações Importantes', level=1)

doc.add_heading('5.1 Formas de Pagamento', level=2)
doc.add_paragraph('O sistema já vem configurado com:')
add_table(doc,
    ['Forma', 'Descrição'],
    [
        ['Pix', 'Pagamento instantâneo'],
        ['Cartão de Crédito', 'Parcelamento em até 12x'],
        ['Dinheiro', 'Pagamento na entrega'],
        ['Cartão de Débito', 'Pagamento na entrega'],
        ['Vale Presente', 'Pagamento com vale'],
    ]
)

doc.add_heading('5.2 Categorias de Produtos', level=2)
doc.add_paragraph('Categorias padrão:')
doc.add_paragraph('Flores', style='List Bullet')
doc.add_paragraph('Buquês', style='List Bullet')
doc.add_paragraph('Arranjos', style='List Bullet')
doc.add_paragraph('Cestas', style='List Bullet')
doc.add_paragraph('Você pode criar novas categorias pelo painel administrativo.')

doc.add_heading('5.3 Frete', level=2)
add_table(doc,
    ['Tipo', 'Valor'],
    [
        ['Grátis', 'Compras acima de R$ 100,00'],
        ['Fixo', 'R$ 15,00 para compras abaixo de R$ 100,00'],
    ]
)
doc.add_page_break()

# === 6. PERGUNTAS FREQUENTES ===
doc.add_heading('6. Perguntas Frequentes', level=1)

doc.add_heading('6.1 Para o Cliente', level=2)

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Como faço para acompanhar meu pedido?')
run.bold = True
doc.add_paragraph('R: Após a compra, você recebe um email com o número do pedido e instruções de acompanhamento.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Posso cancelar um pedido?')
run.bold = True
doc.add_paragraph('R: Sim, entre em contato conosco pelo telefone ou email informado na loja.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Quais formas de pagamento são aceitas?')
run.bold = True
doc.add_paragraph('R: Aceitamos Pix, Cartão de Crédito (parcelado), Cartão de Débito, Dinheiro e Vale Presente.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: O frete é calculado como?')
run.bold = True
doc.add_paragraph('R: Frete grátis para compras acima de R$ 100,00. Abaixo disso, o frete é de R$ 15,00.')

doc.add_heading('6.2 Para o Administrador', level=2)

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Como cadastro um novo produto?')
run.bold = True
doc.add_paragraph('R: Vá em Produtos → Novo Produto, preencha os dados e clique em Salvar.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Como vejo as vendas do dia?')
run.bold = True
doc.add_paragraph('R: No painel inicial (Dashboard), você vê o resumo das vendas em tempo real.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Como altero o preço de um produto?')
run.bold = True
doc.add_paragraph('R: Vá em Produtos, clique no produto desejado, altere o preço e clique em Atualizar.')

doc.add_paragraph()
p = doc.add_paragraph()
run = p.add_run('P: Como cadastro um funcionário?')
run.bold = True
doc.add_paragraph('R: Vá em Funcionários → Novo, preencha os dados e clique em Salvar.')
doc.add_page_break()

# === 7. CONTATO E SUPORTE ===
doc.add_heading('7. Contato e Suporte', level=1)

doc.add_heading('7.1 Suporte Técnico', level=2)
add_table(doc,
    ['Canal', 'Informação'],
    [
        ['Email', 'suporte@floresca.com.br'],
        ['Telefone', '(XX) XXXXX-XXXX'],
        ['Horário', 'Segunda a Sexta, 9h às 18h'],
    ]
)

doc.add_heading('7.2 Dicas de Segurança', level=2)
doc.add_paragraph('Nunca compartilhe sua senha', style='List Bullet')
doc.add_paragraph('Use senhas fortes (letras, números e caracteres especiais)', style='List Bullet')
doc.add_paragraph('Faça logout após usar o sistema', style='List Bullet')
doc.add_paragraph('Em caso de dúvida, entre em contato com o suporte', style='List Bullet')

# === SALVAR ===
doc.save(OUTPUT_DOCX)
print(f"[OK] Manual gerado: {OUTPUT_DOCX}")
print(f"     Seções: 7")
print(f"     Tabelas: 10+")
print(f"     Linguagem: Simples e acessível")
