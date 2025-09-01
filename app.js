// Application data
const providersData = {
  "providers": [
    {
      "name": "Cloudflare",
      "person": "Yash Shokeen",
      "logo": "☁️",
      "pricing": {"free": 0, "pro": 20, "business": 200, "enterprise": 500},
      "sla": {"uptime": 100.0, "downtime_minutes": 0, "pop_count": 330},
      "services": {"cdn": true, "waf": true, "ddos": true, "lb": true, "dns": true, "zt": true, "sase": true, "api": true, "bot": true},
      "service_types": {"iaas": 70, "paas": 85, "saas": 95},
      "strengths": ["Global edge network", "Superior performance", "Zero downtime SLA", "Comprehensive security"],
      "weaknesses": ["Higher pricing", "Complex configuration"],
      "best_for": "Large enterprises needing global performance and maximum uptime"
    },
    {
      "name": "IBM Cloud",
      "person": "Adithya Venkatesh", 
      "logo": "🔵",
      "pricing": {"free": 0, "pro": 150, "business": 400, "enterprise": 800},
      "sla": {"uptime": 99.9, "downtime_minutes": 43.2, "pop_count": 60},
      "services": {"cdn": true, "waf": true, "ddos": true, "lb": true, "dns": true, "zt": true, "sase": false, "api": true, "bot": true},
      "service_types": {"iaas": 90, "paas": 85, "saas": 70},
      "strengths": ["Enterprise integration", "AI/ML capabilities", "Hybrid cloud expertise", "Strong compliance"],
      "weaknesses": ["Complex pricing", "Steep learning curve"],
      "best_for": "Enterprises with existing IBM infrastructure and compliance requirements"
    },
    {
      "name": "Cisco",
      "person": "Shubham Tripathi",
      "logo": "🔐",
      "pricing": {"free": 0, "pro": 135, "business": 300, "enterprise": 750},
      "sla": {"uptime": 99.99, "downtime_minutes": 4.32, "pop_count": 150},
      "services": {"cdn": true, "waf": true, "ddos": true, "lb": true, "dns": true, "zt": true, "sase": true, "api": true, "bot": true},
      "service_types": {"iaas": 80, "paas": 90, "saas": 85},
      "strengths": ["Comprehensive security suite", "Network expertise", "Enterprise focus", "Strong support"],
      "weaknesses": ["Vendor lock-in", "Complex deployment"],
      "best_for": "Organizations already using Cisco networking infrastructure"
    },
    {
      "name": "Hetzner",
      "person": "Arpit Patras Lakra",
      "logo": "🔶",
      "pricing": {"free": 0, "pro": 16, "business": 48, "enterprise": 160},
      "sla": {"uptime": 99.9, "downtime_minutes": 43.2, "pop_count": 6},
      "services": {"cdn": false, "waf": false, "ddos": true, "lb": true, "dns": false, "zt": false, "sase": false, "api": false, "bot": false},
      "service_types": {"iaas": 95, "paas": 30, "saas": 20},
      "strengths": ["Excellent price-performance", "European data centers", "Simple pricing", "High-performance hardware"],
      "weaknesses": ["Limited global presence", "Basic security features", "EU-focused"],
      "best_for": "Cost-conscious European businesses needing basic cloud infrastructure"
    },
    {
      "name": "Zscaler",
      "person": "Palak Vijayvargiya",
      "logo": "🛡️",
      "pricing": {"free": 0, "pro": 84, "business": 168, "enterprise": 336},
      "sla": {"uptime": 99.99, "downtime_minutes": 4.32, "pop_count": 100},
      "services": {"cdn": false, "waf": true, "ddos": true, "lb": false, "dns": true, "zt": true, "sase": true, "api": true, "bot": true},
      "service_types": {"iaas": 40, "paas": 60, "saas": 95},
      "strengths": ["Zero Trust pioneer", "Cloud-native security", "SASE leader", "Strong threat intelligence"],
      "weaknesses": ["Limited infrastructure services", "Security-focused only"],
      "best_for": "Organizations prioritizing zero trust security and remote work"
    },
    {
      "name": "Vultr",
      "person": "Prasanna Priyan R M",
      "logo": "⚡",
      "pricing": {"free": 0, "pro": 28, "business": 80, "enterprise": 224},
      "sla": {"uptime": 99.99, "downtime_minutes": 4.32, "pop_count": 32},
      "services": {"cdn": true, "waf": false, "ddos": true, "lb": true, "dns": true, "zt": false, "sase": false, "api": false, "bot": false},
      "service_types": {"iaas": 90, "paas": 50, "saas": 40},
      "strengths": ["Competitive pricing", "Developer-friendly", "Global locations", "Simple management"],
      "weaknesses": ["Limited enterprise features", "Basic security", "Smaller scale"],
      "best_for": "Developers and startups needing cost-effective global infrastructure"
    }
  ],
  "questions": [
    {
      "id": "budget",
      "text": "What's your monthly budget range?",
      "options": ["Under $50", "$50-200", "$200-500", "$500+"]
    },
    {
      "id": "size",
      "text": "What's your organization size?",
      "options": ["Startup (1-10)", "Small (11-50)", "Medium (51-250)", "Enterprise (250+)"]
    },
    {
      "id": "priority",
      "text": "What's your top priority?",
      "options": ["Cost efficiency", "Maximum uptime", "Security features", "Global coverage"]
    },
    {
      "id": "region",
      "text": "Where are your users primarily located?",
      "options": ["North America", "Europe", "Asia Pacific", "Global"]
    }
  ]
};

