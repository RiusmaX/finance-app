import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="flex items-center justify-center min-h-screen">
       <h1 className="text-4xl font-bold">{t('title')}</h1>
    </div>
  );
}
