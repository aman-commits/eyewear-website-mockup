/**
 * L'OPTIQUE - Maison de Lunetterie
 * Product Detail Page Controller: Dynamic URL Resolution, Gallery & Inquiries
 */

document.addEventListener("DOMContentLoaded", () => {
  initProductDetailPage();
});

function initProductDetailPage() {
  if (!window.CatalogueAPI) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  let product = null;
  if (productId) {
    product = window.CatalogueAPI.getProductById(productId);
  }

  // Graceful fallback for invalid/missing ID
  if (!product) {
    const all = window.CatalogueAPI.getProducts();
    product = all[0];
    if (productId && window.showToast) {
      window.showToast(`Frame reference "${productId}" was not found. Displaying our featured iconic curation: ${product.name}.`, "info");
    }
  }

  renderProductDetails(product);
  renderRelatedFrames(product);
  initSpecsAccordion();
}

/**
 * Render all product information, specs, gallery, and CTAs
 */
function renderProductDetails(product) {
  // Page Title
  document.title = `${product.name} | ${product.brandName} - L'Optique Eyewear`;

  // Breadcrumbs
  const breadcrumbs = document.getElementById("productBreadcrumbs");
  if (breadcrumbs) {
    breadcrumbs.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li class="breadcrumbs-separator">/</li>
      <li><a href="brands.html">Brands</a></li>
      <li class="breadcrumbs-separator">/</li>
      <li><a href="brand.html?brand=${encodeURIComponent(product.brandId)}">${product.brandName}</a></li>
      <li class="breadcrumbs-separator">/</li>
      <li style="color:#fff;">${product.name}</li>
    `;
  }

  // Brand Link & Badges
  const brandLink = document.getElementById("productBrandLink");
  if (brandLink) {
    brandLink.textContent = product.brandName;
    brandLink.href = `brand.html?brand=${encodeURIComponent(product.brandId)}`;
  }

  const badgeEl = document.getElementById("productBadge");
  if (badgeEl) badgeEl.textContent = product.badge;

  const stockBadge = document.getElementById("productStockBadge");
  if (stockBadge) stockBadge.textContent = product.boutiqueStatus;

  // Title & Metadata
  const titleEl = document.getElementById("productTitle");
  if (titleEl) titleEl.textContent = product.name;

  const modelSkuEl = document.getElementById("productModelSku");
  if (modelSkuEl) {
    modelSkuEl.textContent = `Model: ${product.modelNumber} • SKU: ${product.sku} • Shape: ${product.frameShape}`;
  }

  const priceEl = document.getElementById("productPrice");
  if (priceEl) priceEl.textContent = `$${product.price}`;

  const descEl = document.getElementById("productDescription");
  if (descEl) descEl.textContent = product.description;

  // Gallery
  renderGallery(product);

  // Color Swatches
  renderColorSwatches(product);

  // Dimensions
  renderDimensions(product);

  // Specifications
  renderSpecifications(product);

  // CTAs
  setupCTAs(product);
}

/**
 * Interactive Gallery with Thumbnails & Zoom
 */
function renderGallery(product) {
  const mainImg = document.getElementById("galleryMainImg");
  const thumbnailsContainer = document.getElementById("galleryThumbnails");
  if (!mainImg || !thumbnailsContainer) return;

  const images = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.primaryImage];

  mainImg.src = images[0];
  mainImg.alt = product.name;

  thumbnailsContainer.innerHTML = images.map((imgSrc, idx) => `
    <div class="gallery-thumbnail-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <img src="${imgSrc}" alt="${product.name} angle ${idx + 1}">
    </div>
  `).join("");

  const thumbnails = thumbnailsContainer.querySelectorAll(".gallery-thumbnail-item");
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const idx = thumb.getAttribute("data-index");
      mainImg.src = images[idx];
    });
  });
}

/**
 * Color Swatches Selector
 */
function renderColorSwatches(product) {
  const swatchesContainer = document.getElementById("colorSwatches");
  const colorNameEl = document.getElementById("selectedColorName");
  if (!swatchesContainer || !product.colors) return;

  if (colorNameEl && product.colors.length > 0) {
    colorNameEl.textContent = product.colors[0].name;
  }

  swatchesContainer.innerHTML = product.colors.map((c, idx) => `
    <button type="button" 
            class="color-swatch-btn ${idx === 0 ? 'active' : ''}" 
            style="background-color: ${c.hex};" 
            data-color-name="${c.name}"
            title="${c.name}">
    </button>
  `).join("");

  const buttons = swatchesContainer.querySelectorAll(".color-swatch-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const name = btn.getAttribute("data-color-name");
      if (colorNameEl) colorNameEl.textContent = name;
    });
  });
}

/**
 * Render Technical Dimensions
 */
function renderDimensions(product) {
  const container = document.getElementById("productDimensionsGrid");
  if (!container || !product.dimensions) return;

  container.innerHTML = `
    <div class="dimension-item">
      <div class="dim-val">${product.dimensions.lensWidth}</div>
      <div class="dim-label">Lens Width</div>
    </div>
    <div class="dimension-item">
      <div class="dim-val">${product.dimensions.bridgeWidth}</div>
      <div class="dim-label">Bridge Width</div>
    </div>
    <div class="dimension-item">
      <div class="dim-val">${product.dimensions.templeLength}</div>
      <div class="dim-label">Temple Length</div>
    </div>
    <div class="dimension-item">
      <div class="dim-val">${product.dimensions.frameHeight}</div>
      <div class="dim-label">Frame Height</div>
    </div>
  `;
}

/**
 * Render Technical Specs and Craftsmanship
 */
function renderSpecifications(product) {
  const craftEl = document.getElementById("craftsmanshipContent");
  if (craftEl) {
    craftEl.textContent = product.craftsmanship;
  }

  const featuresList = document.getElementById("featuresList");
  if (featuresList && product.features) {
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join("");
  }
}

/**
 * Bind Action CTAs (WhatsApp & Try-On Modal)
 */
function setupCTAs(product) {
  const whatsappBtn = document.getElementById("detailWhatsAppBtn");
  if (whatsappBtn) {
    whatsappBtn.href = window.getProductWhatsAppLink(product);
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener noreferrer";
  }

  const tryOnBtn = document.getElementById("detailTryOnBtn");
  if (tryOnBtn) {
    tryOnBtn.onclick = () => {
      window.openInquiryModal(`${product.brandName} ${product.name}`, product.sku);
    };
  }
}

/**
 * Specifications Accordion Click Toggle
 */
function initSpecsAccordion() {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      if (!body) return;
      const isHidden = window.getComputedStyle(body).display === "none";
      body.style.display = isHidden ? "block" : "none";
      const icon = header.querySelector(".accordion-icon");
      if (icon) icon.textContent = isHidden ? "−" : "+";
    });
  });
}

/**
 * Render Related Frames Recommendations
 */
function renderRelatedFrames(currentProduct) {
  const container = document.getElementById("relatedFramesGrid");
  if (!container || !window.CatalogueAPI) return;

  const related = window.CatalogueAPI.getRelatedProducts(currentProduct.id, 3);
  container.innerHTML = related.map(product => `
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
        </div>
        <div class="product-card-footer">
          <div class="product-card-price">
            <span>Catalogue Ref.</span>
            $${product.price}
          </div>
          <a href="product.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline btn-sm">
            Explore
          </a>
        </div>
      </div>
    </article>
  `).join("");
}
