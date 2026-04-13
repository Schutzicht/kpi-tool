/* ============================================
   AGENSEA KPI TRACKER — APPLICATION LOGIC
   ============================================ */

// ── i18n ──────────────────────────────────────

const I18N = {
    nl: {
        // Nav / top-level
        nav_dashboard: 'Dashboard',
        nav_campaign: 'Campagne',
        app_label: 'KPI Tracker',

        // Dashboard
        dashboard_title: 'Dashboard',
        dashboard_subtitle: 'Overzicht van alle campagnes per klant',
        btn_new_campaign: '+ Nieuwe campagne',
        dashboard_empty: 'Nog geen campagnes. Voeg je eerste campagne toe om te beginnen.',
        without_client: 'Zonder klant',
        campaigns_one: 'campagne',
        campaigns_many: 'campagnes',
        card_no_data: 'Nog geen data',
        period_ended: 'Afgelopen',
        period_starts_in: (d) => `Start over ${d}d`,
        period_day_of: (e, t) => `Dag ${e}/${t}`,

        // Detail top
        btn_back_dashboard: '← Dashboard',
        btn_upload_csv: 'LinkedIn CSV',
        btn_share_client: 'Deel met klant',
        btn_delete_campaign: 'Verwijderen',
        btn_export_pdf: 'Exporteer PDF',
        btn_download_png: 'Download als PNG',
        client_label: 'Klantnaam',
        campaign_label: 'Campagnenaam',

        // Period
        label_start_date: 'STARTDATUM',
        label_end_date: 'EINDDATUM',
        progress_set_period: 'Stel campagneperiode in',
        progress_set_dates: 'Stel start- en einddatum in',
        progress_period_note_empty: 'Zonder periode worden alle targets op eindwaarde vergeleken.',
        progress_ended: (d) => `Campagne afgelopen — ${d} dagen gelopen`,
        progress_ended_note: 'Campagne is afgerond. Alle targets worden op eindwaarde vergeleken.',
        progress_starts_in: (d) => `Campagne start over ${d} dagen`,
        progress_not_started: 'Campagne is nog niet gestart.',
        progress_day_of: (e, t, r) => `Dag ${e} van ${t} — nog ${r} dagen`,
        progress_active_note: 'Alle KPI\'s zijn ratio-gebaseerd en worden direct vergeleken met het volledige target.',
        default_period_note: 'Alle huidige KPI\'s zijn ratio-gebaseerd en worden direct vergeleken met het volledige target, ongeacht de looptijd.',

        // Context
        label_audience_size: 'DOELGROEPGROOTTE',
        label_monthly_budget: 'MAANDBUDGET',
        label_platform: 'PLATFORM',
        label_notes: 'NOTITIES',
        placeholder_audience_size: 'bijv. 45.000',
        placeholder_monthly_budget: 'bijv. € 2.500',
        placeholder_platform: 'bijv. LinkedIn Ads',
        placeholder_notes: 'bijv. Focus op decision makers, IT-sector, Nederland',

        // Audiences
        audiences_title: 'Doelgroepen',
        audiences_subtitle: 'De targeting die in deze campagne wordt gebruikt. Voeg per LinkedIn-doelgroep een kaart toe met de essentie — geen volledige must-also-match-structuur nodig.',
        audiences_subtitle_ro: 'De targeting die in deze campagne wordt gebruikt.',
        btn_add_audience: '+ Doelgroep toevoegen',
        audience_empty: 'Nog geen doelgroepen. Klik op "+ Doelgroep toevoegen".',
        audience_name_placeholder: 'Doelgroepnaam — bijv. Decision Makers NL',
        audience_delete_title: 'Verwijder doelgroep',
        audience_delete_confirm: 'Doelgroep verwijderen?',
        audience_default_name: 'Doelgroep',
        audience_field_location: 'LOCATIE',
        audience_field_job_functions: 'FUNCTIES / TITELS',
        audience_field_seniority: 'SENIORITEIT',
        audience_field_company_size: 'BEDRIJFSGROOTTE',
        audience_field_industry: 'BRANCHE',
        audience_field_location_ph: 'bijv. Nederland, België',
        audience_field_job_functions_ph: 'bijv. Marketing, Sales, CEO',
        audience_field_seniority_ph: 'bijv. Director, VP, CXO',
        audience_field_company_size_ph: 'bijv. 51-200, 201-500',
        audience_field_industry_ph: 'bijv. IT, SaaS, Financiën',
        audience_estimated_size: 'GESCHATTE GROOTTE',
        audience_estimated_size_placeholder: 'bijv. 45.000',
        audience_notes: 'UITSLUITINGEN / NOTITIES',
        audience_notes_placeholder: 'bijv. exclusie van concurrenten, blacklist',
        btn_download_audiences: 'Download doelgroepen als PNG',

        // Must also match
        mam_section_label: 'MOET OOK VOLDOEN AAN',
        mam_and_label: 'EN',
        mam_and_connector: '+ EN',
        mam_attr_placeholder: 'Attribuut — bijv. Skills, Groepen, Job title',
        mam_values_placeholder: 'Waardes, gescheiden door komma\'s',
        mam_delete_title: 'Verwijder dit criterium',
        mam_add_button: '+ Must also match toevoegen',

        // Business KPIs
        biz_title: 'Business KPI\'s',
        biz_subtitle: 'Commerciële doelen van de klant — in te vullen door de klant zelf via de deel-link. Max. CAC en ROAS-target worden automatisch berekend.',
        biz_col_kpi: 'Business KPI',
        biz_col_value: 'Waarde',
        biz_col_explanation: 'Uitleg',
        biz_row_product_value: 'Productwaarde',
        biz_row_product_value_unit: '€ per sale/lead',
        biz_row_product_value_exp: 'Wat levert één nieuwe klant, sale of lead je gemiddeld op? Bijvoorbeeld: een cursus van € 500, of een contract van € 2.000 per jaar.',
        biz_row_margin: 'Winstmarge',
        biz_row_margin_unit: '% (optioneel)',
        biz_row_margin_exp: 'Jouw bruto winstmarge op de productwaarde — dus wat er per klant overblijft na inkoop/productkosten, vóór advertentiekosten. Vind je dit te gevoelig om te delen? Laat \'m gewoon leeg — dan tonen we de Max. CAC niet, en werken we alleen met de Geplande CAC en ROAS.',
        biz_row_goal: 'Doel',
        biz_row_goal_unit: 'aantal',
        biz_row_goal_exp: 'Hoeveel nieuwe sales of leads wil je uit deze campagne halen? Dit is je zakelijke doelstelling — bijv. 25 nieuwe klanten.',
        biz_row_budget: 'Totaal campagnebudget',
        biz_row_budget_unit: '€',
        biz_row_budget_exp: 'Het totale advertentiebudget voor de volledige looptijd van deze campagne. Bijv. 3 maanden × € 2.500 = € 7.500. Dit vormt de basis voor CAC en ROAS.',
        biz_row_planned_cac: 'Geplande CAC',
        biz_row_planned_cac_unit: '€ per klant',
        biz_row_planned_cac_exp: '<strong>Customer Acquisition Cost</strong> — wat je op basis van dit plan per nieuwe klant uitgeeft. Berekend als Budget ÷ Doel. Dit is je <em>verwachte</em> kost per klant, niet per se het maximum.',
        biz_row_max_cac: 'Max. CAC',
        biz_row_max_cac_unit: '€ per klant',
        biz_row_max_cac_exp: 'Het <strong>absolute plafond</strong>: tot hier kun je per klant uitgeven voordat je verlies draait. Berekend als Productwaarde × Winstmarge. Ligt je Geplande CAC erboven → verlies. Eronder → winst. <em>Alleen zichtbaar als je winstmarge invult.</em>',
        biz_row_roas: 'ROAS-target',
        biz_row_roas_unit: '×',
        biz_row_roas_exp: '<strong>Return on Ad Spend</strong> — hoeveel euro omzet je terugverdient per euro advertentiebudget. Een ROAS van 3× betekent: voor elke € 1 ad-kosten komt er € 3 omzet binnen.',

        // Campaign KPIs section
        campaign_kpis_title: 'Campaign KPI\'s',
        campaign_kpis_subtitle: 'Prestaties van de advertentiecampagne — gevuld door Agensea of via LinkedIn CSV-import.',

        // Benchmark
        benchmark_toggle: 'LinkedIn Ads benchmarks per branche',
        benchmark_select_branche: 'SELECTEER BRANCHE',
        benchmark_choose: '— Kies een branche —',
        benchmark_apply: 'Gebruik als target',
        benchmark_apply_confirm: (n) => `Wil je de "Goed" benchmarks van ${n} overnemen als targets?`,
        benchmark_col_kpi: 'KPI',
        benchmark_col_low: 'Laag',
        benchmark_col_avg: 'Gemiddeld',
        benchmark_col_good: 'Goed',
        benchmark_col_excellent: 'Excellent',
        benchmark_disclaimer: 'Benchmarks zijn gebaseerd op algemene LinkedIn Ads marktdata. Werkelijke resultaten variëren per doelgroep, regio, budget en advertentietype.',

        // KPI table
        kpi_col_kpi: 'KPI',
        kpi_col_target: 'Target',
        kpi_col_actual: 'Werkelijk',
        kpi_col_status: 'Status',
        kpi_col_deviation: 'Afwijking',
        kpi_col_explanation: 'Toelichting',
        kpi_col_action: 'Actie / Advies',

        // Status
        status_on_target: 'Op target',
        status_attention: 'Aandacht',
        status_critical: 'Kritiek',
        status_no_data: 'Geen data',
        stat_on_target: 'Op target',
        stat_attention: 'Aandachtspunt',
        stat_critical: 'Kritiek',

        // Summary
        summary_title: 'Samenvatting',
        summary_loading: '— Laden',
        summary_no_data: 'Geen data',
        summary_no_data_text: 'Vul de werkelijke KPI-waarden in om een automatische samenvatting en analyse te genereren.',
        summary_empty_placeholder: 'Vul de KPI-waarden in om een samenvatting te genereren.',
        summary_good_badge: 'Goed op koers',
        summary_critical_badge: 'Actie vereist',
        summary_warning_badge: 'Aandachtspunten',
        summary_good: (n, g, t, p) => `De campagne "${n}" presteert sterk. ${g} van de ${t} KPI's zitten op of boven target.${p} De huidige strategie werkt — focus op opschalen en het vasthouden van deze resultaten.`,
        summary_critical: (n, r, o, p) => `De campagne "${n}" vraagt directe aandacht. ${r} KPI('s) scoren kritiek en ${o} vragen aandacht.${p} Bekijk onderstaande actiepunten per KPI en prioriteer de optimalisaties met de meeste impact.`,
        summary_warning: (n, g, other, p) => `De campagne "${n}" presteert gemiddeld. ${g} KPI('s) op target, maar ${other} vragen aandacht.${p} Focus op de oranje en rode KPI's hieronder voor gerichte optimalisatie.`,
        summary_period_context: (pct, e, t) => ` We zitten op ${pct}% van de looptijd (dag ${e} van ${t}).`,

        explanation_no_actual: 'Vul de werkelijke waarde in.',

        // Footer
        footer_note: 'Gegenereerd door <strong>Agensea</strong> — Klik op Target of Werkelijk waarden om aan te passen.',

        // Add modal
        modal_add_title: 'Nieuwe campagne toevoegen',
        modal_client: 'KLANTNAAM',
        modal_client_ph: 'bijv. Contemplas',
        modal_campaign: 'CAMPAGNENAAM',
        modal_campaign_ph: 'bijv. LinkedIn Ads — Leadgeneratie Q2',
        modal_type: 'CAMPAGNETYPE',
        modal_start: 'STARTDATUM',
        modal_duration: 'LOOPTIJD',
        modal_duration_ph: '—',
        modal_weeks: 'weken',
        modal_months: 'maanden',
        modal_or_end: 'OF EINDDATUM',
        btn_cancel: 'Annuleren',
        btn_add: 'Toevoegen',

        // Share modal
        share_title: 'Delen met klant',
        share_desc: 'Kopieer onderstaande link en stuur deze naar je klant. De klant ziet een schone, read-only versie van de rapportage.',
        btn_copy: 'Kopieer',
        btn_close: 'Sluiten',
        share_copied: 'Link gekopieerd!',

        // Delete / confirm
        delete_min_one: 'Je moet minimaal één campagne behouden.',
        delete_confirm: (n) => `Weet je zeker dat je "${n}" wilt verwijderen?`,

        // Campaign types
        ctype_leadgen: 'Leadgeneratie',
        ctype_leadgen_option: 'Leadgeneratie — leads via formulieren of LP\'s',
        ctype_awareness: 'Awareness / Branding',
        ctype_awareness_option: 'Awareness / Branding — bereik, engagement, volgers',
        ctype_traffic: 'Website Traffic',
        ctype_traffic_option: 'Website Traffic — bezoekers naar website',
        ctype_video: 'Video Views',
        ctype_video_option: 'Video Views — videoweergaven en engagement',

        // CSV import
        toast_no_csv: 'Geen herkenbare KPI-kolommen gevonden in dit CSV-bestand.',
        toast_csv_ok: (n, r, k) => `${n} KPI's geïmporteerd uit ${r} rij(en): ${k}`,
    },

    en: {
        // Nav / top-level
        nav_dashboard: 'Dashboard',
        nav_campaign: 'Campaign',
        app_label: 'KPI Tracker',

        // Dashboard
        dashboard_title: 'Dashboard',
        dashboard_subtitle: 'Overview of all campaigns per client',
        btn_new_campaign: '+ New campaign',
        dashboard_empty: 'No campaigns yet. Add your first campaign to get started.',
        without_client: 'No client',
        campaigns_one: 'campaign',
        campaigns_many: 'campaigns',
        card_no_data: 'No data yet',
        period_ended: 'Ended',
        period_starts_in: (d) => `Starts in ${d}d`,
        period_day_of: (e, t) => `Day ${e}/${t}`,

        // Detail top
        btn_back_dashboard: '← Dashboard',
        btn_upload_csv: 'LinkedIn CSV',
        btn_share_client: 'Share with client',
        btn_delete_campaign: 'Delete',
        btn_export_pdf: 'Export PDF',
        btn_download_png: 'Download as PNG',
        client_label: 'Client name',
        campaign_label: 'Campaign name',

        // Period
        label_start_date: 'START DATE',
        label_end_date: 'END DATE',
        progress_set_period: 'Set campaign period',
        progress_set_dates: 'Set start and end date',
        progress_period_note_empty: 'Without a period, all targets are compared against their final value.',
        progress_ended: (d) => `Campaign ended — ran for ${d} days`,
        progress_ended_note: 'Campaign is complete. All targets are compared at their final value.',
        progress_starts_in: (d) => `Campaign starts in ${d} days`,
        progress_not_started: 'Campaign has not started yet.',
        progress_day_of: (e, t, r) => `Day ${e} of ${t} — ${r} days left`,
        progress_active_note: 'All KPIs are ratio-based and compared directly to the full target.',
        default_period_note: 'All current KPIs are ratio-based and compared directly to the full target, regardless of duration.',

        // Context
        label_audience_size: 'AUDIENCE SIZE',
        label_monthly_budget: 'MONTHLY BUDGET',
        label_platform: 'PLATFORM',
        label_notes: 'NOTES',
        placeholder_audience_size: 'e.g. 45,000',
        placeholder_monthly_budget: 'e.g. € 2,500',
        placeholder_platform: 'e.g. LinkedIn Ads',
        placeholder_notes: 'e.g. Focus on decision makers, IT, Netherlands',

        // Audiences
        audiences_title: 'Audiences',
        audiences_subtitle: 'The targeting used in this campaign. Add a card per LinkedIn audience with the essentials — no need to mirror the full must-also-match tree.',
        audiences_subtitle_ro: 'The targeting used in this campaign.',
        btn_add_audience: '+ Add audience',
        audience_empty: 'No audiences yet. Click "+ Add audience".',
        audience_name_placeholder: 'Audience name — e.g. Decision Makers NL',
        audience_delete_title: 'Delete audience',
        audience_delete_confirm: 'Delete this audience?',
        audience_default_name: 'Audience',
        audience_field_location: 'LOCATION',
        audience_field_job_functions: 'JOB FUNCTIONS / TITLES',
        audience_field_seniority: 'SENIORITY',
        audience_field_company_size: 'COMPANY SIZE',
        audience_field_industry: 'INDUSTRY',
        audience_field_location_ph: 'e.g. Netherlands, Belgium',
        audience_field_job_functions_ph: 'e.g. Marketing, Sales, CEO',
        audience_field_seniority_ph: 'e.g. Director, VP, CXO',
        audience_field_company_size_ph: 'e.g. 51-200, 201-500',
        audience_field_industry_ph: 'e.g. IT, SaaS, Finance',
        audience_estimated_size: 'ESTIMATED SIZE',
        audience_estimated_size_placeholder: 'e.g. 45,000',
        audience_notes: 'EXCLUSIONS / NOTES',
        audience_notes_placeholder: 'e.g. competitor exclusion, blacklist',
        btn_download_audiences: 'Download audiences as PNG',

        // Must also match
        mam_section_label: 'MUST ALSO MATCH',
        mam_and_label: 'AND',
        mam_and_connector: '+ AND',
        mam_attr_placeholder: 'Attribute — e.g. Skills, Groups, Job title',
        mam_values_placeholder: 'Values, comma-separated',
        mam_delete_title: 'Remove this criterion',
        mam_add_button: '+ Add must also match',

        // Business KPIs
        biz_title: 'Business KPIs',
        biz_subtitle: 'The client\'s commercial goals — to be filled in by the client via the share link. Max. CAC and ROAS target are calculated automatically.',
        biz_col_kpi: 'Business KPI',
        biz_col_value: 'Value',
        biz_col_explanation: 'Explanation',
        biz_row_product_value: 'Product value',
        biz_row_product_value_unit: '€ per sale/lead',
        biz_row_product_value_exp: 'What does one new customer, sale or lead bring in on average? For example: a course at € 500, or a € 2,000 / year contract.',
        biz_row_margin: 'Profit margin',
        biz_row_margin_unit: '% (optional)',
        biz_row_margin_exp: 'Your gross profit margin on the product value — what remains per customer after cost of goods, before advertising costs. Finds this too sensitive to share? Just leave it blank — we then skip Max. CAC and only show Planned CAC and ROAS.',
        biz_row_goal: 'Goal',
        biz_row_goal_unit: 'count',
        biz_row_goal_exp: 'How many new sales or leads do you want from this campaign? This is your business objective — e.g. 25 new customers.',
        biz_row_budget: 'Total campaign budget',
        biz_row_budget_unit: '€',
        biz_row_budget_exp: 'The total ad budget for the full duration of this campaign. E.g. 3 months × € 2,500 = € 7,500. This is the basis for CAC and ROAS.',
        biz_row_planned_cac: 'Planned CAC',
        biz_row_planned_cac_unit: '€ per customer',
        biz_row_planned_cac_exp: '<strong>Customer Acquisition Cost</strong> — what you spend per new customer based on this plan. Calculated as Budget ÷ Goal. This is your <em>expected</em> cost per customer, not necessarily the ceiling.',
        biz_row_max_cac: 'Max. CAC',
        biz_row_max_cac_unit: '€ per customer',
        biz_row_max_cac_exp: 'The <strong>absolute ceiling</strong>: above this you start losing money per customer. Calculated as Product value × Profit margin. If your Planned CAC is above → loss. Below → profit. <em>Only shown when profit margin is filled in.</em>',
        biz_row_roas: 'ROAS target',
        biz_row_roas_unit: '×',
        biz_row_roas_exp: '<strong>Return on Ad Spend</strong> — how many euros of revenue you earn per euro of ad spend. A ROAS of 3× means: for every € 1 in ad costs, € 3 in revenue comes back.',

        // Campaign KPIs section
        campaign_kpis_title: 'Campaign KPIs',
        campaign_kpis_subtitle: 'Performance of the ad campaign — filled in by Agensea or via LinkedIn CSV import.',

        // Benchmark
        benchmark_toggle: 'LinkedIn Ads benchmarks per industry',
        benchmark_select_branche: 'SELECT INDUSTRY',
        benchmark_choose: '— Choose an industry —',
        benchmark_apply: 'Use as target',
        benchmark_apply_confirm: (n) => `Apply the "Good" benchmarks from ${n} as targets?`,
        benchmark_col_kpi: 'KPI',
        benchmark_col_low: 'Low',
        benchmark_col_avg: 'Average',
        benchmark_col_good: 'Good',
        benchmark_col_excellent: 'Excellent',
        benchmark_disclaimer: 'Benchmarks are based on general LinkedIn Ads market data. Actual results vary by audience, region, budget and ad type.',

        // KPI table
        kpi_col_kpi: 'KPI',
        kpi_col_target: 'Target',
        kpi_col_actual: 'Actual',
        kpi_col_status: 'Status',
        kpi_col_deviation: 'Deviation',
        kpi_col_explanation: 'Explanation',
        kpi_col_action: 'Action / Advice',

        // Status
        status_on_target: 'On target',
        status_attention: 'Attention',
        status_critical: 'Critical',
        status_no_data: 'No data',
        stat_on_target: 'On target',
        stat_attention: 'Attention',
        stat_critical: 'Critical',

        // Summary
        summary_title: 'Summary',
        summary_loading: '— Loading',
        summary_no_data: 'No data',
        summary_no_data_text: 'Fill in the actual KPI values to generate an automatic summary and analysis.',
        summary_empty_placeholder: 'Fill in the KPI values to generate a summary.',
        summary_good_badge: 'On track',
        summary_critical_badge: 'Action required',
        summary_warning_badge: 'Attention points',
        summary_good: (n, g, t, p) => `Campaign "${n}" is performing strongly. ${g} out of ${t} KPIs are on or above target.${p} The current strategy is working — focus on scaling and maintaining these results.`,
        summary_critical: (n, r, o, p) => `Campaign "${n}" needs immediate attention. ${r} KPI(s) are critical and ${o} need attention.${p} Review the action items per KPI below and prioritize the optimizations with the biggest impact.`,
        summary_warning: (n, g, other, p) => `Campaign "${n}" is performing average. ${g} KPI(s) on target, but ${other} need attention.${p} Focus on the orange and red KPIs below for targeted optimization.`,
        summary_period_context: (pct, e, t) => ` We are at ${pct}% of the campaign (day ${e} of ${t}).`,

        explanation_no_actual: 'Fill in the actual value.',

        // Footer
        footer_note: 'Generated by <strong>Agensea</strong> — Click on Target or Actual values to edit.',

        // Add modal
        modal_add_title: 'Add new campaign',
        modal_client: 'CLIENT NAME',
        modal_client_ph: 'e.g. Contemplas',
        modal_campaign: 'CAMPAIGN NAME',
        modal_campaign_ph: 'e.g. LinkedIn Ads — Leadgen Q2',
        modal_type: 'CAMPAIGN TYPE',
        modal_start: 'START DATE',
        modal_duration: 'DURATION',
        modal_duration_ph: '—',
        modal_weeks: 'weeks',
        modal_months: 'months',
        modal_or_end: 'OR END DATE',
        btn_cancel: 'Cancel',
        btn_add: 'Add',

        // Share modal
        share_title: 'Share with client',
        share_desc: 'Copy the link below and send it to your client. The client sees a clean, read-only version of the report.',
        btn_copy: 'Copy',
        btn_close: 'Close',
        share_copied: 'Link copied!',

        // Delete / confirm
        delete_min_one: 'You must keep at least one campaign.',
        delete_confirm: (n) => `Are you sure you want to delete "${n}"?`,

        // Campaign types
        ctype_leadgen: 'Lead generation',
        ctype_leadgen_option: 'Lead generation — leads via forms or landing pages',
        ctype_awareness: 'Awareness / Branding',
        ctype_awareness_option: 'Awareness / Branding — reach, engagement, followers',
        ctype_traffic: 'Website Traffic',
        ctype_traffic_option: 'Website Traffic — visitors to the website',
        ctype_video: 'Video Views',
        ctype_video_option: 'Video Views — video plays and engagement',

        // CSV import
        toast_no_csv: 'No recognisable KPI columns found in this CSV file.',
        toast_csv_ok: (n, r, k) => `${n} KPIs imported from ${r} row(s): ${k}`,
    },
};

