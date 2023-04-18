window.onload = async function () {
  const licenseOrderTbodyEle = document.querySelector('#licenseOrderTbody');

  const res = await fetch('/licenses/passed', {
    method: 'POST',
  });
  const jsonRes = await res.json();

  jsonRes.forEach((dr, dex) => {
    let commentsMarkup = '';
    dr.comments.forEach(c => {
      commentsMarkup += `<div class="row"><div class="col-auto"><i class="fa-solid fa-comments text-info"></i></div><div class="col-auto">${c}</div></div>`;
    });
    licenseOrderTbodyEle.innerHTML = `<tr><td>${dex + 1}</td><td>${dr.email}</td><td>${dr.testType.toUpperCase()} Class</td><td>${commentsMarkup}</td><td>${dr.passed ? 'Yes' : 'No'}</td><td><button id="orderBtn" class="btn btn-lg btn-warning" type="button">Order</button></td></tr>`;
  });

  const orderBtnEle = document.querySelector('#orderBtn');
  orderBtnEle.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.stopImmediatePropagation();

    orderBtnEle.innerText = 'Ordered';
    orderBtnEle.className = 'btn btn-lg btn-success btn-disabled';
    orderBtnEle.disabled = true;
  });
};
