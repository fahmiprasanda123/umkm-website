/**
 * Nusantara Artisan & Co. - Core Application Logic
 * 100% Database-free, Static Jamstack with LocalStorage & JSON sync
 */

// Global State
window.UMKM_APP = {
  data: null,
  cart: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  activeProductModal: null
};

// Default fallback data in case of file:// protocol CORS restriction
const DEFAULT_FALLBACK_DATA = {
  profile: {
    storeName: "Nusantara Artisan & Co.",
    tagline: "Kreasi Otentik & Cita Rasa Terbaik dari Pengrajin Lokal",
    logoType: "icon",
    logoIcon: "fa-solid fa-leaf",
    logoImage: "",
    description: "Menyajikan ragam produk kebanggaan nusantara: biji kopi pilihan, aneka camilan & sambal rumahan resep otentik, serta kerajinan tangan bernilai seni tinggi karya pengrajin daerah.",
    phone: "6281234567890",
    email: "halo@nusantaraco.id",
    address: "Jl. Malioboro No. 45, Danurejan, Kota Yogyakarta, D.I. Yogyakarta 55213",
    mapsUrl: "https://maps.google.com/maps?q=Malioboro+Yogyakarta&t=&z=15&ie=UTF8&iwloc=&output=embed",
    openingHours: "Senin - Sabtu: 08.00 - 21.00 WIB | Minggu: 09.00 - 18.00 WIB",
    social: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      shopee: "https://shopee.co.id",
      tokopedia: "https://tokopedia.com"
    },
    stats: [
      { number: "15.000+", label: "Paket Terkirim" },
      { number: "100%", label: "Bahan Alami & Halal" },
      { number: "4.9 / 5.0", label: "Rating Kepuasan" },
      { number: "34 Provinsi", label: "Jangkauan Kirim" }
    ],
    highlights: [
      { icon: "shield-check", title: "Kualitas Terjamin 100%", desc: "Semua bahan baku diseleksi ketat dan diproses dengan standar higienis dan bersertifikat." },
      { icon: "truck", title: "Pengiriman Cepat & Aman", desc: "Packing tebal dengan bubble wrap gratis. Didukung pengiriman kurir instan dan ekspedisi kargo." },
      { icon: "heart-handshake", title: "Dukung Petani & Pengrajin", desc: "Setiap pembelian Anda berkontribusi langsung bagi kesejahteraan puluhan pengrajin lokal." },
      { icon: "message-circle", title: "CS Ramah & Fast Response", desc: "Konsultasi produk dan pemesanan mudah melalui WhatsApp resmi tanpa perlu registrasi rumit." }
    ],
    adminPinHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
    hero: {
      badge1: "100% Karya Asli Nusantara",
      badge2: "Siap Kirim Hari Ini",
      titlePart1: "Cita Rasa Otentik &",
      titlePart2: "Kreasi Terbaik Lokal"
    },
    about: {
      tag: "Tentang Kami",
      title: "Menghubungkan Karya Pengrajin Daerah Langsung ke Tangan Anda",
      paragraph1: "Berawal dari kepedulian terhadap potensi melimpah hasil bumi dan seni kriya tanah air, Nusantara Artisan hadir sebagai wadah kurasi produk-produk UMKM berkualitas unggul.",
      paragraph2: "Kami memastikan setiap biji kopi disangrai dengan presisi, setiap camilan diproduksi secara higienis dengan bahan alami, serta setiap jahitan batik dan anyaman dibuat dengan ketelitian rasa seni tinggi.",
      statNumber: "10+ Tahun",
      statText: "Memberdayakan Komunitas Lokal",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
      features: [
        { icon: "fa-solid fa-seedling", title: "Bahan Alami Pilihan", desc: "Tanpa bahan kimia berbahaya atau pengawet buatan." },
        { icon: "fa-solid fa-hand-holding-heart", title: "Fair Trade / Adil", desc: "Mendukung langsung ekonomi puluhan petani & artisan." },
        { icon: "fa-solid fa-box-archive", title: "Quality Control Ketat", desc: "Setiap paket dipastikan aman dan bergaransi utuh." },
        { icon: "fa-solid fa-shield-halved", title: "Halal & Bersertifikat", desc: "Legalitas izin edar terjamin dan terverifikasi." }
      ]
    },
    whyUs: {
      tag: "Mengapa Memilih Kami?",
      title: "Komitmen Kualitas & Pelayanan Terbaik",
      subtitle: "Kenyamanan dan kepuasan Anda adalah prioritas utama kami dalam setiap transaksi.",
      items: [
        { icon: "fa-solid fa-shield-halved", title: "Kualitas Terjamin 100%", desc: "Semua bahan baku diseleksi ketat dan diproses dengan standar higienis dan bersertifikat." },
        { icon: "fa-solid fa-truck-fast", title: "Pengiriman Cepat & Aman", desc: "Packing tebal dengan bubble wrap gratis. Didukung pengiriman kurir instan dan ekspedisi kargo." },
        { icon: "fa-solid fa-hand-holding-heart", title: "Dukung Petani & Pengrajin", desc: "Setiap pembelian Anda berkontribusi langsung bagi kesejahteraan puluhan pengrajin lokal." },
        { icon: "fa-brands fa-whatsapp", title: "CS Ramah & Fast Response", desc: "Konsultasi produk dan pemesanan mudah melalui WhatsApp resmi tanpa perlu registrasi rumit." }
      ]
    },
    promoBanner: {
      badge: "🎁 Layanan Khusus UMKM",
      title: "Butuh Paket Hampers, Souvenir Acara, atau Pesanan Jumlah Banyak?",
      desc: "Kami melayani kustomisasi paket bingkisan hari raya, souvenir pernikahan etnik, serta paket corporate gift kantor dengan harga spesial grosir dan packaging premium berlogo Anda.",
      btnText: "Konsultasi Paket Custom",
      waMessage: "Halo Nusantara Artisan, saya tertarik dengan paket Hampers / Souvenir Custom."
    },
    testimonialsSection: {
      tag: "Ulasan Pelanggan",
      title: "Apa Kata Mereka yang Sudah Mencoba?",
      subtitle: "Cerita asli dari ribuan pelanggan yang telah menikmati produk dan layanan kami."
    },
    contactSection: {
      tag: "Hubungi Kami",
      title: "Kunjungi Toko atau Pesan Daring",
      subtitle: "Kami siap melayani kebutuhan informasi produk, pemesanan partai besar, atau sekadar silaturahmi langsung di gerai kami.",
      formTitle: "Tanya Produk & Informasi",
      formSubtitle: "Tuliskan pesan Anda dan pesan akan otomatis diformat ke nomor WhatsApp Customer Service kami."
    }
  },
  categories: [
    { id: "all", name: "Semua Produk", icon: "layout-grid" },
    { id: "kopi", name: "Kopi & Minuman", icon: "coffee" },
    { id: "kuliner", name: "Camilan & Sambal", icon: "utensils" },
    { id: "craft", name: "Kerajinan Etnik", icon: "gem" },
    { id: "fashion", name: "Batik & Busana", icon: "shirt" }
  ],
  products: [
    {
      id: "prd-01",
      name: "Kopi Arabika Gayo Single Origin 250gr",
      category: "kopi",
      price: 75000,
      originalPrice: 90000,
      badge: "Best Seller",
      rating: 4.9,
      sales: 1420,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
      description: "Biji kopi Arabika asli dari dataran tinggi Gayo Aceh dengan proses wash halus. Karakter rasa fruity, citrusy yang segar, dengan aftertaste karamel manis alami.",
      specifications: { "Berat": "250 gram", "Asal": "Takengon, Aceh Tengah", "Roast": "Medium Roast", "Notes": "Brown Sugar, Citrus" },
      inStock: true
    },
    {
      id: "prd-02",
      name: "Sambal Cumi Asin Cabe Ijo Spesial 200gr",
      category: "kuliner",
      price: 38000,
      originalPrice: 45000,
      badge: "Favorit",
      rating: 5.0,
      sales: 2350,
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
      description: "Sambal cumi asin gurih nikmat dengan cabai rawit hijau segar dan rempah daun jeruk. Potongan cumi melimpah dan tidak berbau amis.",
      specifications: { "Berat Bersih": "200 gram", "Tingkat Pedas": "Level 4", "Sertifikasi": "Halal ID & P-IRT" },
      inStock: true
    },
    {
      id: "prd-03",
      name: "Tas Anyaman Rotan Bali Handmade Etnik",
      category: "craft",
      price: 145000,
      originalPrice: 175000,
      badge: "Artisan Choice",
      rating: 4.8,
      sales: 870,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      description: "Tas selempang anyaman rotan bulat khas pengrajin Bali dengan tali kulit sapi asli dan lapisan kain batik furing dalam yang elegan.",
      specifications: { "Diameter": "20 cm x Tebal 7 cm", "Bahan": "Rotan Alami & Tali Kulit Asli", "Furing": "Kain Batik" },
      inStock: true
    },
    {
      id: "prd-04",
      name: "Kemeja Batik Katun Primisima Motif Kawung",
      category: "fashion",
      price: 185000,
      originalPrice: 220000,
      badge: "Eksklusif",
      rating: 4.9,
      sales: 950,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      description: "Kemeja batik pria modern lengan panjang dengan bahan katun Primisima Sanforized yang sejuk dan tidak luntur. Pola motif simetris rapi.",
      specifications: { "Bahan": "Katun Primisima 100%", "Jahitan": "Kualitas Tailor & Lapis Furing", "Ukuran": "M, L, XL, XXL" },
      inStock: true
    },
    {
      id: "prd-05",
      name: "Madu Hutan Liar Murni Flores 350ml",
      category: "kuliner",
      price: 95000,
      originalPrice: 120000,
      badge: "100% Organik",
      rating: 4.9,
      sales: 1120,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      description: "Madu murni hasil lebah liar Apis Dorsata pedalaman hutan Flores. Tanpa tambahan gula maupun proses pemanasan kimiawi.",
      specifications: { "Isi": "350 ml / 480 gr", "Jenis": "Raw Forest Honey", "Kemasan": "Botol Kaca Segel" },
      inStock: true
    },
    {
      id: "prd-06",
      name: "Keripik Tempe Sagu Renyah Daun Jeruk 250gr",
      category: "kuliner",
      price: 25000,
      originalPrice: 30000,
      badge: "Camilan Favorit",
      rating: 4.8,
      sales: 3200,
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
      description: "Keripik tempe kedelai non-GMO berbalut sagu tipis dengan bumbu bawang putih dan irisan daun jeruk purut. Sangat renyah!",
      specifications: { "Berat": "250 gram", "Masa Simpan": "4 bulan", "Kemasan": "Aluminium Foil Ziplock" },
      inStock: true
    },
    {
      id: "prd-07",
      name: "Scarf Selendang Tenun Ikat Jepara",
      category: "fashion",
      price: 115000,
      originalPrice: 135000,
      badge: "Handwoven",
      rating: 4.9,
      sales: 640,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      description: "Selendang tenun ikat tradisional Jepara ditenun manual dengan Alat Tenun Bukan Mesin (ATBM). Warna alami awet dan tidak kaku.",
      specifications: { "Ukuran": "200 cm x 50 cm", "Material": "Katun Mercerized Adem", "Teknik": "Tenun Tradisional ATBM" },
      inStock: true
    },
    {
      id: "prd-08",
      name: "Diffuser Aromaterapi Keramik Candi",
      category: "craft",
      price: 88000,
      originalPrice: 110000,
      badge: "Koleksi Estetik",
      rating: 4.7,
      sales: 510,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      description: "Tungku aromaterapi lilin berbahan keramik stoneware buatan perajin Kasongan. Cocok untuk relaksasi dan estetika interior.",
      specifications: { "Bahan": "Keramik Stoneware", "Dimensi": "Tinggi 11 cm x Diameter 9 cm", "Bonus": "2 Tealight + Essential Oil 10ml" },
      inStock: true
    }
  ],
  testimonials: [
    {
      id: "tst-01",
      name: "Budi Santoso",
      role: "Pecinta Kopi, Jakarta Selatan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Kopi Gayo-nya luar biasa segar! Aromanya semerbak waktu pertama kali diseduh V60. Pengiriman cepat dan pesan via WhatsApp tinggal klik langsung dilayani admin yang super ramah.",
      date: "2 hari yang lalu"
    },
    {
      id: "tst-02",
      name: "Rina Wulandari",
      role: "Ibu Rumah Tangga, Surabaya",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Sambal cumi cabe ijonya juara banget! Cumina empuk dan melimpah, nggak pelit bumbu. Keripik tempenya juga renyah tahan lama. Sudah repeat order 3 kali.",
      date: "1 minggu yang lalu"
    },
    {
      id: "tst-03",
      name: "Dimas Pratama",
      role: "Eksekutif Muda, Bandung",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Batik motif kawungnya adem banget dipakai seharian di kantor, potongannya pas di badan. Bangga banget dukung produk karya lokal dengan kualitas premium kayak gini.",
      date: "2 minggu yang lalu"
    }
  ]
};

