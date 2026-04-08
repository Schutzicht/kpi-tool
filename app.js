/* ============================================
   AGENSEA KPI TRACKER — APPLICATION LOGIC
   ============================================ */

// ── KPI Definitions ───────────────────────────

const KPI_DEFINITIONS = [
    {
        id: 'bereik',
        name: 'Bereik',
        unit: 'personen',
        defaultTarget: 25000,
        format: 'number',
        direction: 'higher_is_better',
        scalesWithTime: true,
        explanations: {
            bad: 'Bereik valt lager uit dan verwacht. Mogelijke oorzaken: te beperkte targeting, laag budget, of hoge concurrentie in de veiling.',
            good: 'Bereik overtreft target. De doelgroep wordt goed bereikt — sterke biedstrategie en voldoende budgetruimte.',
        },
        actions: {
            bad: 'Controleer doelgroepgrootte en -overlap. Overweeg budget te verhogen of targeting te verbreden naar aanverwante functies of sectoren.',
            good: 'Behoud huidige instellingen. Overweeg om doelgroep juist te verfijnen voor hogere kwaliteit bereik.',
        },
    },
    {
        id: 'impressies',
        name: 'Impressies',
        unit: 'vertoningen',
        defaultTarget: 50000,
        format: 'number',
        direction: 'higher_is_better',
        scalesWithTime: true,
        explanations: {
            bad: 'Minder impressies dan verwacht. Kan wijzen op een te lage bieding, beperkt budget of advertentievermoeidheid.',
            good: 'Impressies boven target. De advertentie wordt goed vertoond — goede relevantiescore en voldoende budget.',
        },
        actions: {
            bad: 'Verhoog het dagbudget of pas de biedstrategie aan. Test nieuwe advertentievarianten om de relevantiescore te verbeteren.',
            good: 'Monitor frequency om advertentievermoeidheid te voorkomen. Overweeg A/B-testen om prestaties verder te optimaliseren.',
        },
    },
    {
        id: 'ctr',
        name: 'CTR',
        unit: '%',
        defaultTarget: 0.8,
        format: 'percentage',
        direction: 'higher_is_better',
        scalesWithTime: false,
        explanations: {
            bad: 'CTR onder target wijst op lage relevantie. Mogelijke oorzaken: advertentie sluit niet aan bij doelgroep, visuals zijn niet opvallend genoeg, of copy is niet overtuigend.',
            good: 'CTR boven target — de advertentie resoneert goed. Sterke combinatie van creative, copy en targeting.',
        },
        actions: {
            bad: 'Test nieuwe creatives en advertentieteksten. Verklein de doelgroep naar de meest relevante segmenten. Probeer andere advertentieformaten (carrousel, video).',
            good: 'Documenteer winnende creative-elementen voor toekomstige campagnes. Schaal budget op bij behoud van CTR.',
        },
    },
    {
        id: 'cpc',
        name: 'CPC',
        unit: '€',
        defaultTarget: 3.50,
        format: 'currency',
        direction: 'lower_is_better',
        scalesWithTime: false,
        explanations: {
            bad: 'CPC hoger dan target. Dit kan komen door veel concurrentie op de doelgroep, lage CTR (slechte relevantie), of een te brede doelgroep.',
            good: 'CPC onder target — efficiënte kosten per klik. Goede relevantie en weinig concurrentie in de veiling.',
        },
        actions: {
            bad: 'Verbeter CTR door betere creatives (dit verlaagt CPC). Scherp doelgroep aan of test minder competitieve segmenten. Overweeg handmatige biedingen.',
            good: 'Behoud huidige strategie. Overweeg budget te verhogen om meer volume te genereren tegen deze gunstige kosten.',
        },
    },
    {
        id: 'conversieratio',
        name: 'Conversieratio',
        unit: '%',
        defaultTarget: 3.0,
        format: 'percentage',
        direction: 'higher_is_better',
        scalesWithTime: false,
        explanations: {
            bad: 'Conversieratio onder target. De landingspagina converteert onvoldoende. Mogelijke oorzaken: trage laadtijd, onduidelijke propositie, te veel frictie in het formulier, of mismatch tussen advertentie en landingspagina.',
            good: 'Conversieratio boven target — sterke aansluiting tussen advertentie, doelgroep en landingspagina. Het aanbod is relevant.',
        },
        actions: {
            bad: 'Optimaliseer de landingspagina: verkort het formulier, verduidelijk de propositie, voeg social proof toe. Test A/B-varianten. Controleer mobiele ervaring.',
            good: 'Analyseer welke elementen bijdragen aan hoge conversie. Gebruik deze inzichten voor andere campagnes en pagina\'s.',
        },
    },
    {
        id: 'cpl',
        name: 'CPL',
        unit: '€',
        defaultTarget: 45.00,
        format: 'currency',
        direction: 'lower_is_better',
        scalesWithTime: false,
        explanations: {
            bad: 'Cost per lead boven target. Dit is een combinatie van hoge CPC en/of lage conversieratio. De acquisitiekosten zijn te hoog voor een gezond rendement.',
            good: 'CPL onder target — leads worden efficiënt gegenereerd. Goede balans tussen advertentiekosten en conversiekracht.',
        },
        actions: {
            bad: 'Focus op het verlagen van CPC (betere CTR) én verhogen van conversieratio (landingspagina-optimalisatie). Dit heeft het meeste impact op CPL.',
            good: 'Schaal de campagne op. Dit is een gezonde CPL — meer budget kan meer leads opleveren zonder significante kostenverhoging.',
        },
    },
];

