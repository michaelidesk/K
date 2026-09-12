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
