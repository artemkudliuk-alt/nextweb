const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to services page
  try {
    await page.goto('http://localhost:5174/services');
  } catch (e) {
    try {
      await page.goto('http://localhost:5173/services');
    } catch (err) {
      console.error("Could not connect to local server on port 5173 or 5174");
      await browser.close();
      process.exit(1);
    }
  }
  
  // Wait for the footer to be rendered
  await page.waitForSelector('.main-footer');
  
  // Scroll to the bottom of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  // Wait a moment for scroll and animations
  await page.waitForTimeout(1000);
  
  const footerData = await page.evaluate(() => {
    const footer = document.querySelector('.main-footer');
    const divider = document.querySelector('#tech-glow-line-footer');
    const dividerContainer = document.querySelector('.main-footer .tech-glow-divider');
    const section3 = document.querySelector('.page-constructor__section--support');
    
    const getRectInfo = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        rect: {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height
        },
        computedStyle: {
          position: window.getComputedStyle(el).position,
          zIndex: window.getComputedStyle(el).zIndex,
          overflow: window.getComputedStyle(el).overflow,
          opacity: window.getComputedStyle(el).opacity,
          visibility: window.getComputedStyle(el).visibility,
          display: window.getComputedStyle(el).display,
          background: window.getComputedStyle(el).background,
          backgroundColor: window.getComputedStyle(el).backgroundColor
        }
      };
    };
    
    return {
      footer: getRectInfo(footer),
      divider: getRectInfo(divider),
      dividerContainer: getRectInfo(dividerContainer),
      section3: getRectInfo(section3),
      bodyScrollHeight: document.body.scrollHeight,
      windowInnerHeight: window.innerHeight
    };
  });
  
  console.log(JSON.stringify(footerData, null, 2));
  
  await browser.close();
})();