// ── Benchmarks per branche (LinkedIn Ads) ─────

const BENCHMARKS = {
    'tech_saas': {
        name: 'Technology / SaaS',
        kpis: {
            bereik:        { low: 8000,  avg: 18000, good: 30000, excellent: 50000 },
            impressies:    { low: 15000, avg: 40000, good: 65000, excellent: 100000 },
            ctr:           { low: 0.35,  avg: 0.55,  good: 0.80,  excellent: 1.20 },
            cpc:           { low: 9.00,  avg: 6.50,  good: 4.00,  excellent: 2.50 },
            conversieratio:{ low: 1.5,   avg: 2.5,   good: 4.0,   excellent: 6.0 },
            cpl:           { low: 85,    avg: 55,    good: 35,    excellent: 20 },
        },
    },
    'financiele_dienstverlening': {
        name: 'Financiële dienstverlening',
        kpis: {
            bereik:        { low: 6000,  avg: 15000, good: 25000, excellent: 40000 },
            impressies:    { low: 12000, avg: 35000, good: 55000, excellent: 85000 },
            ctr:           { low: 0.30,  avg: 0.48,  good: 0.70,  excellent: 1.00 },
            cpc:           { low: 11.00, avg: 7.50,  good: 5.00,  excellent: 3.00 },
            conversieratio:{ low: 1.0,   avg: 2.0,   good: 3.5,   excellent: 5.5 },
            cpl:           { low: 110,   avg: 70,    good: 45,    excellent: 28 },
        },
    },
    'gezondheidszorg': {
        name: 'Gezondheidszorg',
        kpis: {
            bereik:        { low: 5000,  avg: 12000, good: 22000, excellent: 35000 },
            impressies:    { low: 10000, avg: 28000, good: 50000, excellent: 75000 },
            ctr:           { low: 0.32,  avg: 0.52,  good: 0.75,  excellent: 1.10 },
            cpc:           { low: 8.50,  avg: 5.80,  good: 3.80,  excellent: 2.20 },
            conversieratio:{ low: 1.2,   avg: 2.2,   good: 3.8,   excellent: 5.5 },
            cpl:           { low: 95,    avg: 60,    good: 40,    excellent: 22 },
        },
    },
    'onderwijs': {
        name: 'Onderwijs & Training',
        kpis: {
            bereik:        { low: 7000,  avg: 16000, good: 28000, excellent: 45000 },
            impressies:    { low: 14000, avg: 38000, good: 60000, excellent: 95000 },
            ctr:           { low: 0.38,  avg: 0.58,  good: 0.85,  excellent: 1.30 },
            cpc:           { low: 7.00,  avg: 4.80,  good: 3.20,  excellent: 2.00 },
            conversieratio:{ low: 1.8,   avg: 3.0,   good: 4.5,   excellent: 7.0 },
            cpl:           { low: 70,    avg: 45,    good: 28,    excellent: 16 },
        },
    },
    'industrie_manufacturing': {
        name: 'Industrie / Manufacturing',
        kpis: {
            bereik:        { low: 4000,  avg: 10000, good: 18000, excellent: 30000 },
            impressies:    { low: 8000,  avg: 22000, good: 40000, excellent: 65000 },
            ctr:           { low: 0.28,  avg: 0.44,  good: 0.65,  excellent: 0.95 },
            cpc:           { low: 10.00, avg: 7.00,  good: 4.50,  excellent: 2.80 },
            conversieratio:{ low: 1.0,   avg: 1.8,   good: 3.0,   excellent: 4.5 },
            cpl:           { low: 120,   avg: 75,    good: 50,    excellent: 30 },
        },
    },
    'zakelijke_dienstverlening': {
        name: 'Zakelijke dienstverlening / B2B',
        kpis: {
            bereik:        { low: 6000,  avg: 14000, good: 25000, excellent: 40000 },
            impressies:    { low: 12000, avg: 32000, good: 55000, excellent: 85000 },
            ctr:           { low: 0.33,  avg: 0.52,  good: 0.78,  excellent: 1.15 },
            cpc:           { low: 9.50,  avg: 6.00,  good: 3.80,  excellent: 2.40 },
            conversieratio:{ low: 1.3,   avg: 2.3,   good: 3.5,   excellent: 5.5 },
            cpl:           { low: 100,   avg: 60,    good: 38,    excellent: 22 },
        },
    },
    'recruitment_hr': {
        name: 'Recruitment / HR',
        kpis: {
            bereik:        { low: 8000,  avg: 20000, good: 35000, excellent: 55000 },
            impressies:    { low: 16000, avg: 45000, good: 75000, excellent: 120000 },
            ctr:           { low: 0.40,  avg: 0.62,  good: 0.90,  excellent: 1.40 },
            cpc:           { low: 6.50,  avg: 4.20,  good: 2.80,  excellent: 1.80 },
            conversieratio:{ low: 2.0,   avg: 3.5,   good: 5.0,   excellent: 8.0 },
            cpl:           { low: 65,    avg: 40,    good: 25,    excellent: 14 },
        },
    },
    'e_commerce_retail': {
        name: 'E-commerce / Retail',
        kpis: {
            bereik:        { low: 10000, avg: 22000, good: 38000, excellent: 60000 },
            impressies:    { low: 20000, avg: 50000, good: 80000, excellent: 130000 },
            ctr:           { low: 0.30,  avg: 0.48,  good: 0.72,  excellent: 1.05 },
            cpc:           { low: 7.50,  avg: 5.00,  good: 3.30,  excellent: 2.00 },
            conversieratio:{ low: 1.5,   avg: 2.5,   good: 4.0,   excellent: 6.5 },
            cpl:           { low: 80,    avg: 50,    good: 32,    excellent: 18 },
        },
    },
    'vastgoed_bouw': {
        name: 'Vastgoed / Bouw',
        kpis: {
            bereik:        { low: 4000,  avg: 10000, good: 20000, excellent: 32000 },
            impressies:    { low: 8000,  avg: 24000, good: 45000, excellent: 70000 },
            ctr:           { low: 0.25,  avg: 0.42,  good: 0.62,  excellent: 0.90 },
            cpc:           { low: 11.00, avg: 7.50,  good: 5.00,  excellent: 3.20 },
            conversieratio:{ low: 0.8,   avg: 1.5,   good: 2.8,   excellent: 4.2 },
            cpl:           { low: 130,   avg: 85,    good: 55,    excellent: 35 },
        },
    },
    'non_profit': {
        name: 'Non-profit / Overheid',
        kpis: {
            bereik:        { low: 7000,  avg: 18000, good: 30000, excellent: 50000 },
            impressies:    { low: 14000, avg: 40000, good: 65000, excellent: 105000 },
            ctr:           { low: 0.35,  avg: 0.55,  good: 0.82,  excellent: 1.25 },
            cpc:           { low: 6.00,  avg: 4.00,  good: 2.50,  excellent: 1.50 },
            conversieratio:{ low: 1.5,   avg: 2.8,   good: 4.2,   excellent: 6.5 },
            cpl:           { low: 60,    avg: 38,    good: 22,    excellent: 12 },
        },
    },
};