// Format Currency
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
  const color = type === 'success' ? 'var(--primary)' : 'var(--accent)';
  
  toast.innerHTML = `<i class="${icon}" style="color: ${color}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await loadSiteData();
  initCart();
  renderAllSections();
  setupEventListeners();
});

// Theme Management (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem('umkm_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('umkm_theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Mode ${nextTheme === 'dark' ? 'Gelap' : 'Terang'} aktif`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Data Fetching & Sync
async function loadSiteData() {
  // Check local storage first
  const storedData = localStorage.getItem('umkm_site_data');
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      if (parsed && parsed.profile) {
        if (!parsed.profile.about) parsed.profile.about = DEFAULT_FALLBACK_DATA.profile.about;
        if (!parsed.profile.whyUs) parsed.profile.whyUs = DEFAULT_FALLBACK_DATA.profile.whyUs;
        if (!parsed.profile.promoBanner) parsed.profile.promoBanner = DEFAULT_FALLBACK_DATA.profile.promoBanner;
        if (!parsed.profile.hero) parsed.profile.hero = DEFAULT_FALLBACK_DATA.profile.hero;
        if (!parsed.profile.testimonialsSection) parsed.profile.testimonialsSection = DEFAULT_FALLBACK_DATA.profile.testimonialsSection;
        if (!parsed.profile.contactSection) parsed.profile.contactSection = DEFAULT_FALLBACK_DATA.profile.contactSection;
      }
      window.UMKM_APP.data = parsed;
      return;
    } catch (e) {
      console.warn("Failed to parse cached local data, falling back to JSON file", e);
    }
  }

  // Fetch JSON from data/site-data.json
  try {
    const res = await fetch('data/site-data.json');
    if (!res.ok) throw new Error("Network response not ok");
    const json = await res.json();
    if (json && json.profile) {
      if (!json.profile.about) json.profile.about = DEFAULT_FALLBACK_DATA.profile.about;
      if (!json.profile.whyUs) json.profile.whyUs = DEFAULT_FALLBACK_DATA.profile.whyUs;
      if (!json.profile.promoBanner) json.profile.promoBanner = DEFAULT_FALLBACK_DATA.profile.promoBanner;
      if (!json.profile.hero) json.profile.hero = DEFAULT_FALLBACK_DATA.profile.hero;
      if (!json.profile.testimonialsSection) json.profile.testimonialsSection = DEFAULT_FALLBACK_DATA.profile.testimonialsSection;
      if (!json.profile.contactSection) json.profile.contactSection = DEFAULT_FALLBACK_DATA.profile.contactSection;
    }
    window.UMKM_APP.data = json;
    localStorage.setItem('umkm_site_data', JSON.stringify(json));
  } catch (err) {
    console.warn("Could not fetch data/site-data.json (e.g. running via file://). Using built-in default data.", err);
    window.UMKM_APP.data = DEFAULT_FALLBACK_DATA;
    localStorage.setItem('umkm_site_data', JSON.stringify(DEFAULT_FALLBACK_DATA));
  }
}

