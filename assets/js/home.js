/**
 * L'OPTIQUE - Maison de Lunetterie
 * Homepage Specific Controllers & Interactive Elements
 */

document.addEventListener("DOMContentLoaded", () => {
  renderBrandShowcase();
  renderFeaturedProducts("All");
  initCategoryTabs();
});

/**
 * Render Brand Cards on the Homepage
 */
function renderBrandShowcase() {
  const container = document.getElementById("brandsShowcaseGrid");
  if (!container || !window.CatalogueAPI) return;

  const brands = window.CatalogueAPI.getBrands();
  container.innerHTML = brands.map(brand => `
    <a href="brand.html?brand=${encodeURIComponent(brand.id)}" class="brand-card" aria-label="Explore ${brand.name} Collection">
      <div class="brand-card-img">
        <img src="${brand.heroImage}" alt="${brand.name} eyewear heritage" loading="lazy">
      </div>
      <div class="brand-card-body">
        <div class="brand-card-origin">${brand.origin} • Est. ${brand.founded}</div>
        <h3 class="brand-card-name">${brand.name}</h3>
        <p class="brand-card-tagline">${brand.tagline}</p>
        <div class="brand-card-footer">
          <span>${brand.aesthetic}</span>
          <span class="brand-card-cta">Explore House →</span>
        </div>
      </div>
    </a>
  `).join("");
}

/**
 * Render Featured Products Grid with Tabs
 */
function renderFeaturedProducts(category = "All") {
  const container = document.getElementById("featuredProductsGrid");
  if (!container || !window.CatalogueAPI) return;

  let products = window.CatalogueAPI.getFeaturedProducts();

  if (category === "Sunglasses") {
    products = products.filter(p => p.category === "Sunglasses");
  } else if (category === "Optical") {
    products = products.filter(p => p.category === "Optical");
  }

  // Display 2 rows at once (4 columns x 2 rows = 8 products)
  const displayProducts = products.slice(0, 8);

  container.innerHTML = displayProducts.map(product => `
    <article class="product-card">
      <div class="product-card-media">
        <img src="${product.primaryImage}" alt="${product.name}" loading="lazy">
        <span class="product-card-badge badge">${product.badge}</span>
        <span class="product-card-brand-tag">${product.brandName}</span>
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

/**
 * Featured Products Filter Tabs
 */
function initCategoryTabs() {
  const tabs = document.querySelectorAll("#featuredFilterNav .filter-pill-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");
      renderFeaturedProducts(category);
    });
  });
}
