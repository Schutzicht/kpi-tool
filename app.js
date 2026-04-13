/* ============================================
   AGENSEA KPI TRACKER — APPLICATION LOGIC
   ============================================ */

// ── Supabase Client ───────────────────────────

const SUPABASE_URL = 'https://lkyyggkzdptfvlgwjeur.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreXlnZ2t6ZHB0ZnZsZ3dqZXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MTk5MDAsImV4cCI6MjA5MTE5NTkwMH0.JSQtJRXVaoF5y6C1G8GPdI21cpqJ8_-wr1Def8tcs-Q';

const db = (typeof window !== 'undefined' && window.supabase && window.supabase.createClient)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

function generateShareToken() {
    const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
    let token = '';
    for (let i = 0; i < 8; i++) token += chars[Math.floor(Math.random() * chars.length)];
    return token;
}

// ── KPI Library (all possible KPIs) ───────────

const ALL_KPIS = {
    ctr: {
        id: 'ctr', name: 'CTR', unit: '%', format: 'percentage', direction: 'higher_is_better', scalesWithTime: false,
        explanations: {
            bad: 'CTR onder target wijst op lage relevantie. Mogelijke oorzaken: advertentie sluit niet aan bij doelgroep, visuals zijn niet opvallend genoeg, of copy is niet overtuigend.',
            good: 'CTR boven target — de advertentie resoneert goed. Sterke combinatie van creative, copy en targeting.',
        },
        actions: {
            bad: 'Test nieuwe creatives en advertentieteksten. Verklein de doelgroep naar de meest relevante segmenten. Probeer andere advertentieformaten (carrousel, video).',
            good: 'Documenteer winnende creative-elementen voor toekomstige campagnes. Schaal budget op bij behoud van CTR.',
        },
    },
    cpc: {
        id: 'cpc', name: 'CPC', unit: '€', format: 'currency', direction: 'lower_is_better', scalesWithTime: false,
        explanations: {
            bad: 'CPC hoger dan target. Dit kan komen door veel concurrentie op de doelgroep, lage CTR (slechte relevantie), of een te brede doelgroep.',
            good: 'CPC onder target — efficiënte kosten per klik. Goede relevantie en weinig concurrentie in de veiling.',
        },
        actions: {
            bad: 'Verbeter CTR door betere creatives (dit verlaagt CPC). Scherp doelgroep aan of test minder competitieve segmenten. Overweeg handmatige biedingen.',
            good: 'Behoud huidige strategie. Overweeg budget te verhogen om meer volume te genereren tegen deze gunstige kosten.',
        },
    },
    cpm: {
        id: 'cpm', name: 'CPM', unit: '€', format: 'currency', direction: 'lower_is_better', scalesWithTime: false,
        explanations: {
            bad: 'CPM hoger dan target. Mogelijke oorzaken: smalle doelgroep met veel concurrentie, lage relevantiescore, of een duur advertentieformat.',
            good: 'CPM onder target — efficiënte vertoning. Goede relevantiescore en gunstige veilingpositie.',
        },
        actions: {
            bad: 'Verbreed de doelgroep licht om meer inventaris beschikbaar te maken. Test andere advertentieformaten. Verbeter de relevantiescore via betere creatives.',
            good: 'Behoud huidige strategie. Overweeg om het bespaarde budget te herinvesteren in volume of nieuwe doelgroepen.',
        },
    },
    conversieratio: {
        id: 'conversieratio', name: 'Conversieratio', unit: '%', format: 'percentage', direction: 'higher_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Conversieratio onder target. Mogelijke oorzaken: trage laadtijd, onduidelijke propositie, te veel frictie in het formulier, of mismatch tussen advertentie en landingspagina.',
            good: 'Conversieratio boven target — sterke aansluiting tussen advertentie, doelgroep en landingspagina. Het aanbod is relevant.',
        },
        actions: {
            bad: 'Optimaliseer de landingspagina: verkort het formulier, verduidelijk de propositie, voeg social proof toe. Test A/B-varianten.',
            good: 'Analyseer welke elementen bijdragen aan hoge conversie. Gebruik deze inzichten voor andere campagnes.',
        },
    },
    cpl: {
        id: 'cpl', name: 'CPL', unit: '€', format: 'currency', direction: 'lower_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Cost per lead boven target. Dit is een combinatie van hoge CPC en/of lage conversieratio.',
            good: 'CPL onder target — leads worden efficiënt gegenereerd. Goede balans tussen advertentiekosten en conversiekracht.',
        },
        actions: {
            bad: 'Focus op het verlagen van CPC (betere CTR) én verhogen van conversieratio (landingspagina-optimalisatie).',
            good: 'Schaal de campagne op. Meer budget kan meer leads opleveren zonder significante kostenverhoging.',
        },
    },
    video_view_rate: {
        id: 'video_view_rate', name: 'Video view rate', unit: '%', format: 'percentage', direction: 'higher_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Video view rate onder target. De video houdt kijkers niet vast. Mogelijke oorzaken: eerste seconden niet pakkend genoeg, video te lang, of niet relevant voor de doelgroep.',
            good: 'Video view rate boven target — de video houdt de aandacht vast. Sterke opening en relevante content voor de doelgroep.',
        },
        actions: {
            bad: 'Maak de eerste 3 seconden sterker (hook). Verkort de video. Test verschillende thumbnails. Overweeg ondertiteling.',
            good: 'Gebruik deze video als benchmark voor toekomstige content. Test langere varianten om engagement te verdiepen.',
        },
    },
    engagement_rate: {
        id: 'engagement_rate', name: 'Engagement rate', unit: '%', format: 'percentage', direction: 'higher_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Engagement rate onder target. De content genereert weinig interactie. Mogelijke oorzaken: niet prikkelend genoeg, geen duidelijke call-to-action, of verkeerde doelgroep.',
            good: 'Engagement rate boven target — de content resoneert sterk. Mensen reageren, liken en delen actief.',
        },
        actions: {
            bad: 'Voeg een vraag of stelling toe aan de copy. Gebruik meer persoonlijke/authentieke content. Test verschillende formats (carrousel, video, poll).',
            good: 'Analyseer welke elementen engagement drijven. Herhaal het format en de tone of voice in toekomstige campagnes.',
        },
    },
    volgers: {
        id: 'volgers', name: 'Nieuwe volgers', unit: 'volgers', format: 'number', direction: 'higher_is_better', scalesWithTime: true,
        explanations: {
            bad: 'Volgersgroei onder target. De campagne trekt onvoldoende nieuwe volgers aan. Mogelijk is de content niet overtuigend genoeg om mensen te laten volgen.',
            good: 'Volgersgroei boven target — de campagne bouwt effectief een publiek op. Sterke personal brand of company page positioning.',
        },
        actions: {
            bad: 'Zorg dat het profiel/pagina up-to-date en aantrekkelijk is. Voeg een duidelijke reden toe om te volgen. Overweeg Follower Ads.',
            good: 'Focus nu op het activeren van nieuwe volgers met organische content. Bouw een contentkalender om retentie te waarborgen.',
        },
    },
    cpv: {
        id: 'cpv', name: 'CPV', unit: '€', format: 'currency', direction: 'lower_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Cost per view is hoog. Mogelijke oorzaken: smalle doelgroep, hoge concurrentie, of lage relevantie van de video-content.',
            good: 'Cost per view onder target — videoweergaven worden efficiënt gegenereerd.',
        },
        actions: {
            bad: 'Test andere doelgroepsegmenten. Verbeter de video-thumbnail en openingsscène. Overweeg een breder targetingprofiel.',
            good: 'Schaal het budget op om meer views te genereren tegen deze kosten. Test varianten van de video.',
        },
    },
    bounce_rate: {
        id: 'bounce_rate', name: 'Bouncepercentage', unit: '%', format: 'percentage', direction: 'lower_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Bouncepercentage boven target. Bezoekers verlaten de pagina direct. Mogelijke oorzaken: trage laadtijd, mismatch tussen ad en landingspagina, of slechte mobiele ervaring.',
            good: 'Bouncepercentage onder target — bezoekers blijven op de pagina. Goede aansluiting tussen advertentie en landingspagina.',
        },
        actions: {
            bad: 'Controleer laadtijd (moet <3s). Zorg dat de landingspagina direct de belofte van de ad waarmaakt. Optimaliseer voor mobiel.',
            good: 'Behoud deze landingspagina-strategie. Overweeg meer pagina\'s op dezelfde manier in te richten.',
        },
    },
    time_on_page: {
        id: 'time_on_page', name: 'Tijd op pagina', unit: 'sec', format: 'number', direction: 'higher_is_better', scalesWithTime: false,
        explanations: {
            bad: 'Bezoekers besteden weinig tijd op de pagina. De content is mogelijk niet boeiend genoeg of de pagina laadt te traag.',
            good: 'Bezoekers besteden meer tijd dan verwacht op de pagina. De content is relevant en boeiend.',
        },
        actions: {
            bad: 'Maak de content scanbaar (koppen, bullets). Voeg visuele elementen toe. Controleer of de content aansluit bij de advertentiebelofte.',
            good: 'Overweeg een CTA lager op de pagina te plaatsen om de langere leestijd te benutten.',
        },
    },
};