// Save Data back to LocalStorage
function saveCurrentData() {
  localStorage.setItem('umkm_site_data', JSON.stringify(window.UMKM_APP.data));
}

// Render All Sections
function renderAllSections() {
  const data = window.UMKM_APP.data;
  if (!data) return;

  // 1. Brand & Header
  document.querySelectorAll('.store-name-text').forEach(el => el.textContent = data.profile.storeName);
  document.querySelectorAll('.store-tagline-text').forEach(el => el.textContent = data.profile.tagline);
  document.title = `${data.profile.storeName} - ${data.profile.tagline}`;
  renderStoreLogo();

  // 2. Hero Section
  const hero = data.profile.hero || {
    badge1: "100% Karya Asli Nusantara",
    badge2: "Siap Kirim Hari Ini",
    titlePart1: "Cita Rasa Otentik &",
    titlePart2: "Kreasi Terbaik Lokal"
  };
  const b1 = document.getElementById('hero-badge-1');
  if (b1) b1.innerHTML = `<i class="fa-solid fa-certificate"></i> ${hero.badge1}`;
  const b2 = document.getElementById('hero-badge-2');
  if (b2) b2.innerHTML = `<i class="fa-solid fa-bolt"></i> ${hero.badge2}`;
  const t1 = document.getElementById('hero-title-part1');
  if (t1) t1.textContent = hero.titlePart1;
  const t2 = document.getElementById('hero-title-part2');
  if (t2) t2.textContent = hero.titlePart2;

  const heroDesc = document.getElementById('hero-desc');
  if (heroDesc) heroDesc.textContent = data.profile.description;

  const heroWaBtn = document.getElementById('hero-wa-btn');
  if (heroWaBtn) {
    heroWaBtn.href = `https://wa.me/${data.profile.phone}?text=${encodeURIComponent('Halo ' + data.profile.storeName + ', saya ingin bertanya seputar produk Anda.')}`;
  }

  // Hero Stats
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer && data.profile.stats) {
    statsContainer.innerHTML = data.profile.stats.map(s => `
      <div class="stat-item">
        <span class="stat-number">${s.number}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  // Hero Featured Showcase Card
  if (data.products && data.products.length > 0) {
    const featuredPrd = data.products[0];
    const showcaseContainer = document.getElementById('hero-showcase-box');
    if (showcaseContainer) {
      showcaseContainer.innerHTML = `
        <div class="showcase-card">
          <div class="showcase-image-wrap">
            <span class="badge badge-accent showcase-floating-badge">★ Paling Dicari</span>
            <img src="${featuredPrd.image}" alt="${featuredPrd.name}" class="showcase-image" loading="lazy" />
          </div>
          <div class="showcase-content">
            <div class="showcase-meta">
              <span class="badge badge-primary">${featuredPrd.badge || 'Koleksi Utama'}</span>
              <span style="color: #f59e0b; font-weight: 700;"><i class="fa-solid fa-star"></i> ${featuredPrd.rating}</span>
            </div>
            <h4 class="showcase-title">${featuredPrd.name}</h4>
            <div class="showcase-price-box">
              <span class="price-current">${formatRupiah(featuredPrd.price)}</span>
              ${featuredPrd.originalPrice ? `<span class="price-old">${formatRupiah(featuredPrd.originalPrice)}</span>` : ''}
            </div>
            <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
              <button class="btn btn-primary" style="flex: 1;" onclick="openProductDetailModal('${featuredPrd.id}')">
                <i class="fa-solid fa-eye"></i> Detail Produk
              </button>
              <button class="btn btn-whatsapp" onclick="directBuyWhatsApp('${featuredPrd.id}')">
                <i class="fa-brands fa-whatsapp"></i> Pesan
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 3. About Section (Tentang Kami)
  const about = data.profile.about;
  if (about) {
    const abTag = document.getElementById('about-tag');
    if (abTag) abTag.textContent = about.tag || 'Tentang Kami';
    const abTitle = document.getElementById('about-title');
    if (abTitle) abTitle.textContent = about.title || '';
    const abP1 = document.getElementById('about-p1');
    if (abP1) abP1.textContent = about.paragraph1 || '';
    const abP2 = document.getElementById('about-p2');
    if (abP2) abP2.textContent = about.paragraph2 || '';
    const abStatNum = document.getElementById('about-stat-number');
    if (abStatNum) abStatNum.textContent = about.statNumber || '10+ Tahun';
    const abStatLbl = document.getElementById('about-stat-label');
    if (abStatLbl) abStatLbl.textContent = about.statText || 'Memberdayakan Komunitas Lokal';
    const abImg = document.getElementById('about-img-main');
    if (abImg && about.image) abImg.src = about.image;

    const abFeatures = document.getElementById('about-features-container');
    if (abFeatures && about.features) {
      abFeatures.innerHTML = about.features.map(f => `
        <div class="about-feature-item">
          <i class="${f.icon || 'fa-solid fa-check'} about-feature-icon"></i>
          <div class="about-feature-text">
            <h5>${f.title}</h5>
            <p>${f.desc}</p>
          </div>
        </div>
      `).join('');
    }
  }

  // 4. Category Filter Pills
  renderCategoryPills();

  // 5. Product Catalog
  renderProductGrid();

  // 6. Highlights / Keunggulan (Mengapa Memilih Kami)
  const whyUs = data.profile.whyUs;
  if (whyUs) {
    const wTag = document.getElementById('whyus-tag');
    if (wTag) wTag.textContent = whyUs.tag || 'Mengapa Memilih Kami?';
    const wTitle = document.getElementById('whyus-title');
    if (wTitle) wTitle.textContent = whyUs.title || 'Komitmen Kualitas & Pelayanan Terbaik';
    const wSub = document.getElementById('whyus-subtitle');
    if (wSub) wSub.textContent = whyUs.subtitle || '';
  }

  const highlightsContainer = document.getElementById('highlights-container');
  if (highlightsContainer) {
    const items = data.profile.whyUs?.items || data.profile.highlights || [];
    highlightsContainer.innerHTML = items.map(h => `
      <div class="feature-box">
        <div class="feature-icon-wrap">
          <i class="${h.icon || 'fa-solid fa-star'}"></i>
        </div>
        <h4 class="feature-title">${h.title}</h4>
        <p class="feature-desc">${h.desc}</p>
      </div>
    `).join('');
  }

  // 7. Promo Banner (Hampers / Layanan Khusus)
  const promo = data.profile.promoBanner;
  if (promo) {
    const prBadge = document.getElementById('promo-badge');
    if (prBadge) prBadge.textContent = promo.badge || '🎁 Layanan Khusus UMKM';
    const prTitle = document.getElementById('promo-title');
    if (prTitle) prTitle.textContent = promo.title || '';
    const prDesc = document.getElementById('promo-desc');
    if (prDesc) prDesc.textContent = promo.desc || '';
    const prBtnText = document.getElementById('promo-btn-text');
    if (prBtnText) prBtnText.textContent = promo.btnText || 'Konsultasi Paket Custom';
    const prBtn = document.getElementById('promo-btn');
    if (prBtn) {
      const msg = encodeURIComponent(promo.waMessage || 'Halo, saya tertarik dengan paket custom.');
      prBtn.href = `https://wa.me/${data.profile.phone}?text=${msg}`;
    }
  }

  // 8. Testimonials
  renderTestimonials();

  // 9. Contact & Socials
  renderContactInfo();
}

// Render Categories
function renderCategoryPills() {
  const container = document.getElementById('catalog-categories-pills');
  if (!container || !window.UMKM_APP.data.categories) return;

  const categories = window.UMKM_APP.data.categories;
  container.innerHTML = categories.map(cat => `
    <button class="category-pill ${window.UMKM_APP.selectedCategory === cat.id ? 'active' : ''}" 
            data-category="${cat.id}">
      ${cat.name}
    </button>
  `).join('');

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.UMKM_APP.selectedCategory = e.currentTarget.dataset.category;
      renderCategoryPills();
      renderProductGrid();
    });
  });
}

