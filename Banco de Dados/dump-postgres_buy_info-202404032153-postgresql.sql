
Exemplos comuns de e-commerce incluem Amazon, Mercado Livre e lojas de marcas espec�ficas que t�m suas pr�prias lojas online.

PGDMP      5                |            postgres_buy_info    16.2 (Debian 16.2-1.pgdg120+2)    16.2 (Postgres.app) ~    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16385    postgres_buy_info    DATABASE     |   CREATE DATABASE postgres_buy_info WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
 !   DROP DATABASE postgres_buy_info;
                fernando    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �           1247    16592    pedidostatus    TYPE     c   CREATE TYPE public.pedidostatus AS ENUM (
    'Em andamento',
    'Concluído',
    'Cancelado'
);
    DROP TYPE public.pedidostatus;
       public          fernando    false    4            �           1247    16801    status_pedido_enum    TYPE     �   CREATE TYPE public.status_pedido_enum AS ENUM (
    'entregue',
    'pendente de pagamento',
    'pendente de postagem',
    'em rota de entrega',
    'carrinho'
);
 %   DROP TYPE public.status_pedido_enum;
       public          fernando    false    4            �            1259    16474 	   categoria    TABLE     �   CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nome character varying(45) NOT NULL,
    ativo boolean NOT NULL,
    imagem character varying(255) NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    fernando    false    4            �            1259    16473    categoria_id_categoria_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categoria_id_categoria_seq;
       public          fernando    false    216    4            �           0    0    categoria_id_categoria_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categoria_id_categoria_seq OWNED BY public.categoria.id_categoria;
          public          fernando    false    215            �            1259    16481    cliente    TABLE     E  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nome character varying(255) NOT NULL,
    sobrenome character varying(255) NOT NULL,
    cpf character varying(14) NOT NULL,
    telefone character varying(45) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL
);
    DROP TABLE public.cliente;
       public         heap    fernando    false    4            �            1259    16480    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          fernando    false    218    4            �           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          fernando    false    217            �            1259    16583    cliente_id_seq    SEQUENCE     w   CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cliente_id_seq;
       public          fernando    false    4            �            1259    16509    destaque    TABLE     l   CREATE TABLE public.destaque (
    id_destaque integer NOT NULL,
    nome character varying(45) NOT NULL
);
    DROP TABLE public.destaque;
       public         heap    fernando    false    4            �            1259    16508    destaque_id_destaque_seq    SEQUENCE     �   CREATE SEQUENCE public.destaque_id_destaque_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.destaque_id_destaque_seq;
       public          fernando    false    4    224            �           0    0    destaque_id_destaque_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.destaque_id_destaque_seq OWNED BY public.destaque.id_destaque;
          public          fernando    false    223            �            1259    16516    endereco    TABLE     z  CREATE TABLE public.endereco (
    id_endereco integer NOT NULL,
    cep character varying(8) NOT NULL,
    cidade character varying(255) NOT NULL,
    estado character varying(2) NOT NULL,
    bairro character varying(255) NOT NULL,
    rua character varying(255) NOT NULL,
    numero integer NOT NULL,
    complemento character varying(45),
    id_cliente integer NOT NULL
);
    DROP TABLE public.endereco;
       public         heap    fernando    false    4            �            1259    16515    endereco_id_endereco_seq    SEQUENCE     �   CREATE SEQUENCE public.endereco_id_endereco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.endereco_id_endereco_seq;
       public          fernando    false    226    4            �           0    0    endereco_id_endereco_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.endereco_id_endereco_seq OWNED BY public.endereco.id_endereco;
          public          fernando    false    225            �            1259    16567    imagem_produto    TABLE     �   CREATE TABLE public.imagem_produto (
    id_imagem integer NOT NULL,
    nome character varying(255) NOT NULL,
    produto_id_produto integer NOT NULL
);
 "   DROP TABLE public.imagem_produto;
       public         heap    fernando    false    4            �            1259    16566    imagem_produto_id_imagem_seq    SEQUENCE     �   CREATE SEQUENCE public.imagem_produto_id_imagem_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.imagem_produto_id_imagem_seq;
       public          fernando    false    231    4            �           0    0    imagem_produto_id_imagem_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.imagem_produto_id_imagem_seq OWNED BY public.imagem_produto.id_imagem;
          public          fernando    false    230            �            1259    16553    item_pedido    TABLE     �   CREATE TABLE public.item_pedido (
    pedido_id_pedido integer NOT NULL,
    produto_id_produto integer NOT NULL,
    quantidade integer NOT NULL,
    preco_unitario numeric(10,2) NOT NULL,
    valor_total numeric(10,2) NOT NULL
);
    DROP TABLE public.item_pedido;
       public         heap    fernando    false    4            �            1259    16502    marca    TABLE     �   CREATE TABLE public.marca (
    id_marca integer NOT NULL,
    nome character varying(45) NOT NULL,
    ativo boolean NOT NULL
);
    DROP TABLE public.marca;
       public         heap    fernando    false    4            �            1259    16501    marca_id_marca_seq    SEQUENCE     �   CREATE SEQUENCE public.marca_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.marca_id_marca_seq;
       public          fernando    false    4    222            �           0    0    marca_id_marca_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.marca_id_marca_seq OWNED BY public.marca.id_marca;
          public          fernando    false    221            �            1259    16490    pedido    TABLE     w   CREATE TABLE public.pedido (
    idpedido integer NOT NULL,
    idproduto integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.pedido;
       public         heap    fernando    false    4            �            1259    16489    pedido_id_pedido_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_id_pedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.pedido_id_pedido_seq;
       public          fernando    false    220    4            �           0    0    pedido_id_pedido_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.pedido_id_pedido_seq OWNED BY public.pedido.idpedido;
          public          fernando    false    219            �            1259    16794    pedido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.pedido_id_seq;
       public          fernando    false    4    220            �           0    0    pedido_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;
          public          fernando    false    238            �            1259    16651    pedido_idproduto_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_idproduto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.pedido_idproduto_seq;
       public          fernando    false    4    220            �           0    0    pedido_idproduto_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.pedido_idproduto_seq OWNED BY public.pedido.idproduto;
          public          fernando    false    233            �            1259    16530    produto    TABLE     �  CREATE TABLE public.produto (
    id_produto integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao character varying(5000),
    preco numeric(10,2) NOT NULL,
    ativo boolean NOT NULL,
    data_criacao timestamp without time zone,
    categoria_id_categoria integer NOT NULL,
    marca_id_marca integer NOT NULL,
    destaque_id_destaque integer,
    id_vendedor integer NOT NULL
);
    DROP TABLE public.produto;
       public         heap    fernando    false    4            �            1259    16529    produto_id_produto_seq    SEQUENCE     �   CREATE SEQUENCE public.produto_id_produto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.produto_id_produto_seq;
       public          fernando    false    228    4            �           0    0    produto_id_produto_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.produto_id_produto_seq OWNED BY public.produto.id_produto;
          public          fernando    false    227            �            1259    16713    produto_id_vendedor_seq    SEQUENCE     �   CREATE SEQUENCE public.produto_id_vendedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.produto_id_vendedor_seq;
       public          fernando    false    4    228            �           0    0    produto_id_vendedor_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.produto_id_vendedor_seq OWNED BY public.produto.id_vendedor;
          public          fernando    false    237            �            1259    16816    status_pedido    TABLE     �   CREATE TABLE public.status_pedido (
    id integer NOT NULL,
    idpedido integer NOT NULL,
    id_vendedor integer NOT NULL,
    id_cliente integer NOT NULL,
    id_endereco integer NOT NULL,
    status public.status_pedido_enum
);
 !   DROP TABLE public.status_pedido;
       public         heap    fernando    false    4    902            �            1259    16814    status_pedido_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.status_pedido_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.status_pedido_id_cliente_seq;
       public          fernando    false    4    244            �           0    0    status_pedido_id_cliente_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.status_pedido_id_cliente_seq OWNED BY public.status_pedido.id_cliente;
          public          fernando    false    242            �            1259    16815    status_pedido_id_endereco_seq    SEQUENCE     �   CREATE SEQUENCE public.status_pedido_id_endereco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.status_pedido_id_endereco_seq;
       public          fernando    false    244    4            �           0    0    status_pedido_id_endereco_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.status_pedido_id_endereco_seq OWNED BY public.status_pedido.id_endereco;
          public          fernando    false    243            �            1259    16811    status_pedido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.status_pedido_id_seq;
       public          fernando    false    244    4            �           0    0    status_pedido_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.status_pedido_id_seq OWNED BY public.status_pedido.id;
          public          fernando    false    239            �            1259    16813    status_pedido_id_vendedor_seq    SEQUENCE     �   CREATE SEQUENCE public.status_pedido_id_vendedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.status_pedido_id_vendedor_seq;
       public          fernando    false    244    4            �           0    0    status_pedido_id_vendedor_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.status_pedido_id_vendedor_seq OWNED BY public.status_pedido.id_vendedor;
          public          fernando    false    241            �            1259    16812    status_pedido_idpedido_seq    SEQUENCE     �   CREATE SEQUENCE public.status_pedido_idpedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.status_pedido_idpedido_seq;
       public          fernando    false    244    4            �           0    0    status_pedido_idpedido_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.status_pedido_idpedido_seq OWNED BY public.status_pedido.idpedido;
          public          fernando    false    240            �            1259    16701    vendedor    TABLE     �   CREATE TABLE public.vendedor (
    id_vendedor integer NOT NULL,
    nome character varying(255),
    cnpj_cpf character varying(45),
    telefone character varying(45),
    email character varying(45),
    id_endereco integer NOT NULL
);
    DROP TABLE public.vendedor;
       public         heap    fernando    false    4            �            1259    16700    vendedor_id_endereco_seq    SEQUENCE     �   CREATE SEQUENCE public.vendedor_id_endereco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendedor_id_endereco_seq;
       public          fernando    false    236    4            �           0    0    vendedor_id_endereco_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendedor_id_endereco_seq OWNED BY public.vendedor.id_endereco;
          public          fernando    false    235            �            1259    16699    vendedor_id_vendedor_seq    SEQUENCE     �   CREATE SEQUENCE public.vendedor_id_vendedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendedor_id_vendedor_seq;
       public          fernando    false    236    4            �           0    0    vendedor_id_vendedor_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendedor_id_vendedor_seq OWNED BY public.vendedor.id_vendedor;
          public          fernando    false    234            �           2604    16477    categoria id_categoria    DEFAULT     �   ALTER TABLE ONLY public.categoria ALTER COLUMN id_categoria SET DEFAULT nextval('public.categoria_id_categoria_seq'::regclass);
 E   ALTER TABLE public.categoria ALTER COLUMN id_categoria DROP DEFAULT;
       public          fernando    false    216    215    216            �           2604    16484    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          fernando    false    217    218    218            �           2604    16512    destaque id_destaque    DEFAULT     |   ALTER TABLE ONLY public.destaque ALTER COLUMN id_destaque SET DEFAULT nextval('public.destaque_id_destaque_seq'::regclass);
 C   ALTER TABLE public.destaque ALTER COLUMN id_destaque DROP DEFAULT;
       public          fernando    false    224    223    224            �           2604    16519    endereco id_endereco    DEFAULT     |   ALTER TABLE ONLY public.endereco ALTER COLUMN id_endereco SET DEFAULT nextval('public.endereco_id_endereco_seq'::regclass);
 C   ALTER TABLE public.endereco ALTER COLUMN id_endereco DROP DEFAULT;
       public          fernando    false    226    225    226            �           2604    16570    imagem_produto id_imagem    DEFAULT     �   ALTER TABLE ONLY public.imagem_produto ALTER COLUMN id_imagem SET DEFAULT nextval('public.imagem_produto_id_imagem_seq'::regclass);
 G   ALTER TABLE public.imagem_produto ALTER COLUMN id_imagem DROP DEFAULT;
       public          fernando    false    230    231    231            �           2604    16505    marca id_marca    DEFAULT     p   ALTER TABLE ONLY public.marca ALTER COLUMN id_marca SET DEFAULT nextval('public.marca_id_marca_seq'::regclass);
 =   ALTER TABLE public.marca ALTER COLUMN id_marca DROP DEFAULT;
       public          fernando    false    221    222    222            �           2604    16493    pedido idpedido    DEFAULT     s   ALTER TABLE ONLY public.pedido ALTER COLUMN idpedido SET DEFAULT nextval('public.pedido_id_pedido_seq'::regclass);
 >   ALTER TABLE public.pedido ALTER COLUMN idpedido DROP DEFAULT;
       public          fernando    false    220    219    220            �           2604    16652    pedido idproduto    DEFAULT     t   ALTER TABLE ONLY public.pedido ALTER COLUMN idproduto SET DEFAULT nextval('public.pedido_idproduto_seq'::regclass);
 ?   ALTER TABLE public.pedido ALTER COLUMN idproduto DROP DEFAULT;
       public          fernando    false    233    220            �           2604    16795 	   pedido id    DEFAULT     f   ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);
 8   ALTER TABLE public.pedido ALTER COLUMN id DROP DEFAULT;
       public          fernando    false    238    220            �           2604    16533    produto id_produto    DEFAULT     x   ALTER TABLE ONLY public.produto ALTER COLUMN id_produto SET DEFAULT nextval('public.produto_id_produto_seq'::regclass);
 A   ALTER TABLE public.produto ALTER COLUMN id_produto DROP DEFAULT;
       public          fernando    false    227    228    228            �           2604    16714    produto id_vendedor    DEFAULT     z   ALTER TABLE ONLY public.produto ALTER COLUMN id_vendedor SET DEFAULT nextval('public.produto_id_vendedor_seq'::regclass);
 B   ALTER TABLE public.produto ALTER COLUMN id_vendedor DROP DEFAULT;
       public          fernando    false    237    228            �           2604    16819    status_pedido id    DEFAULT     t   ALTER TABLE ONLY public.status_pedido ALTER COLUMN id SET DEFAULT nextval('public.status_pedido_id_seq'::regclass);
 ?   ALTER TABLE public.status_pedido ALTER COLUMN id DROP DEFAULT;
       public          fernando    false    244    239    244            �           2604    16820    status_pedido idpedido    DEFAULT     �   ALTER TABLE ONLY public.status_pedido ALTER COLUMN idpedido SET DEFAULT nextval('public.status_pedido_idpedido_seq'::regclass);
 E   ALTER TABLE public.status_pedido ALTER COLUMN idpedido DROP DEFAULT;
       public          fernando    false    240    244    244            �           2604    16821    status_pedido id_vendedor    DEFAULT     �   ALTER TABLE ONLY public.status_pedido ALTER COLUMN id_vendedor SET DEFAULT nextval('public.status_pedido_id_vendedor_seq'::regclass);
 H   ALTER TABLE public.status_pedido ALTER COLUMN id_vendedor DROP DEFAULT;
       public          fernando    false    244    241    244            �           2604    16822    status_pedido id_cliente    DEFAULT     �   ALTER TABLE ONLY public.status_pedido ALTER COLUMN id_cliente SET DEFAULT nextval('public.status_pedido_id_cliente_seq'::regclass);
 G   ALTER TABLE public.status_pedido ALTER COLUMN id_cliente DROP DEFAULT;
       public          fernando    false    242    244    244            �           2604    16823    status_pedido id_endereco    DEFAULT     �   ALTER TABLE ONLY public.status_pedido ALTER COLUMN id_endereco SET DEFAULT nextval('public.status_pedido_id_endereco_seq'::regclass);
 H   ALTER TABLE public.status_pedido ALTER COLUMN id_endereco DROP DEFAULT;
       public          fernando    false    244    243    244            �           2604    16704    vendedor id_vendedor    DEFAULT     |   ALTER TABLE ONLY public.vendedor ALTER COLUMN id_vendedor SET DEFAULT nextval('public.vendedor_id_vendedor_seq'::regclass);
 C   ALTER TABLE public.vendedor ALTER COLUMN id_vendedor DROP DEFAULT;
       public          fernando    false    234    236    236            �           2604    16705    vendedor id_endereco    DEFAULT     |   ALTER TABLE ONLY public.vendedor ALTER COLUMN id_endereco SET DEFAULT nextval('public.vendedor_id_endereco_seq'::regclass);
 C   ALTER TABLE public.vendedor ALTER COLUMN id_endereco DROP DEFAULT;
       public          fernando    false    235    236    236            �          0    16474 	   categoria 
   TABLE DATA                 public          fernando    false    216   ~�       �          0    16481    cliente 
   TABLE DATA                 public          fernando    false    218   ��       �          0    16509    destaque 
   TABLE DATA                 public          fernando    false    224   p�       �          0    16516    endereco 
   TABLE DATA                 public          fernando    false    226   �       �          0    16567    imagem_produto 
   TABLE DATA                 public          fernando    false    231   ��       �          0    16553    item_pedido 
   TABLE DATA                 public          fernando    false    229   J�       �          0    16502    marca 
   TABLE DATA                 public          fernando    false    222   d�       �          0    16490    pedido 
   TABLE DATA                 public          fernando    false    220   ��       �          0    16530    produto 
   TABLE DATA                 public          fernando    false    228   ͥ       �          0    16816    status_pedido 
   TABLE DATA                 public          fernando    false    244         �          0    16701    vendedor 
   TABLE DATA                 public          fernando    false    236   +      �           0    0    categoria_id_categoria_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.categoria_id_categoria_seq', 9, true);
          public          fernando    false    215            �           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 26, true);
          public          fernando    false    217            �           0    0    cliente_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cliente_id_seq', 20, true);
          public          fernando    false    232            �           0    0    destaque_id_destaque_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.destaque_id_destaque_seq', 1, false);
          public          fernando    false    223            �           0    0    endereco_id_endereco_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.endereco_id_endereco_seq', 9, true);
          public          fernando    false    225            �           0    0    imagem_produto_id_imagem_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.imagem_produto_id_imagem_seq', 1, false);
          public          fernando    false    230            �           0    0    marca_id_marca_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.marca_id_marca_seq', 1, false);
          public          fernando    false    221            �           0    0    pedido_id_pedido_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pedido_id_pedido_seq', 1, false);
          public          fernando    false    219            �           0    0    pedido_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pedido_id_seq', 1, false);
          public          fernando    false    238            �           0    0    pedido_idproduto_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pedido_idproduto_seq', 1, false);
          public          fernando    false    233            �           0    0    produto_id_produto_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.produto_id_produto_seq', 1, true);
          public          fernando    false    227            �           0    0    produto_id_vendedor_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.produto_id_vendedor_seq', 131, true);
          public          fernando    false    237            �           0    0    status_pedido_id_cliente_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.status_pedido_id_cliente_seq', 1, false);
          public          fernando    false    242            �           0    0    status_pedido_id_endereco_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.status_pedido_id_endereco_seq', 1, false);
          public          fernando    false    243            �           0    0    status_pedido_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.status_pedido_id_seq', 1, false);
          public          fernando    false    239            �           0    0    status_pedido_id_vendedor_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.status_pedido_id_vendedor_seq', 1, false);
          public          fernando    false    241            �           0    0    status_pedido_idpedido_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.status_pedido_idpedido_seq', 1, false);
          public          fernando    false    240            �           0    0    vendedor_id_endereco_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendedor_id_endereco_seq', 1, false);
          public          fernando    false    235            �           0    0    vendedor_id_vendedor_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendedor_id_vendedor_seq', 1, false);
          public          fernando    false    234            �           2606    16479    categoria categoria_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            fernando    false    216            �           2606    16488    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            fernando    false    218            �           2606    16514    destaque destaque_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.destaque
    ADD CONSTRAINT destaque_pkey PRIMARY KEY (id_destaque);
 @   ALTER TABLE ONLY public.destaque DROP CONSTRAINT destaque_pkey;
       public            fernando    false    224            �           2606    16523    endereco endereco_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id_endereco);
 @   ALTER TABLE ONLY public.endereco DROP CONSTRAINT endereco_pkey;
       public            fernando    false    226            �           2606    16572 "   imagem_produto imagem_produto_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.imagem_produto
    ADD CONSTRAINT imagem_produto_pkey PRIMARY KEY (id_imagem);
 L   ALTER TABLE ONLY public.imagem_produto DROP CONSTRAINT imagem_produto_pkey;
       public            fernando    false    231            �           2606    16507    marca marca_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id_marca);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            fernando    false    222            �           2606    16495    pedido pedido_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (idpedido);
 <   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_pkey;
       public            fernando    false    220            �           2606    16537    produto produto_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pkey PRIMARY KEY (id_produto);
 >   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_pkey;
       public            fernando    false    228            �           2606    16825     status_pedido status_pedido_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.status_pedido
    ADD CONSTRAINT status_pedido_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.status_pedido DROP CONSTRAINT status_pedido_pkey;
       public            fernando    false    244            �           2606    16707    vendedor vendedor_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_pkey PRIMARY KEY (id_vendedor);
 @   ALTER TABLE ONLY public.vendedor DROP CONSTRAINT vendedor_pkey;
       public            fernando    false    236            �           2606    16524    endereco fk_cliente    FK CONSTRAINT        ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 =   ALTER TABLE ONLY public.endereco DROP CONSTRAINT fk_cliente;
       public          fernando    false    218    3288    226            �           2606    16573 5   imagem_produto imagem_produto_produto_id_produto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagem_produto
    ADD CONSTRAINT imagem_produto_produto_id_produto_fkey FOREIGN KEY (produto_id_produto) REFERENCES public.produto(id_produto) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.imagem_produto DROP CONSTRAINT imagem_produto_produto_id_produto_fkey;
       public          fernando    false    228    231    3298            �           2606    16556 -   item_pedido item_pedido_pedido_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_pedido
    ADD CONSTRAINT item_pedido_pedido_id_pedido_fkey FOREIGN KEY (pedido_id_pedido) REFERENCES public.pedido(idpedido);
 W   ALTER TABLE ONLY public.item_pedido DROP CONSTRAINT item_pedido_pedido_id_pedido_fkey;
       public          fernando    false    3290    220    229            �           2606    16561 /   item_pedido item_pedido_produto_id_produto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_pedido
    ADD CONSTRAINT item_pedido_produto_id_produto_fkey FOREIGN KEY (produto_id_produto) REFERENCES public.produto(id_produto);
 Y   ALTER TABLE ONLY public.item_pedido DROP CONSTRAINT item_pedido_produto_id_produto_fkey;
       public          fernando    false    3298    228    229            �           2606    16538 +   produto produto_categoria_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_categoria_id_categoria_fkey FOREIGN KEY (categoria_id_categoria) REFERENCES public.categoria(id_categoria);
 U   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_categoria_id_categoria_fkey;
       public          fernando    false    3286    216    228            �           2606    16548 )   produto produto_destaque_id_destaque_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_destaque_id_destaque_fkey FOREIGN KEY (destaque_id_destaque) REFERENCES public.destaque(id_destaque);
 S   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_destaque_id_destaque_fkey;
       public          fernando    false    3294    228    224            �           2606    16543 #   produto produto_marca_id_marca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_marca_id_marca_fkey FOREIGN KEY (marca_id_marca) REFERENCES public.marca(id_marca);
 M   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_marca_id_marca_fkey;
       public          fernando    false    228    3292    222            �           2606    16836 +   status_pedido status_pedido_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.status_pedido
    ADD CONSTRAINT status_pedido_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 U   ALTER TABLE ONLY public.status_pedido DROP CONSTRAINT status_pedido_id_cliente_fkey;
       public          fernando    false    244    218    3288            �           2606    16841 ,   status_pedido status_pedido_id_endereco_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.status_pedido
    ADD CONSTRAINT status_pedido_id_endereco_fkey FOREIGN KEY (id_endereco) REFERENCES public.endereco(id_endereco);
 V   ALTER TABLE ONLY public.status_pedido DROP CONSTRAINT status_pedido_id_endereco_fkey;
       public          fernando    false    244    3296    226            �           2606    16831 ,   status_pedido status_pedido_id_vendedor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.status_pedido
    ADD CONSTRAINT status_pedido_id_vendedor_fkey FOREIGN KEY (id_vendedor) REFERENCES public.vendedor(id_vendedor);
 V   ALTER TABLE ONLY public.status_pedido DROP CONSTRAINT status_pedido_id_vendedor_fkey;
       public          fernando    false    3302    244    236            �           2606    16826 )   status_pedido status_pedido_idpedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.status_pedido
    ADD CONSTRAINT status_pedido_idpedido_fkey FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido);
 S   ALTER TABLE ONLY public.status_pedido DROP CONSTRAINT status_pedido_idpedido_fkey;
       public          fernando    false    220    3290    244            �           2606    16708 "   vendedor vendedor_id_endereco_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendedor
    ADD CONSTRAINT vendedor_id_endereco_fkey FOREIGN KEY (id_endereco) REFERENCES public.endereco(id_endereco);
 L   ALTER TABLE ONLY public.vendedor DROP CONSTRAINT vendedor_id_endereco_fkey;
       public          fernando    false    236    3296    226            �   �   x����N�0��}��
