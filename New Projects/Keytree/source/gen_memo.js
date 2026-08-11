const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, AlignmentType, ImageRun, Header, Footer, PageBreak,
  PageNumber, TabStopType, ShadingType, VerticalAlign, convertMillimetersToTwip
} = require('docx');

const INK = '000000';
const GREY = '595959';
const SHADE = 'F2F2F2';
const RULE = 'BFBFBF';

const logo = fs.readFileSync('vertu_logo.png');

// ---------- helpers ----------
const F = 'Arial';
const BODY = 18;   // 9pt
const SMALL = 16;  // 8pt

function r(text, opts = {}) {
  return new TextRun({ text, font: F, size: opts.size || BODY, bold: !!opts.bold, italics: !!opts.i, color: opts.color || INK, allCaps: !!opts.caps, characterSpacing: opts.cs });
}
function p(children, opts = {}) {
  if (typeof children === 'string') children = [r(children, opts.run || {})];
  return new Paragraph({
    children, alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: opts.after == null ? 100 : opts.after, before: opts.before || 0, line: 248, lineRule: 'auto' },
    border: opts.border, indent: opts.indent, keepNext: opts.keepNext, keepLines: true,
  });
}
function subHead(text) {
  return new Paragraph({
    children: [r(text, { bold: true, size: BODY, color: INK })],
    spacing: { before: 140, after: 70 }, keepNext: true,
  });
}
function pageTitle(kicker, title, sub) {
  const out = [];
  out.push(new Paragraph({
    children: [r(kicker, { size: 15, bold: true, color: GREY, caps: true, cs: 20 })],
    spacing: { before: 0, after: 40 },
  }));
  out.push(new Paragraph({
    children: [r(title, { bold: true, size: 27, color: INK })],
    spacing: { after: sub ? 30 : 90 },
    border: sub ? undefined : { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 4 } },
  }));
  if (sub) out.push(new Paragraph({
    children: [r(sub, { size: 19, color: GREY, i: true })],
    spacing: { after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 4 } },
  }));
  return out;
}

function cell(content, opts = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map(t =>
    typeof t === 'string'
      ? new Paragraph({
          children: [r(t, { size: opts.size || SMALL, bold: !!opts.bold, color: opts.color || INK, i: opts.i })],
          alignment: opts.align || AlignmentType.LEFT,
          spacing: { after: 20, line: 228, lineRule: 'auto' },
        })
      : t);
  return new TableCell({
    children: paras, width: { size: opts.w, type: WidthType.DXA },
    shading: opts.shade ? { type: ShadingType.CLEAR, fill: opts.shade } : undefined,
    margins: { top: 50, bottom: 30, left: 80, right: 80 },
    verticalAlign: VerticalAlign.TOP,
    columnSpan: opts.span,
  });
}
function table(widths, rows) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: INK },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: INK },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: RULE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows,
  });
}
function hrow(widths, labels) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l, i) => cell(l, { w: widths[i], bold: true, shade: SHADE, size: SMALL, align: (typeof l === 'string' && l.startsWith('€')) ? AlignmentType.RIGHT : undefined })),
  });
}
function row(widths, cells) {
  return new TableRow({ children: cells.map((c, i) => (c && c.__opts) ? cell(c.v, { w: widths[i], ...c.__opts }) : cell(c, { w: widths[i] })) });
}
const right = (v, o = {}) => ({ v, __opts: { align: AlignmentType.RIGHT, ...o } });
const bold = (v, o = {}) => ({ v, __opts: { bold: true, ...o } });

function conclusion(text) {
  return new Paragraph({
    children: [r('Conclusion.  ', { bold: true, size: BODY, color: INK }), r(text, { size: BODY, color: INK })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 140, after: 0, line: 248, lineRule: 'auto' },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 4 } },
    keepLines: true,
  });
}
const brk = () => new Paragraph({ children: [new PageBreak()] });

