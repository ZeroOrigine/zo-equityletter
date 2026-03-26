export type EquityType = 'ISO' | 'NSO' | 'RSU';
export type CompanyStage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+' | 'Pre-IPO' | 'Public';

export interface OfferDetails {
  companyName: string;
  baseSalary: number;
  equityType: EquityType;
  numberOfShares: number;
  strikePrice: number;
  currentFMV: number;
  vestingYears: number;
  companyStage: CompanyStage;
}

export interface GrowthScenario {
  label: string;
  multiplier: number;
  totalComp: number;
  equityValue: number;
  salaryTotal: number;
}

export interface TaxImplication {
  type: EquityType;
  summary: string;
  atExercise: string;
  atSale: string;
  tip: string;
}

export interface RiskAssessment {
  stage: CompanyStage;
  riskLevel: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  description: string;
  failureRate: string;
  typicalTimeline: string;
}

export interface OfferComparison {
  offerA: {
    name: string;
    scenarios: GrowthScenario[];
    tax: TaxImplication;
    risk: RiskAssessment;
  };
  offerB: {
    name: string;
    scenarios: GrowthScenario[];
    tax: TaxImplication;
    risk: RiskAssessment;
  };
  questionsToAsk: string[];
}

export function calculateEquityValue(
  offer: OfferDetails,
  growthMultiplier: number
): number {
  const futureSharePrice = offer.currentFMV * growthMultiplier;

  if (offer.equityType === 'RSU') {
    // RSUs have no strike price — you receive full shares
    return offer.numberOfShares * futureSharePrice;
  }

  // Options: value = max(0, (futurePrice - strikePrice)) * shares
  const perShareGain = Math.max(0, futureSharePrice - offer.strikePrice);
  return offer.numberOfShares * perShareGain;
}

export function calculateOfferValue(
  offer: OfferDetails,
  growthMultiplier: number
): GrowthScenario {
  const equityValue = calculateEquityValue(offer, growthMultiplier);
  const salaryTotal = offer.baseSalary * offer.vestingYears;
  const totalComp = salaryTotal + equityValue;

  let label: string;
  if (growthMultiplier === 0) label = 'Company fails (0x)';
  else if (growthMultiplier === 1) label = 'Flat (1x)';
  else label = `${growthMultiplier}x growth`;

  return {
    label,
    multiplier: growthMultiplier,
    totalComp,
    equityValue,
    salaryTotal,
  };
}

export function getTaxImplications(equityType: EquityType): TaxImplication {
  switch (equityType) {
    case 'ISO':
      return {
        type: 'ISO',
        summary:
          'ISOs offer the best potential tax treatment but come with AMT risk.',
        atExercise:
          'No regular income tax at exercise. However, the spread (FMV minus strike price) is an AMT preference item and may trigger Alternative Minimum Tax. This can create a tax bill even though you received no cash.',
        atSale:
          'If you hold shares for 1+ year after exercise AND 2+ years after grant, gains are taxed at long-term capital gains rates (15-20%). If you sell before meeting both holding periods, gains are taxed as ordinary income (22-37%).',
        tip: 'Model your AMT exposure before exercising. Consider exercising in batches across tax years to stay below AMT thresholds. Consult a tax advisor for large exercises.',
      };
    case 'NSO':
      return {
        type: 'NSO',
        summary:
          'NSOs are taxed as ordinary income at exercise, with no AMT risk.',
        atExercise:
          'The spread (FMV minus strike price) is taxed as ordinary income at exercise. Your employer withholds federal, state, Social Security, and Medicare taxes. You receive cash or shares minus tax withholding.',
        atSale:
          'Any gain after exercise is taxed at short-term or long-term capital gains rates depending on how long you hold the shares after exercise. Hold 1+ year for long-term capital gains rates (15-20%).',
        tip: 'Since taxes are withheld at exercise, there is no AMT surprise. But the ordinary income tax rate at exercise (22-37%) is higher than the long-term capital gains rate ISOs can qualify for. For small spreads, the difference may be minimal.',
      };
    case 'RSU':
      return {
        type: 'RSU',
        summary:
          'RSUs are taxed as ordinary income when they vest. No exercise decision needed.',
        atExercise:
          'N/A — RSUs vest automatically. At vesting, the full share value is ordinary income. Your employer typically sells shares to cover taxes ("sell-to-cover"), so you receive ~60% of the vested shares after withholding.',
        atSale:
          'Any gain above the vesting price is taxed as capital gains. Hold 1+ year after vesting for long-term rates (15-20%). Loss after vesting may be deductible.',
        tip: 'Budget for receiving ~60% of your RSU grant after tax withholding. The 22% federal supplemental rate may under-withhold if you are in a higher bracket — set aside the difference.',
      };
  }
}

