'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  compareOffers,
  formatCurrencyFull,
  type OfferDetails,
  type EquityType,
  type CompanyStage,
  type OfferComparison,
} from '@/lib/equity-calculator';

const EQUITY_TYPES: EquityType[] = ['ISO', 'NSO', 'RSU'];
const COMPANY_STAGES: CompanyStage[] = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Pre-IPO',
  'Public',
];

const defaultOffer: OfferDetails = {
  companyName: '',
  baseSalary: 150000,
  equityType: 'ISO',
  numberOfShares: 10000,
  strikePrice: 1,
  currentFMV: 5,
  vestingYears: 4,
  companyStage: 'Series A',
};

function OfferForm({
  label,
  offer,
  onChange,
}: {
  label: string;
  offer: OfferDetails;
  onChange: (o: OfferDetails) => void;
}) {
  const update = (field: keyof OfferDetails, value: string | number) => {
    onChange({ ...offer, [field]: value });
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{label}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={offer.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            placeholder="e.g. Acme Corp"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Base Salary (annual)</label>
          <input
            type="number"
            value={offer.baseSalary}
            onChange={(e) => update('baseSalary', Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Equity Type</label>
          <select
            value={offer.equityType}
            onChange={(e) => update('equityType', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            {EQUITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
          <input
            type="number"
            value={offer.numberOfShares}
            onChange={(e) => update('numberOfShares', Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        {offer.equityType !== 'RSU' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Strike Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={offer.strikePrice}
              onChange={(e) => update('strikePrice', Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current FMV per Share ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={offer.currentFMV}
            onChange={(e) => update('currentFMV', Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vesting Period (years)</label>
          <input
            type="number"
            value={offer.vestingYears}
            onChange={(e) => update('vestingYears', Number(e.target.value))}
            min={1}
            max={6}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Stage</label>
          <select
            value={offer.companyStage}
            onChange={(e) => update('companyStage', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            {COMPANY_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function ComparisonResults({ comparison }: { comparison: OfferComparison }) {
  const { offerA, offerB } = comparison;

  return (
    <div className="space-y-8">
      {/* Growth Scenarios Table */}
      <section>
        <h3 className="mb-4 text-xl font-bold text-gray-900">Total Compensation Over Vesting Period</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-medium text-gray-500">Scenario</th>
                <th className="py-3 px-4 text-right font-medium text-gray-500">{offerA.name}</th>
                <th className="py-3 pl-4 text-right font-medium text-gray-500">{offerB.name}</th>
                <th className="py-3 pl-4 text-right font-medium text-gray-500">Difference</th>
              </tr>
            </thead>
            <tbody>
              {offerA.scenarios.map((scenA, i) => {
                const scenB = offerB.scenarios[i];
                const diff = scenA.totalComp - scenB.totalComp;
                return (
                  <tr key={scenA.label} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-gray-900">{scenA.label}</td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {formatCurrencyFull(scenA.totalComp)}
                      <div className="text-xs text-gray-400">
                        ({formatCurrencyFull(scenA.salaryTotal)} salary + {formatCurrencyFull(scenA.equityValue)} equity)
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {formatCurrencyFull(scenB.totalComp)}
                      <div className="text-xs text-gray-400">
                        ({formatCurrencyFull(scenB.salaryTotal)} salary + {formatCurrencyFull(scenB.equityValue)} equity)
                      </div>
                    </td>
                    <td
                      className={`py-3 pl-4 text-right font-medium ${
                        diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}
                    >
                      {diff > 0 ? '+' : ''}
                      {formatCurrencyFull(diff)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk Assessment */}
      <section>
        <h3 className="mb-4 text-xl font-bold text-gray-900">Risk Assessment</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[offerA, offerB].map((offer) => (
            <div key={offer.name} className="rounded-lg border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900">{offer.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{offer.risk.stage}</p>
              <div className="mt-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    offer.risk.riskLevel === 'Very High'
                      ? 'bg-red-100 text-red-800'
                      : offer.risk.riskLevel === 'High'
                      ? 'bg-orange-100 text-orange-800'
                      : offer.risk.riskLevel === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : offer.risk.riskLevel === 'Low'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Risk: {offer.risk.riskLevel}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{offer.risk.description}</p>
              <p className="mt-2 text-xs text-gray-500">{offer.risk.failureRate}</p>
              <p className="text-xs text-gray-500">{offer.risk.typicalTimeline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tax Implications */}
      <section>
        <h3 className="mb-4 text-xl font-bold text-gray-900">Tax Implications</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[offerA, offerB].map((offer) => (
            <div key={offer.name} className="rounded-lg border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900">
                {offer.name} ({offer.tax.type})
              </h4>
              <p className="mt-2 text-sm font-medium text-gray-700">{offer.tax.summary}</p>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500">At Exercise/Vesting</p>
                  <p className="text-sm text-gray-600">{offer.tax.atExercise}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500">At Sale</p>
                  <p className="text-sm text-gray-600">{offer.tax.atSale}</p>
                </div>
                <div className="rounded bg-blue-50 p-3">
                  <p className="text-xs font-medium uppercase text-blue-700">Tip</p>
                  <p className="text-sm text-blue-800">{offer.tax.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Questions to Ask */}
      <section>
        <h3 className="mb-4 text-xl font-bold text-gray-900">Questions to Ask the Employer</h3>
        <ol className="space-y-2">
          {comparison.questionsToAsk.map((q, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </section>

      {/* Disclaimer */}
      <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
        <p className="text-sm font-semibold text-yellow-800">Disclaimer</p>
        <p className="mt-1 text-sm text-yellow-700">
          This tool is for <strong>educational purposes only</strong> and does not constitute financial,
          tax, or legal advice. Equity compensation is complex and depends on your individual
          circumstances. The calculations shown are simplified estimates that do not account for all
          variables (taxes, dilution, liquidation preferences, etc.). Consult a qualified financial
          advisor and tax professional before making decisions about equity compensation.
        </p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [step, setStep] = useState(1);
  const [offerA, setOfferA] = useState<OfferDetails>({
    ...defaultOffer,
    companyName: 'Company A',
  });
  const [offerB, setOfferB] = useState<OfferDetails>({
    ...defaultOffer,
    companyName: 'Company B',
    equityType: 'RSU',
    baseSalary: 180000,
    numberOfShares: 5000,
    currentFMV: 20,
    companyStage: 'Series C+',
  });
  const [comparison, setComparison] = useState<OfferComparison | null>(null);

  const handleCompare = () => {
    const result = compareOffers(offerA, offerB);
    setComparison(result);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EquityLetter</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Equity Terms</Link>
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">Newsletter</Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log In</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Compare Job Offers
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Enter two offers side by side. See total compensation across growth scenarios, risk
            assessments, and tax implications.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (s < step || (s === 3 && comparison)) setStep(s);
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  s === step
                    ? 'bg-gray-900 text-white'
                    : s < step
                    ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s < step ? '\u2713' : s}
              </button>
              <span className="text-sm text-gray-500 hidden sm:inline">
                {s === 1 ? 'Offer A' : s === 2 ? 'Offer B' : 'Compare'}
              </span>
              {s < 3 && <div className="mx-2 h-px w-8 bg-gray-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Offer A */}
        {step === 1 && (
          <div>
            <OfferForm label="Offer A Details" offer={offerA} onChange={setOfferA} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Next: Enter Offer B
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Offer B */}
        {step === 2 && (
          <div>
            <OfferForm label="Offer B Details" offer={offerB} onChange={setOfferB} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="rounded-md border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to Offer A
              </button>
              <button
                onClick={handleCompare}
                className="rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Compare Offers
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && comparison && (
          <div>
            <div className="mb-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Edit Offers
              </button>
              <button
                onClick={handleCompare}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Recalculate
              </button>
            </div>
            <ComparisonResults comparison={comparison} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EquityLetter by ZeroOrigine. Educational content, not financial advice.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
            <Link href="/compare" className="text-sm text-gray-500 hover:text-gray-700">Compare</Link>
            <Link href="/archive" className="text-sm text-gray-500 hover:text-gray-700">Archive</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