let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('agensea_lang')) || 'nl';

function t(key, ...args) {
    const dict = I18N[currentLang] || I18N.nl;
    const val = dict[key];
    if (typeof val === 'function') return val(...args);
    if (val !== undefined) return val;
    const fallback = I18N.nl[key];
    if (typeof fallback === 'function') return fallback(...args);
    return fallback !== undefined ? fallback : key;
}

function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    try { localStorage.setItem('agensea_lang', lang); } catch (e) {}
    applyStaticTranslations();
    if (currentView === 'detail') {
        showDetail(activeCampaignIndex);
    } else {
        renderDashboard();
    }
    // Update language switch UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// Apply translations to static HTML elements marked with data-i18n / data-i18n-ph
function applyStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPh);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });
    // Populate campaign type <option>s
    const typeSel = document.getElementById('newCampaignType');
    if (typeSel) {
        [...typeSel.options].forEach(opt => {
            const key = opt.dataset.i18n;
            if (key) opt.textContent = t(key);
        });
    }
    const durSel = document.getElementById('newCampaignDurationUnit');
    if (durSel) {
        [...durSel.options].forEach(opt => {
            const key = opt.dataset.i18n;
            if (key) opt.textContent = t(key);
        });
    }
    // Benchmark "choose" option
    const benchSel = document.getElementById('benchmarkBranch');
    if (benchSel && benchSel.options.length > 0) {
        benchSel.options[0].textContent = t('benchmark_choose');
    }
}

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

