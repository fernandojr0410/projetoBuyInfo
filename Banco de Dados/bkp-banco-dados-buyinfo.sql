CREATE TABLE marca (
    id_marca SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    ativo BOOLEAN NOT NULL
);

CREATE TABLE destaque (
    id_destaque SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    ativo BOOLEAN NOT NULL,
    imagem VARCHAR(5000)
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

CREATE TABLE endereco (
    id_endereco SERIAL PRIMARY KEY,
    cep VARCHAR(20) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    numero INTEGER NOT NULL,
    complemento VARCHAR(45),
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE vendedor (
    id_vendedor SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cnpj_cpf VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(45),
    id_endereco INTEGER,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(5000) NOT NULL,
    descricao VARCHAR(5000) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    data_criacao TIMESTAMP NOT NULL,
    categoria_id_categoria INTEGER,
    marca_id_marca INTEGER,
    destaque_id INTEGER,
    destaque_id_destaque INTEGER,
    FOREIGN KEY (categoria_id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (marca_id_marca) REFERENCES marca(id_marca),
    FOREIGN KEY (destaque_id_destaque) REFERENCES destaque(id_destaque)
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    status VARCHAR(45) NOT NULL
);

CREATE TABLE pedidoprodutocliente (
    id SERIAL PRIMARY KEY,
    id_produto INTEGER NOT NULL,
    id_pedido INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE imagem_produto (
    id_imagem SERIAL PRIMARY KEY,
    nome VARCHAR(5000) NOT NULL,
    produto_id_produto INTEGER NOT NULL,
    FOREIGN KEY (produto_id_produto) REFERENCES produto(id_produto)
);

CREATE TABLE item_pedido (
    pedido_id_pedido INTEGER NOT NULL,
    produto_id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario NUMERIC(10, 2) NOT NULL,
    valor_total NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (pedido_id_pedido, produto_id_produto),
    FOREIGN KEY (pedido_id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (produto_id_produto) REFERENCES produto(id_produto)
);


DO $$ BEGIN
    CREATE TYPE status_enum AS ENUM ('aguardando pagamento', 'confirmado pagamento', 'entregue', 'cancelado');
    ALTER TABLE pedido 
    ALTER COLUMN status TYPE status_enum 
    USING status::text::status_enum;
END $$;

ALTER TABLE produto
ADD COLUMN id_vendedor INTEGER,
ADD FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor);

-- inserindo categoria 
INSERT INTO categoria (id_categoria, nome, ativo) VALUES
(1, 'placa mae', true),
(2, 'memoria', true),
(3, 'fonte', true),
(4, 'cooler', true),
(5, 'gabinete', true),
(6, 'cabo', true),
(7, 'acessorios', true),
(8, 'placa de video', true),
(9, 'processador', true);

-- inserindo destaque
INSERT INTO destaque (id_destaque, nome) VALUES
(1, 'mais pesquisados'),
(2, 'ultimos anuncios'),
(3, 'mais vendidos');

-- inserindo marca 
INSERT INTO marca (id_marca, nome, ativo) 
VALUES 
(1, 'Jack Acessorios', true),
(2, 'Nvidia', true),
(3, 'Lorben', true),
(4, 'Positivo', true),
(5, 'Logitech', true),
(6, 'Blue', true),
(7, 'Microsoft', true),
(8, 'Apple', true),
(9, 'Genérica', true),
(10, 'Trust', true),
(11, 'JACK3D.ACESSORIOS', true),
(12, 'Multilaser', true),
(13, 'LimitStore Acessórios', true),
(14, 'Maxprint', true),
(15, 'Forceline', true),
(16, 'Teclado', true),
(17, 'AMD', true),
(18, 'Qgeem', true),
(19, 'Furukawa', true),
(20, 'Sata', true),
(21, 'Ship G Eletronicos', true),
(22, 'Tomate', true),
(23, 'Inova', true),
(24, 'MB', true),
(25, 'Rochedão', true),
(26, 'Importador', true),
(27, 'KCSonline', true),
(28, 'Lehmox', true),
(29, 'Link', true),
(30, 'OEM', true),
(31, 'PowerX', true),
(32, 'Vinik', true),
(33, 'Montado', true),
(34, 'Nagano', true),
(35, 'Hayom', true),
(36, 'Rise Mode', true),
(37, 'K-Mex', true),
(38, 'Pichau', true),
(39, 'Hayom gb1749', true),
(40, 'Mymax', true),
(41, 'Fortrek', true),
(42, 'Dell', true),
(43, 'Deko', true),
(44, 'Brazil PC', true),
(45, 'Aerocool Advanced Technologies', true),
(46, 'C3Tech', true),
(47, 'One Power', true),
(48, 'Bluecase', true),
(49, 'Corsair', true),
(50, 'GameMax', true),
(51, 'Orionas', true),
(52, 'Kingston Hyper X', true),
(53, 'Micron', true),
(54, 'Kingston', true),
(55, 'Adata', true),
(56, 'EASY MEMORY', true),
(57, 'Corsair Vengeance', true),
(58, 'Kingston Value', true),
(59, 'Micron Crucial', true),
(60, 'XPG', true),
(61, 'Corsair Vengeance LPX', true),
(62, 'Kingston HyperX Fury', true),
(63, 'Kingston Fury Beast', true),
(64, 'ISYNC', true),
(65, 'Machinist', true),
(66, 'GoLine', true),
(67, 'PC-Tech', true),
(68, 'Kazuk', true),
(69, 'Asus', true),
(70, 'Afox', true),
(71, 'Gigabyte', true),
(72, 'Intel', true),
(73, 'ATR005', true),
(74, 'Deepcool', true),
(75, 'T-Dagger', true),
(76, 'Master', true),
(77, 'Knup', true),
(78, 'AeroCool', true),
(79, 'Rise', true),
(80, 'Pcyes', true),
(81, 'Dex', true);

-- inserindo cliente
INSERT INTO cliente (id_cliente, nome, sobrenome, cpf, telefone, email, senha)
VALUES
(1, 'João', 'Silva', '123.456.789-00', '(11) 9999-9999', 'joao.silva@example.com', 'senha123');


-- inserindo endereco 
INSERT INTO endereco (id_endereco, cep, cidade, estado, bairro, numero, complemento, id_cliente)
VALUES
(1, '12345-678', 'Cascavel', 'PR', 'Centro', 123, 'Casa', 1);



-- inserindo vendedor
INSERT INTO vendedor (id_vendedor, nome, cnpj_cpf, telefone, email, id_endereco)
VALUES
(1, 'Vendedor Exemplo', '12345678901234', '(11) 9999-9999', 'vendedor@example.com', 1);

select * from marca where nome = 'Positivo';

-- inserindo produto
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    11,
    'Placa de vídeo Nvidia Dex GeForce 500 Series GTX 550 Ti PV-05 1GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA Nvidia é o fabricante líder de placas de vídeo, sua qualidade garante uma experiência positiva no desenvolvimento do motor gráfico do seu computador. Além disso, seus processadores usam tecnologia de ponta para que você possa desfrutar de um produto rápido e durável. \nVelocidade em cada leitura \nAo contar com 192 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU. \nQualidade de imagem \nCritério fundamental na escolha uma placa de vídeo, a sua resolução de 1920x1080 não irá decepcioná-lo. A decodificação dos píxeis na sua tela fará com que você veja até os menores detalhes em cada ilustração.',
    433.00,
    '2024-01-21 16:09:53',
    8, -- id da categoria 'placa de video'
    2, -- id da marca Nvidia
    3, -- id do destaque 'mais vendidos'
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    12,
    'Teclado Mouse Wireless Preto Para Notebook Positivo',
    'O kit de teclado e mouse da Positivo é perfeito para ajudá-lo a realizar suas atividades diárias. Essa combinação é adaptada para fazer diferentes tarefas, sejam elas de trabalho, escola ou de qualquer tipo.',
    49.90,
    '2024-01-21 16:10:59',
    7, -- id da categoria 'acessorios'
    4, -- id da marca 'Positivo'
    3, -- id do destaque 'mais vendidos'
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    13,
    'Gabinete Gamer Rgb 1749 Lateral E Frontal Em Vidro C/ 4 Fans',
    'O gabinete GB1749 possui acabamento externo em vidro temperado, deixando-o extremamente bonito. Case robusto e completo para montar um completo setup gamer / worker. Flexibilidade na instalação das suas peças e acessórios. Boa refrigeração dos seus componentes. Possui espaço para 6 Fans (4 acompanham o gabinete). A fonte é instalada na parte inferior. \nPlaca Mãe ATX/M-ATX \nPlaca de vídeo Máximo 310mm \nDisco 3.5 HDD* 1 / 2.5 SSD* 2 \nPainel Frontal USB3.0*1 / USB2.0*2 / Audio \nVidros temperados \nFonte de Alimentação: ATX (não inclusa) \nPosição da fonte: inferior \nPCI-E 7 Slots disponíveis \nSuporta 4 Fans \n4 Fan Coolers inclusos(RGB ESTÁTICO) \nFrente: 3x 120mm (inclusos) \nTraseira: 1 x 120mm (incluso) \nTamanho 330x180x425mm \nPeso Bruto: 4,3Kg \n*Fonte na parte inferior \n*Acompanha 4 fans RGB \n*RGB dos fans são estáticos \n*frontal e lateral em vidro temperado 4mm \n* suporta placa de vídeo de ate 31cm \n*Placa mãe suportada ATX, M-ATX, M-ITX \n*imagens meramente ilustrativa',
    289.99,
    '2024-01-21 16:13:34',
    5, -- id da categoria 'gabinete'
    39, -- id da marca 'Hayom gb1749'
    3, -- id do destaque 'mais vendidos'
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    14,
    'Fonte Atx 200w Silenciosa Pc Bivolt S/ Cabo De Força',
    'Produto de alta qualidade e eficiência para seu PC ou DESKTOP. Fonte super silenciosa atendendo computadores convencionais. \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. \nEspecificações do Produto: \nC3 Tech \nEAN: \n7898555217218 \nLargura (bruto) 0.08 \nProfundidade (bruto) 0.15 \nPeso (bruto) :0.69 \nAltura (bruto) :0.11 \nSATA: 2 \nPCI-e: 1 \nPoE (802.3af/at) : Não \nPotência W (Real): 200W \nGarantia Fabricante: 1 Ano \nTipo: ATX \nPinos Fonte: 20+4 \nTensão de Entrada: 115 ou 230V Manual \nPFC Ativo: NÃO \n80 Plus: NÃO \nVentilador: 80x80mm \nCor: Cinza',
    52.80,
    '2024-01-21 16:16:12',
    3, -- id da categoria 'fonte'
    46, -- id da marca 'C3Tech'
    3, -- id do destaque 'mais vendidos'
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    15,
    'Memoria Ram Kingston Hyper X Beast Rgb 8gb 2666mhz',
    'Memoria Ram Kingston Hyper X Beast Rgb 8gb 2666mhz',
    340.00,
    '2024-01-21 16:17:25',
    2, -- id da categoria 'memoria ram'
    52, -- id da marca 'Kingston Hyper X'
    3, -- id do destaque 'mais vendidos'
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor) 
VALUES 
(
    16,
    'Placa Mãe Asus Tuf Gaming B550m-plus Amd Am4 Ddr4 Ryzen B550',
    'B550M-PLUS reúne os elementos essenciais da mais recente plataforma AMD e os combina comfuncionalidades prontas para jogos e durabilidade comprovada. Projetadas com componentes de nível militar, soluções de energia aprimoradas e um conjunto abrangente de opções de refrigeração, essas placas-mãe oferecem desempenho sólido com estabilidade inabalável em jogos. \nCaracterísticas: \n- Marca: Asus \n- Modelo: 90MB14A0-C1BAY0  \nProcessador AMD Ryzen de 3 Geração: \n- Memória 4 x DIMM, máximo de 128GB , DDR4 \nArquitetura de memória: Dual Channel \nProcessadores AMD Ryzen PRO de nova geração: \n- O Suporte a ECC Memory (modo ECC) varia de acordo com a CPU',
    1379.00,
    '2024-01-21 16:42:25',
    1, -- id da categoria 'placa mae'
    70, -- id da marca 'Asus'
    NULL, -- sem destaque
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    17,
    'Kit Fullpack X99 Mr9a Pro + E5-2650v4 + Mem 32gb + Cooler!',
    'Super KIT Gamer/PRO Machinist: Motherboard X99, Xeon V4, 32GB DDR4 e COOLER RGB ! \n- Proc. Xeon E5-2650V4 LGA 2011-3 (12 núcleos/24 threads); \n- Memórias DDR4 Atermiter PC2400 - 2 x 16GB, com dissipador; \n- Cpu Cooler Duplo Fan RGB fixo CoolerStar CS-92C, TDP até 130W; \n- Placa-mãe Machinist X99-MR9A PRO (Perseus): \nMarca: Machinist \nCondição: novo \nSoquete da cpu: lga 2011-3 \nModelo da placa-mãe: X99-MR9A \nEstrutura: ATX \nChipset: Intel B85 \nSlot de memória: 4 * ddr4 (quatro canais de memória) \nMemória máxima suportada: 4*32gb ddr4',
    1895.00,
    '2024-01-21 16:46:07',
    1, -- id da categoria 'kit'
    66, -- id da marca 'Machinist'
    NULL, -- sem destaque
    1, -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    18,
    'Kit Upgrade Gamer - Intel Core I7 3.8ghz + H61 + 16gb De Ram',
    'O kit [OEM] é composto por: \n- 1x Processador Intel Core i7 Clock de 3.8Ghz Turbo (i7 2600s) - 8 Núcleos Lógicos (Threads) \n- 1x Placa de Vídeo Intel HD Graphics 2000 (Integrada) \n- 1x Cooler próprio e especifico e original Duex para Processador Intel (O qual permite um melhor resfriamento em comparação com os coolers universais) - Foto 2 \n- 1x Placa Mãe Intel Chipset B75 LGA 1155 (Permite o uso de 2 monitores simultâneos) - Foto 3 \n- 2x Memória RAM Gamer 8GB RZX / Ceamere Black Gaming 1600Mhz de Alto Desempenho e Performance - Foto 4',
    1495.00,
    '2024-01-21 16:47:24',
    1, -- id da categoria 'kit upgrade'
    73, -- id da marca 'Intel'
    NULL, -- sem destaque
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    19,
    'Kit Pc Gamer B75 I7 16gb Ram Ssd 240gb Cooler Fonte Gamer',
    'KIT UPGRADE PLACA MÃE B75 + PROCESSADOR INTEL CORE I7 + MEMÓRIA 16GB + SSD 240GB + COOLER PARA PC + FONTE 500W ATX GAMER',
    1399.00,
    '2024-01-21 16:48:19',
    1, -- id da categoria 'kit pc gamer'
    65, -- id da marca 'Intel'
    NULL, -- sem destaque
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    20,
    'Placa Mae Am4 Gigabyte B450m Ds3h V2 Amd Ryzen Micro Atx',
    'Placa Mae Gigabyte B450M DS3H V2 DDR4 Socket AM4 Chipset AMD B450 B450M-DS3H-V2 \nA Placa Mãe Gigabyte B450M DS3H V2 é uma placa micro-ATX, com quatro slots DDR4 DIMM, que suporta até a 3ª geração Ryzen, e até 128 GB de memória do sistema. Ainda possui a Tecnologia Multi-GPU, que permite que duas placas de vídeos diferentes (AMD & Nvidia) funcionem simultaneamente, com o objetivo de melhorar a performance gráfica do seu computador. \nTudo isso, somado ao excelente processador gráfico integrado e ao Codec Realtek ALC887 – cujo objetivo é deixar qualquer tipo de áudio do seu PC em alta definição – confirmam que a Placa Mãe Gigabyte B450M DS3H V2 é a escolha perfeita para quem busca uma placa que de forma rápida una todos os componentes do computador, e permita que ele funcione de forma completamente organizada – tendo todas as trocas de informações necessárias entre os processadores, memórias, sistemas de armazenamento e afins.',
    1058.00,
    '2024-01-21 16:51:09',
    1, -- id da categoria 'placa mãe'
    71, -- id da marca 'Gigabyte'
    NULL, -- sem destaque
    1,  -- id do vendedor (assumindo que o vendedor com id 1 existe)
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    21,
    'Placa Mãe Lga1151 Chipset Lan 100 Intel H110 32gb Usb 3.0',
    'Placa Mãe LGA1151 Chipset LAN 100 Intel H110 32GB USB 3.0 \nPlaca Mãe LGA1151 Chipset Intel H110 é uma placa Micro-ATX que foi desenvolvida para suportar os processadores Intel Core i7/ Core i5/ Core i3/ Celeron/Pentium. \nCompatível com Processadores 6ª E 7ª GERAÇÃO.',
    454.75,
    '2024-01-21 16:55:34',
    1, -- id da categoria 'placa mãe'
    78, -- id da marca 'Intel'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    22,
    'Placa Mãe Asus Rog Strix B450-i Amd Am4 Ryzen Itx Wifi B450',
    'Processador(es) \nAMD AM4 Socket AMD Ryzen™ 2nd Generation/Ryzen™ with Radeon™ Vega Graphics/Ryzen™ 1st Generation Processors \n* Refer to www.asus.com for CPU support list \nChipset \nAMD B450 \nMemória \nAMD Ryzen™ 2nd Generation Processors \n2 x DIMM, Max. 32GB, DDR4',
    1139.00,
    '2024-01-21 16:59:24',
    1, -- id da categoria 'placa mãe'
    70, -- id da marca 'Asus'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    23,
    'Placa Mãe Goline A320m-g Am4/ddr4 /giga',
    'LanRealtek RTL8111M 1000Mbps \nModeloA320M-G \nProcessador gráfico (GPU)Integrado \nFator de formaMicro ATX \nChipsetAMD A320 \nPainel Traseiro1x HDMI / 1x D-Sub (VGA) / 4x USB 3.0 - 2x USB 2.0 / 1x RJ45 / 1x PS-2 Mouse / 1x PS-2 Teclado / 2x Conectores de audio \nMemória2x DDR4 DIMM (32GB Max) \nSATA4x SATA 3.0 / Suporte ANCI / 1x M.2 SATA/NVMe \nMarcaGoline \nProcessador (CPU)Suporte processadores AMD Am4 / Ryzen 1000,2000,3000 Series / 7th Apu A8, A10, A12 Series \nÁudioAM4 \nDimensão21,5 x 18,5 cm',
    429.65,
    '2024-01-21 17:01:32',
    1, -- id da categoria 'placa mãe'
    67, -- id da marca 'Goline'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    24,
    'Placa Mãe Goline 1155 /rede Giga/m.2/usb 3.0',
    'Processador Suportado Intel Core i7 / i5 / i3 / Pentium e Celeron \nArmazenamento4 conectores SATA \nSistema OperacionalMicrosoft Windows 7 / 8.1 / 10 \nMarca GOLINE \nSlot de expansão1 Slot PCIe x16 - 1 Slot PCIe x1 \nChipsetIntel H61 Express \nÁudio6 canais - Áudio Codec (Realtek ALC662) \nFator de formaMicro ATX \nModeloGL-H61-MA \nRede 100/1000 (Gigabit) \nPortas E/S do painel traseiro1 USB Teclado - 1 USB Mouse - 1 VGA - 1 HDMI - 4 USB 2.0 - 1 LAN (RJ-45) - 3 Conectores de áudio',
    329.90,
    '2024-01-21 17:03:37',
    1, -- id da categoria 'placa mãe'
    73, -- id da marca 'Goline'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    25,
    'Placa Mãe H61 Lga 1155 2ª E 3ª Rd 10x Usb 2xddr3 Pc-tech Nf',
    'Ficha Técnica \nProcessador:Suporte para processadores Intel Core i7 / i5 / i3 / Pentium / Celeron de 2 / 3 geração no pacote LGA1155 \nChipset: Intel H61 chipset \nMemória: 2 DDR3 800/1066/1333 DIMM slots (8GB Max) \nLan:Suporta LAN 10/100 Fast Ethernet da Realtek 8105E \nAudio:Chip integrado por Realtek ALC662, suporta saída de áudio de 5.1 canais \nInterface de Armazenamento: 4 SATA 3Gb/s ports',
    204.68,
    '2024-01-21 17:06:04',
    1, -- id da categoria 'placa mãe'
    68, -- id da marca 'Pc-tech'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    26,
    'Placa-mãe Asus Prime H310m-e R2.0/br, Intel Lga 1151, Ddr4',
    'Placa Mãe Asus p/Intel 1151 H310M-E R2.0/BR 2xDDR4 90MB11X0-C1BAY0 \nCPU \nProcessadores Intel Socket 1151 para 9° / 8° Geração Intel Core, Pentium, Celeron \nChipset \nProcessadores Intel H310 \nMemory \nMemória 2 x DIMM, máximo de 32GB, DDR4 2666/2400/2133 MHz Non-ECC, Un-buffered \nArquitetura de memória: Dual Channel \nGraphic \nProcessador Gráfico Integrado \nExpansion Slots \n1 x PCIe 3.0/2.0 x16 (modo x16, cinza(s)) \n2 x PCIe 3.0/2.0 \nLAN \n1 x Gigabit LAN Realtek RTL8111H \nAudio \nRealtek ALC887 com 8 canais - CODEC de alta definição',
    645.00,
    '2024-01-21 17:08:13',
    1, -- id da categoria 'placa mãe'
    70, -- id da marca 'Asus'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    28,
    'Placa Mãe Kazuk Lga 1156 H55 Ddr3 8gb Hdmi - 1600mhz',
    'Conectores Entrada e Saída: \n4 conectores SATA 3Gb/s; \n1 conector painel frontal; \n1 conector DEBUG interno; \n1 conector de áudio frontal; \n4 portas USB 2.0/1.1; \n2 portas USB 2.0/1.1 internos; \n1 saída VGA; \n1 saída HDMI; \n1 porta RJ-45; \n1 saída de áudio; \nDimensões: 187mm x 170mm.',
    401.21,
    '2024-01-21 17:11:02',
    1, -- id da categoria 'placa mãe'
    69, -- id da marca 'Kazuk'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    29,
    'Placa Mae Afox H61 Ih61-ma2 Ddr3 Usb 2.0 Vga/hdmi Lga 1155',
    'Platform - INTEL® Socket 1155 \nModel Name - IH61-MA9-V2 \nChipset - Intel® H61 \nCPU Supports - Intel Core™ i7 / Core™ i5 / Core™ i3 / Pentium® / Celeron® \nFSB - 1066 / 1333 / 1600MHz \nMemory - Dual Channel DDR3 1066 / 1333 / 1600MHz \nDimm - 2 x Memory Slots (Max. capacity of system memory 16GB) \nOnboard Graphics - Integrated Graphics Processor \nPCI/PCI-E Slots - 1 x PCI Express x16 slot, 1 x PCI Express x1 slot \nSATA - 4 x SATA2, 1 x M.2 (PCIe NVMe Gen3 x4 ) \nAudio - Realtek 662 on board, Supports 6-channel audio-out \nLAN - Realtek RTL81110100Mbps Ethernet on board',
    351.40,
    '2024-01-21 17:12:31',
    1, -- id da categoria 'placa mãe'
    71, -- id da marca 'Afox'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    30,
    'Kit Upgrade Gamer - Intel Core I5 3.4ghz + H61 + 8gb De Ram',
    '- 1x Processador Intel Core i5 Clock de 3.7Ghz Turbo Boost Tecnology (i5 2500s) - 4 Núcleos Físicos. \n- 1x Placa de Vídeo Intel HD Graphics 2000 (Integrada) \n- 1x Cooler próprio e especifico e original Duex para Processador Intel (O qual permite um melhor resfriamento em comparação com os coolers universais) - Foto 2 \n- 1x Placa Mãe Intel Chipset H61 LGA 1155 (Permite o uso de 2 monitores simultâneos) compatível com SSD M.2 - Foto 3 \n- 1x Memória RAM Gamer 8GB RZX / Ceamere Gaming Fire Black 1600Mhz de Alto Desempenho e Performance - Foto 4',
    997.36,
    '2024-01-21 17:13:58',
    1, -- id da categoria 'kit upgrade gamer'
    73, -- id da marca 'Intel'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    31,
    'Memória RAM Vengeance LPX color preto 32GB 1 Corsair CMK32GX4M1D3000C16',
    'Com desenhos únicos e modernos, a Corsair é uma das marcas mais escolhidas pelos usuários na hora de comprar uma memória ram. Carregar programas mais rapidamente, aumentar a capacidade de responder e executar aplicativos pesados são alguns dos recursos e vantagens que você terá ao comprar essa memória. Não espere mais para melhorar o desempenho do seu computador. \nAumente o seu PC \nCom sua tecnologia DDR4, melhorará o desempenho do seu dispositivo operando em 3 e 4 canais, gerando maior fluidez e velocidade na transferência de dados. Otimize o desempenho do seu computador ao máximo! \nSeu equipe como novo \nEsta memória é ideal para o seu Computadores de mesa. Instale-a e comece a desfrutar de uma operação ideal! \nVelocidade para exigentes \nSe você é um fã de jogos online ou trabalha com programas ou aplicativos pesados, essa memória é para você. Graças à sua velocidade de 3000 MHz, pode desfrutar de alto desempenho e fazer seus trabalhos de forma rápida e eficaz.',
    1399.00,
    '2024-01-21 19:20:19',
    2, -- id da categoria 'memória RAM'
    61, -- id da marca 'Corsair'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    32,
    'Memória Ddr5 16gb 5200mhz Xpg Lancer Rgb',
    'Características: \n- Marca: XPG \n- Modelo: AX5U5200C3816G-CLARBK \nEspecificações: \n- Velocidade: DDR5 5200MHz \n- CAS Lantencia: 38-38-38 \n- Tamanho do módulo: 16 GB \nOperacional: \n- Temperatura de operação: 0 ° C a 85 ° C \n- Temperatura de armazenamento: -20 ° C a 65 ° C \n- Tensão de operação: 1,25 V \n- Dimensões (LxWxA): 133,35 x 40 x 8 mm \nCor do dissipador de calor: \n- Preto \nConteúdo da Embalagem: \n- 1 memória XPG DDR5 de 16 GB \nGarantia: \n- 06 meses de garantia \nPeso: \n90 gramas (bruto com embalagem)',
    1154.00,
    '2024-01-21 19:23:00',
    2, -- id da categoria 'memória RAM'
    60, -- id da marca 'XPG'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    34,
    'Memoria Ddr3l 16gb 1600mhz Low Voltagem Note Mac 2x8gb',
    'Especificações: \n- Marca: Orionas \n- Tipo: DDR3L \n- Capacidade: 16GB \n- Voltagem: 1.35V \n- Velocidade: 1600Mhz \n- Latência: CL11 \n- Registrado: Não \n- Paridade: Não \n- Formato: SODIMM \n- Módulo / Chip: DDR3-1600, PC3-12800- 204-pin \n- Unbuffered / Non ECC \n- Contém 2pentes de memória de 8GB \n- Garantia de funcionamento com as plataformas Intel e AMD',
    248.85,
    '2024-01-21 19:26:20',
    2, -- id da categoria 'memória RAM'
    51, -- id da marca 'Orionas'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    36,
    'Memoria Nova Orignal 8gb Ddr3l 1866 iMac 2015 Retina 5k 27',
    'As memorias da marca Micron modelo DDR3L - 1867MHz - 1,35V, são as memorias utilizadas nos modelos do iMac Retina 5K, 27 polegadas, final de 2015.\nOriginais de fabrica e novas, são os modelos utilizados pela Apple.',
    389.90,
    '2024-01-21 19:29:09',
    2, -- id da categoria 'memória RAM'
    53, -- id da marca 'Micron'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    37,
    'Memória Kingston Ddr3 4gb 1333 Mhz Desktop Kit C/ 02 Unidades',
    'ESPECIFICAÇÕES TÉCNICAS \nComputador: Desktop \nTecnologia de memória: SDRAM \nPlaca mãe: DDR3 \nCompatibilidade: INTEL e AMD \nVelocidades: PC3 - 10600 \nFrequências: 1333 MHZ \nCapacidade de armazenamento: 4GB \nPinos: 240 \nQuantidade de chips: 16 chips \nVoltagem: 1.5v',
    174.89,
    '2024-01-21 19:31:41',
    2, -- id da categoria 'memória RAM'
    54, -- id da marca 'Kingston'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    38,
    'Kit 2 Memoria Ddr2 4gb (2x2gb) Adata 800mhz Nova Oem',
    'Descrição do produto: /nAumente o seu PC /nCom este módulo de memória DDR2, seu dispositivo poderá dobrar a frequência nominal das tecnologias DDR. Além disso, você reduzirá o consumo de energia, pois opera tanto na parede lateral alta do relógio quanto no lado baixo, nos pontos de 0 e 1,8 volts. /nSeu equipe como novo /nEsta memória é ideal para o seu Computadores de mesa. Instale-a e comece a desfrutar de uma operação ideal! /nTrabalhe livremente /nVocê pode usá-lo para atividades domésticas e também navegar na Internet. enviar e-mails ou multimídia, ou trabalhar usando várias funções simultaneamente, esta memória é para você. Graças à sua velocidade de 800 MHz, será capaz de executar todas as suas tarefas de forma rápida e eficaz.',
    60.98,
    '2024-01-21 19:33:48',
    2, -- id da categoria 'memória RAM'
    55, -- id da marca 'Adata'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    40,
    'Memória RAM Vengeance color preto 32GB 1 Corsair CMSX32GX4M1A2666C18',
    'Aumente o seu PC \nCom sua tecnologia DDR4, melhorará o desempenho do seu dispositivo operando em 3 e 4 canais, gerando maior fluidez e velocidade na transferência de dados. Otimize o desempenho do seu computador ao máximo! \nSeu equipe como novo \nEsta memória de formato SODIMM é ideal para o seu Notebooks. Instale-a e comece a desfrutar de uma operação ideal! \nVelocidade para exigentes \nSe você é um fã de jogos online ou trabalha com programas ou aplicativos pesados, essa memória é para você. Graças à sua velocidade de 2666 MHz, pode desfrutar de alto desempenho e fazer seus trabalhos de forma rápida e eficaz.',
    679.00,
    '2024-01-21 19:36:48',
    2, -- id da categoria 'memória RAM'
    57, -- id da marca 'Corsair'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    41,
    'Memória RAM ValueRAM color verde 8GB 1 Kingston KVR1333D3S9/8G',
    'Aumente o seu PC \nCom este módulo de tecnologia DDR3, você melhorará o desempenho do seu dispositivo, alcançando velocidades mais altas de transferência e barramento. Além disso, opera em níveis de baixa tensão, o que otimiza o desempenho e reduz o consumo de energia. \nSeu equipe como novo \nEsta memória de formato SODIMM é ideal para o seu Notebooks. Instale-a e comece a desfrutar de uma operação ideal! \nTrabalhe livremente \nVocê pode usá-lo para atividades domésticas e também navegar na Internet. enviar e-mails ou multimídia, ou trabalhar usando várias funções simultaneamente, esta memória é para você. Graças à sua velocidade de 1333 MHz, será capaz de executar todas as suas tarefas de forma rápida e eficaz.',
    105.00,
    '2024-01-21 19:38:24',
    2, -- id da categoria 'memória RAM'
    58, -- id da marca 'Kingston'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    42,
    'Memória RAM color verde 16GB 1 Crucial CT16G4SFRA266',
    'Aumente o seu PC \nCom sua tecnologia DDR4, melhorará o desempenho do seu dispositivo operando em 3 e 4 canais, gerando maior fluidez e velocidade na transferência de dados. Otimize o desempenho do seu computador ao máximo! \nSeu equipe como novo \nEsta memória de formato SODIMM é ideal para o seu Notebooks. Instale-a e comece a desfrutar de uma operação ideal! \nVelocidade para exigentes \nSe você é um fã de jogos online ou trabalha com programas ou aplicativos pesados, essa memória é para você. Graças à sua velocidade de 2666 MHz, pode desfrutar de alto desempenho e fazer seus trabalhos de forma rápida e eficaz.',
    273.60,
    '2024-01-21 19:39:34',
    2, -- id da categoria 'memória RAM'
    59, -- id da marca 'Crucial'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    43,
    'Memória RAM Fury DDR4 color preto 8GB 1 HyperX HX426C16FB2/8',
    'Aumente o seu PC \nCom sua tecnologia DDR4, melhorará o desempenho do seu computador, aumentando o fluido e a velocidade na transferência de dados. Maximize o desempenho do seu computador e reduza o consumo de energia! \nSeu equipe como novo \nEsta memória é ideal para o seu Computadores de mesa. Instale-a e comece a desfrutar de uma operação ideal! \nVelocidade para exigentes \nSe você é um fã de jogos online ou trabalha com programas ou aplicativos pesados, essa memória é para você. Graças à sua velocidade de 2666 MHz, pode desfrutar de alto desempenho e fazer seus trabalhos de forma rápida e eficaz.',
    166.00,
    '2024-01-21 19:42:20',
    2, -- id da categoria 'memória RAM'
    64, -- id da marca 'HyperX'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    44,
    'Memória Kingston Fury Beast 4gb 2666mhz Kf426c16bb/4',
    'Destaques \n- Dissipador de calor de perfil baixo \n- Upgrade de alta performance \n- Intel XMP-ready \n- Pronto para AMD Ryzen \nGeral \n- Capacidade: 4GB \n- Tipo: DDR4 \n- Velocidade: 2666 MHz \n- Pinagem: 288-pin DIMM \n- Latências: 16-18-18 \n- Tensão: 1,2V',
    169.90,
    '2024-01-21 19:43:38',
    2, -- id da categoria 'memória RAM'
    63, -- id da marca 'Kingston'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    45,
    'Fonte de alimentação para PC Aerocool Advanced Technologies VX Series VX-500W 500W black 230V',
    'Controle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. \nSem ruído ou distrações \nDevido à sua operação silenciosa, o seu equipamento operará minimizando o nível de ruído, para tornar o seu dia mais agradável. \nProteção segura \nO sistema de proteção OPP realiza monitoramento constante da corrente e, no caso de detectar uma sobrecarga de energia, desliga o dispositivo para evitar danos.',
    195.00,
    '2024-01-21 21:37:16',
    3, -- id da categoria 'fonte de alimentação'
    45, -- id da marca 'Aerocool'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    46,
    'Fonte Atx 400w Real Mymax Mpsu/lp400w 110v/220v',
    'Com a fonte de alimentação Mymax MPSU/LP400W você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. \nControle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento.',
    170.90,
    '2024-01-21 21:38:47',
    3, -- id da categoria 'fonte de alimentação'
    40, -- id da marca 'Mymax'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    47,
    'Fonte de alimentação para PC Fortrek PWS-2003 200W prata 115V/230V',
    'Com a fonte de alimentação Fortrek PWS-2003 você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. \nControle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. \nProteção segura \nO sistema de proteção OPP realiza monitoramento constante da corrente e, no caso de detectar uma sobrecarga de energia, desliga o dispositivo para evitar danos.',
    55.49,
    '2024-01-21 21:42:15',
    3, -- id da categoria 'fonte de alimentação'
    41, -- id da marca 'Fortrek'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    48,
    'Fonte Para Cpu Dell Vostro 270s Sff Inspiron 660s 3647 Novo',
    'FONTE PARA COMPUTADOR: DELL VOSTRO 270S, INSPIRON 660S E 3647 \nMARCA: DELL \nCOMPATÍVEL COM MODELOS: L220NS-00, L220ns-01, HU220NS-01, HU220NS-00 \nPOTENCIA: 220W \nALIMENTAÇÃO ENERGIA: 110V/220V (BIVOLT) (CHAVE SELETORA 110V/220V) \n2 CONECTORES: SATA \nCONECTOR PRINCIPAL: 24 PINOS \nCONECTOR 12V: 4 PINOS \nDIMENSÕES: 20cm X 9cm X 5,2cm \nPESO \n660g',
    244.99,
    '2024-01-21 21:44:29',
    3, -- id da categoria 'fonte de alimentação'
    42, -- id da marca 'Dell'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    49,
    'Fonte Atx 450w Real Deko Bivolt 12v4+4p 1xpci Exp6+2 4 Sata',
    'Ficha Técnicas: \n-Marca: DEKO \nInformações Técnicas: \nPadrão ATX: 12V \nVentilador: 12 cm \nPotência Combinada Operacional: 450W \nFaixa de Temperatura Operacional: 0 a 50 °C \nEficiência mínima: 70% \nEntrada AC: 115/230V, 60Hz \nChave Seletora: Automatizada \nDimensão do Produto (LxAxP): 140 x 85 x 150 mm \nDimensão da Embalagem (LxAxP): 210 x 95 x 165 mm',
    199.00,
    '2024-01-21 21:50:50',
    3, -- id da categoria 'fonte de alimentação'
    43, -- id da marca 'DEKO'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    50,
    'Fonte Atx 500w Real 80plus Bronze Brazilpc Bpc/500-80plus/b',
    'Marca: Brazil PC \nModelo: BPC/500PFCA \nPCF Ativo: sim \nBivolt automática: Sim (115v-230v) \nCooler: 12x12cm \nOutras Caracteristicas: \nUltra Silenciosa \nAlta Performance \nConexões: \n1 x Alimentação 20 + 4 pinos \n2 x PCI Express 6 + 2 pinos \n1 x Auxiliar ATX 4 + 4 Pinos \n2 x Conectores IDE \n4 x Conectores SATA',
    339.00,
    '2024-01-21 21:53:28',
    3, -- id da categoria 'fonte de alimentação'
    44, -- id da marca 'Brazil PC'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    51,
    'Fonte de alimentação para PC Aerocool Advanced Technologies KCAS 500W 500W black 230V',
    'Com a fonte de alimentação Aerocool Advanced Technologies KCAS 500W você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. \nControle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. \nSem ruído ou distrações \nDevido à sua operação silenciosa, o seu equipamento operará minimizando o nível de ruído, para tornar o seu dia mais agradável. \nProteção segura \nO sistema de proteção OPP realiza monitoramento constante da corrente e, no caso de detectar uma sobrecarga de energia, desliga o dispositivo para evitar danos.',
    278.00,
    '2024-01-21 21:56:00',
    3, -- id da categoria 'fonte de alimentação'
    45, -- id da marca 'Aerocool'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    52,
    'Fonte Corsair Cx750f Rgb, 750w, Bronze, Modular, Branca',
    'Ventoinha RGB de 120mm: Controle oito LEDs RGB individualmente ao toque de um botão, com 9 modos de iluminação predefinidos.\nBrilhante estrutura e cabos em branco: Combina com o aspecto minimalista e refinado de outros produtos brancos da CORSAIR em seu equipamento. \nCompatível com o iCUE e o RGB da placa-mãe: Conecte a um controlador de iluminação CORSAIR iCUE RGB (vendido separadamente) ou a uma placa-mãe com o adaptador ARGB de 5V incluído na embalagem para obter controle de iluminação RGB avançado. \nOtimizado para baixo ruído: A curvatura da ventoinha dedicada foi calculada especialmente para manter baixos níveis de ruído. Capacitores japoneses primários de 105°C: Para potência consistente e confiável, além de um excelente desempenho elétrico.',
    700.00,
    '2024-01-21 21:58:09',
    3, -- id da categoria 'fonte de alimentação'
    49, -- id da marca 'Corsair'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    53,
    'Fonte de alimentação para PC XPG Core Reactor 650W 650W 100V/240V',
    'Com a fonte de alimentação XPG 650W você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. \nControle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. \nSem ruído ou distrações \nDevido à sua operação silenciosa, o seu equipamento operará minimizando o nível de ruído, para tornar o seu dia mais agradável.\nProteção segura \nO sistema de proteção OPP realiza monitoramento constante da corrente e, no caso de detectar uma sobrecarga de energia, desliga o dispositivo para evitar danos.',
    829.90,
    '2024-01-21 22:01:30',
    3, -- id da categoria 'fonte de alimentação'
    60, -- id da marca 'XPG'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    54,
    'Fonte de alimentação para PC Bluecase BLU 500R-B 500W preta 115V/230V',
    'Com a fonte de alimentação Bluecase BLU 500R-B você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. \nControle de temperatura \nAtravés de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento.',
    299.90,
    '2024-01-21 22:07:48',
    3, -- id da categoria 'fonte de alimentação'
    48, -- id da marca 'Bluecase'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    55,
    'Fonte Corsair Cx550f 550w 80 Plus Bronze Modular Rgb Preta',
    '1 Cabo ATX modular de 24 pinos (24) \n1 Cabo EPS/ATX12V de 8 pinos (4+4) \n1 Cabo modular PCIe de 8 pinos (6+2) \n1 Cabo SATA modular (3 SATA) \n1 Cabo SATA modular (4 SATA) \n1 Cabo PATA modular (4 PATA) \n1 Cabo modular dos LEDs da ventoinha \nCabo modular ARGB de 5V da placa-mãe',
    703.30,
    '2024-01-21 22:08:57',
    3, -- id da categoria 'fonte de alimentação'
    49, -- id da marca 'Corsair'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    56,
    'Fonte de alimentação para PC GameMax GP Series GP-650 650W black 100V/240V',
    'Com a fonte de alimentação GameMax GP-650 você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes. Controle de temperatura através de seu sistema de refrigeração, você poderá manter a temperatura ideal de seus componentes e evitar o superaquecimento. Sem ruído ou distrações devido à sua operação silenciosa, o seu equipamento operará minimizando o nível de ruído, para tornar o seu dia mais agradável. Proteção segura com o sistema de proteção OPP que realiza monitoramento constante da corrente e, no caso de detectar uma sobrecarga de energia, desliga o dispositivo para evitar danos.',
    310.50,
    '2024-01-21 22:10:00',
    3, -- id da categoria 'fonte de alimentação'
    50, -- id da marca 'GameMax'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    57,
    'Fonte Atx 200w Reais Power Super Silenciosa Pc Bivolt',
    'Com a fonte de alimentação Knup Fonte você pode garantir a corrente contínua e estável de seu computador desktop e otimizar o funcionamento de seus componentes.',
    117.00,
    '2024-01-21 22:11:34',
    3, -- id da categoria 'fonte de alimentação'
    78, -- id da marca 'Knup'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    59,
    'Cooler Duplo Cpu Dual Fan Pc Intel 775 1151 1155 Amd Am3 Am4',
    'Cooler Universal Processador Intel e Amd Com 21 Leds Fan Duplo \nEspecificações: \n- 2 x 6 mm heat pipes para melhor condução de calor; \n-CPU heat pipe com contato direto para uma melhor condutividade térmica; \n-Dupla fans 92mm entregar o fluxo de ar suficiente para o dissipar o calor. \n-Fan 92mm com função PWM; \n-Kit universal de montagem ( INTEL E AMD)',
    94.80,
    '2024-01-27 14:08:24',
    4, -- id da categoria 'cooler'
    73, -- id da marca 'intel'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    60,
    'Cooler 120 X 120 X 25mm C3tech F7 Storm Series 1200 Rpm',
    '- Cooler C3Tech F7 Storm series de 12 x 12 cm indicado para uso em gabinetes gamers de alta performance.\n- Velocidade de 1200 RPM com voltagem de 12 VDC. \n- Fluxo de ar de 43,2 CFM evitando aquecimentos indesejáveis. \n- Com uma estrutura projetada para suprimir ruídos o F7 e super silencioso e muito versátil, podendo ser montado na parte traseira, superior ou nas laterais. \n- Possui 7 laminas na cor preta para efeito surpreendente em seu gabinete. \n- Desenvolvido com hélices estrategicamente projetadas para maior circulação de ar, assegurando a qualidade do produto. \n- Conector com 3 pinos, para conexão em fontes ATX.',
    26.04,
    '2024-01-27 14:10:11',
    4, -- id da categoria 'cooler'
    74, -- id da marca 'C3Tech'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    61,
    'Cooler Fan Deepcool Rf120b 120mm Led Azul',
    '- Cooler Fan Deepcool RF120B de 120mm com LED azul.\n- 9 lâminas projetadas para criar alto fluxo de ar e reduzir o ruído.\n- Design PWM que suporta a função de controle de velocidade inteligente, para ajustar a velocidade do ventilador de forma dinâmica.\n- Conector de 3 pinos para placa-mãe e 4 pinos para alimentação direta.',
    46.90,
    '2024-01-27 14:11:18',
    4, -- id da categoria 'cooler'
    75, -- id da marca 'Deepcool'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    62,
    'Cooler Fan Gamer 120x25mm Led Vermelho T-tgf300-r - T-dagger',
    'Cooler Fan Led 120x120x25 12cm T-dagger T-tgf300-r Hidráulico Silencioso 3 Pinos e Molex Modelo: T-TGF300R Marca: T-Dagger Velocidade: 1200 +- 10% RPM Air Flow: 38.5 CFM Pressão do ar: 1.1 mmH20 (Max.) Ruído: 23 dB (Max.) Conector: 3 Pinos Placa Mãe + 4 Pinos Molex Iluminação: LED Vermelho ou azul Voltagem do fan: DC 12V Tipo de rolamento: Hidráulico Dimensões: 120 x 120 x 25 mm 1 Fan 4 Parafusos para instalação.',
    39.90,
    '2024-01-27 14:12:58',
    4, -- id da categoria 'cooler'
    76, -- id da marca 'T-Dagger'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    63,
    'Cooler Fan Led 120mm Ventoinha Para Gabinete Cpu Gamer Pc',
    'ESPECIFICAÇÕES Design: Ergonômico Tamanho: 120X120X25mm Voltagem: 5V e 12V Refrigeração: a Ar Fluxo de ar: 31,2CFM Velocidade: 1500 rpm Ventilador: Silencioso Ruído: 22,8dBA Vida útil: 30.000Hs Conector: 4 pinos na fonte e 3 pinos na placa mãe',
    21.61,
    '2024-01-27 14:14:40',
    4, -- id da categoria 'cooler'
    77, -- id da marca 'knup'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    64,
    'Cooler Gamer Pc Amd Intel 2011 1366 1150 1155 21 Leds Dx2021',
    'Principais características: Cooler com 4 heat pipe T4 Dissipador de calor:4*6mm heat pipe(contato direto)+Aluminio fin TDP: 130w Cor: fan com 21 leds Dimensões: 128 x 77 x 154 mm Rolamento: Hydro Bering Material: Lâminas de alumínio/ 4 heat pipes Cooler: 120x120x25mm Velocidade do fan: 700 ~2200 RPM (PWM)±10% Max fluxo de ar: 77,0 cfm Nível de Ruído: 15.0 ~ 36,8 dBA Tensão nominal: 12 vdc Tensão operacional:10.8 ~ 13.2vdc Corrente: 0.39a(+/-10%) Entrada de alimentação: 4.68w Conector: 4 pinos PESO: 570g',
    139.80,
    '2024-01-27 14:20:18',
    4, -- id da categoria 'cooler'
    73, -- id da marca 'intel'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    65,
    'Cooler Duplo Cpu Dual Fan Pc Intel Amd 775 1151 1155 Am3 Am4',
    '[ ESPECIFICAÇÕES PRODUTO ] Marca: DEX Modelo: DX-9100D Condição: Produto Novo na Caixa Plataforma: PC Desktop Fan Duplo: Sim Material Corpo: Alumínio Fin Rolamento: Hydro Bearing Conector Pinagem: 4 Pinos Dimensões: 117mm x 99mm x 128mm Dissipação Calor: 2*6mm Heat Pipe (contato direto) + Alumínio Fin Heat Pipes: 2x6mm Fabricados em Cobre para melhor Condução Calor CPU Heat Pipe: Contato Direto para melhor Condutividade Térmica Função PWM Fan 92MM Plus: Mantém Equilíbrio Fluxo Ar e Ruído Peso Cooler: 450 gramas LED: Sim TDP: 130w',
    111.43,
    '2024-01-27 14:22:02',
    4, -- id da categoria 'cooler'
    81, -- id da marca 'dex'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    66,
    'Cooler Gamer P/ Processador - Dx-9115d Azul',
    'Especificações: Geral 2x6 Heat pipes para melhor condução de calor CPU Heat Pipe com contato direto para uma melhor condutividade térmica Duas Fans para entregar o fluxo de ar suficiente para dispersar o calor Função PWM mantém um perfeito equilíbrio entre o fluxo de ar e do ruído Possui 21 LEDs: Cor: Vermelho TDP: 130W Kit universal de montagem (Intel e AMD)',
    126.59,
    '2024-01-27 14:23:29',
    4, -- id da categoria 'cooler'
    81, -- id da marca 'dex'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    67,
    'Kit 3 Fans Cooler Led | Rise Mode | Wind | 120x120',
    'Kit 3 Fans Rise Mode Wind Cores: Vermelho/Azul/Branco/Verde/Rainbow Tamanho: 120X120X25mm Refrigeração: a Ar Fluxo de ar: 50CFM Velocidade: 1500Rpm Ventilador: Silencioso Ruído: 28dBA Duração: 40000Hs Conector: Molex 4 Pinos (Fonte) / 3 Pinos (Placa mãe)',
    57.49,
    '2024-01-27 14:24:43',
    4, -- id da categoria 'cooler'
    80, -- id da marca 'Rise Mode'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    68,
    'Cooler Master Hyper 212 Black Edition Com Suporte Lga 1700',
    'O HYPER 212 BLACK EDITION ( RR-212S-20PK-R1 ) Possui garantia de 2 anos De Fabrica. HYPER 212 RGB BLACK EDITION O lendário Hyper air cooler está de volta e melhor do que antes. O Hyper 212 RGB Black Edition oferece melhor instalação e ótimo desempenho, facilmente uma das melhores soluções de refrigeração de ar. A tampa superior de alumínio e as aletas em preto niquelado conferem ao Hyper 212 RGB Black Edition um apelo estético premium. O elegante preto azeviche não só faz com que tenha uma ótima aparência, mas também aumenta o desempenho de resfriamento.',
    399.91,
    '2024-01-27 14:26:43',
    4, -- id da categoria 'cooler'
    77, -- id da marca 'Cooler Master'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    69,
    'Cooler Fan Led Cpu Pc Intel Amd Gamer E Servidor',
    'Cooler Fan Led Cpu PC Intel Amd Knup KP-VR303 Cooler com 1 fan na posição vertical para melhor refrigeração, não é necessário ferramentas fácil instalação, Vai com um sache de pasta térmica e um kit com 4 trava para fixação do cooler. Características: Hardware para múltiplas plataformas; Alta eficiência de refrigeração; Leds azuis.',
    99.99,
    '2024-01-27 14:29:55',
    4, -- id da categoria 'cooler'
    78, -- id da marca 'Knup'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    70,
    'Cooler Fan Rgb 5 Cores Fixa Ventoinha 12cm Pc Gabinete Gamer',
    'FAN COOLER 120mm Com LED RGB FIXO HAYOM O Fan Cooler HAYOM apresenta um design elegante de iluminação LED RGB fixa para adicionar um toque extra ao equipamento. Vem equipado com pás curvas para aumentar a pressão do ar, maximizando o desempenho de resfriamento e minimizando a resistência do ar e o ruído. Vem equipado com conector Molex A iluminação LED RGB fixa adiciona um toque extra ao equipamento Pás curvas para máximo desempenho de resfriamento Velocidade do ventilador de 1100 RPM',
    28.85,
    '2024-01-27 14:31:32',
    4, -- id da categoria 'cooler'
    79, -- id da marca 'HAYOM'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    71,
    'Cooler Fan Rise Mode Wind W1 120mm Led Azul - Rm-wn-01-bb',
    'Características: Marca: Rise Mode Modelo: RM-WN-01 Especificações: Fluxo de ar do Fan: 50 CFM Nível sonoro: 28 dBA Velocidade: 1500 Rpm Conector: 3 pin ou Molex Dimensões: 120 x 120 x 25 mm Conteúdo da embalagem: 1 x Cooler FAN Rise Mode',
    26.99,
    '2024-01-27 14:32:36',
    4, -- id da categoria 'cooler'
    80, -- id da marca 'Rise Mode'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    72,
    'Cooler Fan Ventoinha 120mm 74,5 Cfm 4 Pinos Pwm 1800 Rpm',
    'Detalhes Controle PWM e operação silenciosa Projeto de alta pressão de ar Lâminas de ventilador exclusivas para fornecer alta pressão de ar Amortecedores de borracha em todos os 4 cantos de ambos os lados ajudam a manter uma operação silenciosa',
    48.90,
    '2024-01-27 14:33:29',
    4, -- id da categoria 'cooler'
    81, -- id da marca 'dex'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    73,
    'Gabinete Padrão Powerx 6503bk Fonte 230w C/ Fan 80mm - Preto',
    'ESPECIFICAÇÕES: FORMATO: Micro-ATX, Mini-ITX Chassis mATX: 0.4mm, revestimento externo na cor preto PAINEL FRONTAL: ABS BAIAS: 1x Baia externa: 5.25 (ODD) 2x Baias interna: 3.5 (HDD) 3x 2.5 (SSD) Botões: Liga/Desliga Reset PORTAS: 2x USB 2.0 1x Entrada de áudio (Microfone) 1x Saída de áudio (fone de ouvido ou caixa de som)',
    200.30,
    '2024-01-27 14:37:27',
    5, -- id da categoria 'gabinete'
    31, -- id da marca 'PowerX'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    74,
    'Gabinete Gamer T-dagger G25b Rgb Preto Mid Tower Black',
    'Marca: T-dagger Modelo: TGC-G25B Tipo: Mid Tower Material: Aço + Acrílico Janela lateral: Acrílico Cor: Preto Placas mães suportadas: ATX / Micro ATX / ITX Slots de expansão: 7',
    244.18,
    '2024-01-27 14:40:04',
    5, -- id da categoria 'gabinete'
    76, -- id da marca 'T-dagger'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    75,
    'Gabinete Gamer T-dagger Cube Tgc-305 Preto',
    'Marca: T-Dagger Modelo: T-TGC305BK Espesso Painel: de Vidro Temperado na parte lateral Sistema avançado: de entrada de Fluxo de Ar na parte Frontal Slots para 3 FANS: de 120mm na parte frontal Tipo: Mid Tower Placa Mãe Suportada: ATX Baias: 1 x 3.5 1 x 2.5',
    343.23,
    '2024-01-27 14:43:14',
    5, -- id da categoria 'gabinete'
    76, -- id da marca 'T-dagger'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    76,
    'Gabinete Gamer Preto Gamemax Revolt 3606 Argb Vidro',
    'Características: Forma: ATX Fita lateral LED: Opcional Expansão: 7 Espessura da chapa: 0.5 mm Tool-Less Revestimento interno e externo na cor preta USB 3.0: 1 USB 2.0: 1 Áudio HD: 1 MIC-In, 1 SPK-Out Placa de vídeo suportada: 330 mm Altura máxima do CPU Cooler: 170 mm Placa mãe suportada: E-ATX, ATX, mATX, ITX Filtro anti-poeira: Sim Gerenciamento de cabos: Não',
    460.12,
    '2024-01-27 14:46:35',
    5, -- id da categoria 'gabinete'
    50, -- id da marca 'Gamemax'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    77,
    'Gabinete Gamer Pyxis Frontal Com Fita Led Rgb E Acrílico',
    'Características gerais: Lateral esquerda com acrílico transparente e dobradiça Painel frontal em plástico com fita LED Cabos full black Suporta cable management Tool-Less e tool-Free (tampas laterais) Baias: 2 x HD 3,5 2 x SSD 2,5 7 Slots de expansão Painel topo: 1 x USB 2.0 1 x USB 3.0 1 x Áudio HD + Mic 1 x Reset Compatibilidade: Placas-Mãe: ATX, Micro ATX e Mini ITX Placas de vídeo: até 320mm',
    269.00,
    '2024-01-27 14:48:48',
    5, -- id da categoria 'gabinete'
    32, -- id da marca 'Pyxis'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    78,
    'Pc Computador Cpu Intel I3 4gb Ssd 120gb Hdmi',
    'PROCESSADOR: - Processador: Intel Core i3 540/550 - 2.80/3.20Ghz - Socket: 1156 - Placa Mãe: Intel H55 - Suporta: Intel Core i3/ i5 / i7 MEMÓRIA: - Tamanho: 4 GB - 2x slots De Memória DDR3 - Arquitetura da memória: Dual Channel DDR3 - Memória Máxima: 08 Giga',
    845.22,
    '2024-01-27 14:52:04',
    5, -- id da categoria 'gabinete'
    33, -- id da marca 'montado'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    79,
    'Gabinete C3tech Gamer Mt-g70 Bk 1 Baia S/ Fonte',
    '* Gabinete Gamer * Mid tower * Suporta placas mae: ITX / Micro ATX / ATX / Full ATX * Suporte a SSD 2.5 * 2 portas USB 2.0 * Entrada para microfone e saida para fone de ouvido Padrao P2 3.5mm * HD Audio * Organizador de cabos * Screwless * Fonte de Alimentacao nao inclusa Especificacoes: * Espessura da chapa: 0.45mm * Quantidade de baias 5.25: 1 Exposta * Quantidade de baias 3.5: 1 Interna Possivel fixar mais 1 HDs de 3.5 direto no chassi * Quantidade de baias 2.5: 1 Interna Possivel fixar mais 2 HDs de 2.5 direto no chassi * 7 slots PCI',
    218.66,
    '2024-01-27 14:54:33',
    5, -- id da categoria 'gabinete'
    46, -- id da marca 'C3Tech'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    80,
    'Gabinete Gamer Atx Preto',
    'O Gabinete Gamer ATX Preto - NGGA foi projetado com um design moderno, fará com que seu setup fique ainda mais incrivel e com recursos funcionais. DADOS TÉCNICOS SPCC 0.35MM Aço 1 x HDD 1 x SSD 4 Slots de expansão. Painel frontal: 2 x USB 2.0 Audio HD + Mic. Compatibilidade: Placas-mãe: Micro ATX e Mini ATX Cooler: Dianteiro: 1 x 120, Traseiro: 1 x 80. Estrutura: Tamanho: 400*176*41.',
    205.74,
    '2024-01-27 14:56:03',
    5, -- id da categoria 'gabinete'
    34, -- id da marca 'NGGA'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    81,
    'Gabinete Rise Mode Glass 06x White Sem Fans',
    'ESPECIFICAÇÕES: Part Number: RM-WT-06X-FW Cor: Branco - Dimensões (L x W x H): L 365mm x W 200mm x H 455mm Fans: Suporte para 6 fans (fans não inclusos) Baias: 3.5 HDD (x2) | 2.5 SSD (x3) Slots de Expansão: 7 Placa-Mãe: ATX / M-ATX / ITX Frontal I/O: x1 USB 2.0 | x1 USB 3.0 HD Áudio Entrada e Saída Fontes de Alimentação: ATX (não inclusa)',
    369.90,
    '2024-01-27 14:57:49',
    5, -- id da categoria 'gabinete'
    36, -- id da marca 'Rise Mode'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    82,
    'Gabinete Kmex Gm10th Com Fonte 200w Micro Atx 1 Baia 5,25',
    'Especificações Gabinete K-MEX GM-10TH 1 Baia 2xUSB 2.0 com fonte 200W Preto Texturizado - Dimensões do chassi (AxLxP) 330x170x280mm - Dimensões do gabinete (AxLxP) 347x172x315mm - Baias: 1x5.25” externa | 1x2.5” interna SSD | 1x3.5” Interna | 2x2.5” ou 3.5” interna - Slots de expansão: 4 - Placa mãe: Micro ATX - Ventilação com fan ( opcional): Traseira 1x de 80x80mm | Frontal 1 de 120x120mm - Ventilação TAC 2.0: Lateral 120x120mm - Fonte de alimentação: ATX',
    269.00,
    '2024-01-27 14:58:52',
    5, -- id da categoria 'gabinete'
    37, -- id da marca 'K-MEX'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    83,
    'Gabinete Slim Matx Tfx Q5p Sff 2xusb/hd',
    'ESPECIFICAÇÕES 1 BAIA EXTERNA 5.25; 1 BAIAS HDD 3.5; 2 BAIA 2.5 SSD; 2 PORTAS USB 2.0 FRONTAIS; 1 PORTAS USB 3.0 FRONTAIS; 1 ENTRADA MICROFONE FRONTAL; 1 ENTRADA ÁUDIO FRONTAL; 4 ABERTURAS PCI; SUPORTA PLACAS: MICRO ATX SAÍDA DE VENTILAÇÃO LATERAL E INFERIOR; PAINEL FRONTAL EM PLÁSTICO ABS ACOMPANHA KIT PARAFUSOS; COM SENSOR DE INTRUSÃO PESO:2.8KG. CASE (COMPRIMENTO*LARGURA*ALTURA): 370mm x 100mm x 340mm',
    99.99,
    '2024-01-27 15:01:14',
    5, -- id da categoria 'gabinete'
    44, -- id da marca 'Não especificado'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    84,
    'Gabinete Gamer Kmex Microcraft 4 Cg-04rc Cubo Fan 200mm',
    'Gabinete Gamer compacto, robusto, acompanha cooler com LED, possui 3 janelas em acrílico transparente. Ventilação (mm): - Suporta 1 frontal de 200mm com LED\s Multicor (Já incluso) - Suporta 1 de 120mm na traseira (Não incluso) - Suporta Water Cooler de 120mm na parte traseira (Não incluso) - Suporta CPU Cooler de até 160mm (Não incluso) Suporta Placa Mãe: Micro ATX / ITX Placa mãe máximo: 24,4 x 24,4 cm Suporte para placa de vídeo: 300mm Dimensões do Chassi (Interna): 270 x 262 x 305mm (A x L X P) Dimensões do Gabinete (Externa): 333 x 265 x 350mm (A x L X P)',
    389.00,
    '2024-01-27 15:03:57',
    5, -- id da categoria 'gabinete'
    37, -- id da marca 'K-MEX'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    85,
    'Gabinete Gamer Pichau Hx300 White Lateral Vidro, Pg-hx3-w01',
    'Especificações: - Marca: PICHAU - Modelo: PG-HX3-W01 - Painel frontal: Metal - Painel lateral: Vidro temperado - Placa mãe suportada: M-ATX, ITX - Fonte suportada: Inferior / ATX - Ventoinhas suportadas: Traseira: 1 x 120 mm Superior: 2 x 120 mm - Water cooler suportado: 120 mm - Baias: 2 x 3,5 / 4 x 2,5 - Slots de expansão: 4 - Comprimento máximo VGA: 350 mm - Altura máxima do cooler da CPU: 160 mm - Gerenciamento de cabos: 25 mm - Dimensões: 365 x 210 x 385 mm',
    284.90,
    '2024-01-27 15:05:36',
    5, -- id da categoria 'gabinete'
    38, -- id da marca 'Pichau Gaming'
    NULL, -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    92,
    'Cabo Hdmi Gold 5m Metros Mts 4k 3d Full Hd Blindado Tv Pc',
    'Produto novo: Comprimento 5 Metros \nCompatível Hdtv versão 1.0, 1.2, 1.3a, 1.3b cat2, Hight Speed 1.4 \nMulticondutor, termoplástico isolado e revestido. \nSuporta até 80°C e 30V para uso em instalações internas ou externas \nTotalmente Protegido contra EMI e RFV contra sobrecarga \nA embalagem contem: \n1 Cabo Hdmi 5 metros 3d',
    29.90,
    '2024-01-27 15:25:49',
    6, -- id da categoria 'cabos'
    29, -- id da marca 'Não especificado'
    2,  -- destaque 2 (destaque moderado)
    1,  -- id do vendedor
    true -- ativo
),
(
    93,
    'Cabo Extensor Usb 3.0 5gbps Para Pc Tv Note Ps3 Ps4 Qgeem',
    'Enorme expansão e rápida sincronização e carregamento de dados: O cabo extensor USB pode estender seu dispositivo USB 3.0 oferece velocidade de transmissão de dados SuperSpeed de até 5 Gbps, 10X mais rápido que o cabo USB 2.0, permite a transferência de vídeo HD ou arquivos enormes em apenas alguns segundos. Ele também estende seu cabo de carregamento USB, fornece função de carregamento rápido. \nDurabilidade e estabilidade: Cabo feito em PVC antiabrasivo, é flexível e resistente, pode suportar mais de 15.000 testes de curvatura, conectores banhados a ouro. O cabo interno é composto por condutores de cobre revestidos de estanho e resistentes à corrosão, blindagem que fornece proteção contra interferência de sinais externos, permitindo assim uma conexão e transmissão de sinal estável. \nCompatibilidade universal: o cabo de extensão QGeeM é compatível com todos os dispositivos USB A, plug and play, como Oculus VR, impressora, Playstation, Xbox, Hub, docking station, leitor de cartão, adaptador Bluetooth , Unidade flash USB, câmera, scanner, disco rígido, monitor, mouse, teclado, etc. \n-Marca: Qgeem \n-Tamanho 1 metro \n-Porta usb 3.0',
    29.00,
    '2024-01-27 15:26:47',
    6, -- id da categoria 'cabos'
    18, -- id da marca 'Qgeem'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    94,
    'Kit 10 Pç Cabo Rede / Patch Cord Cat5e 2,5m Amarelo Furukawa',
    'Características \nCertificação Anatel para componente, de acordo com os novos requisitos vigentes. \nPerformance garantida para até 4 conexões em canal de até 100 metros; \nExcede as características TIA/EIA 568 B.2 para CAT. 5e e ISO/IEC 11.801. \nPerformance de conector centralizada com as normas, garantindo a interoperabilidade e performance. \nContatos dos conectores com 50 micropolegadas de ouro; \nProduzido com Cabo Multi-Lan Extra-flexível U/UTP certificado pela Anatel; \nDisponível nas configurações 568/A, 568/B ou crossconect; \nPossui boot na mesma cor do cabo, injetado, no mesmo dimensional do plug RJ-45 para evitar fadiga no cabo em movimentos de conexão e que evitam a desconexão acidental da estação de trabalho. \nEmbalados Individualmente. \nMontado e testado 100% em fábrica.',
    335.00,
    '2024-01-27 15:28:06',
    6, -- id da categoria 'cabos'
    19, -- id da marca 'Furukawa'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    95,
    'Cabo De Dados Sata P/ Hd Gravador Drives Ssd Pc',
    '~~~~~~~~ Especificações do Produto ~~~~~~~~ \nCabo de Dados SATA 90°/180° \n- Tipo de conectores: 180°/180° C/Trava \n- Tamanho: 50cm \n- Transferência: 3 Gbps \n- Cor: Vermelho \n~~~~~~~~~~ Garantia do Produto ~~~~~~~~~~ \nProduto com garantia de 3 meses diretamente conosco',
    39.00,
    '2024-01-27 15:29:06',
    6, -- id da categoria 'cabos'
    20, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    96,
    'Cabo Firewire 900/600 De9 X 6 Pinos 1,50 Metros Macbook, Pc',
    'Marca: Ship G eletrônicos \nDescrição: Cabo USB padrão Firewire 9/6 vias \nCor: Preto \nMedida: 1.5M \nCom um conector de nove para seis pinos, o cabo FireWire ship g eletrônicos permite conectar um dispositivo FireWire 900 a um dispositivo FireWire 600. \nEle oferece todas as vantagens do FireWire, inclusive conexão simultânea de até 63 dispositivos, transferência de áudio e vídeo digital em tempo real, conexões de dispositivos ponto a ponto, instalação de dispositivos Plug-and-Play e capacidade de hot swap. \nDestaques \nFlexibilidade e durabilidade \nTransmissão de dados com velocidades de até 400 Mbit/s, sem erros \nReduz erros de transmissão e linha cruzada \nFácil instalação plug-and-play \nCompatibilidade retroativa com versões anteriores de dispositivos FireWire (IEEE 1394a) \nConteúdo da caixa \nCabo FireWire 900/600 de 9 pinos para 6 pinos. \nEspecificações \nConexões: Firewire de 6 pinos, Firewire de 9 pinos',
    39.00,
    '2024-01-27 15:30:41',
    6, -- id da categoria 'cabos'
    21, -- id da marca 'Ship G'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    97,
    'Cabo Conversor Adaptador Displayport Para Vga Pc Notebook',
    'Informações Técnicas: \n- Suporta VGA analógico resolução de até 1920x1080 (WUXGA), 60Hz \n- Integrated 10 bits, 162 MHz DAC para a saída de vídeo VGA claro \n- Plug and Play. Não requer instalação de software \n- ATI Eyefinity suporte multi-display \nInterfaces e Conexões: \n- 1x VGA(Fêmea) \n- 1x DisplayPort \n[+] ESPECIFICAÇÕES: \n- Cabo Conversor Adaptador \n- Display Port Para Vga \n[+] INCLUSO: \n- Cabo Conversor Adaptador Display Port x VGA Fêmea 15 pinos',
    20.72,
    '2024-01-27 15:32:42',
    6, -- id da categoria 'cabos'
    22, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    98,
    'Cabo De Áudio Auxiliar P2 X P2 Carro Som Fone Smartphone Pc',
    'DESCRIÇÃO DO PRODUTO \n-Cabo auxiliar de alta resistência \n-Ponta p2 x p2 \n-1 metro comprimento \n-Compatível com celulares, fones, som de carro e etc \n-Cabo não serve para microfones \nCabo De Áudio Auxiliar P2 x P2 3.5mm Anti Nó Resistente 1m INOVA \nIdeal para Ligar Aparelhos de Som Como iPad, iPod, iPhone, Mp4, Mp3, Celulares, Gps, Tablets, Som Residencial dentre muitos outros. \nEspecificação Técnica: \n- 2 Plug P2 reto; \n- Comprimento do Cabo: 1m; \n- Conectores Prateados; \n- Cabo Tipo Stereo; \n- Cor: Variado. \nItens Inclusos: \n01 - Cabo De Áudio Auxiliar P2 x P2 3.5mm',
    16.87,
    '2024-01-27 15:34:04',
    6, -- id da categoria 'cabos'
    23, -- id da marca 'INOVA'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    99,
    'Cabo De Rede 20 Metros Montado Rj45 Internet Lan Azul Pc Not',
    'Projetado para Ethernet HUB ou Internet Modem, Roteadores entre outros dispositivos.\nCOMPATIVEL COM TODAS ENTRADAS RJ45!! \nEspecificações: \nAplicação: Redes internas \nConector: RJ45 \nCor: Azul \nRevestimento: PVC \nTipo: LAN \nCat5 \nComprimento: 20 Metros',
    26.20,
    '2024-01-27 15:35:35',
    6, -- id da categoria 'cabos'
    24, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    100,
    'Cabo Adaptador Conversor Displayport Para Hdmi Pc Notebook',
    'Conversor Displayport(FCA-DP3) Para HDMI \nEspecificações: \n- Conversor Displayport para HDMI; \n- Resolução Maior Que Full HD (1920 x 1200 pixels); \n- Fácil utilização (Plug & Play); \n- Não há necessidade de fonte de energia externa; \n- Resolução suportada de até 1920x1200px, 60Hz; \n- Conexão: Entrada DISPLAYPORT(macho) e Saída HDMI(Fêmea).\n- Conectores com pinos banhados à ouro, o que proporciona melhor condutibilidade elétrica e consequentemente melhor qualidade no sinal. \nItens Inclusos: \n- 01 (Um) Conversor DISPLAYPORT para HDMI;',
    26.89,
    '2024-01-27 15:37:36',
    6, -- id da categoria 'cabos'
    25, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    101,
    'Cabo Adaptador Conversor Displayport Para Vga Vídeo Pc',
    'Conversor Displayport Para Vga. \nEspecificações: \n- Conversor Displayport para Vga; \n- Resolução Full HD (1920 x 1080 pixels) OBS: *Em cabos com comprimento superior a 3m poderá ocorrer uma perda na qualidade da transmissão.*;\n- Fácil utilização (Plug & Play); \n- Não há necessidade de fonte de energia externa; \n- Resolução suportada de até 1920x1080, 60Hz; \n- Integrated 10 bits, 162 MHz DAC para a saída de vídeo VGA claro \n- Conexão: Entrada DISPLAYPORT (macho) e Saída VGA (Fêmea). \nItens Inclusos: \n- 01 (Um) Conversor DISPLAYPORT para VGA;',
    23.48,
    '2024-01-27 15:39:48',
    6, -- id da categoria 'cabos'
    25, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    102,
    'Cabo De Força Tripolar 90º Graus 1.5mts Pc Fontes Monitores',
    'Cabo Força Tripolar 3x0,75mm 90 Graus 1.5 Metros \nDescrição do Produto: \nCabo de força para conexão de equipamentos na rede elétrica, ideal para ligar Pc e outros equipamentos como panela elétrica ou qualquer equipamento que o cabo seja tripolar. \nEspecificação Técnica: \n- Cabo de força tripolar 3P + T 90GRAUS \n- Corrente Máxima +-10A; \n- Tensão: até 250v; \n- Cabo Flexível tripolar # 0,75mm2 - NBR 13249; \n- Plugue fêmea tipo IEC ou macho tipo IEC; \n- 1,5 Metros; \n- Cabo de Força Tripolar 3x0,75mm 1,5mts; \nConteúdo da Embalagem: \n- 1 Cabo de Força Tripolar',
    17.98,
    '2024-01-27 15:41:34',
    6, -- id da categoria 'cabos'
    27, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    103,
    'Cabo Hdmi Gold 3m Metros Mts 4k 3d Full Hd Blindado Tv Pc',
    'Produto novo: Comprimento 3 Metros \nCompatível Hdtv versão 1.0, 1.2, 1.3a, 1.3b cat2, Hight Speed 1.4 \nMulticondutor, termoplástico isolado e revestido.\nSuporta até 80°C e 30V para uso em instalações internas ou externas \nTotalmente Protegido contra EMI e RFV contra sobrecarga \nA embalagem contem: \n1 Cabo Hdmi 3 metros 3d',
    24.90,
    '2024-01-27 15:43:09',
    6, -- id da categoria 'cabos'
    29, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    104,
    'Cabo De Força Tripolar Para Fonte Atx Pc 03 Pinos',
    'Cabo De Força Tripolar Para Fonte Atx PC 03 Pinos \nCabo De Força Cabo de energia com 03 pinos para fonte de notebook, netbook e eletrônicos, em geral, que utilizam o mesmo padrão. Ideal para fontes / Carregadores de notebooks ou equipamentos eletrônicos de mesmo padrão de encaixe. O cabo de força de 1,5 metros segue o novo padrão de descargas brasileiras, com plugue de 3 pinos. Possui proteção de plástico nos pinos para evitar choques acidentais. Produto nacional homologado ao novo padrão brasileiro de plugues e abertura. \nCaracterísticas: \n• Tipo: Cabo de Força \n• Plugue IEC Fêmea Tamanho: 1,5 metros \n• Tensão suportada: 110v / 220v \n• Corrente suportada: 10A \n• Cor: Preto \nConteúdo da Embalagem: \n1 — Cabo De Força Tripolar Para Fonte Atx PC 03 Pinos 1.5 metros',
    14.17,
    '2024-01-27 15:44:33',
    6, -- id da categoria 'cabos'
    28, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
),
(
    105,
    'Cabo De Força Energia Tripolar P/ Fonte Monitor Pc Padrão Br',
    'Informações do Produto: \nCabo de Força Tripolar Novo Padrão Brasileiro de 3 pinos \nTensão: 110 e 220 Volts (Inmetro até 250 Volts) \nCor: Preta \nBitola dos cabos internos: 3 x 0,75mm² \nComprimento: 1,5 Metros \nSegurança: Possui proteção de plástico nos pinos para evitar choques acidentais por contato. \nCompatibilidade com vários aparelhos de informática e eletrodomésticos: \n- Fontes de Alimentação (PCs Desktop) \n- Monitores \n- Impressoras \n- Alguns modelos de TVs \n- Panelas elétricas (arroz) \n- Eletrodomésticos',
    18.90,
    '2024-01-27 15:46:32',
    6, -- id da categoria 'cabos'
    30, -- id da marca 'Não especificado'
    NULL,  -- sem destaque
    1,  -- id do vendedor
    true -- ativo
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    106,
    'Mouse Logitech Silent Plus M330 preto',
    'A Logitech projeta produtos e experiências que ocupam um lugar cotidiano na vida das pessoas, com foco na inovação e na qualidade. Seu objetivo é criar momentos verdadeiramente únicos e significativos para os seus usuários. Os mouses da Logitech se adaptam à forma da sua mão para lhe proporcionar horas de conforto. Sem a necessidade de mover o braço para deslizar o cursor, sua mão ficará menos cansada. Eles são ideais para qualquer espaço de trabalho e para aqueles que têm a mesa cheia de vários objetos. \nAdaptado aos seus movimentos \nSeu design eficaz o torna num mouse confortável, com uma grande experiência de uso para aqueles que estão procurando segurança em cada clique. \nA funcionalidade ao alcance da sua mão \nO sistema de detecção de movimento óptico lhe permitirá mover o cursor de uma forma mais precisa e sensível do que os sistemas tradicionais. \nPlug And Play \nBasta colocar o receptor em uma porta USB do computador e você pode começar a usá-lo. Não é preciso emparelhar o mouse ou baixar um software para usá-lo. \nAdequado para fácil transporte \nNavegue rapidamente pelos documentos e sites da web graças ao seu design ultra-fino, ergonômico, leve e conveniente para transportar onde você quiser ou viajar.',
    48.99,
    '2024-01-27 15:52:45',
    7,
    4,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    107,
    'Microfone Blue Yeti X condensador multi-padrão cinza-escuro/prateado',
    'A comunicação clara e poderosa é importante para todas as organizações. Os microfones da Blue lhe permitem capturar e transmitir com uma incrível qualidade de som. A Blue combina áudio de qualidade profissional com simplicidade plug-and-play para oferecer um desempenho que está anos-luz dos microfones integrados para portáteis e câmeras. \nReflexão fiel da realidade \nIdeal para várias atividades. Ele vai oferecer um som de qualidade e você terá a clareza das vozes. \nUm formato que combina com você \nSendo condensador, vai permitir um resultado claro e fino. É ideal para percussões, guitarras, pianos, entre outros. Pela sua resposta tão definida à voz, é o mais escolhido pelos profissionais.',
    1.10,
    '2024-01-27 15:54:07',
    7,
    6,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    108,
    'Webcam Câmera Full Hd 1080x1920 Usb Computador Microfone',
    'Marca: Lorben \nCor: Preto \nInstalação: Plug and play sem drive \nFormato de foto: BMP \nTipo de sensor: CMOS \nControle de cintilação: 50Hz \nAlcance de foco: 20mm \nComprimento do cabo USB: aproximadamente 145cm \nResolução: Full HD 1920x1080 pixels 2MP \nTipo de interface: USB 2.0 \nMicrofone: embutido omnidirecional com redução de ruído \nSistemas compatíveis: Windows2000/WinXP/Vista/Win7/Win8/Win10/MacOS/Linux/Xbox One \nEtapas de instalação: \nMonte a webcam e aponte a câmera para seu rosto.\nPressione o suporte da webcam para baixo e encaixe a extremidade traseira do suporte na parte de trás da tela do monitor.\nConecte o cabo USB na interface USB do computador.',
    130.35,
    '2024-01-27 15:55:57',
    7,
    2,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    109,
    'Mini Teclado Usb Computador Notebook Pequeno Slim',
    'PRODUTO A PRONTA ENTREGA \nAMPLO ESTOQUE \nPOSTAMOS EM ATÉ 24 HORAS \nTECLADO MULTIMÍDIA \nTAMANHO: 30X15 \nCONEXÃO: USB \nCOM CEDILHA \nNÃO PRECISA INSTALAR, SÓ CONECTAR.',
    58.70,
    '2024-01-27 15:56:56',
    7,
    5,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    111,
    'Microsoft Modern Wireless Headset 8jr-00003',
    'Experimente a adrenalina de mergulhar na cena de outra maneira! Ter fones de ouvido específicos para jogos muda completamente sua experiência. Com os Microsoft 8JR-00003, você não perde nenhum detalhe e ouve o áudio como ele foi pensado pelos criadores.',
    728.00,
    '2024-01-27 15:57:42',
    7,
    7,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    112,
    'Acessórios De Computador Teclado Mouse Combo Confortável',
    'Combinação de teclado e mouse Ergonomia confortável Economia de energia 78 teclas Tecla redonda 4 botões de mouse Suprimentos de computador com fio \nCaracterística \n: Ergonomia confortável: O teclado e o mouse têm ergonomia, adequados para uso a longo prazo e não é fácil sentir fadiga após uso a longo prazo Economia de energia: O teclado e o mouse tem recursos de economia de energia, aparência elegante e fácil de transportar. Design de tecla redonda: o teclado e o mouse têm um design de tecla redonda, que é confortável e atende às suas necessidades diárias Caracteres à prova d\água: o teclado e o mouse têm tecnologia de impressão de tela UV, os caracteres são à prova d\água, vestem Interface USB resistente e durável: O teclado e o mouse são feitos de material ABS, a interface é USB, o número de teclas do teclado é 78 teclas e o número de botões do mouse é de 4 teclas \nEspecificação: \nTipo de item: Teclado Mouse \nMaterial combinado: ABS \nInterface: USB \nNúmero de teclas do teclado: 78 Teclas \nNúmero de botões do mouse: 4 botões \nModelos aplicáveis: \nLista geral de pacotes: \n1 x mouse \n1 x teclado',
    148.32,
    '2024-01-27 16:01:43',
    7,
    9,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    113,
    'Microfone Trust GXT 232 Mantis condensador omnidirecional preto',
    'Com o microfone da Trust você vai descobrir uma nova maneira de capturar e transmitir áudios. \nReflexão fiel da realidade \nIdeal para várias atividades. Ele vai oferecer um som de qualidade e você terá a clareza das vozes. \nUm formato que combina com você \nSendo condensador, vai permitir um resultado claro e fino. É ideal para percussões, guitarras, pianos, entre outros. Pela sua resposta tão definida à voz, é o mais escolhido pelos profissionais. \nDesign eficaz \nSeu padrão polar omnidirecional oferece uma resposta de sensibilidade constante graças ao seu ângulo de cobertura de 360°. Você vai poder perceber os sons em todas as direções!',
    124.90,
    '2024-01-27 16:02:53',
    7,
    10,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    114,
    'Mini Teclado Pequeno Slim Notebook Pc Computador Bluetooth',
    'pequeno, leve, resistente e ergonômico. Ideal para quem quer trabalhar com mais conforto, menos barulho de digitação, sem tirar nada do lugar. Digite seus textos com muito mais conforto. Teclado com alcance de até 5 metros. \nFunciona com todos os sistemas operacionais e em qualquer dispositivo que tenha comunicação bluetooth.\nTeclado com design Super Slim fino e discreto \nPossui botão de on/off \nFunciona com duas Pilhas AAA não inclusas \nEspecificação \nModelo: BK3001 \nAlcance: 5 Metros \nCom Design Super Slim Fino e Discreto \nPossui Botão de On/Off \nBluetooth 3.0',
    66.79,
    '2024-01-27 16:04:35',
    7,
    11,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    115,
    'Mouse Large Box Preto Usb 1200dpi Multilaser Mo308',
    'Com uma trajetória de mais de 30 anos no mercado brasileiro, a Multilaser é uma das maiores representantes do segmento de eletrônicos e informáticos. Os mouses da Multilaser têm uma capacidade de resposta rápida e podem ser transportados sem danificar a sua estrutura. Eles são caracterizados por uma textura macia, que favorece os movimentos tornando-os mais leves e proporcionando mais agilidade. \nAdaptado aos seus movimentos \nSeu design eficaz o torna num mouse confortável, com uma grande experiência de uso para aqueles que estão procurando segurança em cada clique. \nA funcionalidade ao alcance da sua mão \nO sistema de detecção de movimento óptico lhe permitirá mover o cursor de uma forma mais precisa e sensível do que os sistemas tradicionais. \nAdequado para fácil transporte \nNavegue rapidamente pelos documentos e sites da web graças ao seu design ultra-fino, ergonômico, leve e conveniente para transportar onde você quiser ou viajar.',
    21.00,
    '2024-01-27 16:05:30',
    7,
    12,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    116,
    'Extensão Hub Régua Usb 3.0 - 4 Portas Pc Hd Externo Pendrive',
    'O Hub USB 3.0 de 4 portas USB é um acessório útil para quem precisa utilizar várias portas USB ao mesmo tempo, expandindo as portas do seu notebook, ultrabook ou pc. \nEste dispositivo é capaz de fornecer 900mA de corrente elétrica (ao contrário da porta USB 2.0 comum, que só fornece 500mA), e dispensa fonte externa. \nPode ser usado em Windows, Mac e Linux, conta com portas USB de alta velocidade que atingem até 5Gbps e possui luz de LED indicadora. \nO dispositivo só terá seu desempenho máximo se conectado a uma porta USB 3.0 (identificada pela sua cor azul), ao conectar a uma porta usb 2.0 (preta), ele terá limitadas as velocidades de transferência e corrente elétrica disponível em cada porta. \nCom seu design compacto, você pode carregá-lo em bolsas e mochilas para onde quiser. \nEspecificações: \n• Interface de saída: 4 x USB 3.0 5.0Gb/s (Compatível com USB 2.0 e 1.1) \n• Quantidade de portas: 4 \n• Alimentação: DC 5V USB \n• Serve nos seguintes sistemas operacionais: Linux, Mac, Windows 98, 2000, ME, Windows NT, XP, Vista, 7, 8 e 10 \n• Taxa de transferência: 1.5Mbps / 12Mbps/ 480Mbps até 5Gbps \n• Comprimento do Cabo: 30 cm \n• Led Azul Indicador \n• Plug and play \n• Não necessita de instalação de software, basta conectar e usar.',
    28.85,
    '2024-01-27 16:06:47',
    7,
    13,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    117,
    'Teclado Maxprint Padrão QWERTY português Brasil cor preto',
    'Este teclado Maxprint é o melhor complemento para fazer todos os tipos de atividades. É confortável e prático ao escrever documentos, navegar e pesquisar na Internet, seja no seu trabalho ou no conforto de casa.',
    30.50,
    '2024-01-27 16:07:39',
    7,
    14,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    118,
    'Mini Mouse Usb Para Notebook E Acessórios Force Line',
    'Kit de Viagem para Notebook \nCaracterísticas Gerais \nMarca Force Line \nDescrição do Produto: Kit composto com diversas conexões; \nCabo com conector RJ45 com cabo retrátil; \nFacilidade para a locomoção do kit. \nComprimento do fio 65cm \nCor Preto \nDados Técnicos 1 Fone de ouvido com microfone embutido no cabo retrátil; \nMini mouse óptico USB com cabo retrátil; \nAdaptadores com cabo retrátil: \nUSB AM – USB AF (Extensão USB); \nCabo de rede RJ45; \nOutros adaptadores; \nFirewire; \nUSB AM – Mini 4 pinos; \nUSB AM – Mini 5 pinos (B mini)',
    21.00,
    '2024-01-27 16:09:10',
    7,
    15,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    119,
    'Kit Mini Teclado E Mouse 1600 Dpi Wireless Português Brasil',
    'O kit de teclado e mouse da Teclado é perfeito para ajudá-lo a realizar suas atividades diárias. Essa combinação é adaptada para fazer diferentes tarefas, sejam elas de trabalho, escola ou de qualquer tipo.',
    110.00,
    '2024-01-27 16:09:39',
    7,
    16,
    NULL,
    1,
    true
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    120,
    'Placa de vídeo Nvidia Pcyes GeForce 10 Series GTX 1050 Ti PA1050TI12804G5DF 4GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA Nvidia é o fabricante líder de placas de vídeo, sua qualidade garante uma experiência positiva no desenvolvimento do motor gráfico do seu computador. Além disso, seus processadores usam tecnologia de ponta para que você possa desfrutar de um produto rápido e durável. \nVelocidade em cada leitura \nAo contar com 768 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU. \nQualidade de imagem \nCritério fundamental na escolha uma placa de vídeo, a sua resolução de 7680x4320 não irá decepcioná-lo. A decodificação dos píxeis na sua tela fará com que você veja até os menores detalhes em cada ilustração.',
    1399.00,
    '2024-01-28 15:00:27',
    8,
    1,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    122,
    'Placa De Video Nvidia Gtx 1060 3gb 192bits Gddr5 Hdmi Gamer',
    'Marca: PCWINMAX \nNúcleo gráfico: \nFabricante de chips: NVIDIA \nChip gráfico: NVIDIA GTX 1060 3GB 192bits \nProcesso de produção: 16nm \nCódigo núcleo: gp104 \nFreqüência do núcleo: 1506mhz \nNúcleo de cuda: 1152 unificado \nEspecificação de memória: \nFrequência da memória: 8008mhz \nTipo de memória: GDDR5 \nCapacidade de memória: 3gb \nLargura de banda da memória: 192bits \nResolução máxima: 7680x4320',
    1319.00,
    '2024-01-28 15:02:49',
    8,
    1,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    124,
    'Placa De Video Gtx 550 Ti 1gb Ddr5 128bits 2018',
    'Especificações: \n- Chipset: Nvidia Geforce GTX 550 TI \n- Núcleos Cuda : 192 Cudas \n- Velocidade do núcleo Base: 700 MHz \n- Velocidade do núcleo Boost : 1500 MHz \n- Memória: 1024 MB \n- Tipo de memória: DDR5 \n- Clock de memória: 850 MHz \n- Interface de memória: 128 bits \n- Max. resolução (por display): \n- HDMI - 1920x1080 \n- VGA - 1920x1080 \n- DVI - 1920x1080 \n- Interface: PCI Express 2.0 \n- Saídas de vídeo: HDMI + VGA + DVI \n- OpenGL® 4.4\n- DirectX® 11',
    449.90,
    '2024-01-28 15:05:38',
    8,
    1,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    125,
    'Placa De Vídeo Radeon R7 240 2gb Ddr5 128 Bits Dx-12',
    'Especificações: \n- Chipset: AMD Radeon R7 240 \n- Velocidade do núcleo: 780 MHz \n- Memória: 2048 MB \n- Tipo de memória: DDR5 \n- Clock de memória: 1150 MHz \n- Interface de memória: 128 bits \n- Interface: PCI Express 3.0 \n- Saídas de vídeo: HDMI + DVI + VGA \n- Resolução Máx.: DVI: 2560 x 1600 | HDMI: 4096 x 2160 | VGA: 2048 x 1536 \n- Compatível com DirectX® 12 \n- OpenGL 4.5 support \n- AMD Eyefinity technology \n- AMD App Acceleration\n- AMD PowerTune technology',
    429.00,
    '2024-01-28 15:06:52',
    8,
    17,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    126,
    'Placa De Video Pcyes Geforce Nvidia G210 1gb Ddr3 - 64 Bits',
    'O processamento gráfico se tornou um ingrediente essencial para o PC moderno. Hoje em dia, nós simplesmente exigimos mais de nossos computadores. Se você quiser aprimorar fotos, editar vídeos, assistir a filmes, jogar ou simplesmente deseja uma experiência completa no Windows® 7, a placa gráfica NVIDIA® GeForce® G210 traz um incrível poder de processamento gráfico para seu PC a um preço inacreditável. \nVídeo Espetacular \nObtenha todo o poder de processamento de vídeo que seu estilo de vida digital exige. Melhore fotos, edite vídeos caseiros e publique-os no Facebook com velocidade 50% maior com a GeForce G210. Converta seu vídeo e coloque-o em seu iPod em poucos minutos, em vez de esperar horas3 ou fazer seus DVDs parecerem um HD. Seu computador tem uma CPU poderosa o bastante para reproduzir filmes Blu-Ray de alta definição? Não tem problema, a GeForce G210 pode reproduzir qualquer Filme Blu-Ray com qualquer CPU moderna. \nBelíssimos Gráficos \nOs jogos modernos e aplicativos em 3D estão exigindo mais performance gráfica do que nunca, e os gráficos integrados Intel definitivamente não são bons o bastante. Com 16 núcleos de processamento, a GeForce G210 tem uma performance1 10X maior que as soluções integradas da Intel! Se você quiser jogar World of Warcraft, Spore ou Sims3, a GeForce G210 é um recurso essencial ao seu computador.',
    229.00,
    '2024-01-28 15:08:13',
    8,
    81,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    127,
    'Placa De Video Power Color Radeon Rx550 2gb Ddr5 Directx 12',
    'Características: \nModelo: Radeon RX550 \nPN: AXRX 550 2GBD5-DHA/OC \nMarca: POWER COLOR \nInterface: \nTipo de barramento: Não informado \nPerfil do cartão: Não informado \nSolução Térmica: Não informado \nGPU: \nFabricante: AMD \nClock: 1190MHz em máximo desempenho \nProcessadores de fluxo: Não informado \nMemória: \nBus: 128 bits \nClock efetivo: 1500MHz x4 (6.0 Gbps) \nCapacidade: 2GB',
    629.00,
    '2024-01-28 15:09:33',
    8,
    17,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    128,
    'Placa De Vídeo Ati Radeon Hd 5450 1gb Ddr3 Hdmi Pcyes Low Nf',
    'Especificações Técnicas: \nGPU: HD 5450 \nCUDA Cores: 80 \nBase clock: 650Mhz \nBoost clock: 1066Mhz \nTipo de memória: GDDR3 \nMemória: 1GB \nClock da memória: 533Mhz \nInterface de memória: 64 bit \nSaídas de vídeo: VGA + HDMI + DVI \nPCI Express 2.0 \nOpen GL 4.5 \nFunciona em 2 monitores simultâneos. \nLargura 15 Cm \nAltura 20 Cm\nProfundidade 4 Cm',
    265.27,
    '2024-01-28 15:10:54',
    8,
    81,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    129,
    'Placa de vídeo Nvidia Galax GeForce 700 Series GT 710 71GGF4DC00WG 1GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA Nvidia é o fabricante líder de placas de vídeo, sua qualidade garante uma experiência positiva no desenvolvimento do motor gráfico do seu computador. Além disso, seus processadores usam tecnologia de ponta para que você possa desfrutar de um produto rápido e durável. \nVelocidade em cada leitura \nAo contar com 192 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU. \nQualidade de imagem \nCritério fundamental na escolha uma placa de vídeo, a sua resolução de 3840x2160 não irá decepcioná-lo. A decodificação dos píxeis na sua tela fará com que você veja até os menores detalhes em cada ilustração.',
    264.60,
    '2024-01-28 15:11:41',
    8,
    1,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    130,
    'Placa de vídeo AMD Pcyes Radeon RX 500 Series RX 550 PJRX550DR5128B 4GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA AMD é uma fabricante americana de placas de vídeo, devido à sua tecnologia tem se destacado na criação de processadores de alta qualidade que permitem um excelente desempenho do motor gráfico do seu computador. \nVelocidade em cada leitura \nAo contar com 512 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU.',
    762.00,
    '2024-01-28 15:12:18',
    8,
    17,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    131,
    'Placa de vídeo Nvidia Galax GeForce 700 Series GT 710 71GPF4HI00GX 2GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA Nvidia é o fabricante líder de placas de vídeo, sua qualidade garante uma experiência positiva no desenvolvimento do motor gráfico do seu computador. Além disso, seus processadores usam tecnologia de ponta para que você possa desfrutar de um produto rápido e durável. \nVelocidade em cada leitura \nAo contar com 192 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU. \nQualidade de imagem \nCritério fundamental na escolha uma placa de vídeo, a sua resolução de 3840x2160 não irá decepcioná-lo. A decodificação dos píxeis na sua tela fará com que você veja até os menores detalhes em cada ilustração.',
    309.90,
    '2024-01-28 15:13:18',
    8,
    1,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    132,
    'Placa de vídeo AMD Pcyes Single Fan Radeon HD 6000 Series HD 6570 PJHD6570GR54GSF Gaming Edition 4GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas.\nA AMD é uma fabricante americana de placas de vídeo, devido à sua tecnologia tem se destacado na criação de processadores de alta qualidade que permitem um excelente desempenho do motor gráfico do seu computador.',
    419.90,
    '2024-01-28 15:13:56',
    8,
    17,
    NULL,
    1,
    true
);

INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    133,
    'Placa de vídeo Nvidia Pcyes GeForce 200 Series G210 PA210G6401D3LP 1GB',
    'Esse componente eletrônico processa as informações que chegam ao dispositivo e as transforma em imagens ou vídeos para exibi-las visualmente. É ideal para trabalhar com aplicativos gráficos, pois permite obter imagens mais nítidas. \nA Nvidia é o fabricante líder de placas de vídeo, sua qualidade garante uma experiência positiva no desenvolvimento do motor gráfico do seu computador. Além disso, seus processadores usam tecnologia de ponta para que você possa desfrutar de um produto rápido e durável. \nVelocidade em cada leitura \nAo contar com 160 núcleos, os cálculos para o processamento gráfico serão realizados de maneira simultânea, conseguindo um ótimo resultado do trabalho da placa. Isso permitirá que faça leituras esparsas e rápidas de e para a GPU. \nQualidade de imagem \nCritério fundamental na escolha uma placa de vídeo, a sua resolução de 2560x1440 não irá decepcioná-lo. A decodificação dos píxeis na sua tela fará com que você veja até os menores detalhes em cada ilustração.',
    193.30,
    '2024-01-28 15:14:40',
    8,
    1,
    NULL,
    1,
    true
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    134,
    'Placa de vídeo Asus Radeon RX 6600 Dual-RX6600-O8G 8GB GDDR6',
    'A Asus Radeon RX 6600 é uma placa de vídeo potente projetada para jogos e aplicativos intensivos em gráficos. Equipada com 8GB de memória GDDR6 e tecnologia avançada de refrigeração, oferece desempenho estável e eficiente. Ideal para gamers e profissionais que exigem alta performance gráfica.',
    2599.00,
    '2024-01-28 15:15:19',
    8,
    2,
    NULL,
    1,
    true
);
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    135,
    'Placa de vídeo Zotac Gaming GeForce RTX 3060 Ti Twin Edge OC LHR 8GB GDDR6',
    'A Zotac Gaming GeForce RTX 3060 Ti oferece performance superior para jogos de última geração e aplicações de renderização. Com 8GB de memória GDDR6, suporta ray tracing em tempo real e oferece uma experiência imersiva de alta qualidade gráfica. Ideal para gamers e criadores de conteúdo.',
    3599.00,
    '2024-01-28 15:15:51',
    8,
    3,
    NULL,
    1,
    true
);

-- Produto 136
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    136,
    'Placa de vídeo Galax GeForce GTX 1650 Super EX 1-Click OC 4GB GDDR6',
    'A Galax GeForce GTX 1650 Super EX oferece uma solução eficiente para jogos de esports e aplicativos gráficos leves. Equipada com 4GB de memória GDDR6 e tecnologia de overclock 1-Click OC, proporciona desempenho estável e eficaz em um formato compacto.',
    1399.00,
    '2024-01-28 15:16:23',
    8,
    4,
    NULL,
    1,
    true
);