// ── Campaign Types ────────────────────────────

const CAMPAIGN_TYPES = {
    leadgen: {
        name: 'Leadgeneratie',
        description: 'Leads genereren via formulieren of landingspagina\'s',
        kpiIds: ['ctr', 'cpc', 'cpm', 'conversieratio', 'cpl'],
        defaults: { ctr: 0.8, cpc: 3.50, cpm: 25.00, conversieratio: 0.6, cpl: 175.00 },
    },
    awareness: {
        name: 'Awareness / Branding',
        description: 'Bereik, zichtbaarheid en engagement vergroten',
        kpiIds: ['cpm', 'ctr', 'video_view_rate', 'engagement_rate', 'volgers'],
        defaults: { cpm: 20.00, ctr: 0.6, video_view_rate: 25.00, engagement_rate: 1.5, volgers: 50 },
    },
    traffic: {
        name: 'Website Traffic',
        description: 'Bezoekers naar website of landingspagina sturen',
        kpiIds: ['ctr', 'cpc', 'cpm', 'bounce_rate', 'time_on_page'],
        defaults: { ctr: 1.0, cpc: 3.00, cpm: 22.00, bounce_rate: 55.00, time_on_page: 45 },
    },
    video: {
        name: 'Video Views',
        description: 'Videoweergaven en engagement op videocontent',
        kpiIds: ['video_view_rate', 'cpv', 'cpm', 'engagement_rate', 'ctr'],
        defaults: { video_view_rate: 25.00, cpv: 0.08, cpm: 18.00, engagement_rate: 1.8, ctr: 0.5 },
    },
};

// Helper to get KPI definitions for a campaign
function getKPIsForCampaign(campaign) {
    const type = CAMPAIGN_TYPES[campaign.campaignType] || CAMPAIGN_TYPES.leadgen;
    return type.kpiIds.map(id => ALL_KPIS[id]).filter(Boolean);
}

// Legacy support: convert old KPI_DEFINITIONS references
function getKPIDefinitions(campaign) {
    return getKPIsForCampaign(campaign);
}

// ── Benchmarks per branche (LinkedIn Ads) ─────