// KPI name / unit overrides per language (English only — NL is the source)
const KPI_EN = {
    ctr:             { name: 'CTR',             unit: '%' },
    cpc:             { name: 'CPC',             unit: '€' },
    cpm:             { name: 'CPM',             unit: '€' },
    conversieratio:  { name: 'Conversion rate', unit: '%' },
    cpl:             { name: 'CPL',             unit: '€' },
    video_view_rate: { name: 'Video view rate', unit: '%' },
    engagement_rate: { name: 'Engagement rate', unit: '%' },
    volgers:         { name: 'New followers',   unit: 'followers' },
    cpv:             { name: 'CPV',             unit: '€' },
    bounce_rate:     { name: 'Bounce rate',     unit: '%' },
    time_on_page:    { name: 'Time on page',    unit: 'sec' },
};

function localizedKpi(kpi) {
    if (currentLang === 'en' && KPI_EN[kpi.id]) {
        return { ...kpi, name: KPI_EN[kpi.id].name, unit: KPI_EN[kpi.id].unit };
    }
    return kpi;
}

// Helper to get KPI definitions for a campaign
function getKPIsForCampaign(campaign) {
    const type = CAMPAIGN_TYPES[campaign.campaignType] || CAMPAIGN_TYPES.leadgen;
    return type.kpiIds.map(id => ALL_KPIS[id]).filter(Boolean).map(localizedKpi);
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
    applyStaticTranslations();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
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
            margin: null,
            goal: null,
            budget: null,
        },
        audiences: [],
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
    const typeKey = 'ctype_' + (CAMPAIGN_TYPES[campaign.campaignType] ? campaign.campaignType : 'leadgen');
    if (typeLabel) typeLabel.textContent = t(typeKey);

    renderPeriodBar();
    renderContext();
    renderAudiences();
    renderBusinessKpis();
    renderTable();
    updateAll();
}

