export function createLists() {
  const listsContainer = document.getElementById('listsContainer');

  listsContainer.innerHTML = '';

  const listsData = [
    {
      title: 'Arbeitszeit',
      links: [
        { id: 'timeTracking', text: 'Zeiterfassung', url: 'https://vhbrup01ai01.rot.sap.brueder-schlau.de:44300/sap/bc/webdynpro/sap/zess_clockinout#' },
        { id: 'entry', text: 'Einstieg', url: 'https://vhbrup01ai02.rot.sap.brueder-schlau.de:44300/nwbc/' }
      ]
    },
    {
      title: 'Deployment',
      links: [
        { id: 'deploymentBlog', text: 'Deployment ankündigen', url: 'https://confluence.brueder-schlau.de/pages/viewrecentblogposts.action?key=EC' },
        { id: 'deploymentStart', text: 'Deployment starten', url: 'https://confluence.brueder-schlau.de/display/EC/Release+Management+-+Bamboo' },
        { id: 'releases', text: 'Releases', url: 'https://bamboo.infra.brueder-schlau.de/deploy/viewDeploymentProjectVersions.action?id=88244225' },
        { id: 'manuelleTest', text: 'Manuelle Tests Guide', url: 'https://confluence.brueder-schlau.de/pages/viewpage.action?spaceKey=EC&title=Manuelle+Tests' }
      ]
    },
    {
      title: 'Sonst',
      links: [
        { id: 'ServiceNamesLink', text: 'Servicenamen', url: 'https://confluence.brueder-schlau.de/display/EC/Server-+und+Servicenamen' },
        { id: 'cheatSheet', text: 'eCommerce CheatSheet', url: 'https://confluence.brueder-schlau.de/display/EC/eCommerce+CheatSheet' },
        { id: 'initialesSetup', text: 'Initiales Setup (Entwickler)', url: 'https://confluence.brueder-schlau.de/pages/viewpage.action?pageId=2494133' }
      ]
    },
    {
      title: 'Dev',
      links: [
        { id: 'hammerDevLink', text: 'Hammer', url: 'https://local.hammer-zuhause.de:9002/schlaub2cstorefront/' },
        { id: 'schlauDevLink', text: 'Schlau', url: 'https://local.hammer-zuhause.de:9002/schlaustorefront/' },
        { id: 'backofficeDev', text: 'Backoffice', url: 'https://local.hammer-zuhause.de:9002/backoffice' }
      ]
    },
    {
      title: 'Stage',
      links: [
        { id: 'hammerStageLink', text: 'Hammer', url: 'https://www.stage.hammer-zuhause.de/' },
        { id: 'schlauStageLink', text: 'Schlau', url: 'https://www.stage.schlau-grosshandel.de/' },
        { id: 'backofficeStage', text: 'Backoffice', url: 'https://hybris-cockpits.stage.brueder-schlau.de/backoffice/login.zul' }
      ]
    },
    {
      title: 'Prod',
      links: [
        { id: 'hammerProdLink', text: 'Hammer', url: 'https://www.hammer-zuhause.de/' },
        { id: 'schlauProdLink', text: 'Schlau', url: 'https://www.schlau-grosshandel.de/' }
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
      link.id = linkData.id;
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