const BENCHMARKS = {
    'tech_saas': {
        name: 'Technology / SaaS',
        kpis: {
            ctr:           { low: 0.35,  avg: 0.55,  good: 0.80,  excellent: 1.20 },
            cpc:           { low: 9.00,  avg: 6.50,  good: 4.00,  excellent: 2.50 },
            cpm:           { low: 45.00, avg: 33.00, good: 25.00, excellent: 18.00 },
            conversieratio:{ low: 0.15,  avg: 0.35,  good: 0.65,  excellent: 1.2 },
            cpl:           { low: 350,   avg: 220,   good: 150,   excellent: 90 },
        },
    },
    'financiele_dienstverlening': {
        name: 'Financiële dienstverlening',
        kpis: {
            ctr:           { low: 0.30,  avg: 0.48,  good: 0.70,  excellent: 1.00 },
            cpc:           { low: 11.00, avg: 7.50,  good: 5.00,  excellent: 3.00 },
            cpm:           { low: 55.00, avg: 40.00, good: 30.00, excellent: 22.00 },
            conversieratio:{ low: 0.3,   avg: 0.8,   good: 1.5,   excellent: 2.5 },
            cpl:           { low: 250,   avg: 170,   good: 110,   excellent: 70 },
        },
    },
    'gezondheidszorg': {
        name: 'Gezondheidszorg',
        kpis: {
            ctr:           { low: 0.32,  avg: 0.52,  good: 0.75,  excellent: 1.10 },
            cpc:           { low: 8.50,  avg: 5.80,  good: 3.80,  excellent: 2.20 },
            cpm:           { low: 42.00, avg: 30.00, good: 22.00, excellent: 15.00 },
            conversieratio:{ low: 0.4,   avg: 0.9,   good: 1.6,   excellent: 2.8 },
            cpl:           { low: 220,   avg: 150,   good: 95,    excellent: 55 },
        },
    },
    'onderwijs': {
        name: 'Onderwijs & Training',
        kpis: {
            ctr:           { low: 0.38,  avg: 0.58,  good: 0.85,  excellent: 1.30 },
            cpc:           { low: 7.00,  avg: 4.80,  good: 3.20,  excellent: 2.00 },
            cpm:           { low: 38.00, avg: 26.00, good: 18.00, excellent: 12.00 },
            conversieratio:{ low: 0.6,   avg: 1.2,   good: 2.0,   excellent: 3.5 },
            cpl:           { low: 180,   avg: 120,   good: 75,    excellent: 45 },
        },
    },
    'industrie_manufacturing': {
        name: 'Industrie / Manufacturing',
        kpis: {
            ctr:           { low: 0.28,  avg: 0.44,  good: 0.65,  excellent: 0.95 },
            cpc:           { low: 10.00, avg: 7.00,  good: 4.50,  excellent: 2.80 },
            cpm:           { low: 50.00, avg: 38.00, good: 28.00, excellent: 20.00 },
            conversieratio:{ low: 0.3,   avg: 0.7,   good: 1.3,   excellent: 2.2 },
            cpl:           { low: 280,   avg: 190,   good: 120,   excellent: 75 },
        },
    },
    'zakelijke_dienstverlening': {
        name: 'Zakelijke dienstverlening / B2B',
        kpis: {
            ctr:           { low: 0.33,  avg: 0.52,  good: 0.78,  excellent: 1.15 },
            cpc:           { low: 9.50,  avg: 6.00,  good: 3.80,  excellent: 2.40 },
            cpm:           { low: 48.00, avg: 35.00, good: 26.00, excellent: 18.00 },
            conversieratio:{ low: 0.4,   avg: 0.9,   good: 1.5,   excellent: 2.5 },
            cpl:           { low: 230,   avg: 155,   good: 100,   excellent: 60 },
        },
    },
    'recruitment_hr': {
        name: 'Recruitment / HR',
        kpis: {
            ctr:           { low: 0.40,  avg: 0.62,  good: 0.90,  excellent: 1.40 },
            cpc:           { low: 6.50,  avg: 4.20,  good: 2.80,  excellent: 1.80 },
            cpm:           { low: 35.00, avg: 24.00, good: 16.00, excellent: 10.00 },
            conversieratio:{ low: 0.8,   avg: 1.5,   good: 2.5,   excellent: 4.0 },
            cpl:           { low: 150,   avg: 100,   good: 65,    excellent: 40 },
        },
    },
    'e_commerce_retail': {
        name: 'E-commerce / Retail',
        kpis: {
            ctr:           { low: 0.30,  avg: 0.48,  good: 0.72,  excellent: 1.05 },
            cpc:           { low: 7.50,  avg: 5.00,  good: 3.30,  excellent: 2.00 },
            cpm:           { low: 40.00, avg: 28.00, good: 20.00, excellent: 14.00 },
            conversieratio:{ low: 0.5,   avg: 1.0,   good: 1.8,   excellent: 3.0 },
            cpl:           { low: 190,   avg: 130,   good: 85,    excellent: 50 },
        },
    },
    'vastgoed_bouw': {
        name: 'Vastgoed / Bouw',
        kpis: {
            ctr:           { low: 0.25,  avg: 0.42,  good: 0.62,  excellent: 0.90 },
            cpc:           { low: 11.00, avg: 7.50,  good: 5.00,  excellent: 3.20 },
            cpm:           { low: 52.00, avg: 40.00, good: 30.00, excellent: 22.00 },
            conversieratio:{ low: 0.2,   avg: 0.6,   good: 1.2,   excellent: 2.0 },
            cpl:           { low: 300,   avg: 200,   good: 130,   excellent: 80 },
        },
    },
    'non_profit': {
        name: 'Non-profit / Overheid',
        kpis: {
            ctr:           { low: 0.35,  avg: 0.55,  good: 0.82,  excellent: 1.25 },
            cpc:           { low: 6.00,  avg: 4.00,  good: 2.50,  excellent: 1.50 },
            cpm:           { low: 32.00, avg: 22.00, good: 15.00, excellent: 9.00 },
            conversieratio:{ low: 0.6,   avg: 1.2,   good: 2.2,   excellent: 3.5 },
            cpl:           { low: 160,   avg: 105,   good: 65,    excellent: 38 },
        },
    },
};

// ── State ─────────────────────────────────────

let campaigns = [];
let activeCampaignIndex = 0;
let currentView = 'dashboard'; // 'dashboard' or 'detail'

// ── Init ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadState();
    } catch (e) {
        console.warn('Load failed:', e);
    }
    if (campaigns.length === 0) {
        campaigns.push(createCampaign('LinkedIn Ads — Leadgeneratie Q2', 'Voorbeeldklant'));
        try { await saveState(); } catch (e) { console.warn('Save failed:', e); }
    }
    initBenchmarks();
    renderDashboard();
    bindEvents();
});

// ── Campaign CRUD ─────────────────────────────

function createCampaign(name, client, startDate, endDate, campaignType) {
    const type = CAMPAIGN_TYPES[campaignType] || CAMPAIGN_TYPES.leadgen;
    return {
        name,
        client: client || '',
        campaignType: campaignType || 'leadgen',
        shareToken: generateShareToken(),
        startDate: startDate || null,
        endDate: endDate || null,
        context: {
            audienceSize: '',
            budget: '',
            platform: 'LinkedIn Ads',
            notes: '',
        },
        businessKpis: {
            productValue: null,
            goal: null,
        },
        kpis: type.kpiIds.map(id => ({
            id,
            target: type.defaults[id] || 0,
            actual: null,
        })),
    };
}

function getActiveCampaign() {
    return campaigns[activeCampaignIndex];
}

// ── View Navigation ───────────────────────────

function showDashboard() {
    currentView = 'dashboard';
    document.getElementById('viewDashboard').style.display = '';
    document.getElementById('viewDetail').style.display = 'none';
    document.getElementById('navDashboard').classList.add('active');
    document.getElementById('navDetail').classList.remove('active');
    document.getElementById('navDetail').style.display = 'none';
    renderDashboard();
}

function showDetail(index) {
    activeCampaignIndex = index;
    currentView = 'detail';
    document.getElementById('viewDashboard').style.display = 'none';
    document.getElementById('viewDetail').style.display = '';
    document.getElementById('navDashboard').classList.remove('active');
    document.getElementById('navDetail').classList.add('active');
    document.getElementById('navDetail').style.display = '';

    const campaign = getActiveCampaign();
    document.getElementById('detailClientEdit').value = campaign.client || '';
    document.getElementById('detailCampaignEdit').value = campaign.name;

    // Show campaign type badge
    const typeLabel = document.getElementById('detailTypeLabel');
    const typeInfo = CAMPAIGN_TYPES[campaign.campaignType] || CAMPAIGN_TYPES.leadgen;
    if (typeLabel) typeLabel.textContent = typeInfo.name;

    renderPeriodBar();
    renderContext();
    renderBusinessKpis();
    renderTable();
    updateAll();
}

// ── Business KPIs ─────────────────────────────

function renderBusinessKpis() {
    const campaign = getActiveCampaign();
    if (!campaign.businessKpis) {
        campaign.businessKpis = { productValue: null, goal: null };
    }
    const bk = campaign.businessKpis;
    document.getElementById('bizProductValue').value = bk.productValue !== null && bk.productValue !== undefined ? formatValue(bk.productValue, 'currency') : '';
    document.getElementById('bizGoal').value = bk.goal !== null && bk.goal !== undefined ? formatValue(bk.goal, 'number') : '';
    updateBusinessDerived();
}

function getCampaignBudget(campaign) {
    if (!campaign || !campaign.context) return null;
    return parseValue(campaign.context.budget);
}

function updateBusinessDerived() {
    const campaign = getActiveCampaign();
    const bk = campaign.businessKpis || {};
    const budget = getCampaignBudget(campaign);
    const cacEl = document.getElementById('bizCac');
    const roasEl = document.getElementById('bizRoas');

    if (budget && bk.goal && bk.goal > 0) {
        cacEl.textContent = formatValue(budget / bk.goal, 'currency');
    } else {
        cacEl.textContent = '—';
    }

    if (bk.productValue && bk.goal && budget && budget > 0) {
        const roas = (bk.goal * bk.productValue) / budget;
        roasEl.textContent = roas.toFixed(2).replace('.', ',') + '×';
    } else {
        roasEl.textContent = '—';
    }
}