// ── Audiences ─────────────────────────────────

const AUDIENCE_FIELDS = [
    { key: 'location',     labelKey: 'audience_field_location',      phKey: 'audience_field_location_ph' },
    { key: 'jobFunctions', labelKey: 'audience_field_job_functions', phKey: 'audience_field_job_functions_ph' },
    { key: 'seniority',    labelKey: 'audience_field_seniority',     phKey: 'audience_field_seniority_ph' },
    { key: 'companySize',  labelKey: 'audience_field_company_size',  phKey: 'audience_field_company_size_ph' },
    { key: 'industry',     labelKey: 'audience_field_industry',      phKey: 'audience_field_industry_ph' },
];

function createAudience() {
    return {
        name: '',
        location: '',
        jobFunctions: '',
        seniority: '',
        companySize: '',
        industry: '',
        mustAlsoMatchBlocks: [],
        estimatedSize: '',
        notes: '',
    };
}

// Migrate legacy `mustAlsoMatch` string into structured blocks
function migrateAudience(a) {
    if (!Array.isArray(a.mustAlsoMatchBlocks)) a.mustAlsoMatchBlocks = [];
    if (typeof a.mustAlsoMatch === 'string' && a.mustAlsoMatch.trim()) {
        String(a.mustAlsoMatch).split(/\n/).forEach(line => {
            const idx = line.indexOf(':');
            let attribute = '', values = '';
            if (idx === -1) {
                values = line.trim();
            } else {
                attribute = line.slice(0, idx).trim();
                values = line.slice(idx + 1).trim();
            }
            if (attribute || values) a.mustAlsoMatchBlocks.push({ attribute, values });
        });
        delete a.mustAlsoMatch;
    }
}