// ── State ─────────────────────────────────────

let campaigns = [];
let activeCampaignIndex = 0;

// ── Init ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    if (campaigns.length === 0) {
        campaigns.push(createCampaign('LinkedIn Ads — Leadgeneratie Q2'));
    }
    renderCampaignSelector();
    renderPeriodBar();
    renderTable();
    updateAll();
    bindEvents();
});

// ── Campaign CRUD ─────────────────────────────

function createCampaign(name, startDate, endDate) {
    return {
        name,
        startDate: startDate || null,
        endDate: endDate || null,
        kpis: KPI_DEFINITIONS.map(kpi => ({
            id: kpi.id,
            target: kpi.defaultTarget,
            actual: null,
        })),
    };
}

function getActiveCampaign() {
    return campaigns[activeCampaignIndex];
}

function renderCampaignSelector() {
    const select = document.getElementById('campaignSelect');
    select.innerHTML = '';
    campaigns.forEach((c, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = c.name;
        select.appendChild(opt);
    });
    select.value = activeCampaignIndex;
}

// ── Period / Progress ─────────────────────────

function getCampaignProgress(campaign) {
    if (!campaign.startDate || !campaign.endDate) return null;

    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const now = new Date();

    // Set all to midnight for clean day comparison
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
    const dateStart = document.getElementById('dateStart');
    const dateEnd = document.getElementById('dateEnd');

    dateStart.value = campaign.startDate || '';
    dateEnd.value = campaign.endDate || '';

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
        label.textContent = 'Stel start- en einddatum in voor pro rata vergelijking';
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
        note.textContent = 'Campagne is nog niet gestart. Targets staan op 0% pro rata.';
    } else {
        label.textContent = `Dag ${info.elapsedDays} van ${info.totalDays} — nog ${info.remainingDays} dagen`;
        note.textContent = `Volume KPI's (Bereik, Impressies) worden vergeleken met ${pctValue}% van het eindtarget. Ratio KPI's (CTR, CPC, Conversieratio, CPL) worden direct vergeleken met het volledige target.`;
    }
}

