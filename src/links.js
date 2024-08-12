const linksData = [
    { id: 'ServiceNamesLink', text: 'Servicenamen', url: 'https://confluence.brueder-schlau.de/display/EC/Server-+und+Servicenamen' },
    { id: 'hammerProdLink', text: 'Hammer Prod', url: 'https://www.hammer-zuhause.de/' },
    { id: 'hammerStageLink', text: 'Hammer Stage', url: 'https://www.stage.hammer-zuhause.de/' },
    { id: 'hammerDevLink', text: 'Hammer Dev', url: 'https://local.hammer-zuhause.de:9002/schlaub2cstorefront/' },
    { id: 'schlauProdLink', text: 'Schlau Prod', url: 'https://www.schlau-grosshandel.de/' },
    { id: 'schlauStageLink', text: 'Schlau Stage', url: 'https://www.stage.schlau-grosshandel.de/' },
    { id: 'schlauDevLink', text: 'Schlau Dev', url: 'https://local.hammer-zuhause.de:9002/schlaustorefront/' },
    { id: 'backofficeStage', text: 'Backoffice Stage', url: 'https://hybris-cockpits.stage.brueder-schlau.de/backoffice/login.zul' },
    { id: 'backofficeDev', text: 'Backoffice Dev', url: 'https://local.hammer-zuhause.de:9002/backoffice' },
    { id: 'cheatSheet', text: 'eCommerce CheatSheet', url: 'https://confluence.brueder-schlau.de/display/EC/eCommerce+CheatSheet' }
  ];
  
  export function createLinks() {
    const linksList = document.getElementById('linksList');
    linksData.forEach(linkData => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = linkData.text;
      link.id = linkData.id;
      link.className = 'link';
  
      link.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: linkData.url });
      });
  
      listItem.appendChild(link);
      linksList.appendChild(listItem);
    });
  }
  