# AGENT FINDINGS: TOP-DOWN TRADE DATA + VALUATION (received 2026-08-29)

## TRADE DATA MEMO (agent 3)
Egress proxy blocked ALL statistical APIs (Comext, Comtrade, WITS, CYSTAT, audit.gov.cy, moa.gov.cy). Ready-to-run queries saved at /home/user/K/tyre_data/api_queries_to_run.txt; raw log tyre_data/raw_findings.txt.

### (A) Comext tables NOT OBTAINED. Snippet fragments (indicative only, unverified):
- Cyprus 4011 imports 2024: from Germany US$7.97m; Japan US$1.93m; China US$20.22m (4011 vs ch.40 attribution unconfirmed; China ch.40 US$23.14m, Germany ch.40 US$10.83m) [TradingEconomics/Comtrade-based].
- Physical volume anchors: 500k-600k tyres/yr imported [Loizia/Zorpas et al. 2019, Env Sci Pollut Res, doi 10.1007/s11356-019-05131-z]; 700k-800k tyres/yr per Audit Office estimate [Cyprus Mail 2022-02-04]; Enerco processed 48,000t = ~4.5m tyres 2016-2021 (~750k/yr) + 10,450t legacy; ~12,000 t/yr burned at Vassiliko cement (capacity 9,000-11,000t) [Cyprus Mail 2022-06-15].
- Cyprus takes 41% of Greece's tyre exports, Greece's top tyre export market [IndexBox - VENDOR CLAIM, UNVERIFIED].

### (D) AUDIT OFFICE FINDING - CONFIRMED
- Cyprus Audit Office Special Report PE/01/2021 "Diacheirisi Apovliton Elastikon Ochimaton" (Management of Waste Vehicle Tyres), published 21 April 2021; discussed House Watchdog Committee Feb 2022.
- Exact claim [Cyprus Mail 2022-02-04]: ~35% of tyres imported each year - those arriving from the EU via Limassol port - pass without the environmental fee levied (port concession operators not required to verify); the 65% non-EU origin clear customs where fee enforced pre-release. Est. loss ~EUR 100k/yr, ~EUR 500k cumulative since 2017 port commercialisation. Import base cited 700k-800k tyres/yr.
- Fee receipts don't itemise categories/quantities; weighbridge totals only [Cyprus Times].
- NOTE: fee applies to NEW tyres imported ("scrap tyres" headline is loose). Post-2022 remediation status NOT established.
- KEY IMPLICATION: EU-origin tyres evade the fee, NOT customs - so customs/Comext data still captures them; but ELT-scheme declared volumes UNDERSTATE market by ~the evasion share.

### (E) ELT/EPR
- Two licensed collective systems: E4C Ltd (e4c.com.cy, non-profit, fee certificates/coupons per imported tyre) and RTM Tyres Recycling Ltd; individual systems permitted; tyres = only Cyprus EPR stream with competing operators [Lappa EPR guide; ETEK presentation]. Producer register at Department of Environment.
- Fee schedule + importer register NOT extractable (blocked).
- ELT collection 1,817t (2011) -> 7,201t (2016), 6,691t to cement [Springer paper]; ~12,000 t/yr to Vassiliko now.
- Conversions (DERIVED only): PCR 8-9kg, TBR 55-65kg; Enerco blend 48,000t/4.5m = 10.67 kg/tyre avg.
- Triangulated import volume: ~500k-800k tyres/yr (~5,000-8,500t), Audit Office 700-800k most recent official.

## VALUATION MEMO (agent 6) - all accessed 2026-08-29
### (A) Transactions
- LKQ/Rhiag 2015-16 IT/CH/CEE: EV EUR 1.0375b, 10.6x 2015E adj EBITDA STATED BY LKQ [SOURCED, tyrepress + SEC 8-K].
- LKQ/Stahlgruber 2017-18 DE: EV EUR 1.5b, rev ~EUR 1.6b, ~10x 2017E EBITDA incl. synergies [SOURCED].
- Mekonomen/FTZ+Inter-Team 2018 DK/PL: EUR 395m cash/debt-free; LTM sales SEK 5,203m, EBITDA SEK 417m -> ~9.7x DERIVED (FX 10.28), EV/Sales 0.78x [MEKO PRs].
- Bain/Fintyre 2017 IT: rev ~EUR 400m 2016; price ND. Add-ons REIFF + Reifen Krieg -> ~EUR 1b sales, 1,300+ staff. INSOLVENCY Feb 2020 (German units; Jan 2020 wages missed; 7 of 16 subs in proceedings; Bridgestone took 42 REIFF branches/554 staff out of insolvency May 2020) [Bloomberg Law, Tyrepress, Unquote].
- Halfords/National Tyres (Axle Group) Dec 2021 UK: GBP 62m (+17m capex +2m integration = up to 81m); rev GBP 157.7m FY2020 -> EV/Sales 0.39x DERIVED; EBITDA ND.
- Itochu/Kwik-Fit 2011: GBP 637m EV incl. GBP 457m debt; 1,218 centres; EBITDA ND. CVC sold 2005 ~GBP 800m.
- Michelin/Euromaster, Bridgestone/First Stop bolt-ons (Groupe Ayme, ETB; ETB re-sold to Oak Group Mar 2026), Continental divesting BestDrive France to ASC Investment: all ND, strategic captive builds/exits.
- Goodyear: sold Dunlop brand $735m, OTR to Yokohama $905m (closed Feb 2025); kept retail.
- ATD: Chapter 11 TWICE (2018, ~$1.1b debt cut; Oct 2024, $1.91b funded debt, $2.3b DIP, 363 sale to lender group).
- Point S = member cooperative, no equity EV - structural alternative (affiliate rather than sell).
- Fintyre lesson: roll-up scale did not create margin; low-single-digit wholesale margins + leverage + warm winter broke it in <3 yrs.

