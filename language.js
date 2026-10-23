// German/English switch for the homepage. German stays in the HTML; English
// replaces the marked elements. Legal texts remain German (binding version).
(function () {
  const arrow = ' <span aria-hidden="true">↗</span>';
  const en = {
    title: 'Apps by Dorent Azemi – Learn, move, grow',
    description: 'Discover the apps by Dorent Azemi: Shapey Coach, Ura, SimpleChess and study apps for electrical engineering. Store links, support and privacy.',
    text: [
      ['.skip-link', 'Skip to content'],
      ['.site-header nav a:nth-child(2)', 'Contact'],
      ['.site-header nav a:nth-child(3)', 'Legal'],
      ['.hero .eyebrow', '<span class="status-dot"></span> INDEPENDENTLY MADE. FOR YOUR EVERYDAY LIFE.'],
      ['.hero h1', 'Small apps.<br><span>Big possibilities.</span>'],
      ['.hero p', 'Learn something new. Stay active.<br>Or just enjoy a good game.<br>Discover apps that move you forward.'],
      ['.round-link', 'Explore all apps <span aria-hidden="true">↓</span>'],
      ['.feature-shapey .feature-label', 'YOUR DAY. YOUR PROGRESS.'],
      ['.feature-shapey h2', 'More balance.<br>With Shapey.'],
      ['.feature-shapey p', 'Training, nutrition and health.<br>Your coach is right there.'],
      ['.feature-shapey .button', 'Discover Shapey Coach' + arrow],
      ['.feature-ura .feature-label', 'TWO LANGUAGES. NEW CONNECTIONS.'],
      ['.feature-ura h2', 'One language.<br>A whole new world.'],
      ['.feature-ura p', 'Albanian and German.<br>Learn step by step with Ura.'],
      ['.feature-ura .button', 'Discover Ura' + arrow],
      ['#apps .eyebrow', 'THE APP COLLECTION'],
      ['#apps h2', 'For what moves you.'],
      ['.section-note', 'Learning · Health · Play'],
      ['#app-shapey .category', 'Fitness & Health'],
      ['#app-shapey p', 'Training, nutrition and how you feel today. All in one place.'],
      ['#app-ura .category', 'Language learning'],
      ['#app-ura p', 'Learn Albanian and German – from your first word to your exam.'],
      ['#app-ura-english .category', 'Language learning'],
      ['#app-ura-english p', 'Learn Albanian and English – with lessons and exams from A1 to B2.'],
      ['#app-ura-english .availability', 'iOS · coming soon to the App Store'],
      ['#app-ebt .category', 'Training & exams'],
      ['#app-ebt p', 'Your study companion for the German electronics technician apprenticeship and final exam.'],
      ['#app-lagerlogistik .category', 'Training & exams'],
      ['#app-lagerlogistik p', 'Lessons, flashcards and exam practice for the German warehouse logistics apprenticeship – ad-free.'],
      ['#app-iegs .category', 'Training & exams'],
      ['#app-iegs p', 'A structured path through the German industrial electrician apprenticeship (devices and systems).'],
      ['#app-simplechess .category', 'Play & Think'],
      ['#app-simplechess p', 'A good game. A new challenge. Chess at your own pace.'],
      ['#app-im-elektro .category', 'Further training'],
      ['#app-im-elektro p', 'Lessons, quizzes and flashcards for the German master craftsman exam in electrical engineering.'],
      ['#app-im-elektro .availability', 'Android · App information'],
      ['.privacy-link', 'Privacy' + arrow],
      ['#kontakt .eyebrow', 'STRAIGHT TO THE DEVELOPER'],
      ['#kontakt h2', 'A question? An idea?'],
      ['#kontakt p', 'Feedback, help with an app or a suggestion –<br>just write to me. Ideally mention the app and your operating system.'],
      ['#kontakt .button', 'Get in touch' + arrow],
      ['#rechtliches .eyebrow', 'TRANSPARENT & REACHABLE'],
      ['#rechtliches h2', 'Privacy & Legal.'],
      ['.text-link', 'Legal notice (Impressum) ↗'],
      ['.legal-intro', 'Here you will find the legal information for your app. The privacy policies below are written in German, and the German version is binding. Ura – Learn Albanian has its own English privacy policy.'],
      ['.legal-shortcuts a:nth-child(1)', 'Ura: Privacy policy (German) ↗'],
      ['.legal-shortcuts a:nth-child(3)', 'Shapey Coach: Privacy policy ↗'],
      ['.legal-shortcuts a:nth-child(4)', 'Shapey Coach: Terms of use ↗'],
      ['.legal-body .top a', '↑ back to top'],
      ['.site-footer span:nth-child(2)', 'Built with care.'],
      ['.site-footer a', 'Legal notice'],
    ],
    attr: [
      ['.feature-visual img', 'alt', 'Shapey Coach: app preview from the App Store'],
      ['.brand', 'aria-label', 'Dorent Azemi – Home'],
      ['.site-header nav', 'aria-label', 'Main navigation'],
      ['.featured', 'aria-label', 'Featured apps'],
    ],
  };

  const descriptionTag = document.querySelector('meta[name="description"]');
  const german = { title: document.title, description: descriptionTag && descriptionTag.content };
  const remember = (el, key, value) => { if (!(key in el.dataset)) el.dataset[key] = value; };

  function apply(lang) {
    const toEnglish = lang === 'en';
    document.documentElement.lang = lang;
    document.title = toEnglish ? en.title : german.title;
    if (descriptionTag) descriptionTag.content = toEnglish ? en.description : german.description;
    en.text.forEach(([selector, html]) => {
      document.querySelectorAll(selector).forEach((el) => {
        remember(el, 'deHtml', el.innerHTML);
        el.innerHTML = toEnglish ? html : el.dataset.deHtml;
      });
    });
    en.attr.forEach(([selector, name, value]) => {
      document.querySelectorAll(selector).forEach((el) => {
        const key = 'de' + name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
        remember(el, key, el.getAttribute(name) || '');
        el.setAttribute(name, toEnglish ? value : el.dataset[key]);
      });
    });
    // Without a country code Apple opens the visitor's own storefront.
    document.querySelectorAll('a[href^="https://apps.apple.com/de/"]').forEach((a) => remember(a, 'deHref', a.href));
    document.querySelectorAll('a[data-de-href]').forEach((a) => {
      a.href = toEnglish ? a.dataset.deHref.replace('apps.apple.com/de/', 'apps.apple.com/') : a.dataset.deHref;
    });
    document.querySelectorAll('.lang-toggle button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.querySelector('.lang-toggle')?.setAttribute('data-active', lang);
  }

  const toggle = document.createElement('div');
  toggle.className = 'lang-toggle';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', 'Sprache / Language');
  toggle.innerHTML = '<button type="button" data-lang="de" lang="de">DE</button><button type="button" data-lang="en" lang="en">EN</button>';
  document.querySelector('.site-header')?.appendChild(toggle);
  toggle.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    try { localStorage.setItem('lang', button.dataset.lang); } catch {}
    apply(button.dataset.lang);
  });

  let lang = new URLSearchParams(location.search).get('lang');
  if (!lang) { try { lang = localStorage.getItem('lang'); } catch {} }
  if (!lang) lang = (navigator.language || 'de').toLowerCase().startsWith('de') ? 'de' : 'en';
  apply(lang === 'en' ? 'en' : 'de');
})();
