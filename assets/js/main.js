/**
 * L'OPTIQUE - Maison de Lunetterie
 * Global Application Scripts & Interactive Features
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initGlobalModals();
  initSearchModal();
  initMobileDrawer();
  highlightActiveNavigation();
  initNewsletterForm();
  initFloatingConcierge();
});

// WhatsApp Concierge Configuration
const CONCIERGE_WHATSAPP_NUMBER = "18005550199";

/**
 * Generate a pre-filled WhatsApp inquiry link for a specific product
 */
function getProductWhatsAppLink(product) {
  if (!product) {
    const defaultMsg = encodeURIComponent("Hello L'Optique Concierge, I would like to inquire about your curated luxury eyewear collection and private boutique fittings.");
    return `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${defaultMsg}`;
  }

  const message = `Hello L'Optique Concierge, I am inquiring about the ${product.brandName} ${product.name} (Model: ${product.modelNumber}, SKU: ${product.sku}, Ref: $${product.price}). Could you please advise on boutique availability and styling consultation?`;
  return `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Sticky Header Scroll Behavior
 */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/**
 * Highlight active page in navigation links
 */
function highlightActiveNavigation() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href")?.toLowerCase();
    if (!href) return;

    if (
      (currentPath.endsWith(href) && href !== "index.html") ||
      (currentPath.endsWith("/") && href === "index.html") ||
      (currentPath.includes("catalog.html") && href.includes("catalog.html")) ||
      (currentPath.includes("brands.html") && href.includes("brands.html")) ||
      (currentPath.includes("brand.html") && href.includes("brands.html"))
    ) {
      link.classList.add("active");
    }
  });
}

/**
 * Global Search Modal Controller
 */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll("[data-action='open-search']");
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchModalInput");
  const searchResults = document.getElementById("searchResultsContainer");
  const closeBtn = searchModal?.querySelector(".modal-close-btn");

  if (!searchModal || !searchInput) return;

  function openSearch() {
    searchModal.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput.focus(), 100);
    renderSearchResults(searchInput.value);
  }

  function closeSearch() {
    searchModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  searchTriggers.forEach(btn => btn.addEventListener("click", openSearch));
  closeBtn?.addEventListener("click", closeSearch);

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal.classList.contains("active")) {
      closeSearch();
    }
    // Command/Ctrl + K shortcut to trigger search
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  searchInput.addEventListener("input", (e) => {
    renderSearchResults(e.target.value);
  });

  function renderSearchResults(query) {
    if (!searchResults || !window.CatalogueAPI) return;

    const trimmed = query ? query.trim() : "";
    let products = [];

    if (!trimmed) {
      // Default to showing popular featured items
      products = window.CatalogueAPI.getFeaturedProducts().slice(0, 5);
      searchResults.innerHTML = `
        <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--accent-gold); margin-bottom:0.75rem;">
          Curated Highlights
        </div>
      `;
    } else {
      products = window.CatalogueAPI.searchProducts(trimmed);
      searchResults.innerHTML = `
        <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:0.75rem;">
          Found ${products.length} frame${products.length === 1 ? '' : 's'} matching "${trimmed}"
        </div>
      `;
    }

    if (products.length === 0) {
      searchResults.innerHTML += `
        <div style="text-align:center; padding: 2.5rem 1rem; color:var(--text-muted);">
          <p style="font-size:1.1rem; color:#fff; margin-bottom:0.5rem;">No matching frames found</p>
          <p style="font-size:0.85rem;">Try searching for "Aviator", "Persol", "Titanium", or "Sunglasses".</p>
        </div>
      `;
      return;
    }

    const list = document.createElement("div");
    list.className = "search-results-list";

    products.forEach(p => {
      const item = document.createElement("a");
      item.href = `product.html?id=${encodeURIComponent(p.id)}`;
      item.className = "search-result-item";
      item.innerHTML = `
        <div class="search-result-thumb">
          <img src="${p.primaryImage}" alt="${p.name}">
        </div>
        <div style="flex:1;">
          <div style="font-size:0.7rem; color:var(--accent-gold); text-transform:uppercase; font-weight:600;">
            ${p.brandName} • ${p.category}
          </div>
          <div style="font-weight:600; color:#fff; font-size:0.95rem;">
            ${p.name}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Shape: ${p.frameShape} | Model: ${p.modelNumber}
          </div>
        </div>
        <div style="text-align:right;">
          <span style="font-family:var(--font-serif); font-size:1.1rem; color:#fff; font-weight:600;">$${p.price}</span>
        </div>
      `;
      list.appendChild(item);
    });

    searchResults.appendChild(list);
  }
}

/**
 * Boutique Appointment & Inquiry Modal
 */
function initGlobalModals() {
  const inquiryModal = document.getElementById("inquiryModal");
  if (!inquiryModal) return;

  const closeBtn = inquiryModal.querySelector(".modal-close-btn");
  const form = document.getElementById("boutiqueInquiryForm");

  window.openInquiryModal = function(productName = "", productSku = "") {
    const frameField = document.getElementById("inquiryFrameField");
    if (frameField) {
      frameField.value = productName ? `${productName} (${productSku})` : "General Boutique Consultation";
    }
    inquiryModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    inquiryModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn?.addEventListener("click", closeModal);
  inquiryModal.addEventListener("click", (e) => {
    if (e.target === inquiryModal) closeModal();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("inquiryName")?.value;
    const phone = document.getElementById("inquiryPhone")?.value;
    const date = document.getElementById("inquiryDate")?.value;
    const location = document.getElementById("inquiryLocation")?.value;
    const frame = document.getElementById("inquiryFrameField")?.value;

    showToast(`Thank you, ${name}! Your private fitting request for ${date || 'the upcoming weekend'} at our ${location} boutique has been submitted. Our concierge will contact you shortly on ${phone}.`, "success");
    form.reset();
    closeModal();
  });
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const openBtn = document.querySelector(".mobile-menu-btn");
  const drawer = document.getElementById("mobileDrawer");
  const closeBtn = drawer?.querySelector(".modal-close-btn");

  if (!openBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });

  const drawerLinks = drawer.querySelectorAll(".mobile-nav-link, .btn");
  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/**
 * Toast Notification System
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span style="font-size:1.2rem;">${type === 'success' ? '✓' : 'ℹ'}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.35s ease";
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/**
 * Newsletter Form Simulation
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast("Welcome to L'Optique Privé. You will receive private invitations to new optical releases.", "success");
        input.value = "";
      }
    });
  });
}

// Expose utilities to global window
window.getProductWhatsAppLink = getProductWhatsAppLink;
window.showToast = showToast;

/**
 * Floating Luxury Concierge Indicator
 */
function initFloatingConcierge() {
  if (document.getElementById("floatingConciergeWidget")) return;
  const pill = document.createElement("a");
  pill.id = "floatingConciergeWidget";
  pill.className = "floating-concierge-pill";
  pill.href = "https://wa.me/18005550199?text=Hello%20L'Optique%20Concierge,%20I%20would%20like%20to%20inquire%20about%20your%20curated%20eyewear%20catalogue.";
  pill.target = "_blank";
  pill.rel = "noopener noreferrer";
  pill.setAttribute("aria-label", "Direct Whatsapp Enquiry");
  pill.innerHTML = `
    <span class="live-indicator"></span>
    <span>Live Optical Stylist</span>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="color: #25d366;">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  `;
  document.body.appendChild(pill);
}