// Render Product Catalog
function renderProductGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid || !window.UMKM_APP.data.products) return;

  let products = [...window.UMKM_APP.data.products];

  // Category filter
  if (window.UMKM_APP.selectedCategory !== 'all') {
    products = products.filter(p => p.category === window.UMKM_APP.selectedCategory);
  }

  // Search filter
  if (window.UMKM_APP.searchQuery.trim() !== '') {
    const q = window.UMKM_APP.searchQuery.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (window.UMKM_APP.sortBy) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      products.sort((a, b) => (b.sales || 0) - (a.sales || 0));
      break;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty">
        <div class="catalog-empty-icon"><i class="fa-solid fa-box-open"></i></div>
        <h3>Produk tidak ditemukan</h3>
        <p style="margin-top: 0.5rem; color: var(--text-muted);">Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="resetCatalogFilters()">
          Reset Pencarian
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => {
    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-image-container" onclick="openProductDetailModal('${product.id}')">
          ${product.badge ? `<span class="badge badge-accent product-badge-float">${product.badge}</span>` : ''}
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
          <div class="product-actions-float">
            <button class="quick-view-btn" title="Lihat Detail" onclick="event.stopPropagation(); openProductDetailModal('${product.id}')">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div class="product-body">
          <div class="product-meta">
            <span class="product-category-name">${getCategoryName(product.category)}</span>
            <span class="product-rating">
              <i class="fa-solid fa-star"></i> ${product.rating || '5.0'}
            </span>
          </div>
          
          <h4 class="product-title" onclick="openProductDetailModal('${product.id}')" title="${product.name}">
            ${product.name}
          </h4>
          
          <p class="product-desc-short">${product.description || ''}</p>
          
          <div class="product-footer">
            <div class="product-pricing">
              <span class="product-price">${formatRupiah(product.price)}</span>
              ${product.originalPrice ? `<span class="product-price-strike">${formatRupiah(product.originalPrice)}</span>` : ''}
            </div>
            <button class="add-cart-btn" onclick="addToCart('${product.id}')">
              <i class="fa-solid fa-cart-plus"></i> Pesan
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function getCategoryName(categoryId) {
  const cat = window.UMKM_APP.data.categories?.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

function resetCatalogFilters() {
  window.UMKM_APP.selectedCategory = 'all';
  window.UMKM_APP.searchQuery = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  renderCategoryPills();
  renderProductGrid();
}

// Render Testimonials
function renderTestimonials() {
  const profile = window.UMKM_APP.data?.profile;
  const tSec = profile?.testimonialsSection || DEFAULT_FALLBACK_DATA.profile.testimonialsSection;
  if (tSec) {
    const tTag = document.getElementById('testimonials-tag');
    if (tTag) tTag.textContent = tSec.tag || 'Ulasan Pelanggan';
    const tTitle = document.getElementById('testimonials-title');
    if (tTitle) tTitle.textContent = tSec.title || 'Apa Kata Mereka yang Sudah Mencoba?';
    const tSub = document.getElementById('testimonials-subtitle');
    if (tSub) tSub.textContent = tSec.subtitle || '';
  }

  const grid = document.getElementById('testimonials-grid');
  if (!grid || !window.UMKM_APP.data.testimonials) return;

  grid.innerHTML = window.UMKM_APP.data.testimonials.map(item => `
    <div class="testimonial-card">
      <div>
        <div class="testimonial-stars">
          ${Array(item.rating || 5).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
        <p class="testimonial-quote">"${item.comment}"</p>
      </div>
      <div class="testimonial-user">
        <img src="${item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${item.name}" class="testimonial-avatar" />
        <div class="testimonial-info">
          <h5>${item.name}</h5>
          <p>${item.role} ${item.date ? `• ${item.date}` : ''}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Contact Info
function renderContactInfo() {
  const profile = window.UMKM_APP.data.profile;
  if (!profile) return;

  const cSec = profile.contactSection || DEFAULT_FALLBACK_DATA.profile.contactSection;
  if (cSec) {
    const cTag = document.getElementById('contact-tag');
    if (cTag) cTag.textContent = cSec.tag || 'Hubungi Kami';
    const cTitle = document.getElementById('contact-title');
    if (cTitle) cTitle.textContent = cSec.title || 'Kunjungi Toko atau Pesan Daring';
    const cSub = document.getElementById('contact-subtitle');
    if (cSub) cSub.textContent = cSec.subtitle || '';
    const cFormTitle = document.getElementById('contact-form-title');
    if (cFormTitle) cFormTitle.textContent = cSec.formTitle || 'Tanya Produk & Informasi';
    const cFormSubtitle = document.getElementById('contact-form-subtitle');
    if (cFormSubtitle) cFormSubtitle.textContent = cSec.formSubtitle || '';
  }

  const addrEl = document.getElementById('contact-address');
  if (addrEl) addrEl.textContent = profile.address;

  const hoursEl = document.getElementById('contact-hours');
  if (hoursEl) hoursEl.textContent = profile.openingHours;

  const phoneEl = document.getElementById('contact-phone');
  if (phoneEl) {
    phoneEl.textContent = profile.phone;
    phoneEl.href = `https://wa.me/${profile.phone}`;
  }

  const emailEl = document.getElementById('contact-email');
  if (emailEl) {
    emailEl.textContent = profile.email;
    emailEl.href = `mailto:${profile.email}`;
  }

  const mapFrame = document.getElementById('contact-map-frame');
  if (mapFrame && profile.mapsUrl) {
    mapFrame.src = profile.mapsUrl;
  }

  // Social Links
  const socialRow = document.getElementById('contact-social-row');
  if (socialRow && profile.social) {
    socialRow.innerHTML = `
      ${profile.social.instagram ? `<a href="${profile.social.instagram}" target="_blank" class="social-btn" title="Instagram"><i class="fa-brands fa-instagram"></i></a>` : ''}
      ${profile.social.tiktok ? `<a href="${profile.social.tiktok}" target="_blank" class="social-btn" title="TikTok"><i class="fa-brands fa-tiktok"></i></a>` : ''}
      ${profile.social.shopee ? `<a href="${profile.social.shopee}" target="_blank" class="social-btn" title="Shopee"><i class="fa-solid fa-bag-shopping"></i></a>` : ''}
      ${profile.social.tokopedia ? `<a href="${profile.social.tokopedia}" target="_blank" class="social-btn" title="Tokopedia"><i class="fa-solid fa-store"></i></a>` : ''}
    `;
  }
}

// ===================================================================
// SHOPPING CART & WHATSAPP CHECKOUT LOGIC
// ===================================================================

function initCart() {
  const storedCart = localStorage.getItem('umkm_cart');
  if (storedCart) {
    try {
      window.UMKM_APP.cart = JSON.parse(storedCart);
    } catch (e) {
      window.UMKM_APP.cart = [];
    }
  }
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('umkm_cart', JSON.stringify(window.UMKM_APP.cart));
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = window.UMKM_APP.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function addToCart(productId, quantity = 1) {
  const product = window.UMKM_APP.data.products.find(p => p.id === productId);
  if (!product) return;

  const existing = window.UMKM_APP.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    window.UMKM_APP.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: quantity
    });
  }

  saveCart();
  showToast(`"${product.name}" ditambahkan ke keranjang`);
}

function updateCartItemQty(productId, delta) {
  const item = window.UMKM_APP.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    window.UMKM_APP.cart = window.UMKM_APP.cart.filter(i => i.id !== productId);
  }
  saveCart();
}

