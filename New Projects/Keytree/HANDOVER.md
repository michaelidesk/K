# Handover - Keytree Limited structuring memorandum

**Client:** Keytree Limited, HE 372478, Cyprus (real estate development - Famagusta and Livadia, Larnaca)
**Engagement:** Comparison of structures for the introduction of €20m by Starter Point (Nigeria); selection paper for the shareholders
**Prepared by:** Vertu Projects Ltd - signed by Leonidas Papadopoulos, Director
**Status:** Draft for discussion with the shareholders. Not for issue to the auditors. Dated August 2026.
**Repo location:** `New Projects/Keytree/` on branch `claude/vertu-tax-advisory-memo-00b2l3` of `michaelidesk/K`

---

## 1. Deliverable

`Keytree - Structure selection memorandum.docx` (with a rendered `.pdf` alongside). Seven pages, one page per section:

| Page | Content |
|---|---|
| 1 | Executive summary: document control, scope, key facts at 31.12.2025, five-structure comparison table, findings, recommendation |
| 2 | Structure 1A - ordinary shares at a premium plus bonus issue (reserve option; restores balance sheet and register) |
| 3 | Structure 1B - redeemable preference, discretionary non-cumulative dividend (not preferred) |
| 4 | Structure 1C - fixed / cumulative preference (rejected; IAS 32 liability) |
| 5 | Structure 2 - Cyprus holding company subscribing equity (banking / platform rationale only) |
| 6 | Structure 3 - Cyprus finance company lending at arm's length (**recommended**) |
| 7 | Robustness of the recommendation (prose, issue-led), before-implementation steps, signature, disclaimer |

**Recommendation:** Structure 3. Net group benefit approximately 12% of cumulative interest - €0,4m to €1,2m over six years at illustrative rates of 3% to 8% - versus nil under every equity route. Fallback if balance sheet / register govern: structure 1A, at no tax cost.

## 2. Format standards (do not deviate on revisions)

- Arial throughout; body 9pt, tables 8pt; A4, 19mm side margins.
- Monochrome only - black text, grey rules, light-grey table header shading. The only colour on any page is the Vertu Projects logo, top right of the header; "PRIVATE AND CONFIDENTIAL" top left.
- All tables span the full text width (9.750 twips) and align flush with the header and footer rules.
- Each structure page closes with a bold "Conclusion." line above a black rule.
- No personas in the review section (no "reviewing partner" framing) - concerns are answered by issue, in prose.
- No italic taglines under headings. No em-dashes; hyphens only. European number format (€3.981.897; €1,6m).
- Footer: `Vertu Projects Ltd | Keytree Limited - introduction of €20m: structure selection | Page X of Y`.
- Document metadata author: Vertu Projects Ltd only.

## 3. Regeneration

Source files are in `source/`:

- `gen_memo.js` - generates the docx (Node, `docx` npm package: `npm install docx`, then `node gen_memo.js` in the same directory as the logo).
- `vertu_logo.png` - brand logo (900x380 PNG, extracted from the client draft; brand orange #FF3C00, black #070B0E).

Render check: convert to PDF with LibreOffice (`soffice --headless --convert-to pdf`) and confirm the document remains exactly 7 pages - one page per section is a hard layout requirement.

## 4. Key figures relied on (from draft FS to 31.12.2025, draft of 12.6.2026)

- Issued capital 1.500 ordinary shares of €1; authorised capital fully issued (Memorandum clause 5 still shows €1.200 - to be aligned).
- Total equity negative €3.981.897; accumulated losses €3.983.397; tax losses c/f €3.207.165.
- Shareholder loan €30.354.609; other payables €28.132; no bank debt; turnover nil.
- Target register: Levy 80% / Starter Point 10% / two minorities 5% each (1A table: 1.360 / 170 / 85 / 85 on 1.700 shares).
- 2025 draft inconsistency: interest €675.266 expensed vs €289.709 capitalised - policy to be settled.

## 5. Tax positions verified (Cyprus reform in force 1.1.2026; verified August 2026)

- CIT 15% from 1.1.2026; company interest under CIT only, exempt from SDC; DDD abolished; loss carry-forward 7 years.
- TP local file thresholds: €10m financing / €5m goods / €2,5m other. The €20m facility requires a local file.
- Capital reductions: distributions measured at market value; excess over capital paid in taxed as dividend.
- Capitalisation of distributable reserves treated as dividend - bonus issue from share premium should fall outside; **to be confirmed before resolutions are drafted**.
- NID: 80% cap, no carry-forward of unused amounts; 2026 reference rate = Cyprus 10-year bond yield at 31.12.2025 + 5pp ≈ 8-8,5% (Tax Department table published March 2026 - take the exact figure from the table each year).
- Exceeding borrowing costs within €3m ILR safe harbour; no Cyprus WHT on the interest; stamp duty on facility agreement capped at €20.000.

## 6. Open items (owner actions before the shareholder meeting)

1. **Obtain the existing transfer pricing study.** The 3% median on the current shareholder loans is asserted in the client draft and has not been sighted. Highest-priority gap.
2. **Commission the new transfer pricing study** for the €20m facility before any rate or benefit figure is put to the shareholders.
3. Agree the borrowing-cost capitalisation policy (and, if a preference route is revisited, IAS 32 classification) with the auditors.
4. Confirm the bonus-issue-from-premium position against the 2026 capitalisation-of-reserves rule.
5. Confirm the banking route and Nigerian exchange control position; assemble source-of-funds evidence before the remittance.
6. Registrar filings: authorised capital increase; align Memorandum clause 5 with the 8.10.2020 resolution.
7. After the shareholders select a structure: prepare the single-structure paper with draft resolutions, in a form suitable for review by the company's auditors (KPMG).

## 7. Sequencing constraints embedded in the analysis

- Subscription before bonus issue (Regulation 130 operates only once the premium account exists).
- Preference redemption terms fixed by special resolution **before** issue (Regulation 8) - terms agreed after issue are ineffective.
- Advance received by Keytree **before** any repayment to Mr Levy; rationale minuted at the time.
- Local file in place before the first interest accrual.

## 8. Source material

- Client draft: "Keytree - comparison of structures" (Word, supplied 11.8.2026) - the analytical base; figures and company-law detail were carried over from it after verification of the tax positions.
- Papers cited in the memorandum: draft FS to 31.12.2025 (12.6.2026), M&A 2017, member's resolution 8.10.2020, Declaration of Trust 11.11.2022.