### (B) Trading comps
- Inter Cars (WSE:CAR) FY2024: rev PLN 19,473m; EBITDA PLN 1,266m; inventory PLN 5,028m; ND/EBITDA 2.18x; EV/EBITDA ~9.3-9.6x [multiples.vc Jul 2026; GuruFocus].
- Auto Partner (WSE:APR): LTM Jun 2026 rev ~$1.0b, EBITDA ~$97m, EV/EBITDA ~10.3-10.6x.
- Delticom (ETR:DEX) FY2025: rev EUR 484m; op EBITDA EUR 20.1m; EBIT EUR 8.9m (after EUR 1.2m inventory write-downs); net EUR 4.1m; GMV EUR 601m; mkt cap EUR 31.74m (15 Aug 2026) -> mkt-cap/EBITDA 1.6x DERIVED; EV not computable (net debt not retrieved) - equity at 0.07x sales.
- Monro (US ref): EV/EBITDA ~9.2-9.3x.
- Read-through: scaled liquid distribution ~9-10.5x; market pays for scale/density/margin, not tyre pass-through revenue.

### (C) Advisor ranges [ESTIMATE]
- Capstone middle-market all-industry avg 9.8x 2025 (9.4x 2024, 9.0x 2023).
- CT Acquisitions Tire & Service M&A 2026: tire businesses $1-5m EV avg 5.5x; $5-10m EV avg 5.6x adj EBITDA (H1 2025); fleet-contract service prices at/above.
- Auxo: aftermarket parts/distribution ~0.7-2.3x revenue band.
- KPMG CF Q3 2025 aftermarket newsletter + Capstone May 2025 sector PDF: exist, blocked - pull directly. Kroll/Oaklins not retrieved - do not cite from memory.

### (D) Argos Index
- Q1 2026 = 8.6x EV/EBITDA eurozone mid-market (+3.6% QoQ from decade low); PE buyers 10.0x vs strategics 7.8x (spread 2.2x); <7x = 22% of deals; >15x = 6%. Q2 2026 not yet published as of 2026-08-29. [argos.fund]

### (E) Working capital
- Convention: cash-free/debt-free + normalized NWC peg off 12-month average (tyre stock seasonal). Mekonomen/FTZ precedent explicit.
- Inter Cars inventory/sales = 5,028/19,473 = 25.8% DERIVED. Receivables/payables not retrieved - full NWC/sales NOT reported.
- Delticom EUR 1.2m inventory write-downs = obsolescence risk evidence.
- Cyprus target on ~EUR 5m revenue: ~EUR 1.0-1.5m in inventory alone [ESTIMATE scaled].

### (F) Synthesis
- (a) Scaled platforms 9-11x. (b) Small owner-managed distributor (Lagrome analogue): ~3.5-5.5x normalized EBITDA cash-free/debt-free + 12-mo NWC peg; upper half only with written manufacturer consent to agency transfer + management transition. Build: Argos strategic 7.8x -> small-deal 5.5-5.6x -> Damodaran illiquidity 25-50% (convention 20-30%) -> company-specific (agency non-transfer, owner dependency, leverage fragility, island micro-market, no roll-up optionality for most acquirers) -> midpoint 4-5x, sub-4x if agencies not contractually secure.
- Agency risk precedent: Bridgestone reclaiming REIFF branches; Continental exiting BestDrive to franchise; manufacturers demonstrably reclaim/re-route distribution. Price agencies as conditional value (earn-out/MAC condition).
- Open items: Argos Q2 2026; Kroll/Oaklins; Capstone sector PDF; Inter Cars receivables/payables; Delticom net debt.