-- Produto 137
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    137,
    'Placa de vídeo Gigabyte GeForce GT 1030 Low Profile 2G GV-N1030D5-2GL 2GB GDDR5',
    'A Gigabyte GeForce GT 1030 Low Profile é ideal para sistemas compactos e PCs de baixo perfil. Com 2GB de memória GDDR5, oferece desempenho suficiente para multitarefas e aplicativos de produtividade, além de suporte a resoluções 4K. Perfeita para usuários que necessitam de uma solução gráfica simples e eficiente.',
    599.00,
    '2024-01-28 15:17:02',
    8,
    5,
    NULL,
    1,
    true
);

-- Produto 138
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    138,
    'Processador Intel Core I5 11400f Lga1200 - Bx8070811400f',
    'Características Processador i5 11400F Intel Cache 12MB 2.6 GHz (Turbo Max 4.4GHz) LGA1200\n- Marca: Intel \n- Modelo: BX8070811400F \nEspecificações Processador i5 11400 Cache 12MB 2.6 GHz \n- Intel Core i5-11400F \n- 11° Geração \n- Socket: 1200 \n- Frequência Base: 2.6 GHz \n- Frequência Max Turbo: Até 4.4 Ghz \n- Intel Smart Cache: 12MB \n- Núcleos: 6 \n- Threads: 12 \n- TDP: 65W \n- Litografia: 14 nm \n- Velocidade do barramento: 8 GT / s \n- TDP: 65 W',
    989.84,
    '2024-01-28 15:21:06',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 139
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    139,
    'Processador Intel Core i3-9100 BX80684I39100 de 4 núcleos e 4.2GHz de frequência com gráfica integrada',
    'Produtividade e entretenimento, tudo disponível no seu computador de mesa. A superioridade tecnológica da Intel é um benefício para todos os tipos de profissionais. Garante o melhor desempenho dos aplicativos, transferência de dados e conexão com outros elementos tecnológicos.\nNúcleos: o coração do processador \nNeste produto, você encontrará os núcleos, que são responsáveis por executar as instruções e atividades que você atribui ao seu dispositivo. Estes estão diretamente relacionados com dois elementos: os threads e o modelo. Portanto, na hora de escolher um processador, é importante que você valorize os três como um todo.',
    642.00,
    '2024-01-28 15:22:24',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 140
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    140,
    'Processador gamer Intel Core i7-870 BV80605001905AI de 4 núcleos e 3.6GHz de frequência',
    'Produtividade e entretenimento, tudo disponível no seu computador de mesa. A superioridade tecnológica da Intel é um benefício para todos os tipos de profissionais. Garante o melhor desempenho dos aplicativos, transferência de dados e conexão com outros elementos tecnológicos. \nNúcleos: o coração do processador \nNeste produto, você encontrará os núcleos, que são responsáveis por executar as instruções e atividades que você atribui ao seu dispositivo. Estes estão diretamente relacionados com dois elementos: os threads e o modelo. Portanto, na hora de escolher um processador, é importante que você valorize os três como um todo.',
    299.90,
    '2024-01-28 15:22:55',
    9,
    73,
    NULL,
    1,
    true
);
-- Produto 141
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    141,
    'Processador gamer Intel Core i5-4590 BX80646I54590 de 4 núcleos e 3.7GHz de frequência com gráfica integrada',
    'Produtividade e entretenimento, tudo disponível no seu computador de mesa. A superioridade tecnológica da Intel é um benefício para todos os tipos de profissionais. Garante o melhor desempenho dos aplicativos, transferência de dados e conexão com outros elementos tecnológicos. \nNúcleos: o coração do processador \nNeste produto, você encontrará os núcleos, que são responsáveis por executar as instruções e atividades que você atribui ao seu dispositivo. Estes estão diretamente relacionados com dois elementos: os threads e o modelo. Portanto, na hora de escolher um processador, é importante que você valorize os três como um todo.',
    220.00,
    '2024-01-28 15:23:18',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 142
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    142,
    'Processador Intel Pentium G5500t 3,20 Ghz 8° Ger Lga1151 Oem',
    'Especificações da CPU \nNúmero de núcleos: 2 \nN de threads: 4 \nFrequência baseada em processador: 3.20 GHz \nCache: 4 MB Intel Smart Cache \nVelocidade do barramento: 8 GT/s \nTDP: 35 W \nFrequência de TDP Configurável - baixo: 2.20 GHz \nTDP Configurável - baixo: 25 W \nEspecificações de memória \nTamanho máximo de memória (de acordo com o tipo de memória): 64 GB \nTipos de memória: DDR4-2400 \nN máximo de canais de memória: 2 \nLargura de banda máxima da memória: 37.5 GB/s \nCompatibilidade com memória ECC: Sim',
    299.00,
    '2024-01-28 15:24:36',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 143
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    143,
    'Processador gamer AMD Ryzen 5 5600G 100-100000252BOX de 6 núcleos e 4.4GHz de frequência com gráfica integrada',
    'Chave para o desempenho do seu computador de mesa, você não precisa mais pensar em como distribuir tempo e as ações pois agora as tarefas simultâneas são possíveis. \nA AMD tem um catálogo de produtos que atende aos requerimentos de qualquer tipo de usuários: jogos online, edição em grande escala, conteúdo multiplataforma e muito mais. \nNúcleos: o coração do processador \nNeste produto, você encontrará os núcleos, que são responsáveis por executar as instruções e atividades que você atribui ao seu dispositivo. Estes estão diretamente relacionados com dois elementos: os threads e o modelo. Portanto, na hora de escolher um processador, é importante que você valorize os três como um todo. \nMáxima potência \nQuando desbloqueado, você poderá fazer overclocking e assim aumentar a freqüência de funcionamento e otimizar o desempenho do seu dispositivo. Personalize ao seu gosto e curta seus videogames ou agilize a renderização de imagens. Descubra as variedades de posibilidades que este recurso oferece a você!',
    998.00,
    '2024-01-28 15:25:20',
    9,
    17,
    NULL,
    1,
    true
);