// ---------- header / footer ----------
function makeHeader(logoW, logoH) {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: 'PRIVATE AND CONFIDENTIAL', font: F, size: 14, bold: true, color: GREY, characterSpacing: 16 }),
          new TextRun({ text: '\t' , font: F, size: 14 }),
          new ImageRun({ type: 'png', data: logo, transformation: { width: logoW, height: logoH } }),
        ],
        tabStops: [{ type: TabStopType.RIGHT, position: 9750 }],
        spacing: { after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
      }),
    ],
  });
}
const headerDefault = makeHeader(80, 34);
const headerFirst = makeHeader(110, 46);

const footer = new Footer({
  children: [
    new Paragraph({
      children: [
        new TextRun({ text: 'Vertu Projects Ltd', font: F, size: 14, bold: true, color: INK }),
        new TextRun({ text: '   |   Keytree Limited - introduction of €20m: structure selection   |   ', font: F, size: 14, color: GREY }),
        new TextRun({ text: 'Page ', font: F, size: 14, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: F, size: 14, color: GREY }),
        new TextRun({ text: ' of ', font: F, size: 14, color: GREY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: F, size: 14, color: GREY }),
      ],
      alignment: AlignmentType.LEFT,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
      spacing: { before: 40 },
    }),
  ],
});

// ============================================================
// PAGE 1 - EXECUTIVE SUMMARY
// ============================================================
const W1 = [1750, 8000];
const WF = [4875, 4875];
const page1 = [
  ...pageTitle('Structuring memorandum', 'Keytree Limited', 'Introduction of €20m by Starter Point: scope, structures considered, tax effect and recommendation'),
  table(W1, [
    row(W1, [bold('Client'), 'Keytree Limited, HE 372478, Cyprus - real estate development (Famagusta and Livadia, Larnaca sites)']),
    row(W1, [bold('Transaction'), 'Introduction of €20m by Starter Point (Nigeria), applied partly in repayment of the existing shareholder loan and partly in funding the developments']),
    row(W1, [bold('Basis'), 'Draft financial statements to 31.12.2025 (draft of 12.6.2026), Memorandum and Articles 2017, member’s resolution of 8.10.2020, Declaration of Trust of 11.11.2022, Cyprus tax legislation as amended with effect from 1.1.2026']),
    row(W1, [bold('Status'), 'Draft for discussion with the shareholders. Not for issue to the auditors; a separate paper on the selected structure will be prepared for their review.']),
    row(W1, [bold('Date'), 'August 2026']),
  ]),
  p(' ', { after: 40 }),
  subHead('Scope'),
  p('Mr Levy requires an 80/10/5/5 shareholding structure (himself, Starter Point, two minority holders), a 5% share of every distribution for each minority holder, and the ability to recover and redeploy the funds. This paper compares five structures against those objectives on company law, accounting, tax and practical grounds, so that the shareholders can select one. Detailed resolutions and auditor-facing papers will follow the selection.'),
  subHead('Key facts at 31 December 2025 (draft financial statements)'),
  table(WF, [
    row(WF, ['Issued capital: 1.500 ordinary shares of €1, fully issued; authorised capital exhausted', 'Total equity: negative €3.981.897; accumulated losses €3.983.397']),
    row(WF, ['Shareholder loan: €30.354.609; other payables €28.132; no bank debt', 'Turnover: nil to date; tax losses carried forward €3.207.165']),
  ]),
  p(' ', { after: 40 }),
  subHead('Structures considered'),
  table([1150, 3100, 1800, 1950, 1750], [
    hrow([1150, 3100, 1800, 1950, 1750], ['Ref', 'Instrument', 'Equity restored', 'Funds recoverable', 'Group tax effect']),
    row([1150, 3100, 1800, 1950, 1750], [bold('1A'), 'Ordinary shares at a premium, plus bonus issue', 'Yes, +€16,0m', 'Court process', right('Nil')]),
    row([1150, 3100, 1800, 1950, 1750], [bold('1B'), 'Redeemable preference, discretionary dividend', 'Yes, +€16,0m', 'After profits arise', right('Nil')]),
    row([1150, 3100, 1800, 1950, 1750], [bold('1C'), 'Preference with fixed 8% entitlement', 'No - liability', 'After profits arise', right('Nil')]),
    row([1150, 3100, 1800, 1950, 1750], [bold('2'), 'Cyprus holding company subscribing equity', 'Yes, +€16,0m', 'Court process', right('Nil')]),
    row([1150, 3100, 1800, 1950, 1750], [bold('3'), 'Cyprus finance company lending at arm’s length', 'No', 'At any time', right('€0,4m to €1,2m')]),
  ]),
  p(' ', { after: 40 }),
  subHead('Findings'),
  p('No structure produces a notional interest deduction of value inside Keytree: the deduction is capped at 80% of taxable profit from the assets financed, unused amounts do not carry forward, and Keytree will have no taxable profit until the projects sell. Structure 3 is the only structure with a group-level effect. The finance company earns taxable interest sheltered by the deduction (2026 reference rate approximately 8 to 8,5%), resulting in an effective rate of 3% on interest income, while the interest is capitalised into Keytree’s development cost and relieved at 15% on delivery. The net group benefit is approximately 12% of cumulative interest - €0,4m to €1,2m over six years at the 3% to 8% rates illustrated. The rate itself is to be determined by a new transfer pricing study; a local file is required, the €20m facility being above the €10m financing threshold.'),
  subHead('Recommendation'),
  p('Structure 3, subject to the conditions on pages 6 and 7: an arm’s length rate supported by a new transfer pricing study, consistent capitalisation of borrowing costs, Cyprus substance in the finance company, and evidenced source and sequence of funds. It is the only structure with a measurable tax benefit and the only one under which principal can be repaid and redeployed without a court application or distributable profits. It does not restore the balance sheet and does not place Starter Point on the register; if those objectives govern, structure 1A is the appropriate choice, and no tax benefit is foregone by selecting it.'),
];

