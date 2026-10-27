/**
 * L'OPTIQUE - Maison de Lunetterie
 * Master Catalogue Controller: Multi-Facet Search, Filter, Sort & Sync
 */

document.addEventListener("DOMContentLoaded", () => {
  initCataloguePage();
});

let currentFilters = {
  search: "",
  category: "All",
  brands: [],
  shapes: [],
  materials: [],
  sortBy: "featured"
};

function initCataloguePage() {
  if (!window.CatalogueAPI) return;

  parseUrlParameters();
  renderFilterOptions();
  bindFilterEvents();
  bindMobileFilterDrawer();
  applyFiltersAndRender();
}

/**
 * Parse initial filters from URL parameters
 */
function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("search")) currentFilters.search = params.get("search");
  if (params.has("q")) currentFilters.search = params.get("q");
  if (params.has("category")) currentFilters.category = params.get("category");
  if (params.has("sort")) currentFilters.sortBy = params.get("sort");

  if (params.has("brand")) {
    const brands = params.getAll("brand");
    currentFilters.brands = brands.map(b => b.toLowerCase());
  }

  if (params.has("shape")) {
    const shapes = params.getAll("shape");
    currentFilters.shapes = shapes;
  }
}

/**
 * Render Brand, Category, Shape, and Material Checkbox lists dynamically
 */
function renderFilterOptions() {
  const brandsList = document.getElementById("filterBrandsList");
  const shapesList = document.getElementById("filterShapesList");
  const materialsList = document.getElementById("filterMaterialsList");
  const searchInput = document.getElementById("catalogSearchInput");
  const sortSelect = document.getElementById("catalogSortSelect");

  if (searchInput) searchInput.value = currentFilters.search;
  if (sortSelect) sortSelect.value = currentFilters.sortBy;

  // Category Radios
  const categoryRadios = document.querySelectorAll("input[name='categoryFilter']");
  categoryRadios.forEach(radio => {
    if (radio.value.toLowerCase() === currentFilters.category.toLowerCase()) {
      radio.checked = true;
    }
  });

  // Brands
  if (brandsList) {
    const brands = window.CatalogueAPI.getBrands();
    brandsList.innerHTML = brands.map(b => {
      const isChecked = currentFilters.brands.includes(b.id.toLowerCase());
      const count = window.CatalogueAPI.getProductsByBrand(b.id).length;
      return `
        <label class="filter-checkbox-label">
          <input type="checkbox" name="brandFilter" value="${b.id}" ${isChecked ? 'checked' : ''}>
          <span>${b.name}</span>
          <span class="filter-checkbox-count">(${count})</span>
        </label>
      `;
    }).join("");
  }

  // Shapes
  if (shapesList) {
    const shapes = window.CatalogueAPI.getShapes();
    shapesList.innerHTML = shapes.map(s => {
      const isChecked = currentFilters.shapes.some(sh => sh.toLowerCase() === s.toLowerCase());
      const count = window.CatalogueAPI.getProducts(p => p.frameShape.toLowerCase().includes(s.toLowerCase())).length;
      return `
        <label class="filter-checkbox-label">
          <input type="checkbox" name="shapeFilter" value="${s}" ${isChecked ? 'checked' : ''}>
          <span>${s}</span>
          <span class="filter-checkbox-count">(${count})</span>
        </label>
      `;
    }).join("");
  }

  // Materials
  if (materialsList) {
    const materials = window.CatalogueAPI.getMaterials();
    materialsList.innerHTML = materials.map(m => {
      const isChecked = currentFilters.materials.includes(m);
      return `
        <label class="filter-checkbox-label">
          <input type="checkbox" name="materialFilter" value="${m}" ${isChecked ? 'checked' : ''}>
          <span>${m}</span>
        </label>
      `;
    }).join("");
  }
}

/**
 * Event Listeners for Filters and Inputs
 */
function bindFilterEvents() {
  const searchInput = document.getElementById("catalogSearchInput");
  const sortSelect = document.getElementById("catalogSortSelect");
  const filterForm = document.getElementById("catalogFilterForm");

  searchInput?.addEventListener("input", (e) => {
    currentFilters.search = e.target.value.trim();
    applyFiltersAndRender();
  });

  sortSelect?.addEventListener("change", (e) => {
    currentFilters.sortBy = e.target.value;
    applyFiltersAndRender();
  });

  filterForm?.addEventListener("change", (e) => {
    const target = e.target;

    if (target.name === "categoryFilter") {
      currentFilters.category = target.value;
    } else if (target.name === "brandFilter") {
      const checked = Array.from(document.querySelectorAll("input[name='brandFilter']:checked")).map(el => el.value.toLowerCase());
      currentFilters.brands = checked;
    } else if (target.name === "shapeFilter") {
      const checked = Array.from(document.querySelectorAll("input[name='shapeFilter']:checked")).map(el => el.value);
      currentFilters.shapes = checked;
    } else if (target.name === "materialFilter") {
      const checked = Array.from(document.querySelectorAll("input[name='materialFilter']:checked")).map(el => el.value);
      currentFilters.materials = checked;
    }

    applyFiltersAndRender();
  });

  const clearAllBtn = document.getElementById("clearAllFiltersBtn");
  clearAllBtn?.addEventListener("click", () => {
    resetFilters();
  });
}

function resetFilters() {
  currentFilters = {
    search: "",
    category: "All",
    brands: [],
    shapes: [],
    materials: [],
    sortBy: "featured"
  };

  const form = document.getElementById("catalogFilterForm");
  if (form) form.reset();
  const searchInput = document.getElementById("catalogSearchInput");
  if (searchInput) searchInput.value = "";
  const sortSelect = document.getElementById("catalogSortSelect");
  if (sortSelect) sortSelect.value = "featured";

  const allCategoryRadio = document.querySelector("input[name='categoryFilter'][value='All']");
  if (allCategoryRadio) allCategoryRadio.checked = true;

  applyFiltersAndRender();
}