function parseChips(str) {
    if (!str) return [];
    return String(str).split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderAudiences() {
    const campaign = getActiveCampaign();
    if (!Array.isArray(campaign.audiences)) campaign.audiences = [];
    const list = document.getElementById('audienceList');
    list.innerHTML = '';

    if (campaign.audiences.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'audience-empty';
        empty.textContent = t('audience_empty');
        list.appendChild(empty);
        return;
    }

    campaign.audiences.forEach((aud, i) => {
        list.appendChild(buildAudienceCard(aud, i));
    });
}

function buildAudienceCard(aud, index) {
    const card = document.createElement('div');
    card.className = 'audience-card';

    const fieldsHtml = AUDIENCE_FIELDS.map(f => {
        const val = aud[f.key] || '';
        return `
            <div class="audience-field">
                <label class="label-small">${t(f.labelKey)}</label>
                <input type="text" class="audience-input" data-aud-index="${index}" data-aud-key="${f.key}" placeholder="${t(f.phKey)}" value="${escapeHtml(val)}">
                <div class="chip-row">${parseChips(val).map(tag => `<span class="chip">${escapeHtml(tag)}</span>`).join('')}</div>
            </div>
        `;
    }).join('');

    const mamBlocksHtml = (aud.mustAlsoMatchBlocks || []).map((b, bi) => `
        <div class="mam-block-edit" data-aud-index="${index}" data-mam-index="${bi}">
            <div class="mam-block-header">
                <span class="mam-connector">${bi === 0 ? t('mam_and_label') : t('mam_and_connector')}</span>
                <input type="text" class="mam-attr-input" data-aud-index="${index}" data-mam-index="${bi}" data-mam-key="attribute" placeholder="${t('mam_attr_placeholder')}" value="${escapeHtml(b.attribute || '')}">
                <button class="mam-delete-btn" data-aud-index="${index}" data-mam-index="${bi}" title="${t('mam_delete_title')}">×</button>
            </div>
            <input type="text" class="mam-values-input" data-aud-index="${index}" data-mam-index="${bi}" data-mam-key="values" placeholder="${t('mam_values_placeholder')}" value="${escapeHtml(b.values || '')}">
            <div class="chip-row">${parseChips(b.values || '').map(v => `<span class="chip">${escapeHtml(v)}</span>`).join('')}</div>
        </div>
    `).join('');

    card.innerHTML = `
        <div class="audience-card-header">
            <input type="text" class="audience-name-input" data-aud-index="${index}" data-aud-key="name" placeholder="${t('audience_name_placeholder')}" value="${escapeHtml(aud.name || '')}">
            <button class="audience-delete-btn" data-aud-index="${index}" title="${t('audience_delete_title')}">×</button>
        </div>
        <div class="audience-grid">${fieldsHtml}</div>
        <div class="audience-mam">
            <label class="label-small">${t('mam_section_label')}</label>
            <div class="mam-blocks-list">${mamBlocksHtml}</div>
            <button class="mam-add-btn" data-aud-index="${index}">${t('mam_add_button')}</button>
        </div>
        <div class="audience-footer">
            <div class="audience-field audience-field-small">
                <label class="label-small">${t('audience_estimated_size')}</label>
                <input type="text" class="audience-input" data-aud-index="${index}" data-aud-key="estimatedSize" placeholder="${t('audience_estimated_size_placeholder')}" value="${escapeHtml(aud.estimatedSize || '')}">
            </div>
            <div class="audience-field audience-field-wide">
                <label class="label-small">${t('audience_notes')}</label>
                <input type="text" class="audience-input" data-aud-index="${index}" data-aud-key="notes" placeholder="${t('audience_notes_placeholder')}" value="${escapeHtml(aud.notes || '')}">
            </div>
        </div>
    `;

    // Wire inputs
    card.querySelectorAll('.audience-input, .audience-name-input').forEach(input => {
        input.addEventListener('blur', onAudienceInputBlur);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
    });

    // Must-also-match block inputs
    card.querySelectorAll('.mam-attr-input, .mam-values-input').forEach(input => {
        input.addEventListener('blur', onMamBlockInputBlur);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
    });
    // Must-also-match delete buttons
    card.querySelectorAll('.mam-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const i = parseInt(e.currentTarget.dataset.audIndex);
            const bi = parseInt(e.currentTarget.dataset.mamIndex);
            const campaign = getActiveCampaign();
            if (!campaign.audiences[i]) return;
            campaign.audiences[i].mustAlsoMatchBlocks.splice(bi, 1);
            renderAudiences();
            saveState();
        });
    });
    // Add must-also-match block
    card.querySelector('.mam-add-btn').addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.dataset.audIndex);
        const campaign = getActiveCampaign();
        if (!campaign.audiences[i]) return;
        if (!Array.isArray(campaign.audiences[i].mustAlsoMatchBlocks)) {
            campaign.audiences[i].mustAlsoMatchBlocks = [];
        }
        campaign.audiences[i].mustAlsoMatchBlocks.push({ attribute: '', values: '' });
        renderAudiences();
        saveState();
        // Focus the new attribute input
        const newCard = document.querySelectorAll('.audience-card')[i];
        const inputs = newCard && newCard.querySelectorAll('.mam-attr-input');
        if (inputs && inputs.length) inputs[inputs.length - 1].focus();
    });

    card.querySelector('.audience-delete-btn').addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.dataset.audIndex);
        if (!confirm(t('audience_delete_confirm'))) return;
        getActiveCampaign().audiences.splice(i, 1);
        renderAudiences();
        saveState();
    });

    return card;
}