// ============================================================
// PAGE 2 - 1A
// ============================================================
const WA = [2350, 7400];
const page2 = [
  ...pageTitle('Structure 1A', 'Ordinary shares issued at a premium'),
  subHead('Mechanics'),
  p('Starter Point subscribes €20m for 170 new ordinary shares (€170 nominal, €19.999.830 share premium). Thirty bonus ordinary shares are then paid up out of the premium account - ten to Mr Levy and ten to each minority holder - producing exactly 80/10/5/5 on an enlarged capital of 1.700 shares. The authorised capital must first be increased (all 1.500 authorised shares are issued) and pre-emption under Regulation 6 disapplied or waived by all three members.'),
  table([2700, 1530, 1430, 1730, 2360], [
    hrow([2700, 1530, 1430, 1730, 2360], ['Shareholder', 'Now', 'Bonus', 'Subscribed', 'After']),
    row([2700, 1530, 1430, 1730, 2360], ['Mr Levy (through nominee)', right('1.350'), right('10'), right('nil'), right('1.360   (80,0%)')]),
    row([2700, 1530, 1430, 1730, 2360], ['Starter Point', right('nil'), right('nil'), right('170'), right('170   (10,0%)')]),
    row([2700, 1530, 1430, 1730, 2360], ['Minority shareholders (each)', right('75'), right('10'), right('nil'), right('85   (5,0%)')]),
    row([2700, 1530, 1430, 1730, 2360], [bold('Total'), right('1.500', { bold: true }), right('30', { bold: true }), right('170', { bold: true }), right('1.700   (100%)', { bold: true })]),
  ]),
  p(' ', { after: 40 }),
  subHead('Assessment'),
  table(WA, [
    row(WA, [bold('Accounting'), 'Equity under IAS 32 without qualification. Equity moves from negative €3,98m to approximately positive €16,0m; the going concern position is resolved and no letter of support is required.']),
    row(WA, [bold('Register'), 'The only structure that delivers 80/10/5/5 on the ordinary register. Dividends then follow shareholdings, so the minority entitlement requires no further drafting.']),
    row(WA, [bold('Tax'), 'The subscription constitutes new equity for Article 9B purposes, but the notional interest deduction is of no value in Keytree: it is capped at 80% of taxable profit from the assets financed, Keytree has none, and unused amounts are not carried forward. No group tax benefit arises.']),
    row(WA, [bold('Return of funds'), 'The premium is capital. Recovery requires a reduction of capital: special resolution and District Court sanction. This is feasible in this company - the only substantial creditor is Mr Levy, who can consent - but the process is slow and must be repeated for each redeployment. Under the 2026 legislation, assets distributed on a reduction are measured at market value and the excess over the capital paid in by the shareholder is taxed as a dividend; the exit should be planned with this in view.']),
    row(WA, [bold('Value transfer'), 'The bonus issue increases the minority holders’ combined 10% from a share of negative equity to approximately €1,6m of net assets, funded from the subscription premium. This is the direct consequence of the 80/10/5/5 objective and should be accepted as part of its cost. Because the bonus shares are paid up from share premium, and not from reserves available for distribution, the 2026 provision treating capitalisations of distributable reserves as dividends should not apply; this is to be confirmed before the resolutions are drafted.']),
    row(WA, [bold('Steps'), 'Increase the authorised capital (ordinary resolution, Registrar filing); align Memorandum clause 5 with the 2020 increase; disapply Regulation 6; complete the subscription before the bonus issue (Regulation 130 operates only once the premium account exists); record the commercial rationale for the bonus issue in the minutes.']),
  ]),
  conclusion('Appropriate where the balance sheet and the register are the governing considerations. No tax benefit arises, and the return of funds is the least flexible of the structures considered.'),
];

