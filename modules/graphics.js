export const showAuditGraphic = (data, body) => {
  const { auditRatio, attrs, totalUp, totalDown } = data;
  console.log(data);
  console.log(auditRatio, attrs, totalUp, totalDown);
  const chart = document.createElement('div');
  const audit = document.createElement('p');
  audit.classList.add('username');
  audit.textContent = `Audit rating is ${Math.round(auditRatio * 100) / 100}`;
  const auditDown = document.createElement('div');
  auditDown.textContent = `Done ${totalUp}`;
  const auditUp = document.createElement('div');
  auditUp.textContent = `Received ${totalDown}`;
  const auditGraphic = document.createElement('div');
  auditGraphic.width = 500;
  auditGraphic.classList.add('audit__graphic');
  if (auditRatio >= 1) {
    auditGraphic.innerHTML = `
    <svg width="${500 - 80}" height="110">
                  <rect x="5" y="5" width="${500 - 90}" height="35"
                      fill="#FF743C" stroke="rgb(230, 230, 230)" stroke-width="10"/>
                  
                      <rect x="5" y="65" width="${
                        (totalDown / totalUp) * (500 - 90)
                      }" height="35"
                      fill="#2D3652" stroke="rgb(230, 230, 230)" stroke-width="10"/>
              </svg>
    `;
  } else {
    auditGraphic.innerHTML = `
    <svg width="${500 - 80}" height="110">
                  <rect x="5" y="5" width="${
                    (totalUp / totalDown) * (500 - 90)
                  }" height="35"
                      fill="#FF743C" stroke="rgb(230, 230, 230)" stroke-width="10"/>
                  
                      <rect x="5" y="65" width="${500 - 90}" height="35"
                      fill="#2D3652" stroke="rgb(230, 230, 230)" stroke-width="10"/>
              </svg>
    `;
  }

  chart.append(audit, auditDown, auditUp, auditGraphic);
  body.append(chart);
};

export const showProgressGraphic = (data, result, total, body) => {
  console.log(data, result, total);
  data.forEach((element) => {
    console.log(element.updatedAt);
  });
  const xpGraph = document.createElement('div');
  xpGraph.classList.add('xp__graph');
  const graphTitle = document.createElement('h2');
  graphTitle.classList.add('xp__title');
  graphTitle.textContent = 'Graph shows your earned XP for learning time';
  const graphSvg = document.createElement('svg');
  graphSvg.innerHTML = `

`;
  xpGraph.append(graphTitle);
  body.append(xpGraph);
};