// Service labels mapping
const serviceLabels = {
  'cdn': 'CDN',
  'waf': 'WAF',
  'ddos': 'DDoS Protection',
  'lb': 'Load Balancing',
  'dns': 'DNS Security',
  'zt': 'Zero Trust',
  'sase': 'SASE',
  'api': 'API Security',
  'bot': 'Bot Management'
};

// Application state
let currentView = 'dashboard';
let isAnnualBilling = false;
let teamSize = 10;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  renderDashboard();
  renderPricing();
  renderSLA();
  renderServiceMatrix();
  renderProviderSelector();
  renderRecommendationQuiz();
  
  // Add event listeners
  document.getElementById('billing-toggle').addEventListener('change', handleBillingToggle);
  document.getElementById('team-size').addEventListener('input', handleTeamSizeChange);
  document.getElementById('provider-select').addEventListener('change', handleProviderSelection);
});

// Navigation
function initializeNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewName = tab.dataset.view;
      switchView(viewName);
    });
  });
}

function switchView(viewName) {
  // Update nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === viewName);
  });
  
  // Update views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === viewName);
  });
  
  currentView = viewName;
}

// Dashboard rendering
function renderDashboard() {
  const grid = document.querySelector('.overview-grid');
  grid.innerHTML = '';
  
  providersData.providers.forEach(provider => {
    const card = document.createElement('div');
    card.className = 'provider-card';
    card.innerHTML = `
      <div class="provider-header">
        <div class="provider-logo">${provider.logo}</div>
        <div>
          <h3 class="provider-name">${provider.name}</h3>
          <p class="provider-person">Consultant: ${provider.person}</p>
        </div>
      </div>
      <div class="provider-metrics">
        <div class="metric">
          <p class="metric-value">${provider.sla.uptime}%</p>
          <p class="metric-label">Uptime SLA</p>
        </div>
        <div class="metric">
          <p class="metric-value">${provider.sla.pop_count}</p>
          <p class="metric-label">Global PoPs</p>
        </div>
        <div class="metric">
          <p class="metric-value">$${provider.pricing.pro}</p>
          <p class="metric-label">Pro Plan</p>
        </div>
        <div class="metric">
          <p class="metric-value">${countServices(provider.services)}/9</p>
          <p class="metric-label">Services</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function countServices(services) {
  return Object.values(services).filter(Boolean).length;
}

// Pricing rendering
function renderPricing() {
  const pricingTable = document.querySelector('.pricing-table');
  const tiers = ['free', 'pro', 'business', 'enterprise'];
  
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Free</th>
          <th>Pro</th>
          <th>Business</th>
          <th>Enterprise</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  providersData.providers.forEach(provider => {
    tableHTML += `<tr>
      <td><strong>${provider.logo} ${provider.name}</strong></td>`;
    
    tiers.forEach(tier => {
      const price = provider.pricing[tier];
      const displayPrice = price === 0 ? 'Free' : `$${getAdjustedPrice(price)}`;
      tableHTML += `<td class="price-cell">${displayPrice}</td>`;
    });
    
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  pricingTable.innerHTML = tableHTML;
  
  updateCostCalculator();
}

function getAdjustedPrice(basePrice) {
  if (basePrice === 0) return 0;
  return isAnnualBilling ? Math.round(basePrice * 0.9) : basePrice;
}

function updateCostCalculator() {
  const calculatorResults = document.querySelector('.calculator-results');
  calculatorResults.innerHTML = '';
  
  providersData.providers.forEach(provider => {
    const monthlyPrice = getAdjustedPrice(provider.pricing.pro) * teamSize;
    const item = document.createElement('div');
    item.className = 'calculator-item';
    item.innerHTML = `
      <div class="calculator-provider">${provider.logo} ${provider.name}</div>
      <div class="calculator-cost">$${monthlyPrice.toLocaleString()}/mo</div>
    `;
    calculatorResults.appendChild(item);
  });
}

function handleBillingToggle(e) {
  isAnnualBilling = e.target.value === 'annual';
  renderPricing();
}

function handleTeamSizeChange(e) {
  teamSize = parseInt(e.target.value) || 1;
  updateCostCalculator();
}

// SLA rendering
function renderSLA() {
  const slaMetrics = document.querySelector('.sla-metrics');
  slaMetrics.innerHTML = '';
  
  providersData.providers.forEach(provider => {
    const card = document.createElement('div');
    card.className = 'sla-card';
    
    const uptimeClass = provider.sla.uptime === 100 ? 'excellent' : 
                       provider.sla.uptime >= 99.99 ? 'excellent' : 'good';
    
    card.innerHTML = `
      <h4>${provider.logo} ${provider.name}</h4>
      <div class="sla-uptime ${uptimeClass}">${provider.sla.uptime}%</div>
      <div class="sla-downtime">${provider.sla.downtime_minutes} min/month downtime</div>
      <div class="sla-pop">${provider.sla.pop_count} Global PoPs</div>
    `;
    slaMetrics.appendChild(card);
  });
}

// Service Matrix rendering
function renderServiceMatrix() {
  const serviceMatrix = document.querySelector('.service-matrix');
  const services = Object.keys(serviceLabels);
  
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          ${services.map(service => `<th>${serviceLabels[service]}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
  `;
  
  providersData.providers.forEach(provider => {
    tableHTML += `<tr>
      <td><strong>${provider.logo} ${provider.name}</strong></td>`;
    
    services.forEach(service => {
      const available = provider.services[service];
      const statusClass = available ? 'service-available' : 'service-unavailable';
      tableHTML += `<td><div class="service-status ${statusClass}"></div></td>`;
    });
    
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  serviceMatrix.innerHTML = tableHTML;
  
  renderServiceTypes();
}

function renderServiceTypes() {
  const serviceTypesGrid = document.querySelector('.service-types-grid');
  serviceTypesGrid.innerHTML = '';
  
  providersData.providers.forEach(provider => {
    const card = document.createElement('div');
    card.className = 'service-type-card';
    
    card.innerHTML = `
      <div class="service-type-header">
        <span class="service-type-name">${provider.logo} ${provider.name}</span>
      </div>
      <div class="service-type-bars">
        <div class="service-type-bar">
          <span>IaaS</span>
          <div class="service-type-progress">
            <div class="service-type-fill" style="width: ${provider.service_types.iaas}%"></div>
          </div>
          <span>${provider.service_types.iaas}%</span>
        </div>
        <div class="service-type-bar">
          <span>PaaS</span>
          <div class="service-type-progress">
            <div class="service-type-fill" style="width: ${provider.service_types.paas}%"></div>
          </div>
          <span>${provider.service_types.paas}%</span>
        </div>
        <div class="service-type-bar">
          <span>SaaS</span>
          <div class="service-type-progress">
            <div class="service-type-fill" style="width: ${provider.service_types.saas}%"></div>
          </div>
          <span>${provider.service_types.saas}%</span>
        </div>
      </div>
    `;
    serviceTypesGrid.appendChild(card);
  });
}

// Provider Details rendering
function renderProviderSelector() {
  const select = document.getElementById('provider-select');
  select.innerHTML = '<option value="">Select a provider</option>';
  
  providersData.providers.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider.name;
    option.textContent = `${provider.logo} ${provider.name}`;
    select.appendChild(option);
  });
}

function handleProviderSelection(e) {
  const providerName = e.target.value;
  const provider = providersData.providers.find(p => p.name === providerName);
  const detailsContainer = document.querySelector('.provider-details');
  
  if (!provider) {
    detailsContainer.innerHTML = '';
    return;
  }
  
  detailsContainer.innerHTML = `
    <div class="provider-info">
      <h3>${provider.logo} ${provider.name}</h3>
      <p><strong>Consultant:</strong> ${provider.person}</p>
      
      <h4>Strengths</h4>
      <ul class="strengths-list">
        ${provider.strengths.map(strength => `<li>${strength}</li>`).join('')}
      </ul>
      
      <h4>Considerations</h4>
      <ul class="weaknesses-list">
        ${provider.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
      </ul>
      
      <div class="best-for">
        <strong>Best for:</strong> ${provider.best_for}
      </div>
    </div>
    
    <div class="provider-info">
      <h3>Key Metrics</h3>
      <div style="display: grid; gap: 16px;">
        <div>
          <h4>SLA & Performance</h4>
          <p><strong>Uptime:</strong> ${provider.sla.uptime}%</p>
          <p><strong>Downtime:</strong> ${provider.sla.downtime_minutes} min/month</p>
          <p><strong>Global PoPs:</strong> ${provider.sla.pop_count}</p>
        </div>
        
        <div>
          <h4>Pricing (Monthly)</h4>
          <p><strong>Pro:</strong> $${provider.pricing.pro}</p>
          <p><strong>Business:</strong> $${provider.pricing.business}</p>
          <p><strong>Enterprise:</strong> $${provider.pricing.enterprise}</p>
        </div>
        
        <div>
          <h4>Service Coverage</h4>
          <p><strong>Total Services:</strong> ${countServices(provider.services)}/9</p>
          <p><strong>IaaS:</strong> ${provider.service_types.iaas}%</p>
          <p><strong>PaaS:</strong> ${provider.service_types.paas}%</p>
          <p><strong>SaaS:</strong> ${provider.service_types.saas}%</p>
        </div>
      </div>
    </div>
  `;
}

// Recommendation engine
function renderRecommendationQuiz() {
  const form = document.getElementById('recommendation-form');
  form.innerHTML = '';
  
  providersData.questions.forEach(question => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    
    questionDiv.innerHTML = `
      <h4>${question.text}</h4>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <label class="quiz-option">
            <input type="radio" name="${question.id}" value="${option}" required>
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    `;
    
    form.appendChild(questionDiv);
  });
  
  const submitDiv = document.createElement('div');
  submitDiv.className = 'quiz-submit';
  submitDiv.innerHTML = '<button type="submit" class="btn btn--primary btn--lg">Get Recommendation</button>';
  form.appendChild(submitDiv);
  
  // Add the event listener after creating the form
  form.addEventListener('submit', handleRecommendationSubmit);
}

function handleRecommendationSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const answers = {};
  
  for (let [key, value] of formData.entries()) {
    answers[key] = value;
  }
  
  const recommendation = calculateRecommendation(answers);
  displayRecommendation(recommendation);
}

function calculateRecommendation(answers) {
  let scores = {};
  
  // Initialize scores
  providersData.providers.forEach(provider => {
    scores[provider.name] = 0;
  });
  
  // Budget scoring
  if (answers.budget === "Under $50") {
    scores["Hetzner"] += 3;
    scores["Vultr"] += 2;
    scores["Cloudflare"] += 1;
  } else if (answers.budget === "$50-200") {
    scores["Vultr"] += 3;
    scores["Zscaler"] += 2;
    scores["Cisco"] += 2;
    scores["Cloudflare"] += 1;
  } else if (answers.budget === "$200-500") {
    scores["Cisco"] += 3;
    scores["Cloudflare"] += 2;
    scores["Zscaler"] += 2;
    scores["IBM Cloud"] += 1;
  } else {
    scores["IBM Cloud"] += 3;
    scores["Cisco"] += 2;
    scores["Cloudflare"] += 3;
  }
  
  // Size scoring
  if (answers.size === "Startup (1-10)") {
    scores["Hetzner"] += 3;
    scores["Vultr"] += 3;
    scores["Cloudflare"] += 1;
  } else if (answers.size === "Small (11-50)") {
    scores["Vultr"] += 2;
    scores["Zscaler"] += 2;
    scores["Cloudflare"] += 2;
  } else if (answers.size === "Medium (51-250)") {
    scores["Cisco"] += 3;
    scores["Zscaler"] += 2;
    scores["Cloudflare"] += 2;
  } else {
    scores["IBM Cloud"] += 3;
    scores["Cisco"] += 2;
    scores["Cloudflare"] += 3;
  }
  
  // Priority scoring
  if (answers.priority === "Cost efficiency") {
    scores["Hetzner"] += 3;
    scores["Vultr"] += 2;
  } else if (answers.priority === "Maximum uptime") {
    scores["Cloudflare"] += 3;
    scores["Cisco"] += 2;
  } else if (answers.priority === "Security features") {
    scores["Zscaler"] += 3;
    scores["Cisco"] += 2;
    scores["Cloudflare"] += 2;
  } else {
    scores["Cloudflare"] += 3;
    scores["IBM Cloud"] += 1;
  }
  
  // Region scoring
  if (answers.region === "Europe") {
    scores["Hetzner"] += 3;
  } else if (answers.region === "Global") {
    scores["Cloudflare"] += 3;
    scores["IBM Cloud"] += 1;
  }
  
  // Find the highest scoring provider
  let maxScore = 0;
  let recommendedProvider = null;
  
  for (let [name, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      recommendedProvider = providersData.providers.find(p => p.name === name);
    }
  }
  
  return recommendedProvider;
}

function displayRecommendation(provider) {
  const resultDiv = document.querySelector('.recommendation-result');
  const providerDiv = document.querySelector('.recommended-provider');
  
  providerDiv.innerHTML = `
    <div class="recommended-logo">${provider.logo}</div>
    <div class="recommended-info">
      <h4>${provider.name}</h4>
      <p class="recommended-reason">${provider.best_for}</p>
      <p style="margin-top: 12px; color: var(--color-text);">
        <strong>Pro Plan:</strong> $${provider.pricing.pro}/month<br>
        <strong>SLA:</strong> ${provider.sla.uptime}% uptime<br>
        <strong>Global PoPs:</strong> ${provider.sla.pop_count}
      </p>
    </div>
  `;
  
  resultDiv.classList.remove('hidden');
}