// ============================================================
// PAGE 3 - 1B
// ============================================================
const page3 = [
  ...pageTitle('Structure 1B', 'Redeemable preference shares with a discretionary, non-cumulative dividend'),
  subHead('Mechanics'),
  p('Two new classes are created by special resolution before issue. Class B is subscribed by Starter Point at €20m (€1 nominal plus premium) and carries the economic return. Class A is issued as bonus shares to Mr Levy and the minority holders, with rights defined in the Articles as a stated proportion of any amount distributed on Class B, so that each minority holder receives 5% of every distribution. Both classes carry discretionary, non-cumulative dividends on identical terms.'),
  subHead('Assessment'),
  table(WA, [
    row(WA, [bold('Accounting'), 'Equity under IAS 32 only if the company holds an unconditional right to refuse the dividend: payable solely if the directors declare it, and non-cumulative. Any automatic entitlement once profits exist converts the instrument into a financial liability. The terms are to be agreed with the auditors before the resolutions are passed. On these terms, equity rises to approximately positive €16,0m and the going concern position is resolved.']),
    row(WA, [bold('Minorities'), 'Protected by the proportionate entitlement written into the class rights, rather than a shareholders’ agreement. A coupon on nominal value does not achieve the objective: 150 Class A shares at 8% on €1 nominal would yield €12 a year against Starter Point’s €1,6m. No capital movement is required and the full premium account remains available for redemption.']),
    row(WA, [bold('Register'), 'If the preference shares are non-voting, the ordinary register remains at 90/5/5 and Starter Point does not appear as a 10% holder. Meeting that objective requires votes on the preference shares or a parallel small ordinary issue.']),
    row(WA, [bold('Return of funds'), 'Redemption under section 57 of Cap. 113 without court sanction, on terms fixed by special resolution before issue; this sequence is mandatory. Section 55(3) permits the premium account to fund the redemption premium, so only the nominal amount need come from distributable profits, with an equal transfer to the capital redemption reserve. The constraint is substantive: no distributable profits exist and none will arise until the projects complete and sell, so the redemption right is prospective.']),
    row(WA, [bold('Tax'), 'As structure 1A: the notional interest deduction accrues in Keytree and is of no value. No group tax benefit arises.']),
    row(WA, [bold('Steps'), 'Special resolution creating the classes and fixing the redemption terms before issue (Regulation 8); any subsequent variation of class rights requires the consent of three-fourths of the class (Regulation 9); authorised capital increase and Memorandum alignment as for 1A; extension of the Declaration of Trust where Mr Levy holds Class A through the nominee, and update of the beneficial ownership register.']),
  ]),
  conclusion('Not preferred. The redemption right cannot be exercised until distributable profits arise, the register objective is not met unless the preference shares carry votes, and no tax benefit arises to offset the additional class-rights complexity.'),
];

