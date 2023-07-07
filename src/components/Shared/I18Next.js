import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

function App() {
  const { t, i18n } = useTranslation();
  const lngs = {
    en: { nativeName: 'English' },
    ar: { nativeName: 'العربية' }
  };
  const getGreetingTime = (d = DateTime.now()) => {
    const split_afternoon = 12; // 24hr time to split the afternoon
    const split_evening = 17; // 24hr time to split the evening
    const currentHour = parseFloat(d.toFormat('hh'));
    
    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      return 'afternoon';
    } else if (currentHour >= split_evening) {
      return 'evening';
    }
    return 'morning';
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <div>
          {Object.keys(lngs).map((lng) => (
            <button 
              key={lng} 
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} 
              type="submit" 
              onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('interpolation', {counter: 100} )}
        </a>
        <div className="Footer">
          <div>{t('date', { date: new Date() })}</div>
        </div>
        
        <div>{t('date', { date: new Date(), context: getGreetingTime() })}</div>
      </header>
    </div>
  );
}


export default App;