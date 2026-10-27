/**
 * L'OPTIQUE - Maison de Lunetterie
 * Dynamic Brand Page Controller: Heritage Showcase & Brand Frames
 */

document.addEventListener("DOMContentLoaded", () => {
  initBrandPage();
});

let currentBrand = null;
let brandCategoryFilter = "All";
let brandShapeFilter = "All";

function initBrandPage() {
  if (!window.CatalogueAPI) return;

  const params = new URLSearchParams(window.location.search);
  const brandId = params.get("brand");

  if (brandId) {
    currentBrand = window.CatalogueAPI.getBrandById(brandId);
  }

  // Graceful fallback to first brand if not found
  if (!currentBrand) {
    const brands = window.CatalogueAPI.getBrands();
    currentBrand = brands[0];
    if (brandId && window.showToast) {
      window.showToast(`House "${brandId}" was not found in our vault. Displaying curated collection from ${currentBrand.name}.`, "info");
    }
  }

  renderBrandHero(currentBrand);
  renderBrandFilters(currentBrand);
  renderBrandProducts();
  bindBrandFilterEvents();
}

/**
 * Render Brand Hero & Heritage Information
 */
function renderBrandHero(brand) {
  document.title = `${brand.name} Eyewear Collection | L'Optique`;

  const heroBg = document.getElementById("brandHeroBg");
  if (heroBg) {
    heroBg.src = brand.heroImage;
    heroBg.alt = `${brand.name} collection heritage`;
  }

  const originEl = document.getElementById("brandHeroOrigin");
  if (originEl) {
    originEl.textContent = `${brand.origin} • Founded in ${brand.founded}`;
  }

  const nameEl = document.getElementById("brandHeroName");
  if (nameEl) nameEl.textContent = brand.name;

  const taglineEl = document.getElementById("brandHeroTagline");
  if (taglineEl) taglineEl.textContent = brand.tagline;

  const bioEl = document.getElementById("brandHeroBio");
  if (bioEl) bioEl.textContent = brand.bio;

  // Signature Features
  const featuresContainer = document.getElementById("brandSignatureChips");
  if (featuresContainer && brand.signatureFeatures) {
    featuresContainer.innerHTML = brand.signatureFeatures.map(f => `
      <div class="brand-chip-item">✦ ${f}</div>
    `).join("");
  }

  // Concierge CTA
  const brandConciergeBtn = document.getElementById("brandConciergeBtn");
  if (brandConciergeBtn) {
    const msg = encodeURIComponent(`Hello L'Optique Concierge, I would like to consult with your ${brand.name} brand specialist regarding current catalogue availability.`);
    brandConciergeBtn.href = `https://wa.me/18005550199?text=${msg}`;
  }
}

/**
 * Render Shape Filter dropdown dynamically for this brand
 */
function renderBrandFilters(brand) {
  const shapeSelect = document.getElementById("brandShapeSelect");
  if (!shapeSelect) return;

  const products = window.CatalogueAPI.getProductsByBrand(brand.id);
  const shapes = [...new Set(products.map(p => p.frameShape))];

  shapeSelect.innerHTML = `<option value="All">All Frame Shapes</option>` + shapes.map(s => `
    <option value="${s}">${s}</option>
  `).join("");
}

/**
 * Bind Brand Page Filter Events
 */
function bindBrandFilterEvents() {
  const categoryPills = document.querySelectorAll("#brandCategoryNav .filter-pill-btn");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      brandCategoryFilter = pill.getAttribute("data-category");
      renderBrandProducts();
    });
  });

  const shapeSelect = document.getElementById("brandShapeSelect");
  shapeSelect?.addEventListener("change", (e) => {
    brandShapeFilter = e.target.value;
    renderBrandProducts();
  });

  const sortSelect = document.getElementById("brandSortSelect");
  sortSelect?.addEventListener("change", () => {
    renderBrandProducts();
  });
}

/**
 * Filter & Render Brand Specific Products Grid
 */
function renderBrandProducts() {
  const container = document.getElementById("brandProductsGrid");
  const countEl = document.getElementById("brandProductCount");
  const sortSelect = document.getElementById("brandSortSelect");
  if (!container || !currentBrand || !window.CatalogueAPI) return;

  let products = window.CatalogueAPI.getProductsByBrand(currentBrand.id);

  // Category Filter
  if (brandCategoryFilter !== "All") {
    products = products.filter(p => p.category.toLowerCase() === brandCategoryFilter.toLowerCase());
  }

  // Shape Filter
  if (brandShapeFilter !== "All") {
    products = products.filter(p => p.frameShape.toLowerCase() === brandShapeFilter.toLowerCase());
  }

  // Sort
  const sortBy = sortSelect ? sortSelect.value : "featured";
  if (sortBy === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Count
  if (countEl) {
    countEl.textContent = `Showing ${products.length} frame${products.length === 1 ? '' : 's'} from ${currentBrand.name}`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-dark-card); border: 1px solid var(--border-subtle); border-radius: 4px;">
        <h3 class="serif-display" style="color: #fff; font-size: 1.8rem; margin-bottom: 0.5rem;">No Frames Found in this Selection</h3>
        <p style="color: var(--text-sub); margin-bottom: 1.5rem; font-weight: 300;">Try selecting "All" categories to view the complete ${currentBrand.name} collection.</p>
        <button type="button" class="btn btn-outline" onclick="resetBrandFilters()">Reset Selection</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-card-media">
        <img src="${product.primaryImage}" alt="${product.name}" loading="lazy">
        <span class="product-card-badge badge">${product.badge}</span>
        <div class="product-card-actions-hover">
          <a href="product.html?id=${encodeURIComponent(product.id)}" class="btn btn-primary btn-sm" style="flex:1;">
            View Details
          </a>
          <a href="${window.getProductWhatsAppLink(product)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" title="Direct WhatsApp Inquiry" aria-label="Inquire via WhatsApp about ${product.name}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Inquire</span>
          </a>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category} • ${product.frameShape}</div>
        <h3 class="product-card-title">
          <a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
        </h3>
        <div class="product-card-specs">
          <span class="product-spec-chip">${product.frameMaterial}</span>
          <span class="product-spec-chip">${product.dimensions.lensWidth} Lens</span>
        </div>
        <div class="product-card-footer">
          <div class="product-card-price">
            <span>Catalogue Ref.</span>
            $${product.price}
          </div>
          <button type="button" class="btn btn-outline btn-sm" onclick="openInquiryModal('${product.brandName} ${product.name}', '${product.sku}')">
            Try-On
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function resetBrandFilters() {
  brandCategoryFilter = "All";
  brandShapeFilter = "All";

  const pills = document.querySelectorAll("#brandCategoryNav .filter-pill-btn");
  pills.forEach(p => {
    if (p.getAttribute("data-category") === "All") p.classList.add("active");
    else p.classList.remove("active");
  });

  const shapeSelect = document.getElementById("brandShapeSelect");
  if (shapeSelect) shapeSelect.value = "All";

  renderBrandProducts();
}

window.resetBrandFilters = resetBrandFilters;
