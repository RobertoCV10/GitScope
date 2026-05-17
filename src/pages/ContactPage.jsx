import { useLanguage } from "../hooks/useLanguage";
import { Icon, I } from "../utils/icons";

const contacts = [
  {
    id: "github",
    icon: I.github,
    labelKey: "contactGithub",
    url: "https://github.com/RobertoCV10",
  },
  {
    id: "linkedin",
    icon: I.linkedin,
    labelKey: "contactLinkedin",
    url: "https://www.linkedin.com/in/roberto-coria-vargas-088231309/",
  },
  {
    id: "portfolio",
    icon: I.web,
    labelKey: "contactPortfolio",
    url: "https://portfolio-rcv.vercel.app/",
  },
  {
    id: "email",
    icon: I.email,
    labelKey: "contactEmail",
    url: "mailto:roberto21.coria02@gmail.com",
    extra: "roberto21.coria02@gmail.com",
  },
];

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      {contacts.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-4 rounded-xl bg-md-surface-container-low border border-md-outline/10 transition-all duration-300 hover:bg-md-primary/5 active:scale-[0.98]"
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-md-primary/10 text-md-primary text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Icon icon={item.icon} size="1.35em" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-md-on-surface text-sm">{t(item.labelKey)}</p>
            {item.extra && (
              <p className="text-xs text-md-on-surface-variant truncate mt-0.5">{item.extra}</p>
            )}
          </div>
          <Icon
            icon={I.link}
            size="1.1em"
            className="text-md-on-surface-variant transition-all duration-300 group-hover:translate-x-1 group-hover:text-md-primary flex-shrink-0"
          />
        </a>
      ))}
    </div>
  );
};

export default ContactPage;