// ============================================================
// PAGE 4 - 1C
// ============================================================
const page4 = [
  ...pageTitle('Structure 1C', 'Preference shares with a fixed or cumulative entitlement'),
  subHead('Mechanics'),
  p('As structure 1B, but Class B carries a fixed entitlement of 8% (€1,6m a year) payable once profits exist, cumulative if unpaid. This reflects the terms originally discussed: a defined return ranking ahead of the ordinary shares.'),
  subHead('Assessment'),
  table(WA, [
    row(WA, [bold('Accounting'), 'An obligation to pay that is conditional only on the existence of profits remains an obligation. Under IAS 32 the instrument is a financial liability, measured at the present value of the expected payments. The €20m is recognised as debt, not equity.']),
    row(WA, [bold('Balance sheet'), 'Equity remains negative at €3,98m. The going concern position is not resolved, the letter of support remains necessary, and the audit report continues to carry the related disclosure.']),
    row(WA, [bold('Accumulation'), 'A cumulative 8% on €20m accrues at €1,6m a year against a company with accumulated losses of €3,98m and no turnover. Over the five to six years the projects require, €8m to €10m of arrears would rank ahead of every ordinary share, including the minority holdings.']),
    row(WA, [bold('Effect of the rate'), 'Reducing the rate from 8% to 5% changes the size of the liability, not its classification. Equity treatment is restored only by removing the obligation - a discretionary, non-cumulative dividend - which is structure 1B.']),
    row(WA, [bold('Tax'), 'As structures 1A and 1B: no group tax benefit. The preference dividend is a distribution, not a deductible cost, so the fixed entitlement carries no offsetting relief.']),
  ]),
  subHead('Observation'),
  p('The features sought under this structure - a fixed, senior, defined return - correspond in substance to debt. Structure 3 provides those features with repayment available at any time and a deductible cost capitalised into the developments. Structure 1B provides equity classification at the cost of making the return discretionary. Structure 1C combines the disadvantages of both: liability classification without deductibility.'),
  conclusion('Not recommended. The instrument is a financial liability which does not restore the balance sheet, while providing no tax relief.'),
];

