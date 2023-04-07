window.onload = function () {
  const appointmentEle = document.querySelector("#appointment");
  const addBtnEle = document.querySelector("#addBtn");
  const timeSlotsEle = document.querySelector("#timeSlots");
  const allTimeSlotsEle = document.querySelector("#allTimeSlots");

  const timeSlots = [];

  // Add click event listener to addBtn element
  addBtnEle.addEventListener('click', () => {
    const milliDate = Date.parse(appointmentEle.value);

    // check if appointment value is a parseable date
    if (milliDate) {
      const readableDate = new Date(milliDate);

      // check this date is not already present
      const duplicates = timeSlots.filter(t => t.toString() === readableDate.toString());
      if (duplicates.length <= 0) {
        timeSlots.push(readableDate);

        // display added dates
        const divEle = document.createElement('div');
        divEle.className = 'input-group mb-2';
        divEle.innerHTML = `<div class="input-group-text fw-bold">${timeSlots.indexOf(readableDate) + 1}.</div>
                          <div class="form-control">${readableDate.toLocaleDateString()} - ${readableDate.toLocaleTimeString()}</div>`;
        timeSlotsEle.insertBefore(divEle, timeSlotsEle.firstChild);
        allTimeSlotsEle.value = JSON.stringify(timeSlots);
      }
    }
  });
};