function removeCartItem(productId) {
  window.UMKM_APP.cart = window.UMKM_APP.cart.filter(i => i.id !== productId);
  saveCart();
  showToast("Produk dihapus dari keranjang");
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal-text');
  const totalEl = document.getElementById('cart-total-text');
  const footerEl = document.getElementById('cart-drawer-footer');
  const formBox = document.getElementById('cart-checkout-form-box');

  if (!container) return;

  const cart = window.UMKM_APP.cart;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Keranjang Anda Kosong</h4>
        <p>Silakan pilih produk favorit nusantara di katalog kami.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); window.location.hash='#katalog';">
          Mulai Belanja
        </button>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
    if (formBox) formBox.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'flex';
  if (formBox) formBox.style.display = 'flex';

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h5 class="cart-item-title">${item.name}</h5>
          <span class="cart-item-price">${formatRupiah(item.price)}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
            ${formatRupiah(itemTotal)}
          </div>
          <button class="cart-item-delete" title="Hapus Item" onclick="removeCartItem('${item.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (totalEl) totalEl.textContent = formatRupiah(subtotal);
}

// Checkout WhatsApp Direct
function checkoutWhatsApp() {
  const cart = window.UMKM_APP.cart;
  if (cart.length === 0) {
    showToast("Keranjang Anda masih kosong", "info");
    return;
  }

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const addressInput = document.getElementById('checkout-address');
  const deliveryType = document.getElementById('checkout-delivery-type');
  const paymentMethod = document.getElementById('checkout-payment-method');
  const noteInput = document.getElementById('checkout-notes');

  const buyerName = nameInput ? nameInput.value.trim() : '';
  const buyerPhone = phoneInput ? phoneInput.value.trim() : '';
  const buyerAddress = addressInput ? addressInput.value.trim() : '';
  const delivery = deliveryType ? deliveryType.value : 'Kirim Ekspedisi/Kurir';
  const payment = paymentMethod ? paymentMethod.value : 'Transfer Bank / QRIS';
  const notes = noteInput ? noteInput.value.trim() : '-';

  if (!buyerName) {
    alert("Silakan masukkan Nama Lengkap Anda terlebih dahulu.");
    nameInput?.focus();
    return;
  }
  if (!buyerPhone) {
    alert("Silakan masukkan Nomor WhatsApp Anda untuk konfirmasi.");
    phoneInput?.focus();
    return;
  }
  if (delivery === 'Kirim ke Alamat' && !buyerAddress) {
    alert("Silakan lengkapi Alamat Pengiriman Anda.");
    addressInput?.focus();
    return;
  }

  const store = window.UMKM_APP.data.profile;
  let total = 0;

  // Build items message text
  let itemsList = cart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `${idx + 1}. *${item.name}*\n   Jumlah: ${item.qty} pcs x ${formatRupiah(item.price)} = *${formatRupiah(itemTotal)}*`;
  }).join('\n');

  const waText = 
