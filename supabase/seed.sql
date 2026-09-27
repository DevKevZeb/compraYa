-- Demo catalog for local development and the hosted demo project.
-- Product data and images come from https://dummyjson.com (free demo API).
-- Prices are converted to bolivianos (Bs).

insert into public.categorias (nombre_categoria) values
  ('Tecnología'),
  ('Hogar'),
  ('Moda'),
  ('Belleza'),
  ('Deportes'),
  ('Accesorios');

-- Tecnología
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'iPhone 5s', 'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it''s an older model, it still provides a reliable user experience.', 1391.90, 25, 57, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Apple'), ('Peso', '2 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Apple MacBook Pro 14 Inch Space Grey', 'The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple''s M1 Pro chip for exceptional performance and a stunning Retina display.', 13919.90, 24, 73, 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Apple'), ('Peso', '9 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'iPad Mini 2021 Starlight', 'The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.', 3479.90, 47, 64, 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Apple'), ('Peso', '5 kg'), ('Garantía', '2 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Amazon Echo Plus', 'The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.', 695.90, 61, 100, 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Amazon'), ('Peso', '5 kg'), ('Garantía', '6 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'iPhone 6', 'The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.', 2087.90, 60, 68, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Apple'), ('Peso', '7 kg'), ('Garantía', '1 month warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Asus Zenbook Pro Dual Screen Laptop', 'The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.', 12527.90, 45, 79, 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Asus'), ('Peso', '9 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Samsung Galaxy Tab S8 Plus Grey', 'The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it''s ideal for productivity and entertainment.', 4175.90, 62, 94, 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Samsung'), ('Peso', '1 kg'), ('Garantía', '3 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Apple Airpods', 'The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.', 904.70, 67, 83, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Tecnología'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Apple'), ('Peso', '4 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);

-- Hogar
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Annibale Colombo Bed', 'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.', 13223.90, 88, 95, 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Annibale Colombo'), ('Peso', '10 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Decoration Swing', 'The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.', 417.50, 47, 63, 'https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '4 kg'), ('Garantía', '1 week warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Bamboo Spatula', 'The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.', 55.60, 37, 65, 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '3 kg'), ('Garantía', '1 month warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Annibale Colombo Sofa', 'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.', 17399.90, 60, 78, 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Annibale Colombo'), ('Peso', '6 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Family Tree Photo Frame', 'The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.', 208.70, 77, 91, 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '1 kg'), ('Garantía', '1 month warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Black Aluminium Cup', 'The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.', 41.70, 75, 89, 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '7 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Bedside Table African Cherry', 'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.', 2087.90, 64, 57, 'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Furniture Co.'), ('Peso', '2 kg'), ('Garantía', '5 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'House Showpiece Plant', 'The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.', 278.30, 28, 93, 'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Hogar'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '8 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);

