// ========================================
// PRODUTOS - Dados e funções auxiliares
// ========================================

const products = [
	{
		id: 1,
		name: "Fone de Ouvido Bluetooth Premium",
		slug: "fone-bluetooth-premium",
		price: 299.9,
		originalPrice: 499.9,
		discount: 40,
		image:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
		category: "Eletrônicos",
		rating: 4.5,
		reviews: 128,
		inStock: true,
		featured: true,
		description:
			"Fone de ouvido Bluetooth com cancelamento de ruído ativo, bateria de longa duração e qualidade de áudio premium.",
		specifications: {
			brand: "AudioTech",
			model: "AT-2000",
			color: "Preto",
			connectivity: "Bluetooth 5.0",
			battery: "30 horas",
		},
	},
	{
		id: 2,
		name: "Smart Watch Fitness Tracker",
		slug: "smartwatch-fitness",
		price: 599.9,
		originalPrice: 899.9,
		discount: 33,
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
		category: "Wearables",
		rating: 4.8,
		reviews: 256,
		inStock: true,
		featured: true,
		description:
			"Smartwatch com monitoramento de saúde 24/7, GPS integrado e resistente à água.",
		specifications: {
			brand: "FitPlus",
			model: "FP-500",
			color: "Preto/Prata",
			display: 'AMOLED 1.4"',
			battery: "7 dias",
		},
	},
	{
		id: 3,
		name: "Câmera DSLR Profissional",
		slug: "camera-dslr-pro",
		price: 3499.9,
		originalPrice: 4999.9,
		discount: 30,
		image:
			"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
		category: "Fotografia",
		rating: 4.9,
		reviews: 89,
		inStock: true,
		featured: false,
		description:
			"Câmera DSLR com sensor full-frame, 45MP, gravação 4K e sistema dual pixel.",
		specifications: {
			brand: "PhotoPro",
			model: "PP-X100",
			sensor: "Full Frame 45MP",
			video: "4K 60fps",
			iso: "100-51200",
		},
	},
	{
		id: 4,
		name: "Notebook Gamer Ultra",
		slug: "notebook-gamer-ultra",
		price: 7999.9,
		originalPrice: 9999.9,
		discount: 20,
		image:
			"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
		category: "Computadores",
		rating: 4.7,
		reviews: 142,
		inStock: true,
		featured: true,
		description:
			"Notebook gamer com RTX 4060, Intel i7 13ª geração, 16GB RAM e SSD 512GB.",
		specifications: {
			brand: "GameMax",
			processor: "Intel i7-13700H",
			gpu: "RTX 4060 8GB",
			ram: "16GB DDR5",
			storage: "512GB SSD NVMe",
		},
	},
	{
		id: 5,
		name: "Teclado Mecânico RGB",
		slug: "teclado-mecanico-rgb",
		price: 449.9,
		originalPrice: 699.9,
		discount: 36,
		image:
			"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
		category: "Periféricos",
		rating: 4.6,
		reviews: 203,
		inStock: true,
		featured: false,
		description:
			"Teclado mecânico com switches customizáveis, iluminação RGB e estrutura em alumínio.",
		specifications: {
			brand: "KeyPro",
			switches: "Cherry MX Red",
			layout: "ABNT2",
			connection: "USB-C + Bluetooth",
			lighting: "RGB por tecla",
		},
	},
	{
		id: 6,
		name: "Mouse Gamer Sem Fio",
		slug: "mouse-gamer-wireless",
		price: 299.9,
		originalPrice: 449.9,
		discount: 33,
		image:
			"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
		category: "Periféricos",
		rating: 4.4,
		reviews: 167,
		inStock: true,
		featured: false,
		description:
			"Mouse gamer sem fio com sensor óptico de alta precisão, 6 botões programáveis.",
		specifications: {
			brand: "ProGame",
			dpi: "25600 DPI",
			buttons: "6 programáveis",
			battery: "70 horas",
			weight: "85g",
		},
	},
	{
		id: 7,
		name: 'Monitor 4K Ultra HD 27"',
		slug: "monitor-4k-27",
		price: 1899.9,
		originalPrice: 2799.9,
		discount: 32,
		image:
			"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
		category: "Monitores",
		rating: 4.8,
		reviews: 95,
		inStock: true,
		featured: true,
		description:
			"Monitor 4K IPS com 99% sRGB, HDR400 e taxa de atualização de 144Hz.",
		specifications: {
			brand: "ViewMax",
			size: "27 polegadas",
			resolution: "3840x2160 4K",
			refreshRate: "144Hz",
			panel: "IPS",
		},
	},
	{
		id: 8,
		name: "Cadeira Gamer Ergonômica",
		slug: "cadeira-gamer-ergonomica",
		price: 1299.9,
		originalPrice: 1899.9,
		discount: 32,
		image:
			"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
		category: "Móveis",
		rating: 4.5,
		reviews: 178,
		inStock: true,
		featured: false,
		description:
			"Cadeira gamer com apoio lombar ajustável, reclinável até 180° e base em aço.",
		specifications: {
			brand: "ComfortPro",
			material: "Couro sintético",
			weightCapacity: "150kg",
			adjustments: "4D",
			recline: "90°-180°",
		},
	},
	{
		id: 9,
		name: "SSD NVMe 1TB",
		slug: "ssd-nvme-1tb",
		price: 449.9,
		originalPrice: 699.9,
		discount: 36,
		image:
			"https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80",
		category: "Armazenamento",
		rating: 4.9,
		reviews: 312,
		inStock: true,
		featured: false,
		description:
			"SSD NVMe PCIe 4.0 com velocidades de leitura de até 7000MB/s.",
		specifications: {
			brand: "SpeedDrive",
			capacity: "1TB",
			interface: "PCIe 4.0 NVMe",
			readSpeed: "7000 MB/s",
			writeSpeed: "5000 MB/s",
		},
	},
	{
		id: 10,
		name: "Caixa de Som Bluetooth Portátil",
		slug: "caixa-som-bluetooth",
		price: 349.9,
		originalPrice: 549.9,
		discount: 36,
		image:
			"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
		category: "Áudio",
		rating: 4.6,
		reviews: 224,
		inStock: true,
		featured: false,
		description:
			"Caixa de som Bluetooth resistente à água, 360° de áudio e 24h de bateria.",
		specifications: {
			brand: "SoundWave",
			power: "40W",
			battery: "24 horas",
			waterproof: "IPX7",
			connectivity: "Bluetooth 5.2",
		},
	},
	{
		id: 11,
		name: "Webcam Full HD 1080p",
		slug: "webcam-fullhd-1080p",
		price: 299.9,
		originalPrice: 449.9,
		discount: 33,
		image:
			"https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&q=80",
		category: "Periféricos",
		rating: 4.3,
		reviews: 156,
		inStock: true,
		featured: false,
		description:
			"Webcam Full HD com foco automático, microfone duplo e correção de luz.",
		specifications: {
			brand: "ViewCam",
			resolution: "1920x1080",
			fps: "60fps",
			microphone: "Dual estéreo",
			connection: "USB-C",
		},
	},
	{
		id: 12,
		name: 'Tablet Android 10" Premium',
		slug: "tablet-android-10",
		price: 1499.9,
		originalPrice: 2199.9,
		discount: 32,
		image:
			"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
		category: "Tablets",
		rating: 4.7,
		reviews: 189,
		inStock: true,
		featured: true,
		description:
			'Tablet com tela AMOLED 10", processador octa-core, 128GB e caneta stylus.',
		specifications: {
			brand: "TabletMax",
			screen: '10.1" AMOLED',
			processor: "Snapdragon 870",
			storage: "128GB",
			battery: "8000mAh",
		},
	},
];

// Funções auxiliares
function getProductById(id) {
	return products.find((p) => p.id === parseInt(id));
}

function getProductBySlug(slug) {
	return products.find((p) => p.slug === slug);
}

function getFeaturedProducts() {
	return products.filter((p) => p.featured);
}

function getProductsByCategory(category) {
	return products.filter((p) => p.category === category);
}

function getCategories() {
	return [...new Set(products.map((p) => p.category))];
}

function formatCurrency(value) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}
