# Data sources

Two paths. The registry path is free, authoritative and produces the identifiers
a KYC file needs anyway. The commercial path buys reach and contact-level data.
Most Cyprus and Greece work should start with the registry path and use the
commercial path only for contact identification.

## Path A - Registries and official sources (free, clean provenance)

Each entry below returns an official identifier. Record it on the target row -
it is what lets a target become a counterparty without re-doing the work.

| Source | Returns | Use for |
|---|---|---|
| Cyprus DRCIP (Registrar of Companies and Intellectual Property), `efiling.drcor.mcit.gov.cy` | HE number, directors, shareholders, charges, annual returns | Any Cyprus entity. The annual return gives the filed accounts |
| Greece GEMI, `publicity.businessportal.gr` | GEMI number, legal representatives, filed financials | Any Greek entity |
| CySEC public register, `cysec.gov.cy` | Licence type, number, status, permitted services | Confirming whether a counterparty is regulated, and for what |
| CySEC ASP register | Administrative service provider registration | Fiduciary competitor and partner mapping for Vertu |
| ICPAC and Cyprus Bar Association member lists | Regulated professional status | Introducer and referral-channel mapping |
| VIES, `ec.europa.eu/taxation_customs/vies` | VAT registration validity | Confirming a trading entity is live |
| TED and national tender portals | Contract awards, values, incumbents | Trigger events: a company that just won a contract has capital needs |
| EU funding portals, RRF and cohesion programme award lists | Grant recipients and amounts | Pyrolysis and cannabis sector targets with committed co-funding |
| Cyprus and Greek environmental permit registers | Licensed waste operators, capacities | Impactus Pyrolysis target universe specifically |
| Land registry and DLS | Property holdings | Asset-backed situations and family wealth mapping |

The registry path is slower per target and far better per qualified target. It
also has a property the commercial databases do not: everything it returns is a
matter of public record filed by the subject itself, which makes the Art.14
source disclosure trivial and the data accurate.

## Path B - Apollo (commercial, via the Apollo MCP connector)

**Current account state, checked 12 September 2026:** free tier. Lead credits
175, direct-dial credits 160, AI credits 5,000, export credits 0.
`mixed_companies/search` returns `API_INACCESSIBLE` - **the search API is not
included in the free plan.** The connector also needs periodic re-authorisation
in claude.ai connector settings when the token expires.

So on the current plan Apollo cannot build a target universe at all. Options:

| Option | Cost | What it buys |
|---|---|---|
| Stay on free tier, registry path only | nil | Full pipeline minus contact-level email discovery. Viable for Cyprus and Greece, weak for wider EU |
| Apollo paid tier | roughly $49-99 per user per month, verify current pricing at apollo.io/pricing | Search API, contact enrichment, sequences. Replaces the subscription AI-SDR tool outright |
| Subscription AI-SDR tool | the thing being avoided | Same class of underlying data, plus an orchestration layer this pipeline already replaces, minus any compliance gate |

The comparison that matters: the subscription tools are not selling data you
cannot otherwise get. They are selling the orchestration, which is what this
skill is. If the data layer is needed, buy the data layer directly.

### Tool routing when Apollo is available

The MCP tools enforce a routing rule worth respecting, because getting it wrong
produces silently empty results:

- `apollo_agent_find_prospects` - use for anything expressed as an ICP, persona
  or natural-language ask, which in practice is most requests. It infers the
  filters itself and can chain a company search into a people search. Pass K's
  request verbatim; do not rewrite it into filter vocabulary, and do not append
  output-format instructions.
- `apollo_mixed_companies_search` and `apollo_mixed_people_api_search` - only
  when an explicit structured filter set is already in hand. Note that
  `organization_locations` filters on employer headquarters while
  `person_locations` filters on where the person is; a request constraining both
  must set both.
- `apollo_organizations_enrich` - 1 credit per successful match. The tool
  requires explicit confirmation of the total credit cost before calling.
  Confirm with K, and only for Stage 3 qualified targets.
- `apollo_sequences_create` - creates sequences inactive by default. Leave them
  inactive. Activation is a Stage 6 decision, after the gate, never a
  side effect of building a list.

Owner-managed Cypriot and Greek businesses are poorly covered by title-based
filters, because the decision-maker is often an untitled beneficial owner.
Filter on seniority plus company size band, and expect to fill gaps from the
registry path's director and shareholder data - which is frequently better than
the commercial record anyway.

