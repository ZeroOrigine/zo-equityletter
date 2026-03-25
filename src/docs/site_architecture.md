# EquityLetter — Site Architecture

## URL Structure

```
/                     → Marketing landing page (this build)
/signup               → Registration flow
/login                → Authentication
/dashboard            → User dashboard (authenticated)
/dashboard/grants     → Equity grant tracker
/dashboard/tax        → Tax scenario modeler
/dashboard/offers     → Offer letter decoder
/blog                 → Content marketing / SEO
/blog/[slug]          → Individual blog posts
/pricing              → Dedicated pricing page (mirrors landing section)
/about                → Company info
/contact              → Contact form
/privacy              → Privacy policy
/terms                → Terms of service
/security             → Security practices
/changelog            → Product updates
```

## SEO Keyword Mapping

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|--------------------|
| / | equity compensation | stock options, RSUs, startup equity |
| /blog | equity newsletter | startup compensation, equity advice |
| /dashboard/tax | stock option tax calculator | AMT calculator, capital gains equity |
| /dashboard/offers | offer letter equity calculator | startup offer negotiation |

## Content Strategy

- Weekly newsletter (free tier) drives organic traffic
- Blog posts target long-tail equity compensation queries
- Offer letter decoder is viral loop (shareable results)
- Peer compensation data creates community engagement

## Performance Targets

- Lighthouse Performance: >85
- FCP: <1.5s
- LCP: <2.0s
- CLS: <0.05
- TTFB: <200ms