// ============================================================
// PAGE 5 - Scenario 2
// ============================================================
const page5 = [
  ...pageTitle('Structure 2', 'Cyprus holding company subscribing equity'),
  subHead('Mechanics'),
  p('Starter Point forms a Cyprus company and funds it with €20m of equity (1.000 shares at a premium). The new company subscribes for shares in Keytree on the terms of structure 1A or 1B. The instrument inside Keytree - and therefore the company law and accounting analysis - is identical to scenario 1; only the identity of the subscriber changes.'),
  subHead('Assessment'),
  table(WA, [
    row(WA, [bold('Tax at the new company'), 'The asset financed by the new equity is a shareholding in Keytree and the income from it is exempt dividends. The notional interest deduction is capped at 80% of taxable profit from the asset financed; no deduction therefore arises at this level, and the deduction inside Keytree remains of no value for the reasons on page 2.']),
    row(WA, [bold('Group relief'), 'Not available. Group relief requires a 75% holding; the new company would hold 10%.']),
    row(WA, [bold('Cost'), 'A second Cyprus company to administer on an ongoing basis - audit, tax filings, registered office, directors - with no offsetting fiscal benefit.']),
    row(WA, [bold('Banking'), 'The principal practical consideration. A €20m remittance from a Nigerian company directly into a Cyprus property developer under common ownership will attract extended due diligence. Interposing a Cyprus company does not remove that scrutiny at the point of entry, but subsequent movements are between Cyprus companies with an established banking history. This is a banking consideration rather than a fiscal one, and should be discussed with the receiving bank before implementation.']),
    row(WA, [bold('Platform'), 'A holding vehicle has independent value where further Cyprus projects are contemplated: future acquisitions, co-investment and eventual exit can be held under one company. If that is the intention, the company should be formed for that purpose, with this transaction routed through it incidentally.']),
    row(WA, [bold('Exit'), 'As for the underlying instrument (court-sanctioned reduction under 1A terms; redemption after profits arise under 1B terms), with one further step to extract the funds from the holding company to Starter Point.']),
  ]),
  subHead('Relationship to structure 3'),
  p('Structures 2 and 3 use the same vehicle - a Starter Point-owned Cyprus company funded with €20m of equity - and differ only in the application of the funds: subscription as equity, with no tax effect at any level, or lending at interest, which is the only structure with a measurable benefit. Where a Cyprus vehicle is to be formed at all, the comparison is set out on page 6.'),
  conclusion('Not recommended on a standalone basis. To be adopted only where the banking route or a multi-project holding platform independently justifies the vehicle; where a vehicle is formed, structure 3 is the more effective use of it.'),
];

// ============================================================
// PAGE 6 - Scenario 3
// ============================================================
const W6 = [4550, 2600, 2600];
const page6 = [
  ...pageTitle('Structure 3 - recommended', 'Cyprus finance company lending to Keytree'),
  subHead('Mechanics'),
  p('Starter Point forms a Cyprus finance company and funds it with €20m of equity. The finance company lends the €20m to Keytree at an arm’s length rate determined by a new transfer pricing study. Keytree applies the funds in repaying part of the shareholder loan and in the developments, capitalising the interest into the cost of both projects.'),
  subHead('Illustrative annual tax effect'),
  table(W6, [
    hrow(W6, ['Per annum', 'At 3%', 'At 8%']),
    row(W6, ['Interest income in the finance company', right('€600.000'), right('€1.600.000')]),
    row(W6, ['Notional interest deduction (capped at 80%)', right('(€480.000)'), right('(€1.280.000)')]),
    row(W6, ['Taxable', right('€120.000'), right('€320.000')]),
    row(W6, ['Corporation tax at 15%', right('€18.000'), right('€48.000')]),
    row(W6, [bold('Effective rate on interest income'), right('3,0%', { bold: true }), right('3,0%', { bold: true })]),
    row(W6, ['Cost capitalised into Keytree’s developments', right('€600.000'), right('€1.600.000')]),
  ]),
  p(' ', { after: 40 }),
  p('The 2026 reference rate (Cyprus 10-year bond yield at 31.12.2025 plus 5 points, per the Tax Department’s published table) is approximately 8 to 8,5%, giving a deduction of €1,6m to €1,7m on €20m - above the 80% cap at either interest rate illustrated. Interest income of companies is now taxed under corporation tax only and is exempt from Special Defence Contribution, which removes the passive-interest risk that existed under the former law. Capitalised interest carries no time limit and is relieved as cost of sales at 15% on delivery: the net group benefit is approximately 12% of cumulative interest, €0,4m to €1,2m over six years at the rates illustrated, against nil under each equity structure. Exceeding borrowing costs remain within the €3m interest limitation safe harbour. No Cyprus withholding tax arises on the interest; stamp duty on the facility agreement is capped at €20.000.'),
  subHead('Determination of the interest rate'),
  p('The existing transfer pricing documentation supports a median of 3% on the current shareholder loans. It does not govern the new facility, but the new study will need to explain any departure from it. Keytree’s credit position has deteriorated - negative equity, no turnover, no security - so a materially higher rate may be supportable; that is the study’s conclusion to reach and is not assumed in this paper. A local file is required in any event, the €20m facility being above the €10m financing threshold. The study should be commissioned before any figure is put to the shareholders.'),
  subHead('Conditions and residual weaknesses'),
  table(WA, [
    row(WA, [bold('Substance'), 'Cyprus-resident directors exercising real control over the lending risk. A company that does not control its risks is entitled only to a limited return at arm’s length, which would remove the benefit.']),
    row(WA, [bold('Capitalisation'), 'The policy must be applied consistently to both projects. The 2025 draft accounts are not consistent (€675.266 expensed, €289.709 capitalised); the policy determines whether the structure delivers any benefit and is to be agreed with the auditors.']),
    row(WA, [bold('Balance sheet'), 'Not restored: negative equity remains, gearing rises, and the letter of support and going concern disclosure continue. Starter Point does not join the register; if that objective is material, the structure can be combined with a small share issue.']),
    row(WA, [bold('Anti-abuse'), 'Common ownership, funds partly returning to Mr Levy, and a deduction arising within the group. The commercial rationale, the source of Starter Point’s funds and the sequence (advance received before any repayment to Mr Levy) must be documented from the outset.']),
  ]),
  conclusion('Recommended, subject to the conditions above. Principal may be repaid and redeployed at any time subject to cash, without court sanction, shareholder resolutions or the prior existence of distributable profits, and this is the only structure under which a measurable group tax benefit arises.'),
];