`Halo *${store.storeName}*, saya ingin melakukan pemesanan via website:

📋 *DETAIL PEMESANAN*
----------------------------------
👤 *Nama:* ${buyerName}
📞 *No. WhatsApp:* ${buyerPhone}
🚚 *Opsi Layanan:* ${delivery}
📍 *Alamat:* ${buyerAddress || 'Ambil langsung di Toko'}
💳 *Metode Pembayaran:* ${payment}
📝 *Catatan:* ${notes}

📦 *DAFTAR PRODUK:*
${itemsList}

----------------------------------
💰 *TOTAL PEMBAYARAN: ${formatRupiah(total)}*
----------------------------------
Mohon konfirmasi ketersediaan stok & ongkos kirim. Terima kasih banyak!`;

  const waUrl = `https://wa.me/${store.phone}?text=${encodeURIComponent(waText)}`;
  window.open(waUrl, '_blank');

  showToast("Mengarahkan ke WhatsApp resmi...");
  closeCartDrawer();
}

// Direct Buy a Single Product via WhatsApp
function directBuyWhatsApp(productId) {
  const product = window.UMKM_APP.data.products.find(p => p.id === productId);
  if (!product) return;

  const store = window.UMKM_APP.data.profile;
  const waText = 
`Halo *${store.storeName}*, saya tertarik untuk langsung memesan produk berikut:

*${product.name}*
Harga: *${formatRupiah(product.price)}*

Mohon informasi stok dan cara pemesanannya ya. Terima kasih!`;

  const waUrl = `https://wa.me/${store.phone}?text=${encodeURIComponent(waText)}`;
  window.open(waUrl, '_blank');
}

