# EquityLetter — Product Requirements

## Product Vision
EquityLetter helps startup employees and founders understand, track, and maximize their equity compensation through personalized insights, tools, and education.

## Target Users
1. **Startup employees** with stock options or RSUs who don't understand their equity
2. **Job seekers** evaluating equity-heavy offers from startups
3. **Founders** managing cap tables and employee equity communication

## Core Features

### Free Tier
- Weekly equity digest newsletter
- 1 equity grant tracker
- Basic valuation estimates
- Offer letter decoder (3/month)
- Community access

### Pro Tier ($29/mo)
- Unlimited equity grant tracking
- Advanced valuation with 409A data
- Tax scenario modeler (AMT, LTCG, STCG)
- Unlimited offer letter decoding
- Vesting cliff alerts & reminders
- Peer compensation benchmarks

### Enterprise Tier ($99/mo)
- Team equity dashboard
- Cap table integration (Carta, Pulley)
- Custom valuation models
- Board-ready equity reports
- SSO & admin controls
- Dedicated account manager

## Acceptance Criteria (Landing Page)
- [ ] Page loads in <2s on 3G
- [ ] All sections render correctly on mobile (320px+)
- [ ] Navigation is sticky and functional
- [ ] All CTAs link to /signup
- [ ] FAQ accordions open/close without JavaScript framework
- [ ] Dark mode supported via Tailwind
- [ ] Structured data (JSON-LD) present
- [ ] OG meta tags present
- [ ] Semantic HTML hierarchy (h1 → h2 → h3)
- [ ] WCAG 2.1 AA color contrast ratios met