export function getRiskAssessment(stage: CompanyStage): RiskAssessment {
  switch (stage) {
    case 'Pre-Seed':
      return {
        stage,
        riskLevel: 'Very High',
        description:
          'Pre-seed companies have a product idea but often no product-market fit, minimal revenue, and a very small team. The vast majority of pre-seed companies fail.',
        failureRate: '~90% of pre-seed startups fail within 3 years',
        typicalTimeline: '7-12 years to a potential exit, if the company survives',
      };
    case 'Seed':
      return {
        stage,
        riskLevel: 'Very High',
        description:
          'Seed-stage companies may have an early product but are still searching for product-market fit. Revenue is minimal or nonexistent.',
        failureRate: '~80% of seed-stage startups fail',
        typicalTimeline: '6-10 years to a potential exit',
      };
    case 'Series A':
      return {
        stage,
        riskLevel: 'High',
        description:
          'Series A companies have shown initial traction and product-market fit signals but are still early. Revenue is growing but the business model may not be proven.',
        failureRate: '~60-70% of Series A companies fail to reach a successful exit',
        typicalTimeline: '5-8 years to a potential exit',
      };
    case 'Series B':
      return {
        stage,
        riskLevel: 'Medium',
        description:
          'Series B companies have demonstrated product-market fit and meaningful revenue growth. The risk shifts from survival to execution and scaling.',
        failureRate: '~40-50% fail to reach a successful exit',
        typicalTimeline: '3-6 years to a potential exit',
      };
    case 'Series C+':
      return {
        stage,
        riskLevel: 'Medium',
        description:
          'Late-stage private companies with significant revenue and scale. The primary risk is achieving a valuation at exit that exceeds the liquidation preference stack.',
        failureRate: '~25-35% fail to return value to common stockholders',
        typicalTimeline: '2-4 years to a potential exit',
      };
    case 'Pre-IPO':
      return {
        stage,
        riskLevel: 'Low',
        description:
          'Companies actively preparing for IPO or acquisition. The outcome is more predictable but the entry price (high FMV, high strike) limits upside.',
        failureRate: '~10-15% of Pre-IPO companies fail to go public or get acquired favorably',
        typicalTimeline: '1-2 years to a potential liquidity event',
      };
    case 'Public':
      return {
        stage,
        riskLevel: 'Very Low',
        description:
          'Publicly traded companies with liquid stock. Your equity has a clear market value and can be sold (subject to blackout periods and lock-ups). Risk is stock price volatility, not total loss.',
        failureRate: 'Low probability of total loss; stock can decline significantly',
        typicalTimeline: 'Immediate liquidity after vesting (subject to restrictions)',
      };
  }
}

export function compareOffers(
  offerA: OfferDetails,
  offerB: OfferDetails
): OfferComparison {
  const multipliers = [0, 1, 2, 5, 10];

  const scenariosA = multipliers.map((m) => calculateOfferValue(offerA, m));
  const scenariosB = multipliers.map((m) => calculateOfferValue(offerB, m));

  const questionsToAsk: string[] = [
    'What is the total number of fully diluted shares outstanding?',
    'What is the current 409A valuation, and when was it last updated?',
    'What is the total liquidation preference stack?',
    'What is the post-termination exercise window? (Standard is 90 days — ask for longer)',
    'Does the company offer acceleration on change of control? Single or double trigger?',
    'How large is the option pool, and how much is unallocated?',
    'Are there any outstanding SAFEs or convertible notes that will dilute existing shareholders?',
    'What is the company\'s current annual revenue and growth rate?',
    'When was the last fundraise, and how much runway does the company have?',
    'Is there an ESPP (Employee Stock Purchase Plan) available?',
  ];

  return {
    offerA: {
      name: offerA.companyName || 'Offer A',
      scenarios: scenariosA,
      tax: getTaxImplications(offerA.equityType),
      risk: getRiskAssessment(offerA.companyStage),
    },
    offerB: {
      name: offerB.companyName || 'Offer B',
      scenarios: scenariosB,
      tax: getTaxImplications(offerB.equityType),
      risk: getRiskAssessment(offerB.companyStage),
    },
    questionsToAsk,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