-- Produto 144
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    144,
    'Processador gamer Intel Core i3-4130 BX80646I34130 de 2 núcleos e 3.4GHz de frequência com gráfica integrada',
    'Produtividade e entretenimento, tudo disponível no seu computador de mesa. A superioridade tecnológica da Intel é um benefício para todos os tipos de profissionais. Garante o melhor desempenho dos aplicativos, transferência de dados e conexão com outros elementos tecnológicos. \nNúcleos: o coração do processador \nNeste produto, você encontrará os núcleos, que são responsáveis por executar as instruções e atividades que você atribui ao seu dispositivo. Estes estão diretamente relacionados com dois elementos: os threads e o modelo. Portanto, na hora de escolher um processador, é importante que você valorize os três como um todo.',
    130.00,
    '2024-01-28 15:26:17',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 145
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    145,
    'Processador Intel Core I3-7100 3.90 Ghz 7° Ger Lga1151 Oem',
    'Especificações da CPU \nNúmero de núcleos: 2 \nN de threads: 4 \nFrequência baseada em processador: 3.90 GHz \nCache: 3 MB Intel Smart Cache \nVelocidade do barramento: 8 GT/s \nTDP: 51 W \nEspecificações de memória \nTamanho máximo de memória (de acordo com o tipo de memória): 64 GB \nTipos de memória: DDR4-2400 / 2133, DDR3L-1600 / 1333 @ 1.35V \nN máximo de canais de memória: 2 \nLargura de banda máxima da memória: 34.1 GB/s \nCompatibilidade com memória ECC: Sim',
    435.00,
    '2024-01-28 15:27:12',
    9,
    73,
    NULL,
    1,
    true
);