/**
 * Filter, Sort, and Render Products Grid
 */
function applyFiltersAndRender() {
  const container = document.getElementById("catalogGrid");
  const countEl = document.getElementById("catalogResultCount");
  const chipsContainer = document.getElementById("activeFilterChips");
  if (!container || !window.CatalogueAPI) return;

  let products = window.CatalogueAPI.getProducts();

  // Search
  if (currentFilters.search) {
    const q = currentFilters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.frameShape.toLowerCase().includes(q) ||
      p.modelNumber.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }

  // Category
  if (currentFilters.category && currentFilters.category !== "All") {
    products = products.filter(p => p.category.toLowerCase() === currentFilters.category.toLowerCase());
  }

  // Brands
  if (currentFilters.brands.length > 0) {
    products = products.filter(p => currentFilters.brands.includes(p.brandId.toLowerCase()));
  }

  // Shapes
  if (currentFilters.shapes.length > 0) {
    products = products.filter(p => currentFilters.shapes.some(s => p.frameShape.toLowerCase().includes(s.toLowerCase())));
  }

  // Materials
  if (currentFilters.materials.length > 0) {
    products = products.filter(p => currentFilters.materials.includes(p.frameMaterial));
  }

  // Sorting
  if (currentFilters.sortBy === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === "name-asc") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Featured default
    products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  }

  // Update Result Count
  if (countEl) {
    countEl.innerHTML = `Showing <strong>${products.length}</strong> handcrafted optical frame${products.length === 1 ? '' : 's'}`;
  }

  // Update Mobile Filter Badge
  const activeCount = (currentFilters.search ? 1 : 0) +
                      (currentFilters.category !== "All" ? 1 : 0) +
                      currentFilters.brands.length +
                      currentFilters.shapes.length +
                      currentFilters.materials.length;
  const mobileBadge = document.getElementById("mobileFilterCountBadge");
  if (mobileBadge) {
    if (activeCount > 0) {
      mobileBadge.textContent = activeCount;
      mobileBadge.style.display = "inline-flex";
    } else {
      mobileBadge.style.display = "none";
    }
  }

  // Update Active Filter Chips
  renderFilterChips(chipsContainer);

  // Render Grid
  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 1.5rem; background: var(--bg-dark-card); border: 1px solid var(--border-subtle); border-radius: 4px;">
        <h3 class="serif-display" style="font-size: 2rem; color: #fff; margin-bottom: 0.75rem;">No Matching Eyewear Found</h3>
        <p style="color: var(--text-sub); max-width: 480px; margin: 0 auto 1.75rem; font-weight: 300;">
          We could not find any frames matching your specific filter criteria. Try clearing some selections or broadening your search.
        </p>
        <button type="button" class="btn btn-outline" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => `
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
 * Render Active Filter Chips
 */
function renderFilterChips(container) {
  if (!container) return;

  const chips = [];

  if (currentFilters.search) {
    chips.push({ label: `Search: "${currentFilters.search}"`, clear: () => { currentFilters.search = ""; document.getElementById("catalogSearchInput").value = ""; } });
  }

  if (currentFilters.category && currentFilters.category !== "All") {
    chips.push({ label: `Category: ${currentFilters.category}`, clear: () => { currentFilters.category = "All"; document.querySelector("input[name='categoryFilter'][value='All']").checked = true; } });
  }

  currentFilters.brands.forEach(bId => {
    const brand = window.CatalogueAPI.getBrandById(bId);
    chips.push({
      label: brand ? brand.name : bId,
      clear: () => {
        currentFilters.brands = currentFilters.brands.filter(b => b !== bId);
        const checkbox = document.querySelector(`input[name='brandFilter'][value='${bId}']`);
        if (checkbox) checkbox.checked = false;
      }
    });
  });

  currentFilters.shapes.forEach(s => {
    chips.push({
      label: `Shape: ${s}`,
      clear: () => {
        currentFilters.shapes = currentFilters.shapes.filter(x => x !== s);
        const checkbox = document.querySelector(`input[name='shapeFilter'][value='${s}']`);
        if (checkbox) checkbox.checked = false;
      }
    });
  });

  if (chips.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = chips.map((c, i) => `
    <span class="filter-chip">
      ${c.label}
      <span class="filter-chip-remove" data-chip-index="${i}">×</span>
    </span>
  `).join("") + `<button type="button" class="clear-all-filters-btn" id="clearAllFiltersBtn">Clear All Filters</button>`;

  const removeBtns = container.querySelectorAll(".filter-chip-remove");
  removeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      chips[idx].clear();
      applyFiltersAndRender();
    });
  });

  document.getElementById("clearAllFiltersBtn")?.addEventListener("click", resetFilters);
}

/**
 * Mobile Filter Drawer Controller
 */
function bindMobileFilterDrawer() {
  const toggleBtn = document.getElementById("mobileFilterToggleBtn");
  const sidebar = document.getElementById("catalogSidebar");
  const closeBtn = document.getElementById("closeSidebarBtn");
  const applyBtn = document.getElementById("applyMobileFiltersBtn");

  if (!toggleBtn || !sidebar) return;

  function openFilters() {
    sidebar.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeFilters() {
    sidebar.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openFilters);
  closeBtn?.addEventListener("click", closeFilters);
  applyBtn?.addEventListener("click", closeFilters);
}

window.resetFilters = resetFilters;
