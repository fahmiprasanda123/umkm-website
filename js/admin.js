/**
 * Nusantara Artisan & Co. - Client-Side Admin Panel (No Database Required)
 * Allows shop owner to edit profile, manage products, upload photos (Base64),
 * and export site-data.json to keep GitHub Pages globally in sync!
 */

// Cryptographic helper for secure one-way PIN hashing
async function hashPin(pin) {
  const enc = new TextEncoder().encode(pin);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

window.UMKM_ADMIN = {
  isEditingProduct: null,
  isEditingTestimonial: null,
  logoClickCount: 0,
  logoClickTimer: null,

  init() {
    this.bindEvents();
    this.setupSecretTriggers();
  },

  setupSecretTriggers() {
    // 1. Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        this.handleOpenAdmin();
        showToast("Shortcut Admin terdeteksi", "info");
      }
    });

    // 2. Secret Logo Tap (Klik logo 5x berurutan dalam 3 detik)
    const logoEl = document.getElementById('brand-logo-link');
    if (logoEl) {
      logoEl.addEventListener('click', (e) => {
        this.logoClickCount++;
        clearTimeout(this.logoClickTimer);
        this.logoClickTimer = setTimeout(() => {
          this.logoClickCount = 0;
        }, 3000);

        if (this.logoClickCount >= 5) {
          e.preventDefault();
          this.logoClickCount = 0;
          this.handleOpenAdmin();
          showToast("Akses Rahasia Admin Aktif!", "success");
        }
      });
    }
  },

  bindEvents() {
    // Admin button triggers
    document.getElementById('admin-trigger-header')?.addEventListener('click', () => this.handleOpenAdmin());
    document.getElementById('admin-trigger-footer')?.addEventListener('click', () => this.handleOpenAdmin());

    // Admin PIN Form
    document.getElementById('admin-pin-form')?.addEventListener('submit', (e) => this.verifyPin(e));

    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Profile Form Save
    document.getElementById('admin-profile-form')?.addEventListener('submit', (e) => this.saveProfile(e));

    // Product Form Save
    document.getElementById('admin-product-form')?.addEventListener('submit', (e) => this.saveProduct(e));

    // Cancel Product Edit
    document.getElementById('admin-product-cancel-btn')?.addEventListener('click', () => this.resetProductForm());

    // Local Image File to Base64
    document.getElementById('admin-product-file')?.addEventListener('change', (e) => this.handleImageUpload(e));

    // Testimonial Form Save
    document.getElementById('admin-testimonial-form')?.addEventListener('submit', (e) => this.saveTestimonial(e));

    // Cancel Testimonial Edit
    document.getElementById('admin-testi-cancel-btn')?.addEventListener('click', () => this.resetTestimonialForm());

    // Testimonial Avatar Upload to Base64
    document.getElementById('adm-testi-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file avatar maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatarInput = document.getElementById('adm-testi-avatar');
        if (avatarInput) avatarInput.value = event.target.result;
        showToast("Foto avatar ulasan berhasil dimuat!", "info");
      };
      reader.readAsDataURL(file);
    });

    // Export JSON Button
    document.getElementById('admin-export-btn')?.addEventListener('click', () => this.exportJsonFile());

    // Import JSON File
    document.getElementById('admin-import-file')?.addEventListener('change', (e) => this.importJsonFile(e));

    // Reset Data Button
    document.getElementById('admin-reset-btn')?.addEventListener('click', () => this.resetToDefault());

    // Logo Configuration Events
    document.getElementById('adm-logo-type')?.addEventListener('change', (e) => {
      const type = e.target.value;
      const iconWrap = document.getElementById('adm-logo-icon-wrap');
      const imgWrap = document.getElementById('adm-logo-image-wrap');
      if (iconWrap) iconWrap.style.display = type === 'icon' ? 'block' : 'none';
      if (imgWrap) imgWrap.style.display = type === 'image' ? 'block' : 'none';
      this.updateLogoPreview();
    });

    document.getElementById('adm-logo-icon')?.addEventListener('change', () => this.updateLogoPreview());
    document.getElementById('adm-logo-image-url')?.addEventListener('input', () => this.updateLogoPreview());
    document.getElementById('adm-logo-file')?.addEventListener('change', (e) => this.handleLogoFileUpload(e));

    // Page Content CMS Form Save
    document.getElementById('admin-content-form')?.addEventListener('submit', (e) => this.savePageContent(e));

    // About Us Image File Upload to Base64
    document.getElementById('adm-about-image-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file foto maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById('adm-about-image').value = event.target.result;
        showToast("Foto Tentang Kami berhasil dimuat!", "info");
      };
      reader.readAsDataURL(file);
    });

    // Admin Logout buttons
    document.getElementById('admin-logout-btn')?.addEventListener('click', () => this.logout());
    document.getElementById('admin-logout-btn-bottom')?.addEventListener('click', () => this.logout());
  },

  logout() {
    if (confirm("Apakah Anda yakin ingin keluar (logout) dari sesi Admin?")) {
      sessionStorage.removeItem('umkm_admin_auth');
      closeModal(document.getElementById('admin-modal'));

      // Bersihkan parameter ?admin atau #admin dari URL
      if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }

      showToast("Anda telah berhasil logout dari sesi Admin.", "info");
    }
  },

  handleOpenAdmin() {
    const isAuth = sessionStorage.getItem('umkm_admin_auth');
    if (isAuth === 'true') {
      this.openAdminPanel();
    } else {
      openModal(document.getElementById('admin-pin-modal'));
      setTimeout(() => document.getElementById('admin-pin-input')?.focus(), 150);
    }
  },

  async verifyPin(e) {
    e.preventDefault();
    const pinInput = document.getElementById('admin-pin-input');
    const enteredPin = pinInput?.value.trim();
    if (!enteredPin) return;

    const enteredHash = await hashPin(enteredPin);
    const expectedHash = window.UMKM_APP.data.profile.adminPinHash || '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // SHA-256 of "1234"
    const isLegacyPlainMatch = window.UMKM_APP.data.profile.adminPin && (enteredPin === window.UMKM_APP.data.profile.adminPin);

    if (enteredHash === expectedHash || isLegacyPlainMatch) {
      sessionStorage.setItem('umkm_admin_auth', 'true');
      closeModal(document.getElementById('admin-pin-modal'));
      if (pinInput) pinInput.value = '';
      this.openAdminPanel();
      showToast("Autentikasi Admin berhasil!", "success");
    } else {
      alert("PIN salah! (PIN standar bawaan: 1234)");
      pinInput?.focus();
    }
  },

  openAdminPanel() {
    this.populateProfileForm();
    this.populateContentForm();
    this.renderAdminProductsTable();
    this.renderAdminTestimonialsTable();
    this.switchTab('profile');
    openModal(document.getElementById('admin-modal'));
  },

  switchTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.admin-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
  },

  populateProfileForm() {
    const p = window.UMKM_APP.data.profile;
    if (!p) return;

    // Logo fields
    const logoType = p.logoType || 'icon';
    const logoTypeEl = document.getElementById('adm-logo-type');
    if (logoTypeEl) logoTypeEl.value = logoType;

    const logoIconEl = document.getElementById('adm-logo-icon');
    if (logoIconEl) logoIconEl.value = p.logoIcon || 'fa-solid fa-leaf';

    const logoUrlEl = document.getElementById('adm-logo-image-url');
    if (logoUrlEl) logoUrlEl.value = p.logoImage || '';

    const iconWrap = document.getElementById('adm-logo-icon-wrap');
    const imgWrap = document.getElementById('adm-logo-image-wrap');
    if (iconWrap) iconWrap.style.display = logoType === 'icon' ? 'block' : 'none';
    if (imgWrap) imgWrap.style.display = logoType === 'image' ? 'block' : 'none';

    this.updateLogoPreview();

    document.getElementById('adm-store-name').value = p.storeName || '';
    document.getElementById('adm-tagline').value = p.tagline || '';
    document.getElementById('adm-desc').value = p.description || '';
    document.getElementById('adm-phone').value = p.phone || '';
    document.getElementById('adm-email').value = p.email || '';
    document.getElementById('adm-address').value = p.address || '';
    document.getElementById('adm-hours').value = p.openingHours || '';
    document.getElementById('adm-maps').value = p.mapsUrl || '';
    document.getElementById('adm-instagram').value = p.social?.instagram || '';
    document.getElementById('adm-tiktok').value = p.social?.tiktok || '';
    document.getElementById('adm-shopee').value = p.social?.shopee || '';
    document.getElementById('adm-tokopedia').value = p.social?.tokopedia || '';

    // Clear PIN fields
    const newPinField = document.getElementById('adm-new-pin');
    const confirmPinField = document.getElementById('adm-confirm-pin');
    if (newPinField) newPinField.value = '';
    if (confirmPinField) confirmPinField.value = '';
  },

  updateLogoPreview() {
    const type = document.getElementById('adm-logo-type')?.value;
    const previewBox = document.getElementById('adm-logo-preview');
    if (!previewBox) return;

    if (type === 'image') {
      const url = document.getElementById('adm-logo-image-url')?.value.trim();
      if (url) {
        previewBox.innerHTML = `<img src="${url}" alt="Preview" class="brand-logo-img" />`;
        previewBox.style.background = 'transparent';
        previewBox.style.boxShadow = 'none';
        previewBox.style.border = '1px solid var(--border-color)';
      } else {
        previewBox.innerHTML = `<i class="fa-solid fa-image"></i>`;
      }
    } else {
      const icon = document.getElementById('adm-logo-icon')?.value || 'fa-solid fa-leaf';
      previewBox.innerHTML = `<i class="${icon}"></i>`;
      previewBox.style.background = '';
      previewBox.style.boxShadow = '';
      previewBox.style.border = '';
    }
  },

  handleLogoFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file logo maksimal 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      const urlField = document.getElementById('adm-logo-image-url');
      if (urlField) urlField.value = base64;
      this.updateLogoPreview();
      showToast("Foto logo berhasil dimuat!", "info");
    };
    reader.readAsDataURL(file);
  },

  async saveProfile(e) {
    e.preventDefault();
    const p = window.UMKM_APP.data.profile;

    // Save Logo Settings
    p.logoType = document.getElementById('adm-logo-type')?.value || 'icon';
    p.logoIcon = document.getElementById('adm-logo-icon')?.value || 'fa-solid fa-leaf';
    p.logoImage = document.getElementById('adm-logo-image-url')?.value.trim() || '';

    // Save Info Toko
    p.storeName = document.getElementById('adm-store-name').value.trim();
    p.tagline = document.getElementById('adm-tagline').value.trim();
    p.description = document.getElementById('adm-desc').value.trim();
    p.phone = document.getElementById('adm-phone').value.trim();
    p.email = document.getElementById('adm-email').value.trim();
    p.address = document.getElementById('adm-address').value.trim();
    p.openingHours = document.getElementById('adm-hours').value.trim();
    p.mapsUrl = document.getElementById('adm-maps').value.trim();

    // Handle Change PIN with Confirmation
    const newPin = document.getElementById('adm-new-pin')?.value.trim();
    const confirmPin = document.getElementById('adm-confirm-pin')?.value.trim();

    if (newPin || confirmPin) {
      if (newPin.length < 4) {
        alert("PIN baru harus minimal 4 karakter (angka atau huruf).");
        document.getElementById('adm-new-pin')?.focus();
        return;
      }
      if (newPin !== confirmPin) {
        alert("Konfirmasi PIN tidak cocok dengan PIN baru! Silakan masukkan PIN yang sama persis.");
        document.getElementById('adm-confirm-pin')?.focus();
        return;
      }

      p.adminPinHash = await hashPin(newPin);
      delete p.adminPin; // Remove legacy plaintext
      document.getElementById('adm-new-pin').value = '';
      document.getElementById('adm-confirm-pin').value = '';
      showToast("PIN Admin baru berhasil disimpan & dienkripsi!", "success");
    }

    if (!p.social) p.social = {};
    p.social.instagram = document.getElementById('adm-instagram').value.trim();
    p.social.tiktok = document.getElementById('adm-tiktok').value.trim();
    p.social.shopee = document.getElementById('adm-shopee').value.trim();
    p.social.tokopedia = document.getElementById('adm-tokopedia').value.trim();

    saveCurrentData();
    renderAllSections();
    showToast("Profil toko berhasil diperbarui!");
  },

  populateContentForm() {
    const p = window.UMKM_APP.data.profile;
    if (!p) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val !== undefined && val !== null ? val : '';
    };

    // 1. About Us
    const ab = p.about || {};
    setVal('adm-about-tag', ab.tag || 'Tentang Kami');
    setVal('adm-about-title', ab.title || '');
    setVal('adm-about-p1', ab.paragraph1 || '');
    setVal('adm-about-p2', ab.paragraph2 || '');
    setVal('adm-about-stat-num', ab.statNumber || '10+ Tahun');
    setVal('adm-about-stat-text', ab.statText || 'Memberdayakan Komunitas Lokal');
    setVal('adm-about-image', ab.image || '');

    const defaultAbIcons = ['fa-solid fa-seedling', 'fa-solid fa-hand-holding-heart', 'fa-solid fa-box-archive', 'fa-solid fa-shield-halved'];
    const feats = ab.features || [];
    for (let i = 0; i < 4; i++) {
      setVal(`adm-about-f${i+1}-icon`, feats[i]?.icon || defaultAbIcons[i]);
      setVal(`adm-about-f${i+1}-title`, feats[i]?.title || '');
      setVal(`adm-about-f${i+1}-desc`, feats[i]?.desc || '');
    }

    // 2. Why Us
    const wy = p.whyUs || {};
    setVal('adm-whyus-tag', wy.tag || 'Mengapa Memilih Kami?');
    setVal('adm-whyus-title', wy.title || 'Komitmen Kualitas & Pelayanan Terbaik');
    setVal('adm-whyus-subtitle', wy.subtitle || 'Kenyamanan dan kepuasan Anda adalah prioritas utama kami dalam setiap transaksi.');

    const defaultWyIcons = ['fa-solid fa-shield-halved', 'fa-solid fa-truck-fast', 'fa-solid fa-hand-holding-heart', 'fa-brands fa-whatsapp'];
    const wItems = wy.items || p.highlights || [];
    for (let i = 0; i < 4; i++) {
      setVal(`adm-whyus-i${i+1}-icon`, wItems[i]?.icon || defaultWyIcons[i]);
      setVal(`adm-whyus-i${i+1}-title`, wItems[i]?.title || '');
      setVal(`adm-whyus-i${i+1}-desc`, wItems[i]?.desc || '');
    }

    // 3. Promo Banner
    const pr = p.promoBanner || {};
    setVal('adm-promo-badge', pr.badge || 'Layanan Kustom & Hampers');
    setVal('adm-promo-title', pr.title || 'Butuh Paket Hampers, Souvenir Acara, atau Pesanan Jumlah Banyak?');
    setVal('adm-promo-desc', pr.desc || '');
    setVal('adm-promo-btn-text', pr.btnText || 'Konsultasi Paket Custom');
    setVal('adm-promo-wa-msg', pr.waMessage || 'Halo Nusantara Artisan, saya tertarik dengan paket Hampers / Souvenir Custom.');

    // 4. Hero & Stats
    const hr = p.hero || {};
    setVal('adm-hero-badge1', hr.badge1 || '100% Karya Asli Nusantara');
    setVal('adm-hero-badge2', hr.badge2 || 'Siap Kirim Hari Ini');
    setVal('adm-hero-title1', hr.titlePart1 || 'Cita Rasa Otentik &');
    setVal('adm-hero-title2', hr.titlePart2 || 'Karya Pengrajin Nusantara');

    const st = p.stats || [];
    for (let i = 0; i < 4; i++) {
      setVal(`adm-stat-num-${i}`, st[i]?.number || '');
      setVal(`adm-stat-lbl-${i}`, st[i]?.label || '');
    }

    // 5. Testimonials Header
    const tSec = p.testimonialsSection || {};
    setVal('adm-testi-sec-tag', tSec.tag || 'Ulasan Pelanggan');
    setVal('adm-testi-sec-title', tSec.title || 'Apa Kata Mereka yang Sudah Mencoba?');
    setVal('adm-testi-sec-subtitle', tSec.subtitle || 'Cerita asli dari ribuan pelanggan yang telah menikmati produk dan layanan kami.');

    // 6. Contact Header & Form
    const cSec = p.contactSection || {};
    setVal('adm-contact-sec-tag', cSec.tag || 'Hubungi Kami');
    setVal('adm-contact-sec-title', cSec.title || 'Kunjungi Toko atau Pesan Daring');
    setVal('adm-contact-sec-subtitle', cSec.subtitle || 'Kami siap melayani kebutuhan informasi produk, pemesanan partai besar, atau sekadar silaturahmi langsung di gerai kami.');
    setVal('adm-contact-form-title-in', cSec.formTitle || 'Tanya Produk & Informasi');
    setVal('adm-contact-form-subtitle-in', cSec.formSubtitle || 'Tuliskan pesan Anda dan pesan akan otomatis diformat ke nomor WhatsApp Customer Service kami.');
  },

  savePageContent(e) {
    e.preventDefault();
    const p = window.UMKM_APP.data.profile;
    const getVal = (id) => document.getElementById(id)?.value.trim() || '';

    // 1. About Us
    if (!p.about) p.about = {};
    p.about.tag = getVal('adm-about-tag');
    p.about.title = getVal('adm-about-title');
    p.about.paragraph1 = getVal('adm-about-p1');
    p.about.paragraph2 = getVal('adm-about-p2');
    p.about.statNumber = getVal('adm-about-stat-num');
    p.about.statText = getVal('adm-about-stat-text');
    p.about.image = getVal('adm-about-image');

    const defaultAbIcons = ['fa-solid fa-seedling', 'fa-solid fa-hand-holding-heart', 'fa-solid fa-box-archive', 'fa-solid fa-shield-halved'];
    p.about.features = [0, 1, 2, 3].map(i => ({
      icon: getVal(`adm-about-f${i+1}-icon`) || defaultAbIcons[i],
      title: getVal(`adm-about-f${i+1}-title`),
      desc: getVal(`adm-about-f${i+1}-desc`)
    }));

    // 2. Why Us (Keunggulan)
    if (!p.whyUs) p.whyUs = {};
    p.whyUs.tag = getVal('adm-whyus-tag');
    p.whyUs.title = getVal('adm-whyus-title');
    p.whyUs.subtitle = getVal('adm-whyus-subtitle');

    const defaultWyIcons = ['fa-solid fa-shield-halved', 'fa-solid fa-truck-fast', 'fa-solid fa-hand-holding-heart', 'fa-brands fa-whatsapp'];
    p.whyUs.items = [0, 1, 2, 3].map(i => ({
      icon: getVal(`adm-whyus-i${i+1}-icon`) || defaultWyIcons[i],
      title: getVal(`adm-whyus-i${i+1}-title`),
      desc: getVal(`adm-whyus-i${i+1}-desc`)
    }));

    // 3. Promo Banner
    if (!p.promoBanner) p.promoBanner = {};
    p.promoBanner.badge = getVal('adm-promo-badge');
    p.promoBanner.title = getVal('adm-promo-title');
    p.promoBanner.desc = getVal('adm-promo-desc');
    p.promoBanner.btnText = getVal('adm-promo-btn-text');
    p.promoBanner.waMessage = getVal('adm-promo-wa-msg');

    // 4. Hero & Stats
    if (!p.hero) p.hero = {};
    p.hero.badge1 = getVal('adm-hero-badge1');
    p.hero.badge2 = getVal('adm-hero-badge2');
    p.hero.titlePart1 = getVal('adm-hero-title1');
    p.hero.titlePart2 = getVal('adm-hero-title2');

    p.stats = [0, 1, 2, 3].map(i => ({
      number: getVal(`adm-stat-num-${i}`),
      label: getVal(`adm-stat-lbl-${i}`)
    }));

    // 5. Testimonials Section
    if (!p.testimonialsSection) p.testimonialsSection = {};
    p.testimonialsSection.tag = getVal('adm-testi-sec-tag');
    p.testimonialsSection.title = getVal('adm-testi-sec-title');
    p.testimonialsSection.subtitle = getVal('adm-testi-sec-subtitle');

    // 6. Contact Section
    if (!p.contactSection) p.contactSection = {};
    p.contactSection.tag = getVal('adm-contact-sec-tag');
    p.contactSection.title = getVal('adm-contact-sec-title');
    p.contactSection.subtitle = getVal('adm-contact-sec-subtitle');
    p.contactSection.formTitle = getVal('adm-contact-form-title-in');
    p.contactSection.formSubtitle = getVal('adm-contact-form-subtitle-in');

    saveCurrentData();
    renderAllSections();
    showToast("Seluruh konten halaman berhasil disimpan & diperbarui!", "success");
  },

  renderAdminProductsTable() {
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody || !window.UMKM_APP.data.products) return;

    tbody.innerHTML = window.UMKM_APP.data.products.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" />
        </td>
        <td>
          <strong>${p.name}</strong><br>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${getCategoryName(p.category)}</span>
        </td>
        <td>${formatRupiah(p.price)}</td>
        <td>
          ${p.badge ? `<span class="badge badge-accent" style="font-size: 0.72rem;">${p.badge}</span>` : '-'}
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-secondary btn-sm" onclick="window.UMKM_ADMIN.editProduct('${p.id}')" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-secondary btn-sm" style="color: #ef4444;" onclick="window.UMKM_ADMIN.deleteProduct('${p.id}')" title="Hapus">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB untuk performa terbaik.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      document.getElementById('adm-prod-image').value = base64;
      showToast("Foto berhasil dimuat dari komputer!", "info");
    };
    reader.readAsDataURL(file);
  },

  saveProduct(e) {
    e.preventDefault();
    const id = this.isEditingProduct || 'prd-' + Date.now().toString(36);
    const name = document.getElementById('adm-prod-name').value.trim();
    const category = document.getElementById('adm-prod-category').value;
    const price = parseInt(document.getElementById('adm-prod-price').value) || 0;
    const originalPrice = parseInt(document.getElementById('adm-prod-original-price').value) || null;
    const badge = document.getElementById('adm-prod-badge').value.trim();
    const rating = parseFloat(document.getElementById('adm-prod-rating').value) || 5.0;
    const sales = parseInt(document.getElementById('adm-prod-sales').value) || 10;
    const image = document.getElementById('adm-prod-image').value.trim() || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
    const description = document.getElementById('adm-prod-desc').value.trim();
    const specsRaw = document.getElementById('adm-prod-specs').value.trim();

    // Parse specifications (Key: Value per line)
    const specifications = {};
    if (specsRaw) {
      specsRaw.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const k = parts[0].trim();
          const v = parts.slice(1).join(':').trim();
          if (k && v) specifications[k] = v;
        }
      });
    }

    const newProd = {
      id,
      name,
      category,
      price,
      originalPrice: originalPrice > 0 ? originalPrice : null,
      badge,
      rating,
      sales,
      image,
      description,
      specifications,
      inStock: true
    };

    if (this.isEditingProduct) {
      const idx = window.UMKM_APP.data.products.findIndex(p => p.id === this.isEditingProduct);
      if (idx !== -1) {
        window.UMKM_APP.data.products[idx] = newProd;
      }
      showToast(`Produk "${name}" berhasil diupdate!`);
    } else {
      window.UMKM_APP.data.products.unshift(newProd);
      showToast(`Produk baru "${name}" berhasil ditambahkan!`);
    }

    saveCurrentData();
    renderAllSections();
    this.renderAdminProductsTable();
    this.resetProductForm();
  },

  editProduct(productId) {
    const p = window.UMKM_APP.data.products.find(x => x.id === productId);
    if (!p) return;

    this.isEditingProduct = p.id;
    document.getElementById('adm-prod-name').value = p.name;
    document.getElementById('adm-prod-category').value = p.category;
    document.getElementById('adm-prod-price').value = p.price;
    document.getElementById('adm-prod-original-price').value = p.originalPrice || '';
    document.getElementById('adm-prod-badge').value = p.badge || '';
    document.getElementById('adm-prod-rating').value = p.rating || 5.0;
    document.getElementById('adm-prod-sales').value = p.sales || 0;
    document.getElementById('adm-prod-image').value = p.image || '';
    document.getElementById('adm-prod-desc').value = p.description || '';

    // Convert specs object back to multiline text
    if (p.specifications) {
      const lines = Object.entries(p.specifications).map(([k, v]) => `${k}: ${v}`).join('\n');
      document.getElementById('adm-prod-specs').value = lines;
    } else {
      document.getElementById('adm-prod-specs').value = '';
    }

    document.getElementById('admin-product-submit-btn').innerHTML = '<i class="fa-solid fa-check"></i> Simpan Perubahan Produk';
    document.getElementById('admin-product-cancel-btn').style.display = 'inline-flex';
    document.getElementById('admin-product-form-title').textContent = 'Edit Produk: ' + p.name;
    
    // Scroll form into view
    document.getElementById('admin-product-form')?.scrollIntoView({ behavior: 'smooth' });
  },

  deleteProduct(productId) {
    const p = window.UMKM_APP.data.products.find(x => x.id === productId);
    if (!p) return;

    if (confirm(`Apakah Anda yakin ingin menghapus produk "${p.name}"?`)) {
      window.UMKM_APP.data.products = window.UMKM_APP.data.products.filter(x => x.id !== productId);
      saveCurrentData();
      renderAllSections();
      this.renderAdminProductsTable();
      showToast(`Produk "${p.name}" telah dihapus.`);
    }
  },

  resetProductForm() {
    this.isEditingProduct = null;
    document.getElementById('admin-product-form')?.reset();
    document.getElementById('admin-product-submit-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Tambah Produk Baru';
    document.getElementById('admin-product-cancel-btn').style.display = 'none';
    document.getElementById('admin-product-form-title').textContent = 'Tambah Produk Baru';
  },

  saveTestimonial(e) {
    e.preventDefault();
    const name = document.getElementById('adm-testi-name')?.value.trim();
    const role = document.getElementById('adm-testi-role')?.value.trim();
    const rating = parseInt(document.getElementById('adm-testi-rating')?.value) || 5;
    const date = document.getElementById('adm-testi-date')?.value.trim() || 'Baru saja';
    const avatar = document.getElementById('adm-testi-avatar')?.value.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
    const comment = document.getElementById('adm-testi-comment')?.value.trim();

    if (!name || !comment) {
      alert("Harap lengkapi nama dan komentar ulasan.");
      return;
    }

    if (!window.UMKM_APP.data.testimonials) {
      window.UMKM_APP.data.testimonials = [];
    }

    if (this.isEditingTestimonial) {
      const idx = window.UMKM_APP.data.testimonials.findIndex(t => t.id === this.isEditingTestimonial);
      if (idx !== -1) {
        window.UMKM_APP.data.testimonials[idx] = {
          ...window.UMKM_APP.data.testimonials[idx],
          name,
          role,
          rating,
          date,
          avatar,
          comment
        };
        showToast("Ulasan berhasil diperbarui!");
      }
    } else {
      const newTesti = {
        id: 'tst-' + Date.now(),
        name,
        role,
        rating,
        date,
        avatar,
        comment
      };
      window.UMKM_APP.data.testimonials.unshift(newTesti);
      showToast("Ulasan baru berhasil ditambahkan!");
    }

    saveCurrentData();
    renderTestimonials();
    this.renderAdminTestimonialsTable();
    this.resetTestimonialForm();
  },

  editTestimonial(testimonialId) {
    const t = window.UMKM_APP.data.testimonials?.find(x => x.id === testimonialId);
    if (!t) return;

    this.isEditingTestimonial = t.id;
    document.getElementById('adm-testi-name').value = t.name;
    document.getElementById('adm-testi-role').value = t.role || '';
    document.getElementById('adm-testi-rating').value = t.rating || 5;
    document.getElementById('adm-testi-date').value = t.date || '';
    document.getElementById('adm-testi-avatar').value = t.avatar || '';
    document.getElementById('adm-testi-comment').value = t.comment || '';

    document.getElementById('admin-testi-submit-btn').innerHTML = '<i class="fa-solid fa-check"></i> Simpan Perubahan Ulasan';
    document.getElementById('admin-testi-cancel-btn').style.display = 'inline-flex';
    document.getElementById('admin-testimonial-form-title').textContent = 'Edit Ulasan: ' + t.name;

    document.getElementById('admin-testimonial-form')?.scrollIntoView({ behavior: 'smooth' });
  },

  resetTestimonialForm() {
    this.isEditingTestimonial = null;
    document.getElementById('admin-testimonial-form')?.reset();
    document.getElementById('admin-testi-submit-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Tambah Ulasan Baru';
    document.getElementById('admin-testi-cancel-btn').style.display = 'none';
    document.getElementById('admin-testimonial-form-title').textContent = 'Tambah Ulasan Pelanggan Baru';
  },

  renderAdminTestimonialsTable() {
    const tbody = document.getElementById('admin-testimonials-tbody');
    if (!tbody || !window.UMKM_APP.data.testimonials) return;

    tbody.innerHTML = window.UMKM_APP.data.testimonials.map(t => `
      <tr>
        <td>
          <img src="${t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${t.name}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />
        </td>
        <td><strong>${t.name}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${t.role}</span></td>
        <td><i class="fa-solid fa-star" style="color: #f59e0b;"></i> ${t.rating}</td>
        <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${t.comment}">"${t.comment}"</td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-secondary btn-sm" onclick="window.UMKM_ADMIN.editTestimonial('${t.id}')" title="Edit Ulasan">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-secondary btn-sm" style="color: #ef4444;" onclick="window.UMKM_ADMIN.deleteTestimonial('${t.id}')" title="Hapus Ulasan">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  deleteTestimonial(testimonialId) {
    if (confirm("Hapus ulasan ini?")) {
      window.UMKM_APP.data.testimonials = window.UMKM_APP.data.testimonials.filter(t => t.id !== testimonialId);
      saveCurrentData();
      renderTestimonials();
      this.renderAdminTestimonialsTable();
      showToast("Ulasan berhasil dihapus.");
    }
  },

  // Export JSON file so user can download & commit to GitHub repo
  exportJsonFile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.UMKM_APP.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "site-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("File site-data.json berhasil didownload! Tinggal push ke GitHub repository Anda.", "success");
  },

  // Import JSON file
  importJsonFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.profile && json.products) {
          window.UMKM_APP.data = json;
          saveCurrentData();
          renderAllSections();
          this.openAdminPanel();
          showToast("Data website berhasil diimpor!", "success");
        } else {
          alert("Format file JSON tidak valid. Pastikan berisi profile dan products.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  },

  // Reset to default initial data
  resetToDefault() {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data kembali ke pengaturan bawaan awal? Semua perubahan lokal akan dihapus.")) {
      localStorage.removeItem('umkm_site_data');
      window.UMKM_APP.data = DEFAULT_FALLBACK_DATA;
      saveCurrentData();
      renderAllSections();
      this.openAdminPanel();
      showToast("Data berhasil direset ke pengaturan awal.");
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.UMKM_ADMIN.init();
});