// Product Detail Modal
function openProductDetailModal(productId) {
  const product = window.UMKM_APP.data.products.find(p => p.id === productId);
  if (!product) return;

  window.UMKM_APP.activeProductModal = product;
  const modal = document.getElementById('product-detail-modal');
  const body = document.getElementById('product-detail-modal-body');

  let specsHtml = '';
  if (product.specifications && Object.keys(product.specifications).length > 0) {
    specsHtml = `
      <div style="margin-top: 1rem;">
        <h5 style="font-size: 0.92rem; font-weight: 700; margin-bottom: 0.4rem;">Spesifikasi & Detail:</h5>
        <table class="specs-table">
          <tbody>
            ${Object.entries(product.specifications).map(([key, val]) => `
              <tr>
                <td>${key}</td>
                <td>${val}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  body.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-detail-img" />
      </div>
      <div class="product-detail-info">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="badge badge-primary">${getCategoryName(product.category)}</span>
          <span style="color: #f59e0b; font-weight: 700; font-size: 0.88rem;">
            <i class="fa-solid fa-star"></i> ${product.rating || '5.0'} (${product.sales || 100}+ terjual)
          </span>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); line-height: 1.25;">
          ${product.name}
        </h3>
        <div class="showcase-price-box" style="margin: 0.2rem 0;">
          <span class="price-current" style="font-size: 1.6rem;">${formatRupiah(product.price)}</span>
          ${product.originalPrice ? `<span class="price-old">${formatRupiah(product.originalPrice)}</span>` : ''}
        </div>
        <p style="font-size: 0.95rem; color: var(--text-body); line-height: 1.6;">${product.description}</p>
        
        ${specsHtml}

        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-weight: 600; font-size: 0.9rem;">Jumlah:</span>
            <div class="qty-control" style="margin: 0;">
              <button class="qty-btn" id="modal-qty-minus">-</button>
              <span class="qty-count" id="modal-qty-val">1</span>
              <button class="qty-btn" id="modal-qty-plus">+</button>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-primary" style="flex: 1;" id="modal-add-cart-btn">
              <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
            </button>
            <button class="btn btn-whatsapp" onclick="directBuyWhatsApp('${product.id}')">
              <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  let currentQty = 1;
  const qtyMinus = document.getElementById('modal-qty-minus');
  const qtyPlus = document.getElementById('modal-qty-plus');
  const qtyVal = document.getElementById('modal-qty-val');
  const addBtn = document.getElementById('modal-add-cart-btn');

  qtyMinus.addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty--;
      qtyVal.textContent = currentQty;
    }
  });

  qtyPlus.addEventListener('click', () => {
    currentQty++;
    qtyVal.textContent = currentQty;
  });

  addBtn.addEventListener('click', () => {
    addToCart(product.id, currentQty);
    closeProductDetailModal();
  });

  openModal(modal);
}

