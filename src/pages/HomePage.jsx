import { useLanguage } from '../hooks/useLanguage';
import SearchBar from '../components/common/SearchBar';
import { Icon, I } from '../utils/icons';

const HomePage = ({ onSearch, loading }) => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      <div className="mb-10 animate-slide-up">
        <SearchBar onSearch={onSearch} loading={loading} />
      </div>

      {!loading && (
        <div className="text-center py-24 animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-[24px] flex items-center justify-center bg-md-surface-container shadow-md-md">
              <Icon icon={I.magnify} size="3em" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 text-md-on-surface">
            {t('emptyTitle')}
          </h2>
          <p className="text-lg max-w-md mx-auto mb-8 text-md-on-surface-variant">
            {t('emptyDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['octocat', 'facebook', 'google'].map((username, i) => (
              <button
                key={username}
                onClick={() => onSearch(username)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 hover:scale-105 bg-md-surface-container text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10 border border-md-outline/20 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {t('tryUser')} <span className="font-semibold">&ldquo;{username}&rdquo;</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
