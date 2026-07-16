const mysql = require("mysql2/promise");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "animal_finder",
};

const categories = [
  { id: 1, name: "Mammal" },
  { id: 2, name: "Bird" },
  { id: 3, name: "Reptile" },
  { id: 4, name: "Fish" },
  { id: 5, name: "Amphibian" },
];

const animals = [
  { name: "African Lion", species: "Panthera leo", category_id: 1, description: "The African lion is a large wild cat known as the king of the savanna. They live in prides and are apex predators.", habitat: "Savanna and grassland", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600" },
  { name: "Bengal Tiger", species: "Panthera tigris tigris", category_id: 1, description: "The Bengal tiger is one of the biggest wild cats alive. It is a powerful swimmer and a solitary hunter.", habitat: "Tropical rainforest and mangroves", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1508817628904-2f8a15e74ea0?w=600" },
  { name: "African Elephant", species: "Loxodonta africana", category_id: 1, description: "The African elephant is the largest land animal. They are highly intelligent and live in matriarchal herds.", habitat: "Savanna, forest, and grassland", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600" },
  { name: "Bald Eagle", species: "Haliaeetus leucocephalus", category_id: 2, description: "The bald eagle is a bird of prey found in North America. It is the national bird of the United States.", habitat: "Lakes, rivers, and coastal areas", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600" },
  { name: "Great White Shark", species: "Carcharodon carcharias", category_id: 4, description: "The great white shark is a large predatory fish found in coastal waters. It is known for its size and speed.", habitat: "Coastal and offshore waters", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=600" },
  { name: "Green Sea Turtle", species: "Chelonia mydas", category_id: 3, description: "The green sea turtle is a large sea turtle that migrates long distances between feeding and nesting grounds.", habitat: "Tropical and subtropical oceans", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600" },
  { name: "Red-Eyed Tree Frog", species: "Agalychnis callidryas", category_id: 5, description: "The red-eyed tree frog is a colorful amphibian from Central America. Its bright colors warn predators.", habitat: "Rainforest canopy near water", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Giraffe", species: "Giraffa camelopardalis", category_id: 1, description: "The giraffe is the tallest living terrestrial animal, known for its extremely long neck and legs.", habitat: "Savanna and open woodland", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600" },
  { name: "Penguin", species: "Spheniscidae", category_id: 2, description: "Penguins are flightless seabirds adapted for life in the water. They are excellent swimmers.", habitat: "Coastal Antarctica and southern oceans", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1598439210621-3285d7844b71?w=600" },
  { name: "Komodo Dragon", species: "Varanus komodoensis", category_id: 3, description: "The Komodo dragon is the largest living lizard. It is found on several Indonesian islands.", habitat: "Tropical savanna and forest", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=600" },
  { name: "Cheetah", species: "Acinonyx jubatus", category_id: 1, description: "The cheetah is the fastest land animal, capable of reaching speeds up to 70 mph in short bursts.", habitat: "Savanna and grassland", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600" },
  { name: "Gorilla", species: "Gorilla beringei", category_id: 1, description: "Gorillas are the largest living primates. They are ground-dwelling herbivores found in African forests.", habitat: "Tropical and subtropical forest", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1554176259-aa961fc32671?w=600" },
  { name: "Hippopotamus", species: "Hippopotamus amphibius", category_id: 1, description: "The hippopotamus is a large semiaquatic mammal native to sub-Saharan Africa.", habitat: "Rivers, lakes, and swamps", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600" },
  { name: "Zebra", species: "Equus quagga", category_id: 1, description: "Zebras are African equids known for their distinctive black-and-white striped coats.", habitat: "Grassland and savanna", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1526095179574-86e545f0e1b7?w=600" },
  { name: "Koala", species: "Phascolarctos cinereus", category_id: 1, description: "Koalas are tree-dwelling marsupials native to Australia. They feed mostly on eucalyptus leaves.", habitat: "Eucalyptus forests", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1540573133985-87b6da6a61f8?w=600" },
  { name: "Kangaroo", species: "Macropus", category_id: 1, description: "Kangaroos are iconic Australian marsupials known for their powerful hind legs and jumping locomotion.", habitat: "Grassland, forest, and savanna", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1579169803726-e8269bd6a58e?w=600" },
  { name: "Polar Bear", species: "Ursus maritimus", category_id: 1, description: "The polar bear is the largest carnivore on land, adapted to living in the Arctic.", habitat: "Arctic sea ice and tundra", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600" },
  { name: "Gray Wolf", species: "Canis lupus", category_id: 1, description: "Gray wolves are social canines that live and hunt in packs across North America and Eurasia.", habitat: "Forests, tundra, and grasslands", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1564166174574-0966e6b94198?w=600" },
  { name: "Leopard", species: "Panthera pardus", category_id: 1, description: "Leopards are elusive big cats known for their spotted coats and ability to climb trees.", habitat: "Savanna, rainforest, and mountains", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600" },
  { name: "Panda", species: "Ailuropoda melanoleuca", category_id: 1, description: "Giant pandas are bear-like mammals native to China, famous for their black-and-white coloring and bamboo diet.", habitat: "Bamboo forests", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600" },
  { name: "Sloth", species: "Folivora", category_id: 1, description: "Sloths are slow-moving mammals that spend most of their lives hanging upside down in trees.", habitat: "Tropical rainforest", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1525715682192-11e5c29f6b3b?w=600" },
  { name: "Ostrich", species: "Struthio camelus", category_id: 2, description: "The ostrich is the largest flightless bird. It is native to Africa and can run at high speeds.", habitat: "Savanna and desert", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1552728089-57bdde30ebd1?w=600" },
  { name: "Flamingo", species: "Phoenicopterus", category_id: 2, description: "Flamingos are pink wading birds known for their long legs and distinctive curved bills.", habitat: "Lakes, lagoons, and wetlands", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1497206365907-f5e2ee707f35?w=600" },
  { name: "Peacock", species: "Pavo cristatus", category_id: 2, description: "Peacocks are colorful birds famous for the elaborate tail feathers displayed by males.", habitat: "Forest and grassland", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1552727436-c0c93da52765?w=600" },
  { name: "Snowy Owl", species: "Bubo scandiacus", category_id: 2, description: "Snowy owls are large white owls native to Arctic regions. They are powerful daytime hunters.", habitat: "Arctic tundra", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1549208570-55559f39e4c2?w=600" },
  { name: "Hummingbird", species: "Trochilidae", category_id: 2, description: "Hummingbirds are tiny birds capable of hovering in place and flying backward.", habitat: "Forest, gardens, and meadows", diet: "Nectarivore", image_url: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600" },
  { name: "Parrot", species: "Psittaciformes", category_id: 2, description: "Parrots are intelligent, colorful birds known for their ability to mimic sounds and human speech.", habitat: "Tropical and subtropical forests", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1552728089-57bdde30ebd1?w=600" },
  { name: "Kingfisher", species: "Alcedinidae", category_id: 2, description: "Kingfishers are small to medium-sized birds known for diving into water to catch fish.", habitat: "Rivers, lakes, and coastlines", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1444464666168-68a4949a2727?w=600" },
  { name: "Cobra", species: "Ophiophagus hannah", category_id: 3, description: "The king cobra is the world's longest venomous snake, found in forests across South and Southeast Asia.", habitat: "Rainforest, mangroves, and grassland", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=600" },
  { name: "Chameleon", species: "Chamaeleonidae", category_id: 3, description: "Chameleons are lizards famous for their color-changing skin and independently moving eyes.", habitat: "Forest and savanna", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=600" },
  { name: "Iguana", species: "Iguana iguana", category_id: 3, description: "Green iguanas are large herbivorous lizards native to Central and South America.", habitat: "Rainforest and near water", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1504450874802-0ed58ffa1d47?w=600" },
  { name: "Crocodile", species: "Crocodylidae", category_id: 3, description: "Crocodiles are large aquatic reptiles that live throughout the tropics in Africa, Asia, the Americas, and Australia.", habitat: "Rivers, lakes, and wetlands", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600" },
  { name: "Gecko", species: "Gekkonidae", category_id: 3, description: "Geckos are small lizards found in warm climates. Many species can climb smooth vertical surfaces.", habitat: "Tropical and subtropical regions", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1504450874802-0ed58ffa1d47?w=600" },
  { name: "Alligator", species: "Alligator mississippiensis", category_id: 3, description: "American alligators are large reptiles found in the southeastern United States.", habitat: "Freshwater wetlands", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1579961237030-0d0349c36747?w=600" },
  { name: "Anaconda", species: "Eunectes murinus", category_id: 3, description: "The green anaconda is one of the heaviest snakes in the world, found in South America.", habitat: "Rivers and swamps", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=600" },
  { name: "Clownfish", species: "Amphiprioninae", category_id: 4, description: "Clownfish are small, brightly colored fish that live in symbiosis with sea anemones.", habitat: "Coral reefs", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600" },
  { name: "Blue Tang", species: "Paracanthurus hepatus", category_id: 4, description: "The blue tang is a popular reef fish known for its vibrant blue body and yellow tail.", habitat: "Coral reefs", diet: "Herbivore", image_url: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600" },
  { name: "Manta Ray", species: "Mobula birostris", category_id: 4, description: "Manta rays are large, graceful rays that glide through tropical and subtropical oceans.", habitat: "Open ocean and coral reefs", diet: "Planktivore", image_url: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=600" },
  { name: "Angelfish", species: "Pterophyllum", category_id: 4, description: "Freshwater angelfish are popular aquarium fish with distinctive triangular bodies.", habitat: "Amazon Basin rivers", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600" },
  { name: "Seahorse", species: "Hippocampus", category_id: 4, description: "Seahorses are tiny marine fish with horse-like heads and prehensile tails. Males carry the eggs.", habitat: "Seagrass beds and coral reefs", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1504450874802-0ed58ffa1d47?w=600" },
  { name: "Pufferfish", species: "Tetraodontidae", category_id: 4, description: "Pufferfish can inflate themselves into a ball shape as a defense against predators.", habitat: "Tropical and temperate oceans", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600" },
  { name: "Salmon", species: "Salmo salar", category_id: 4, description: "Atlantic salmon are migratory fish born in rivers but spend most of their lives in the ocean.", habitat: "Rivers and North Atlantic Ocean", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1579169803726-e8269bd6a58e?w=600" },
  { name: "Axolotl", species: "Ambystoma mexicanum", category_id: 5, description: "Axolotls are aquatic salamanders famous for their ability to regenerate limbs and stay in larval form.", habitat: "Lakes in Mexico", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Poison Dart Frog", species: "Dendrobatidae", category_id: 5, description: "Poison dart frogs are small, brightly colored amphibians with toxic skin in the wild.", habitat: "Tropical rainforest", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Salamander", species: "Caudata", category_id: 5, description: "Salamanders are slender amphibians with moist skin and long tails.", habitat: "Forests, wetlands, and streams", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Newt", species: "Pleurodelinae", category_id: 5, description: "Newts are small semiaquatic amphibians that can regenerate body parts.", habitat: "Ponds, streams, and wetlands", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Toad", species: "Bufonidae", category_id: 5, description: "Toads are amphibians with dry, bumpy skin and short legs. They live on land and water.", habitat: "Gardens, forests, and wetlands", diet: "Insectivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Caecilian", species: "Gymnophiona", category_id: 5, description: "Caecilians are legless, worm-like amphibians that live underground or in water.", habitat: "Tropical soil and freshwater", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600" },
  { name: "Arctic Fox", species: "Vulpes lagopus", category_id: 1, description: "The Arctic fox is a small mammal adapted to cold Arctic environments, with thick white winter fur.", habitat: "Arctic tundra", diet: "Carnivore", image_url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600" },
  { name: "Toucan", species: "Ramphastidae", category_id: 2, description: "Toucans are tropical birds known for their large, colorful bills and bright plumage.", habitat: "Tropical rainforest", diet: "Omnivore", image_url: "https://images.unsplash.com/photo-1552728089-57bdde30ebd1?w=600" },
];

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection(config);

    await connection.execute(`SET FOREIGN_KEY_CHECKS = 0`);
    await connection.execute(`DROP TABLE IF EXISTS animals`);
    await connection.execute(`DROP TABLE IF EXISTS categories`);
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 1`);

    await connection.execute(`
      CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )
    `);

    await connection.execute(`
      CREATE TABLE animals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        species VARCHAR(100) NOT NULL,
        category_id INT NOT NULL,
        description TEXT,
        habitat VARCHAR(200),
        diet VARCHAR(50),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);

    for (const category of categories) {
      await connection.execute(
        `INSERT INTO categories (name) VALUES (?)`,
        [category.name]
      );
    }

    for (const animal of animals) {
      await connection.execute(
        `INSERT INTO animals (name, species, category_id, description, habitat, diet, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          animal.name,
          animal.species,
          animal.category_id,
          animal.description,
          animal.habitat,
          animal.diet,
          animal.image_url,
        ]
      );
    }

    console.log(`✅ Database seeded successfully with ${animals.length} animals.`);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