-- Produto 146
INSERT INTO produto (id_produto, nome, descricao, preco, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor, ativo) 
VALUES 
(
    146,
    'Processador Intel Core i9-12900K 16C 24T 3.2GHz (5.2GHz Turbo) 30MB Cache LGA 1700, BX8071512900K',
    'A 12ª geração de processadores Intel Core apresenta uma inovação sem precedentes, com desempenho de núcleo duplo que redefine o que é possível em um PC de desktop. O processador Intel Core i9-12900K oferece até 5,2 GHz de turbo boost, suporte a memória DDR5 e tecnologia Intel Thread Director, para um desempenho otimizado em qualquer tarefa.',
    5249.00,
    '2024-01-28 15:28:05',
    9,
    73,
    NULL,
    1,
    true
);

-- inserindo imagens nos produtos
INSERT INTO imagem_produto (id_imagem, nome, produto_id_produto)
VALUES 
    (1, 'placa-de-video/39-img-1.jpg', 11),
    (2, 'placa-de-video/39-img-2.jpg', 11),
    (3, 'placa-de-video/39-img-3.jpg', 11),
    
    INSERT INTO imagem_produto (id_imagem, nome, produto_id_produto)
VALUES 
    (4, 'acessorios/49-img-1.jpg', 12),
    (5, 'gabinete/99-img-1.jpg',	13),
	(6, 'gabinete/99-img-2.jpg',	13),
	(7, 'gabinete/99-img-3.jpg',	13),
	(8, 'gabinete/99-img-4.jpg',	13),
	(9, 'fonte/107-img-1.jpg',	14),
	(10, 'fonte/107-img-2.jpg',	14),
	(11, 'fonte/107-img-3.jpg',	14),
	(12, 'memoria/115-img-1.jpg',15),
	(13, 'memoria/115-img-2.jpg',15),
	(14, 'memoria/115-img-3.jpg',15),
	(15, 'placa-mae/20-img-1.jpg',16),
	(16, 'placa-mae/20-img-2.jpg',16),
	(17, 'placa-mae/20-img-3.jpg',16),
	(18, 'placa-mae/14-img-1.jpg',17),
	(19, 'placa-mae/14-img-2.jpg',17),
	(20, 'placa-mae/14-img-3.jpg',17),
	(21, 'placa-mae/14-img-4.jpg',17),
	(22, 'placa-mae/14-img-1.jpg',18),
	(23, 'placa-mae/15-img-2.jpg',18),
	(24, 'placa-mae/15-img-3.jpg',18),
	(25, 'placa-mae/15-img-4.jpg',18),
	(26, 'placa-mae/19-img-1.jpg', 19),
    (27, 'placa-mae/19-img-2.jpg', 19),
    (28, 'placa-mae/19-img-3.jpg', 19),
    (29, 'placa-mae/19-img-4.jpg', 19),
     (30, 'placa-mae/26-img-1.jpg', 20),
    (31, 'placa-mae/26-img-2.jpg', 20),
    (32, 'placa-mae/26-img-3.jpg', 20),
    (33, 'placa-mae/32-img-1.jpg', 21),
    (34, 'placa-mae/32-img-2.jpg', 21),
    (35, 'placa-mae/32-img-3.jpg', 21),
    (36, 'placa-mae/32-img-4.jpg', 21),
    (37, 'placa-mae/22-img-1.jpg', 22),
    (38, 'placa-mae/22-img-2.jpg', 22),
    (39, 'placa-mae/22-img-3.jpg', 22),
    (40, 'placa-mae/126-img-1.jpg', 23),
    (41, 'placa-mae/126-img-2.jpg', 23),
    (42, 'placa-mae/126-img-3.jpg', 23),
    (43, 'placa-mae/127-img-1.jpg', 24),
    (44, 'placa-mae/127-img-2.jpg', 24),
    (45, 'placa-mae/127-img-3.jpg', 24),
    (46, 'placa-mae/127-img-4.jpg', 24),
    (47, 'placa-mae/128-img-1.jpg', 25),
    (48, 'placa-mae/128-img-2.jpg', 25),
    (49, 'placa-mae/128-img-3.jpg', 25),
    (50, 'placa-mae/128-img-4.jpg', 25),
    (51, 'placa-mae/129-img-1.jpg', 26),
    (52, 'placa-mae/129-img-2.jpg', 26),
    (53, 'placa-mae/129-img-3.jpg', 26),
    (54, 'placa-mae/129-img-4.jpg', 26),
    (55, 'placa-mae/131-img-1.jpg', 28),
    (56, 'placa-mae/131-img-2.jpg', 28),
    (57, 'placa-mae/131-img-3.jpg', 28),
    (58, 'placa-mae/131-img-4.jpg', 28),
    (59, 'placa-mae/132-img-1.jpg', 29),
    (60, 'placa-mae/132-img-2.jpg', 29),
    (61, 'placa-mae/133-img-1.jpg', 30),
    (62, 'placa-mae/133-img-2.jpg', 30),
    (63, 'placa-mae/133-img-3.jpg', 30),
    (64, 'placa-mae/133-img-4.jpg', 30),
    (65, 'memoria/18-img-1.jpg', 31),
    (66, 'memoria/18-img-2.jpg', 31),
    (67, 'memoria/23-img-1.jpg', 32),
    (68, 'memoria/23-img-2.jpg', 32),
    (69, 'memoria/23-img-3.jpg', 32),
    (70, 'memoria/114-img-1.jpg', 34),
    (71, 'memoria/114-img-2.jpg', 34),
    (72, 'memoria/116-img-1.jpg', 36),
    (73, 'memoria/116-img-2.jpg', 36),
    (74, 'memoria/116-img-3.jpg', 36),
    (75, 'memoria/116-img-4.jpg', 36),
    (76, 'memoria/117-img-1.jpg', 37),
    (77, 'memoria/117-img-2.jpg', 37),
    (78, 'memoria/117-img-3.jpg', 37),
    (79, 'memoria/118-img-1.jpg', 38),
    (80, 'memoria/118-img-2.jpg', 38),
    (81, 'memoria/118-img-3.jpg', 38),
    (82, 'memoria/118-img-4.jpg', 38),
    (83, 'memoria/120-img-1.jpg', 40),
    (84, 'memoria/120-img-2.jpg', 40),
    (85, 'memoria/120-img-3.jpg', 40),
    (86, 'memoria/121-img-1.jpg', 41),
    (87, 'memoria/122-img-1.jpg', 42),
    (88, 'memoria/124-img-1.jpg', 43),
    (89, 'memoria/124-img-2.jpg', 43),
    (90, 'memoria/125-img-1.jpg', 44),
    (91, 'memoria/125-img-2.jpg', 44),
    (92, 'memoria/125-img-3.jpg', 44),
    (93, 'fonte/100-img-1.jpg', 45),
    (94, 'fonte/100-img-2.jpg', 45),
    (95, 'fonte/100-img-3.jpg', 45),
    (96, 'fonte/101-img-1.jpg', 46),
    (97, 'fonte/101-img-2.jpg', 46),
    (98, 'fonte/102-img-1.jpg', 47),
    (99, 'fonte/102-img-2.jpg', 47),
    (100, 'fonte/102-img-3.jpg', 47),
    (101, 'fonte/103-img-1.jpg', 48),
    (102, 'fonte/103-img-2.jpg', 48),
    (103, 'fonte/103-img-3.jpg', 48),
    (104, 'fonte/104-img-1.jpg', 49),
    (105, 'fonte/104-img-2.jpg', 49),
    (106, 'fonte/104-img-3.jpg', 49),
    (107, 'fonte/104-img-4.jpg', 49),
    (108, 'fonte/105-img-1.jpg', 50),
    (109, 'fonte/106-img-1.jpg', 51),
    (110, 'fonte/106-img-2.jpg', 51),
    (111, 'fonte/106-img-3.jpg', 51),
    (112, 'fonte/106-img-4.jpg', 51),
    (113, 'fonte/108-img-1.jpg', 52),
    (114, 'fonte/108-img-2.jpg', 52),
    (115, 'fonte/108-img-3.jpg', 52),
    (116, 'fonte/108-img-4.jpg', 52),
    (117, 'fonte/109-img-1.jpg', 53),
    (118, 'fonte/109-img-2.jpg', 53),
    (119, 'fonte/109-img-3.jpg', 53),
    (120, 'fonte/109-img-4.jpg', 53),
    (121, 'fonte/110-img-1.jpg', 54),
    (122, 'fonte/110-img-2.jpg', 54),
    (123, 'fonte/110-img-3.jpg', 54),
    (124, 'fonte/111-img-1.jpg', 55),
    (125, 'fonte/111-img-2.jpg', 55),
    (126, 'fonte/111-img-3.jpg', 55),
    (127, 'fonte/112-img-1.jpg', 56),
    (128, 'fonte/112-img-2.jpg', 56),
    (129, 'fonte/112-img-3.jpg', 56),
    (130, 'fonte/112-img-4.jpg', 56),
    (131, 'fonte/113-img-1.jpg', 57),
    (132, 'fonte/113-img-2.jpg', 57),
    (133, 'cooler/134-img-1.jpg', 59),
    (134, 'cooler/134-img-2.jpg', 59),
    (135, 'cooler/134-img-3.jpg', 59),
    (136, 'cooler/134-img-4.jpg', 59),
    (137, 'cooler/135-img-1.jpg', 60),
    (138, 'cooler/135-img-2.jpg', 60),
    (139, 'cooler/135-img-3.jpg', 60),
     (140, 'cooler/136-img-1.jpg', 61),
    (141, 'cooler/136-img-2.jpg', 61),
    (142, 'cooler/137-img-1.jpg', 62),
    (143, 'cooler/137-img-2.jpg', 62),
    (144, 'cooler/137-img-3.jpg', 62),
    (145, 'cooler/137-img-4.jpg', 62),
    (146, 'cooler/138-img-1.jpg', 63),
    (147, 'cooler/138-img-2.jpg', 63),
    (148, 'cooler/138-img-3.jpg', 63),
    (149, 'cooler/138-img-4.jpg', 63),
    (150, 'cooler/139-img-1.jpg', 64),
    (151, 'cooler/139-img-2.jpg', 64),
    (152, 'cooler/139-img-3.jpg', 64),
    (153, 'cooler/140-img-1.jpg', 65),
    (154, 'cooler/140-img-2.jpg', 65),
    (155, 'cooler/140-img-3.jpg', 65),
    (156, 'cooler/140-img-4.jpg', 65),
    (157, 'cooler/141-img-1.jpg', 66),
    (158, 'cooler/141-img-2.jpg', 66),
    (159, 'cooler/141-img-3.jpg', 66),
    (160, 'cooler/141-img-4.jpg', 66),
    (161, 'cooler/142-img-1.jpg', 67),
    (162, 'cooler/142-img-2.jpg', 67),
    (163, 'cooler/142-img-3.jpg', 67),
    (164, 'cooler/142-img-4.jpg', 67),
    (165, 'cooler/143-img-1.jpg', 68),
    (166, 'cooler/143-img-2.jpg', 68),
    (167, 'cooler/143-img-3.jpg', 68),
    (177, 'cooler/145-img-1.jpg', 69),
    (178, 'cooler/145-img-2.jpg', 69),
    (179, 'cooler/145-img-3.jpg', 69),
    (180, 'cooler/145-img-4.jpg', 69),
    (168, 'cooler/144-img-1.jpg', 70),
    (169, 'cooler/144-img-2.jpg', 70),
    (170, 'cooler/144-img-3.jpg', 70),
    (171, 'cooler/144-img-4.jpg', 70),
    (172, 'cooler/146-img-1.jpg', 71),
    (173, 'cooler/147-img-1.jpg', 72),
    (174, 'cooler/147-img-2.jpg', 72),
    (175, 'cooler/147-img-3.jpg', 72),
    (176, 'cooler/147-img-4.jpg', 72),
 	(183, 'gabinete/86-img-1.jpg', 73),
    (184, 'gabinete/86-img-2.jpg', 73),
    (185, 'gabinete/86-img-3.jpg', 73),
    (186, 'gabinete/86-img-4.jpg', 73),
    (187, 'gabinete/87-img-1.jpg', 74),
    (188, 'gabinete/87-img-2.jpg', 74),
    (189, 'gabinete/87-img-3.jpg', 74),
    (190, 'gabinete/87-img-4.jpg', 74),
    (191, 'gabinete/88-img-1.jpg', 75),
    (192, 'gabinete/88-img-2.jpg', 75),
    (193, 'gabinete/88-img-3.jpg', 75),
    (194, 'gabinete/88-img-4.jpg', 75),
    (195, 'gabinete/89-img-1.jpg', 76),
    (196, 'gabinete/89-img-2.jpg', 76),
    (197, 'gabinete/89-img-3.jpg', 76),
    (198, 'gabinete/89-img-4.jpg', 76),
    (199, 'gabinete/90-img-1.jpg', 77),
    (200, 'gabinete/90-img-2.jpg', 77),
    (201, 'gabinete/90-img-3.jpg', 77),
    (202, 'gabinete/90-img-4.jpg', 77),
    (203, 'gabinete/91-img-1.jpg', 78),
    (204, 'gabinete/91-img-2.jpg', 78),
    (205, 'gabinete/91-img-3.jpg', 78),
    (206, 'gabinete/92-img-1.jpg', 79),
    (207, 'gabinete/92-img-2.jpg', 79),
    (208, 'gabinete/92-img-3.jpg', 79),
    (209, 'gabinete/92-img-4.jpg', 79),
    (210, 'gabinete/93-img-1.jpg', 80),
    (211, 'gabinete/93-img-2.jpg', 80),
    (212, 'gabinete/93-img-3.jpg', 80),
    (213, 'gabinete/93-img-4.jpg', 80),
    (214, 'gabinete/94-img-1.jpg', 81),
    (215, 'gabinete/94-img-2.jpg', 81),
    (216, 'gabinete/94-img-3.jpg', 81),
    (217, 'gabinete/94-img-4.jpg', 81),
    (218, 'gabinete/95-img-1.jpg', 82),
    (219, 'gabinete/95-img-2.jpg', 82),
    (220, 'gabinete/95-img-3.jpg', 82),
    (221, 'gabinete/95-img-4.jpg', 82),
    (222, 'gabinete/96-img-1.jpg', 83),
    (223, 'gabinete/96-img-2.jpg', 83),
    (224, 'gabinete/96-img-3.jpg', 83),
    (225, 'gabinete/84-img-1.jpg', 84),
    (226, 'gabinete/84-img-2.jpg', 84),
    (227, 'gabinete/84-img-3.jpg', 84),
    (228, 'gabinete/84-img-4.jpg', 84),
    (229, 'gabinete/98-img-1.jpg', 85),
    (230, 'gabinete/98-img-2.jpg', 85),
    (231, 'gabinete/98-img-3.jpg', 85),
    (232, 'gabinete/98-img-4.jpg', 85),
    (233, 'cabo/72-img-1.jpg', 93),
    (234, 'cabo/72-img-2.jpg', 93),
    (235, 'cabo/72-img-3.jpg', 93),
    (236, 'cabo/72-img-4.jpg', 93),
    (237, 'cabo/28-img-3.jpg', 92),
    (238, 'cabo/73-img-1.jpg', 94),
    (239, 'cabo/73-img-2.jpg', 94),
    (240, 'cabo/74-img-1.jpg', 95),
    (241, 'cabo/74-img-2.jpg', 95),
    (242, 'cabo/74-img-3.jpg', 95),
    (243, 'cabo/75-img-1.jpg', 96),
    (244, 'cabo/75-img-2.jpg', 96),
    (245, 'cabo/75-img-3.jpg', 96),
    (246, 'cabo/76-img-1.jpg', 97),
    (247, 'cabo/76-img-2.jpg', 97),
    (248, 'cabo/76-img-3.jpg', 97),
    (249, 'cabo/77-img-1.jpg', 98),
    (250, 'cabo/77-img-2.jpg', 98),
    (251, 'cabo/77-img-3.jpg', 98),
    (252, 'cabo/77-img-4.jpg', 98),
    (253, 'cabo/78-img-1.jpg', 99),
    (254, 'cabo/78-img-2.jpg', 99),
    (255, 'cabo/78-img-3.jpg', 99),
    (256, 'cabo/78-img-4.jpg', 99),
    (257, 'cabo/79-img-1.jpg', 100),
    (258, 'cabo/79-img-2.jpg', 100),
    (259, 'cabo/79-img-3.jpg', 100),
    (260, 'cabo/79-img-4.jpg', 100),
    (261, 'cabo/80-img-1.jpg', 101),
    (262, 'cabo/80-img-2.jpg', 101),
    (263, 'cabo/80-img-3.jpg', 101),
    (264, 'cabo/82-img-1.jpg', 102),
    (265, 'cabo/82-img-2.jpg', 102),
    (266, 'cabo/82-img-3.jpg', 102),
    (267, 'cabo/83-img-1.jpg', 103),
    (268, 'cabo/83-img-2.jpg', 103),
    (269, 'cabo/83-img-3.jpg', 103),
    (270, 'cabo/83-img-4.jpg', 103),
    (271, 'cabo/84-img-1.jpg', 104),
    (272, 'cabo/84-img-2.jpg', 104),
    (273, 'cabo/84-img-3.jpg', 104),
    (274, 'cabo/84-img-4.jpg', 104),
    (275, 'cabo/85-img-1.jpg', 105),
    (276, 'cabo/85-img-2.jpg', 105),
    (277, 'cabo/85-img-3.jpg', 105),
     (278, 'acessorios/13-img-1.jpg', 106),
    (279, 'acessorios/13-img-2.jpg', 106),
    (280, 'acessorios/24-img-1.jpg', 107),
    (281, 'acessorios/24-img-2.jpg', 107),
    (282, 'acessorios/24-img-3.jpg', 107),
    (283, 'acessorios/24-img-4.jpg', 107),
    (284, 'acessorios/48-img-1.jpg', 108),
    (285, 'acessorios/48-img-2.jpg', 108),
    (286, 'acessorios/48-img-3.jpg', 108),
    (287, 'acessorios/48-img-4.jpg', 108),
    (288, 'acessorios/50-img-1.jpg', 109),
    (289, 'acessorios/50-img-2.jpg', 109),
    (290, 'acessorios/50-img-3.jpg', 109),
    (291, 'acessorios/51-img-1.jpg', 111),
    (292, 'acessorios/52-img-1.jpg', 112),
    (293, 'acessorios/52-img-2.jpg', 112),
    (294, 'acessorios/52-img-3.jpg', 112),
    (295, 'acessorios/52-img-4.jpg', 112),
    (296, 'acessorios/53-img-1.jpg', 113),
    (297, 'acessorios/53-img-2.jpg', 113),
    (298, 'acessorios/54-img-1.jpg', 114),
    (299, 'acessorios/54-img-2.jpg', 114),
    (300, 'acessorios/54-img-3.jpg', 114),
    (301, 'acessorios/54-img-4.jpg', 114),
    (302, 'acessorios/55-img-1.jpg', 115),
    (303, 'acessorios/55-img-2.jpg', 115),
    (304, 'acessorios/56-img-1.jpg', 116),
    (305, 'acessorios/56-img-2.jpg', 116),
    (306, 'acessorios/56-img-3.jpg', 116),
    (307, 'acessorios/56-img-4.jpg', 116),
    (308, 'acessorios/57-img-1.jpg', 117),
    (309, 'acessorios/57-img-2.jpg', 117),
    (310, 'acessorios/58-img-1.jpg', 118),
    (311, 'acessorios/58-img-2.jpg', 118),
    (312, 'acessorios/58-img-3.jpg', 118),
    (313, 'acessorios/58-img-4.jpg', 118),
    (314, 'acessorios/59-img-1.jpg', 119),
    (335, 'placa-de-video/16-img-1.jpg', 120),
    (336, 'placa-de-video/16-img-2.jpg', 120),
    (337, 'placa-de-video/16-img-3.jpg', 120),
    (338, 'placa-de-video/21-img-1.jpg', 122),
    (339, 'placa-de-video/21-img-2.jpg', 122),
    (340, 'placa-de-video/21-img-3.jpg', 122),
    (341, 'placa-de-video/21-img-4.jpg', 122),
    (342, 'placa-de-video/37-img-1.jpg', 124),
    (343, 'placa-de-video/37-img-2.jpg', 124),
    (344, 'placa-de-video/37-img-3.jpg', 124),
    (345, 'placa-de-video/37-img-4.jpg', 124),
    (346, 'placa-de-video/38-img-1.jpg', 125),
    (347, 'placa-de-video/38-img-2.jpg', 125),
    (348, 'placa-de-video/38-img-3.jpg', 125),
    (349, 'placa-de-video/38-img-4.jpg', 125),
    (350, 'placa-de-video/40-img-1.jpg', 126),
    (351, 'placa-de-video/40-img-2.jpg', 126),
    (352, 'placa-de-video/40-img-3.jpg', 126),
    (353, 'placa-de-video/40-img-4.jpg', 126),
    (354, 'placa-de-video/41-img-1.jpg', 127),
    (355, 'placa-de-video/41-img-2.jpg', 127),
    (356, 'placa-de-video/41-img-3.jpg', 127),
    (357, 'placa-de-video/42-img-1.jpg', 128),
    (358, 'placa-de-video/42-img-2.jpg', 128),
    (359, 'placa-de-video/42-img-3.jpg', 128),
    (360, 'placa-de-video/42-img-4.jpg', 128),
    (361, 'placa-de-video/43-img-1.jpg', 129),
    (362, 'placa-de-video/43-img-2.jpg', 129),
    (363, 'placa-de-video/44-img-1.jpg', 130),
    (364, 'placa-de-video/44-img-2.jpg', 130),
    (365, 'placa-de-video/45-img-1.jpg', 131),
    (366, 'placa-de-video/46-img-1.jpg', 132),
    (367, 'placa-de-video/46-img-2.jpg', 132),
    (368, 'placa-de-video/46-img-3.jpg', 132),
    (369, 'placa-de-video/46-img-4.jpg', 132),
    (370, 'placa-de-video/47-img-1.jpg', 133),
    (371, 'placa-de-video/47-img-2.jpg', 133),
    (372, 'placa-de-video/47-img-3.jpg', 133),
    (373, 'placa-de-video/47-img-4.jpg', 133),
    (374, 'processador/25-img-1.jpg', 134),
    (375, 'processador/25-img-2.jpg', 134),
    (376, 'processador/60-img-1.jpg', 135),
    (377, 'processador/60-img-2.jpg', 135),
    (378, 'processador/61-img-1.jpg', 136),
    (379, 'processador/61-img-2.jpg', 136),
    (380, 'processador/62-img-1.jpg', 137),
    (381, 'processador/62-img-2.jpg', 137),
    (382, 'processador/62-img-3.jpg', 137),
    (383, 'processador/63-img-1.jpg', 138),
    (384, 'processador/63-img-2.jpg', 138),
    (385, 'processador/63-img-3.jpg', 138),
    (386, 'processador/64-img-1.jpg', 139),
    (387, 'processador/64-img-2.jpg', 139),
    (388, 'processador/64-img-3.jpg', 139),
    (389, 'processador/64-img-4.jpg', 139),
    (390, 'processador/65-img-1.jpg', 140),
    (391, 'processador/66-img-1.jpg', 141),
    (392, 'processador/66-img-2.jpg', 141),
    (393, 'processador/67-img-1.jpg', 142),
    (394, 'processador/68-img-1.jpg', 143),
    (395, 'processador/68-img-2.jpg', 143),
    (396, 'processador/68-img-3.jpg', 143),
    (397, 'processador/68-img-4.jpg', 143),
    (398, 'processador/69-img-1.jpg', 144),
    (399, 'processador/70-img-1.jpg', 145),
    (400, 'processador/71-img-1.jpg', 146),
    (401, 'processador/71-img-2.jpg', 146);
 
    