-- Moda
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Blue & Black Check Shirt', 'The Blue & Black Check Shirt is a stylish and comfortable men''s shirt featuring a classic check pattern. Made from high-quality fabric, it''s suitable for both casual and semi-formal occasions.', 208.70, 38, 73, 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Fashion Trends'), ('Peso', '4 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Blue Frock', 'The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.', 208.70, 52, 83, 'https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '5 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Black Women''s Gown', 'The Black Women''s Gown is an elegant and timeless evening gown. With a sleek black design, it''s perfect for formal events and special occasions, exuding sophistication and style.', 904.70, 25, 73, 'https://cdn.dummyjson.com/product-images/womens-dresses/black-women''s-gown/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '2 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Nike Air Jordan 1 Red And Black', 'The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.', 1043.90, 7, 95, 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Nike'), ('Peso', '3 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Black & Brown Slipper', 'The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation.', 139.10, 3, 51, 'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Comfort Trends'), ('Peso', '5 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Blue Women''s Handbag', 'The Blue Women''s Handbag is a stylish and spacious accessory for everyday use. With a vibrant blue color and multiple compartments, it combines fashion and functionality.', 347.90, 76, 58, 'https://cdn.dummyjson.com/product-images/womens-bags/blue-women''s-handbag/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Fashionista'), ('Peso', '7 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Gigabyte Aorus Men Tshirt', 'The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it''s perfect for expressing your gaming style.', 173.90, 90, 64, 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Gigabyte'), ('Peso', '4 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Girl Summer Dress', 'The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it''s perfect for keeping cool and stylish during the summer.', 139.10, 43, 95, 'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Moda'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '5 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);

-- Belleza
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Essence Mascara Lash Princess', 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.', 69.50, 99, 51, 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Essence'), ('Peso', '4 kg'), ('Garantía', '1 week warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Calvin Klein CK One', 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It''s a versatile fragrance suitable for everyday wear.', 347.90, 29, 87, 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Calvin Klein'), ('Peso', '7 kg'), ('Garantía', '1 week warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Attitude Super Leaves Hand Soap', 'Attitude Super Leaves Hand Soap is a natural and nourishing hand soap enriched with the goodness of super leaves. It cleanses and moisturizes your hands, leaving them feeling fresh and soft.', 62.60, 94, 64, 'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Attitude'), ('Peso', '1 kg'), ('Garantía', '6 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Eyeshadow Palette with Mirror', 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it''s convenient for on-the-go makeup application.', 139.10, 34, 57, 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Glamour Beauty'), ('Peso', '9 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Chanel Coco Noir Eau De', 'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.', 904.70, 58, 85, 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Chanel'), ('Peso', '7 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Olay Ultra Moisture Shea Butter Body Wash', 'Olay Ultra Moisture Shea Butter Body Wash is a luxurious body wash that hydrates and nourishes your skin with the moisturizing power of shea butter. Enjoy a rich lather and silky-smooth skin.', 90.40, 34, 90, 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Olay'), ('Peso', '4 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Powder Canister', 'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.', 104.30, 89, 93, 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Velvet Touch'), ('Peso', '8 kg'), ('Garantía', '3 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Dior J''adore', 'J''adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.', 626.30, 98, 76, 'https://cdn.dummyjson.com/product-images/fragrances/dior-j''adore/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Belleza'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Dior'), ('Peso', '4 kg'), ('Garantía', '1 week warranty')) as a (nombre, valor);

-- Deportes
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'American Football', 'The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.', 139.10, 53, 98, 'https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '2 kg'), ('Garantía', '6 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Baseball Ball', 'The Baseball Ball is a standard baseball used in baseball games. It features a durable leather cover and is designed for pitching, hitting, and fielding in the game of baseball.', 62.60, 100, 51, 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '5 kg'), ('Garantía', '6 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Baseball Glove', 'The Baseball Glove is a protective glove worn by baseball players. It is designed to catch and field the baseball, providing players with comfort and control during the game.', 173.90, 22, 79, 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '1 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Basketball', 'The Basketball is a standard ball used in basketball games. It is designed for dribbling, shooting, and passing in the game of basketball, suitable for both indoor and outdoor play.', 104.30, 75, 93, 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '7 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Basketball Rim', 'The Basketball Rim is a sturdy hoop and net assembly mounted on a basketball backboard. It provides a target for shooting and scoring in the game of basketball.', 278.30, 43, 92, 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '1 kg'), ('Garantía', '3 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Cricket Ball', 'The Cricket Ball is a hard leather ball used in the sport of cricket. It is bowled and batted in the game, and its hardness and seam contribute to the dynamics of cricket play.', 90.40, 30, 71, 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '7 kg'), ('Garantía', '3 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Cricket Bat', 'The Cricket Bat is an essential piece of cricket equipment used by batsmen to hit the cricket ball. It is made of wood and comes in various sizes and designs.', 208.70, 98, 63, 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '10 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Cricket Helmet', 'The Cricket Helmet is a protective headgear worn by cricket players, especially batsmen and wicketkeepers. It provides protection against fast bowling and bouncers.', 313.10, 10, 94, 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Deportes'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '10 kg'), ('Garantía', 'Lifetime warranty')) as a (nombre, valor);

-- Accesorios
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Brown Leather Belt Watch', 'The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.', 626.30, 32, 84, 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Fashion Timepieces'), ('Peso', '10 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'IWC Ingenieur Automatic Steel', 'The IWC Ingenieur Automatic Steel watch is a durable and sophisticated timepiece. With a stainless steel case and automatic movement, it combines precision and style for watch enthusiasts.', 34799.90, 90, 59, 'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'IWC'), ('Peso', '3 kg'), ('Garantía', '1 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Black Sun Glasses', 'The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.', 208.70, 60, 88, 'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Fashion Shades'), ('Peso', '1 kg'), ('Garantía', 'No warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Green Crystal Earring', 'The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions.', 208.70, 54, 79, 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '2 kg'), ('Garantía', '5 year warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Longines Master Collection', 'The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it''s a symbol of luxury and sophistication.', 10439.90, 100, 77, 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Longines'), ('Peso', '4 kg'), ('Garantía', '1 week warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Rolex Cellini Moonphase', 'The Rolex Cellini Moonphase watch is a masterpiece of horology. Featuring a moon phase complication, it showcases the craftsmanship and elegance that Rolex is renowned for.', 111359.90, 52, 77, 'https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Rolex'), ('Peso', '10 kg'), ('Garantía', '1 month warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Classic Sun Glasses', 'The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.', 173.90, 1, 77, 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Marca', 'Fashion Shades'), ('Peso', '8 kg'), ('Garantía', '6 months warranty')) as a (nombre, valor);
with p as (
  insert into public.productos (categoria_id, nombre_producto, descripcion, precio, stock, popularidad, url_imagen)
  select categoria_id, 'Green Oval Earring', 'The Green Oval Earring is a stylish and versatile accessory with a unique oval shape. Whether for casual or dressy occasions, its green hue and contemporary design make it a standout piece.', 173.90, 73, 71, 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/thumbnail.webp'
  from public.categorias where nombre_categoria = 'Accesorios'
  returning producto_id
)
insert into public.atributos_producto (producto_id, nombre_atributo, valor_atributo)
select producto_id, a.nombre, a.valor from p, (values ('Peso', '10 kg'), ('Garantía', '3 months warranty')) as a (nombre, valor);