// ── Dashboard Rendering ───────────────────────

function getCampaignStatusCounts(campaign) {
    let greens = 0, oranges = 0, reds = 0, total = 0;
    getKPIsForCampaign(campaign).forEach((kpi, i) => {
        const data = campaign.kpis[i];
        if (data.actual === null) return;
        total++;
        const dev = calculateDeviation(data, kpi, campaign);
        const cls = getStatusClass(dev);
        if (cls === 'green') greens++;
        else if (cls === 'orange') oranges++;
        else if (cls === 'red') reds++;
    });
    return { greens, oranges, reds, total };
}

function renderDashboard() {
    const grid = document.getElementById('dashboardGrid');
    const empty = document.getElementById('dashboardEmpty');
    grid.innerHTML = '';

    if (campaigns.length === 0) {
        empty.style.display = '';
        return;
    }
    empty.style.display = 'none';

    // Group by client
    const groups = {};
    campaigns.forEach((c, i) => {
        const client = c.client || 'Zonder klant';
        if (!groups[client]) groups[client] = [];
        groups[client].push({ campaign: c, index: i });
    });

    // Sort clients alphabetically, "Zonder klant" last
    const sortedClients = Object.keys(groups).sort((a, b) => {
        if (a === 'Zonder klant') return 1;
        if (b === 'Zonder klant') return -1;
        return a.localeCompare(b);
    });

    sortedClients.forEach(clientName => {
        const items = groups[clientName];

        const group = document.createElement('div');
        group.className = 'client-group';

        // Client header
        group.innerHTML = `
            <div class="client-group-header">
                <span class="client-name">${clientName}</span>
                <span class="client-count">${items.length} campagne${items.length !== 1 ? 's' : ''}</span>
            </div>
        `;

        // Campaign cards
        const cardsWrap = document.createElement('div');
        cardsWrap.className = 'campaign-cards';

        items.forEach(({ campaign, index }) => {
            const counts = getCampaignStatusCounts(campaign);
            const info = getCampaignProgress(campaign);

            let periodText = '';
            if (info) {
                if (info.hasEnded) periodText = 'Afgelopen';
                else if (!info.hasStarted) periodText = `Start over ${info.remainingDays}d`;
                else periodText = `Dag ${info.elapsedDays}/${info.totalDays}`;
            } else if (campaign.startDate) {
                periodText = formatDate(campaign.startDate);
            }

            // KPI mini-pills
            let kpiPills = '';
            getKPIsForCampaign(campaign).forEach((kpi, i) => {
                const data = campaign.kpis[i];
                if (data.actual === null) {
                    kpiPills += `<span class="card-kpi neutral">${kpi.name}</span>`;
                } else {
                    const dev = calculateDeviation(data, kpi, campaign);
                    const cls = getStatusClass(dev);
                    kpiPills += `<span class="card-kpi ${cls}">${kpi.name}</span>`;
                }
            });

            const card = document.createElement('div');
            card.className = 'campaign-card';
            card.innerHTML = `
                <div class="card-top">
                    <span class="card-name">${campaign.name}</span>
                    ${periodText ? `<span class="card-period">${periodText}</span>` : ''}
                </div>
                <div class="card-kpis">${kpiPills}</div>
                <div class="card-bottom">
                    <div class="card-stats">
                        ${counts.total > 0 ? `
                            <span class="card-stat"><span class="card-stat-dot green"></span>${counts.greens}</span>
                            <span class="card-stat"><span class="card-stat-dot orange"></span>${counts.oranges}</span>
                            <span class="card-stat"><span class="card-stat-dot red"></span>${counts.reds}</span>
                        ` : '<span style="font-size:0.7rem;color:var(--muted);">Nog geen data</span>'}
                    </div>
                    <span class="card-arrow">&rarr;</span>
                </div>
            `;
            card.addEventListener('click', () => showDetail(index));
            cardsWrap.appendChild(card);
        });

        group.appendChild(cardsWrap);
        grid.appendChild(group);
    });
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Period / Progress ─────────────────────────

function getCampaignProgress(campaign) {
    if (!campaign.startDate || !campaign.endDate) return null;

    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const now = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    if (totalDays <= 0) return null;

    const elapsedDays = (now - start) / (1000 * 60 * 60 * 24);
    const progress = Math.max(0, Math.min(1, elapsedDays / totalDays));

    return {
        progress,
        elapsedDays: Math.max(0, Math.floor(elapsedDays)),
        totalDays: Math.floor(totalDays),
        remainingDays: Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24))),
        isActive: now >= start && now <= end,
        hasEnded: now > end,
        hasStarted: now >= start,
    };
}

function getProRataTarget(target, kpi, campaign) {
    if (!kpi.scalesWithTime) return target;
    const info = getCampaignProgress(campaign);
    if (!info) return target;
    return target * info.progress;
}

function renderPeriodBar() {
    const campaign = getActiveCampaign();
    document.getElementById('dateStart').value = campaign.startDate || '';
    document.getElementById('dateEnd').value = campaign.endDate || '';
    updateProgressBar();
}

function updateProgressBar() {
    const campaign = getActiveCampaign();
    const info = getCampaignProgress(campaign);

    const label = document.getElementById('progressLabel');
    const pct = document.getElementById('progressPct');
    const fill = document.getElementById('progressFill');
    const today = document.getElementById('progressToday');
    const note = document.getElementById('periodNote');

    if (!info) {
        label.textContent = 'Stel start- en einddatum in';
        pct.textContent = '';
        fill.style.width = '0%';
        today.classList.remove('visible');
        note.textContent = 'Zonder periode worden alle targets op eindwaarde vergeleken.';
        return;
    }

    const pctValue = Math.round(info.progress * 100);
    fill.style.width = pctValue + '%';
    pct.textContent = pctValue + '%';

    today.classList.add('visible');
    today.style.left = pctValue + '%';

    if (info.hasEnded) {
        label.textContent = `Campagne afgelopen — ${info.totalDays} dagen gelopen`;
        note.textContent = 'Campagne is afgerond. Alle targets worden op eindwaarde vergeleken.';
    } else if (!info.hasStarted) {
        label.textContent = `Campagne start over ${info.remainingDays} dagen`;
        note.textContent = 'Campagne is nog niet gestart.';
    } else {
        label.textContent = `Dag ${info.elapsedDays} van ${info.totalDays} — nog ${info.remainingDays} dagen`;
        note.textContent = 'Alle KPI\'s zijn ratio-gebaseerd en worden direct vergeleken met het volledige target.';
    }
}

// ── Campaign Context ──────────────────────────

function renderContext() {
    const campaign = getActiveCampaign();
    if (!campaign.context) {
        campaign.context = { audienceSize: '', budget: '', platform: 'LinkedIn Ads', notes: '' };
    }
    document.getElementById('ctxAudienceSize').value = campaign.context.audienceSize || '';
    document.getElementById('ctxBudget').value = campaign.context.budget || '';
    document.getElementById('ctxPlatform').value = campaign.context.platform || '';
    document.getElementById('ctxNotes').value = campaign.context.notes || '';
}