function closeProductDetailModal() {
  const modal = document.getElementById('product-detail-modal');
  closeModal(modal);
}

// Drawer & Modal Core UI Controls
function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer')?.classList.add('active');
  document.getElementById('global-overlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('active');
  document.getElementById('global-overlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.getElementById('global-overlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.getElementById('global-overlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

// User-submitted review logic
function openReviewModal() {
  const modal = document.getElementById('review-modal');
  openModal(modal);
}

function submitNewReview(e) {
  e.preventDefault();
  const name = document.getElementById('review-author-name').value.trim();
  const city = document.getElementById('review-author-city').value.trim();
  const rating = parseInt(document.getElementById('review-rating-select').value) || 5;
  const comment = document.getElementById('review-comment').value.trim();

  if (!name || !comment) {
    alert("Harap isi nama dan ulasan Anda.");
    return;
  }

  const newReview = {
    id: 'tst-' + Date.now(),
    name: name,
    role: city ? `Pelanggan, ${city}` : 'Pelanggan Terverifikasi',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: rating,
    comment: comment,
    date: 'Baru saja'
  };

  if (!window.UMKM_APP.data.testimonials) {
    window.UMKM_APP.data.testimonials = [];
  }
  window.UMKM_APP.data.testimonials.unshift(newReview);
  saveCurrentData();
  renderTestimonials();

  closeModal(document.getElementById('review-modal'));
  showToast("Terima kasih! Ulasan Anda telah diterbitkan.");
  document.getElementById('review-form').reset();
}

// Direct Contact Form via WhatsApp
function handleContactFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name-input').value.trim();
  const phone = document.getElementById('contact-phone-input').value.trim();
  const message = document.getElementById('contact-msg-input').value.trim();

  const store = window.UMKM_APP.data.profile;
  const waText = 
`Halo *${store.storeName}*, saya menghubungi melalui Formulir Kontak Website:

*Nama:* ${name}
*No. HP/WA:* ${phone}
*Pesan:*
"${message}"

Mohon responnya ya, terima kasih.`;

  window.open(`https://wa.me/${store.phone}?text=${encodeURIComponent(waText)}`, '_blank');
  showToast("Membuka WhatsApp...");
  document.getElementById('contact-form').reset();
}

// Event Listeners Setup
function setupEventListeners() {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Cart Open & Close
  document.getElementById('cart-toggle-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-checkout-btn')?.addEventListener('click', checkoutWhatsApp);

  // Global Overlay Click
  document.getElementById('global-overlay')?.addEventListener('click', () => {
    closeCartDrawer();
    closeProductDetailModal();
    closeModal(document.getElementById('review-modal'));
    closeModal(document.getElementById('admin-modal'));
    closeModal(document.getElementById('admin-pin-modal'));
  });

  // Search Input
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.UMKM_APP.searchQuery = e.target.value;
      renderProductGrid();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      window.UMKM_APP.sortBy = e.target.value;
      renderProductGrid();
    });
  }

  // Review Form
  document.getElementById('review-form')?.addEventListener('submit', submitNewReview);

  // Contact Form
  document.getElementById('contact-form')?.addEventListener('submit', handleContactFormSubmit);

  // Auto trigger Admin if URL has ?admin or #admin
  if (window.location.search.includes('admin') || window.location.hash === '#admin') {
    setTimeout(() => {
      window.UMKM_ADMIN?.handleOpenAdmin();
    }, 300);
  }
}

// Render dynamic logo (Icon or Image)
function renderStoreLogo() {
  const profile = window.UMKM_APP.data?.profile;
  if (!profile) return;

  const boxes = [
    document.getElementById('brand-logo-box'),
    document.getElementById('footer-logo-box')
  ];

  boxes.forEach(box => {
    if (!box) return;
    if (profile.logoType === 'image' && profile.logoImage) {
      box.innerHTML = `<img src="${profile.logoImage}" alt="${profile.storeName}" class="brand-logo-img" />`;
      box.style.background = 'transparent';
      box.style.boxShadow = 'none';
      box.style.border = '1px solid var(--border-color)';
    } else {
      const icon = profile.logoIcon || 'fa-solid fa-leaf';
      box.innerHTML = `<i class="${icon}"></i>`;
      box.style.background = '';
      box.style.boxShadow = '';
      box.style.border = '';
    }
  });
}

