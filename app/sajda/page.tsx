import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import AyahCard from '@/components/AyahCard';
import { getSajdas } from '@/lib/api';

export const metadata = {
  title: 'Sajda Verses — Al-Quran Al-Kareem',
  description: 'All 15 verses requiring prostration (Sajda Tilawa) in the Quran.',
};

export default async function SajdaPage() {
  const arabicData = await getSajdas('ar.alafasy');
  const translationData = await getSajdas('en.asad');

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--background)' }}>
      <Navigation />

      <PageHeader
        title="Sajda Verses"
        subtitle="Verses of prostration — moments of deepened connection with Allah"
        badge={
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'rgba(242,181,11,0.15)',
              color: '#f2b50b',
              border: '1px solid rgba(242,181,11,0.25)',
            }}
          >
            {arabicData.data.ayahs.length} Verses
          </span>
        }
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-4xl">

        {/* Info */}
        <div
          className="mb-8 p-5 md:p-6 rounded-2xl animate-fade-in"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
          >
            About Sajda Tilawa
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
            When reciting or hearing certain verses of the Quran, prostration (Sajda Tilawa)
            is recommended. These sacred moments deepen our connection with Allah ﷻ and
            are a sign of gratitude and submission.
          </p>
        </div>

        {/* Sajda Verses */}
        <div className="space-y-3 md:space-y-4">
          {arabicData.data.ayahs.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              translationText={translationData.data.ayahs[index]?.text}
            />
          ))}
        </div>

      </main>
    </div>
  );
}