// ── Table Rendering ───────────────────────────

function renderTable() {
    const tbody = document.getElementById('kpiBody');
    tbody.innerHTML = '';
    const campaign = getActiveCampaign();

    getKPIsForCampaign(campaign).forEach((kpi, index) => {
        const data = campaign.kpis[index];
        const tr = document.createElement('tr');

        // KPI Name
        const tdName = document.createElement('td');
        tdName.innerHTML = `<span class="kpi-name">${kpi.name}</span><span class="kpi-unit">${kpi.unit}</span>`;
        tr.appendChild(tdName);

        // Target
        const tdTarget = document.createElement('td');
        const inputTarget = document.createElement('input');
        inputTarget.type = 'text';
        inputTarget.className = 'editable';
        inputTarget.value = formatValue(data.target, kpi.format);
        inputTarget.dataset.kpiIndex = index;
        inputTarget.dataset.field = 'target';
        inputTarget.addEventListener('focus', onFieldFocus);
        inputTarget.addEventListener('blur', onFieldBlur);
        inputTarget.addEventListener('keydown', onFieldKeydown);
        tdTarget.appendChild(inputTarget);
        tr.appendChild(tdTarget);

        // Actual
        const tdActual = document.createElement('td');
        const inputActual = document.createElement('input');
        inputActual.type = 'text';
        inputActual.className = 'editable';
        inputActual.value = data.actual !== null ? formatValue(data.actual, kpi.format) : '—';
        inputActual.dataset.kpiIndex = index;
        inputActual.dataset.field = 'actual';
        inputActual.addEventListener('focus', onFieldFocus);
        inputActual.addEventListener('blur', onFieldBlur);
        inputActual.addEventListener('keydown', onFieldKeydown);
        tdActual.appendChild(inputActual);
        tr.appendChild(tdActual);

        // Status
        const tdStatus = document.createElement('td');
        tdStatus.innerHTML = getStatusPill(data, kpi, campaign);
        tr.appendChild(tdStatus);

        // Deviation
        const tdDev = document.createElement('td');
        tdDev.innerHTML = getDeviation(data, kpi, campaign);
        tr.appendChild(tdDev);

        // Explanation
        const tdExp = document.createElement('td');
        tdExp.innerHTML = `<span class="explanation-text">${getExplanation(data, kpi, campaign)}</span>`;
        tr.appendChild(tdExp);

        // Action
        const tdAction = document.createElement('td');
        tdAction.innerHTML = `<span class="action-text">${getAction(data, kpi, campaign)}</span>`;
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
    });
}

// ── Formatting ────────────────────────────────

function formatValue(value, format) {
    if (value === null || value === undefined) return '—';
    switch (format) {
        case 'number':
            return Number(value).toLocaleString('nl-NL');
        case 'percentage':
            return Number(value).toFixed(2).replace('.', ',') + '%';
        case 'currency':
            return '€ ' + Number(value).toFixed(2).replace('.', ',');
        default:
            return String(value);
    }
}

function parseValue(str) {
    if (!str || str === '—') return null;
    let cleaned = str.replace(/[€%\s]/g, '');

    // Detect format: if both dot and comma exist, last one is decimal separator
    const lastDot = cleaned.lastIndexOf('.');
    const lastComma = cleaned.lastIndexOf(',');

    if (lastComma > lastDot) {
        // Dutch: 1.234,56 → remove dots, replace comma
        cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else if (lastDot > lastComma) {
        // English: 1,234.56 → remove commas, keep dot
        cleaned = cleaned.replace(/,/g, '');
    } else {
        // Only one or neither: try comma as decimal
        cleaned = cleaned.replace(',', '.');
    }

    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}

// ── Status Logic ──────────────────────────────

function calculateDeviation(data, kpi, campaign) {
    if (data.actual === null || data.target === null || data.target === 0) return null;

    const effectiveTarget = getProRataTarget(data.target, kpi, campaign);
    if (effectiveTarget === 0) return null;

    if (kpi.direction === 'higher_is_better') {
        return ((data.actual - effectiveTarget) / effectiveTarget) * 100;
    } else {
        return ((effectiveTarget - data.actual) / effectiveTarget) * 100;
    }
}

function getStatusClass(deviation) {
    if (deviation === null) return 'neutral';
    if (deviation >= 0) return 'green';
    if (deviation >= -20) return 'orange';
    return 'red';
}

function getStatusLabel(statusClass) {
    switch (statusClass) {
        case 'green': return 'Op target';
        case 'orange': return 'Aandacht';
        case 'red': return 'Kritiek';
        default: return 'Geen data';
    }
}

function getStatusPill(data, kpi, campaign) {
    const dev = calculateDeviation(data, kpi, campaign);
    const cls = getStatusClass(dev);
    const label = getStatusLabel(cls);
    return `<span class="status-pill ${cls}"><span class="status-dot"></span>${label}</span>`;
}

function getDeviation(data, kpi, campaign) {
    const dev = calculateDeviation(data, kpi, campaign);
    if (dev === null) return `<span class="deviation neutral-val">—</span>`;

    const sign = dev >= 0 ? '+' : '';
    const formatted = sign + dev.toFixed(1).replace('.', ',') + '%';

    let cls = 'neutral-val';
    if (dev >= 0) cls = 'positive';
    else if (dev >= -20) cls = 'warning';
    else cls = 'negative';

    return `<span class="deviation ${cls}">${formatted}</span>`;
}

function getExplanation(data, kpi, campaign) {
    const dev = calculateDeviation(data, kpi, campaign);
    if (dev === null) return '<span style="color: var(--muted);">Vul de werkelijke waarde in.</span>';
    return dev >= 0 ? kpi.explanations.good : kpi.explanations.bad;
}

function getAction(data, kpi, campaign) {
    const dev = calculateDeviation(data, kpi, campaign);
    if (dev === null) return '<span style="color: var(--muted);">—</span>';
    return dev >= 0 ? kpi.actions.good : kpi.actions.bad;
}

// ── Summary ───────────────────────────────────

function updateSummary() {
    const campaign = getActiveCampaign();
    const counts = getCampaignStatusCounts(campaign);

    document.getElementById('statGreen').textContent = counts.greens;
    document.getElementById('statOrange').textContent = counts.oranges;
    document.getElementById('statRed').textContent = counts.reds;

    const badge = document.getElementById('summaryBadge');
    const text = document.getElementById('summaryText');

    const info = getCampaignProgress(campaign);
    let periodContext = '';
    if (info && info.isActive) {
        periodContext = ` We zitten op ${Math.round(info.progress * 100)}% van de looptijd (dag ${info.elapsedDays} van ${info.totalDays}).`;
    }

    if (counts.total === 0) {
        badge.className = 'summary-badge';
        badge.textContent = 'Geen data';
        text.textContent = 'Vul de werkelijke KPI-waarden in om een automatische samenvatting en analyse te genereren.';
        return;
    }

    const score = counts.greens / counts.total;

    if (score >= 0.8 && counts.reds === 0) {
        badge.className = 'summary-badge good';
        badge.textContent = 'Goed op koers';
        text.textContent = `De campagne "${campaign.name}" presteert sterk. ${counts.greens} van de ${counts.total} KPI's zitten op of boven target.${periodContext} De huidige strategie werkt — focus op opschalen en het vasthouden van deze resultaten.`;
    } else if (counts.reds >= 2 || score < 0.4) {
        badge.className = 'summary-badge critical';
        badge.textContent = 'Actie vereist';
        text.textContent = `De campagne "${campaign.name}" vraagt directe aandacht. ${counts.reds} KPI('s) scoren kritiek en ${counts.oranges} vragen aandacht.${periodContext} Bekijk onderstaande actiepunten per KPI en prioriteer de optimalisaties met de meeste impact.`;
    } else {
        badge.className = 'summary-badge warning';
        badge.textContent = 'Aandachtspunten';
        text.textContent = `De campagne "${campaign.name}" presteert gemiddeld. ${counts.greens} KPI('s) op target, maar ${counts.oranges + counts.reds} vragen aandacht.${periodContext} Focus op de oranje en rode KPI's hieronder voor gerichte optimalisatie.`;
    }
}

// ── Field Editing ─────────────────────────────

function onFieldFocus(e) {
    const input = e.target;
    const index = parseInt(input.dataset.kpiIndex);
    const field = input.dataset.field;
    const campaign = getActiveCampaign();
    const raw = campaign.kpis[index][field];
    input.value = raw !== null ? raw : '';
    input.select();
}

function onFieldBlur(e) {
    const input = e.target;
    const index = parseInt(input.dataset.kpiIndex);
    const field = input.dataset.field;
    const campaign = getActiveCampaign();
    const kpi = getKPIsForCampaign(campaign)[index];

    const parsed = parseValue(input.value);
    campaign.kpis[index][field] = parsed;
    input.value = parsed !== null ? formatValue(parsed, kpi.format) : '—';

    updateAll();
    saveState();
}

function onFieldKeydown(e) {
    if (e.key === 'Enter') {
        e.target.blur();
    }
}

// ── Update All Computed Fields ────────────────

function updateAll() {
    const campaign = getActiveCampaign();
    const kpiDefs = getKPIsForCampaign(campaign);
    const rows = document.querySelectorAll('#kpiBody tr');

    rows.forEach((tr, i) => {
        const kpi = kpiDefs[i];
        const data = campaign.kpis[i];

        tr.children[3].innerHTML = getStatusPill(data, kpi, campaign);
        tr.children[4].innerHTML = getDeviation(data, kpi, campaign);
        tr.children[5].innerHTML = `<span class="explanation-text">${getExplanation(data, kpi, campaign)}</span>`;
        tr.children[6].innerHTML = `<span class="action-text">${getAction(data, kpi, campaign)}</span>`;
    });

    updateProgressBar();
    updateSummary();
}

// ── Benchmark Logic ───────────────────────────

function initBenchmarks() {
    const select = document.getElementById('benchmarkBranch');
    Object.entries(BENCHMARKS).forEach(([key, branch]) => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = branch.name;
        select.appendChild(opt);
    });
}

