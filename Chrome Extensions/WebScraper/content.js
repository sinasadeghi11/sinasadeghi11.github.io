function scrapeData() {
    const headings = [...document.querySelectorAll('h1, h2, h3')].map((heading) => heading.textContent);
    const links = [...document.querySelectorAll('a')].map((link) => link.href);
    const metadata = {
      title: document.querySelector('title')?.textContent,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content')
    };
  
    const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => {
        try {
          return JSON.parse(script.textContent);
        } catch (error) {
          return null;
        }
      })
      .filter((data) => data !== null);
  
    return { headings, links, metadata, structuredData };
  }
  
  scrapeData();
  