// ── Table Rendering ───────────────────────────

function renderTable() {
    const tbody = document.getElementById('kpiBody');
    tbody.innerHTML = '';
    const campaign = getActiveCampaign();

    KPI_DEFINITIONS.forEach((kpi, index) => {
        const data = campaign.kpis[index];
        const tr = document.createElement('tr');

        // KPI Name
        const tdName = document.createElement('td');
        tdName.innerHTML = `<span class="kpi-name">${kpi.name}</span><span class="kpi-unit">${kpi.unit}${kpi.scalesWithTime ? ' · volume' : ' · ratio'}</span>`;
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

        // Show pro rata target hint for volume KPIs
        if (kpi.scalesWithTime) {
            const hint = document.createElement('span');
            hint.className = 'target-hint';
            hint.id = `prorata-${index}`;
            const proRata = getProRataTarget(data.target, kpi, campaign);
            const info = getCampaignProgress(campaign);
            if (info && !info.hasEnded) {
                hint.textContent = `Pro rata: ${formatValue(proRata, kpi.format)}`;
            }
            tdTarget.appendChild(hint);
        }

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
    const cleaned = str.replace(/[€%\s.]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}

// ── Status Logic ──────────────────────────────

function calculateDeviation(data, kpi, campaign) {
    if (data.actual === null || data.target === null || data.target === 0) return null;

    // Get the effective target (pro rata for volume KPIs)
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
    let greens = 0, oranges = 0, reds = 0, total = 0;

    KPI_DEFINITIONS.forEach((kpi, i) => {
        const data = campaign.kpis[i];
        if (data.actual === null) return;
        total++;
        const dev = calculateDeviation(data, kpi, campaign);
        const cls = getStatusClass(dev);
        if (cls === 'green') greens++;
        else if (cls === 'orange') oranges++;
        else if (cls === 'red') reds++;
    });

    document.getElementById('statGreen').textContent = greens;
    document.getElementById('statOrange').textContent = oranges;
    document.getElementById('statRed').textContent = reds;

    const badge = document.getElementById('summaryBadge');
    const text = document.getElementById('summaryText');

    // Add period context to summary
    const info = getCampaignProgress(campaign);
    let periodContext = '';
    if (info && info.isActive) {
        periodContext = ` We zitten op ${Math.round(info.progress * 100)}% van de looptijd (dag ${info.elapsedDays} van ${info.totalDays}).`;
    }

    if (total === 0) {
        badge.className = 'summary-badge';
        badge.textContent = 'Geen data';
        text.textContent = 'Vul de werkelijke KPI-waarden in om een automatische samenvatting en analyse te genereren.';
        return;
    }

    const score = greens / total;

    if (score >= 0.8 && reds === 0) {
        badge.className = 'summary-badge good';
        badge.textContent = 'Goed op koers';
        text.textContent = `De campagne "${campaign.name}" presteert sterk. ${greens} van de ${total} KPI's zitten op of boven target.${periodContext} De huidige strategie werkt — focus op opschalen en het vasthouden van deze resultaten.`;
    } else if (reds >= 2 || score < 0.4) {
        badge.className = 'summary-badge critical';
        badge.textContent = 'Actie vereist';
        text.textContent = `De campagne "${campaign.name}" vraagt directe aandacht. ${reds} KPI('s) scoren kritiek en ${oranges} vragen aandacht.${periodContext} Bekijk onderstaande actiepunten per KPI en prioriteer de optimalisaties met de meeste impact.`;
    } else {
        badge.className = 'summary-badge warning';
        badge.textContent = 'Aandachtspunten';
        text.textContent = `De campagne "${campaign.name}" presteert gemiddeld. ${greens} KPI('s) op target, maar ${oranges + reds} vragen aandacht.${periodContext} Focus op de oranje en rode KPI's hieronder voor gerichte optimalisatie.`;
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
    const kpi = KPI_DEFINITIONS[index];
    const campaign = getActiveCampaign();

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
    const rows = document.querySelectorAll('#kpiBody tr');

    rows.forEach((tr, i) => {
        const kpi = KPI_DEFINITIONS[i];
        const data = campaign.kpis[i];

        // Update pro rata hint
        if (kpi.scalesWithTime) {
            const hint = document.getElementById(`prorata-${i}`);
            if (hint) {
                const proRata = getProRataTarget(data.target, kpi, campaign);
                const info = getCampaignProgress(campaign);
                if (info && !info.hasEnded) {
                    hint.textContent = `Pro rata: ${formatValue(proRata, kpi.format)}`;
                } else {
                    hint.textContent = '';
                }
            }
        }

        // Update status, deviation, explanation, action
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
    // Populate branch select
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

    KPI_DEFINITIONS.forEach(kpi => {
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
    KPI_DEFINITIONS.forEach((kpi, i) => {
        const bm = branch.kpis[kpi.id];
        if (bm) {
            campaign.kpis[i].target = bm.good;
        }
    });

    renderTable();
    updateAll();
    saveState();
}

// ── Events ────────────────────────────────────

function bindEvents() {
    // Campaign selector
    document.getElementById('campaignSelect').addEventListener('change', (e) => {
        activeCampaignIndex = parseInt(e.target.value);
        renderPeriodBar();
        renderTable();
        updateAll();
    });

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

    // Add campaign
    document.getElementById('btnAddCampaign').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.add('active');
        const input = document.getElementById('newCampaignName');
        input.value = '';
        document.getElementById('newCampaignStart').value = '';
        document.getElementById('newCampaignEnd').value = '';
        setTimeout(() => input.focus(), 100);
    });

    document.getElementById('btnModalCancel').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.remove('active');
    });

    document.getElementById('btnModalConfirm').addEventListener('click', () => {
        const name = document.getElementById('newCampaignName').value.trim();
        if (!name) return;
        const startDate = document.getElementById('newCampaignStart').value || null;
        const endDate = document.getElementById('newCampaignEnd').value || null;
        campaigns.push(createCampaign(name, startDate, endDate));
        activeCampaignIndex = campaigns.length - 1;
        renderCampaignSelector();
        renderPeriodBar();
        renderTable();
        updateAll();
        saveState();
        document.getElementById('modalOverlay').classList.remove('active');
    });

    document.getElementById('newCampaignName').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('btnModalConfirm').click();
        if (e.key === 'Escape') document.getElementById('btnModalCancel').click();
    });

    // Close modal on overlay click
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            document.getElementById('modalOverlay').classList.remove('active');
        }
    });

    // Delete campaign
    document.getElementById('btnDeleteCampaign').addEventListener('click', () => {
        if (campaigns.length <= 1) {
            alert('Je moet minimaal één campagne behouden.');
            return;
        }
        if (!confirm(`Weet je zeker dat je "${getActiveCampaign().name}" wilt verwijderen?`)) return;
        campaigns.splice(activeCampaignIndex, 1);
        activeCampaignIndex = Math.max(0, activeCampaignIndex - 1);
        renderCampaignSelector();
        renderPeriodBar();
        renderTable();
        updateAll();
        saveState();
    });

    // Export PDF
    document.getElementById('btnExport').addEventListener('click', () => {
        window.print();
    });

    // Benchmark toggle
    document.getElementById('btnToggleBenchmark').addEventListener('click', () => {
        const content = document.getElementById('benchmarkContent');
        const arrow = document.getElementById('benchmarkArrow');
        content.classList.toggle('open');
        arrow.classList.toggle('open');
    });

    // Benchmark branch select
    document.getElementById('benchmarkBranch').addEventListener('change', (e) => {
        renderBenchmarkTable(e.target.value);
    });

    // Apply benchmark as target
    document.getElementById('btnApplyBenchmark').addEventListener('click', () => {
        const branchKey = document.getElementById('benchmarkBranch').value;
        if (!branchKey) return;
        const branchName = BENCHMARKS[branchKey].name;
        if (!confirm(`Wil je de "Goed" benchmarks van ${branchName} overnemen als targets voor "${getActiveCampaign().name}"?`)) return;
        applyBenchmarkAsTarget(branchKey);
    });

    // Init benchmarks
    initBenchmarks();
}

// ── Persistence (localStorage) ────────────────

function saveState() {
    try {
        localStorage.setItem('agensea_kpi_campaigns', JSON.stringify(campaigns));
        localStorage.setItem('agensea_kpi_active', activeCampaignIndex);
    } catch (e) {
        // Silent fail
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem('agensea_kpi_campaigns');
        if (saved) {
            campaigns = JSON.parse(saved);
            activeCampaignIndex = parseInt(localStorage.getItem('agensea_kpi_active') || '0');
            if (activeCampaignIndex >= campaigns.length) activeCampaignIndex = 0;
        }
    } catch (e) {
        campaigns = [];
    }
}
