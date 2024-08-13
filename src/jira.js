export function setupJiraLink() {
    const jiraLink = document.getElementById('jiraLink');
    jiraLink.addEventListener('click', (e) => {
        e.preventDefault();
        const url = "https://jira.brueder-schlau.de/secure/RapidBoard.jspa?rapidView=167&projectKey=SHOP&quickFilter=1237";
        chrome.tabs.create({ url });
    });

    const jiraTicketInput = document.getElementById('jiraTicketInput');
    const jiraSearchBtn = document.getElementById('jiraSearchBtn');

    jiraSearchBtn.addEventListener('click', openJiraTicket);

    jiraTicketInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            openJiraTicket();
        }
    });

    function openJiraTicket() {
        const ticketNumber = jiraTicketInput.value.trim();
        if (ticketNumber) {
            const jiraUrl = `https://jira.brueder-schlau.de/browse/SHOP-${ticketNumber}`;
            chrome.tabs.create({ url: jiraUrl });
        }
    }
}