## Path C - Signals worth more than either database

Trigger events are what make an approach land. Watch, per book:

- **Vertu:** new inbound redomiciliations, CySEC licence applications in
  progress, companies filing late annual returns (an administration gap),
  changes of auditor or secretary, entities losing their ASP provider.
- **Deal sourcing:** succession-age ownership with no filed successor, three
  years of declining filed margins, a permit granted but no capex visible, an
  EU grant awarded against unbuilt capacity, receivership and restructuring
  notices.
- **Capital mapping (research only, no outbound):** newly registered Cyprus
  family office structures, published LP commitments in comparable regional
  funds, family liquidity events from published M&A.

## Path D - Professional-body registers (the adviser channel)

Verified 12 September 2026. These are the harvest surfaces for Book 1's adviser
channel - departure-jurisdiction professionals who hold relocating clients and
have no Cyprus arm. All are free. Marked **[verify]** where the directory was
named from practitioner knowledge but not confirmed in that run.

| Jurisdiction | Register | Why this one | Status |
|---|---|---|---|
| Sweden | FAR member search, `far.se/medlem/sok-far-medlem/` | 5,000+ members, ~900 firms, and it registers **authorised tax advisers** as a category - the exact channel | Verified |
| Sweden | Sveriges advokatsamfund, `advokatsamfundet.com/find-a-lawyer/` | Searchable by area of law (skatterätt), town, firm, language | Verified |
| Sweden | Revisorsinspektionen, `revisorsinspektionen.se/revisorssok/` | State auditor register - use to confirm standing, not to prospect | Verified |
| UK | STEP, `step.org/directory/members/search` | Searchable by member, firm, branch, jurisdiction. The best surface for displaced non-dom work | Verified |
| UK | CIOT Find a Member, via `portal.tax.org.uk` | Chartered Tax Advisers | Verified, confirm live path |
| UK | ICAEW, `find.icaew.com/search` | Broad - unusable without a tax-service filter | Verified |
| UK | The Law Society find-a-solicitor | Private client and tax filters | [verify] |
| Germany | Amtliches Steuerberaterverzeichnis, `steuerberaterverzeichnis.berufs-org.de` | Official, free, **complete** national register of every appointed Steuerberater and practice, searchable by postcode. DATEV's separate search closed 31 December 2025 | Verified - best German source |
| Germany | Regional Steuerberaterkammern (16) | Regional segmentation; Bavaria and NRW hold the Mittelstand density | Verified |
| Germany | BRAK Anwaltsverzeichnis - Fachanwalt für Steuerrecht | The precise filter for §6 AStG work | [verify] |
| Germany | Wirtschaftsprüferkammer Berufsregister | Auditors, lower relevance than Steuerberater | [verify] |
| Denmark | FSR - danske revisorer, `fsr.dk` | 800 firm members, 6,000 personal | [verify] directory access |
| Norway | Advokatforeningen member search; also `advokatenhjelperdeg.no` | Two harvest surfaces, members profile free on the second | Verified |
| Finland | Suomen Asianajajaliitto, `findanattorney.fi` | Includes associates as well as principals, so contact depth is better than most bar directories | Verified |
| Iceland | FLE / Lögmannafélag Íslands | Could not verify. Market too small to justify the effort | [verify], deprioritise |
| China | CICPA, `cicpa.org.cn` | **No public member directory found.** Cold email into the mainland is low-yield; the working channel is Hong Kong intermediaries, private banks and WeChat referral | Not a harvest surface |
| Hong Kong | HKICPA; Law Society of Hong Kong | The realistic entry point for Chinese outbound wealth. Treat as its own segment | [verify] |
| Cross-border | IFA national branches, `ifa.nl` | Branch member lists are the highest-quality cross-border tax audience where published | [verify] |

### The alliance route, which may beat the email

International accounting alliances admit roughly one firm per country, which
makes the seats a scarce asset rather than a marketing channel. Alliott Global
Alliance reports generating USD 11.4m of referral income for members in 2022
across 235 firms - that is the benchmark to judge a cold campaign against.

**AGA's Cyprus seat is already held** (Alliott Partellas Kiliaris Ltd), so it is
likely closed. GGI, Kreston Global, Nexia and PrimeGlobal need checking for
Cyprus availability. GGI has the strongest Germany and Nordics density, which
are the two markets that matter for this book.

Run this in parallel with the outreach, not instead of it, and open it before a
competitor takes the remaining seats.
