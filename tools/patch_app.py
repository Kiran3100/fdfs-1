with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """        (page === 'dashboard' && href === '#/') ||
        href === '#/' + page ||
        (page === 'subject' && href === '#/subject/' + h[1]) ||
        (page === 'topic' && href === '#/subject/' + h[1])"""

replacement = """        (page === 'dashboard' && href === '#/') ||
        href === '#/' + page ||
        (page === 'mock-tests' && href.startsWith('#/mock-tests')) ||
        (page === 'subject' && href === '#/subject/' + h[1]) ||
        (page === 'topic' && href === '#/subject/' + h[1])"""

route_target = """    if (page === 'ibps-coach') {
      if (window.IBPSCoach && typeof window.IBPSCoach.render === 'function') {
        return window.IBPSCoach.render();
      }
      app.innerHTML = '<div class="card" style="padding:40px; text-align:center;"><h2>Loading Coach...</h2><p class="text-muted">If this takes a moment, please refresh.</p></div>';
      return;
    }"""

route_replacement = """    if (page === 'mock-tests' || page === 'mock-test') {
      if (window.MockTestUI && typeof window.MockTestUI.route === 'function') {
        return window.MockTestUI.route(h);
      }
      app.innerHTML = '<div class="card" style="padding:40px; text-align:center;"><h2>Loading Mock Tests...</h2></div>';
      return;
    }

    if (page === 'ibps-coach') {
      if (window.IBPSCoach && typeof window.IBPSCoach.render === 'function') {
        return window.IBPSCoach.render();
      }
      app.innerHTML = '<div class="card" style="padding:40px; text-align:center;"><h2>Loading Coach...</h2><p class="text-muted">If this takes a moment, please refresh.</p></div>';
      return;
    }"""

if target in code and route_target in code:
    code = code.replace(target, replacement)
    code = code.replace(route_target, route_replacement)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Successfully patched js/app.js!")
else:
    print("Targets not found! Check line endings:")
    print("target in code:", target in code)
    print("route_target in code:", route_target in code)
