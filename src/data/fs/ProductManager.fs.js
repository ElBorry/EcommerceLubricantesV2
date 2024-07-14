import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  //Method to create a new Products file:
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const prodArray = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, prodArray);
      console.log("File created");
    } else {
      console.log("File already exists");
    }
  }
  //Method to create a new Product:
  async create(data) {
    try {
      // const data = {
      //   id: data.id || crypto.randomBytes(12).toString("hex"),
      //   title: data.title,
      //   photo:
      //     data.photo ||
      //     "https://www.yoghurtdigital.com.au/wp-content/uploads/2021/10/2-1024x546.png",
      //   category: data.category,
      //   price: data.price || 1,
      //   stock: data.stock || 1,
      // };
      let allProd = await fs.promises.readFile(this.path, "utf-8");
      allProd = JSON.parse(allProd);
      allProd.push(data);
      allProd = JSON.stringify(allProd, null, 2);
      await fs.promises.writeFile(this.path, allProd);
      console.log("Product created successfully");
      return data;
    } catch (error) {
      throw error;
    }
  }
  //Method to read Products List from file:
  async read(filter) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      filter && all.filter((each) => each.category === filter);
      if (!all) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  //Method to find a product by id in the file:
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  //Method for pagination:
  async paginate({ filter, opts }) {
    try {
      let products = await this.readFile(this.path, "utf-8");
      if (filter.category) {
        products = products.filter((product) =>
          product.category.includes(filter.category)
        );
      }
      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + limit);
      const totalDocs = products.length;
      if (totalDocs === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      const all = {
        docs: paginatedProducts,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
      return all;
    } catch (error) {
      throw error;
    }
  }

  //Method to update a product by id
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  //Method to destroy a product in the file:
  async destroy(id) {
    try {
      let one = await this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        let restOfProducts = await fs.promises.readFile(this.path, "utf-8");
        restOfProducts = JSON.parse(restOfProducts);
        restOfProducts = restOfProducts.filter((each) => each._id !== id);
        restOfProducts = JSON.stringify(restOfProducts, null, 2);
        await fs.promises.writeFile(this.path, restOfProducts);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

// async function test() {
//   try {
//     const oneProduct = new ProductManager();
//     await oneProduct.create({
//       title: "Placa de Video NVIDIA RTX3050",
//       photo:
//         "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4JkhqS-Ely_Ta88xMcOi__n2bOjslJEDA2PDPv5UxbXga_z20Gxb4vHXrf17H8Rs0OwOQrJpiKeLRjKiThVAuPzaHvhbkkek0g2qJor9UhNHmNN48a_lgGVy_fKCTaZ7QBTT9HQ&usqp=CAc",
//       category: "Placa de Video",
//       price: 350000,
//       stock: 10,
//     });
//     await oneProduct.create({
//       title: "Monitor Samsung 24 pulgadas",
//       photo:
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQj0H1qt8qmIB18KW_eCrRATlSsYynzOMwetONPi5OjWFYhiPedKPAHq8AD1pKE0guhyjFog9zVt-0Mxtx8-Vs49WIhQAwrsh7fzO5L1zPFfE1Y3Q2rSs-91nib_7otVzcKaQ9oEQQ&usqp=CAc",
//       category: "Monitor",
//       price: 150000,
//       stock: 30,
//     });

//     await oneProduct.create({
//       title: "Microprocesador AMD Ryzen 7",
//       photo:
//         "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSLbRDaY8DfDrUTM_kA09Cue19R_U9kJsOt4KoZm7RtVhPdOTdx56d_Kx_spBCEhyS2gk4JGNdIqDYGpyhFU12UiP8YRjvCmWoRc4bdbmYvXEwq0TXnrnIBPZszEZt9asDmHDOx3Q&usqp=CAc",
//       category: "Microprocesador",
//       price: 250000,
//       stock: 5,
//     });

//     await oneProduct.create({
//       title: "Silla Gamer MID PLUS ROJA",
//       photo:
//         "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREiF0GpqUGjzkhDRV6Iz6_lsPLzx291sPq-3YxFufDah30bFo3imajsQr1FjNPkoT91hMdCZKG2AGydPwLcz-eXDYmDrICFKlSW3FbL6_qDByVI6SmJvb2fTaHhKUCyTXCVQmQawPztA&usqp=CAc",
//       category: "Silla Gamer",
//       price: 150000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Mother Asus Prime A320M-K",
//       photo:
//         "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhIPSynvgTk-vh_BHSzdV2_CPg4Pnb030S2iirwACg81d1ZSCF0etFy49xYpLt4YcajVeQVNG2WB5SnO2-kfMi0WTe_SwdaiSflUfthhxFUhaIW13LkivVEQ-31nn7wN3Q4G3MxmphhQ&usqp=CAc",
//       category: "Motherboard",
//       price: 185000,
//       stock: 50,
//     });

//     await oneProduct.create({
//       title: "Teclado RGB",
//       photo:
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR5jZwDRd3mThJci_hYp1fAYM78pa-4Rfqr7NjBDqQbQ3pE54m8tJulPCkfaUbLlfFNyMG06dLS6rIEVLlSNizThxcYowow9yTakBiKY1LK3QibPgyZWPTp83hLY1x8IuDy9HX7LYY&usqp=CAc",
//       category: "Periféricos",
//       price: 55000,
//       stock: 150,
//     });

//     await oneProduct.create({
//       title: "Fuente de alimentación 600W",
//       photo:
//         "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSnYnAy9-0XzyrOacr8jxmIZywlTkH5R3x9yB6TGb4DdZlTHsuadm7ljE4kUSvYcQ3Zsqs6eD2IKqMHr5V2Vlhj30WPZL1fvMyAF9cgzzJtEQ7d-lpNi4ioV5DHZkBfTZtt5K_ChEE&usqp=CAc",
//       category: "Fuentes",
//       price: 90000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Auriculares con micrófono",
//       photo:
//         "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRc6JasiBo_GZCHUVonwVcwHWAdA5Dzb0p7kDifWwo1s2ETsG-RUM1bXaXPO80k3grkG1xe4DXsO2dtncxs7DxKbrRKbU3vG6Deg_LF-_p5rMxVpPZkXoV0HICvf_mYBwmKKyVEYA&usqp=CAc",
//       category: "Componentes",
//       price: 35000,
//       stock: 34,
//     });

//     await oneProduct.create({
//       title: "Tarjeta de red Wi-Fi AC1200",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_781087-MEC52026758551_102022-O.webp",
//       category: "Componentes",
//       price: 120000,
//       stock: 22,
//     });

//     //Este se usa para probar métodos con parámetro id
//     await oneProduct.create({
//       id: "123456789",
//       title: "Memoria RAM DDR4 16GB",
//       photo:
//         "https://www.fullh4rd.com.ar/img/productos/4/memoria-16gb-ddr4-3200-kingston-fury-beast-0.jpg",
//       category: "Memoria RAM",
//       price: 200000,
//       stock: 5,
//     });

//     await oneProduct.create({
//       title: "Procesador AMD Ryzen 7 5800X",
//       photo:
//         "https://statics.qloud.ar/scp-hardstore-10-2020/181_02-10-2023-12-10-44-ryzen-general-s-cooler.jpg",
//       category: "Microprocesador",
//       price: 450000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Memoria RAM Corsair Vengeance RGB Pro 16GB",
//       photo: "https://gorilagames.com/img/Public/1019-producto-cor-2088.jpg",
//       category: "Memoria RAM",
//       price: 200000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Disco Duro SSD Samsung 1TB",
//       photo: "https://rec-line.com/img/productos/467x467/mz-77q1t0bw.webp",
//       category: "Almacenamiento",
//       price: 180000,
//       stock: 25,
//     });

//     await oneProduct.create({
//       title: "Monitor LG UltraWide 34 pulgadas",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_745170-MLA44913793139_022021-F.webp",
//       category: "Monitor",
//       price: 550000,
//       stock: 8,
//     });

//     await oneProduct.create({
//       title: "Teclado mecánico Corsair K95 RGB Platinum",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_915840-MLA41277723080_032020-O.webp",
//       category: "Periféricos",
//       price: 280000,
//       stock: 12,
//     });

//     await oneProduct.create({
//       title: "Ratón Logitech G502 HERO",
//       photo: "https://outtec.com.ar/wp-content/uploads/2020/09/5-26.jpg",
//       category: "Periféricos",
//       price: 150000,
//       stock: 30,
//     });

//     await oneProduct.create({
//       title: "Tarjeta madre ASUS ROG Strix B550-F",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_658310-MLA44250562605_122020-F.webp",
//       category: "Motherboard",
//       price: 280000,
//       stock: 10,
//     });

//     await oneProduct.create({
//       title: "Fuente de alimentación Corsair RM750x",
//       photo: "https://www.compu-santafe.com.ar/productos/get-imagen/39760",
//       category: "Fuentes",
//       price: 200000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Caja de PC NZXT H510",
//       photo:
//         "https://nzxt.com/assets/cms/34299/1615563443-h510-elite-white-black-kraken-x-system-purple-lighting-2.png?auto=format&fit=crop&h=1000&w=1000",
//       category: "Componentes",
//       price: 120000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Ventilador Corsair LL120 RGB",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_673754-MLA31604773219_072019-O.webp",
//       category: "Componentes",
//       price: 50000,
//       stock: 40,
//     });

//     await oneProduct.create({
//       title: "Notebook ASUS ROG Strix G15",
//       photo:
//         "https://tiendadiggit.com.ar/web/image/product.image/3870/image_1024/Notebook%20gamer%20ROG%20Strix%20G15%20G513RM-HQ084W%20Ryzen%207%2016GB%20512GB%20Win11%2015%2C6%22%20RTX3060?unique=cab8f7c",
//       category: "Notebook",
//       price: 1200000,
//       stock: 10,
//     });

//     await oneProduct.create({
//       title: "Silla Gamer Corsair T3 RUSH",
//       photo:
//         "https://lezamapc.com.ar/42385-large_default/silla-gamer-corsair-t3-rush-gris-y-blanco.jpg",
//       category: "Silla Gamer",
//       price: 450000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Teclado Logitech G915 LIGHTSPEED",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_634380-MLA47123465991_082021-F.webp",
//       category: "Periféricos",
//       price: 320000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Ventilador NZXT Aer RGB 2",
//       photo:
//         "https://intercompras.com/product_thumb.php?img=images/product/NZXT_HF-28120-B1.jpg&w=380&h=320",
//       category: "Componentes",
//       price: 55000,
//       stock: 35,
//     });

//     await oneProduct.create({
//       title: "Silla Gamer DXRacer Racing Series",
//       photo: "https://www.dxracer.com.ar/media/wysiwyg/blog-img/Post13_3.webp",
//       category: "Silla Gamer",
//       price: 550000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Teclado SteelSeries Apex Pro",
//       photo:
//         "https://www.phi-digital.com/wp-content/uploads/2021/11/Teclado-PC-SteelSeries-Apex-Pro-TKL3.jpg",
//       category: "Periféricos",
//       price: 350000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Notebook MSI GS66 Stealth",
//       photo:
//         "https://asset.msi.com/resize/image/global/product/product_16201127146a9e35ad72a89f7fe35093aa45459f1d.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
//       category: "Notebooks",
//       price: 1800000,
//       stock: 8,
//     });

//     await oneProduct.create({
//       title: "Ventilador Corsair ML120 PRO RGB",
//       photo:
//         "https://gorilagames.com/img/Public/1019-producto-fan-cooler-corsair-ml120-pro-120mm-red-magnetic-levitation-1-9438.jpg",
//       category: "Componentes",
//       price: 60000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Silla Gamer AKRacing Masters Series",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_902030-MLU73935141899_012024-O.webp",
//       category: "Silla Gamer",
//       price: 650000,
//       stock: 10,
//     });

//     await oneProduct.create({
//       title: "Teclado Razer Huntsman Elite",
//       photo:
//         "https://imagenes.newcomputers.com.ar/foto.php?src=/fotosweb/146/14655.jpg&ancho=750&alto=750",
//       category: "Periféricos",
//       price: 380000,
//       stock: 25,
//     });

//     await oneProduct.create({
//       title: "Ventilador Rosewill RGBF-S12002",
//       photo: "https://m.media-amazon.com/images/I/71dPXVDUZvL._AC_SL1500_.jpg",
//       category: "Componentes",
//       price: 45000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Ventilador Lian Li UNI FAN AL120 Triple Pack",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_859261-MLA71614587997_092023-F.webp",
//       category: "Componentes",
//       price: 63000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Ventilador Enermax T.B.RGB",
//       photo: "https://img.pccomponentes.com/articles/15/154596/g2.jpg",
//       category: "Componentes",
//       price: 50000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Ventilador Antec Prizm 120 ARGB 5+C",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_771351-MLA72443708728_102023-F.webp",
//       category: "Componentes",
//       price: 54000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Ventilador SilverStone Air Blazer 120i Lite ARGB",
//       photo:
//         "https://image.jimcdn.com/app/cms/image/transf/dimension=460x1024:format=png/path/s2684573ae5b0a4ee/image/icc7a954cc09c79e9/version/1614520860/image.png",
//       category: "Componentes",
//       price: 47000,
//       stock: 25,
//     });

//     await oneProduct.create({
//       title: "Ventilador Cougar Vortex RGB HPB 120 PWM HDB",
//       photo:
//         "https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2018/12/15.png",
//       category: "Componentes",
//       price: 49000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Ventilador NZXT Kraken X73 RGB",
//       photo:
//         "https://http2.mlstatic.com/D_NQ_NP_2X_797188-MLA45122551213_032021-F.webp",
//       category: "Componentes",
//       price: 62000,
//       stock: 15,
//     });

//     await oneProduct.create({
//       title: "Ventilador Thermaltake Pure 12 ARGB TT Premium Edition",
//       photo:
//         "https://www.soscomputacion.com.ar/29553-thickbox_default/fan-cooler-controladora-thermaltake-pure-12-argb-premium-edition-pack-x3.jpg",
//       category: "Componentes",
//       price: 55000,
//       stock: 20,
//     });

//     await oneProduct.create({
//       title: "Ventilador Corsair SP120 RGB PRO",
//       photo: "https://cellplay.com.ar/img/Public/producto-95521359-0.jpg",
//       category: "Componentes",
//       price: 48000,
//       stock: 25,
//     });

//     await oneProduct.create({
//       title: "Ventilador Deepcool CF120 3IN1",
//       photo:
//         "https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cooling/Fans/CF120_PLUS/Gallery/608X760/02.jpg?fm=webp&q=60",
//       category: "Componentes",
//       price: 46000,
//       stock: 20,
//     });

//     //await oneProduct.read();
//     // await oneProduct.readOne("123456789");
//     // await oneProduct.destroy("123456789");
//   } catch (error) {
//     throw error;
//   }
// }

//test();

const productManager = new ProductManager();
export default productManager;
