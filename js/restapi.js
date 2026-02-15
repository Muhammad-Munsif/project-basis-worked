<script>
    (function() {
      // ----- theme management -----
      const body = document.body;
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');

      function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('restapi-theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }

      function toggleTheme() {
        const current = body.getAttribute('data-theme') || 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
      }

      // init theme
      const saved = localStorage.getItem('restapi-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved) {
        setTheme(saved);
      } else {
        setTheme(prefersDark ? 'dark' : 'light');
      }

      themeToggle.addEventListener('click', toggleTheme);

      // keyboard shortcut Alt+T
      document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 't') {
          e.preventDefault();
          toggleTheme();
        }
      });

      // ----- tab system + progress -----
      const tabs = document.querySelectorAll('.tab-content');
      const sidebarItems = document.querySelectorAll('.sidebar li');
      const progressFill = document.getElementById('progressFill');
      const progressLabel = document.getElementById('progressLabel');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let currentTab = 1;
      const totalTabs = 5;

      function updateProgress() {
        const percent = (currentTab / totalTabs) * 100;
        progressFill.style.width = percent + '%';
        progressLabel.innerText = `Lesson ${currentTab} of ${totalTabs}`;
      }

      function showTab(index) {
        // hide all tabs
        tabs.forEach(t => t.classList.remove('active'));
        document.getElementById(`tab${index}`).classList.add('active');

        // update sidebar active
        sidebarItems.forEach((item, i) => {
          const tabNum = parseInt(item.dataset.tab, 10);
          if (tabNum === index) item.classList.add('active');
          else item.classList.remove('active');
        });

        currentTab = index;
        updateProgress();
      }

      sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const tab = parseInt(e.target.dataset.tab, 10);
          showTab(tab);
        });
      });

      prevBtn.addEventListener('click', () => {
        if (currentTab > 1) showTab(currentTab - 1);
      });
      nextBtn.addEventListener('click', () => {
        if (currentTab < totalTabs) showTab(currentTab + 1);
      });

      // demo simulation
      const demoResult = document.getElementById('demoResult');
      document.getElementById('simulateGet').addEventListener('click', () => {
        demoResult.innerHTML = '⏳ Fetching users...';
        setTimeout(() => {
          demoResult.innerHTML = `<strong>✅ 200 OK</strong>\n[\n  { "id": 1, "name": "Alex" },\n  { "id": 2, "name": "Jamie" }\n]`;
        }, 800);
      });
      document.getElementById('simulatePost').addEventListener('click', () => {
        demoResult.innerHTML = '⏳ Creating user...';
        setTimeout(() => {
          demoResult.innerHTML = `<strong>✅ 201 Created</strong>\n{ "id": 3, "name": "Taylor", "message": "user added" }`;
        }, 800);
      });

      // set initial tab active from first sidebar (already active)
      showTab(1);

      // system preference change (if no localStorage override)
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('restapi-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    })();
  </script>