async function downloadAudiencesAsPng(selector, campaign) {
    if (typeof html2canvas === 'undefined') {
        alert('html2canvas not loaded');
        return;
    }
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const canvas = await html2canvas(el, {
            backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
        });
        const link = document.createElement('a');
        const safeName = (campaign && campaign.name ? campaign.name : 'audiences').replace(/[^a-z0-9-_ ]/gi, '').trim() || 'audiences';
        link.download = `audiences-${safeName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (e) {
        console.warn('PNG export failed:', e);
        alert('PNG export failed — see console.');
    }
}

function onMamBlockInputBlur(e) {
    const input = e.target;
    const i = parseInt(input.dataset.audIndex);
    const bi = parseInt(input.dataset.mamIndex);
    const key = input.dataset.mamKey;
    const campaign = getActiveCampaign();
    if (!campaign.audiences[i] || !campaign.audiences[i].mustAlsoMatchBlocks[bi]) return;
    campaign.audiences[i].mustAlsoMatchBlocks[bi][key] = input.value.trim();

    // If values input, update chip row preview
    if (key === 'values') {
        const blockEl = input.closest('.mam-block-edit');
        if (blockEl) {
            const chipRow = blockEl.querySelector('.chip-row');
            if (chipRow) {
                chipRow.innerHTML = parseChips(input.value).map(v => `<span class="chip">${escapeHtml(v)}</span>`).join('');
            }
        }
    }
    saveState();
}

function onAudienceInputBlur(e) {
    const input = e.target;
    const i = parseInt(input.dataset.audIndex);
    const key = input.dataset.audKey;
    const campaign = getActiveCampaign();
    if (!campaign.audiences[i]) return;
    campaign.audiences[i][key] = input.value.trim();

    // Update chip row for tag-like fields
    const fieldWrap = input.closest('.audience-field');
    if (fieldWrap) {
        const chipRow = fieldWrap.querySelector('.chip-row');
        if (chipRow) {
            chipRow.innerHTML = parseChips(input.value).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
        }
    }
    saveState();
}

// ── Business KPIs ─────────────────────────────

function renderBusinessKpis() {
    const campaign = getActiveCampaign();
    if (!campaign.businessKpis) {
        campaign.businessKpis = { productValue: null, margin: null, goal: null, budget: null };
    }
    const bk = campaign.businessKpis;
    const fmt = (v, f) => v !== null && v !== undefined ? formatValue(v, f) : '';
    document.getElementById('bizProductValue').value = fmt(bk.productValue, 'currency');
    document.getElementById('bizMargin').value = fmt(bk.margin, 'percentage');
    document.getElementById('bizGoal').value = fmt(bk.goal, 'number');
    document.getElementById('bizBudget').value = fmt(bk.budget, 'currency');
    updateBusinessDerived();
}

function updateBusinessDerived() {
    const campaign = getActiveCampaign();
    const bk = campaign.businessKpis || {};
    const plannedEl = document.getElementById('bizPlannedCac');
    const maxEl = document.getElementById('bizMaxCac');
    const roasEl = document.getElementById('bizRoas');

    // Geplande CAC = Budget ÷ Doel
    let plannedCac = null;
    if (bk.budget && bk.goal && bk.goal > 0) {
        plannedCac = bk.budget / bk.goal;
        plannedEl.textContent = formatValue(plannedCac, 'currency');
    } else {
        plannedEl.textContent = '—';
    }

    // Max. CAC = Productwaarde × Winstmarge (alleen als marge ingevuld)
    let maxCac = null;
    if (bk.productValue && bk.margin && bk.margin > 0) {
        maxCac = bk.productValue * (bk.margin / 100);
        maxEl.textContent = formatValue(maxCac, 'currency');
    } else {
        maxEl.textContent = '—';
    }

    // Kleur Geplande CAC op basis van Max CAC
    plannedEl.classList.remove('biz-cac-ok', 'biz-cac-over');
    if (plannedCac !== null && maxCac !== null) {
        plannedEl.classList.add(plannedCac <= maxCac ? 'biz-cac-ok' : 'biz-cac-over');
    }

    // ROAS-target = (Doel × Productwaarde) ÷ Budget
    if (bk.productValue && bk.goal && bk.budget && bk.budget > 0) {
        const roas = (bk.goal * bk.productValue) / bk.budget;
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
    const noClientLabel = t('without_client');
    campaigns.forEach((c, i) => {
        const client = c.client || noClientLabel;
        if (!groups[client]) groups[client] = [];
        groups[client].push({ campaign: c, index: i });
    });

    // Sort clients alphabetically, "Zonder klant" last
    const sortedClients = Object.keys(groups).sort((a, b) => {
        if (a === noClientLabel) return 1;
        if (b === noClientLabel) return -1;
        return a.localeCompare(b);
    });

    sortedClients.forEach(clientName => {
        const items = groups[clientName];

        const group = document.createElement('div');
        group.className = 'client-group';

        // Client header
        const cCountLabel = items.length === 1 ? t('campaigns_one') : t('campaigns_many');
        group.innerHTML = `
            <div class="client-group-header">
                <span class="client-name">${clientName}</span>
                <span class="client-count">${items.length} ${cCountLabel}</span>
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
                if (info.hasEnded) periodText = t('period_ended');
                else if (!info.hasStarted) periodText = t('period_starts_in', info.remainingDays);
                else periodText = t('period_day_of', info.elapsedDays, info.totalDays);
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
                        ` : `<span style="font-size:0.7rem;color:var(--muted);">${t('card_no_data')}</span>`}
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
        label.textContent = t('progress_set_dates');
        pct.textContent = '';
        fill.style.width = '0%';
        today.classList.remove('visible');
        note.textContent = t('progress_period_note_empty');
        return;
    }

    const pctValue = Math.round(info.progress * 100);
    fill.style.width = pctValue + '%';
    pct.textContent = pctValue + '%';

    today.classList.add('visible');
    today.style.left = pctValue + '%';

    if (info.hasEnded) {
        label.textContent = t('progress_ended', info.totalDays);
        note.textContent = t('progress_ended_note');
    } else if (!info.hasStarted) {
        label.textContent = t('progress_starts_in', info.remainingDays);
        note.textContent = t('progress_not_started');
    } else {
        label.textContent = t('progress_day_of', info.elapsedDays, info.totalDays, info.remainingDays);
        note.textContent = t('progress_active_note');
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
        case 'green': return t('status_on_target');
        case 'orange': return t('status_attention');
        case 'red': return t('status_critical');
        default: return t('status_no_data');
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
    if (dev === null) return `<span style="color: var(--muted);">${t('explanation_no_actual')}</span>`;
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
        periodContext = t('summary_period_context', Math.round(info.progress * 100), info.elapsedDays, info.totalDays);
    }

    if (counts.total === 0) {
        badge.className = 'summary-badge';
        badge.textContent = t('summary_no_data');
        text.textContent = t('summary_no_data_text');
        return;
    }

    const score = counts.greens / counts.total;

    if (score >= 0.8 && counts.reds === 0) {
        badge.className = 'summary-badge good';
        badge.textContent = t('summary_good_badge');
        text.textContent = t('summary_good', campaign.name, counts.greens, counts.total, periodContext);
    } else if (counts.reds >= 2 || score < 0.4) {
        badge.className = 'summary-badge critical';
        badge.textContent = t('summary_critical_badge');
        text.textContent = t('summary_critical', campaign.name, counts.reds, counts.oranges, periodContext);
    } else {
        badge.className = 'summary-badge warning';
        badge.textContent = t('summary_warning_badge');
        text.textContent = t('summary_warning', campaign.name, counts.greens, counts.oranges + counts.reds, periodContext);
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

    // Download audiences as PNG
    document.getElementById('btnDownloadAudiences').addEventListener('click', () => {
        downloadAudiencesAsPng('.audience-list', getActiveCampaign());
    });

    // Add audience
    document.getElementById('btnAddAudience').addEventListener('click', () => {
        const campaign = getActiveCampaign();
        if (!Array.isArray(campaign.audiences)) campaign.audiences = [];
        campaign.audiences.push(createAudience());
        renderAudiences();
        saveState();
        // Focus the name input of the newly added card
        const cards = document.querySelectorAll('.audience-card');
        const last = cards[cards.length - 1];
        if (last) last.querySelector('.audience-name-input').focus();
    });

    // Business KPI inputs
    const bizFields = [
        { id: 'bizProductValue', key: 'productValue', format: 'currency' },
        { id: 'bizMargin', key: 'margin', format: 'percentage' },
        { id: 'bizGoal', key: 'goal', format: 'number' },
        { id: 'bizBudget', key: 'budget', format: 'currency' },
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
            if (!campaign.businessKpis) campaign.businessKpis = { productValue: null, margin: null, goal: null, budget: null };
            const parsed = parseValue(e.target.value);
            campaign.businessKpis[f.key] = parsed;
            e.target.value = parsed !== null ? formatValue(parsed, f.format) : '';
            updateBusinessDerived();
            saveState();
        });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
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
            alert(t('delete_min_one'));
            return;
        }
        if (!confirm(t('delete_confirm', getActiveCampaign().name))) return;
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
            document.getElementById('shareNote').textContent = t('share_copied');
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
                showToast(t('toast_no_csv'), true);
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

            showToast(t('toast_csv_ok', applied, result.rowCount, kpiNames));
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
        if (!confirm(t('benchmark_apply_confirm', branchName))) return;
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
    if (!Array.isArray(c.audiences)) c.audiences = [];
    c.audiences.forEach(migrateAudience);
    if (!c.businessKpis) c.businessKpis = { productValue: null, margin: null, goal: null, budget: null };
    if (c.businessKpis.budget === undefined) c.businessKpis.budget = null;
    if (c.businessKpis.margin === undefined) c.businessKpis.margin = null;
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