Ҵj�G;Mh�Jl 6vEn�U���jZ^�3'�/�h��)����}�]�7˧�*���Uc�TC�5u�nq��ܨ��D�hP�����VX5�PZ�Vd/p��:?�g�N�B7~p1�w��M��2�|�E��A7DvQ����$�9��H]����*
�ܬH�^2g�1Y#E� 2�Q�X�whP��w�q��c|��K���$$�����������?$�      �   �  x�͗]o�0���ܱ%������h�h��L���B�.��G�#�����j!ާ��/e�0?͵���Q{O_�!/�L$L{�=�g�����*�H��W���F�a�0��h �W,�u]ܷp����jcZ����ȋB��~yݛ�G �v���*��R�
E�℩��<�Ajg�C�,5z���ێ�[u�vΪo��oV	�������:�w�ׯ���5 >���u
HY�DP��
��s���e�\���,�o�5=?�櫌�������J�Q�|V6di�|�2(FO���=;�x�:<�f�E���z(U�y�+NYV�q$d�$��O-���2��S�)��8*���{T�t�t �� {��T�0�ٔ�	&|7�
�-L�������4ei�D���6��E*<	�G髷�G.�RQL���	%K��G�����Nz��g!W�q@�gE���t$�͑7[��(���      �   g   x���v
Q���W((M��L�KI-.I,,MUs�	uV�0�QP�M�,V(H-.,�,NL�/V״��$B�PohNIfn~�Bb^i^r&�z�a����dB-�� �8A      �   �   x���A�0໿b7"Ԝ)�B=a��}͏�M6��7��Vdx�xa�ö���}���ޢ�z��A4��Jt\oy�&��1�=��皙M�x?��_wL
`Jj���(�Ah�h�䅉��2�9I��2Y������t��`D�ŀ�t�`�]�%��[R��$���{��k���,N~U�>�#S�8w�ej      �   �
  x���Ko���vN ˜��~�����N�%1�����H����s�Z|����U=s���~��o?����������޿{����o�>���/�o~����?������?����ן���ݯ�޾�����w޾l����ۯ�y���������Yk&in���׷/�ܽ�ϻ7w�7�?�q�4�/�����`h�x?���4?���6K�4l��KX%�>aoo_��������2��r���
�z(�ۇ����������6J�4l��k؂��f�N;k�$����j-4��<^�߿����+[46�4hn�k�ڠР�j�p��S���X^ROJ�.5Mz������<�<d�9B.B�P�PO=���e�
3��"}:�sr�Ya�a�0�Va!b��<B4n}�^a&bQa.b��B�`R�ݢq�לf"�*�E쬰а�`y�2n=[��LĬ�\�r��ܮrE����
s"= �3n�V�����vB�p;����������؁�o;��L�z����RQ�V`+o�F�\�f�v��kZ;0+q,�i�-ٸ9��ܔi��2�a rc�9H좌��ځ���^���B^�Q�^���*��T`��f���� t/��T��+��hӚ�������\�\�\�\�h�-"��6
�Tl��غb��87Ƶv���CP���լ햩�햫��?d�Z����,
�T,T��/6
�Tl���*�P�T�-���]�i~��X+0W1K�d�t/0S�(0W�^`�b)p�5����L�V����X#�l � ��\i#%��J�涅��XJ��\rَ(0S�^`�b��NƧ�>�R,57�Tjm���y� ��H�x�4S�Rm�\��BA��N�}�L��B�A6�����2��*u��<م��(S�s�\�Ƶ�aa&���m���m���oT�Ե�s��d��j��z��2���*�6*T�Z�y��� 2��2�j�*e*u��|���ь�2���*56*T�R�-��?��(S�s�\�֥�[�:9~��Q�R�Q�R�j�_#wr�Y�Q�R}�\��F�J]�=O2����(S��j��O��������/X�Zm�\�l�B��j�d�3��]�L��n�j�����A���-S�u��W�d�>��2Ͳ��-W��[�Z����6�^m�V얫V߭P�T�yx\�c��-W�k�G�����e��v�U�v+T�Z��g��M �b�L��n�j��
պ�}�pp����[�Z�n�hٱ[�Z���X8�KIf�[�Z�[�Z���9��Ĭ��-W��[�Z����5ɧ<-�}��&9O��[�Zm�\�l�B�R��|���c�L��n�j��
�z���W�7�c͓��@&B�7N���<��r$�ϗ��l�Y���y�����L,9,��Tl���,�P��0XZɱ���)b&b�(0W�V`�b)+��ͻ��X��X/�P�����Mr<��L�V����"6r���I��������X�XJ������G/0S�Q`�b)gޡNr���L��s�G�����]�"w7�
�T��U,
,T,' �z{V�(0S�Y`�b��B�r��k���u��X+0W1+�P���<�/r�]Q`�b��\��<�B��1�lf*f�*�*���y�^�z�3�*6,T��2�̣���	�i���x�\�@�B�j�>y��益��(�'W�����2�OP^bN�����d*4rz���XOns��	��P; rz����Nn�� 2r�\��+;_a:�}����� �Uh*�\�p���x;2� W�P��se���ظ9H&K��R)d驺v�'�N�L�H.KO���؃=�� �d����T���GN8� �,H.K������r\z���(^Z �,� �*�s���9{E�d�@rYz��ˡ�}�=^92�0��L���6"������Ofxf�a Xo����Yz�z�7����#������g�g�粇�X�����xAt�����(=�=�G��i9�t�G��]��Yz�z�(=��Vz!{���3��^z&{�X���}`>`}�=��ϴ������00��#��|���z�1���|b>|>��|����c�ߗ�0p�y�O�%A{���#�}b>`>�=�����������q�a���zG�$�����-4Y���p���E/p�W#5����h�l�/�.�s7��F�����4�<�h�j^�F3d�
,���~V)�ŗ6���>�Y�H��"G�`b#�����<�țE��AE�,r,�f�#x������Q����"G�o9���x��Q���Fq9
\?Y��Q��ɚE���FG�#x��7��}�Y�6ܬ٪���<�8Z�#�x�f�#�|��G�rpڬr�\��hU�`V$O��V�fEڬr�"mV9�M*mV9�y��7�Y�#��h���K�Y��%�|���oX��;�M;��'�޷��t��A�����<�8_08��� �cp@�%�(���4�o�pi���H1�I�i�2��=nI�&K6nߒ�����5nܒ�ipK
����[R����6GlI��O�[R��`�Gǖ؀�G8GlI��7nI��7nI�}7nI�+���б��vB%�+�����y�pl���������/���/      �   
   x���          �   ?  x���Ar�0��9�vmg���te!S&Y
�F��6	�NW]��X�L��ig:�>Y������4,�l4]�XV�S%���
�V��� f�K�azP�?\�������fM�]K@n�M�
u0 ֪���B�-�yv�ŎB湱�� ݮ�^ZJ �+$R�< ש� �R�[݊J���*���iT�Җ9�A��±ۿ�A��Y�,@�DeZ����"$93Q{Uą��T��`1R(�ϙU:89tc����Hy�g)E�7��)D}!{�$R����)m��OPד=1/ �䉷*cC6Hea�V�^��Y�=/�4ɜ�6h��(=� EFl���R�&)2�g��$HO4ɒqZ�$W&r�7�խ[P�D�"q���$�=B�+��;R#2����%9�<��H�[~4H��$�B�Ef��حݸ�$Ra���+��%Bu�ƒ�㷺�H'?��#�l9�׸��v���4E�fvPL!=z�����C$Ci�0&e�����V���6i|$�Z�H��]ba�E�̴du"`�-(�j�#��s�|�#q�|/#H�ԙU�As�.=Rg�t�F��c&-C^'�}��HL�Zg_E�ڣ6�=�e�,D�����K�VR'��E�_�cq����\�R(�tx�D�����y�d�(�&�؟Nݳ*���{~s5ݓ
���_n����Aƍ�)�ܵ�u�jjc;&߆f���v=��+�Al�]c�R"��'���D���
�H�DC������)��D	��F�C(���2���p���U�'	4����j��_ ]f�}�!v�N�-�!L��J �S�9���'0�f0      �   
   x���          �      x���o#Yz/����4�����>�Z(�R�K�ؤR�}]w"CRT�v�d%Æx�g���F7P�g��4����/���}眈�#+Y�s�۷�j����W7���N]��ݪ��a�K�8�����o_���I��>�"\�A��$�'Q��j�Rm8�35��c_����uk5��|zP�I\Qn�qf��?�����WAK}9/�~4	�Q�_�ߝ�p����É?����9]�|>7��
.�|�;5	���w�i%-Uգ��i���=��q����7�q�?	�����Zd�P)x��|�~��*~���_�z��(�%�6T���z
b�ϛ_Et[����1�>l�[;Kl�
��.\Юt��
�Z�=+���2^����U��[�h�k�Z�U=���~�RP^A����OW?|�n�Ƣ�D<���O�2��W�,�X�U灟,Ր�G���u}�?�J�)9��U�[n���>������^E�����@u�8��Xuֵ����;�t.W�:���� ����1�nK�q�� �wo�L�'��jΣD�x�S:�To0*ӓ�w�����gه�0��U�{����ylԾk�gO*������ۃ�ۃ�m���u��(�`�����O��j	�h��{<� �g���=�R��=6�k9�V��	�W� �����G�\å�:Q4%����j&|@�z�'�����f�:�����T�pV|7��pp?��� �|�,ñOX�����e�˰_|sCo�^���#=N���s1]�#,�7Si���:}"߽S�D�(�A������=�hIR�q�p1#���%���V��i�V�p��-H��O��f��2����˔����O����'�޴o�E�{�AC��V�kU��L�@��y�^��n���I����D�H�B�k4��C�L��M���(��K8!Zq<F�8P��f<�jM�UgE;@?��ׄ�[���˳�(u� �Q}Mr<ED��!�G��˴u���[����%�[����_��5k�xWt��?��&)�%���.�8H��J��ɂX�$LӾ9��z��_������4���_�w�u�w���h���zA_�*�푿�[J3|��0\|�3��g<$��]�����EUKU�TP������C
��CN�U84	�������J����
W3uI��,5#~~����+�S���|Ɱ�f��(�����͂�xn%7pi���2�GI%+h���H&=���R���?���0�aB�q�А5�f���
��x�V��[��"��A��9|�)vwgRP� �̟?7�|�g9<P' ��(�ُ����rS|�U�b�(���jѫ:ov�c�[�D�����������L��4J5�&�_'�-�e�Ne�1M;�^��R��᝝�?z��N-E	��-�}�C&����7�����Dq�"���ϫy�o�ʺI �p�t�1	X�-P�eO1�%s�g�%P�
��3�`:I:�$X���j�S�N��z�ƛ��7�
��	�+N�^L���[��2V$O-iԈ&G���"�7����KW�~<ҿI8[M��_���_��<4LJtRm�NR�����i��Р�4Q�X�w��PGb�8d�a`��ʟ��U��|�@�h�DE�i8�&��� ��c� -���|C"�K��m�*\F�#%!�Z ��?��� ���.�lq0�wb�NѼ�)x��;D���b�XB��t`1v5��	��cW�p�$��/gD{���%!=�H�Y��d�S!�b�,��0��[�f0d�[�����]���� ������9$�=���t ��,�ͯUHpï�)��S�H�W��o�7z}M"lz_c�"Zj�r��� ���4���f�4=����������YJ寰4l+��濥$�q5��c��p��G��SnAL��?�Z���� �-W�1
� �H�?��<A$���v�D�9�]��t� ����a �4��:'`��Gh�����1�_1:��O@�Κ z��#D�mK��rlR�h!gD���u���4��IKp�,���*����c����w�?�������"��O�E�
��{�΁�V�H�HE��Q��U�ڳ�Ҽ"R��5R��R���q9���j2�%�Uf��>��i�,�v;#��U����z�����˫61Pi��%m
q�p&���6mx�Μ��B��h:�;��lB@��Y0%��}{��O�W�0h��V�"`p������ �~E_���h/B�o��W�ЗL�Y#ď/hM��F*L�Ġ��������xE�T˒K_����["�k����\�>fL�.�~�����_�6�⌈0*^����6�5�$�_HLaXl~�y�hSHdT���6��=AK'��qɨ��/5�i���>�$-�X����%b���x��ݐ#	�> :a�̗��tl�߁)�	�S�cS5kl����I��5#\��b'�OB����Z��[���;���/��h3aS8���N%g{֚c�)4�b�u�0�u� �����.�_"����\+�m�Qo��f�ڦ��8���A���I��%�b��h���X	��O(�UO"�ߨ�8�<ik��Z9�V R��ʚ����u�g}Z*�Uk�϶غ(�~^Z���;_ѠR�O(�A��!�GxCE��y�vN�`�~
c8��z٭T*e8Ԩ;l�I����5̟�i�d�^�s�{1��k��N�<�v�E��\�����>�l=l�O���{�>�V1�d�+_��I>.���?��B B��4Cc���҆������PN��a K�0���k�t�Z�d�a������z��B�	)��Ҝ�O:єp�O�0&	3�L(G�聗ͯ%��t�l3���jҴ�vV����#w�1x��C��șBk�L�t��p@�VW�	��QL|t<]%�]�Q�I�wA,v�
p��$��r���Y)�ʼ����
l��7�ǐXI/��P�9��x '����0E4?&:ۛ�O�ħ�k�7D{�TwB�}^j���J�ߏ �ҁE��né�y��f&��-��(9k��������N�E|�THv�]f˿l��9�$�,�=f,��=��09��v�������6ջ ��]�!���I��H�#����$�@hha�^�\VG\L�2�'�N+��6���ϛ�s)�c�$�QQ�H̛)<V�ެ�{�|�R��X.u���:9�W��v|ڢS1�D{k=�@,�!��|�z���O[j4�t�[lۿ��_�oF|-��8�`�bj��?h (^i��S���ᡤ)Ј�J���o�r��,��$U)�|��U�~�$�<�5m�1U�׆lT���/���"nVf�ƾ59�^b��sfo|�b���d�]h��TJΧ.1��տ����y�*�'��5)˔��j:K��S�3�k��r:����`���1������)@��=��~Ѐۭ{$,IȝMq��$I�5W�M��9Z�Æ�g���^ƭ�?�n��v�M�k�Y��bh&��%`)��I��E�����x��ᕤ|�e��8��	>v�"�g���
ޚhk ɔ5�G5�bD�IC&���a�,1eɆ���qH��a�j�l����i�$�kk`�����ۧp�^!')z)���u�L�x����E�s�xw�I>Bh�T�5�.��iӭz�UAx������Ò�j'�?��L]���b1��,V�sc-ZAl4j��!,9�g�_�����s�Ƅ�1^��.ൂ{����sN�zD����DK�I��4�}�`���c���^��h��Zx0��@�U�����\-���y3�j|f�����VhD)�fhɊV�*��z��8���	#�ee�Ft�D���zת��)�������k��/��q����XnQ�3s����?��؋��X�ߨC.��淓��k({XJU�XPu��p�wUu�l�KK�3{~��c��@^9+�����HZ��*Ё���B��f��$���]}������C:q��w�    4�2�ŋ��<L�<��p�%z$k��V*�JM�g꭪x�&����8:�j�s%�^=*�Ʊ(,�2����!k�Q�sRrX��H�}S)^A�}�Hr��:�e�s�a���o��"g�a���Q��r��D����S`��v%_/�E�����Kl8$��%˒�c-�^�����-��d	-_�A���`@�<�D�v�b���,'���9́���&$m�� �B0!>)V�`�O!�<fAO�K-����x���(�v��l�U9ӡ-�����f�� �n�&M��!�0"VK�kc"B5�/:D�/��� ��`�$��#�ѱ�dͶ4�N@���4��4���#o�hw��X@a(��3К����А��%��{N���!��'��]�v�\Nchw%���+��`���(�%�{.C�/`9�EBA��ӈX�T�� &�l&������B�Si�5�һ��Rۊ�^�"��f޻ԒjO7��a?�0���0�A�H`ϣi�$���E�W���&�J�1��Ŝ��	,B�#�D��Ky�Q	SR��ڑ�Q9DФN(�o�c���q�i��풓 ���D���y����vY��C��7�]«O{@���L�iЈl<YI]ArԚ�l��j��*M1a�T�AN�(��r�$�@�i>��NB@�lMxu�s_�J���-=�cnY*����y��`,@7��i�J41\��S�ś���*�e\�����b��e�1�W��I�J>�81��s��3I;\jF	�U�T>@��Z������J���`<�щ`����)�^����7D���k�?BND��:ds�R�		#���s@fk>��$��w�mľ�ld�x�&!��� _h�H̗��uy�/�CjQ��P���I �~EhL�X(|н������N��jg"�W��g���'�_}S4d��zEr;�x��צ�����ܛ�Kҁ]��;���C9���b�b�퀏�To����__[��=ڣͷ�kgޭn�n��uo�ukC��1��_�s�:�y�89�i�Z�=a'���A�� %`MLݙ��������6��9�X��G��,��ZSwŉ��?�W{���Q�&xN�5OK��}�ث�.;Ez�\�~�o��6\E���8�|7��)Q穵��2w:�	j ƙ$��$b|)��BSVW�s���q�Zr�O�	�b,iԏ%���'v�mT�RS���F�N�TR�!D�	�����P����y� �m��'�"?��*֋RK�v�'E+�m�`P0�l&�w5K�'�r�Ё`e�.��H����\�����`j��q�Yӌ>	��<�|��4� gW$������S���h<��}3�v
~&:��2�����Y�������(�m�����*�X�ͱ�6�O�w^����r�_��e�#2�1�1$�	�b��vVg8?F.�nv9w2�.+o��/�͖��$	�!m���ǔf1������{�����]unO%�Sg���<��w��%�;��i&N�R!�鬫�ةa�Vl�n�j���]�T6c��p�m ��N�!�o~�I ��|�mu�/.�9L�5�'�4��]LRU�ҧ��l\�#N@1��2�cK�p`�`���>�JCk����z��|@�w+��1��(�j�{8q<�y�F�4�^LR�`��Ię.ը,y��D1��'!ţX������dtv1�@"��F_��J����H�~U"$������=v/�(�:����D����yB��3�
+�2c��o� ��:���$K�E�*�?����.��"���op��<k�j5�mxn3|� ?UN�i�����gzϭ�0�ZN�~��.���eN]HK|�GR���:i:^��?��%=�nċ9�a�o�	���-��/�3��j��=�tttK{B�t!T�s>��3l���x�*�=�s��|�!X$�Ô��,'��=��S	V':���"A'��hּR�K�y��Q?
Y�y	���ܭ��v^�9��	Y0-�gUH�U%��@��/�_�J7��s ��S����l�g�Uؐ�F�"Ҙ_�z�_Ɯe��$lG��>�j��&��^�0J ٯ����  '�}Fo& �jj�S��ዊb$�a��
�	A�?��M-�w�Q�{�� ��eb�f��9����GX�]m�@ڵ4�es��N6U�]���zWϜ��[m;Ŏ{����T./3�N_���!zP�_%>׽���� �Cd�s8T��p,uV@&� ��y��r��}K'0����)���2�[��-�ߨ�YDGN9P����*a���P%F��'�J�/8:��3m/V������L��3@H@�V��5�J�ӤU�#y�3-� ���/��D�.c���9� �"Z>�C���]PoCxO̮������s{{��x �v�qI��S��"�	�`n�[��=���	g=�<w쉌�^�Qy��"R$"��`*�n��-\�@�}8�r�0����=�i,wF`C�Q���8�m,n�y�y���ہ(��gm�����,�� �s�Z�PE�DO[�����N�w��`���U��O�=j߫�6uN�{��Z&�)����TM@>OH�@L�nN�i&��f�d���Or0
@�y��x��rZe>Z�kj�~�@����ذ��ͧ�����Lb�H�����������������䁻k����qg�4��>�$�;��>�;^�qH�.�f��x�����'w���<{/�����_<�c�E,�\�<���E���V�@�ز�8�љ�U�֞��՜ܲi�髙�ư'�F�աAFO�PK�-QP�G3�e_D�_�o��:p�QcTg3�D�&"�3�� ��_���u.^����A@)��K�� 3ܜ��-!c[6����Y�|�O10W?�	�vL�י��0�����2�"'~�L�X��^��o��A�_.��nO�۝6����x��@�:�Ѩݽ*�1wn�=�O�������-��q�}���z���F|�.n�mq3��\���!���p�1͖{���v��xnaO��k!�ȵK��Q�ua\���ͼݾ�}[��V8��/g^����j
Sֿ��i��q-� W�8�K�E�e^l���S������N�<�2k�R�v��j�H����#��'5Z��Z�WkN1�ºTW��!��w?���L)!}��U]
#����������*I/�����Nf�����145}�%��mv/��@���#ǭ�w�ޕ|ZK��~"��<���I��f�6d�XL�[����׳R,'z*�����[�,�C�J��VP�e��Gծx�d=���,���'�F��x���u�u�>0�D�������-y�:	O.�Oo��s�k� �l���_�4��i;WD܆á��;��h��N�/ۧt���x�<Ä5�ßVk��`T���*�۸��x1�6������>'��:arb���wm��xR��FUh�t���%�(���#,�S�o�	�ߩ��QT�[e�]8�D�B�I#ʪA��&�M(�F�I�dm}�Dd�W�W�cjm�?c�PU�T�OF-�mU�K��l�L�,(��P�|��Y�+�2�>�C&j4��L�@�~�4���l��:�� ���6�a M��%W��%
�i�`jvs�����ꦧ���l��.H �)w%�4������q��w��bR���;�:��9�b����E�B���"Y 0TvY
Ŷ?�K1x�O�Wqe>#�e3����o�,��Q�*U����|®:{�-�w�I�A�*A_�Ui�H�̫�ۭݪ5NN�q��pB��������������x��}������,�� X+��\�=J}8��1��i�Ў��-��$�p�(���։1B�$夙4"�-�Q
 B*4����%�'�gBƩ��-=�*���i������F�����y�b�v"L�w�>`8�<�Z���<
�����u��c�b`�g�hq�
^�"��_?�}��c]љw��EY�d���=�|Hp�속g�[k<�������c�;��_A������
    "�J:���I
X�����}ֹ�t��^eXn�AWĹ���^�SP��Ň�#쒓#lxZ��➗F���=&Ɛ��E���`b/e�&�f��q������T�l�g	A)dM4M��W#��Zh6,�7S�޹��:��>A��Aմ��Zn�G����&tV��{+N-�F��ݭp���e��<��kf!vKķ?��wg�~��h<����/�|���HK���B�ڲ[�8}��~�H�+:υ�pd؇�;r;^"���|�	2Y�������j�qzlC������,%>��1Z35�z&�=�=������d�gD��	���2����M�!@��a��Ί�^񵡍^��� 7#ц���31�G-�G���X����$��DP�M�Q�De1�p�"M]�y��9��^!9v�m��m�ֲ�\5q���U�M"y-�l#��۹ط�a�h�2�\���8 ����O�&*ٜQf��=w$�Tt�D��Yh'LsX] e���Uuj)J>��O��T�8���zL1Z-5�*n�)�$�Z�n����R��q�V�����B^ժ�+���
�� e!�iIH��cի����C�9in�_�q4u��?M!AD-��4�'f,ʆ�.2�@Sm���E�q�1n��:���0�ڮ�Yݮ�)�D�e �$[n�l��,� Kd�c�'@��E�Yd�6�fKxHp�E�3�#���L�cEeTr�AC|��c5k�o���4�ײ��Fjh�Z|w::�uBOz5mx������w	��������{�x��#1�O��~�^[�/Bk��1����F�R?Dq*�Z�G�~7Kq���`����oi����d󎛖��AW�V�n��'hq������6�����A�*��� ڐ<�|�xlҮ%ڜC���m��le)��\7=�؟!�0�|5Z+�̌K�JT;ma���ؒ*	@�r%�LU�Lf�r.Ǳ&��1�t]��%�M��3��Rcď��9��̼$�1��8����t��}������8(6�� z�S�[�â�ӇKI�]ߡ�
{ZB/��4[���*���4�b��lZ��^4����-gI?TwϷe�A�̀T!I~����G�/�`�962b'�5	t���iE_"R��Vb�/[ t�����哘t�'	e�$��3���ͯ0R��b�L���5���K��Vȃg��~M	�ܤ0�3' 6�H�ւ����O���t" G��X�Ě�LR����ߗ~�v����+U�,q�ڹp�<��WoO���%�����318o������kթ4I�-v��CR���f��m�W���i�0�e ���f���DG�Ulze]*~f��--Ȥ�ƔI�T�����6k�۞���5����z�%)�� �N5u������ͺ}jSBת�Mebⰰɮ��Ғ�q��i�u����p�#�ͅ������N�+H��]"�&���9J#�D)J����������r��*խd㩀�NBQ��;uM%��@�Q޺)���4��� �$/GW�wdm]�h?D�J���)$'V�T�ڕ:=��	L��7QS"֯�K�4��֊�&S�̲�L���/�o^�q��J�t�J���ʰ�q4���/�5�-l���ݔ�������xp�d"��.���i�Rs�O,��#��M��p�A��f��a*��!����hӗ��}�<��?i'�����Ռ��}��j0(b���FXz_��If��2�D�h���9��'`����A�bJ2�	`�,�Cb�)��f��/�R:�TI|`�?��|�yٔ�E� ۨ4?��yg-Gs���"mc�͆"N�������P�:e�xH���VF�Ѡ׹��� ������6߹��� 'ZvD gsWS#�T�2��Ɩ����-����3_�����Ag
$-��W�C���-� �8�O����4��>�nfP�搡$�N������Z�U�e j�cO�D�y*CF=>�o�==����PT�*�^�
���H�L:pK�w%�2K�\�Rs�]���
;��	ퟠ��vQ�y4,A~������{ɐ��}(�7��W��I���ͼYq�Rm��o���,���)b�"���d�����:��E�s��BS!�d��~����]�.#w�&�/|�9���>-ͰJ$�U`3i��l�k���K��ݖ�7l��5mJ��/!4�"�,S��~�l�����c$�C�y�Z]�߭���F����%��)@I��^��Z���4e�?(�ם��~W�f�UՆ�ڱ�i�w2|�H0z��m�:�����jF�y�HP����'��������Z?�y@hRO���@��=͟��"X��ZnuS���!x�2:+7/?� �<+�,�^>e
��c�02�K�1B�ɘ��,f�V[N�!�I��HU:`6�����t��u������!N�c[_�'g[Z����-�9��'�lJ�'0���F.;~�O�H׀Z�zͩ<|��˽��� �b8寘�9�������߾�m�!��ur�m�5�	��rK9��lV �~�M���Yg��}uC������}�R��:o_�G(>��w�)��WS'���)�4�3o���;�
�*�W'��q-Ųp�h®��4�.���L�(}���h�^�c4N��h;Z��ش�zA���TD�k�&�q��D�\�+��4>��mS�,�e��&�
e�U�.TGC&J�,�����Q)���3IR 	<��
�WʡG�'>+��TµߪWo�����s�����S贞8�A$8�u�>	�����@�^��Ϯ�?N�p���B����XKS5�z:9Ts��T{�5w�U��0�ߚ���EN���G�]tjG�@d��U�GSZbDL)^gF�M�L��/�݀9�>����4
	s�ɝ䩒8_p['�c�������s��M]��G(�����[!�`��B��	��8�SϕU���
B�T����V�E�*O|�u�G}1����w����A���.��Ǎ?lwx1p��V�t�=֙���?D�.�x_���Q�dꊔQY�>�ĭݗS2�S��χ�D�O��j��^�+�S����h��i��K]��D7�N�}��$�:�=>B*Z��^��t�R�6��a[��9��s���CwKu{����vt7��0�Md4�"c����Q�����N[?O0DC��6�p���}տ����^%�A���<�(�W�����qy{׻�\����%���W�i�Z�z7��%��
���������T�t^��{jԻ�����#�?ѹ��u�l	:��\R��}t �WU����Q����#��\�bF#�Jx�%���g��q��Ao��F�_O�H��u� Ֆg�6{�B�Y�'�O�_G�̗�T?�.��^�C�~�?��K/�|��@��n���*W�9��1����\O�v�T�m4�e7�0sn&l�� �܃Q�Bl��2��fD Ù�&��[ڊ��pI*��p�Hd�A;Bm�k�О��ͮz��F�T�BPN{=@P��p�j�Q�N�}#k���x�ߩפ��{0��C�� �8�_sr@Q��J��:V�DH{;����t1V�q�*���C&�F����p�:x|p�is������_�5���Ri��݌Qd��R�cx9e��0c ����]!�S�p�0�&{=�;�
v\���2�&��������3�W1��T6�Nw={�__��)���©�˃�˙�ѫ.�����/8����8�J�k�C>V�Bl��Gu�VV�> �|���k���!�/�@�$A���e��Y��~�u��<",���wMh�~]MQ`���|�LL2
Qϔ+��D��� ���u�+�N��n,�� f�ӓ�;�%C*�Og�+O8]�l��BY��	���� l%��>D\����Q˰k���G�$z����*[��6��V���v�2��un����P�m��Wc&Ra�u��
��K�	��}O�b�L(ln��<:A�Ґ�����pʖ��Ȏ�V�EK�vT�gU��z���(�o��(�a�8CzrS� 6�K���u�%�]�    _t�1��n&�$��� 4��.������M��X<n���7J:�U��W>HW&ÙN|:hc�e#ms���Y�ǐ����f��c������Iz`�cV���DmJh"�XC<b�O"�S�HJ���uH���u�AT?�'b~��<�O���	�����%��s4�;:־V�aL:��I�����kH���y�i��Z���g��˨w���oH�����=�1��Z]l��A��EQ.>�����أ?t�����P��-U��T�Q?HL!���Ԋ�j���u�Q;��6
;u�I�ݓvyRy_��D�/櫅����'5Ivz�p�E�GԁDLF��(��W�_�m5��ft��V��������9_�$ӎ�P�",DuuT�Q����l6*�F�17>����,�]E��A�gi�c)�=G�V�ѳ��*����C�s�(p�<c���i�V��#�
M�h��ui4��'5\���N�.�l"ϲ��=N`҆B>�*��ZMg�D��$:&#Wࣔ�
Ԫ?�b��}1ي��nG�J\d��~V+Ou.�B�@�3LQ�P��6��.EG�8O���i`kƒ�G�A�{B�O{��ʃ���`��i��;�X�9+ձ}���.��d(��Bj�$֘�@�<��ș@M=�@:�%��.rC�e`
f�e�nZW2�7�&�7�,���V��&	Z_��a��")�7~"��;�%M~2{�{���1+kv9f3��^�x'00��V/9��Al�u1�Z��n�)W,�x;|$�{�%��S��~5*�#�X������9�:��S�X�s�)�u�曙�V̀��|�79�	'&{��B���Ix�$2���LO����]v��W��t[���<�臒�ٝ�$4�5l�}3eVw���c�q��Tc�}�/�mA�#Ė>��*��8��&i�+�!�>�ΕA��7�j�PZ.T�3$7��6a��4z�T�R�i� ����)�t"��p��թj#�WQ�ss� �N0S/&u�Ȝ�2�����"G ��oO�^u�Rr�4"'���hjR-��k��U.@��Y�hf%ؙ�mƲ�~�J ɓ0�QcE��@M,5���F�C�x������hwz�S4���{�� ����N����=�i/�9u�EĭgYN��`"B�/d���P^�99o���6��Gi<���WI\�wnn�ڔ��M�s�eA+�R}O�D9����r�L��Fs.f�Y�Q2�[��!K:�X�
�k������6`A~�SC�P͈zw�}��Z�Os�O����gmF���h��ddT`;	W�34�)O0�MB�F�}�U �0�EߠP�9q��S�����Y�Y��=*gW��ԭk��t*�hn���g�#O���A���?f��(8j�8S7V�4`��J4���M��ǟ^&c{=���Nפw�J��#�}!q�r�|V.�lN����7�Cy�w{���X��@���.ʴ4��[�8�����X��/�o����U�����t��\��l;��"�i�#8��r�m��U�$$������R�{ �g��ҕ�ZgxJ�]i�zv&=V�&��qL���f��8�
@< *n#���&fE>�/��i�u`rȩ{�T��ri;�x���nF�˾j�;�ੋ��D7��uG��/<z�X���w($'����|A�������Y',�c�	+�n�z��(��ޏ���-�tp���vn-OwUn)�Hg!��Q�v�~���K����(�f��m�j��#��3D�uӇ:Ȝ'e�L^�)P�R`N�.�:�T8�G�F}@q��l�">����İ	T$��G���V�]�� ���0L&@�;*��?��|�+}��;/IW\����V���!zw@F�a������!�,�]ٱ�ζ$$���j'l�;���JZ�GSk�1��A1`}2�(Q�� g�O`��L%+OWV�MBn.납7ϕ�l��V����7�7�۝/T�{uwu{�N�pX�ˈ�|Q���@�-2�|�3e�-eF�+=?�-�:�	���\�!E-ž�A��;� �D��}���f��-T�-4��!j�ۥ�7^��;�P{�m�E~¹��ۍ�g�q��g?��d�/�m!e<@�8��p�CZW$�C��;C�ȇVEd�G�Gޢ_�{.��q��[4�|��R�����K8~F��_q�F�1�..(/X*o�G�:���f��,��:m+�,�U)���C¾W���8�p@�lW	�����)�`1�)i�
��t2����A�~Xq*Y��e�ʌ��L���4Ǯ��G�ћ_+�����\�)���ͷd9`,�{?���&>�~!;�uqp:ԉ:w�6�=�g����n��W~<y�[ig��2$E-W��s�њ���;����P���48��Y����U��~�p�Ǉ��5a$ڑ����l��vi���0ݾ1��Dg��xuq��H��}B��ö��#ڔ�~�5[IcO�k;P�����&!�/ܷ]����z���	�傶~.6�&I�ŔL5�E��$]g�~��4�!D�w���G"�D6�hgR���w�,߬��W��e�] �"���X��xWTT��׬�z݇ yl�Rc˨��@ W�Z }�Yq`��I3u\t��O�Y��nj��~�����N�eȬ��ي`����V�lТx��Āq`�sH���d��ص�HN���EA.NY��ZM|x7��|+m7]��y�BW�H�������ݖB*k�w$�t�ԝ:	�DH�������
#��"�3�Xٺ]�QB�L���j�:�6o��8���;���5�և��R�����V��Ms��n��ɯ��ӫ.��_u�Ws���Hv�Z���_��y�k����C���J(����P*�fG�I	�1�W�AS$0A,."8�D%%�k�Zo3�J]L6�;%�;��ުԤ���nz�;���:Ll��>VH`)=������
E�� ��(Z<��߼*��A'�P.�Ë�ۚ�v"���D�Xpc-φh�zWө�1��h�({��@�H���q�>SOݩiHW諮�q¯�Փ~o�.�L�13�e#r+l�������74�5)��S�q ����+��&cW�a`��R nIse����mz� MS"�P�X���'�q�R��"#^IUL�\%O����B��}T[�����r*�Vuʵw,5�r��9h\P�}V8�	M�R׋m�U��1��aM#���ڊiX������Pzu�R��TpD��\�$?S�s��J��z_��&w2Bc�V��s͓Z8�c����Stց���e�����x\�gT� �ͧ[� w�Y�@�)�oOH�;CK�&��'ڣ�iwƝ�h!��z�H2�\����U��x$<�#�Y���S�mLB&G�ǖv��8�M��6��dM�}��H�In�ώ��F����EB�$�:��*Ǿgh�xD�n����0�C��%����M���r���ZO{�~xP������{йbGS�T��B�"��a�X �1�\Q`����6�hD)����6��؅ȨzZ���`~�zaZ9�(E����<��DG��AǼSb��L��4�D�lU^�m4�t�1�������	��n��XW�����^b`��� ���_�@vh>~5�G7��ƚ��-�>�r��T��}J��S�Q���r`�S+5Ef �H�@����)��KҠ�����3� �F�}~_I��f5{����⛻�S[�x��qK�$�"Wf���N�Ddk�)y�HD�핪�j3����[*�R�.�e'��MB,"�y^K
@]����;U�H�8YW�1!9��8ǲx�Ӣ�{ŭD�V�*߶���@�_�?��6��-IL5)�n
���N>|�$�2��ʁFG�V�L���$�˂�3R�/g��|S
�!HTC=Qͧj���3���/���[u�/���+�6�%-���h2sGj�*�̤-ЙXry�^_����$�=.�����J_�6�o]q��Vwk0������ރ�M`�K��C.W�!�^��h�*�wr���VM    �Mm���c=8m�#�	i����h��:�E�׼e���q~k��wF�kwD!3A������?$�֚$-i�<�@���qM�e�Vw�k��ڂ�Kx�U�P~��IA&5�)��ۻ���b��������T�Oj� W�@��j)�x5�27+;7{7w�v��vx{q{�3�7��{u��WU�sڗ�C�D \��O��u��r�<���Q{�4N���i̫k]��M�m#����7��b�|�I��Ӑ���/库_��\D��U[}quǕ9.^�nyM(�1�݌n�������Z-R���,����N0ΐ�f�~z�^�z>m_cY����wW��JU���V�2�LGɣs՛�]Y����8�������S�����%���
Ir/s���ě8zX%���ks��f���#6��J��OR��I��إ�z����lv*�F�w��=	4���2Q}Ԉ����$sifx���$��Dƪ���̿��X�';E?f�� �4
�[�(;�7�jcV�����h�*��P���z���y3¿�l��$:��hr���٫CD�8�'m��Z�,|�����ڌ�ʹ�7*5'?�'�� ����w��c��ƶ�ZY�WkZ���g�aA����J���u�4�\u^�_�l��e���J�#e��>L��;����q��9n�#f�v���ԥ�)s�
G�)�9�&�$}0I��ϕfw#��� sCpA#�J\�*/D0�`�`�,�~��C͈����/�-��z�ҩg2a�?��C�J�\��*U:�HL����x��!9� �֪�5`�;c�͇�N�2�NTm�@�~�v����L�T�j�Χ�i�w/:��}�`g+�w53L>���d�"�Do���-��l����ڟ%]x>=/�h ����4�7(]J�?�R[g�p�?!`K�d�2Ƥ��X����5Ro)���d��;���hir�9��I�	�E��B8�Ž���5#V�	U�}i��t��e�*N�<|�^M��:��{�s� �stF�f�K�'��� ��G���I��WU?{
��Koų�17�eC�"�L��X�@Z�炱-u����*S ���P[�?np6B�����@e�=�ω?#TC@�p����E���[ݐ�����ˬ�pY��R�U����#�'ʹ�7"P,�9GbpsJd�̹Vno�V�׫��:|z��c4��q��9V�O�5 �Dd,#��秆>v96S���T���܅���q�A���P=����h��5B�Dk˶2E��r���0v��f�Q��qO�w9E0A���3��1OZlj��Oݩ�L���"�1�L��l8[����R��<���&�YK��!�����1��������ɴ��5Z�v-u�@����e�;d��Xgi7�<ܦiNWOt�W�����x�
_�Â
g얍p:�ɿ�=D�OA�}��DiWba�Qk�M.�@KM���	r�Q�|VӶ� �O�pǛ_���,�1��D�i�c��w���ɋ_VI Z>�.�`9.e��1��ߦ��+��L�WBÄj�����#]�f('BϢ^��$/��.��p���?}Y(���wα"��yi99���=��C��a|���8ʧc���]t��HB^G�Yv�)�W��O�-p��`�i[�׸��84~B!1�)4H�����Ь�;�2,~$�p4�����`�,��X<�l���9�������
I@ �>T�I]��e�)i�NK�9��)&i[~DZt>`�C��Ą��j�ڴ����-2���uw�h�Zk����b���˰��y!��`C�=מ q�X��YU���6�,a��fe��r�b<���Z y��3�h�b����w�^�5
�ִV�rpsND��h��̆�DOlsqȋh�L�������s��L9?j�\�UM��]8.::LS}��HS����c���M�QwW�r節j��:/y2~�}WR5�Ы�m���!�*5w{Z&�!ؾ�wT����
f��x��+V���)�>�pv�K1.��?�����s�̆�vz���Yb.^�s�|�_L�����M\�V�?$��M��<q��9=�lA	ڴ2q�s�]Fh��.OFH��(H4�I �D�1��x��^�#�z��`F�jß���x�'(�0�����lg},�=spޚI�{��)�&�4�����QH�N��U��n�uns�R~#�����|+��0)T�� ��l9u͕��;�2��H��<M|���K�o�Qw��K8�@������v�����3�O�T�iQe��2q���7���N���I3ݘ2?��.'`��@N7�ęD�/�m�/�qvw�<ms���!�������o�x�px΁
�rXg�����o��}���6�)��h78SoU]�Ku����ߥ�NKD��p�.��m�m���(�e�oji�+-8�-׉�
�6 v�LBl�R�/�V��6����~��b�Nc�(���`��{�O��R2�īf�;�2���{���Q��&h�\����2g6o�1��?%	҇k��y�[~Q��d���O7W���P[�Nq��B�)A��������O�~v@d�H�|�:k�َ��DP�w��$���Yh�r~A�=�p�IV�Ni{�d��2]�̖T��!\��R���yC�'m+�h��6�x�k'_솢3M��AS�#�ŀ}�H���b��r�gh4��~Y9���zH����۵�	�&gY�c$�!ϲ"i]�`��&�����h�����E=�Ж�#m{A[��N=k�B��~�:�U���i���������<�{Ԯb���m��m1�n��:aE����uO��t�ɛ�o/ۧ��v���O��1�J�SL�C��mw�l���Lc>K�al��Z�j��:D� �A�$z\r:��wW���<]~�����+Nd�j���sa��!]�7��rr���,�O�%���D��_~�_w�h���#�_�� wF2��M��5��?8Jn����lY��Rc��תj��;6��Dth�-�=��[�.BG8�؅@�H�X.��0�no�^�ô{ks�Q	#�f<��K/`[ )0���`��A�mYU���x4ZG����3�O/�v��Ć�0����;�Nc��$������V�;����G}����z�g�Zl_��p�O��"��m,�������k������7���N���3G��O����<D$h�`�Y1Ғ <|��2��������iu�( 8��)@��8"��`��8�5q�`#"�D���*��m84�z��8�U	�<zv��{֤�TtӺ��+�]L+Q=ɧ��j��C�-���W�Y���©7+�a�ۇ��Y�Rc9�K��ƕ�qw�m�L�È4�j�'?��ڰ�mnQ�I�*��'i��H��&iB���$v���n�0�,k�&$�eR��;� k���:6��usR)�L���d�������E�]�*���n����|oa��f�j�+O��X�ui!g�v�CT}L�SyOZ�e8������9�~�����[�;hEJ[8PWd2N��IY��ϧ-���S�_3�(���hp��9�gNf��9:M�����Hg��df�	�b���d��=$���|z~*��N 2���W����Gb��O|�������i�L��e�T`�y(����-`���S��Ӑ(�E����g�	�?���.�� /�C�����O{3mu�<����4g_Uf�`j��*%l��2�\�5?���>���Cy�����?�ej��E��4�v�����A�L�e~h{���9s���[�Ɗ���ƒo���Xk��ە��2h�t�ԇ�����<ʀ��}��4�+T��BJu
ٶ�S�h֖{�^f�݂�E� @�5�l�k�y�_�e�?,�m�hi�h�>Sw�A�����$�L��ϊ��@��'�bzɈv��l����7�C�����u�z��U���e	��w4\ �+�t�|�<���GN/�|�m����wh H����!���굀�c��\ǆf�Q8��SN����S��| �Z�.:��Ӯ~��1    NA�pt��O�x�c��h��%߆���:����r��������8S�m���n5X`J��+
z�CG�K*���J�e�	��e�z�kr�Y���'O�����_��5Īlt�q@0��t�}�� &ܤF|��ݱ�)T)u��~_���\�u):�L�aOP� 7ˇ��_f;��Ĉ�a��N�������_*�¶���D�V���"H��at�J&��m�(��V?d�E�)���M��鰫��o��#��|fJ�Zri�U��>> �>"W�u�r�(WwZr�5�G>��d�Ӈt�^����H�KV"�|�"ȇ#���}��G�1.��� �c4滴/6/+�7�JE�uxU_�X2�4��@�� n~'؆���9Kړ�����JVA��H,�w������6i5�p�k���9����c+ĥH����X>�hڊq�RL���&=g-ƅ�kX73��2Ohr�G����	���Ry+Y����@8_�2;"�Q��FRl`�%<�w^�kF_#׻�q_#�fe��p'vI_5_�d�Ͷ��Jc]��	Ũ� �)���Lj���MjX'6~�&�1�L�ʳ�ɟZ�"��O�
�9Э�8���H�P���i%�����������|6zHH5��	����bpb>��u�)(Κ^[��ĵ��Dk�)p'.��d+EZ�U�)L�~��]'��esV����4�	�.�'�1��W�������8B��BBz@	q@k�E�$A�}_�o��f��\]�\"��P�=Y
N� "4����p��rlH�� -�����%�g
�y`Y�9���\��%��"%D�d9d �y�*�z.�r$	�׫o����~N�M�e�O0�����1<t���E���8*/�-ZH4�jnU%�� 2�9�Ti8���`�ϑN��U(a����ɥ��ȵ ώ��e[DF,��vƬ��%�x���ŧӓ �(��#j��D�1�:m���s�
5z�s�Mq$M'|��W���sDRfi�1&�+,�&-�Pڏ�|p�S��Cn��ϧ�uz0�Į�Қ:l��s��N�t��l"�� ���)_��O��LH�֛Ǚ~��v���\�	A��!Q�6I�T�fφ� �	g7�����*a�uA=� �H� #���1ߓ m4��"	K!�ܤ��Up�v$��L��Pⶤˢ9t)���C�K��r�w��%��}o��1q��UKa�Z����r'O3q,�Q�̷Q�2^�V��eXE ��L-��Ȃ>L4���v70�pr��}iݝi�D4�&�!���m�������r~-�$�B��Cx�j��2����}�~q1|*/7�и�[6���l�e-��+��*�0��,�� S�V�{%���4�%�P5z�x�������=�v��~4��u�}|;*_��պ�qu;Ǟ�������S�P8$K���_���&rh�b��sO���5P���O���V�SluE%J��k�'� 6������6����b�>�~z�|����0�&��N�9�Θ��C4Nf���?Q	�-"ξ�%��Kކ����.��%t�vp}�z��۟�FG����d��U��H�WU�n��Lp��\����������F���7�n����e���M����nJ%	���^]���7�����ըM륯]��5�������Xk��R���M<�f�F�D���x���%m^�G��Wqv+��Ă�n�Kj
���N�X��m`�\��Bt����q�J�x[s�[�n�{��7@�W���J"�Sur��չ�	��t͟e��iG ��A�N<��5W�cc�@ZKlF��Keaf�U�ٳKK����+��HC�B�ߑ'+~�k���U�n�j�E��0��X�F|T̠��\�N�%inoͤ��}S���j���h�ۉ|t3B��*�K�{2�heH�VA휥�Z�kh�+��A�[:o�����X#�~�DI-��OP�����k�B���Xh��m��=[q`BA���}���ޛ*̄L8��%݃���qd=؏�b��Kb]䤨�9ÿ�It�B21b�S� b"�0iK��P_hY_n�}Z}h6tY����*�4����YƄ��	B]$���U����k��`�a9yO��tJh��
*˷h�8�
�J�#
�"ƚ��������a�\5��x�ZYA�m�y�&���W���ɚ+\\�0���na�wf7���� 5D���I4L������ͩ���l"�ǵ^���?���f��?����\|�������e��U�T�o�W�C���-9��d��M|=�0(2����>����3	zۧ�
Ga;ʇ�/�{)r_��"��EN��c��AC��[�`��q�vZ)�&ϙ�[F��/�$���\`�G���_K���Gx��}P�~��¾b���,� �a�!�תir�M�p�����3t�
�Mb�,�1z��9c˹���1��a�!��خ����ǫ��G������ �E�	k*l�'��t#�%�>:BF.�>Q����T�ՙ��0]h#n>���MӶHl���i+x6)#��7�=�-!)5��f뺉-N��8��5�0�FE�r���=�	�� ���H���֚�Ǟ,h��/*�B��~k�@��X2���Yvwfyngy;/��,ӌh�F��K���O���D3֏�wP��c!�Zu	���6H�s�������ƽ��C�g]]�p��s�HP*���n��ݣ�Ņ�4`��p����ꮞSm���ʦ�ej�v�R�CC~��Ǎ����k��Њ.����P4B�.�W�aO�����������e{7�r�����(�R�5d����r�gu��R�5.�F�J�Cgc���i�|����	�%}��ZUK5X.�<P�O��>c�{��X��xL�w�9��:���[̓�K0�H�orј�Ԃk"��hl���24��j�jh#�
VLH�7$�]G�����
��̓KT�yՕ�A_wۦ�O�1( Qm��� �󈘝��:��\��K.;��7X�l���V+�U*2���W�`̻��,tDA2�*�>����vD|=c��ra3ׄ�_�1�Owk�3c�ƌ�s�ON|\�'��U�ı��������:�ZU��������?��}��kٖ����"�ld��Q09�8M#�BP!�U��Ь�H���#=8E8�<�4�OfLbu���/�bq`�lH�?�9mI�\XI�j��C;����[yyV�2%q�{�=�3�񄝾3��gЇ��-A��l�mtK��)�x��'$wn��EN�����(�Nf�1	��(�-�p��f�퐓����`�?/�6����2(ֹT�����n����RΫՃn~�D�j�X�Eꦓ�O\���_H��H�i�MSU��c��:�[����͈��tu�[lU�� ������T̚�*B����HcǇ�j
��b,!��\�+�����n�x��qfm��t�U8|���H�5��6�j�����ޥ�%�0�iADt6�>���A\
z<�io�����uz�=H��"�t�Mt"_��!_�sh�� S��=�����p�
	{��m�!��Ɵmj�%6�kr��= '�'u1|��ځ��BM�"�*���P��z�mV���œ!}"���d�s�����$S�Ð>�����E�&j6\��-9�<Dӄ��h�NM7FnA�CI ����B�����fk%�򡜨�mi� ^ ��._�_�D�1��V%�nͪ�b��#�Ȝ��ΐ9�^��e ���`�U!�.Q��K�����AA���	VSvL(���wON
( h�D��KYU�_�@�	�ܓ3I���� :�pjݕ��L�f��kx���b�9�]P:�I0��&��Zա0T���=6U҅��5�$�����V����~�ǾzZm~��JW�aQ$��2u�1Đf���_�&꿇�e�H �5R���﷽
�Xd@n(��>�5�[�[O����$k$c.�݆F+.Y�M6bnM�F�S�䘍V�Lo��AR(u&f1��'9x��Н(u�]�   H�d�%�E�,�C�_��ۍ5�ƻ!����KN��B�J@6�Hq�$-��`�u���S��[(�3��Eh��c�$��hm4��׿���X��ثKG'�m@���њ)�%�=���I.��bb5Lu����(�_E� c��a��td�	b.��W��7�(u /�ֱ�Gt����'�ۆ���x䧟���u+>Ϗͳ�=����%��9� <�!���M�����4`挽=�l�钦i��m�"����e8LR'�m�,`��j"�S;=�s'眏���J$�cB �F���g��$�������O�~�����W��`�g"�g"k��:�uKG��BZ�'���n^���:���;1Hb�!�ܽ��j��ՠ���\��T/k�U�<���2qY���>t����*����EPA����y�����fR:
Oܤe�ZN[�&i]���'o�g��"4|��E�U����6e}��6�6��mc��(m���)�KjG�M�į�2�f%ZgN�ֻ��b��%���n�p�y�#�DrJ��~&�X%��
����_H��Yq�6Ac����*��y�uwS���ڷz��nQ�f�5�a�14�Mc�N���v:^Mmr�����.�dZ)#���;]ܟ��P��,I��VΩ�p�|}�Kڗ�U�DYK�f`��KI8� �[ۉ$�°���k��ϲq�L̗��z��w5���|ڇ��<���Gf���:�j�s�%�f����� t���h�q��j���s�C!򍥴�2��=�<2�:�?�9�p�J����Dٝ}�h����6ZMü��:̐�Kt�qꎪ<= X���8P$�t�5��;o�n���� 8�0�b�b5�<�VZ���J��:\"�>����.��،@��/�H�@n}� ���$|�xd����"~��oi�]��[s�3�f��c�+I�y�N��A��rVo���|"k0o:Ns��;�l��}�@j�Ft�?�l��nO�q33}-h38�'OJ��(p�a���
p���u��.�GN䐃����ĲVH�}"�Mlq���ݣ)ݠcڻ�ԫ�+&������ K!1�'�b����̖�OYs �C�-Ӟ9�wqֈw�p:��.�� ���ҥ�"hG4�������wٖ��������9��2�-��������%�^v��MHh� ;��ȴ�0� )^$����i�n��.,�1�*A|~�74K���_KE%�n��Y!i|�� ��}�b��FVfK�:6�$iȢ�EH��,_�O՜�?��.VDÖ�t}��삞f�Q<�
Ġ�S�R6Z�9�c�Z�ߗ��q�x�M�^�.r-���.3e�)9�J��J*b&�r���К�&�Db��hxr��m���š���$J���U�!K6�F�`�����M,3��/0�]����
����< �U�ig.�<�HLԯ�&��fdG�V�k������>6p�����$؋`��l��o�}� (x'U�8<�9��J��[����l�9��4]�Q�K� �������|vH��Cc�^����DE��qY�*��"��*�|N*;�[�[��FG��J�Aox��V~��>�V��`;�o{��Զ���+��Mf���V�7_����n ����X��;N~Mg�����7$�{�ٕVFvAtH�0�e]�m�|���;-r<�Dzsh��ͩ�X;2�+���.v?D�s~r��pq����W�=��"���'�w|t|R�Y)�`l��K)?���<��M� ��{N��;�5���y6�͊�&��5G���jw�ذ�럂#`2[���f`&�ղ���~:��g,��;ׂ����_�J�n+@xv�LH�� ��u�̒un�>7V�̗V�[q�/�=��b@-4��f]k-��f��u��F0��ZG۞h{�B�e�p�u�S�� 4\��
:�:p�\5�S�\ ������ �v)���`�~M���8�vç?�����Ku��>F�*�i6�(��E DE=�.�4]�P/�T.�W�{P��V�E��l����eGVP��p�G�}qp�y|�*�����) �b[��jJ
]N�����t~5KQ�Y������1x��PM������>l҃|�����_gu�%0�`��Id��N��6�m#��԰#��=���s4l��M:��N1	4��1�F�֖O-�Z��v��.	^7�
b���̮P\��޽O�̅)>��}��sb��%�{��/ːv��h�x��B�[��_}�h�l#����ڻˤ�`�0���1 %����qӋ�t���0���1)��>`ʴq59�J�GyRT	H:�V�U�S��	#������R[��k��H�z��l
:,�X��Wͺ,/和���w��tҢoύ��vќ_�Fp����\�6`����p:'�c��_�0�( J�$6�*J��%�4�I0���5� �G�O��
�o�eS�-Sfo!]
��Zyl3U�]�V�D�@գ�/��Ѧ��FI߄6#�!4��qS�6���Mf�b��g2PL�+�FAG�n�kV0}�~��Qԫ,@�p���	CA8wEh�Ģ������H�I%
��d$V��wݩt�@�#N�S}��?�"��х�/�$��p��/���:ϗ��r�� ��=�%N>� _���ɬ4�i������߱��YzX�Vs+#5?aB�M�V�r>b�A�=��r�vy�╣����G�e��Lv+�;�OU��v5�J��m�����P|fX��Z��JU��"���OI�ɩ'7�����rh|ɦ�f�W%wH l"j�*����gM��,Q�����:ZY.9�����p4��l��P���8�ج,���u�ƛoz��d	w�C@[��ɿG���)k	�[�>�*j���Z��=k?���	!�3�Gܮ�g���u�2˒Ij���k��:�>��UP,fl�����\^�0�	C��|1Z-.pB����yɎ�|��B�>���D��y�WL�V�F��kb�"���l�O}�'�4;R���EP���@�4#� �JT:���p�x��lt[���<z����4IfM�1��#M�3����_Ʌ��e�~�@H��eJ"�@��[�Gbg`NA��6��Hݽ�ͅ�mn�BKIr-r��͘.�v����ބ�ϳ;��٢�{	�����
d��}#}�˥�r�sXQ95K��Dz&�d�;��ҟ��{a�g)�*i	���Ww��o�V�e�����y�2�s��e՝�ri(,��2_A��e���˞���x�v/�"˯�e�ݠ���3��o���Ag�/(/����u�Y��n��iq��-�@��1��v�Ŏƛ\�:�n8>�lY��i���jxR�
����a>q�ש>�A��΍`��*�x'O�+\~��K皽���U5��,�7�]鳥�X��9����'B����,4�>fix'��oo��1��c~�s�A�����9����4G��a��e����?���7��|���7d�xu{LiE��t�%W�QlܙfӔ�=�#�(�"Y���"Av+��gB��w�l�D�.M�p[�U�:q�7��IdՃK��:�x�0m#O�;�6�h�����\�tөs�mN��0)��3\��4�ݦ���Q/|�Ļ\������)��ީ��vk��H��v�ɂ���'Sy]CM�g)zV��pfuW�^3�鷕Ҿ�JM���F8.��˲6��O���s���$/x�b����[���Ec�_j�IO즊mY��l@��r�=��<���I�&�T�V�Y���Z�4n�P�d����(��      �   
   x���          �   
   x���         