// ============================================================
// PAGE 7 - Robustness of the recommendation
// ============================================================
function lead(label, text) {
  return new Paragraph({
    children: [r(label + '  ', { bold: true, size: BODY }), r(text, { size: BODY })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 110, line: 248, lineRule: 'auto' }, keepLines: true,
  });
}
const page7 = [
  ...pageTitle('Structuring memorandum', 'Robustness of the recommendation'),
  lead('Reliance on the notional interest deduction.', 'The recommendation does not depend on the deduction surviving in Keytree. That deduction is quantified at nil under every structure and has been disregarded. The benefit of structure 3 arises at the finance company, where the deduction shelters taxable interest, and in Keytree, where the interest is capitalised into development cost and relieved on delivery. Each element rests on settled law applied to the facts as they stand, not on a favourable reading of a contested provision.'),
  lead('Anti-avoidance.', 'The arrangements involve common ownership, and part of the funds will be applied in repaying Mr Levy’s loan. Article 9B carries a specific anti-abuse provision and the general anti-avoidance rule has been extended. The position is defensible: the equity in the finance company is new cash from Starter Point’s own resources rather than a capitalisation of existing balances, the lending is priced at arm’s length and documented, and the commercial purpose - a single funding vehicle from which the funds can be recovered and redeployed at any time - is genuine and will be minuted. Should the deduction nevertheless be denied, the cost is contained: tax at the finance company rises to 15% of the interest, broadly matched by the relief in Keytree on delivery, leaving the group position neutral rather than adverse.'),
  lead('The interest rate.', 'The existing transfer pricing documentation supports a median of 3% on the current shareholder loans, and any departure from it will need to be explained. Keytree’s credit position has deteriorated since those loans were priced - negative equity, no turnover, no security - which points towards a higher rate, but no rate is assumed in this paper: the new study will conclude on it, and the local file will be in place before the first interest accrual. A rate the study cannot support will not be used.'),
  lead('The cost of the structure against an equity subscription.', 'An equity subscription bears no tax, but it also secures no relief: the deduction it generates in Keytree is worth nothing, in the year of sale as in every other year. The 3% effective charge at the finance company is the price of bringing a deductible cost into the developments and relieving it at 15% on delivery. The group retains approximately 12 cents of each euro of interest; under the equity routes it retains nothing.'),
  lead('The minority holders.', 'Under structure 3 no shares are issued, pre-emption under Regulation 6 is not engaged and the register is untouched. If an equity route is preferred, the minorities’ 5% is held by bonus shares (structure 1A) or by class rights written into the Articles (structure 1B); in neither case does their protection depend on a side agreement. The €1,6m of value passing to them under 1A is the arithmetic cost of the 80/10/5/5 requirement, and should either be accepted or the requirement revisited before that route is chosen.'),
  lead('The audit position.', 'Structure 3 leaves the going concern position where it stands today: negative equity, supported by Mr Levy’s letter, with the related disclosure continuing. Capitalisation of borrowing costs is the ordinary treatment for a developer recognising revenue on delivery; the inconsistency in the 2025 draft accounts is to be corrected and the policy agreed with the auditors before implementation, since the benefit of the structure depends on it. If the audit position is the decisive consideration, structure 1A resolves it, and at no tax cost.'),
  lead('The funds flow.', 'A remittance of this size from Nigeria will attract extended due diligence whichever structure is chosen. Source-of-funds evidence should be assembled before the remittance, the exchange control position confirmed at the sending end, and the banking route agreed as viable before implementation. The sequence matters as much as the source: the advance must be received before any repayment to Mr Levy, and the rationale recorded at the time. Where the bank prefers a Cyprus point of entry, the finance company itself provides one.'),
  subHead('Before implementation'),
  p('Commission the new transfer pricing study and obtain the existing one. Agree the capitalisation policy and, if a preference route is revisited, the IAS 32 classification with the auditors. Align Memorandum clause 5 with the 2020 capital increase and complete the Registrar filings. Evidence the source and sequence of the funds. Extend the Declaration of Trust and update the beneficial ownership register where new instruments are held through the nominee. Confirm the banking route. Once the shareholders select a structure, a single-structure paper with draft resolutions will be prepared in a form suitable for review by the company’s auditors.'),
  p('Vertu Projects Ltd', { after: 0, before: 120, align: AlignmentType.LEFT, run: { bold: true } }),
  p(' ', { after: 0 }),
  p('Leonidas Papadopoulos', { after: 0, align: AlignmentType.LEFT, run: { bold: true } }),
  p('Director', { after: 60, align: AlignmentType.LEFT, run: { color: GREY } }),
  new Paragraph({
    children: [r('This paper is prepared by Vertu Projects Ltd for discussion with the shareholders of Keytree Limited and is not to be issued to third parties. Figures are taken from the draft financial statements for the year ended 31 December 2025 and have not been independently verified. Nothing in this paper constitutes a binding tax opinion; the matters identified in this paper require confirmation before any structure is implemented.', { size: 14, i: true, color: GREY })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
  }),
];

// ============================================================
const doc = new Document({
  creator: 'Vertu Projects Ltd',
  title: 'Keytree Limited - introduction of €20m: structure selection',
  description: 'Structuring memorandum prepared for discussion with the shareholders',
  styles: { default: { document: { run: { font: F, size: BODY, color: INK } } } },
  sections: [{
    properties: {
      page: {
        margin: { top: convertMillimetersToTwip(18), bottom: convertMillimetersToTwip(16), left: convertMillimetersToTwip(19), right: convertMillimetersToTwip(19) },
      },
      titlePage: true,
    },
    headers: { default: headerDefault, first: headerFirst },
    footers: { default: footer, first: footer },
    children: [
      ...page1, brk(),
      ...page2, brk(),
      ...page3, brk(),
      ...page4, brk(),
      ...page5, brk(),
      ...page6, brk(),
      ...page7,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Keytree - Structure selection memorandum.docx', buf);
  console.log('written', buf.length);
});
