let currentTab = 1;
const totalTabs = 5;

function updateProgress() {
  const progress = (currentTab / totalTabs) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
}

function changeTab(tabNumber) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".sidebar li").forEach((li, index) => {
    li.classList.remove("active");
    if (index + 1 === tabNumber) {
      li.classList.add("active");
    }
  });

  document.getElementById(`tab${tabNumber}`).classList.add("active");
  currentTab = tabNumber;
  updateProgress();
}

function nextTab() {
  if (currentTab < totalTabs) {
    changeTab(currentTab + 1);
  }
}

function prevTab() {
  if (currentTab > 1) {
    changeTab(currentTab - 1);
  }
}

function simulateGetRequest() {
  const resultDiv = document.getElementById("get-result");
  resultDiv.innerHTML = "Fetching data...";

  // Simulate API call delay
  setTimeout(() => {
    resultDiv.innerHTML = `
                    <strong>Response:</strong> (Status: 200 OK)
                    <pre>[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]</pre>
                `;
  }, 1500);
}

// Initialize progress bar
updateProgress();
