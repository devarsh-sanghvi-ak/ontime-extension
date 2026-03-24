function addEventListenerTOActionTakers(){
  // to auto update on pagination
  document.querySelector('pagination-template').addEventListener('click',getMatrixAlert);

  // to auto update on any btn clicked among the current month, prev month, filter and reset filter
  const buttonsWithPartialText = Array.from(document.querySelectorAll('button')).filter(button => button.textContent.includes('Filter'));

  // Now, for each button, find its parent and select all buttons within that parent
  buttonsWithPartialText.forEach(filterButton => {
    const parentElement = filterButton.parentElement;
    
    if (parentElement) {
      const buttonsInSameContainer = parentElement.querySelectorAll('button');
      
      buttonsInSameContainer.forEach((btn)=>{
        btn.addEventListener('click',()=>{
          setTimeout(getMatrixAlert, 500);
          setTimeout(getMatrixAlert, 1500);
        });
      })
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['startup.js']
    })})
  
  document.getElementById('getMatrix').addEventListener('click', () => {
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('ontime.ico'),
      title: 'Matrix added',
      message: 'Ontime Matrix Information added under header Timesheet!'
    });
    console.log('getMatrix Button clicked'); // Add this line
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: ()=>{getMatrixAlert();}
      });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: addEventListenerTOActionTakers});
        });
      });
  });
});





