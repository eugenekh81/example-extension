export function createLists() {
  const listsContainer = document.getElementById('listsContainer');

  listsContainer.innerHTML = '';

  const listsData = [
    {
      title: 'Arbeitszeit',
      links: [
        { text: 'Zeiterfassung', url: 'https://vhbrup01ai01.rot.sap.brueder-schlau.de:44300/sap/bc/webdynpro/sap/zess_clockinout#' },
        { text: 'Einstieg', url: 'https://vhbrup01ai02.rot.sap.brueder-schlau.de:44300/nwbc/' }
      ]
    },
    {
      title: 'Deployment',
      links: [
        { text: 'Deployment ankündigen', url: 'https://confluence.brueder-schlau.de/pages/viewrecentblogposts.action?key=EC' },
        { text: 'Deployment starten', url: 'https://confluence.brueder-schlau.de/display/EC/Release+Management+-+Bamboo' },
        { text: 'Releases', url: 'https://bamboo.infra.brueder-schlau.de/deploy/viewDeploymentProjectVersions.action?id=88244225' },
        { text: 'Manuelle Tests Guide', url: 'https://confluence.brueder-schlau.de/pages/viewpage.action?spaceKey=EC&title=Manuelle+Tests' }
      ]
    },
    {
      title: 'Sonst',
      links: [
        { text: 'Servicenamen', url: 'https://confluence.brueder-schlau.de/display/EC/Server-+und+Servicenamen' },
        { text: 'eCommerce CheatSheet', url: 'https://confluence.brueder-schlau.de/display/EC/eCommerce+CheatSheet' },
        { text: 'Initiales Setup (Entwickler)', url: 'https://confluence.brueder-schlau.de/pages/viewpage.action?pageId=2494133' }
      ]
    },
    {
      title: 'Dev',
      links: [
        { text: 'Hammer Dev', url: 'https://local.hammer-zuhause.de:9002/schlaub2cstorefront/' },
        { text: 'Schlau Dev', url: 'https://local.hammer-zuhause.de:9002/schlaustorefront/' },
        { text: 'Backoffice Dev', url: 'https://local.hammer-zuhause.de:9002/backoffice' }
      ]
    },
    {
      title: 'Stage',
      links: [
        { text: 'Hammer Stage', url: 'https://www.stage.hammer-zuhause.de/' },
        { text: 'Schlau Stage', url: 'https://www.stage.schlau-grosshandel.de/' },
        { text: 'Backoffice Stage', url: 'https://hybris-cockpits.stage.brueder-schlau.de/backoffice/' },
        { text: 'CMS Cockpit Stage', url: 'https://hybris-cockpits.stage.brueder-schlau.de/cmscockpit/' },
        { text: 'Product Cockpit Stage', url: 'https://hybris-cockpits.stage.brueder-schlau.de/backoffice/login.zul' }
      ]
    },
    {
      title: 'Prod',
      links: [
        { text: 'Hammer Prod', url: 'https://www.hammer-zuhause.de/' },
        { text: 'Schlau Prod', url: 'https://www.schlau-grosshandel.de/' }
      ]
    }
  ];

  listsData.forEach(listData => {
    const details = document.createElement('details');

    const summary = document.createElement('summary');
    summary.textContent = listData.title;
    summary.className = `summary-title ${listData.title.toLowerCase()}-title`;

    const ul = document.createElement('ul');
    ul.className = 'linksList';

    listData.links.forEach(linkData => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = linkData.url;
      link.textContent = linkData.text;
      link.id = generateIdFromText(linkData.text);
      link.className = 'link';
      link.target = '_blank';

      listItem.appendChild(link);
      ul.appendChild(listItem);
    });

    details.appendChild(summary);
    details.appendChild(ul);

    listsContainer.appendChild(details);
  });
}

function generateIdFromText(text) {
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