function renderBenchmarkTable(branchKey) {
    const tbody = document.getElementById('benchmarkBody');
    const wrap = document.getElementById('benchmarkTableWrap');
    const btn = document.getElementById('btnApplyBenchmark');

    if (!branchKey) {
        tbody.innerHTML = '';
        wrap.style.display = 'none';
        btn.disabled = true;
        return;
    }

    const branch = BENCHMARKS[branchKey];
    if (!branch) return;

    wrap.style.display = 'block';
    btn.disabled = false;
    tbody.innerHTML = '';

    const campaign = getActiveCampaign();
    getKPIsForCampaign(campaign).forEach(kpi => {
        const bm = branch.kpis[kpi.id];
        if (!bm) return;

        const tr = document.createElement('tr');
        const isInverted = kpi.direction === 'lower_is_better';

        tr.innerHTML = `
            <td class="bm-kpi">${kpi.name} <span style="color: var(--muted); font-weight: 400; font-size: 0.7rem;">${kpi.unit}</span></td>
            <td class="${isInverted ? 'bm-excellent' : 'bm-low'}">${formatValue(bm.low, kpi.format)}</td>
            <td class="bm-avg">${formatValue(bm.avg, kpi.format)}</td>
            <td class="bm-good">${formatValue(bm.good, kpi.format)}</td>
            <td class="${isInverted ? 'bm-low' : 'bm-excellent'}">${formatValue(bm.excellent, kpi.format)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function applyBenchmarkAsTarget(branchKey) {
    const branch = BENCHMARKS[branchKey];
    if (!branch) return;

    const campaign = getActiveCampaign();
    getKPIsForCampaign(campaign).forEach((kpi, i) => {
        const bm = branch.kpis[kpi.id];
        if (bm) campaign.kpis[i].target = bm.good;
    });

    renderTable();
    updateAll();
    saveState();
}

// ── Client Share ──────────────────────────────

function generateShareLink() {
    const campaign = getActiveCampaign();
    const base = window.location.origin + window.location.pathname.replace('index.html', '');

    // Use short share token if campaign is in Supabase
    if (campaign.shareToken && db) {
        return base + 'client.html#' + campaign.shareToken;
    }

    // Fallback: encode data in URL
    const payload = {
        n: campaign.name,
        c: campaign.client,
        sd: campaign.startDate,
        ed: campaign.endDate,
        ctx: campaign.context,
        kpis: campaign.kpis.map(k => ({
            id: k.id,
            t: k.target,
            a: k.actual,
        })),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    return base + 'client.html#data:' + encoded;
}

// ── Events ────────────────────────────────────

function bindEvents() {
    // Nav
    document.getElementById('navDashboard').addEventListener('click', showDashboard);
    document.getElementById('navDetail').addEventListener('click', () => {
        if (currentView !== 'detail') showDetail(activeCampaignIndex);
    });
    document.getElementById('btnBackDashboard').addEventListener('click', showDashboard);

    // Add campaign (dashboard)
    document.getElementById('btnAddCampaignDash').addEventListener('click', openAddModal);

    // Inline edit: client name & campaign name
    document.getElementById('detailClientEdit').addEventListener('blur', (e) => {
        getActiveCampaign().client = e.target.value.trim();
        saveState();
    });

    document.getElementById('detailCampaignEdit').addEventListener('blur', (e) => {
        const val = e.target.value.trim();
        if (!val) { e.target.value = getActiveCampaign().name; return; }
        getActiveCampaign().name = val;
        saveState();
    });

    // Context fields
    ['ctxAudienceSize', 'ctxBudget', 'ctxPlatform', 'ctxNotes'].forEach(id => {
        document.getElementById(id).addEventListener('blur', () => {
            const campaign = getActiveCampaign();
            if (!campaign.context) campaign.context = {};
            campaign.context.audienceSize = document.getElementById('ctxAudienceSize').value;
            campaign.context.budget = document.getElementById('ctxBudget').value;
            campaign.context.platform = document.getElementById('ctxPlatform').value;
            campaign.context.notes = document.getElementById('ctxNotes').value;
            saveState();
        });
    });

    // Business KPI inputs
    const bizFields = [
        { id: 'bizProductValue', key: 'productValue', format: 'currency' },
        { id: 'bizGoal', key: 'goal', format: 'number' },
    ];
    bizFields.forEach(f => {
        const el = document.getElementById(f.id);
        el.addEventListener('focus', (e) => {
            const campaign = getActiveCampaign();
            const raw = campaign.businessKpis && campaign.businessKpis[f.key];
            e.target.value = raw !== null && raw !== undefined ? raw : '';
            e.target.select();
        });
        el.addEventListener('blur', (e) => {
            const campaign = getActiveCampaign();
            if (!campaign.businessKpis) campaign.businessKpis = { productValue: null, goal: null };
            const parsed = parseValue(e.target.value);
            campaign.businessKpis[f.key] = parsed;
            e.target.value = parsed !== null ? formatValue(parsed, f.format) : '—';
            updateBusinessDerived();
            saveState();
        });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
    });

    // Keep Max. CAC / ROAS in sync when the maandbudget changes
    document.getElementById('ctxBudget').addEventListener('blur', updateBusinessDerived);

    // Date inputs
    document.getElementById('dateStart').addEventListener('change', (e) => {
        getActiveCampaign().startDate = e.target.value || null;
        renderTable();
        updateAll();
        saveState();
    });

    document.getElementById('dateEnd').addEventListener('change', (e) => {
        getActiveCampaign().endDate = e.target.value || null;
        renderTable();
        updateAll();
        saveState();
    });

    // Modal: cancel / confirm / overlay click
    document.getElementById('btnModalCancel').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.remove('active');
    });

    document.getElementById('btnModalConfirm').addEventListener('click', () => {
        const name = document.getElementById('newCampaignName').value.trim();
        const client = document.getElementById('newClientName').value.trim();
        if (!name) return;
        const startDate = document.getElementById('newCampaignStart').value || null;
        const endDate = document.getElementById('newCampaignEnd').value || null;
        const campaignType = document.getElementById('newCampaignType').value;
        campaigns.push(createCampaign(name, client, startDate, endDate, campaignType));
        saveState();
        document.getElementById('modalOverlay').classList.remove('active');

        // Go to new campaign
        showDetail(campaigns.length - 1);
    });

    // Auto-calculate end date from start + duration
    function calcEndFromDuration() {
        const startVal = document.getElementById('newCampaignStart').value;
        const durVal = parseInt(document.getElementById('newCampaignDuration').value);
        const unit = document.getElementById('newCampaignDurationUnit').value;
        if (!startVal || !durVal || durVal <= 0) return;

        const start = new Date(startVal);
        if (unit === 'months') {
            start.setMonth(start.getMonth() + durVal);
        } else {
            start.setDate(start.getDate() + durVal * 7);
        }
        document.getElementById('newCampaignEnd').value = start.toISOString().split('T')[0];
    }

    document.getElementById('newCampaignDuration').addEventListener('input', calcEndFromDuration);
    document.getElementById('newCampaignDurationUnit').addEventListener('change', calcEndFromDuration);
    document.getElementById('newCampaignStart').addEventListener('change', calcEndFromDuration);

    // Clear duration when manually picking end date
    document.getElementById('newCampaignEnd').addEventListener('change', () => {
        document.getElementById('newCampaignDuration').value = '';
    });

    document.getElementById('newCampaignName').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('btnModalConfirm').click();
        if (e.key === 'Escape') document.getElementById('btnModalCancel').click();
    });

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
    });

    // Delete campaign
    document.getElementById('btnDeleteCampaign').addEventListener('click', () => {
        if (campaigns.length <= 1) {
            alert('Je moet minimaal één campagne behouden.');
            return;
        }
        if (!confirm(`Weet je zeker dat je "${getActiveCampaign().name}" wilt verwijderen?`)) return;
        const toDelete = getActiveCampaign();
        campaigns.splice(activeCampaignIndex, 1);
        activeCampaignIndex = Math.max(0, activeCampaignIndex - 1);
        deleteCampaignFromDB(toDelete);
        saveState();
        showDashboard();
    });

    // Export PDF
    document.getElementById('btnExport').addEventListener('click', () => {
        window.print();
    });

    // Share with client
    document.getElementById('btnShareClient').addEventListener('click', () => {
        const link = generateShareLink();
        document.getElementById('shareLink').value = link;
        document.getElementById('shareNote').textContent = '';
        document.getElementById('shareModalOverlay').classList.add('active');
    });

    document.getElementById('btnCopyLink').addEventListener('click', () => {
        const linkInput = document.getElementById('shareLink');
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value).then(() => {
            document.getElementById('shareNote').textContent = 'Link gekopieerd!';
        });
    });

    document.getElementById('btnShareClose').addEventListener('click', () => {
        document.getElementById('shareModalOverlay').classList.remove('active');
    });

    document.getElementById('shareModalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
    });

    // CSV Import
    document.getElementById('csvFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const result = parseCSV(evt.target.result);

            if (!result || Object.keys(result.values).length === 0) {
                showToast('Geen herkenbare KPI-kolommen gevonden in dit CSV-bestand.', true);
                e.target.value = '';
                return;
            }

            const applied = applyCSVData(result);
            renderTable();
            updateAll();
            saveState();

            const kpiNames = Object.keys(result.values).map(id => {
                return ALL_KPIS[id] ? ALL_KPIS[id].name : id;
            }).join(', ');

            showToast(`${applied} KPI's geïmporteerd uit ${result.rowCount} rij(en): ${kpiNames}`);
            e.target.value = '';
        };
        reader.readAsText(file);
    });

    // Benchmark toggle
    document.getElementById('btnToggleBenchmark').addEventListener('click', () => {
        document.getElementById('benchmarkContent').classList.toggle('open');
        document.getElementById('benchmarkArrow').classList.toggle('open');
    });

    document.getElementById('benchmarkBranch').addEventListener('change', (e) => {
        renderBenchmarkTable(e.target.value);
    });

    document.getElementById('btnApplyBenchmark').addEventListener('click', () => {
        const branchKey = document.getElementById('benchmarkBranch').value;
        if (!branchKey) return;
        const branchName = BENCHMARKS[branchKey].name;
        if (!confirm(`Wil je de "Goed" benchmarks van ${branchName} overnemen als targets?`)) return;
        applyBenchmarkAsTarget(branchKey);
    });
}

function openAddModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('newClientName').value = '';
    document.getElementById('newCampaignName').value = '';
    document.getElementById('newCampaignType').value = 'leadgen';
    document.getElementById('newCampaignStart').value = '';
    document.getElementById('newCampaignDuration').value = '';
    document.getElementById('newCampaignEnd').value = '';
    setTimeout(() => document.getElementById('newClientName').focus(), 100);
}

// ── LinkedIn CSV Import ───────────────────────

// Column name mappings (LinkedIn exports in EN/NL/DE)
const CSV_COLUMN_MAP = {
    // CTR
    'click-through rate': 'ctr',
    'click-through rate (ctr)': 'ctr',
    'ctr': 'ctr',
    'doorklikratio': 'ctr',
    'doorklikratio (ctr)': 'ctr',
    // CPC
    'average cpc': 'cpc',
    'avg. cpc': 'cpc',
    'gemiddelde cpc': 'cpc',
    'gem. cpc': 'cpc',
    'cpc': 'cpc',
    // CPM
    'average cpm': 'cpm',
    'avg. cpm': 'cpm',
    'gemiddelde cpm': 'cpm',
    'gem. cpm': 'cpm',
    'cpm': 'cpm',
    // Conversieratio
    'conversion rate': 'conversieratio',
    'conversieratio': 'conversieratio',
    'conversiepercentage': 'conversieratio',
    'conv. rate': 'conversieratio',
    // CPL / Cost per conversion
    'cost per conversion': 'cpl',
    'cost per lead': 'cpl',
    'kosten per conversie': 'cpl',
    'kosten per lead': 'cpl',
    'cpl': 'cpl',
    'cost per result': 'cpl',
    'kosten per resultaat': 'cpl',
    // Video view rate
    'video views at 25%': 'video_view_rate',
    'video views at 50%': 'video_view_rate',
    'video completion rate': 'video_view_rate',
    'view rate': 'video_view_rate',
    'video view rate': 'video_view_rate',
    'videoweergavepercentage': 'video_view_rate',
    // Engagement rate
    'engagement rate': 'engagement_rate',
    'betrokkenheidspercentage': 'engagement_rate',
    'engagementpercentage': 'engagement_rate',
    // Followers / Volgers
    'follows': 'volgers',
    'new followers': 'volgers',
    'follower count': 'volgers',
    'volgers': 'volgers',
    'nieuwe volgers': 'volgers',
    // CPV
    'cost per video view': 'cpv',
    'cpv': 'cpv',
    'kosten per videoweergave': 'cpv',
};

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;

    // Detect separator (comma or semicolon)
    const sep = lines[0].includes(';') ? ';' : ',';

    // Parse header
    const headers = parseCSVLine(lines[0], sep).map(h => h.trim().toLowerCase().replace(/"/g, ''));

    // Map headers to our KPI ids
    const columnMapping = {};
    headers.forEach((header, colIndex) => {
        const kpiId = CSV_COLUMN_MAP[header];
        if (kpiId) {
            columnMapping[kpiId] = colIndex;
        }
    });

    if (Object.keys(columnMapping).length === 0) return null;

    // Parse data rows and aggregate (LinkedIn can export multiple rows per campaign)
    const values = {};
    let rowCount = 0;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const cols = parseCSVLine(line, sep);
        rowCount++;

        Object.entries(columnMapping).forEach(([kpiId, colIndex]) => {
            if (colIndex >= cols.length) return;
            let val = cols[colIndex].replace(/"/g, '').trim();

            // Remove % sign and currency symbols
            val = val.replace(/[%€$]/g, '').trim();

            // Parse number (handle both , and . as decimal)
            const num = parseValue(val);
            if (num !== null) {
                if (!values[kpiId]) values[kpiId] = [];
                values[kpiId].push(num);
            }
        });
    }

    // For ratio KPIs, take the average; for cost KPIs, take the average too
    const result = {};
    Object.entries(values).forEach(([kpiId, nums]) => {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        result[kpiId] = Math.round(avg * 100) / 100;
    });

    return { values: result, rowCount };
}

function parseCSVLine(line, sep) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === sep && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function applyCSVData(csvResult) {
    const campaign = getActiveCampaign();
    let applied = 0;

    Object.entries(csvResult.values).forEach(([kpiId, value]) => {
        const kpiIndex = campaign.kpis.findIndex(k => k.id === kpiId);
        if (kpiIndex !== -1) {
            campaign.kpis[kpiIndex].actual = value;
            applied++;
        }
    });

    return applied;
}

function showToast(message, isError) {
    const toast = document.getElementById('importToast');
    toast.textContent = message;
    toast.className = 'import-toast visible' + (isError ? ' error' : '');
    setTimeout(() => { toast.className = 'import-toast'; }, 3500);
}

// ── Persistence (Supabase + localStorage fallback) ──

function migrateCampaign(c) {
    if (c.client === undefined) c.client = '';
    if (!c.campaignType) c.campaignType = 'leadgen';
    if (!c.shareToken) c.shareToken = generateShareToken();
    if (!c.context) c.context = { audienceSize: '', budget: '', platform: 'LinkedIn Ads', notes: '' };
    if (!c.businessKpis) c.businessKpis = { productValue: null, goal: null };
    // Migrate KPIs if they don't match the campaign type
    const expectedIds = (CAMPAIGN_TYPES[c.campaignType] || CAMPAIGN_TYPES.leadgen).kpiIds;
    const currentIds = c.kpis.map(k => k.id);
    if (JSON.stringify(currentIds) !== JSON.stringify(expectedIds)) {
        c.kpis = expectedIds.map(id => {
            const existing = c.kpis.find(k => k.id === id);
            return existing || { id, target: (CAMPAIGN_TYPES[c.campaignType] || CAMPAIGN_TYPES.leadgen).defaults[id] || 0, actual: null };
        });
    }
}

async function saveState() {
    // Always save to localStorage as fallback
    try {
        localStorage.setItem('agensea_kpi_campaigns', JSON.stringify(campaigns));
        localStorage.setItem('agensea_kpi_active', activeCampaignIndex);
    } catch (e) {}

    // Sync to Supabase
    if (!db) return;

    try {
        for (const c of campaigns) {
            if (!c.shareToken) c.shareToken = generateShareToken();

            const row = {
                share_token: c.shareToken,
                data: c,
            };

            if (c.dbId) {
                await db.from('campaigns').update({ data: c, updated_at: new Date().toISOString() }).eq('id', c.dbId);
            } else {
                const { data, error } = await db.from('campaigns').insert(row).select().single();
                if (data) {
                    c.dbId = data.id;
                }
            }
        }
    } catch (e) {
        console.warn('Supabase sync failed:', e);
    }
}

async function loadState() {
    // Try Supabase first
    if (db) {
        try {
            const { data, error } = await db.from('campaigns').select('*').order('created_at');
            if (data && data.length > 0) {
                campaigns = data.map(row => {
                    const c = row.data;
                    c.dbId = row.id;
                    c.shareToken = row.share_token;
                    migrateCampaign(c);
                    return c;
                });
                activeCampaignIndex = 0;
                return;
            }
        } catch (e) {
            console.warn('Supabase load failed, falling back to localStorage');
        }
    }

    // Fallback to localStorage
    try {
        const saved = localStorage.getItem('agensea_kpi_campaigns');
        if (saved) {
            campaigns = JSON.parse(saved);
            campaigns.forEach(migrateCampaign);
            activeCampaignIndex = parseInt(localStorage.getItem('agensea_kpi_active') || '0');
            if (activeCampaignIndex >= campaigns.length) activeCampaignIndex = 0;
        }
    } catch (e) {
        campaigns = [];
    }
}

async function deleteCampaignFromDB(campaign) {
    if (!db || !campaign.dbId) return;
    await db.from('campaigns').delete().eq('id', campaign.dbId);
}
